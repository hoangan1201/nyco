from copy import deepcopy
from django.utils.encoding import force_text
from import_export import resources, widgets
from import_export.fields import Field
from import_export.resources import Diff
from import_export.results import RowResult
from import_export.widgets import ManyToManyWidget, ForeignKeyWidget

from collections import defaultdict
from apps.programs.models import Program, Agency
from .models import MetricFact, MetricCategorySubGroup, MetricCategory, MetricName


def get_deep_value(field, value):
    """Get field value by traversing relationships."""
    if value is None:
        return ""

    fields = field.split('__')
    current_value = value
    for current_field in fields:
        current_value = getattr(current_value, current_field)

    return current_value


class DeepForeignKeyWidget(ForeignKeyWidget):
    """
    Overrides render so that it can traverse deeper relationships
    """

    def render(self, value, obj=None):
        # Override render for deeper relationships
        return get_deep_value(self.field, value)




class ForeignKeyRelatedFieldWidget(DeepForeignKeyWidget):
    """
    There's 2 complex behavior that this widget does.
    - 1. Use the DeepForeignKeyWidget to look up a foreign key with a deeper relationship
    - 2. Use a separate field that is already defined on the resource to filter the instance that is
         retrieved for this field

    Example:
        DirectorySchoolResource needs to be associated with a school , but the school has to be filtered by
        not just the DBN but also the SchoolYear which is defined on a separate field

    :param model: The name of the related model
    :param field: The field to to retrieve for the related model , can use "__" notation for deep relationships

    :param related_fields_filters: A list of tuples, specifying pairs of resource field / related QS filter to use.
            The first is meant to be the same as the same defined in the resource (it gets the value from the row)
            The second is meant to be the full relationship path from the base related model to the field being queried.
    """
    # pylint: disable=too-many-arguments
    def __init__(self, model, field, related_fields_filters, *args, **kwargs):
        self.model = model
        self.field = field
        self.related_fields_filters = related_fields_filters or list()
        super().__init__(model, field, *args, **kwargs)

    def clean(self, value, row=None, *args, **kwargs):  # pylint: disable=keyword-arg-before-vararg
        # Clean should add the related_field and related_field value to the queryset
        if value:
            params = {self.field: value}
            for related_field, related_filter in self.related_fields_filters:
                params.update({
                    related_filter: row[related_field]
                })
            return self.get_queryset(value, row, *args, **kwargs).get(**params)

        return None


class MetricCategoryForeignKeyWidget(ForeignKeyWidget):
    def get_queryset(self, value, row):
        return self.model.objects.filter(
            name=row["SUBGROUP"],
            metric_category__name=row["CATEGORY"]
        )

class ProgramForeignKeyWidget(ForeignKeyWidget):
    def get_queryset(self, value, row):
        return self.model.objects.filter(
            name=row["PROGRAM_NAME"],
            agency__acronym=row["AGENCY_NAME"]
        )

# add one of these for period to get the interval type foreign key
class PeriodForeignKeyWidget(ForeignKeyWidget):
    def get_queryset(self, value, row):
        return self.model.objects.filter(
            name=row["SUBGROUP"],
            metric_category__name=row["CATEGORY"]
        )


class BaseModelResource(resources.ModelResource):
    """
    This is the base model resource that import/export should inherit from for this project.

    Additions:
    - Fix skip_row issues with M2M Field
    - Add the ability to pass and update related instances
    - Add the ability to pass resources into individual fields and resources
    - Make some of the names of hooks more readable
    """

    def __init__(self, *args, **kwargs):
        # Override for additional attributes

        # This attribute is a dictionary of "instance name" and "instance"
        #  saves on database calls and works arounds some queryset issues
        self.row_key = None
        self.related_instances = None
        super(BaseModelResource, self).__init__(*args, **kwargs)

    def import_row(self, row, instance_loader, using_transactions=True, dry_run=False, **kwargs):
        """
        Imports data from ``tablib.Dataset``. Refer to :doc:`import_workflow`
        for a more complete description of the whole import process.

        :param row: A ``dict`` of the row to import

        :param instance_loader: The instance loader to be used to load the row

        :param using_transactions: If ``using_transactions`` is set, a transaction
            is being used to wrap the import

        :param dry_run: If ``dry_run`` is set, or error occurs, transaction
            will be rolled back.
        """


        row_result = self.get_row_result_class()()

        self.before_get_instance(row, **kwargs)
        instance, new = self.get_or_init_instance(instance_loader, row)
        self.after_get_instance(instance, new, **kwargs)

        if new:
            row_result.import_type = RowResult.IMPORT_TYPE_NEW
        else:
            row_result.import_type = RowResult.IMPORT_TYPE_UPDATE

        row_result.new_record = new
        original = deepcopy(instance)
        diff = Diff(self, original, new)

        if self.for_delete(row, instance):
            if new:
                row_result.import_type = RowResult.IMPORT_TYPE_SKIP
                diff.compare_with(self, None, dry_run)
            else:
                row_result.import_type = RowResult.IMPORT_TYPE_DELETE
                self.delete_instance(instance, using_transactions, dry_run)
                diff.compare_with(self, None, dry_run)
        else:
            self.import_obj(instance, row, dry_run)
            if self.skip_row_fix(instance, original, row):
                row_result.import_type = RowResult.IMPORT_TYPE_SKIP
            else:
                self.save_instance(instance, using_transactions, dry_run)
                self.save_m2m(instance, row, using_transactions, dry_run)
            diff.compare_with(self, instance, dry_run)

        row_result.diff = diff.as_html()

        # Add object info to RowResult for LogEntry
        if row_result.import_type != RowResult.IMPORT_TYPE_SKIP:
            row_result.object_id = instance.pk
            row_result.object_repr = force_text(instance)
        self.after_import_row(row, row_result, **kwargs)

        # Reinitialize related_instances
        self.related_instances = None
        self.row_key = None
        return row_result

    def import_field(self, field, obj, data, is_m2m=False):
        """
        Override base import_filed to handle FieldWithResource, and send in the resource object
        """
        if field.attribute and field.column_name in data:
            # if isinstance(field, FieldWithResource):
            #     field.save(obj, data, is_m2m, resource=self)
            # else:
            field.save(obj, data, is_m2m)

    def skip_row_fix(self, instance, original, row):
        """ Fix issue where M2M was not supposed to be skipped
        """
        if not self._meta.skip_unchanged:
            return False
        for field in self.get_import_fields():
            if isinstance(field.widget, ManyToManyWidget):
                if self.export_field(field, original) != row[field.column_name]:
                    return False
            # elif isinstance(field.widget, ReverseForeignKeyWidget):
            #     # Duplicated if but to separate the cases to make it clear
            #     if self.export_field(field, original) != row[field.attribute]:
            #         return False
            else:
                try:
                    if list(field.get_value(instance).all()) != list(field.get_value(original).all()):
                        return False
                except AttributeError:
                    if field.get_value(instance) != field.get_value(original):
                        return False
        return True

    def before_get_instance(self, row, **kwargs):
        """
        Override to add additional logic before getting the instance of the model to be imported
        On the base class it is badly named "before_import_row"
        """
        pass

    def after_get_instance(self, instance, new, **kwargs):
        """
        Override to add additional logic after getting the instance of the model to be imported
        On the base class it is badly named "after_import_instance"
        """
        pass

    def export_field(self, field, obj):
        field_name = self.get_field_name(field)
        method = getattr(self, 'dehydrate_%s' % field_name, None)
        if method is not None:
            return method(obj)
        return field.export(obj)



class MetricFactResource(BaseModelResource):
    """ Import class for MetricFact"""

    interval_type = Field(column_name="INTERVAL", attribute='interval_type')
    period = Field(column_name='PERIOD', attribute='period')
    metric_count = Field(column_name='METRIC_COUNT', attribute='metric_count')

    metric_name = Field(
        column_name='METRIC_NAME',
        attribute='metric_name',
        widget=widgets.ForeignKeyWidget(MetricName, 'name'))

    category = Field(
        column_name='CATEGORY',
        attribute='category',
        widget= widgets.ForeignKeyWidget(MetricCategory, 'name')
    )
    subgroup = Field(
        column_name='SUBGROUP',
        attribute='subgroup',
        widget= MetricCategoryForeignKeyWidget(MetricCategorySubGroup, 'name')
    )

    program = Field(
        column_name='PROGRAM_ID',
        attribute='program',
        widget=ProgramForeignKeyWidget(Program, 'workforce_id')
    )

    agency = Field(
        column_name='AGENCY_ID',
        attribute='agency',
        widget= widgets.ForeignKeyWidget(Agency, 'workforce_id')
    )

    class Meta:
        fields = (
            'metric_name', 'interval_type', 'period', 'metric_count', 'category',
            'subgroup', 'program', 'agency'

        )
        model = MetricFact
        skip_unchanged=True
        import_id_fields = ['metric_name', 'period', 'agency', 'program', 'subgroup', 'interval_type', 'category']

    def __init__(self):
        self.agency_programs = defaultdict(list)


class MetricCategorySubGroupResource(resources.ModelResource):
    """ Import class for MetricCategorySubgroup. Import before MetricFact"""

    name = Field(column_name='SUBGROUP', attribute='name')

    metric_category = Field(
        column_name='CATEGORY',
        attribute='metric_category',
        widget= widgets.ForeignKeyWidget(MetricCategory, 'name')
    )

    class Meta:
        model = MetricCategorySubGroup
        import_id_fields = ['name', 'metric_category']
        skip_unchanged = True

    def before_import_row(self, row, **kwargs):
        MetricCategory.objects.get_or_create(name=row['CATEGORY'])
        MetricName.objects.get_or_create(name=row['METRIC_NAME'])
