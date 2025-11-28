// utils/voteCounter.ts
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export type Vote = {
  voterId: number;
  studentIdCardUrl: string;
  name: string;
  department: string;
  president: string;
  generalSecretary: string;
  organizationalSecretary: string;
  officeSecretary: string;
  financeSecretary: string;
  publicitySecretary: string;
  createdAt?: string; 
  updatedAt?: string; 
};

export type Candidates = Record<string, string[]>;
export type VoteCounts = Record<string, Record<string, number>>;

export async function getVoteCounts(): Promise<VoteCounts> {
  try {
    // --- 1. Fetch all votes from the API ---
    const res = await fetch(`/api/votes/all`, { cache: "no-store" });
    if (!res.ok) {
      throw new Error(`Failed to fetch votes: ${res.status} ${res.statusText}`);
    }
    const allVotes: Vote[] = await res.json();

    // --- 2. Define candidates for each position ---
    const candidates: Candidates = {
      president: ["MD Sajib Hossen", "MD Hasanuzzaman"],
      generalSecretary: ["MD Torikul Islam", "SP Prodip", "MD Ariful Islam"],
      organizationalSecretary: ["MD Reduan Islam", "Kamran Siddiky Imrose"],
      officeSecretary: ["Sadika Islam Disha", "Ismail Hossain"],
      financeSecretary: ["Shabbir Ahmed Sweet", "Antor Haldar"],
      publicitySecretary: [
        "Tashrif Ahmed",
        "Monayem Kabir Shihab",
        "Esrafil Hossen Shanto",
      ],
    };

    // --- 3. Count votes for each candidate ---
    const voteCounts: VoteCounts = {};
    for (const position in candidates) {
      voteCounts[position] = {};
      candidates[position].forEach((candidate) => {
        voteCounts[position][candidate] = allVotes.filter(
          (vote: Vote) => vote[position as keyof Vote] === candidate
        ).length;
      });
    }

    return voteCounts;
  } catch (error) {
    console.error("Error in getVoteCounts:", error);
    // Return empty counts in case of failure
    return {};
  }
}
