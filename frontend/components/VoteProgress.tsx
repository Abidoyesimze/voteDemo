'use client';

import ProgressBar from './ProgressBar';

interface VoteProgressProps {
  voteCount: number;
  totalVotes: number;
  contenderCode: string;
  showDetails?: boolean;
}

export default function VoteProgress({
  voteCount,
  totalVotes,
  contenderCode,
  showDetails = true,
}: VoteProgressProps) {
  const percentage = totalVotes > 0 ? (voteCount / totalVotes) * 100 : 0;
  const colors: Array<'blue' | 'purple' | 'green' | 'pink'> = ['blue', 'purple', 'green', 'pink'];
  const colorIndex = contenderCode.charCodeAt(0) % colors.length;
  const color = colors[colorIndex];

  return (
    <div className="space-y-2">
      {showDetails && (
        <div className="flex items-center justify-between text-sm">
          <span className="font-semibold text-gray-700 dark:text-gray-300">
            {contenderCode}
          </span>
          <span className="font-bold text-gray-900 dark:text-white">
            {voteCount} / {totalVotes}
          </span>
        </div>
      )}
      <ProgressBar
        value={voteCount}
        max={totalVotes}
        color={color}
        size="md"
        showPercentage={false}
        animated={true}
      />
      {showDetails && (
        <div className="text-right">
          <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">
            {percentage.toFixed(1)}% of total votes
          </span>
        </div>
      )}
    </div>
  );
}

