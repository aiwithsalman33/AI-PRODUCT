'use client';

import React from 'react';

interface NavbarProps {
  title: string;
  subtitle?: string;
}

export function Navbar({ title, subtitle }: NavbarProps) {
  return (
    <div className="fixed top-0 left-64 right-0 glass-dark border-b border-white/5 shadow-2xl p-6 z-30 backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <div className="animate-slide-in">
          <h1 className="text-3xl font-extrabold text-gradient tracking-tight">{title}</h1>
          {subtitle && (
            <p className="text-sm text-slate-400 mt-1 font-medium">{subtitle}</p>
          )}
        </div>
        <div className="flex items-center gap-4 animate-slide-in-right">
          {/* Status Indicator */}
          <div className="flex items-center gap-2 glass rounded-full px-4 py-2 border border-white/5">
            <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.8)]"></div>
            <span className="text-xs text-slate-300 font-bold tracking-widest uppercase">Live</span>
          </div>
          {/* User Avatar */}
          <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold cursor-pointer shadow-[0_0_15px_rgba(192,38,211,0.5)] transform hover:scale-110 transition-all duration-300 border border-white/20">
            <span className="text-lg">👤</span>
          </div>
        </div>
      </div>
    </div>
  );
}
