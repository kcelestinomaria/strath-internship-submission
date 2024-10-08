from django.shortcuts import redirect
from rest_framework import viewsets
from .models import Directory, File
from .serializers import DirectorySerializer, FileSerializer
from rest_framework.response import Response

def redirect_to_api(request):
    return redirect('/api/directories/')  # Redirect to the main directories endpoint

class DirectoryViewSet(viewsets.ModelViewSet):
    """API view for managing directories."""
    queryset = Directory.objects.all()
    serializer_class = DirectorySerializer

    def destroy(self, request, *args, **kwargs):
        """Override destroy method to prevent deletion of non-empty directories."""
        instance = self.get_object()
        # Check if the directory is empty before deletion
        if instance.sub_directories.exists() or instance.files.exists():
            return Response({'error': 'Directory is not empty'}, status=400)
        return super().destroy(request, *args, **kwargs)
    
class FileViewSet(viewsets.ModelViewSet):
    """API view for managing files."""
    queryset = File.objects.all()
    serializer_class = FileSerializer
