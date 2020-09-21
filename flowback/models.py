from django.db import models


# Create your models here.
class FlowbackMeasurement(models.Model):
    project_name = models.CharField(max_length=150)
    api_number = models.CharField(max_length=14)
    state_number = models.CharField(max_length=2)
    county_number = models.CharField(max_length=3)
    well_name = models.CharField(max_length=150)
    latitude = models.FloatField()
    longitude = models.FloatField()
    compound_name = models.CharField(max_length=150)
    cas_number = models.CharField(max_length=20)
    method = models.CharField(max_length=150)
    concentration = models.FloatField()
    standard_deviation = models.FloatField()
    reference = models.CharField(max_length=150)

    def __str__(self):
        return self.compound_name + 'has {}±{}'.format(self.concentration, self.standard_deviation)
