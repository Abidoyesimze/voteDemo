'use client';

import { useState } from 'react';
import { useVotingContract } from '@/hooks/useVotingContract';

interface AdminPanelProps {
  isOwner?: boolean;
}

export default function AdminPanel({ isOwner = false }: AdminPanelProps) {
  const {
    loading,
    error,
    batchRegister,
    registerContender,
    startVoting,
    endVoting,
  } = useVotingContract();

  const [showPanel, setShowPanel] = useState(true);
  const [batchMode, setBatchMode] = useState(true);
  
  // Batch registration
  const [batchAddresses, setBatchAddresses] = useState(['', '', '']);
  const [batchCodes, setBatchCodes] = useState(['', '', '']);
  
  // Single registration
  const [singleAddress, setSingleAddress] = useState('');
  const [singleCode, setSingleCode] = useState('');
  
  // Start voting
  const [duration, setDuration] = useState('');
  const [durationUnit, setDurationUnit] = useState<'seconds' | 'minutes' | 'hours'>('hours');

  if (!isOwner) return null;

  const handleBatchRegistration = async () => {
    if (batchAddresses.some(addr => !addr) || batchCodes.some(code => !code)) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const tx = await batchRegister(
        batchAddresses as [string, string, string],
        batchCodes as [string, string, string]
      );
      
      if (tx) {
        alert('Batch registration successful!');
        setBatchAddresses(['', '', '']);
        setBatchCodes(['', '', '']);
        // Reload page to update contender list
        window.location.reload();
      }
    } catch (err: any) {
      alert(`Error: ${err.message || 'Failed to register contenders'}`);
    }
  };

  const handleSingleRegistration = async () => {
    if (!singleAddress || !singleCode) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const tx = await registerContender(singleAddress, singleCode);
      
      if (tx) {
        alert('Registration successful!');
        setSingleAddress('');
        setSingleCode('');
        // Reload page to update contender list
        window.location.reload();
      }
    } catch (err: any) {
      alert(`Error: ${err.message || 'Failed to register contender'}`);
    }
  };

  const handleStartVoting = async () => {
    const durationNum = parseInt(duration, 10);
    if (!durationNum || durationNum <= 0) {
      alert('Please enter a valid duration');
      return;
    }

    // Convert to seconds based on unit
    let durationInSeconds = durationNum;
    if (durationUnit === 'minutes') {
      durationInSeconds = durationNum * 60;
    } else if (durationUnit === 'hours') {
      durationInSeconds = durationNum * 3600;
    }

    try {
      const tx = await startVoting(durationInSeconds);
      
      if (tx) {
        alert('Voting started successfully!');
        setDuration('');
        // Reload page to update voting status
        window.location.reload();
      }
    } catch (err: any) {
      alert(`Error: ${err.message || 'Failed to start voting'}`);
    }
  };

  const handleEndVoting = async () => {
    if (!confirm('Are you sure you want to end voting?')) {
      return;
    }

    try {
      const tx = await endVoting();
      
      if (tx) {
        alert('Voting ended!');
        // Reload page to update voting status
        window.location.reload();
      }
    } catch (err: any) {
      alert(`Error: ${err.message || 'Failed to end voting'}`);
    }
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 to-white rounded-2xl shadow-xl p-6 border-2 border-purple-200 hover:shadow-2xl transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-xl">📝</span>
          </div>
          <div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">Register & Manage</h2>
            <p className="text-xs text-gray-500">Register contenders and control voting</p>
          </div>
        </div>
        <button
          onClick={() => setShowPanel(!showPanel)}
          className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:text-purple-600 hover:bg-purple-50 transition-colors"
          aria-label={showPanel ? 'Collapse panel' : 'Expand panel'}
        >
          {showPanel ? '▼' : '▶'}
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm">
          {error}
        </div>
      )}

      {loading && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-blue-800 text-sm text-center">
          Processing transaction...
        </div>
      )}

      {showPanel && (
        <div className="space-y-6">
          {/* Registration Mode Toggle */}
          <div className="flex gap-4 mb-4">
            <button
              onClick={() => setBatchMode(true)}
              className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                batchMode
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Batch Registration (3 at once)
            </button>
            <button
              onClick={() => setBatchMode(false)}
              className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                !batchMode
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Single Registration
            </button>
          </div>

          {/* Batch Registration Form */}
          {batchMode && (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-700">Register 3 Contenders</h3>
                <p className="text-xs text-gray-500 mt-1">
                  The <strong>Code</strong> is a unique identifier (like "ALICE" or "CODE1") that voters will use to vote for this contender. It must be unique and cannot be changed later.
                </p>
              </div>
              {[0, 1, 2].map((index) => (
                <div key={index} className="space-y-2">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label htmlFor={`batch-address-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                        Contender {index + 1} Address
                      </label>
                      <input
                        id={`batch-address-${index}`}
                        type="text"
                        placeholder="0x..."
                        value={batchAddresses[index]}
                        onChange={(e) => {
                          const newAddrs = [...batchAddresses];
                          newAddrs[index] = e.target.value;
                          setBatchAddresses(newAddrs);
                        }}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label htmlFor={`batch-code-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                        Code {index + 1} <span className="text-gray-500 font-normal">(unique identifier)</span>
                      </label>
                      <input
                        id={`batch-code-${index}`}
                        type="text"
                        placeholder="e.g., ALICE, BOB, or CODE1"
                        value={batchCodes[index]}
                        onChange={(e) => {
                          const newCodes = [...batchCodes];
                          newCodes[index] = e.target.value;
                          setBatchCodes(newCodes);
                        }}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                      <p className="text-xs text-gray-500 mt-1">Voters will use this code to vote</p>
                    </div>
                  </div>
                </div>
              ))}
              <button
                onClick={handleBatchRegistration}
                disabled={loading}
                className="w-full py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Processing...' : 'Register All 3 Contenders'}
              </button>
            </div>
          )}

          {/* Single Registration Form */}
          {!batchMode && (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-700">Register Single Contender</h3>
                <p className="text-xs text-gray-500 mt-1">
                  The <strong>Code</strong> is a unique identifier (like "ALICE" or "CODE1") that voters will use to vote for this contender. It must be unique and cannot be changed later.
                </p>
              </div>
              <div>
                <label htmlFor="single-address" className="block text-sm font-medium text-gray-700 mb-1">
                  Contender Address
                </label>
                <input
                  id="single-address"
                  type="text"
                  placeholder="0x..."
                  value={singleAddress}
                  onChange={(e) => setSingleAddress(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="single-code" className="block text-sm font-medium text-gray-700 mb-1">
                  Code <span className="text-gray-500 font-normal">(unique identifier)</span>
                </label>
                <input
                  id="single-code"
                  type="text"
                  placeholder="e.g., ALICE, BOB, or CODE1"
                  value={singleCode}
                  onChange={(e) => setSingleCode(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">Voters will use this code to vote for this contender</p>
              </div>
              <button
                onClick={handleSingleRegistration}
                disabled={loading}
                className="w-full py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Processing...' : 'Register Contender'}
              </button>
            </div>
          )}

          {/* Start Voting */}
          <div className="pt-4 border-t border-gray-200">
            <h3 className="font-semibold text-gray-700 mb-3">Start Voting Session</h3>
            <div className="space-y-3">
              <div>
                <label htmlFor="voting-duration" className="block text-sm font-medium text-gray-700 mb-1">
                  Voting Duration
                </label>
                <div className="flex gap-2">
                  <input
                    id="voting-duration"
                    type="number"
                    placeholder="e.g., 24"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    min="1"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <label htmlFor="duration-unit" className="sr-only">Duration Unit</label>
                  <select
                    id="duration-unit"
                    value={durationUnit}
                    onChange={(e) => setDurationUnit(e.target.value as 'seconds' | 'minutes' | 'hours')}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                    aria-label="Duration unit"
                  >
                    <option value="hours">Hours</option>
                    <option value="minutes">Minutes</option>
                    <option value="seconds">Seconds</option>
                  </select>
                </div>
              </div>
              <button
                onClick={handleStartVoting}
                disabled={loading || !duration}
                className="w-full py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg font-semibold hover:from-green-700 hover:to-green-800 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? '⏳ Processing...' : '🚀 Start Voting Session'}
              </button>
              {duration && (
                <p className="text-xs text-gray-500 text-center">
                  Voting will run for {duration} {durationUnit} ({durationUnit === 'hours' ? parseInt(duration) * 3600 : durationUnit === 'minutes' ? parseInt(duration) * 60 : duration} seconds)
                </p>
              )}
            </div>
          </div>

          {/* End Voting */}
          <div className="pt-4 border-t border-gray-200">
            <button
              onClick={handleEndVoting}
              disabled={loading}
              className="w-full py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Processing...' : 'End Voting'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

