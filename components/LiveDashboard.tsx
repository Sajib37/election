"use client";
import { getVoteCounts } from "@/utils/CountVote";
import { useEffect, useState } from "react";
const colors = [
  "bg-red-300",
  "bg-green-300",
  "bg-blue-300",
  "bg-orange-500",
  "bg-purple-300",
  "bg-pink-300",
];
type VoteCounts = Record<string, Record<string, number>>;

const LiveDashboard = () => {
  const [voteCounts, setVoteCounts] = useState<VoteCounts | null>(null);

  useEffect(() => {
    let mounted = true;
    async function fetchCounts() {
      try {
        const counts = await getVoteCounts();
        if (!mounted) return;
        setVoteCounts(counts);
      } catch (error) {
        console.error("Failed to load vote counts:", error);
      }
    }
    fetchCounts();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="max-w-7xl mx-auto my-6 py-4 bg-pink-100 rounded-md p-2">
      <h1 className="text-3xl text-white rounded-md mb-4 font-bold bg-orange-500 p-2 text-center mb-2">Live Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-4 gap-2">
        {Object.entries(voteCounts ?? {}).map(
          ([position, candidates], index) => {
            const bgColor = colors[index % colors.length];
            return (
              <div className={`${bgColor} p-3 rounded-md`} key={position}>
                <h2 className="text-2xl font-bold text-center mb-2">
                  {position
                    .replace(/([A-Z])/g, " $1")
                    .trim()
                    .replace(/\b\w/g, (char) => char.toUpperCase())}
                </h2>

                <ul className="rounded-md flex flex-col gap-2">
                  {Object.entries(candidates).map(([candidate, count]) => (
                    <li
                      className="bg-yellow-200 p-2 rounded-md text-lg font-semibold"
                      key={candidate}
                    >
                      {candidate}:{" "}
                      <span className="text-base font-bold">{count} votes</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          }
        )}
      </div>
    </section>
  );
};

export default LiveDashboard;
