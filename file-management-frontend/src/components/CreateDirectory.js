// src/components/CreateDirectory.js
import React, { useState } from 'react';

const CreateDirectory = ({ onAddDirectory }) => {
    const [directoryName, setDirectoryName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (directoryName.trim()) {
            onAddDirectory(directoryName);
            setDirectoryName(''); // Clear input
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4 flex">
            <input
                type="text"
                value={directoryName}
                onChange={(e) => setDirectoryName(e.target.value)}
                placeholder="New Directory Name"
                className="border border-gray-300 rounded-l px-4 py-2 flex-grow"
            />
            <button type="submit" className="bg-blue-500 text-white rounded-r px-4 py-2">Create</button>
        </form>
    );
};

export default CreateDirectory;
