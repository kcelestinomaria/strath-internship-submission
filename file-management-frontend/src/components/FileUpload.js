import React, { useState } from 'react';
import { createFile } from '../api'; // Make sure to update the import

const FileUpload = ({ directoryId, setDirectories, setError }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;
    setLoading(true);
    try {
      const uploadedFile = await createFile(directoryId, file);
      setDirectories((prev) => {
        const newDirectories = [...prev];
        // Logic to insert the uploaded file into the correct directory
        const targetDir = newDirectories.find(dir => dir.id === directoryId);
        if (targetDir) {
          targetDir.files = targetDir.files ? [...targetDir.files, uploadedFile] : [uploadedFile];
        }
        return newDirectories;
      });
      setFile(null); // Clear the file input
      setError(null); // Clear error on success
    } catch (error) {
      setError('Failed to upload file');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleUpload} className="mb-4">
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="border p-2"
      />
      <button type="submit" className="ml-2 bg-green-500 text-white p-2" disabled={loading}>
        {loading ? 'Uploading...' : 'Upload'}
      </button>
    </form>
  );
};

export default FileUpload;
