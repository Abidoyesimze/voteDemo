'use client';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white relative overflow-hidden">
      {/* background accents */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="absolute -top-20 -left-10 w-72 h-72 bg-gradient-to-br from-blue-500 to-purple-600 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-600 to-pink-600 blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-xl">
                <span className="text-white font-bold text-xl">Q</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold">QuickVote</h3>
                <p className="text-sm text-white/70">Decentralized Voting Platform</p>
              </div>
            </div>
            <p className="text-white/70 leading-relaxed">
              A transparent, secure, and immutable voting solution powered by smart contracts on Base.
              Empowering communities with trustless elections.
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-widest text-white/70 mb-4">Platform</h4>
              <ul className="space-y-3 text-white/70">
                <li><a href="/vote" className="hover:text-white transition-colors">Vote Now</a></li>
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-widest text-white/70 mb-4">Resources</h4>
              <ul className="space-y-3 text-white/70">
                <li>
                  <a
                    href="https://sepolia.basescan.org/address/0x0c8cF958759f547a9Cc53Edceb428a8244aF4586"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    Contract on BaseScan
                  </a>
                </li>
                <li className="font-mono text-xs break-all">
                  0x0c8cF958759f547a9Cc53Edceb428a8244aF4586
                </li>
                <li>Network: Base Sepolia</li>
              </ul>
            </div>
          </div>

          {/* Newsletter or contact */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-widest text-white/70">Stay Updated</h4>
            <p className="text-white/70">Get the latest updates on new features, releases, and governance tips.</p>
            <form className="space-y-3">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 placeholder-white/60 focus:outline-none focus:border-white"
                />
                <button
                  type="button"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 font-semibold hover:shadow-lg transition-shadow"
                >
                  Subscribe
                </button>
              </div>
              <p className="text-xs text-white/60">We care about your data. Read our privacy policy.</p>
            </form>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between text-white/60 text-sm gap-4">
          <p>© {new Date().getFullYear()} QuickVote. Built with ❤️ on Base.</p>
          <div className="flex items-center gap-4">
            <a href="#features" className="hover:text-white transition-colors text-xs uppercase tracking-widest">Features</a>
            <a href="#how-it-works" className="hover:text-white transition-colors text-xs uppercase tracking-widest">Workflow</a>
            <a href="/vote" className="hover:text-white transition-colors text-xs uppercase tracking-widest">Vote</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

