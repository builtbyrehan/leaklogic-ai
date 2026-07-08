"use client";

import { Shield, Zap, Target, Brain, BarChart, Sparkles } from "lucide-react";
import AnalyticsCharts from "./AnalyticsCharts";
import Card3D from "./Card3D";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Detection",
    description: "Advanced algorithms analyze your data to uncover hidden profit leaks automatically",
    color: { bg: "rgba(124,58,237,0.08)", border: "rgba(124,58,237,0.25)", text: "#A78BFA", glow: "rgba(124,58,237,0.3)" },
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Get comprehensive analysis results in seconds, not hours or days",
    color: { bg: "rgba(245,158,11,0.08)", border: "rgba(245,158,11,0.25)", text: "#FCD34D", glow: "rgba(245,158,11,0.3)" },
  },
  {
    icon: Target,
    title: "Precision Insights",
    description: "Pinpoint exact areas of concern with 95% accuracy and detailed evidence",
    color: { bg: "rgba(239,68,68,0.08)", border: "rgba(239,68,68,0.25)", text: "#FCA5A5", glow: "rgba(239,68,68,0.3)" },
  },
  {
    icon: BarChart,
    title: "Visual Analytics",
    description: "Beautiful dashboards and charts make complex data easy to understand",
    color: { bg: "rgba(16,185,129,0.08)", border: "rgba(16,185,129,0.25)", text: "#34D399", glow: "rgba(16,185,129,0.3)" },
  },
  {
    icon: Shield,
    title: "Data Security",
    description: "Your business data stays private and secure with end-to-end encryption",
    color: { bg: "rgba(6,182,212,0.08)", border: "rgba(6,182,212,0.25)", text: "#67E8F9", glow: "rgba(6,182,212,0.3)" },
  },
  {
    icon: Sparkles,
    title: "Actionable Recommendations",
    description: "Not just problems — get specific solutions to fix every leak detected",
    color: { bg: "rgba(167,139,250,0.08)", border: "rgba(167,139,250,0.25)", text: "#C4B5FD", glow: "rgba(167,139,250,0.3)" },
  },
];

export default function FeaturesSection() {
  return (
    <div className="py-16 relative overflow-hidden">
      <div className="px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6 text-[11px] font-mono tracking-widest border"
            style={{
              background: 'rgba(124,58,237,0.10)',
              borderColor: 'rgba(124,58,237,0.25)',
              color: '#C4B5FD',
              boxShadow: '0 0 20px rgba(124,58,237,0.12)',
            }}>
            <Sparkles className="w-3.5 h-3.5" />
            WHY CHOOSE LEAKLOGIC
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
            POWERFUL <span className="text-gradient">FEATURES</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-xl mx-auto">
            Everything you need to identify and fix profit leaks in your business
          </p>
        </div>

        {/* Analytics Charts */}
        <AnalyticsCharts />

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card3D
                key={index}
                glowColor={feature.color.glow}
                className="rounded-2xl"
              >
                <div
                  className="group rounded-2xl p-6 border transition-all duration-300 h-full"
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    backdropFilter: 'blur(22px)',
                    borderColor: feature.color.border,
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  <div className="inline-flex p-3 rounded-xl mb-4 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: feature.color.bg, border: `1px solid ${feature.color.border}` }}>
                    <Icon className="w-6 h-6" style={{ color: feature.color.text }} />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2 uppercase tracking-wide"
                    style={{ textShadow: `0 0 20px ${feature.color.glow}` }}>
                    {feature.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </Card3D>
            );
          })}
        </div>

        {/* Stats Bar */}
        <Card3D className="rounded-2xl mt-10" glowColor="rgba(124,58,237,0.15)">
          <div className="rounded-2xl p-8 border glass-panel"
            style={{ borderColor: 'rgba(124,58,237,0.18)' }}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: "1000+", label: "Orders Analyzed" },
                { value: "4",     label: "Data Sources" },
                { value: "99.9%", label: "Uptime" },
                { value: "24/7",  label: "Analysis Ready" },
              ].map(({ value, label }) => (
                <div key={label} className="text-center">
                  <div className="text-4xl font-bold mb-2 text-gradient">{value}</div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider font-medium">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </Card3D>
      </div>
    </div>
  );
}
