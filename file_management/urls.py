"""
URL configuration for file_management project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from files.views import redirect_to_api # redirects to endpoint view
from files import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', redirect_to_api, name='redirect-to-api'), # for the root url
    path('api/', include('files.urls')), # Include the file management app's URLs
    path('api/files/', views.list_files, name='list_files'),
    path('api/files/<int:file_id>/', views.delete_file, name='delete_file'),
    path('api/files/upload/', views.upload_file, name='upload_file'),
    path('api/directories/', views.list_directories, name='list_directories'),
    path('api/directories/create/', views.create_directory, name='create_directory'),
    path('api/directories/<int:directory_id>/', views.delete_directory, name='delete_directory'),
]
