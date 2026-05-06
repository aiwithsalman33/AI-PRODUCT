'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { LayoutWrapper } from '@/components/LayoutWrapper';
import { SearchFilterBar } from '@/components/SearchFilterBar';
import { ProductCard } from '@/components/ProductCard';
import { ProductTable } from '@/components/ProductTable';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { useToast } from '@/lib/toast-context';
import { getProducts } from '@/lib/api';
import { Product } from '@/lib/types';

export default function ProductsPage() {
  const { addToast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    setIsLoading(true);
    try {
      const result = await getProducts();
      if (result.success && Array.isArray(result.data)) {
        setProducts(result.data);
      } else {
        addToast('Failed to load products', 'error');
      }
    } catch (error) {
      addToast('An error occurred while loading products', 'error');
    } finally {
      setIsLoading(false);
    }
  }

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      const matchesStatus = !selectedStatus || product.status === selectedStatus;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [products, searchQuery, selectedCategory, selectedStatus]);

  return (
    <LayoutWrapper title="Products" subtitle="Manage and view all your products">
      {/* Search and Filter Bar */}
      <div className="mb-6">
        <SearchFilterBar
          searchValue={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          showCategoryFilter={true}
          showStatusFilter={true}
        />
      </div>

      {/* View Mode Toggle and Refresh */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-sm text-slate-600">
            Showing <strong>{filteredProducts.length}</strong> of{' '}
            <strong>{products.length}</strong> products
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              viewMode === 'grid'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-200 text-slate-900 hover:bg-slate-300'
            }`}
          >
            Grid View
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              viewMode === 'table'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-200 text-slate-900 hover:bg-slate-300'
            }`}
          >
            Table View
          </button>
          <button
            onClick={fetchProducts}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-900 rounded-lg text-sm font-medium transition-colors"
          >
            ↻ Refresh
          </button>
        </div>
      </div>

      {/* Content */}
      {isLoading ? (
        <LoadingSpinner fullScreen text="Loading products..." />
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-full">
              <div className="text-center py-12">
                <p className="text-slate-600 mb-4">No products match your filters</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('');
                    setSelectedStatus('');
                  }}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  Clear filters
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <ProductTable products={filteredProducts} isLoading={isLoading} />
      )}
    </LayoutWrapper>
  );
}
