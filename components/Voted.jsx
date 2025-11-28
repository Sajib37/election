"use client";

import React, { useEffect, useState } from "react"; 
// Import 'useEffect' instead of 'useEffectEvent'

const Voted = () => {
  const [votedVoters, setVotedVoters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Corrected hook: using standard useEffect
  useEffect(() => { 
    // Define the asynchronous function to fetch the data
    const fetchVotedList = async () => {
      try {
        const response = await fetch("/api/voters/voted");

        if (!response.ok) {
          // Handle HTTP error statuses (404, 500, etc.)
          const errorData = await response.json();
          throw new Error(
            errorData.message || `HTTP error! Status: ${response.status}`
          );
        }

        const data = await response.json();
        setVotedVoters(data);
      } catch (err) {
        console.error("Failed to fetch voted list:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVotedList();
  }, []); // Empty dependency array [] ensures it runs ONLY ONCE after initial render

  // --- Rendering Logic ---

  if (loading) {
    return (
      <div className="p-4 text-center text-gray-500">
        ⏳ Loading Voted List...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-center text-red-700 bg-red-100 border border-red-200 rounded">
        ❌ Error: {error}
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">
        ✅ Already Voted ({votedVoters.length})
      </h2>

      {votedVoters.length === 0 ? (
        <p className="text-gray-600">No votes have been recorded yet.</p>
      ) : (
        <ul className="space-y-3">
          {votedVoters.map((voter) => (
            <li
              key={voter.voterId}
              className="p-3 border rounded flex justify-between items-center bg-green-50"
            >
              <div>
                <span className="font-semibold text-lg">{voter.name}</span>
                <span className="ml-4 text-sm text-gray-600">
                  ID: {voter.voterId}
                </span>
              </div>
              <span className="text-sm font-medium text-green-700">
                Department: {voter.department}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Voted;