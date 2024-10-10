// src/pages/DirectoryView.js
import React, { useState, useEffect } from 'react';
import { fetchDirectoryContents } from '../api';
import FileItem from '../components/FileItem';
import DirectoryItem from '../components/DirectoryItem';

const DirectoryView = ({ match }) => {
  const [contents, setContents] = useState({ directories: [], files: [] });

  useEffect(() => {
    fetchDirectoryContents(match.params.id).then(setContents);
  }, [match.params.id]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Directory Contents</h1>
      <div className="grid grid-cols-3 gap-4">
        {contents.directories.map((dir) => (
          <DirectoryItem key={dir.id} directory={dir} />
        ))}
        {contents.files.map((file) => (
          <FileItem key={file.id} file={file} />
        ))}
      </div>
    </div>
  );
};

export default DirectoryView;
