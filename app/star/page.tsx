"use client";
import VoteCard from "@/components/VoteCard";

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

const page = async () => {
  // Fetch all votes
  const allVotes = await fetch(
    `/api/votes/all`,
    {
      cache: "no-store",
    }
  ).then((res) => res.json());
  const sortedVotes = allVotes.sort(
    (a: IVoteRecord, b: IVoteRecord) =>
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <section className="bg-pink-300/10 min-h-screen">
      <div className="max-w-7xl mx-auto p-2 ">
        <h1 className="text-4xl text-center font-bold mt-10">
          All vote Information
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {sortedVotes.map((vote: IVoteRecord, index: number) => (
            <VoteCard key={index} vote={vote} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default page;
