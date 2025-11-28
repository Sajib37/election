// utils/voteCounter.ts
export type Vote = {
  president: string;
  generalSecretary: string;
  organizationalSecretary: string;
  officeSecretary: string;
  financeSecretary: string;
  publicitySecretary: string;
};

export type Candidates = Record<string, string[]>;
export type VoteCounts = Record<string, Record<string, number>>;

export async function getVoteCounts(): Promise<VoteCounts> {
  // Fetch all votes
  const allVotes: Vote[] = await fetch(`http://localhost:3000/api/votes/all`, {
    cache: "no-store",
  }).then(res => res.json());

  // Candidates object
  const candidates: Candidates = {
    president: ["MD Sajib Hossen", "MD Hasanuzzaman"],
    generalSecretary: ["MD Torikul Islam", "SP Prodip", "MD Ariful Islam"],
    organizationalSecretary: ["MD Reduan Islam", "Kamran Siddiky Imrose"],
    officeSecretary: ["Sadika Islam Disha", "Ismail Hossain"],
    financeSecretary: ["Shabbir Ahmed Sweet", "Antor Haldar"],
    publicitySecretary: ["Tashrif Ahmed", "Monayem Kabir Shihab", "Esrafil Hossen Shanto"]
  };

  // Count votes
  const voteCounts: VoteCounts = {};
  for (const position in candidates) {
    voteCounts[position] = {};
    candidates[position].forEach(candidate => {
      voteCounts[position][candidate] = allVotes.filter(
        (vote: Vote) => vote[position as keyof Vote] === candidate
      ).length;
    });
  }

  return voteCounts;
}
