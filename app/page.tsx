"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import NotVoted from "@/components/NotVoted";
import Voted from "@/components/Voted";

// Type for vote counts
type VoteCounts = Record<string, Record<string, number>>;

export default function Home() {
  const [voteCounts, setVoteCounts] = useState<VoteCounts>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const getVoteCounts = async () => {
      try {
        const baseUrl = window.location.origin;
        const res = await fetch(`${baseUrl}/api/votes/counts`, {
          cache: "no-store",
        });
        const data = await res.json();
        if (mounted) setVoteCounts(data);
      } catch (err) {
        console.error("Failed to load vote counts", err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    getVoteCounts();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return <p className="text-center mt-10 text-lg font-semibold">Loading vote counts...</p>;
  }

  return (
    <section className="max-w-7xl mx-auto p-4 space-y-6">
      <div className="bg-[#d96c06] p-4 rounded-md">
        <h1 className="text-center text-3xl font-bold text-white">Election 2025</h1>
      </div>

      <div className="flex flex-col md:flex-row justify-center gap-4">
        <Link
          href="/vote"
          className="bg-green-500 font-bold text-white px-6 py-3 rounded-full text-center hover:bg-green-600 transition"
        >
          Give Your Vote
        </Link>
        <Link
          href="/login"
          className="bg-blue-600 font-bold text-white px-6 py-3 rounded-full text-center hover:bg-blue-700 transition"
        >
          Commissioner Login
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(voteCounts).map(([position, candidates]) => (
          <div key={position} className="bg-indigo-300 p-4 rounded-md shadow">
            <h2 className="text-2xl font-bold text-center mb-3">
              {position
                .replace(/([A-Z])/g, " $1")
                .trim()
                .replace(/\b\w/g, (char) => char.toUpperCase())}
            </h2>
            <ul className="space-y-2">
              {Object.entries(candidates).map(([candidate, count]) => (
                <li
                  key={candidate}
                  className="bg-yellow-200 p-2 rounded-md text-lg font-semibold"
                >
                  {candidate}: <span className="text-base font-bold">{count} votes</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <section className="mt-8 space-y-4">
        <Voted />
        <NotVoted />
      </section>
    </section>
  );
}
