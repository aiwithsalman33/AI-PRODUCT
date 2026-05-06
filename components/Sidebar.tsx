'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { label: 'Dashboard', href: '/dashboard', icon: '📊' },
  { label: 'Add Product', href: '/add-product', icon: '➕' },
  { label: 'Products', href: '/products', icon: '📦' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 glass-dark border-r border-white/5 shadow-2xl p-6 overflow-y-auto z-40">
      {/* Logo with Gradient */}
      <div className="mb-8 animate-slide-in">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-primary rounded-lg blur opacity-40 animate-pulse"></div>
          <div className="relative glass border border-white/10 rounded-lg px-4 py-3">
            <h1 className="text-2xl font-bold text-white tracking-wide">AI Product</h1>
            <p className="text-[10px] text-fuchsia-200 mt-1 uppercase tracking-widest font-bold">Automation</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="space-y-2 mb-8">
        {navItems.map((item, index) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{ animationDelay: `${index * 0.1}s` }}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 animate-slide-in-left border border-transparent ${
                isActive
                  ? 'bg-white/10 text-white shadow-[0_0_20px_rgba(192,38,211,0.15)] scale-105 border-white/10'
                  : 'text-slate-400 hover:text-white hover:bg-white/5 hover:scale-105 hover:border-white/5'
              }`}
            >
              <span className="text-lg drop-shadow-md">{item.icon}</span>
              <span className="tracking-wide">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent my-6"></div>

      {/* Footer Info with Gradient */}
      <div className="mt-auto pt-6 glass rounded-xl p-4 text-center border border-white/5 relative overflow-hidden group hover:border-white/10 transition-colors">
        <div className="absolute inset-0 bg-gradient-primary opacity-5 group-hover:opacity-10 transition-opacity duration-500"></div>
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest relative z-10">🔗 Connected to</p>
        <p className="text-xs text-purple-300 font-extrabold mt-2 relative z-10 tracking-wide drop-shadow-md">Google Apps Script</p>
        <div className="mt-4 flex justify-center relative z-10">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]"></div>
        </div>
      </div>
    </aside>
  );
}
