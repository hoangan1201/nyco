from django.core.management.base import BaseCommand
from apps.common_metrics.models import CommonMetric, CommonMetricsMarquee

class Command(BaseCommand):
    def handle(self, *args, **options):
      for metric in CommonMetric.objects.all():
        number = CommonMetricsMarquee.objects.all().values('person_id', 'metric_id')
        if not metric.metric_name.id == 11:
          number = number.filter(metric_id=metric.metric_name.id)
        metric.metric_total = str(len(list(set(list(number.values_list('person_id'))))))
        metric.save()
        self.stdout.write(self.style.SUCCESS('Successfully updated metric "%s"' % metric.metric_name))
