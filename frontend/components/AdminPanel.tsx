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
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
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

    setSuccessMessage(null);
    try {
      const tx = await batchRegister(
        batchAddresses as [string, string, string],
        batchCodes as [string, string, string]
      );
      
      if (tx) {
        // Transaction confirmed
        setSuccessMessage('Transaction confirmed! Batch registration successful.');
        setBatchAddresses(['', '', '']);
        setBatchCodes(['', '', '']);
        // Reload page after a short delay to update contender list
        setTimeout(() => {
          window.location.reload();
        }, 2000);
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

    setSuccessMessage(null);
    try {
      const tx = await registerContender(singleAddress, singleCode);
      
      if (tx) {
        // Transaction confirmed
        setSuccessMessage('Transaction confirmed! Registration successful.');
        setSingleAddress('');
        setSingleCode('');
        // Reload page after a short delay to update contender list
        setTimeout(() => {
          window.location.reload();
        }, 2000);
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

    setSuccessMessage(null);
    try {
      const tx = await startVoting(durationInSeconds);
      
      if (tx) {
        // Transaction confirmed
        setSuccessMessage('Transaction confirmed! Voting session started successfully.');
        setDuration('');
        // Reload page after a short delay to update voting status
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (err: any) {
      alert(`Error: ${err.message || 'Failed to start voting'}`);
    }
  };

  const handleEndVoting = async () => {
    if (!confirm('Are you sure you want to end voting?')) {
      return;
    }

    setSuccessMessage(null);
    try {
      const tx = await endVoting();
      
      if (tx) {
        // Transaction confirmed
        setSuccessMessage('Transaction confirmed! Voting session ended.');
        // Reload page after a short delay to update voting status
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (err: any) {
      alert(`Error: ${err.message || 'Failed to end voting'}`);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-3xl border border-purple-100 dark:border-purple-900 bg-white dark:bg-gray-800 shadow-[0_25px_60px_rgba(79,70,229,0.12)] dark:shadow-[0_25px_60px_rgba(79,70,229,0.3)] p-6 md:p-8">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-purple-900/20 dark:via-gray-800 dark:to-blue-900/20 opacity-70 pointer-events-none" />
      <div className="absolute -right-8 -top-8 w-36 h-36 bg-purple-200/40 dark:bg-purple-800/40 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute -left-10 bottom-0 w-40 h-40 bg-blue-200/40 dark:bg-blue-800/40 blur-3xl rounded-full pointer-events-none" />

      <div className="relative">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 text-white flex items-center justify-center shadow-lg">
              🛠️
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-purple-500 dark:text-purple-400">Owner Console</p>
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">Register & Manage Session</h2>
            </div>
          </div>
          <button
            onClick={() => setShowPanel(!showPanel)}
            className="p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:border-purple-200 dark:hover:border-purple-700 transition-all"
            aria-label={showPanel ? 'Collapse panel' : 'Expand panel'}
          >
            {showPanel ? '−' : '+'}
          </button>
        </div>

        {error && (
          <div className="mb-4 p-4 rounded-2xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-sm flex items-center gap-3">
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {successMessage && (
          <div className="mb-4 p-4 rounded-2xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-sm flex items-center gap-3">
            <span>✅</span>
            <span>{successMessage}</span>
          </div>
        )}

        {loading && (
          <div className="mb-4 p-4 rounded-2xl border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm flex items-center gap-3 justify-center">
            <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <span>Waiting for transaction confirmation…</span>
          </div>
        )}

        {showPanel && (
          <div className="space-y-8">
            {/* Registration Mode Toggle */}
            <div className="bg-white/80 border border-purple-100 rounded-2xl p-3 shadow-inner">
              <div className="flex gap-3">
                <button
                  onClick={() => setBatchMode(true)}
                  className={`flex-1 py-3 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                    batchMode
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg'
                      : 'bg-gray-50 border border-gray-200 text-gray-600 hover:text-purple-600 hover:border-purple-200'
                  }`}
                >
                  <span>👥</span>
                  Batch (3)
                </button>
                <button
                  onClick={() => setBatchMode(false)}
                  className={`flex-1 py-3 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                    !batchMode
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg'
                      : 'bg-gray-50 border border-gray-200 text-gray-600 hover:text-purple-600 hover:border-purple-200'
                  }`}
                >
                  <span>👤</span>
                  Single
                </button>
              </div>
            </div>

            {/* Batch Registration Form */}
            {batchMode && (
              <div className="space-y-5">
                <div className="bg-slate-50/70 border border-slate-100 rounded-2xl p-5 shadow-inner">
                  <h3 className="text-lg font-semibold text-slate-900">Register 3 Contenders</h3>
                  <p className="text-sm text-slate-500 mt-1">
                    Assign unique addresses and voting codes. Each code is permanent once registered.
                  </p>
                </div>
                {[0, 1, 2].map((index) => (
                  <div key={index} className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-600">Contender {index + 1}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-purple-50 text-purple-600 border border-purple-100">Required</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor={`batch-address-${index}`} className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                          Wallet Address
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
                          className="mt-2 w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 bg-white"
                        />
                      </div>
                      <div>
                        <label htmlFor={`batch-code-${index}`} className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                          Voting Code
                        </label>
                        <input
                          id={`batch-code-${index}`}
                          type="text"
                          placeholder="e.g., ALICE"
                          value={batchCodes[index]}
                          onChange={(e) => {
                            const newCodes = [...batchCodes];
                            newCodes[index] = e.target.value;
                            setBatchCodes(newCodes);
                          }}
                          className="mt-2 w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 bg-white"
                        />
                        <p className="text-xs text-gray-400 mt-1">Voters will enter this code</p>
                      </div>
                    </div>
                  </div>
                ))}
                <button
                  onClick={handleBatchRegistration}
                  disabled={loading}
                  className="w-full py-3.5 rounded-2xl font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg hover:shadow-xl transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? 'Processing…' : 'Register All Contenders'}
                </button>
              </div>
            )}

            {/* Single Registration Form */}
          {!batchMode && (
              <div className="space-y-5">
                <div className="bg-slate-50/70 border border-slate-100 rounded-2xl p-5 shadow-inner">
                  <h3 className="text-lg font-semibold text-slate-900">Register Single Contender</h3>
                  <p className="text-sm text-slate-500 mt-1">
                    Ideal for incremental updates or replacement contenders between elections.
                  </p>
                </div>
                <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-4">
                  <div>
                    <label htmlFor="single-address" className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Contender Address
                    </label>
                    <input
                      id="single-address"
                      type="text"
                      placeholder="0x..."
                      value={singleAddress}
                      onChange={(e) => setSingleAddress(e.target.value)}
                      className="mt-2 w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 bg-white"
                    />
                  </div>
                  <div>
                    <label htmlFor="single-code" className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Voting Code
                    </label>
                    <input
                      id="single-code"
                      type="text"
                      placeholder="e.g., CODE1"
                      value={singleCode}
                      onChange={(e) => setSingleCode(e.target.value)}
                      className="mt-2 w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 bg-white"
                    />
                  </div>
                  <button
                    onClick={handleSingleRegistration}
                    disabled={loading}
                    className="w-full py-3.5 rounded-2xl font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg hover:shadow-xl transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Processing…' : 'Register Contender'}
                  </button>
                </div>
              </div>
            )}

            {/* Start Voting */}
            <div className="pt-2 space-y-4 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-900">Start Voting Session</h3>
                <span className="text-xs px-2 py-1 rounded-full bg-green-50 text-green-700 border border-green-100">Required</span>
              </div>
              <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-4">
                <div>
                  <label htmlFor="voting-duration" className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Voting Duration
                  </label>
                  <div className="mt-2 flex flex-col sm:flex-row gap-3">
                    <input
                      id="voting-duration"
                      type="number"
                      placeholder="24"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      min="1"
                      className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 bg-white"
                    />
                    <select
                      id="duration-unit"
                      value={durationUnit}
                      onChange={(e) => setDurationUnit(e.target.value as 'seconds' | 'minutes' | 'hours')}
                      className="px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white text-gray-900"
                    >
                      <option value="hours">Hours</option>
                      <option value="minutes">Minutes</option>
                      <option value="seconds">Seconds</option>
                    </select>
                  </div>
                </div>
                {duration && (
                  <p className="text-xs text-gray-500 bg-gray-50 rounded-xl px-4 py-2">
                    Voting will run for {duration} {durationUnit} (
                    {durationUnit === 'hours'
                      ? parseInt(duration, 10) * 3600
                      : durationUnit === 'minutes'
                        ? parseInt(duration, 10) * 60
                        : duration} seconds)
                  </p>
                )}
                <button
                  onClick={handleStartVoting}
                  disabled={loading || !duration}
                  className="w-full py-3.5 rounded-2xl font-semibold text-white bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg hover:shadow-xl transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? 'Launching…' : 'Start Voting Session'}
                </button>
              </div>
            </div>

            {/* End Voting */}
            <div className="pt-2 border-t border-gray-100">
              <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-slate-900">End Voting</h3>
                  <span className="text-xs text-gray-400">Manual override</span>
                </div>
                <button
                  onClick={handleEndVoting}
                  disabled={loading}
                  className="w-full py-3.5 rounded-2xl font-semibold text-white bg-gradient-to-r from-rose-500 to-red-600 shadow-lg hover:shadow-xl transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? 'Ending…' : 'End Voting Session'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

