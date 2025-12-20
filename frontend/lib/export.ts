/**
 * Export functionality utilities
 */

export interface VotingResults {
  contenders: Array<{
    code: string;
    address: string;
    voteCount: number;
    percentage: number;
  }>;
  totalVotes: number;
  winner?: {
    code: string;
    address: string;
    voteCount: number;
  };
  votingStatus: {
    active: boolean;
    startTime?: number;
    endTime?: number;
  };
}

/**
 * Export results as JSON
 */
export function exportAsJSON(results: VotingResults, filename: string = 'voting-results.json'): void {
  const dataStr = JSON.stringify(results, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Export results as CSV
 */
export function exportAsCSV(results: VotingResults, filename: string = 'voting-results.csv'): void {
  const rows: string[] = [];
  
  // Header
  rows.push('Code,Address,Vote Count,Percentage');
  
  // Contender data
  results.contenders.forEach(contender => {
    rows.push(
      `"${contender.code}","${contender.address}",${contender.voteCount},${contender.percentage.toFixed(2)}%`
    );
  });
  
  // Summary
  rows.push('');
  rows.push('Summary');
  rows.push(`Total Votes,${results.totalVotes}`);
  if (results.winner) {
    rows.push(`Winner,"${results.winner.code}"`);
    rows.push(`Winner Votes,${results.winner.voteCount}`);
  }
  rows.push(`Voting Status,${results.votingStatus.active ? 'Active' : 'Inactive'}`);
  
  const csvContent = rows.join('\n');
  const dataBlob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Export results as PDF (simple text-based)
 */
export function exportAsText(results: VotingResults, filename: string = 'voting-results.txt'): void {
  const lines: string[] = [];
  
  lines.push('='.repeat(50));
  lines.push('VOTING RESULTS');
  lines.push('='.repeat(50));
  lines.push('');
  
  lines.push('Contenders:');
  results.contenders.forEach((contender, index) => {
    lines.push(`${index + 1}. ${contender.code}`);
    lines.push(`   Address: ${contender.address}`);
    lines.push(`   Votes: ${contender.voteCount} (${contender.percentage.toFixed(2)}%)`);
    lines.push('');
  });
  
  lines.push('Summary:');
  lines.push(`Total Votes: ${results.totalVotes}`);
  if (results.winner) {
    lines.push(`Winner: ${results.winner.code}`);
    lines.push(`Winner Votes: ${results.winner.voteCount}`);
  }
  lines.push(`Status: ${results.votingStatus.active ? 'Active' : 'Inactive'}`);
  lines.push('');
  lines.push(`Generated: ${new Date().toLocaleString()}`);
  
  const textContent = lines.join('\n');
  const dataBlob = new Blob([textContent], { type: 'text/plain' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}









