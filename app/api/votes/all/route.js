

import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Define the path to your votes file
const votesPath = path.join(process.cwd(), 'db', 'votes.json');

export async function GET() {
  try {
    // Read the entire votes.json file
    const votesFile = fs.readFileSync(votesPath, 'utf8');
    const allVotes = JSON.parse(votesFile);

    // Return the entire array of vote records
    return NextResponse.json(allVotes, { status: 200 });

  } catch (error) {
    console.error('API Error fetching all votes:', error);
    
    // Handle the case where the file might not exist or parsing fails
    if (error.code === 'ENOENT') {
      return NextResponse.json({ message: 'Votes file not found. Check the db/votes.json path.' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}