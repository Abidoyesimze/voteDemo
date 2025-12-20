/**
 * Share functionality utilities
 */

export interface ShareData {
  title: string;
  text: string;
  url: string;
}

/**
 * Share content using Web Share API or fallback
 */
export async function shareContent(data: ShareData): Promise<boolean> {
  if (navigator.share) {
    try {
      await navigator.share(data);
      return true;
    } catch (error) {
      // User cancelled or error occurred
      if ((error as Error).name !== 'AbortError') {
        console.error('Error sharing:', error);
      }
      return false;
    }
  } else {
    // Fallback: copy to clipboard
    try {
      await navigator.clipboard.writeText(`${data.title}\n\n${data.text}\n\n${data.url}`);
      return true;
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      return false;
    }
  }
}

/**
 * Share voting results
 */
export function shareVotingResults(winner: { code: string; voteCount: number }): ShareData {
  return {
    title: 'Voting Results - QuickVote',
    text: `🏆 Winner: ${winner.code} with ${winner.voteCount} votes!\n\nVote on QuickVote - Decentralized Voting Platform`,
    url: typeof window !== 'undefined' ? window.location.href : '',
  };
}

/**
 * Share voting session
 */
export function shareVotingSession(sessionInfo: {
  contenderCount: number;
  isActive: boolean;
}): ShareData {
  return {
    title: 'Join the Voting Session - QuickVote',
    text: `🗳️ ${sessionInfo.contenderCount} contenders are competing!\n\n${sessionInfo.isActive ? 'Voting is now active!' : 'Voting will start soon!'}\n\nJoin on QuickVote - Decentralized Voting Platform`,
    url: typeof window !== 'undefined' ? window.location.href : '',
  };
}

/**
 * Generate shareable link
 */
export function generateShareableLink(params: Record<string, string>): string {
  const url = new URL(typeof window !== 'undefined' ? window.location.href : '');
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });
  return url.toString();
}









