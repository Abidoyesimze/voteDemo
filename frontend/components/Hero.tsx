'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Enhanced Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />
      
      {/* Animated Background Elements with Parallax */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-20 left-10 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"
          style={{
            transform: `translate(${(mousePosition.x - 50) * 0.02}px, ${(mousePosition.y - 50) * 0.02}px)`,
          }}
        />
        <div 
          className="absolute top-40 right-10 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"
          style={{
            transform: `translate(${(mousePosition.x - 50) * -0.03}px, ${(mousePosition.y - 50) * 0.03}px)`,
          }}
        />
        <div 
          className="absolute bottom-20 left-1/2 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"
          style={{
            transform: `translate(${(mousePosition.x - 50) * 0.015}px, ${(mousePosition.y - 50) * -0.02}px)`,
          }}
        />
      </div>

      {/* Enhanced Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-50" />
      
      {/* Animated Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-2xl opacity-10 animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-2xl opacity-10 animate-float animation-delay-2000" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 z-10">
        <div className={`text-center transition-all duration-1000 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          {/* Enhanced Badge */}
          <div className="inline-flex items-center px-5 py-2.5 mb-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-full text-blue-700 dark:text-blue-400 text-sm font-semibold shadow-xl border border-blue-100 dark:border-blue-800 hover:scale-105 transition-transform duration-300">
            <span className="w-2 h-2 bg-blue-600 rounded-full mr-2 animate-pulse"></span>
            <span className="mr-2">Built on Base Sepolia</span>
            <span className="w-1 h-1 bg-blue-400 rounded-full mx-2"></span>
            <span>Fully Decentralized</span>
          </div>

          {/* Enhanced Main Heading with Stagger Animation */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 leading-tight">
            <span className={`block mb-2 transition-all duration-700 delay-100 ${isVisible ? 'animate-slide-in-up' : 'opacity-0 translate-y-10'}`}>
              <span className="gradient-text animate-gradient inline-block">
                Decentralized
              </span>
            </span>
            <span className={`block text-gray-900 dark:text-white transition-all duration-700 delay-200 ${isVisible ? 'animate-slide-in-up' : 'opacity-0 translate-y-10'}`}>
              Voting Made Simple
            </span>
          </h1>

          {/* Enhanced Subheading */}
          <p className={`text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed font-light transition-all duration-700 delay-300 ${isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`}>
            QuickVote is a transparent, secure, and immutable voting platform built on the blockchain.
            <span className="block mt-2">Create elections, register contenders, and vote with complete trust in the process.</span>
          </p>

          {/* Enhanced CTA Buttons */}
          <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 transition-all duration-700 delay-400 ${isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`}>
            <Link
              href="/vote"
              className="group px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 text-white rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 active:scale-95 transition-all duration-300 relative overflow-hidden focus-ring"
              aria-label="Start voting now"
            >
              <span className="relative z-10 flex items-center gap-2">
                Start Voting
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-purple-700 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            <Link
              href="#how-it-works"
              className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-xl font-semibold text-lg border-2 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus-ring"
              aria-label="Learn more about QuickVote"
            >
              Learn More
            </Link>
          </div>

          {/* Enhanced Stats with Stagger */}
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto transition-all duration-700 delay-500 ${isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`}>
            <div className="group bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-600 hover:shadow-xl transition-all duration-300 card-hover">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">100%</div>
              <div className="text-gray-600 dark:text-gray-300 font-medium">Transparent</div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">All votes on-chain</div>
            </div>
            <div className="group bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700 hover:border-purple-200 dark:hover:border-purple-600 hover:shadow-xl transition-all duration-300 card-hover">
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">Secure</div>
              <div className="text-gray-600 dark:text-gray-300 font-medium">Blockchain Powered</div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">Immutable records</div>
            </div>
            <div className="group bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700 hover:border-pink-200 dark:hover:border-pink-600 hover:shadow-xl transition-all duration-300 card-hover">
              <div className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">Instant</div>
              <div className="text-gray-600 dark:text-gray-300 font-medium">Real-time Results</div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">Live updates</div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-slow">
        <a 
          href="#features" 
          className="flex flex-col items-center gap-2 text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus-ring rounded-lg p-2"
          aria-label="Scroll to features"
        >
          <span className="text-xs font-medium">Scroll</span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </div>
    </section>
  );
}
