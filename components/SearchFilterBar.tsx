'use client';

import React from 'react';
import { CATEGORIES, Category, ProductStatus } from '@/lib/types';

interface SearchFilterBarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedStatus: string;
  onStatusChange: (status: string) => void;
  showCategoryFilter?: boolean;
  showStatusFilter?: boolean;
}

const statuses: { value: string; label: string }[] = [
  { value: '', label: 'All Statuses' },
  { value: 'received', label: 'Received' },
  { value: 'pending_approval', label: 'Pending Approval' },
  { value: 'published', label: 'Published' },
  { value: 'rejected', label: 'Rejected' },
  { value: 'failed', label: 'Failed' },
];

export function SearchFilterBar({
  searchValue,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedStatus,
  onStatusChange,
  showCategoryFilter = true,
  showStatusFilter = true,
}: SearchFilterBarProps) {
  return (
    <div className="glass-dark rounded-xl border border-white/10 p-4 shadow-xl backdrop-blur-xl">
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        {/* Search Input */}
        <div className="flex-1">
            <input
              type="text"
              placeholder="Search by product name..."
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 transition-all shadow-inner"
            />
        </div>

        {/* Category Filter */}
        {showCategoryFilter && (
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 transition-all appearance-none [&>option]:bg-slate-900"
          >
            <option value="">All Categories</option>
            {CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        )}

        {/* Status Filter */}
        {showStatusFilter && (
          <select
            value={selectedStatus}
            onChange={(e) => onStatusChange(e.target.value)}
            className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 transition-all appearance-none [&>option]:bg-slate-900"
          >
            {statuses.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
        )}
      </div>
    </div>
  );
}
