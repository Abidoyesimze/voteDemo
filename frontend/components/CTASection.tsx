'use client';

import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="py-28 relative overflow-hidden bg-slate-900 text-white">
      {/* Gradient lights */}
      <div className="absolute inset-0">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 opacity-40 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-gradient-to-br from-purple-500 to-blue-500 opacity-30 blur-3xl" />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.07]">
        <div className="absolute inset-0 bg-[linear-gradient(120deg,#ffffff1f_1px,transparent_1px),linear-gradient(60deg,#ffffff1f_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl p-10 md:p-16 bg-white/5 border border-white/10 backdrop-blur-2xl shadow-2xl text-center space-y-8">
          <div className="inline-flex items-center px-4 py-2 rounded-full border border-white/20 text-xs uppercase tracking-[0.3em] text-white/80">
            Join QuickVote
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold leading-tight">
            Ready to launch your decentralized election?
          </h2>
          <p className="text-lg md:text-xl text-indigo-100 max-w-2xl mx-auto leading-relaxed">
            Empower your community with transparent, tamper-proof voting. Host trustless elections, monitor participation in real time, and declare winners automatically.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/vote"
              className="group flex items-center justify-center gap-2 px-10 py-4 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 w-full sm:w-auto"
            >
              Start Voting Now
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <a
              href="https://sepolia.basescan.org/address/0x0c8cF958759f547a9Cc53Edceb428a8244aF4586"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-10 py-4 rounded-2xl border border-white/30 text-lg font-semibold text-white/80 hover:text-white hover:border-white transition-all duration-300"
            >
              View Smart Contract
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

