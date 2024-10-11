import axios from 'axios';

const API_URL = process.env.API_URL || 'http://localhost:8000/api'; // Use an environment variable for flexibility

const handleError = (error) => {
  if (error.response) {
    return error.response.data; // Return server response
  } else if (error.request) {
    return 'Network error. Please try again later.';
  } else {
    return error.message;
  }
};

// Fetch all directories
export const fetchDirectories = async (signal) => {
  try {
    const response = await axios.get(`${API_URL}/directories/`, { signal });
    return response.data;
  } catch (error) {
    console.error('Error fetching directories:', handleError(error));
    throw error;
  }
};

// Create a new directory
export const createDirectory = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/directories/`, data);
    return response.data;
  } catch (error) {
    console.error('Error creating directory:', handleError(error));
    throw error;
  }
};

// Fetch files in a directory
export const fetchFiles = async (directoryId) => {
  try {
    const response = await axios.get(`${API_URL}/directories/${directoryId}/files/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching files:', handleError(error));
    throw error;
  }
};

// Create a new file in a directory (single file)
export const createFile = async (directoryId, file) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await axios.post(`${API_URL}/directories/${directoryId}/files/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading file:', handleError(error));
    throw error;
  }
};

// Create multiple files in a directory
export const createMultipleFiles = async (directoryId, files) => {
  const formData = new FormData();
  for (const file of files) {
    formData.append('files', file);
  }

  try {
    const response = await axios.post(`${API_URL}/directories/${directoryId}/files/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading multiple files:', handleError(error));
    throw error;
  }
};

// Delete a directory or file
export const deleteFileOrDirectory = async (id, isDirectory = false) => {
  try {
    await axios.delete(`${API_URL}/directories/${isDirectory ? '' : 'files/'}${id}/`);
  } catch (error) {
    console.error('Error deleting:', handleError(error));
    throw error;
  }
};

// Rename a file or directory
export const renameFileInBackend = async (fileId, newName, isDirectory) => {
  try {
    await axios.put(`${API_URL}/files/${fileId}/`, { name: newName, isDirectory });
  } catch (error) {
    console.error('Error renaming file/directory:', handleError(error));
    throw error; // Re-throw the error for handling in the component
  }
};
