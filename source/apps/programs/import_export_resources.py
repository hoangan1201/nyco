from import_export import resources
from import_export.fields import Field
from import_export.widgets import ManyToManyWidget, ForeignKeyWidget
from apps.common_metrics.import_export_resources import BaseModelResource

from .models import Location, Program, Agency

class ProgramResource(BaseModelResource):

    name = Field(column_name='PROGRAM_NAME', attribute='name')

    agency = Field(
        column_name='AGENCY_ID',
        attribute='agency',
        widget=ForeignKeyWidget(Agency, 'workforce_id')
    )

    id = Field(column_name='PROGRAM_ID', attribute='workforce_id')


    def before_get_instance(self, row, **kwargs):
        agency, _ = Agency.objects.get_or_create(acronym=row['AGENCY_NAME'])
        agency.workforce_id =  row['AGENCY_ID']
        agency.save()
        program_slug = (row['PROGRAM_NAME']+'-'+row['AGENCY_NAME']).replace(' ', '-').lower()
        program, _ = Program.objects.get_or_create(name=row['PROGRAM_NAME'], agency=agency, slug=program_slug)
        program.workforce_id = row['PROGRAM_ID']
        program.save()

    class Meta:
        model = Program
        fields = ('name',)
        import_id_fields = ['name']


class LocationResource(resources.ModelResource):
    """ The Location Resource importer
    """

    class Meta:
        model = Location
        import_id_fields = ['agency_name', 'program_name', 'latitude', 'longitude',]
        skip_unchanged=True
        fields = ('agency_name', 'program_name', 'latitude', 'longitude',)
