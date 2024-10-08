from rest_framework import serializers
from .models import Directory, File

class FileSerializer(serializers.ModelSerializer):
    """Serializer for the File model."""
    class Meta:
        model = File
        fields = '__all__' # Include all fields in the serialization

class DirectorySerializer(serializers.ModelSerializer):
    """Serializer for the Directory model."""
    sub_directories = serializers.StringRelatedField(many=True) # Include names of sub-directories
    files = FileSerializer(many=True, read_only=True)


    class Meta:
        model = Directory
        fields = '__all__' # Include all fields in the serialization