from django.shortcuts import redirect
from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Directory, File
from .serializers import DirectorySerializer, FileSerializer
from django.http import JsonResponse
from django.core.exceptions import ObjectDoesNotExist
import os

# API to list all files
class ListFiles(APIView):
    def get(self, request):
        files = File.objects.all()
        file_data = [{"id": f.id, "name": f.name, "directory": f.directory.name} for f in files]
        return JsonResponse(file_data, safe=False, status=status.HTTP_200_OK)

# API to list all directories
class ListDirectories(APIView):
    def get(self, request):
        directories = Directory.objects.all()
        dir_data = [{"id": d.id, "name": d.name, "parent": d.parent.name if d.parent else None} for d in directories]
        return JsonResponse(dir_data, safe=False, status=status.HTTP_200_OK)

# API to create a directory
class CreateDirectory(APIView):
    def post(self, request):
        data = request.data
        parent_id = data.get('parent_id')
        name = data.get('name')

        try:
            parent = Directory.objects.get(id=parent_id) if parent_id else None
            new_directory = Directory.objects.create(name=name, parent=parent)
            os.makedirs(new_directory.get_absolute_path(), exist_ok=True)
            return JsonResponse({"id": new_directory.id, "name": new_directory.name}, status=status.HTTP_201_CREATED)
        except ObjectDoesNotExist:
            return JsonResponse({"error": "Parent directory not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# API to delete a directory
class DeleteDirectory(APIView):
    def delete(self, request, directory_id):
        try:
            directory = Directory.objects.get(id=directory_id)
            directory_path = directory.get_absolute_path()

            # Check if the directory is empty
            if directory.subdirectories.exists() or directory.files.exists():
                return JsonResponse({"error": "Cannot delete a non-empty directory"}, status=status.HTTP_400_BAD_REQUEST)

            directory.delete()
            os.rmdir(directory_path)
            return JsonResponse({"message": "Directory deleted successfully"}, status=status.HTTP_200_OK)
        except Directory.DoesNotExist:
            return JsonResponse({"error": "Directory not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# API to upload a file
class UploadFile(APIView):
    def post(self, request):
        try:
            file = request.FILES['file']
            directory_id = request.POST.get('directory_id')
            directory = Directory.objects.get(id=directory_id)

            file_instance = File.objects.create(name=file.name, file=file, directory=directory)
            return JsonResponse({"id": file_instance.id, "name": file_instance.name}, status=status.HTTP_201_CREATED)
        except Directory.DoesNotExist:
            return JsonResponse({"error": "Directory not found"}, status=status.HTTP_404_NOT_FOUND)
        except KeyError:
            return JsonResponse({"error": "No file provided"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# API to delete a file
class DeleteFile(APIView):
    def delete(self, request, file_id):
        try:
            file = File.objects.get(id=file_id)
            os.remove(file.get_absolute_path())
            file.delete()
            return JsonResponse({"message": "File deleted successfully"}, status=status.HTTP_200_OK)
        except File.DoesNotExist:
            return JsonResponse({"error": "File not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# Redirection to the directories endpoint
def redirect_to_api(request):
    return redirect('/api/directories/')  # Redirect to the main directories endpoint

# ViewSet for directories
class DirectoryViewSet(viewsets.ModelViewSet):
    queryset = Directory.objects.all()
    serializer_class = DirectorySerializer

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.subdirectories.exists() or instance.files.exists():
            return Response({'error': 'Directory is not empty'}, status=status.HTTP_400_BAD_REQUEST)
        return super().destroy(request, *args, **kwargs)

# ViewSet for files
class FileViewSet(viewsets.ModelViewSet):
    queryset = File.objects.all()
    serializer_class = FileSerializer
