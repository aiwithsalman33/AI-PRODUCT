'use client';

import React from 'react';

interface StatsCardProps {
  title: string;
  value: number | string;
  subtitle?: string;
  icon?: React.ReactNode;
  color?: 'blue' | 'green' | 'yellow' | 'red' | 'purple';
}

export function StatsCard({
  title,
  value,
  subtitle,
  icon,
  color = 'blue',
}: StatsCardProps) {
  const gradientClasses = {
    blue: 'bg-gradient-to-br from-blue-500 to-indigo-600',
    green: 'bg-gradient-to-br from-emerald-400 to-cyan-500',
    yellow: 'bg-gradient-to-br from-amber-400 to-orange-500',
    red: 'bg-gradient-to-br from-rose-400 to-red-600',
    purple: 'bg-gradient-to-br from-fuchsia-500 to-purple-600',
  };

  const lightBgClasses = {
    blue: 'glass-dark hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]',
    green: 'glass-dark hover:shadow-[0_0_20px_rgba(16,185,129,0.15)]',
    yellow: 'glass-dark hover:shadow-[0_0_20px_rgba(245,158,11,0.15)]',
    red: 'glass-dark hover:shadow-[0_0_20px_rgba(239,68,68,0.15)]',
    purple: 'glass-dark hover:shadow-[0_0_20px_rgba(168,85,247,0.15)]',
  };

  const iconBgClasses = {
    blue: `${gradientClasses.blue} text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]`,
    green: `${gradientClasses.green} text-white shadow-[0_0_15px_rgba(16,185,129,0.5)]`,
    yellow: `${gradientClasses.yellow} text-white shadow-[0_0_15px_rgba(245,158,11,0.5)]`,
    red: `${gradientClasses.red} text-white shadow-[0_0_15px_rgba(239,68,68,0.5)]`,
    purple: `${gradientClasses.purple} text-white shadow-[0_0_15px_rgba(168,85,247,0.5)]`,
  };

  return (
    <div
      className={`${lightBgClasses[color]} rounded-2xl p-6 shadow-xl transition-all duration-300 border border-white/5 hover:-translate-y-1 transform animate-slide-in group relative overflow-hidden`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="flex items-start justify-between gap-4 relative z-10">
        <div className="flex-1">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            {title}
          </p>
          <p className="text-4xl font-extrabold text-white mt-3 tracking-tight drop-shadow-md">
            {value}
          </p>
          {subtitle && (
            <p className="text-xs text-slate-500 mt-2 font-medium">{subtitle}</p>
          )}
        </div>
        {icon && (
          <div
            className={`${iconBgClasses[color]} rounded-xl p-3 text-2xl relative`}
          >
            {icon}
          </div>
        )}
      </div>
      
      {/* Decorative Line */}
      <div className={`mt-5 h-1 ${gradientClasses[color]} rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-300`}></div>
    </div>
  );
}
