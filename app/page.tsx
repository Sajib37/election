"use client";
import Link from "next/link";
import NotVoted from "@/components/NotVoted";
import Voted from "@/components/Voted";
import { getVoteCounts } from "@/utils/CountVote";
import Comissioner from "@/components/Comissioner";
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

export default function Home() {
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
    <section className="max-w-7xl mx-auto p-2">
      

      <div className="mt-14 p-2 bg-green-500 font-bold mx-auto text-white w-42 text-center rounded-full">
        <Link href="/vote">Give Your Vote</Link>
      </div>

      <div className="my-8 bg-blue-600 text-white mx-auto w-44 p-2 rounded-full text-center font-bold">
        <Link href="/login">Comissioner Login</Link>
      </div>

      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-4 gap-2">
        {Object.entries(voteCounts ?? {}).map(([position, candidates],index) => {
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
          )
        })}
      </div> */}

      
      <section className="mt-18 flex flex-col lg:flex-row gap-10">
        <Voted />
        <NotVoted />
      </section>
      <div>
        <Comissioner/>
      </div>
    </section>
  );
}
