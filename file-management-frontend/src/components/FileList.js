// src/components/FileList.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const FileList = ({ directoryId }) => {
    const [files, setFiles] = useState([]);

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const response = await axios.get(`/api/directories/${directoryId}/files`);
                setFiles(response.data);
            } catch (error) {
                console.error('Error fetching files:', error);
            }
        };

        if (directoryId) {
            fetchFiles();
        }
    }, [directoryId]);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/files/${id}`);
            setFiles(files.filter(file => file.id !== id)); // Update state
        } catch (error) {
            console.error('Error deleting file:', error);
        }
    };

    return (
        <div className="mt-4">
            <h2 className="text-xl font-semibold">Files</h2>
            <ul className="list-disc pl-5">
                {files.length > 0 ? (
                    files.map(file => (
                        <li key={file.id} className="flex justify-between items-center">
                            <span>{file.name}</span>
                            <button onClick={() => handleDelete(file.id)} className="text-red-500">Delete</button>
                        </li>
                    ))
                ) : (
                    <li>No files in this directory</li>
                )}
            </ul>
        </div>
    );
};

export default FileList;
