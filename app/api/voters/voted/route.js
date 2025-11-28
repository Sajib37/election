// app/api/voters/voted/route.js

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

    // Filter the list to include only those who have voted
    const votedList = voterList.filter(voter => voter.Voted === 'Yes');

    // Return the list of voters who have already voted
    return NextResponse.json(votedList, { status: 200 });

  } catch (error) {
    console.error('API Error fetching voted list:', error);
    
    // Handle the case where the file might not exist or parsing fails
    if (error.code === 'ENOENT') {
      return NextResponse.json({ message: 'Voter list file not found.' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}