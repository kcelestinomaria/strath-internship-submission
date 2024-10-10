// src/pages/Home.js
import React, { useState, useEffect } from 'react';
import { fetchDirectoriesAndFiles } from '../api';
import DirectoryItem from '../components/DirectoryItem';

const Home = () => {
  const [directories, setDirectories] = useState([]);

  useEffect(() => {
    fetchDirectoriesAndFiles().then(setDirectories);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Root Directory</h1>
      <div className="grid grid-cols-3 gap-4">
        {directories.map((dir) => (
          <DirectoryItem key={dir.id} directory={dir} />
        ))}
      </div>
    </div>
  );
};

export default Home;
