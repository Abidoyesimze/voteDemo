'use client';

import { useMemo } from 'react';
import VoteChart from './VoteChart';
import StatsCard from './StatsCard';

interface Contender {
  code: string;
  address: string;
  voteCount: number;
}

interface AnalyticsDashboardProps {
  contenders: Contender[];
  totalVotes: number;
  votingActive: boolean;
  startTime?: number;
  endTime?: number;
}

export default function AnalyticsDashboard({
  contenders,
  totalVotes,
  votingActive,
  startTime,
  endTime,
}: AnalyticsDashboardProps) {
  const stats = useMemo(() => {
    const averageVotes = contenders.length > 0 ? totalVotes / contenders.length : 0;
    const leadingContender = contenders.reduce(
      (max, contender) => (contender.voteCount > max.voteCount ? contender : max),
      contenders[0] || { code: 'N/A', voteCount: 0 }
    );
    const participationRate = totalVotes > 0 ? (totalVotes / (contenders.length * 10)) * 100 : 0; // Assuming max 10 votes per contender

    return {
      averageVotes: Math.round(averageVotes * 10) / 10,
      leadingContender,
      participationRate: Math.min(100, Math.round(participationRate * 10) / 10),
    };
  }, [contenders, totalVotes]);

  const timeRemaining = useMemo(() => {
    if (!votingActive || !endTime) return null;
    const now = Date.now() / 1000;
    const remaining = endTime - now;
    if (remaining <= 0) return null;

    const hours = Math.floor(remaining / 3600);
    const minutes = Math.floor((remaining % 3600) / 60);
    const seconds = Math.floor(remaining % 60);

    return { hours, minutes, seconds };
  }, [votingActive, endTime]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatsCard
          title="Total Votes"
          value={totalVotes.toString()}
          description={`Across ${contenders.length} contenders`}
          icon="📊"
          trend={votingActive ? 'up' : undefined}
        />
        <StatsCard
          title="Average Votes"
          value={stats.averageVotes.toString()}
          description="Per contender"
          icon="📈"
        />
        <StatsCard
          title="Leading Contender"
          value={stats.leadingContender.code}
          description={`${stats.leadingContender.voteCount} votes`}
          icon="🏆"
        />
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Vote Distribution</h3>
        <VoteChart data={contenders} totalVotes={totalVotes} height={250} showLabels showPercentages />
      </div>

      {timeRemaining && (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">Time Remaining</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Voting session ends in</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                {String(timeRemaining.hours).padStart(2, '0')}:
                {String(timeRemaining.minutes).padStart(2, '0')}:
                {String(timeRemaining.seconds).padStart(2, '0')}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Top Contenders</h3>
          <div className="space-y-3">
            {contenders
              .sort((a, b) => b.voteCount - a.voteCount)
              .slice(0, 3)
              .map((contender, index) => (
                <div
                  key={contender.code}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                        index === 0
                          ? 'bg-gradient-to-br from-yellow-400 to-yellow-500'
                          : index === 1
                          ? 'bg-gradient-to-br from-gray-300 to-gray-400'
                          : 'bg-gradient-to-br from-amber-600 to-amber-700'
                      }`}
                    >
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800 dark:text-white">{contender.code}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {((contender.voteCount / totalVotes) * 100).toFixed(1)}% of votes
                      </div>
                    </div>
                  </div>
                  <div className="text-lg font-bold text-gray-800 dark:text-white">{contender.voteCount}</div>
                </div>
              ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Vote Statistics</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Participation Rate</span>
              <span className="font-bold text-gray-800 dark:text-white">{stats.participationRate}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${stats.participationRate}%` }}
              />
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-gray-200 dark:border-gray-700">
              <span className="text-gray-600 dark:text-gray-400">Contenders</span>
              <span className="font-bold text-gray-800 dark:text-white">{contenders.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Status</span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  votingActive
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                {votingActive ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

