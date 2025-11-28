import { NextResponse } from "next/server";
import Vote from "../../../../models/vote";
import connectMongoDB from "../../../../libs/mongodb";


export async function GET() {
  try {
    // Connect to MongoDB
    await connectMongoDB();

    // Fetch all votes, sorted by timestamp descending
    const votes = await Vote.find().sort({ createdAt: -1 }).lean();

    return NextResponse.json(votes, { status: 200 });
  } catch (error) {
    console.error("Error fetching votes:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
