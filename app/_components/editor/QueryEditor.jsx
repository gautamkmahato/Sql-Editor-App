import React from 'react'

export default function QueryEditor({ query, setQuery, handleExecuteQuery }) {
  const handle = () =>{
    console.log("queryyyyyyyyyyyyyy");
    console.log(query)
    handleExecuteQuery(query)
  }
  return( 
      <>
          <div className="mb-4">
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-4">SQL Query Editor</h2>
              <textarea
                value={query} onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter your SQL query here..."
                className="w-full h-40 p-4 border rounded-md font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handle}
                className="mt-4 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
              >
                Execute Query
              </button>
            </div>
          </div>
      </>
  )
}
