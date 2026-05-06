'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { LayoutWrapper } from '@/components/LayoutWrapper';
import { StatusBadge } from '@/components/StatusBadge';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { useToast } from '@/lib/toast-context';
import { getProductById } from '@/lib/api';
import { Product } from '@/lib/types';
import { formatDate } from '@/lib/utils';

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { addToast } = useToast();
  const productId = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  async function fetchProduct() {
    setIsLoading(true);
    try {
      const result = await getProductById(productId);
      if (result.success && result.data) {
        setProduct(result.data);
      } else {
        addToast('Failed to load product details', 'error');
        router.push('/products');
      }
    } catch (error) {
      addToast('An error occurred while loading the product', 'error');
      router.push('/products');
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return (
      <LayoutWrapper title="Product Details" subtitle="Loading...">
        <LoadingSpinner fullScreen text="Loading product details..." />
      </LayoutWrapper>
    );
  }

  if (!product) {
    return (
      <LayoutWrapper title="Product Not Found" subtitle="The product you're looking for doesn't exist">
        <div className="text-center py-12">
          <p className="text-slate-600 mb-4">Product not found</p>
          <button
            onClick={() => router.push('/products')}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            Back to Products
          </button>
        </div>
      </LayoutWrapper>
    );
  }

  // Determine status display
  const getStatusMessage = () => {
    switch (product.status) {
      case 'pending_approval':
        return 'Awaiting AI processing...';
      case 'published':
        return 'Live and published';
      case 'rejected':
        return 'Needs revision';
      case 'received':
        return 'Received and queued for processing';
      case 'failed':
        return 'Processing failed';
      default:
        return 'Unknown status';
    }
  };

  return (
    <LayoutWrapper title={product.name} subtitle="Full product details">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="mb-6 text-blue-600 hover:text-blue-700 text-sm font-medium"
      >
        ← Back to Products
      </button>

      <div className="max-w-4xl">
        {/* Main Card */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8 mb-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-6 pb-6 border-b border-slate-200">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">{product.name}</h1>
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
                  {product.category}
                </span>
                <StatusBadge status={product.status} />
              </div>
            </div>
            <div className="text-right">
              <p className="text-4xl font-bold text-slate-900">${product.price.toFixed(2)}</p>
              <p className="text-sm text-slate-600 mt-1">USD</p>
            </div>
          </div>

          {/* Product Info Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 pb-8 border-b border-slate-200">
            <div>
              <p className="text-sm text-slate-600 mb-1">Created Date</p>
              <p className="font-medium text-slate-900">{formatDate(product.createdAt)}</p>
            </div>
            <div>
              <p className="text-sm text-slate-600 mb-1">Updated Date</p>
              <p className="font-medium text-slate-900">{formatDate(product.updatedAt)}</p>
            </div>
            <div>
              <p className="text-sm text-slate-600 mb-1">Product ID</p>
              <p className="font-mono text-sm text-slate-900">{product.id.slice(0, 8)}...</p>
            </div>
            <div>
              <p className="text-sm text-slate-600 mb-1">Status</p>
              <p className="font-medium text-slate-900">{getStatusMessage()}</p>
            </div>
          </div>

          {/* Features */}
          <div className="mb-8 pb-8 border-b border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Features</h2>
            <p className="text-slate-700 whitespace-pre-wrap">{product.features}</p>
          </div>

          {/* AI Generated Content Section */}
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-slate-900">AI Generated Content</h2>

            {/* Description */}
            {product.description ? (
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-200">
                <h3 className="font-semibold text-slate-900 mb-2">Product Description</h3>
                <p className="text-slate-700">{product.description}</p>
              </div>
            ) : (
              <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
                <p className="text-sm text-yellow-800">
                  ⏳ AI description is being generated...
                </p>
              </div>
            )}

            {/* SEO Keywords */}
            {product.seoKeywords && product.seoKeywords.length > 0 ? (
              <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-4">SEO Keywords</h3>
                <div className="flex flex-wrap gap-2">
                  {product.seoKeywords.map((keyword, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
                <p className="text-sm text-slate-600">
                  SEO keywords will be generated once the product is processed
                </p>
              </div>
            )}

            {/* Tags */}
            {product.tags && product.tags.length > 0 ? (
              <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
                <p className="text-sm text-slate-600">
                  Tags will be generated once the product is processed
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Status Info Box */}
        {product.status === 'rejected' && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h3 className="font-semibold text-red-900 mb-2">Revision Needed</h3>
            <p className="text-sm text-red-800">
              This product was rejected during processing. Please review the features and try
              resubmitting the product.
            </p>
          </div>
        )}

        {product.status === 'failed' && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h3 className="font-semibold text-red-900 mb-2">Processing Failed</h3>
            <p className="text-sm text-red-800">
              An error occurred while processing this product. Please contact support or try
              resubmitting the product.
            </p>
          </div>
        )}
      </div>
    </LayoutWrapper>
  );
}
