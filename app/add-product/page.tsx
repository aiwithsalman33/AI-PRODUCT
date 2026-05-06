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

      <div className="max-w-2xl mx-auto relative mt-8 z-10">
        {/* Ambient Glow */}
        <div className="absolute -inset-1 bg-gradient-to-r from-fuchsia-600 to-indigo-600 rounded-[2rem] blur opacity-20"></div>
        
        <div className="glass-dark rounded-2xl border border-white/10 shadow-2xl p-8 relative overflow-hidden backdrop-blur-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Product Name */}
            <div>
              <label htmlFor="name" className="block text-xs font-bold text-slate-300 uppercase tracking-widest mb-2">
                Product Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., Premium Wireless Headphones"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 transition-all duration-300 shadow-inner"
                required
              />
            </div>

            {/* Features */}
            <div>
              <label htmlFor="features" className="block text-xs font-bold text-slate-300 uppercase tracking-widest mb-2">
                Features *
              </label>
              <textarea
                id="features"
                name="features"
                value={formData.features}
                onChange={handleChange}
                placeholder="Describe the key features of your product. Be specific and detailed..."
                rows={6}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 resize-none transition-all duration-300 shadow-inner"
                required
              />
              <p className="mt-2 text-xs text-slate-400 font-medium tracking-wide">
                The AI will use this to generate product descriptions
              </p>
            </div>

            {/* Price */}
            <div>
              <label htmlFor="price" className="block text-xs font-bold text-slate-300 uppercase tracking-widest mb-2">
                Price (USD) *
              </label>
              <div className="relative">
                <span className="absolute left-4 top-3 text-slate-400 font-bold">$</span>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  className="w-full pl-8 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 transition-all duration-300 shadow-inner"
                  required
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-xs font-bold text-slate-300 uppercase tracking-widest mb-2">
                Category *
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 transition-all duration-300 shadow-inner appearance-none [&>option]:bg-slate-900"
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
            <div className="glass-dark border border-indigo-500/30 rounded-xl p-5 relative overflow-hidden">
              <div className="absolute inset-0 bg-indigo-500/10"></div>
              <p className="text-sm text-indigo-200 relative z-10 leading-relaxed">
                <strong className="text-indigo-400 tracking-wide uppercase text-xs mr-2 drop-shadow-md">Note:</strong> 
                Your product will be submitted to our n8n automation workflow for AI content generation. You'll be able to track the status in the Products page.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-6">
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 px-6 py-3 bg-gradient-primary hover:shadow-[0_0_20px_rgba(192,38,211,0.4)] disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-extrabold tracking-wide transition-all duration-300 border border-white/10 hover:-translate-y-1"
              >
                {isLoading ? 'Submitting...' : 'Submit Product'}
              </button>
              <button
                type="button"
                onClick={handleReset}
                disabled={isLoading}
                className="flex-1 px-6 py-3 glass-dark hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed text-slate-300 hover:text-white border border-white/10 rounded-xl font-bold tracking-wide transition-all duration-300"
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
