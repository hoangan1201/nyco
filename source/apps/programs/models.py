from django.db import models

from apps.abstract.models import OrderedModel, CommonModel
from apps.page.models import StatusModel


class ProgramMapPageIntroduction(CommonModel):
  introduction = models.CharField(max_length=255)

class Program(StatusModel):
    name = models.CharField(max_length=255)
    link = models.CharField(max_length=255, null=True)
    display_name = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True)
    description = models.TextField(null=True)
    neighborhood = models.ManyToManyField('Neighborhood', null=True)
    workforce_id = models.IntegerField(null=True, blank=True)

    agency = models.ForeignKey('Agency', on_delete=models.CASCADE)
    # operating_location = models.ForeignKey('OperatingLocation', blank=True)
    populations_served = models.ManyToManyField('Population', null=True, blank=True)
    average_yearly_clients = models.ForeignKey('ClientAverage', null=True, blank=True, on_delete=models.CASCADE)
    program_types = models.ManyToManyField('ProgramType', null=True, blank=True)

    class Meta:
        unique_together = (('agency', 'name'),)

    def __str__(self):
        return self.name


class Contact(OrderedModel):
    name = models.CharField(max_length=255, blank=True)
    email = models.CharField(max_length=255, blank=True)
    phone = models.CharField(max_length=255, blank=True)

    program = models.ForeignKey('Program', null=True, on_delete=models.SET_NULL)

    def __str__(self):
        return self.name


class Neighborhood(OrderedModel):
    name = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return self.name


class ProgramLink(CommonModel):
    url = models.CharField(max_length=255)
    label = models.CharField(max_length=255)

    program = models.ForeignKey('Program', null=True, on_delete=models.SET_NULL)


class Agency(models.Model):
    acronym = models.CharField(max_length=255, primary_key=True, null=False)
    name = models.CharField(max_length=255, null=True)
    display_name = models.CharField(max_length=255, null=True, blank=True)
    workforce_id = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return self.acronym


# class OperatingLocation(OrderedModel):
#     name = models.CharField(max_length=255, blank=True)

#     def __str__(self):
#         return self.name


class Population(OrderedModel):
    name = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return self.name


class ClientAverage(OrderedModel):
    name = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return self.name


class ProgramType(OrderedModel):
    name = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return self.name


class Location(CommonModel):
    latitude = models.DecimalField(max_digits=9, decimal_places=6, blank=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, blank=True)
    # title = models.CharField(max_length=255, blank=True)
    # tooltip_content = models.CharField(max_length=255, blank=True)
    #
    #
    program = models.ForeignKey('Program', null=True, on_delete=models.SET_NULL)

    def __str__(self):
        if self.program:
            return str(self.latitude) + " " + str(self.longitude) + " " + self.program.name
        else:
            return str(self.latitude) + " " + str(self.longitude)
