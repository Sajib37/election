"use client";

import { useEffect, useState } from "react";
import VoteCard from "@/components/VoteCard";
import LiveDashboard from "@/components/LiveDashboard";

export interface IVoteRecord {
  voterId: number;
  name: string;
  department: string;
  studentIdCardUrl: string;
  timestamp: string;
  president: string;
  generalSecretary: string;
  organizationalSecretary: string;
  officeSecretary: string;
  financeSecretary: string;
  publicitySecretary: string;
}

const Page = () => {
  const [votes, setVotes] = useState<IVoteRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadVotes = async () => {
      const res = await fetch(`/api/votes/all`, {
        cache: "no-store",
      });
      const data = await res.json();

      // Sort by latest timestamp
      const sorted = data.sort(
        (a: IVoteRecord, b: IVoteRecord) =>
          new Date(b.timestamp).getTime() -
          new Date(a.timestamp).getTime()
      );

      setVotes(sorted);
      setLoading(false);
    };

    loadVotes();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl">
        Loading Votes...
      </div>
    );
  }

  return (
    <section className="bg-pink-300/10 min-h-screen">
      <div className="max-w-7xl mx-auto p-2">
        <h1 className="text-3xl text-center font-bold my-10">
          All Vote Information
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {votes.map((vote, index) => (
            <VoteCard key={index} vote={vote} />
          ))}
        </div>
      </div>


      <LiveDashboard/>
    </section>
  );
};

export default Page;
