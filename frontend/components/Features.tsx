'use client';

const features = [
  {
    icon: '🔒',
    title: 'Secure & Transparent',
    description: 'All votes are recorded on the blockchain, ensuring complete transparency and immutability. No votes can be altered or deleted.',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: '⚡',
    title: 'Fast & Efficient',
    description: 'Built on Base network for low gas fees and instant transactions. Vote in seconds without waiting for long confirmation times.',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    icon: '👥',
    title: 'Decentralized',
    description: 'No central authority controls the voting process. Everything is managed by smart contracts that execute automatically.',
    gradient: 'from-pink-500 to-red-500',
  },
  {
    icon: '📊',
    title: 'Real-time Results',
    description: 'See voting results update in real-time as votes are cast. Live countdown timers show exactly when voting ends.',
    gradient: 'from-cyan-500 to-blue-500',
  },
  {
    icon: '✅',
    title: 'One Vote Per Person',
    description: 'Blockchain ensures each wallet address can only vote once, preventing duplicate voting and maintaining election integrity.',
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    icon: '🎯',
    title: 'Time-Based Voting',
    description: 'Set voting periods with start and end times. Voting automatically ends when the deadline is reached, with results immediately available.',
    gradient: 'from-orange-500 to-amber-500',
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-block px-4 py-2 bg-blue-50 rounded-full text-blue-700 text-sm font-semibold mb-4">
            Features
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6">
            Why Choose{' '}
            <span className="gradient-text">QuickVote</span>?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            A modern voting solution that combines blockchain security with user-friendly design
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl p-8 border border-gray-200 hover:border-transparent transition-all duration-300 card-hover shadow-sm hover:shadow-2xl"
            >
              {/* Gradient Background on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`} />
              
              {/* Icon */}
              <div className="relative mb-6">
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
              </div>

              {/* Content */}
              <div className="relative">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Decorative Element */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-3xl" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
