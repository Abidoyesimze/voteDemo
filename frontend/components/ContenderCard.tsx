'use client';

interface ContenderCardProps {
  code: string;
  address: string;
  voteCount: number;
  totalVotes?: number;
  hasVoted?: boolean;
  onVote?: (code: string) => void;
  isVotingActive?: boolean;
}

export default function ContenderCard({
  code,
  address,
  voteCount,
  totalVotes = 0,
  hasVoted = false,
  onVote,
  isVotingActive = false,
}: ContenderCardProps) {
  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 8)}...${addr.slice(-6)}`;
  };

  const percentage = totalVotes > 0 ? (voteCount / totalVotes) * 100 : 0;

  return (
    <div className="group relative bg-white rounded-2xl shadow-lg p-6 border border-gray-200 hover:border-blue-300 transition-all duration-300 card-hover overflow-hidden">
      {/* Gradient Background on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse shadow-lg"></div>
              <h3 className="text-2xl font-bold gradient-text">{code}</h3>
            </div>
            <div className="inline-flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200 group-hover:bg-white group-hover:border-blue-200 transition-colors">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p className="text-sm text-gray-600 font-mono">{formatAddress(address)}</p>
            </div>
          </div>
          <div className="text-right ml-4">
            <div className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              {voteCount}
            </div>
            <div className="text-xs text-gray-500 font-semibold uppercase tracking-wide mt-1">votes</div>
          </div>
        </div>

        {/* Vote Progress Bar */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Progress</span>
            <span className="text-sm font-bold text-gray-700">{percentage.toFixed(1)}%</span>
          </div>
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-500 relative overflow-hidden"
              style={{ width: `${percentage}%` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-shimmer" />
            </div>
          </div>
        </div>

        {/* Vote Button */}
        {isVotingActive && (
          <button
            onClick={() => onVote?.(code)}
            disabled={hasVoted}
            className={`
              w-full py-3.5 rounded-xl font-semibold transition-all duration-300 relative overflow-hidden
              ${
                hasVoted
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]'
              }
            `}
          >
            {hasVoted ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Already Voted
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Vote Now
              </span>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
