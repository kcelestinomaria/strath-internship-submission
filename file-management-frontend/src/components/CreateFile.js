// src/components/CreateFile.js
import React, { useState } from 'react';

const CreateFile = ({ directoryId, onAddFile }) => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            await onAddFile(directoryId, formData);
            setFile(null); // Clear input
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mt-2 flex">
            <input
                type="file"
                onChange={handleFileChange}
                className="border border-gray-300 rounded-l px-4 py-2 flex-grow"
            />
            <button type="submit" className="bg-green-500 text-white rounded-r px-4 py-2">Upload</button>
        </form>
    );
};

export default CreateFile;
