'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { label: 'Dashboard', href: '/', icon: '📊' },
  { label: 'Add Product', href: '/add-product', icon: '➕' },
  { label: 'Products', href: '/products', icon: '📦' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-slate-200 shadow-sm p-6 overflow-y-auto z-40">
      {/* Logo */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">AI Product</h1>
        <p className="text-xs text-slate-600 mt-1">Content Automation</p>
      </div>

      {/* Navigation */}
      <nav className="space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-blue-100 text-blue-900'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer Info */}
      <div className="mt-8 pt-6 border-t border-slate-200">
        <p className="text-xs text-slate-500">
          Connected to Google Sheets via Apps Script
        </p>
      </div>
    </aside>
  );
}
