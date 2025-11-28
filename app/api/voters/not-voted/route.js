// app/api/voters/not-voted/route.js

import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Define the path to your voter list file
const voterListPath = path.join(process.cwd(), 'db', 'voterlist.json');

export async function GET() {
  try {
    // Read the voter list data
    const voterListFile = fs.readFileSync(voterListPath, 'utf8');
    const voterList = JSON.parse(voterListFile);

    // Filter the list to include only those who have NOT voted
    const notVotedList = voterList.filter(voter => voter.Voted === 'No');

    // Return the list of eligible voters who have not yet cast a vote
    return NextResponse.json(notVotedList, { status: 200 });

  } catch (error) {
    console.error('API Error fetching not voted list:', error);
    
    if (error.code === 'ENOENT') {
      return NextResponse.json({ message: 'Voter list file not found.' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}