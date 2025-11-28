import { NextResponse } from "next/server";
import Voter from "../../../../models/voters";
import connectMongoDB from "../../../../libs/mongodb";
export async function GET() {
  try {
    await connectMongoDB();

    const voted = await Voter.find({ voted: "Yes" }).lean();

    return NextResponse.json(voted, { status: 200 });
  } catch (error) {
    console.error("Error fetching voted voters:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
