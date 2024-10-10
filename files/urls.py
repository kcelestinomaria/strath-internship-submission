from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DirectoryViewSet, FileViewSet, ListFiles, ListDirectories, CreateDirectory, DeleteDirectory, UploadFile, DeleteFile

# Create the router and register the viewsets
router = DefaultRouter()
router.register(r'directories', DirectoryViewSet, basename='directory')
router.register(r'files', FileViewSet, basename='file')

# Define urlpatterns
urlpatterns = [
    path('api/', include(router.urls)),  # Include the API routes
    path('api/files/', ListFiles.as_view(), name='list_files'),
    path('api/directories/', ListDirectories.as_view(), name='list_directories'),
    path('api/directories/create/', CreateDirectory.as_view(), name='create_directory'),
    path('api/directories/<int:directory_id>/delete/', DeleteDirectory.as_view(), name='delete_directory'),
    path('api/files/upload/', UploadFile.as_view(), name='upload_file'),
    path('api/files/<int:file_id>/delete/', DeleteFile.as_view(), name='delete_file'),
]
