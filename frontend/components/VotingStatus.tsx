'use client';

import { useEffect, useState } from 'react';

interface VotingStatusProps {
  isActive: boolean;
  startTime?: number;
  endTime?: number;
}

export default function VotingStatus({ 
  isActive, 
  startTime, 
  endTime 
}: VotingStatusProps) {
  const [timeRemaining, setTimeRemaining] = useState<string>('');

  useEffect(() => {
    if (!isActive || !endTime) {
      setTimeRemaining('');
      return;
    }

    const updateTimer = () => {
      const now = Math.floor(Date.now() / 1000);
      const remaining = endTime - now;
      
      if (remaining <= 0) {
        setTimeRemaining('Ended');
        return;
      }
      
      const hours = Math.floor(remaining / 3600);
      const minutes = Math.floor((remaining % 3600) / 60);
      const seconds = remaining % 60;
      
      setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [isActive, endTime]);

  return (
    <div className="relative bg-white rounded-2xl shadow-lg p-6 border border-gray-200 overflow-hidden">
      {/* Gradient Background */}
      <div className={`absolute inset-0 bg-gradient-to-br transition-opacity duration-300 ${
        isActive 
          ? 'from-green-50 via-blue-50 to-purple-50 opacity-100' 
          : 'from-gray-50 to-gray-100 opacity-100'
      }`} />
      
      <div className="relative">
        <div className="flex items-center gap-3 mb-5">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg ${
            isActive
              ? 'bg-gradient-to-br from-green-500 to-emerald-600'
              : 'bg-gradient-to-br from-gray-400 to-gray-500'
          }`}>
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Voting Status</h3>
            <p className="text-xs text-gray-500">Current election state</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-white/60 backdrop-blur-sm rounded-lg border border-gray-200">
            <span className="text-sm font-medium text-gray-600">Status</span>
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${
                isActive ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
              }`}></span>
              <span className={`text-sm font-bold ${
                isActive ? 'text-green-700' : 'text-gray-700'
              }`}>
                {isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>
          
          {isActive && endTime && timeRemaining && (
            <div className="p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Time Remaining</span>
                <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-mono">
                  {timeRemaining}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
