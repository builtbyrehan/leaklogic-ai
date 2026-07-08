"use client";

import { ArrowDown, Activity, TrendingUp, CheckCircle2, Zap, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative min-h-[700px] lg:min-h-[820px] overflow-hidden">


      {/* Extra glow overlay behind hero content */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 50% 70% at 30% 50%, rgba(0,0,0,0.55) 0%, transparent 70%)',
        }} />

      {/* Hero Content */}
      <div className="relative z-10 w-full lg:w-[62%] py-12 lg:py-20 px-4 sm:px-6 lg:px-12">
        <div
          className="rounded-2xl sm:rounded-3xl p-7 sm:p-10 md:p-14 lg:py-18 transition-all duration-1000"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateX(0)' : 'translateX(-40px)',
            background: 'rgba(0,0,0,0.35)',
            border: '1px solid rgba(255,255,255,0.06)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 0 0 0.5px rgba(255,255,255,0.03) inset, 0 20px 60px rgba(0,0,0,0.5)',
          }}
        >
          {/* Status Badges */}
          <div className="flex flex-wrap items-center gap-3 mb-7">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-mono tracking-widest border"
              style={{
                background: 'rgba(16,185,129,0.08)',
                borderColor: 'rgba(16,185,129,0.28)',
                color: '#34D399',
                boxShadow: '0 0 14px rgba(16,185,129,0.15)',
              }}>
              <div className="relative">
                <Activity className="w-3.5 h-3.5" />
                <div className="absolute -inset-1 bg-emerald-400/30 rounded-full blur-sm animate-pulse" />
              </div>
              ALL SYSTEMS OPERATIONAL
            </div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-mono tracking-widest border"
              style={{
                background: 'rgba(124,58,237,0.08)',
                borderColor: 'rgba(124,58,237,0.25)',
                color: '#C4B5FD',
              }}>
              <ShieldCheck className="w-3.5 h-3.5" />
              ENTERPRISE GRADE SECURITY
            </div>
          </div>

          {/* Main Heading */}
          <div className="mb-8 max-w-3xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.08] tracking-tight mb-6">
              <span className="block">FIND EVERY LEAK,</span>
              <span className="block text-gradient">
                PROTECT EVERY
              </span>
              <span className="block">PROFIT</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-300 max-w-2xl leading-relaxed">
              AI-powered analysis that identifies hidden profit leaks in your business data.{" "}
              <span className="text-slate-400">Upload your sales, refunds, supplier, and inventory data to discover where revenue is slipping through the cracks.</span>
            </p>
          </div>

          {/* Feature checks */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400 mb-8">
            {[
              { label: "Instant Detection", highlight: "Instant" },
              { label: "7+ Leak Categories", highlight: "7+" },
              { label: "AI-Powered Insights", highlight: "AI-Powered" },
            ].map(({ label, highlight }) => (
              <div key={label} className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0" style={{ color: '#10B981', filter: 'drop-shadow(0 0 6px rgba(16,185,129,0.5))' }} />
                <span>
                  <span className="font-semibold text-white">{highlight}</span>
                  {label.replace(highlight, "")}
                </span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <a
              href="#upload"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 btn-liquid-highlight"
              style={{
                background: 'linear-gradient(135deg, #7C3AED 0%, #4F46E5 50%, #06B6D4 100%)',
                boxShadow: '0 0 32px rgba(124,58,237,0.5), 0 10px 40px rgba(0,0,0,0.3)',
                color: 'white',
              }}
            >
              <Zap className="w-5 h-5" />
              <span>Try Free Analysis</span>
              <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Metric Cards */}
      <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-4 px-4 sm:px-6 lg:px-8 pb-8">
        {[
          {
            icon: TrendingUp,
            label: "Detection Types",
            value: "7+ Categories",
            color: { bg: "rgba(124,58,237,0.08)", border: "rgba(124,58,237,0.3)", icon: "#A78BFA", glow: "rgba(124,58,237,0.15)" },
          },
          {
            icon: Activity,
            label: "Analysis Time",
            value: "<60 Seconds",
            color: { bg: "rgba(16,185,129,0.08)", border: "rgba(16,185,129,0.3)", icon: "#34D399", glow: "rgba(16,185,129,0.12)" },
          },
          {
            icon: ShieldCheck,
            label: "Accuracy",
            value: "95% Precision",
            color: { bg: "rgba(6,182,212,0.08)", border: "rgba(6,182,212,0.3)", icon: "#67E8F9", glow: "rgba(6,182,212,0.12)" },
          },
          {
            icon: Zap,
            label: "Technology",
            value: "AMD Powered",
            color: { bg: "rgba(245,158,11,0.08)", border: "rgba(245,158,11,0.25)", icon: "#FCD34D", glow: "rgba(245,158,11,0.12)" },
          },
        ].map(({ icon: Icon, label, value, color }, i) => (
          <div key={label}
            className="relative overflow-hidden rounded-xl sm:rounded-2xl p-4 sm:p-6 transition-all duration-300 hover:scale-105 hover:-translate-y-1"
            style={{
              background: color.bg,
              backdropFilter: 'blur(22px)',
              border: `1px solid ${color.border}`,
              boxShadow: `0 8px 32px rgba(0, 0, 0, 0.3), 0 0 20px ${color.glow}`,
              animationDelay: `${i * 100}ms`,
            }}>
            {/* Shimmer */}
            <div className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(108deg, transparent 25%, rgba(255,255,255,0.04) 50%, transparent 75%)',
              }} />
            <div className="flex items-start justify-between mb-3 sm:mb-4">
              <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl relative z-10"
                style={{ background: color.bg, border: `1px solid ${color.border}` }}>
                <Icon className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: color.icon, filter: `drop-shadow(0 0 6px ${color.icon})` }} />
              </div>
            </div>
            <div className="relative z-10">
              <div className="text-xs text-slate-500 uppercase tracking-wider font-mono mb-1">{label}</div>
              <div className="text-lg sm:text-xl font-bold text-white" style={{ textShadow: `0 0 20px ${color.glow}` }}>{value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
