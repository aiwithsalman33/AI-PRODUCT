import { ProductStatus } from './types';

export function getStatusColor(status: ProductStatus): string {
  switch (status) {
    case 'received':
      return 'bg-slate-800 text-slate-300 border border-slate-700 shadow-[0_0_10px_rgba(148,163,184,0.2)]';
    case 'pending_approval':
      return 'bg-amber-900/40 text-amber-300 border border-amber-700/50 shadow-[0_0_10px_rgba(245,158,11,0.3)]';
    case 'published':
      return 'bg-emerald-900/40 text-emerald-300 border border-emerald-700/50 shadow-[0_0_10px_rgba(16,185,129,0.3)]';
    case 'rejected':
      return 'bg-rose-900/40 text-rose-300 border border-rose-700/50 shadow-[0_0_10px_rgba(244,63,94,0.3)]';
    case 'failed':
      return 'bg-red-900/60 text-red-300 border border-red-700/60 shadow-[0_0_10px_rgba(220,38,38,0.4)]';
    default:
      return 'bg-slate-800 text-slate-300 border border-slate-700 shadow-[0_0_10px_rgba(148,163,184,0.2)]';
  }
}

export function getStatusLabel(status: ProductStatus): string {
  switch (status) {
    case 'received':
      return 'Received';
    case 'pending_approval':
      return 'Pending Approval';
    case 'published':
      return 'Published';
    case 'rejected':
      return 'Rejected';
    case 'failed':
      return 'Failed';
    default:
      return 'Unknown';
  }
}

export function getStatusBadgeColor(status: ProductStatus): 'gray' | 'yellow' | 'green' | 'red' {
  switch (status) {
    case 'received':
      return 'gray';
    case 'pending_approval':
      return 'yellow';
    case 'published':
      return 'green';
    case 'rejected':
    case 'failed':
      return 'red';
    default:
      return 'gray';
  }
}

export function formatDate(date: string): string {
  try {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return date;
  }
}

export function truncateText(text: string, length: number = 100): string {
  if (text.length <= length) return text;
  return text.slice(0, length) + '...';
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validateProductForm(name: string, features: string, price: number, category: string): string | null {
  if (!name.trim()) {
    return 'Product name is required';
  }
  if (!features.trim()) {
    return 'Features are required';
  }
  if (price <= 0) {
    return 'Price must be greater than 0';
  }
  if (!category) {
    return 'Category is required';
  }
  return null;
}
