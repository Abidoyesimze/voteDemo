'use client';

const steps = [
  {
    number: '01',
    title: 'Connect Wallet',
    description: 'Connect your MetaMask or any Web3 wallet to the Base Sepolia network. Make sure you have testnet ETH for transaction fees.',
    icon: '🔗',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    number: '02',
    title: 'Register Contenders',
    description: 'As the election owner, register up to 3 contenders with unique codes. You can register all at once or individually.',
    icon: '📝',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    number: '03',
    title: 'Start Voting',
    description: 'Set a voting duration and start the election. Once started, all registered wallets can cast their vote for their preferred contender.',
    icon: '🚀',
    gradient: 'from-pink-500 to-orange-500',
  },
  {
    number: '04',
    title: 'Cast Your Vote',
    description: 'Select your preferred contender and cast your vote. Each wallet can only vote once, and votes are immediately recorded on-chain.',
    icon: '✓',
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    number: '05',
    title: 'View Results',
    description: 'Watch results update in real-time. Once voting ends, the winner is automatically determined based on the highest vote count.',
    icon: '🏆',
    gradient: 'from-indigo-500 to-purple-500',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-slate-950 text-white relative overflow-hidden">
      {/* Decorative gradients */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-blue-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-600 rounded-full blur-3xl"></div>
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#fff1_1px,transparent_1px),linear-gradient(to_bottom,#fff1_1px,transparent_1px)] bg-[size:30px_30px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 mb-6 border border-white/20 rounded-full text-sm tracking-wider uppercase">
            Workflow
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Launch your decentralized election in minutes with a guided, five-step experience
          </p>
        </div>

        <div className="relative">
          {/* Vertical Timeline line */}
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0">
            <div className="h-full w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 opacity-70 rounded-full" />
          </div>

          <div className="space-y-16">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className={`relative flex flex-col lg:flex-row items-center gap-10 ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                <div className="flex-1 w-full">
                  <div
                    className={`relative bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-3xl p-8 lg:p-10 shadow-2xl overflow-hidden card-hover`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="flex items-start gap-6">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center text-3xl shadow-lg`}>
                        {step.icon}
                      </div>
                      <div>
                        <div className="text-sm font-semibold tracking-[0.3em] text-white/60 mb-2">
                          STEP {step.number}
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold mb-3">
                          {step.title}
                        </h3>
                        <p className="text-lg text-slate-300 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Timeline node */}
                <div className="flex-shrink-0 relative">
                  <div className="hidden lg:flex flex-col items-center gap-4">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${step.gradient} flex items-center justify-center text-lg font-bold`}>
                      {step.number}
                    </div>
                    {index !== steps.length - 1 && (
                      <div className="w-1 h-16 bg-white/20 rounded-full" />
                    )}
                  </div>
                </div>

                <div className="flex-1 hidden lg:block" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

