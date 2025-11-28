import { NextResponse } from "next/server";
import Voter from "../../../../models/voters";
import connectMongoDB from "../../../../libs/mongodb";
export async function GET() {
  try {
    await connectMongoDB();

    const notVoted = await Voter.find({ voted: "No" }).lean();

    return NextResponse.json(notVoted, { status: 200 });
  } catch (error) {
    console.error("Error fetching not-voted voters:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
