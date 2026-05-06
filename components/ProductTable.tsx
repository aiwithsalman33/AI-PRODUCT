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
    <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
      <table className="w-full">
        <thead className="bg-slate-50 border-b border-slate-200">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
              Product Name
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
              Category
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
              Price
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
              Status
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
              Created At
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {products.map((product) => (
            <tr
              key={product.id}
              className="hover:bg-slate-50 transition-colors"
            >
              <td className="px-6 py-4 text-sm font-medium text-slate-900">
                {truncateText(product.name, 50)}
              </td>
              <td className="px-6 py-4 text-sm text-slate-600">
                {product.category}
              </td>
              <td className="px-6 py-4 text-sm font-medium text-slate-900">
                ${product.price.toFixed(2)}
              </td>
              <td className="px-6 py-4">
                <StatusBadge status={product.status} />
              </td>
              <td className="px-6 py-4 text-sm text-slate-600">
                {formatDate(product.createdAt)}
              </td>
              <td className="px-6 py-4">
                <Link
                  href={`/products/${product.id}`}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  View Details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
