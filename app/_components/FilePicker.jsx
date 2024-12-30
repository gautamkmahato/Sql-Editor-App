'use client'

import { useState } from "react";

// components/FilePicker.js
const FilePicker = ({ handleFilePicker }) => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [folderName, setFolderName] = useState(null);
    const [folderAbsolutePath, setFolderAbsolutePath] = useState('');
 
    const handleFolderSelection = async (event) => {
        event.preventDefault();
        const folderFiles = Array.from(event.target.files);
        setSelectedFiles(folderFiles);
        console.log(folderFiles);

        const dbFilesArray = folderFiles.filter((val) => val.name.split('.')[1] === 'db');
        console.log(dbFilesArray);

        // my code
        // Get the full path of the first file
        const files = event.target.files;
        const filePath = files[0].webkitRelativePath;
        const folderPathhh = filePath.substring(0, filePath.indexOf("/"));
        console.log("filePath: ", filePath, folderPathhh);

        // my code ends here
        if (!folderFiles.length && dbFilesArray.length === 0) {
            alert('Please select a folder');
            return;
        }

        const folderPath = folderFiles[0].webkitRelativePath.split('/')[0];
        console.log(folderPath);
        setFolderName(folderName);

        // new code
        setFolderAbsolutePath(e.target.value)

        try {
            const response = await fetch('http://localhost:3000/api/databases/select-folder', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ folderAbsolutePath }),
            });

            const result = await response.json();
            console.log(result);

            if (response.ok) {
                handleFilePicker(folderPath); 
                const databaseResponse = await fetch('http://localhost:3000/api/databases/table/length');
                const databaseResult = await databaseResponse.json();
                console.log("database Result ", databaseResult)
                if (databaseResponse.ok) {
                    handleFilePicker(folderPath, databaseResult.result); 
                } else {
                    console.error('Error fetching databases:', databaseResult.error);
                }
            } else {
                console.error('Error setting folder:', result.error);
            }
        } catch (error) {
            console.error('Error selecting folder:', error);
        }
    };

    const handle = async (e) =>{
        e.preventDefault();
        console.log(folderAbsolutePath);
        const folderNameArray = folderAbsolutePath.split('//');
        const folderName = folderNameArray[folderNameArray.length-1];
        console.log(folderName)
        try {
            const response = await fetch('http://localhost:3000/api/databases/select-folder', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ folderAbsolutePath }),
            });

            const result = await response.json();
            console.log(result);

            if (response.ok) {
                handleFilePicker(folderName); 
                const databaseResponse = await fetch('http://localhost:3000/api/databases/table/length');
                const databaseResult = await databaseResponse.json();
                console.log("database Result ", databaseResult)
                if (databaseResponse.ok) {
                    handleFilePicker(folderName, databaseResult.result); 
                } else {
                    console.error('Error fetching databases:', databaseResult.error);
                }
            } else {
                console.error('Error setting folder:', result.error);
            }
        } catch (error) {
            console.error('Error selecting folder:', error);
        }
    }

    return (
        <div className="max-w-md mx-auto mt-12">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 bg-gray-50 shadow-xl hover:shadow-2xl transition-shadow">
                <div className="text-center">
                    <div className="mb-6">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-16 w-16 mx-auto text-blue-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3 16l4 4m0 0l4-4m-4 4V4m13 8h-6m0 0l3-3m-3 3l3 3"
                            />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">Provide database folder path</h2>
                    <form onSubmit={handle}>
                    <input type='text' value={folderAbsolutePath} 
                    onChange={(e) => setFolderAbsolutePath(e.target.value)} 
                        className="border p-2 rounded w-full"
                    />
                        <button
                    className="bg-gray-800 mt-6 mb-2 text-white px-4 py-2 rounded"
                >
                    Submit
                </button>
                    </form>

                    <p className="text-gray-600 text-sm mb-6">
                        Choose a folder to upload.
                    </p>

                </div>
            </div>
        </div>
    );
};

export default FilePicker;
