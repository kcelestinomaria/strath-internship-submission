import axios from 'axios';

const API_URL = 'http://localhost:8000/api'; // Adjust for your Django API

// Fetch all directories
export const fetchDirectories = async () => {
  try {
    const response = await fetch(`${API_URL}/directories/`);
    if (!response.ok) throw new Error('Failed to fetch directories');
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Create a new directory
export const createDirectory = async (data) => {
  try {
    const response = await fetch(`${API_URL}/directories/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create directory');
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Fetch files in a directory
export const fetchFiles = async (directoryId) => {
  try {
    const response = await fetch(`${API_URL}/directories/${directoryId}/files/`);
    if (!response.ok) throw new Error('Failed to fetch files');
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Create a new file in a directory
export const createFile = async (directoryId, file) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch(`${API_URL}/directories/${directoryId}/files/`, {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) throw new Error('Failed to upload file');
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Delete a directory or file
export const deleteFileOrDirectory = async (id) => {
  try {
    const response = await fetch(`${API_URL}/directories/${id}/`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete');
  } catch (error) {
    console.error(error);
    throw error;
  }
};
