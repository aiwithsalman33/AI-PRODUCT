export type ProductStatus = 'received' | 'pending_approval' | 'published' | 'rejected' | 'failed';

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  features: string;
  status: ProductStatus;
  description?: string;
  seoKeywords?: string[];
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface DashboardStats {
  total_products: number;
  pending: number;
  published: number;
  rejected: number;
}

export interface AddProductPayload {
  name: string;
  features: string;
  price: number;
  category: string;
}

export type Category = 'Electronics' | 'Fashion' | 'Home & Kitchen' | 'Beauty' | 'Accessories' | 'Fitness';

export const CATEGORIES: Category[] = [
  'Electronics',
  'Fashion',
  'Home & Kitchen',
  'Beauty',
  'Accessories',
  'Fitness',
];
