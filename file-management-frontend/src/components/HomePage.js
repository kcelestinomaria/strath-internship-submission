import React, { useState, useEffect } from 'react';
import CreateDirectory from './CreateDirectory';
import DirectoryTree from './DirectoryTree';
import ErrorMessage from './ErrorMessage';
import { fetchDirectories } from '../api'; // API calls

const HomePage = () => {
  const [directories, setDirectories] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDirectories = async () => {
      try {
        const data = await fetchDirectories();
        setDirectories(data);
        setError(null); // Clear error on success
      } catch (err) {
        setError('Failed to load directories');
      } finally {
        setLoading(false);
      }
    };
    loadDirectories();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">File Manager</h1>
      <CreateDirectory setDirectories={setDirectories} setError={setError} />
      {loading && <p className="text-gray-500">Loading directories...</p>}
      {error && <ErrorMessage message={error} />}
      <DirectoryTree directories={directories} setDirectories={setDirectories} setError={setError} />
    </div>
  );
};

export default HomePage;
