'use client';

import React from 'react';
import { ProductStatus } from '@/lib/types';
import { getStatusColor, getStatusLabel } from '@/lib/utils';

interface StatusBadgeProps {
  status: ProductStatus;
  className?: string;
}

export function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
        status
      )} ${className}`}
    >
      {getStatusLabel(status)}
    </span>
  );
}
