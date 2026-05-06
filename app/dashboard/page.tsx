'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { LayoutWrapper } from '@/components/LayoutWrapper';
import { StatsCard } from '@/components/StatsCard';
import { ProductTable } from '@/components/ProductTable';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { useToast } from '@/lib/toast-context';
import { getDashboardStats, getProducts } from '@/lib/api';
import { Product, DashboardStats } from '@/lib/types';

export default function DashboardPage() {
  const { addToast } = useToast();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  async function fetchDashboardData() {
    setIsLoading(true);
    try {
      // Fetch stats
      const statsRes = await getDashboardStats();
      if (statsRes.success && statsRes.data) {
        setStats(statsRes.data);
      } else {
        addToast('Failed to load dashboard stats', 'error');
      }

      // Fetch recent products
      const productsRes = await getProducts();
      if (productsRes.success && Array.isArray(productsRes.data)) {
        setRecentProducts(productsRes.data.slice(0, 5));
      } else {
        addToast('Failed to load products', 'error');
      }
    } catch (error) {
      addToast('An error occurred while loading dashboard data', 'error');
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return (
      <LayoutWrapper title="Dashboard" subtitle="Welcome to AI Product Content Automation">
        <LoadingSpinner fullScreen text="Loading dashboard..." />
      </LayoutWrapper>
    );
  }

  return (
    <LayoutWrapper title="Dashboard" subtitle="Overview of your product automation system">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Products"
          value={stats?.total_products || 0}
          subtitle="All uploaded products"
          icon="📦"
          color="blue"
        />
        <StatsCard
          title="Pending Approval"
          value={stats?.pending || 0}
          subtitle="Awaiting AI processing"
          icon="⏳"
          color="yellow"
        />
        <StatsCard
          title="Published Products"
          value={stats?.published || 0}
          subtitle="Live and available"
          icon="✅"
          color="green"
        />
        <StatsCard
          title="Rejected Products"
          value={stats?.rejected || 0}
          subtitle="Need revision"
          icon="❌"
          color="red"
        />
      </div>

      {/* Recent Products Section */}
      <div className="space-y-6 mt-12 relative z-10">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-extrabold text-white tracking-tight drop-shadow-md">Recent Products</h2>
            <p className="text-sm text-slate-400 mt-1">Latest uploads and updates from your workspace</p>
          </div>
          <Link
            href="/products"
            className="px-5 py-2.5 bg-gradient-primary hover:shadow-[0_0_20px_rgba(192,38,211,0.5)] text-white rounded-xl text-sm font-bold transition-all duration-300 hover:scale-105 border border-white/10"
          >
            View All Products
          </Link>
        </div>

        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-fuchsia-600 to-indigo-600 rounded-3xl blur opacity-20"></div>
          <ProductTable products={recentProducts} />
        </div>
      </div>

      {/* Retry Button */}
      {!isLoading && (
        <div className="mt-12 text-center relative z-10">
          <button
            onClick={fetchDashboardData}
            className="px-6 py-3 text-slate-400 hover:text-white glass-dark border border-white/10 rounded-full text-sm font-bold transition-all duration-300 hover:border-white/20 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] group"
          >
            <span className="inline-block group-hover:-rotate-180 transition-transform duration-500 mr-2">↻</span> Refresh Data
          </button>
        </div>
      )}
    </LayoutWrapper>
  );
}
