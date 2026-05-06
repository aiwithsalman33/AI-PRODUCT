'use client';

import React from 'react';
import Link from 'next/link';
import { Product } from '@/lib/types';
import { StatusBadge } from './StatusBadge';
import { formatDate, truncateText } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.id}`}>
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden h-full">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 border-b border-slate-200">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-slate-900 text-sm line-clamp-2">
              {product.name}
            </h3>
            <StatusBadge status={product.status} />
          </div>
        </div>

        {/* Body */}
        <div className="p-4 space-y-3">
          {/* Category & Price */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2 py-1 rounded">
              {product.category}
            </span>
            <span className="text-lg font-bold text-slate-900">
              ${product.price.toFixed(2)}
            </span>
          </div>

          {/* Description Preview */}
          {product.description && (
            <p className="text-sm text-slate-600 line-clamp-2">
              {truncateText(product.description, 100)}
            </p>
          )}

          {/* Tags */}
          {product.tags && product.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {product.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded"
                >
                  {tag}
                </span>
              ))}
              {product.tags.length > 2 && (
                <span className="text-xs text-slate-500">
                  +{product.tags.length - 2} more
                </span>
              )}
            </div>
          )}

          {/* Date */}
          <p className="text-xs text-slate-500">
            Created {formatDate(product.createdAt)}
          </p>
        </div>
      </div>
    </Link>
  );
}
