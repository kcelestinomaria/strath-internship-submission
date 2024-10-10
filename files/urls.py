from django.urls import path
from . import views

urlpatterns = [
    path('files/', views.list_files),
    path('files/<int:id>/', views.file_detail),
    path('files/upload/', views.upload_file),
    path('files/<int:id>/update/', views.update_file),
    path('files/<int:id>/delete/', views.delete_file),
    path('directories/', views.list_directories),
    path('directories/<int:id>/sub-directories/', views.get_subdirectories),
    path('directories/<int:id>/files/', views.get_files_in_directory),
    path('directories/create/', views.create_directory),
    path('directories/<int:id>/update/', views.update_directory),
    path('directories/<int:id>/delete/', views.delete_directory),
]
