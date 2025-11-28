import { IVoteRecord } from "@/app/star/page";
import Image from "next/image";
import React from "react";

const VoteCard = ({ vote }: { vote: IVoteRecord }) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-2 border border-gray-200 max-w-sm w-full">
      {/* Image */}
      <div className="w-full flex justify-center">
        <Image
          src={vote.studentIdCardUrl}
          alt={`${vote.name}'s Student ID Card`}
          width={180}
          height={180}
          className="rounded-lg object-cover shadow w-32 h-40"
        />
      </div>

      {/* Basic Info */}
      <h1 className="text-xl font-semibold text-gray-800 mt-4 text-center">
        {vote.name}
      </h1>

      <p className="text-gray-500 text-center text-sm">
        Voter ID: <span className="font-medium">{vote.voterId}</span>
      </p>

      {/* Given Votes */}
      <div className="mt-5 bg-gray-50 p-4 rounded-lg ">
        <h2 className="text-lg font-semibold text-purple-700 mb-2">
          Given Votes
        </h2>

        <div className="space-y-1 text-gray-700 text-sm">
          <p>
            <span className="font-medium">President:</span> {vote.president}
          </p>
          <p>
            <span className="font-medium">General Secretary:</span>{" "}
            {vote.generalSecretary}
          </p>
          <p>
            <span className="font-medium">Organizational Secretary:</span>{" "}
            {vote.organizationalSecretary}
          </p>
          <p>
            <span className="font-medium">Office Secretary:</span>{" "}
            {vote.officeSecretary}
          </p>
          <p>
            <span className="font-medium">Finance Secretary:</span>{" "}
            {vote.financeSecretary}
          </p>
          <p>
            <span className="font-medium">Publicity Secretary:</span>{" "}
            {vote.publicitySecretary}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VoteCard;
