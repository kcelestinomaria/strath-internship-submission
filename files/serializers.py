from rest_framework import serializers
from .models import Directory, File

class FileSerializer(serializers.ModelSerializer):
    """Serializer for the File model."""
    class Meta:
        model = File
        fields = ['id', 'name', 'directory', 'file']

class DirectorySerializer(serializers.ModelSerializer):
    """Serializer for the Directory model."""
    subdirectories = serializers.StringRelatedField(many=True, required=False)  # Make this optional
    files = serializers.StringRelatedField(many=True, required=False)  # Make this optional

    class Meta:
        model = Directory
        fields = ['id', 'name', 'parent', 'subdirectories', 'files']  # Ensure all field names are correct
