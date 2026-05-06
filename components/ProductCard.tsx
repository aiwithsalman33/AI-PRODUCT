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
      <div className="glass-dark rounded-2xl border border-white/5 shadow-xl hover:shadow-[0_0_30px_rgba(192,38,211,0.2)] transition-all duration-500 cursor-pointer overflow-hidden h-full hover:scale-105 transform hover:-translate-y-1 group relative">
        {/* Header with Gradient */}
        <div className="bg-white/5 p-4 border-b border-white/10 relative z-10">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-extrabold text-white text-sm line-clamp-2 group-hover:text-fuchsia-400 transition-all drop-shadow-md">
              {product.name}
            </h3>
            <StatusBadge status={product.status} />
          </div>
        </div>

        {/* Body */}
        <div className="p-4 space-y-4 relative z-10">
          {/* Category & Price */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-indigo-300 bg-indigo-500/20 border border-indigo-500/30 px-3 py-1 rounded-full uppercase tracking-widest">
              {product.category}
            </span>
            <span className="text-lg font-extrabold text-white drop-shadow-md">
              ${product.price.toFixed(2)}
            </span>
          </div>

          {/* Description Preview */}
          {product.description && (
            <p className="text-sm text-slate-400 line-clamp-2 group-hover:text-slate-300 transition-colors">
              {truncateText(product.description, 100)}
            </p>
          )}

          {/* Tags */}
          {product.tags && product.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {product.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 px-2 py-1 rounded-full font-medium"
                >
                  {tag}
                </span>
              ))}
              {product.tags.length > 2 && (
                <span className="text-xs text-slate-500 font-medium">
                  +{product.tags.length - 2}
                </span>
              )}
            </div>
          )}

          {/* Date */}
          <p className="text-xs font-bold text-slate-500 pt-3 border-t border-white/10 uppercase tracking-widest">
            {formatDate(product.createdAt)}
          </p>
        </div>

        {/* Hover Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-fuchsia-600/0 to-indigo-600/0 group-hover:from-fuchsia-600/10 group-hover:to-indigo-600/10 transition-all duration-500 pointer-events-none rounded-2xl"></div>
      </div>
    </Link>
  );
}
