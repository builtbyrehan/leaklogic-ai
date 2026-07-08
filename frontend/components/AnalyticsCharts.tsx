"use client";

import dynamic from 'next/dynamic';
import { TrendingUp, Globe, Clock } from 'lucide-react';

// Import charts with SSR disabled to prevent hydration mismatch
const RevenueChart = dynamic(
  () => import('./ChartsClientOnly').then(mod => mod.RevenueChart),
  { ssr: false }
);

const DonutChart = dynamic(
  () => import('./ChartsClientOnly').then(mod => mod.DonutChart),
  { ssr: false }
);

// Revenue trajectory data
const revenueData = [
  { month: 'JAN', value: 3200 },
  { month: 'FEB', value: 2800 },
  { month: 'MAR', value: 1800 },
  { month: 'APR', value: 2400 },
  { month: 'MAY', value: 2100 },
  { month: 'JUN', value: 1600 },
  { month: 'JUL', value: 2900 },
];

// Donut chart data
const verticalSplitData = [
  { name: 'SALES', value: 350, color: '#6366F1' },
  { name: 'REFUNDS', value: 180, color: '#10B981' },
  { name: 'SUPPLIER', value: 220, color: '#F59E0B' },
  { name: 'INVENTORY', value: 300, color: '#EF4444' },
];

// Real-time users bar data (simplified for visualization)
// Using fixed data to avoid hydration mismatch
const userActivityData = [
  { time: 0, users: 45 },
  { time: 1, users: 62 },
  { time: 2, users: 38 },
  { time: 3, users: 71 },
  { time: 4, users: 55 },
  { time: 5, users: 89 },
  { time: 6, users: 67 },
  { time: 7, users: 43 },
  { time: 8, users: 78 },
  { time: 9, users: 52 },
  { time: 10, users: 64 },
  { time: 11, users: 91 },
];

export default function AnalyticsCharts() {
  const totalRecords = verticalSplitData.reduce((acc, item) => acc + item.value, 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
      {/* Revenue Trajectory Chart */}
      <div className="rounded-2xl p-6 relative overflow-hidden"
        style={{
          background: 'rgba(255,255,255,0.06)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255,255,255,0.10)',
        }}
      >
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">REVENUE TRAJECTORY</h3>
            <p className="text-xs text-slate-500 uppercase tracking-wider">Performance Overview 2024</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 text-xs font-semibold text-slate-400 rounded-lg hover:bg-white/5 transition-all">
              7D
            </button>
            <button className="px-3 py-1 text-xs font-semibold text-slate-400 rounded-lg hover:bg-white/5 transition-all">
              1M
            </button>
            <button className="px-3 py-1 text-xs font-semibold text-slate-400 rounded-lg hover:bg-white/5 transition-all">
              3M
            </button>
            <button className="px-3 py-1 text-xs font-semibold text-white rounded-lg bg-white/10 transition-all">
              1Y
            </button>
          </div>
        </div>

        {/* Revenue Chart - Client-side only */}
        <RevenueChart data={revenueData} />
      </div>

      {/* Vertical Split Donut Chart */}
      <div className="rounded-2xl p-6 relative overflow-hidden"
        style={{
          background: 'rgba(255,255,255,0.06)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255,255,255,0.10)',
        }}
      >
        <div className="mb-6">
          <h3 className="text-xl font-bold text-white mb-1">RECORDS BY SOURCE</h3>
        </div>

        <div className="flex items-center justify-center">
          <div className="relative w-[240px] h-[240px]">
            {/* Donut Chart - Client-side only */}
            <DonutChart data={verticalSplitData} />
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <div className="text-4xl font-bold text-white">{totalRecords}</div>
              <div className="text-xs text-slate-400 uppercase tracking-wider">RECORDS</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">
          {verticalSplitData.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ background: item.color }}
              />
              <span className="text-sm text-slate-400 uppercase tracking-wider">{item.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Real-time Users Card */}
      <div className="rounded-2xl p-6 relative overflow-hidden"
        style={{
          background: 'rgba(255,255,255,0.06)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255,255,255,0.10)',
        }}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg" style={{ background: 'rgba(99, 102, 241, 0.15)' }}>
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Real-time Users</div>
              <div className="text-3xl font-bold text-white">1,429</div>
            </div>
          </div>
        </div>

        <div className="h-24 flex items-end gap-1">
          {userActivityData.map((item, index) => (
            <div
              key={index}
              className="flex-1 rounded-t transition-all hover:opacity-80"
              style={{
                height: `${(item.users / 100) * 100}%`,
                background: 'linear-gradient(to top, #6366F1 0%, #8B5CF6 100%)',
              }}
            />
          ))}
        </div>
      </div>

      {/* Global Reach Card */}
      <div className="rounded-2xl p-6 relative overflow-hidden"
        style={{
          background: 'rgba(255,255,255,0.06)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255,255,255,0.10)',
        }}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg" style={{ background: 'rgba(16, 185, 129, 0.15)' }}>
              <Globe className="w-5 h-5 text-success" />
            </div>
            <div>
              <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Global Reach</div>
              <div className="text-3xl font-bold text-white">84</div>
            </div>
          </div>
        </div>
        <p className="text-sm text-slate-400">
          Active in <span className="text-white font-semibold">12 new countries</span> this month
        </p>
      </div>

      {/* Avg Session Card */}
      <div className="rounded-2xl p-6 relative overflow-hidden lg:col-span-2"
        style={{
          background: 'rgba(255,255,255,0.06)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255,255,255,0.10)',
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg" style={{ background: 'rgba(245, 158, 11, 0.15)' }}>
              <Clock className="w-5 h-5 text-warning" />
            </div>
            <div>
              <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Avg. Session</div>
              <div className="text-3xl font-bold text-white">4m 32s</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-success text-sm font-semibold">+0.8s</div>
            <div className="text-xs text-slate-500">since last week</div>
          </div>
        </div>
      </div>
    </div>
  );
}
