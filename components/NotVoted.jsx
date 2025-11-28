"use client";
import { useEffect, useState } from "react";

const NotVoted = () => {
  const [notVotedVoters, setNotVotedVoters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotVotedList = async () => {
      try {
        const res = await fetch("/api/voters/not-voted");

        if (!res.ok) {
          let errMsg = `HTTP Error ${res.status}`;
          try {
            const err = await res.json();
            errMsg = err.message || errMsg;
          } catch {}
          throw new Error(errMsg);
        }

        const data = await res.json();
        setNotVotedVoters(data || []);
      } catch (err) {
        console.error("Failed to fetch not-voted list:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNotVotedList();
  }, []);

  if (loading) {
    return (
      <div className="p-4 text-center text-gray-500">
        ⏳ Loading Not-Voted List...
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
    <div className="max-w-4xl mx-auto p-6 bg-white/40 shadow-xl rounded-lg w-full">
      <h2 className="text-2xl font-bold mb-4 text-center">
        🔔 Yet to Vote ({notVotedVoters.length})
      </h2>

      {notVotedVoters.length === 0 ? (
        <p className="text-green-600 font-semibold">
          Great! All eligible voters have cast their vote.
        </p>
      ) : (
        <ul className="space-y-3">
          {notVotedVoters.map((voter) => (
            <li
              key={voter.voterId}
              className="p-3 border rounded flex justify-between items-center bg-purple-500/10 gap-4"
            >
              <div className="flex flex-col">
                <span className="font-semibold text-lg">{voter.name}</span>
                <span className=" text-sm text-gray-600">
                  
                  Dept: {voter.department}
                </span>
              </div>
              <span className="text-sm font-medium text-yellow-700">
                ID: {voter.voterId}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotVoted;
