import React, { useEffect, useState } from "react";
import axios from "axios";

const FileList = ({ directoryId }) => {
    const [files, setFiles] = useState([]);

    useEffect(() => {
        // Fetch files from the API for the current directory
        const fetchFiles = async () => {
            try {
                const response = await axios.get('/api/directories/${directoryId}/files');
                setFiles(response.data);
            } catch (error) {
                console.error('Error fetching files:', error);
            }
        };
        fetchFiles();
    }, [directoryId]);

    const handleDelete = async (id) => {
        // Delete a file and update the file list
        try {
            await axios.delete(`api/files/${id}`);
            setFiles(files.filter(file => file.id !== id)); // Remove deleted file from state
        } catch (error) {
            console.error('Error deleting file:', error);
        }
    };

    return (
        <div className="mt-4">
            <h2 className="text-xl font-semibold">Files</h2>
            <ul className="list-disc pl-5">
                {files.map(file => (
                    <li key={file.id} className="flex justify-between items-center">
                        <span>{file.name}</span>
                        <button onClick={() => handleDelete(file.id)} className="text-red-500">Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FileList;