import React from 'react';
import { deleteFileOrDirectory } from '../api';

const DirectoryTree = ({ directories, setDirectories, setError }) => {
  // Recursive function to render directory structure
  const renderTree = (nodes) => {
    return nodes.map((node) => (
      <div key={node.id} className="ml-4">
        <div className="flex items-center">
          <span>{node.name}</span>
          <button onClick={() => handleDelete(node.id)} className="ml-2 text-red-500">Delete</button>
        </div>
        {node.children && node.children.length > 0 && (
          <div>{renderTree(node.children)}</div>
        )}
      </div>
    ));
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await deleteFileOrDirectory(id);
        setDirectories((prev) => prev.filter((item) => item.id !== id));
      } catch (error) {
        setError('Failed to delete the item');
      }
    }
  };

  return (
    <div>
      {renderTree(directories)}
    </div>
  );
};

export default DirectoryTree;
