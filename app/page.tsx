"use client";
import Link from "next/link";
import NotVoted from "@/components/NotVoted";
import Voted from "@/components/Voted";
import Comissioner from "@/components/Comissioner";
import LiveDashboard from "@/components/LiveDashboard";

export default function Home() {


  return (
    <section className="max-w-7xl mx-auto p-2">
      
      <div className="mt-14 p-2 bg-green-500 font-bold mx-auto text-white w-42 text-center rounded-full">
        <Link href="/vote">Give Your Vote</Link>
      </div>

      <div className="my-8 bg-blue-600 text-white mx-auto w-44 p-2 rounded-full text-center font-bold">
        <Link href="/login">Comissioner Login</Link>
      </div>

      {/* <LiveDashboard/> */}

      
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
