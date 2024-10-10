import React, { useState } from 'react';
import { createDirectory } from '../api';

const CreateDirectory = ({ setDirectories, setError }) => {
  const [directoryName, setDirectoryName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!directoryName) {
      setError('Directory name cannot be empty');
      return;
    }
    try {
      const newDirectory = await createDirectory({ name: directoryName });
      setDirectories((prev) => [...prev, newDirectory]);
      setDirectoryName('');
      setError(null); // Clear error on success
    } catch (error) {
      setError('Failed to create directory');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={directoryName}
        onChange={(e) => setDirectoryName(e.target.value)}
        placeholder="New Directory Name"
        className="border p-2 w-1/2"
      />
      <button type="submit" className="ml-2 bg-blue-500 text-white p-2">Create</button>
    </form>
  );
};

export default CreateDirectory;
