from django.db import models
import os

# Create your models here.
class Directory(models.Model):
    """Django Model to represent a directory in the local filesystem"""
    name = models.CharField(max_length=255)
    parent = models.ForeignKey('self', null=True, blank=True, related_name='subdirectories', on_delete=models.CASCADE)

    def __str__(self):
        return self.name
    
    def get_absolute_path(self):
        """Get the absolute path of this directory in the filesystem"""
        path = self.name 
        parent = self.parent
        while parent:
            path = os.path.join(parent.name, path)
            parent = parent.parent
        return path
    
class File(models.Model):
    """Django Model to represent a file in the filesystem."""
    name = models.CharField(max_length=255)
    file = models.FileField(upload_to='files/')
    Directory = models.ForeignKey(Directory, related_name='files', on_delete=models.CASCADE)
    size = models.PositiveIntegerField()

    def __str__(self):
        return self.name
    
    def get_absolute_path(self):
        """Get the absolute file path"""
        return os.path.join(self.directory.get_absolute_path(), self.name)