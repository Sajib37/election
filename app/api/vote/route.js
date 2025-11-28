import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import Voter from "../../../models/voters";
import Vote from "../../../models/vote";
import connectMongoDB from "../../../libs/mongodb";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Helper to convert file to buffer
async function bufferToStream(file) {
  const bytes = await file.arrayBuffer();
  return Buffer.from(bytes);
}

export async function POST(req) {
  try {
    const formData = await req.formData();
    const voterId = Number(formData.get("voterId"));
    const studentIdFile = formData.get("studentIdFile");

    // --- 1. Upload student ID to Cloudinary ---
    let studentIdUrl = "";
    if (studentIdFile) {
      const buffer = await bufferToStream(studentIdFile);
      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ folder: "voter_ids" }, (err, result) => {
          if (err) reject(err);
          resolve(result);
        }).end(buffer);
      });
      studentIdUrl = uploadResult.secure_url;
    }

    // --- 2. Ensure MongoDB is connected ---
    await connectMongoDB();

    // --- 3. Check voter ---
    const voter = await Voter.findOne({ voterId });
    if (!voter) {
      return NextResponse.json(
        { success: false, error: "Invalid voter ID" },
        { status: 403 }
      );
    }

    if (voter.voted === "Yes") {
      return NextResponse.json(
        { success: false, error: "This voter has already voted" },
        { status: 409 }
      );
    }

    // --- 4. Save vote ---
    const voteData = {
      voterId,
      studentIdCardUrl: studentIdUrl,
      name: voter.name,
      department: voter.department,
      president: formData.get("president"),
      generalSecretary: formData.get("generalSecretary"),
      organizationalSecretary: formData.get("organizationalSecretary"),
      officeSecretary: formData.get("officeSecretary"),
      financeSecretary: formData.get("financeSecretary"),
      publicitySecretary: formData.get("publicitySecretary"),
      timestamp: new Date(),
    };

    const newVote = await Vote.create(voteData);

    // --- 5. Update voter status ---
    voter.voted = "Yes";
    await voter.save();

    // --- 6. Success response ---
    return NextResponse.json({ success: true, vote: newVote }, { status: 200 });
  } catch (error) {
    console.error("Vote submission failed:", error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
