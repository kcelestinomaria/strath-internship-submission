
from django.urls import path, include 
from rest_framework.routers import DefaultRouter
from .views import DirectoryViewSet, FileViewSet


router = DefaultRouter()
router.register(r'directories', DirectoryViewSet, basename='directory') # Register directory routes
router.register(r'files', FileViewSet, basename='file') # Register file routes

"""
urlpatterns = [
    path('api/', include(router.urls)), # Include the API routes
]
"""
urlpatterns = router.urls # We use router.urls to automatically generate routes

