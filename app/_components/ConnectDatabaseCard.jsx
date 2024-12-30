'use client';

import { Database, FileEdit } from 'lucide-react';
import { useState } from 'react';

const ConnectDatabaseCard = ({ handleSelectedFolder }) => {
    const [folderAbsolutePath, setFolderAbsolutePath] = useState('');
 
    const handleConnection = async (e) =>{
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
                handleSelectedFolder(folderName); 
                const databaseResponse = await fetch('http://localhost:3000/api/databases/table/length');
                const databaseResult = await databaseResponse.json();
                console.log("database Result ", databaseResult)
                if (databaseResponse.ok) {
                    handleSelectedFolder(folderName, databaseResult.result); 
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
        <div className="max-w-lg mx-auto mt-16">
    <div className="max-w-lg mx-auto mt-16">
    <div className="border border-gray-200 rounded-xl p-10 bg-white shadow-lg hover:shadow-2xl transition-shadow">
        <div className="flex flex-col items-center text-center">
            <div className="mb-8 flex flex-col items-center">
                <Database className="h-14 w-14 text-red-500 mx-auto" />
                <h1 className="text-3xl font-bold text-gray-800 mt-4">Database Manager</h1>
                <p className="text-base text-gray-600 mt-2">No selected database</p>
            </div>
            <form onSubmit={handleConnection} className="w-full">
                <input
                    type='text'
                    value={folderAbsolutePath}
                    onChange={(e) => setFolderAbsolutePath(e.target.value)}
                    placeholder="Enter folder path"
                    className="border border-gray-300 rounded-md w-full p-3 focus:ring-2 focus:ring-red-500 focus:outline-none"
                />
                <button
                    type="submit"
                    className="bg-gray-800 hover:bg-gray-900 text-white w-full mt-6 py-3 rounded-md text-lg font-medium transition-colors"
                >
                    Connect Database
                </button>
            </form>
            <p className="text-gray-600 text-sm mt-4">
                Provide the folder path.
            </p>
        </div>
    </div>

</div>

</div>

    );
};

export default ConnectDatabaseCard;
