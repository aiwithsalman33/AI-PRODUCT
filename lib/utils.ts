import { ProductStatus } from './types';

export function getStatusColor(status: ProductStatus): string {
  switch (status) {
    case 'received':
      return 'bg-gray-100 text-gray-800';
    case 'pending_approval':
      return 'bg-yellow-100 text-yellow-800';
    case 'published':
      return 'bg-green-100 text-green-800';
    case 'rejected':
      return 'bg-red-100 text-red-800';
    case 'failed':
      return 'bg-red-900 text-red-100';
    default:
      return 'bg-gray-100 text-gray-800';
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
