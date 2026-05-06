'use client';

import React from 'react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#030014] text-white overflow-hidden selection:bg-fuchsia-500/30 font-sans">
      {/* Abstract Background Elements */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-fuchsia-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Navigation */}
      <nav className="relative z-50 glass-dark border-b border-white/5 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center font-black text-xl shadow-[0_0_15px_rgba(192,38,211,0.5)] group-hover:scale-105 transition-transform">AI</div>
            <span className="text-2xl font-extrabold tracking-tight">Product<span className="text-fuchsia-400">Studio</span></span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/dashboard" className="text-sm font-bold text-slate-300 hover:text-white transition-colors hidden sm:block">
              Login
            </Link>
            <Link href="/dashboard" className="px-6 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-sm font-bold transition-all hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]">
              Go to Dashboard
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20 text-center">
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-fuchsia-300 font-bold mb-10 animate-fade-in shadow-[0_0_20px_rgba(192,38,211,0.15)]">
          <span className="w-2.5 h-2.5 rounded-full bg-fuchsia-400 animate-pulse shadow-[0_0_8px_rgba(232,121,249,0.8)]"></span>
          Automate your product content pipeline
        </div>
        
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[1.1] mb-8 animate-slide-in">
          The future of <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-purple-400 to-indigo-400 drop-shadow-sm">
            Product Management
          </span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 mb-12 leading-relaxed animate-slide-in font-medium" style={{ animationDelay: '0.1s' }}>
          Generate professional, SEO-optimized product descriptions and feature sets instantly using advanced AI workflows. Stop writing, start launching.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-in" style={{ animationDelay: '0.2s' }}>
          <Link href="/add-product" className="px-8 py-4 bg-gradient-primary hover:shadow-[0_0_30px_rgba(192,38,211,0.4)] text-white rounded-full font-bold text-lg transition-all duration-300 hover:-translate-y-1 border border-white/10 w-full sm:w-auto">
            Start Generating Free
          </Link>
          <Link href="/products" className="px-8 py-4 glass-dark hover:bg-white/10 border border-white/10 rounded-full text-white font-bold text-lg transition-all duration-300 hover:-translate-y-1 w-full sm:w-auto">
            View Example Products
          </Link>
        </div>

        {/* Dashboard Preview / Mockup */}
        <div className="mt-24 relative mx-auto max-w-5xl animate-slide-in" style={{ animationDelay: '0.3s' }}>
          {/* Fading overlay at bottom */}
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#030014] via-[#030014]/80 to-transparent z-20 pointer-events-none"></div>
          
          <div className="glass-dark border border-white/10 rounded-2xl shadow-[0_0_50px_rgba(79,70,229,0.15)] p-2 relative z-10 overflow-hidden transform perspective-[2000px] rotateX-[8deg] scale-95 hover:rotateX-0 hover:scale-100 transition-all duration-700 ease-out cursor-pointer group">
            <div className="absolute inset-0 bg-gradient-to-tr from-fuchsia-600/10 to-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="bg-[#0a0a0a] rounded-xl overflow-hidden flex flex-col h-[500px] border border-white/5 relative z-10">
              {/* Fake Dashboard Header */}
              <div className="h-12 border-b border-white/5 flex items-center px-4 gap-2 bg-white/[0.02]">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              </div>
              {/* Fake Dashboard Body */}
              <div className="flex-1 p-8 relative flex flex-col gap-6">
                {/* Header row */}
                <div className="flex items-center justify-between">
                  <div className="w-48 h-8 bg-white/5 rounded-lg"></div>
                  <div className="w-32 h-8 bg-gradient-to-r from-fuchsia-500/20 to-indigo-500/20 rounded-lg"></div>
                </div>
                {/* Metric Cards */}
                <div className="grid grid-cols-4 gap-4">
                  <div className="h-28 bg-white/5 rounded-xl border border-white/5 relative overflow-hidden">
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500/50"></div>
                  </div>
                  <div className="h-28 bg-white/5 rounded-xl border border-white/5 relative overflow-hidden">
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-500/50"></div>
                  </div>
                  <div className="h-28 bg-white/5 rounded-xl border border-white/5 relative overflow-hidden">
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-amber-500/50"></div>
                  </div>
                  <div className="h-28 bg-white/5 rounded-xl border border-white/5 relative overflow-hidden">
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-rose-500/50"></div>
                  </div>
                </div>
                {/* Table Area */}
                <div className="flex-1 bg-white/5 rounded-xl border border-white/5 flex flex-col p-4 gap-3">
                  <div className="h-10 border-b border-white/5 flex items-center gap-4 px-2">
                    <div className="h-4 w-24 bg-white/10 rounded"></div>
                    <div className="h-4 w-32 bg-white/10 rounded"></div>
                    <div className="h-4 w-16 bg-white/10 rounded"></div>
                  </div>
                  <div className="h-12 bg-white/5 rounded flex items-center gap-4 px-2">
                    <div className="h-4 w-32 bg-white/20 rounded"></div>
                    <div className="h-4 w-40 bg-white/10 rounded"></div>
                  </div>
                  <div className="h-12 bg-white/5 rounded flex items-center gap-4 px-2">
                    <div className="h-4 w-28 bg-white/20 rounded"></div>
                    <div className="h-4 w-36 bg-white/10 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-32">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight text-white">Everything you need to scale</h2>
          <p className="text-xl text-slate-400 font-medium">Our platform handles the content generation so you can focus on building.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'AI Copywriting', desc: 'Instantly generate persuasive, SEO-optimized descriptions that convert.', icon: '✨' },
            { title: 'Automated Sync', desc: 'Connects directly with your CMS and e-commerce platforms effortlessly.', icon: '🔄' },
            { title: 'Bulk Processing', desc: 'Upload hundreds of products and let the AI process them simultaneously.', icon: '⚡' },
          ].map((feat, i) => (
            <div key={i} className="glass-dark p-8 rounded-3xl border border-white/5 hover:border-fuchsia-500/30 hover:bg-white/5 transition-all duration-500 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-indigo-500/10 to-transparent rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl mb-8 group-hover:scale-110 group-hover:bg-gradient-primary group-hover:border-transparent transition-all duration-300">
                {feat.icon}
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white">{feat.title}</h3>
              <p className="text-slate-400 leading-relaxed font-medium">{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative z-10 py-24 mb-12">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="glass-dark border border-white/10 rounded-3xl p-16 relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-b from-fuchsia-600/10 to-indigo-600/10"></div>
            <h2 className="text-4xl font-black mb-6 relative z-10">Ready to automate your workflow?</h2>
            <p className="text-xl text-slate-400 mb-10 relative z-10 max-w-2xl mx-auto">Join thousands of product managers saving hours every week with our AI tools.</p>
            <Link href="/dashboard" className="px-10 py-5 bg-white text-[#030014] hover:bg-slate-200 rounded-full font-black text-lg transition-all duration-300 hover:scale-105 inline-block relative z-10">
              Get Started Now
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gradient-primary flex items-center justify-center font-bold text-xs">AI</div>
            <span className="font-bold tracking-tight">ProductStudio</span>
          </div>
          <div className="text-slate-500 text-sm font-medium">
            © {new Date().getFullYear()} AI Product Studio. All rights reserved.
          </div>
          <div className="flex gap-4">
            <a href="#" className="text-slate-500 hover:text-white transition-colors">Twitter</a>
            <a href="#" className="text-slate-500 hover:text-white transition-colors">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
