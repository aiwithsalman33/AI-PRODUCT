'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LayoutWrapper } from '@/components/LayoutWrapper';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { useToast } from '@/lib/toast-context';
import { addProduct } from '@/lib/api';
import { CATEGORIES } from '@/lib/types';
import { validateProductForm } from '@/lib/utils';

export default function AddProductPage() {
  const router = useRouter();
  const { addToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    features: '',
    price: '',
    category: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleReset = () => {
    setFormData({
      name: '',
      features: '',
      price: '',
      category: '',
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    const price = parseFloat(formData.price);
    const error = validateProductForm(
      formData.name,
      formData.features,
      price,
      formData.category
    );

    if (error) {
      addToast(error, 'error');
      return;
    }

    setIsLoading(true);

    try {
      const result = await addProduct({
        name: formData.name,
        features: formData.features,
        price: price,
        category: formData.category,
      });

      if (result.success) {
        addToast('Product submitted successfully! Awaiting AI processing...', 'success');
        handleReset();
        router.push('/products');
      } else {
        addToast(result.error || 'Failed to add product', 'error');
      }
    } catch (error) {
      addToast('An error occurred while submitting the product', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LayoutWrapper title="Add Product" subtitle="Submit a new product for AI content generation">
      {isLoading && <LoadingSpinner fullScreen text="Submitting product..." />}

      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Product Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-900 mb-2">
                Product Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., Premium Wireless Headphones"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>

            {/* Features */}
            <div>
              <label htmlFor="features" className="block text-sm font-medium text-slate-900 mb-2">
                Features *
              </label>
              <textarea
                id="features"
                name="features"
                value={formData.features}
                onChange={handleChange}
                placeholder="Describe the key features of your product. Be specific and detailed..."
                rows={6}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
                required
              />
              <p className="mt-1 text-xs text-slate-500">
                The AI will use this to generate product descriptions
              </p>
            </div>

            {/* Price */}
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-slate-900 mb-2">
                Price (USD) *
              </label>
              <div className="relative">
                <span className="absolute left-4 top-2 text-slate-500">$</span>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  className="w-full pl-8 pr-4 py-2 border border-slate-300 rounded-lg text-sm placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-slate-900 mb-2">
                Category *
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                required
              >
                <option value="">Select a category</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> Your product will be submitted to our n8n automation workflow for AI content generation. You'll be able to track the status in the Products page.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white rounded-lg font-medium transition-colors"
              >
                {isLoading ? 'Submitting...' : 'Submit Product'}
              </button>
              <button
                type="button"
                onClick={handleReset}
                disabled={isLoading}
                className="flex-1 px-6 py-2 bg-slate-200 hover:bg-slate-300 disabled:bg-slate-100 text-slate-900 rounded-lg font-medium transition-colors"
              >
                Reset Form
              </button>
            </div>
          </form>
        </div>
      </div>
    </LayoutWrapper>
  );
}
