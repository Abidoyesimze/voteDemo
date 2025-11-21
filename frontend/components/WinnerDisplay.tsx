'use client';

interface WinnerDisplayProps {
  winner?: {
    address: string;
    code: string;
    voteCount: number;
  };
}

export default function WinnerDisplay({ winner }: WinnerDisplayProps) {
  if (!winner) return null;

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 8)}...${addr.slice(-6)}`;
  };

  return (
    <div className="relative overflow-hidden rounded-2xl shadow-2xl border-4 border-yellow-300 bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-500 p-8">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
          animation: 'shimmer 3s linear infinite'
        }}></div>
      </div>
      
      {/* Confetti Effect */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-3 h-3 bg-white rounded-full animate-pulse" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-20 right-20 w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-20 left-20 w-3 h-3 bg-white rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-10 right-10 w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <div className="relative text-center">
        {/* Trophy Icon */}
        <div className="mb-6 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-white/30 rounded-full blur-2xl"></div>
            <div className="relative text-7xl animate-bounce" style={{ animationDuration: '2s' }}>
              🏆
            </div>
          </div>
        </div>

        {/* Winner Text */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-2 drop-shadow-lg">
          Winner!
        </h2>
        <p className="text-yellow-100 text-lg mb-6">Congratulations to the winner</p>

        {/* Winner Card */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border-2 border-white/50 max-w-md mx-auto">
          <div className="mb-4">
            <h3 className="text-3xl font-extrabold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent mb-2">
              {winner.code}
            </h3>
            <div className="inline-flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg border border-gray-200">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p className="text-sm text-gray-600 font-mono">{formatAddress(winner.address)}</p>
            </div>
          </div>
          
          {/* Vote Count */}
          <div className="pt-4 border-t border-gray-200">
            <div className="text-5xl font-extrabold bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 bg-clip-text text-transparent mb-2">
              {winner.voteCount}
            </div>
            <div className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
              {winner.voteCount === 1 ? 'Vote' : 'Votes'} Received
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
