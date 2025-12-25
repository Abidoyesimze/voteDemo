'use client';

import { useMemo } from 'react';

interface VoteData {
  code: string;
  address: string;
  voteCount: number;
}

interface VoteChartProps {
  data: VoteData[];
  totalVotes: number;
  showLabels?: boolean;
  showPercentages?: boolean;
  height?: number;
}

export default function VoteChart({
  data,
  totalVotes,
  showLabels = true,
  showPercentages = true,
  height = 300,
}: VoteChartProps) {
  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => b.voteCount - a.voteCount);
  }, [data]);

  const colors = [
    'from-blue-500 to-blue-600',
    'from-purple-500 to-purple-600',
    'from-pink-500 to-pink-600',
    'from-green-500 to-green-600',
    'from-amber-500 to-amber-600',
    'from-red-500 to-red-600',
  ];

  const maxVotes = useMemo(() => {
    return Math.max(...data.map((d) => d.voteCount), 1);
  }, [data]);

  if (data.length === 0 || totalVotes === 0) {
    return (
      <div
        className="flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700"
        style={{ height: `${height}px` }}
      >
        <p className="text-gray-500 dark:text-gray-400">No vote data available</p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      <div
        className="flex items-end gap-2 justify-center"
        style={{ height: `${height}px` }}
        role="img"
        aria-label="Vote chart visualization"
      >
        {sortedData.map((item, index) => {
          const percentage = totalVotes > 0 ? (item.voteCount / totalVotes) * 100 : 0;
          const barHeight = totalVotes > 0 ? (item.voteCount / maxVotes) * 100 : 0;
          const colorClass = colors[index % colors.length];

          return (
            <div
              key={item.code}
              className="flex-1 flex flex-col items-center group relative"
              style={{ maxWidth: '150px' }}
            >
              <div className="w-full flex flex-col items-center h-full justify-end">
                <div
                  className={`w-full bg-gradient-to-t ${colorClass} rounded-t-lg transition-all duration-500 ease-out relative overflow-hidden group-hover:opacity-90`}
                  style={{ height: `${barHeight}%`, minHeight: item.voteCount > 0 ? '4px' : '0' }}
                  role="progressbar"
                  aria-valuenow={item.voteCount}
                  aria-valuemin={0}
                  aria-valuemax={totalVotes}
                  aria-label={`${item.code}: ${item.voteCount} votes`}
                >
                  <div className="absolute inset-0 bg-white/20 animate-shimmer" />
                  {showPercentages && item.voteCount > 0 && (
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-bold text-gray-700 dark:text-gray-200 whitespace-nowrap">
                      {percentage.toFixed(1)}%
                    </div>
                  )}
                </div>
              </div>
              {showLabels && (
                <div className="mt-2 text-center">
                  <div className="text-sm font-bold text-gray-800 dark:text-gray-200 truncate max-w-full">
                    {item.code}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {item.voteCount} {item.voteCount === 1 ? 'vote' : 'votes'}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

