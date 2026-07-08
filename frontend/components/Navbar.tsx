"use client";

import { Activity, BarChart3, Sparkles, ChevronDown } from "lucide-react";
import Image from "next/image";

interface NavbarProps {
  hasResults: boolean;
  onReset: () => void;
}

export default function Navbar({ hasResults, onReset }: NavbarProps) {
  const scrollToSection = (sectionId: string) => {
    if (hasResults && sectionId !== '#') {
      onReset();
      setTimeout(() => {
        const element = document.querySelector(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else if (sectionId === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.querySelector(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b" style={{
      background: 'rgba(255,255,255,0.05)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderColor: 'rgba(124, 58, 237, 0.18)',
      boxShadow: '0 4px 24px rgba(0, 0, 0, 0.3), 0 0 0 0.5px rgba(124,58,237,0.08) inset',
    }}>
      <div className="max-w-[1920px] mx-auto px-8 lg:px-12">
        <div className="flex items-center justify-between h-[72px]">
          
          {/* Left: Logo & Brand */}
          <button 
            onClick={() => scrollToSection('#')}
            className="flex items-center gap-4 hover:opacity-90 transition-all duration-300 group"
          >
            {/* Logo with glow effect */}
            <div className="relative flex-shrink-0">
              <div
                className="absolute inset-0 rounded-full blur-2xl opacity-30 group-hover:opacity-50 transition-opacity"
                style={{ background: 'radial-gradient(circle, #A78BFA, #7C3AED)' }}
              />
              <Image
                src="/logo-leak-logic.png"
                alt="LeakLogic AI"
                width={56}
                height={56}
                className="relative object-contain drop-shadow-xl"
                style={{ mixBlendMode: 'screen', width: 56, height: 56 }}
                priority
              />
            </div>
            
            {/* Brand Text */}
            <div className="flex flex-col items-start justify-center gap-1">
              <h1 className="text-[20px] font-bold tracking-tight leading-none bg-gradient-to-r from-[#A78BFA] to-[#67E8F9] bg-clip-text text-transparent">
                LeakLogic AI
              </h1>
              <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-semibold leading-none">
                Profit Intelligence Platform
              </p>
            </div>
          </button>

          {/* Center: Navigation */}
          <nav className="hidden lg:flex items-center gap-2 absolute left-1/2 transform -translate-x-1/2">
            <button
              onClick={() => scrollToSection('#')}
              className="px-5 py-2.5 text-[13px] font-semibold text-white rounded-lg border transition-all duration-300"
              style={{
                background: 'rgba(124, 58, 237, 0.12)',
                borderColor: 'rgba(124, 58, 237, 0.35)',
                boxShadow: '0 0 12px rgba(124,58,237,0.15)',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 20px rgba(124,58,237,0.4)';
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(124,58,237,0.6)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 12px rgba(124,58,237,0.15)';
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(124,58,237,0.35)';
              }}
            >
              Dashboard
            </button>
            <button
              onClick={() => scrollToSection('#features')}
              className="px-5 py-2.5 text-[13px] font-medium text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-300"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('#upload')}
              className="px-5 py-2.5 text-[13px] font-medium text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-300"
            >
              Analyze
            </button>
          </nav>

          {/* Right: Status & Actions */}
          <div className="flex items-center gap-4">
            
            {/* System Status */}
            <div className="hidden xl:flex items-center gap-4 mr-2">
              {/* Live Indicator */}
              <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-lg border"
                style={{
                  background: 'rgba(16,185,129,0.08)',
                  borderColor: 'rgba(16,185,129,0.28)',
                  boxShadow: '0 0 10px rgba(16,185,129,0.1)',
                }}>
                <div className="relative">
                  <Activity className="w-3.5 h-3.5 text-emerald-400" strokeWidth={2.5} />
                  <div className="absolute -inset-1 bg-emerald-400/30 rounded-full blur-sm animate-pulse" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-emerald-400 leading-none">SYSTEM LIVE</span>
                  <span className="text-[9px] text-emerald-400/50 leading-none mt-0.5">Optimal</span>
                </div>
              </div>

              {/* AI Badge */}
              <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-lg border relative overflow-hidden" style={{
                background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.08) 0%, rgba(6, 182, 212, 0.08) 100%)',
                borderColor: 'rgba(124, 58, 237, 0.3)',
                boxShadow: '0 0 10px rgba(124,58,237,0.12)',
              }}>
                <Sparkles className="w-3.5 h-3.5 text-violet-400" strokeWidth={2.5} />
                <span className="text-[11px] font-bold text-violet-400 tracking-wide">AI POWERED</span>
              </div>
            </div>

            {/* CTA Button */}
            {hasResults ? (
              <button
                onClick={onReset}
                className="relative px-6 py-2.5 text-[13px] font-bold text-white rounded-lg transition-all duration-300 hover:scale-[1.02] overflow-hidden btn-liquid-highlight"
                style={{
                  background: 'linear-gradient(135deg, #7C3AED 0%, #4F46E5 50%, #06B6D4 100%)',
                  boxShadow: '0 0 24px rgba(124,58,237,0.45)',
                }}
              >
                <div className="absolute inset-0 bg-white/15 translate-y-full hover:translate-y-0 transition-transform duration-300" />
                <span className="relative flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" strokeWidth={2.5} />
                  New Analysis
                </span>
              </button>
            ) : (
              <button
                onClick={() => scrollToSection('#upload')}
                className="relative px-6 py-2.5 text-[13px] font-bold text-white rounded-lg transition-all duration-300 hover:scale-[1.02] overflow-hidden btn-liquid-highlight"
                style={{
                  background: 'linear-gradient(135deg, #7C3AED 0%, #4F46E5 50%, #06B6D4 100%)',
                  boxShadow: '0 0 24px rgba(124,58,237,0.45)',
                }}
              >
                <div className="absolute inset-0 bg-white/15 translate-y-full hover:translate-y-0 transition-transform duration-300" />
                <span className="relative flex items-center gap-2">
                  Get Started
                  <ChevronDown className="w-3.5 h-3.5" strokeWidth={3} />
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
