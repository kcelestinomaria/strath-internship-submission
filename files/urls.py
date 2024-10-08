from django.urls import path, include 
from rest_framework.routers import DefaultRouter
from .views import DirectoryViewSet, FileViewSet

router = DefaultRouter()
router.register(r'files', FileViewSet) # Register file routes
router.register(r'directories', DirectoryViewSet) # Register directory routes

urlpatterns = [
    path('api/', include(router.urls)), # Include the API routes
]