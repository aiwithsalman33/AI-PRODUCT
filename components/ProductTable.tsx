'use client';

import React from 'react';
import Link from 'next/link';
import { Product } from '@/lib/types';
import { StatusBadge } from './StatusBadge';
import { formatDate, truncateText } from '@/lib/utils';
import { LoadingSpinner } from './LoadingSpinner';
import { EmptyState } from './EmptyState';

interface ProductTableProps {
  products: Product[];
  isLoading?: boolean;
  onViewDetails?: (id: string) => void;
}

export function ProductTable({
  products,
  isLoading = false,
  onViewDetails,
}: ProductTableProps) {
  if (isLoading) {
    return <LoadingSpinner text="Loading products..." />;
  }

  if (products.length === 0) {
    return (
      <EmptyState
        title="No products found"
        description="Start by adding a new product to see it here."
        icon="📭"
      />
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl glass-dark border border-white/5 shadow-2xl">
      <table className="w-full">
        <thead className="bg-white/5 border-b border-white/10">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-bold text-slate-300 uppercase tracking-widest">
              Product Name
            </th>
            <th className="px-6 py-4 text-left text-xs font-bold text-slate-300 uppercase tracking-widest">
              Category
            </th>
            <th className="px-6 py-4 text-left text-xs font-bold text-slate-300 uppercase tracking-widest">
              Price
            </th>
            <th className="px-6 py-4 text-left text-xs font-bold text-slate-300 uppercase tracking-widest">
              Status
            </th>
            <th className="px-6 py-4 text-left text-xs font-bold text-slate-300 uppercase tracking-widest">
              Created At
            </th>
            <th className="px-6 py-4 text-left text-xs font-bold text-slate-300 uppercase tracking-widest">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {products.map((product, index) => (
            <tr
              key={product.id}
              className="hover:bg-white/5 transition-colors duration-200"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <td className="px-6 py-4 text-sm font-semibold text-slate-200">
                {truncateText(product.name, 50)}
              </td>
              <td className="px-6 py-4 text-sm text-slate-400 font-medium">
                {product.category}
              </td>
              <td className="px-6 py-4 text-sm font-bold text-emerald-400 drop-shadow-md">
                ${product.price.toFixed(2)}
              </td>
              <td className="px-6 py-4">
                <StatusBadge status={product.status} />
              </td>
              <td className="px-6 py-4 text-sm text-slate-500">
                {formatDate(product.createdAt)}
              </td>
              <td className="px-6 py-4">
                <Link
                  href={`/products/${product.id}`}
                  className="text-fuchsia-400 hover:text-fuchsia-300 text-sm font-bold transition-colors duration-200 hover:underline tracking-wide"
                >
                  View Details →
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
