'use client';

import React from 'react';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';

interface LayoutWrapperProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export function LayoutWrapper({ children, title, subtitle }: LayoutWrapperProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />
      <Navbar title={title} subtitle={subtitle} />
      <main className="ml-64 pt-28 pb-8 px-8">
        {children}
      </main>
    </div>
  );
}
