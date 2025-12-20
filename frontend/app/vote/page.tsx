'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import WalletButton from '@/components/WalletButton';
import AdminPanel from '@/components/AdminPanel';
import VotingStatus from '@/components/VotingStatus';
import ContenderCard from '@/components/ContenderCard';
import WinnerDisplay from '@/components/WinnerDisplay';
import VoteConfirmationModal from '@/components/VoteConfirmationModal';
import ContenderFilters, { type SortOption, type FilterOption } from '@/components/ContenderFilters';
import { useVotingContract } from '@/hooks/useVotingContract';
import { sortContenders, filterContenders } from '@/lib/sorting';
import type { ContDetails } from '@/lib/contract';

interface Contender {
  code: string;
  address: string;
  voteCount: number;
}

export default function VotePage() {
  const {
    address,
    isConnected,
    loading,
    error,
    isOwner,
    getVotingStatus,
    getAllContendersWithDetails,
    getWinner,
    hasVoted: checkHasVoted,
    vote,
    getTotalVotes,
  } = useVotingContract();

  const [contenders, setContenders] = useState<Contender[]>([]);
  const [votingActive, setVotingActive] = useState(false);
  const [votingStartTime, setVotingStartTime] = useState<number>(0);
  const [votingEndTime, setVotingEndTime] = useState<number>(0);
  const [hasVoted, setHasVoted] = useState(false);
  const [totalVotes, setTotalVotes] = useState(0);
  const [winner, setWinner] = useState<{ address: string; code: string; voteCount: number } | undefined>();
  const [isOwnerValue, setIsOwnerValue] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [selectedContender, setSelectedContender] = useState<{ code: string; address: string } | null>(null);
  const [sortOption, setSortOption] = useState<SortOption>('votes-desc');
  const [filterOption, setFilterOption] = useState<FilterOption>('all');

  // Load voting status
  useEffect(() => {
    if (!isConnected) return;

    const loadStatus = async () => {
      const status = await getVotingStatus();
      if (status) {
        setVotingActive(status.active);
        setVotingStartTime(Number(status.startTime));
        setVotingEndTime(Number(status.endTime));
      }

      const owner = await isOwner();
      setIsOwnerValue(owner || false);

      if (address) {
        const voted = await checkHasVoted();
        setHasVoted(voted || false);
      }
    };

    loadStatus();
  }, [isConnected, address, getVotingStatus, isOwner, checkHasVoted]);

  // Load contenders
  useEffect(() => {
    if (!isConnected) return;

    const loadContenders = async () => {
      const contenderDetails = await getAllContendersWithDetails();
      
      if (contenderDetails && contenderDetails.length > 0) {
        const mapped: Contender[] = contenderDetails.map((detail) => ({
          code: detail.code,
          address: detail.contender,
          voteCount: detail.votersNo,
        }));
        setContenders(mapped);
      } else {
        setContenders([]);
      }

      const total = await getTotalVotes();
      setTotalVotes(Number(total || 0));
    };

    loadContenders();
    
    // Refresh every 5 seconds when voting is active
    const interval = votingActive ? setInterval(loadContenders, 5000) : null;
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isConnected, getAllContendersWithDetails, getTotalVotes, votingActive]);

  // Load winner if voting is not active, contenders exist, and votes have been cast
  useEffect(() => {
    if (votingActive || contenders.length === 0 || totalVotes === 0) {
      // Clear winner if voting is active, no contenders, or no votes
      if (votingActive || totalVotes === 0) {
        setWinner(undefined);
      }
      return;
    }

    const loadWinner = async () => {
      if (!isConnected) return;
      try {
        const winnerData = await getWinner();
        if (winnerData && Number(winnerData.voteCount) > 0) {
          setWinner({
            address: winnerData.winner,
            code: winnerData.code,
            voteCount: Number(winnerData.voteCount),
          });
        } else {
          setWinner(undefined);
        }
      } catch (err: any) {
        // Silently handle error if no contenders or voting still active
        console.log('Could not load winner:', err.message);
        setWinner(undefined);
      }
    };

    loadWinner();
  }, [votingActive, isConnected, getWinner, contenders.length, totalVotes]);

  const handleVoteClick = (code: string, address: string) => {
    if (!isConnected || hasVoted) return;
    setSelectedContender({ code, address });
    setConfirmModalOpen(true);
  };

  const handleConfirmVote = async () => {
    if (!selectedContender || !isConnected || hasVoted) return;

    try {
      const tx = await vote(selectedContender.code);
      if (tx) {
        setHasVoted(true);
        setConfirmModalOpen(false);
        setSelectedContender(null);
        // Reload contender data
        const status = await getVotingStatus();
        if (status) {
          setVotingActive(status.active);
        }
        // Refresh page data
        window.location.reload();
      }
    } catch (err) {
      console.error('Vote error:', err);
      setConfirmModalOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-80' : 'w-20'} bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 flex flex-col fixed h-full z-30`}>
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          {sidebarOpen && (
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform">
                <span className="text-white font-bold text-lg">Q</span>
              </div>
              <div>
                <h2 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  QuickVote
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">Dashboard</p>
              </div>
            </Link>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? (
              <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              </svg>
            )}
          </button>
        </div>

        {/* Sidebar Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Navigation */}
          {sidebarOpen && (
            <nav className="space-y-2">
              <Link
                href="/"
                className="flex items-center gap-3 px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <span>🏠</span>
                <span>Home</span>
              </Link>
              <div className="flex items-center gap-3 px-3 py-2 text-gray-700 dark:text-gray-300 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                <span>📊</span>
                <span className="font-semibold">Voting Dashboard</span>
              </div>
            </nav>
          )}

          {/* Voting Status */}
          <div className={sidebarOpen ? '' : 'hidden'}>
            <VotingStatus
              isActive={votingActive}
              startTime={votingStartTime}
              endTime={votingEndTime}
            />
          </div>

          {/* Admin Panel - Owner Only */}
          {isConnected && isOwnerValue && sidebarOpen && (
            <div className="pt-4 border-t border-gray-200">
              <div className="mb-3 flex items-center gap-2">
                <span className="text-xl">⚙️</span>
                <h3 className="text-lg font-bold text-gray-800 dark:text-white">Admin Panel</h3>
                <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs font-semibold rounded">Owner</span>
              </div>
              <AdminPanel isOwner={isOwnerValue} />
            </div>
          )}

          {/* Admin Panel Locked - Non-Owner */}
          {isConnected && !isOwnerValue && sidebarOpen && (
            <div className="pt-4 border-t border-gray-200">
              <div className="bg-gray-50 dark:bg-gray-700/50 border-2 border-gray-200 dark:border-gray-600 rounded-xl p-4">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-2xl">🔒</span>
                  </div>
                  <h3 className="font-bold text-gray-800 dark:text-white mb-1 text-sm">Admin Panel</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Owner only</p>
                </div>
              </div>
            </div>
          )}

          {/* Voting Info */}
          {sidebarOpen && (
            <div className="pt-4 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Voting Info</h3>
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Total Votes</span>
                  <span className="font-bold text-gray-900 dark:text-white">{totalVotes}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Contenders</span>
                  <span className="font-bold text-gray-900 dark:text-white">{contenders.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Network</span>
                  <span className="font-semibold text-blue-600 dark:text-blue-400 text-sm">Base Sepolia</span>
                </div>
                {isConnected && (
                  <div className="flex justify-between items-center pt-2 border-t border-gray-200 dark:border-gray-600">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Your Status</span>
                    <span className={`text-xs font-semibold px-2 py-1 rounded ${
                      hasVoted ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                    }`}>
                      {hasVoted ? 'Voted' : 'Not Voted'}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Footer */}
        {sidebarOpen && (
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <WalletButton />
            </div>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-80' : 'ml-20'}`}>
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm">
          <div className="px-6 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Voting Dashboard</h1>
              <p className="text-sm text-gray-500 mt-1">
                {votingActive
                  ? hasVoted
                    ? "You've already voted. Thanks for participating!"
                    : 'Select a contender below to cast your vote'
                  : contenders.length > 0
                    ? 'Voting will begin once the owner starts the session'
                    : 'No contenders registered yet'}
              </p>
            </div>
            <div className="flex items-center gap-4">
              {votingActive && contenders.length > 0 && (
                <div className="bg-green-50 border-2 border-green-200 rounded-lg px-4 py-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    <span className="text-green-700 font-semibold text-sm">Voting Active</span>
                  </div>
                </div>
              )}
              {!sidebarOpen && <WalletButton />}
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="p-6">
          {/* Error Display */}
          {error && !error.includes('No contenders registered') && !error.includes('Voting is still active') && (
            <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-xl text-red-800">
              <p className="font-semibold">Error: {error}</p>
            </div>
          )}

          {/* Loading Indicator */}
          {loading && (
            <div className="mb-6 p-4 bg-blue-50 border-2 border-blue-200 rounded-xl text-blue-800 text-center">
              <p className="font-semibold">Processing transaction...</p>
            </div>
          )}

          {/* Owner Notice */}
          {isConnected && isOwnerValue && (
            <div className="mb-6 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-4 text-white shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">👑</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg">You are the Election Owner</h3>
                  <p className="text-sm text-white/90">
                    {sidebarOpen 
                      ? 'Use the Admin Panel in the sidebar to register contenders and manage voting sessions.'
                      : 'Open the sidebar to access the Admin Panel for managing your voting session.'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Winner Display */}
          {winner && (
            <div className="mb-6">
              <WinnerDisplay winner={winner} />
            </div>
          )}

          {/* Setup Guide for Owners */}
          {isConnected && isOwnerValue && contenders.length === 0 && !votingActive && (
            <div className="mb-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border-2 border-blue-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-2xl">📋</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Create Your Voting Session</h3>
                  <p className="text-gray-600 mb-4">Follow these steps to set up and start your voting:</p>
                  <ol className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                      <span><strong>Register Contenders:</strong> Use the Admin Panel in the sidebar to register up to 3 contenders with unique codes</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                      <span><strong>Start Voting:</strong> Once contenders are registered, set a duration and start the voting session</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                      <span><strong>Vote:</strong> Users can now cast their votes for their preferred contender</span>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          )}

          {/* Contenders Section */}
          <div>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Contenders</h2>
            </div>

            {contenders.length > 0 && (
              <ContenderFilters
                onSortChange={setSortOption}
                onFilterChange={setFilterOption}
                currentSort={sortOption}
                currentFilter={filterOption}
                totalVotes={totalVotes}
              />
            )}

            {contenders.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-xl border-2 border-dashed border-gray-300">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">📊</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">No Contenders Yet</h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  {isOwnerValue 
                    ? 'Get started by registering contenders using the Admin Panel in the sidebar. You can register up to 3 contenders.'
                    : 'Waiting for the election owner to register contenders. Check back soon!'}
                </p>
                {isOwnerValue && !sidebarOpen && (
                  <button
                    onClick={() => setSidebarOpen(true)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <span>Open Sidebar</span>
                    <span>→</span>
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filterContenders(sortContenders(contenders, sortOption), filterOption, totalVotes).map((contender) => (
                  <ContenderCard
                    key={contender.code}
                    code={contender.code}
                    address={contender.address}
                    voteCount={contender.voteCount}
                    totalVotes={totalVotes}
                    hasVoted={hasVoted}
                    onVote={(code) => {
                      const contender = contenders.find(c => c.code === code);
                      if (contender) {
                        handleVoteClick(code, contender.address);
                      }
                    }}
                    isVotingActive={votingActive}
                  />
                ))}
              </div>
            )}

            {!isConnected && (
              <div className="mt-8 text-center bg-blue-50 border-2 border-blue-200 rounded-xl p-8">
                <h3 className="text-xl font-semibold text-blue-800 mb-2">
                  Connect Your Wallet
                </h3>
                <p className="text-blue-600 mb-4">
                  Connect your wallet to participate in voting
                </p>
                <WalletButton />
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Vote Confirmation Modal */}
      {selectedContender && (
        <VoteConfirmationModal
          isOpen={confirmModalOpen}
          onClose={() => {
            setConfirmModalOpen(false);
            setSelectedContender(null);
          }}
          onConfirm={handleConfirmVote}
          contenderCode={selectedContender.code}
          contenderAddress={selectedContender.address}
          isLoading={loading}
        />
      )}
    </div>
  );
}
