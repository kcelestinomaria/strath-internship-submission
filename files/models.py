from django.db import models

# Create your models here.
class Directory(models.Model):
    """Django Model to represent a directory in the local filesystem"""
    name = models.CharField(max_length=255)
    parent = models.ForeignKey('self', null=True, blank=True, related_name='sub-directories', on_delete=models.CASCADE)

    def __str__(self):
        return self.name
    
class File(models.Model):
    """Django Model to represent a file in the filesystem."""
    name = models.CharField(max_length=255)
    file = models.FileField(upload_to='files/')
    Directory = models.ForeignKey(Directory, related_name='files', on_delete=models.CASCADE)
    size = models.PositiveIntegerField()

    def __str__(self):
        return self.name