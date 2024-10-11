from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Directory, File
from .serializers import DirectorySerializer, FileSerializer
import os
import logging

logger = logging.getLogger(__name__)

@api_view(['GET'])
def list_files(request):
    files = File.objects.all()
    serializer = FileSerializer(files, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def file_detail(request, id):
    try:
        file = File.objects.get(pk=id)
    except File.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = FileSerializer(file)
    return Response(serializer.data)

@api_view(['POST'])
def upload_file(request):
    serializer = FileSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
def update_file(request, id):
    try:
        file = File.objects.get(pk=id)
    except File.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = FileSerializer(file, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def delete_file(request, id):
    try:
        file = File.objects.get(pk=id)
    except File.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    file.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
def list_directories(request):
    directories = Directory.objects.all()
    serializer = DirectorySerializer(directories, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_subdirectories(request, id):
    try:
        directory = Directory.objects.get(pk=id)
    except Directory.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = DirectorySerializer(directory.subdirectories.all(), many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_files_in_directory(request, id):
    try:
        directory = Directory.objects.get(pk=id)
    except Directory.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = FileSerializer(directory.files.all(), many=True)
    return Response(serializer.data)

@api_view(['POST'])
def create_directory(request):
    logger.info(f"Request Method: {request.method}, Request Data: {request.data}")

    # Deserialize the request data to create a new directory
    serializer = DirectorySerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    # Log validation errors
    logger.error(f"Validation errors: {serializer.errors}")
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
def update_directory(request, id):
    try:
        directory = Directory.objects.get(pk=id)
    except Directory.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = DirectorySerializer(directory, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def delete_directory(request, id):
    try:
        directory = Directory.objects.get(pk=id)
    except Directory.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if directory.subdirectories.exists() or directory.files.exists():
        return Response({"error": "Directory is not empty."}, status=status.HTTP_400_BAD_REQUEST)
    
    directory.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
