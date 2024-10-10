import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DirectoryList from './components/DirectoryList';
import CreateDirectory from './components/CreateDirectory';
import CreateFile from './components/CreateFile';

function App() {
    const [directories, setDirectories] = useState([]);

    useEffect(() => {
        fetchDirectories();
    }, []);

    const fetchDirectories = async () => {
        try {
            const response = await axios.get('/api/directories/');
            setDirectories(response.data);
        } catch (error) {
            console.error('Error fetching directories', error);
        }
    };

    const handleAddDirectory = async (name) => {
        try {
            const response = await axios.post('/api/directories/', { name });
            setDirectories([...directories, response.data]);
        } catch (error) {
            console.error('Error adding directory', error);
        }
    };

    const handleAddFile = async (directoryId, fileData) => {
        try {
            const response = await axios.post(`/api/directories/${directoryId}/files`, fileData);
            fetchDirectories(); // Refresh directories to get the latest files
        } catch (error) {
            console.error('Error adding file', error);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4">File Management System</h1>
            <CreateDirectory onAddDirectory={handleAddDirectory} />
            <DirectoryList directories={directories} onAddFile={handleAddFile} />
        </div>
    );
}

export default App;
