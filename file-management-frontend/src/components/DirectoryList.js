// src/components/DirectoryList.js
import React, { useState } from 'react';
import axios from 'axios';
import FileDetails from './FileDetails';
import FileList from './FileList';
import CreateFile from './CreateFile';

const DirectoryList = ({ directories, onAddFile }) => {
    const [selectedDirectory, setSelectedDirectory] = useState(null);

    const handleFetchFiles = (directoryId) => {
        setSelectedDirectory(directoryId);
    };

    return (
        <div className="mt-4">
            {directories.map((directory) => (
                <div key={directory.id} className="mb-4 border p-4 rounded shadow">
                    <h2 className="text-xl font-semibold">{directory.name}</h2>
                    <button
                        onClick={() => handleFetchFiles(directory.id)}
                        className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                    >
                        View Files
                    </button>
                    <CreateFile directoryId={directory.id} onAddFile={onAddFile} />
                    {selectedDirectory === directory.id && (
                        <>
                            <FileList directoryId={directory.id} />
                            <FileDetails directoryId={directory.id} />
                        </>
                    )}
                </div>
            ))}
        </div>
    );
};

export default DirectoryList;
