from django.db import models

# Create your models here.
class CurrentDirectory(models.Model):
    name = models.CharField(max_length=255)
    parent = models.ForeignKey('self', null=True, blank=True, related_name=)