// src/components/FileDetails.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FileDetails = ({ directoryId }) => {
    const [files, setFiles] = useState([]);

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const response = await axios.get(`/api/directories/${directoryId}/files`);
                setFiles(response.data);
            } catch (error) {
                console.error('Error fetching file details:', error);
            }
        };

        if (directoryId) {
            fetchFiles();
        }
    }, [directoryId]);

    return (
        <div className="mt-4">
            <h3 className="text-lg font-bold">File Details:</h3>
            {files.map((file) => (
                <div key={file.id} className="mt-2">
                    <p>{file.name}</p>
                    <a href={file.file_path} download className="text-blue-500 underline">
                        Download
                    </a>
                </div>
            ))}
        </div>
    );
};

export default FileDetails;
