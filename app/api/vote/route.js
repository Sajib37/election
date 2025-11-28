// app/api/vote/route.js

import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary using environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// --- Database File Path Definitions ---
const voterListPath = path.join(process.cwd(), 'db', 'voterlist.json');
const votesPath = path.join(process.cwd(), 'db', 'votes.json');

// Helper to convert File to buffer for Cloudinary upload
async function bufferToStream(file) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    return buffer;
}

export async function POST(req) {
  let uploadedImageUrl = null;
  let body;

  try {
    // 1. Extract file and form data from the multipart form submission
    const formData = await req.formData();
    const imageFile = formData.get('studentIdFile');
    const voterId = formData.get('voterId');

    // Create a plain object from form data for the voting logic
    body = {
        voterId: voterId,
        studentId: '', // Placeholder, will hold the URL
        president: formData.get('president'),
        generalSecretary: formData.get('generalSecretary'),
        organizationalSecretary: formData.get('organizationalSecretary'),
        officeSecretary: formData.get('officeSecretary'),
        financeSecretary: formData.get('financeSecretary'),
        publicitySecretary: formData.get('publicitySecretary'),
    };
    
    // --- 2. Secure Cloudinary Upload ---
    if (imageFile) {
        const buffer = await bufferToStream(imageFile);
        
        const uploadResult = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({ folder: "voter_ids" }, (error, result) => {
                if (error) reject(error);
                resolve(result);
            }).end(buffer);
        });

        uploadedImageUrl = uploadResult.secure_url;
        body.studentId = uploadedImageUrl; // Set the URL for the business logic
    }
    
    // --- 3. Core Voting Business Logic ---

    const targetVoterId = Number(body.voterId); 
    const { studentId, ...voteData } = body; // Destructure the final data
    
    // Basic initial validation (check for all votes and the uploaded URL)
    if (!targetVoterId || !studentId || Object.keys(voteData).length < 6) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields or ID image.' },
        { status: 400 }
      );
    }

    // Read and Parse Data Files
    const voterListFile = fs.readFileSync(voterListPath, 'utf8');
    let voterList = JSON.parse(voterListFile);

    // Find the voter's index
    const voterIndex = voterList.findIndex(
      (voter) => voter['Voter Id'] === targetVoterId
    );

    if (voterIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Invalid Voter ID. You are not on the official voter list.' },
        { status: 403 }
      );
    }
    
    const voter = voterList[voterIndex];

    // Check for Duplicate Vote ('Voted' status)
    if (voter.Voted === 'Yes') {
      return NextResponse.json(
        { success: false, error: 'This Voter ID has already cast a vote.' },
        { status: 409 }
      );
    }

    // --- 4. Success: Save Vote and Update Status ---

    // A. Read existing votes and append the new vote
    const votesFile = fs.readFileSync(votesPath, 'utf8');
    const votes = JSON.parse(votesFile);

    const newVote = {
      voterId: targetVoterId,
      studentIdCardUrl: studentId, // Store the secure URL
      name: voter.Name,
      department: voter.Department,
      timestamp: new Date().toISOString(),
      ...voteData, 
    };

    votes.push(newVote);
    fs.writeFileSync(votesPath, JSON.stringify(votes, null, 2));

    // B. Update the voter list status to "Voted": "Yes"
    voterList[voterIndex].Voted = 'Yes';
    fs.writeFileSync(voterListPath, JSON.stringify(voterList, null, 2));

    // Success Response
    return NextResponse.json(
      { success: true, message: 'Vote submitted successfully! Your ID card has been recorded.', vote: newVote },
      { status: 200 }
    );

  } catch (error) {
    console.error('SERVER ERROR:', error);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error during processing.' },
      { status: 500 }
    );
  }
}