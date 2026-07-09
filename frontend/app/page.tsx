"use client";

import { useState, useEffect } from "react";
import { BarChart3, Upload, TrendingDown, Activity, Clock, FileText } from "lucide-react";
import Link from "next/link";
import UploadSection from "@/components/UploadSection";
import ResultsDashboard from "@/components/ResultsDashboard";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import Navbar from "@/components/Navbar";
import { AnalysisResult } from "@/types";

export default function Home() {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasHistory] = useState(false); // TODO: Connect to actual history
  const [triggerSampleData, setTriggerSampleData] = useState(false);

  const handleAnalysisComplete = (result: AnalysisResult) => {
    setAnalysisResult(result);
    setIsAnalyzing(false);
  };

  // Scroll to top when analysis results are displayed
  useEffect(() => {
    if (analysisResult) {
      window.scrollTo(0, 0);
    }
  }, [analysisResult]);

  const handleReset = () => {
    setAnalysisResult(null);
    setIsAnalyzing(false);
    setTriggerSampleData(false);
  };

  const handleSampleDataClick = () => {
    setTriggerSampleData(true);
    // Scroll to upload section where the sample data will be triggered
    setTimeout(() => {
      const uploadSection = document.getElementById('upload');
      if (uploadSection) {
        uploadSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen relative bg-transparent">

      {/* Ambient floating orbs */}
      <div className="orb orb-violet" />
      <div className="orb orb-cyan" />
      <div className="orb orb-mid" />

      {/* Navbar */}
      <Navbar hasResults={!!analysisResult} onReset={handleReset} />

      {/* Main Content */}
      <main>
        {!analysisResult ? (
          <>
            {/* Hero Section - Full Width, No Padding */}
            <HeroSection />
            
            {/* Dashboard Section */}
            <div id="dashboard" className="relative z-10 px-4 sm:px-6 lg:px-8 py-12 max-w-7xl mx-auto">
              {/* Dashboard Header */}
              <div className="mb-12 text-center">
                <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-violet-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Dashboard
                </h2>
                <p className="text-lg text-slate-200 max-w-2xl mx-auto">
                  Monitor your profit leaks, track analyses, and manage your business intelligence
                </p>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {/* New Analysis Card */}
                <a href="#upload" className="block">
                  <div
                    className="group relative overflow-hidden rounded-2xl p-6 border cursor-pointer transition-all duration-300 hover:scale-105 h-full"
                    style={{
                      background: 'rgba(124, 58, 237, 0.12)',
                      backdropFilter: 'blur(16px)',
                      borderColor: 'rgba(124, 58, 237, 0.35)',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                    }}
                  >
                    <div className="relative z-10">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                        style={{
                          background: 'linear-gradient(135deg, #7C3AED 0%, #4F46E5 100%)',
                          boxShadow: '0 0 20px rgba(124, 58, 237, 0.4)',
                        }}
                      >
                        <Upload className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">New Analysis</h3>
                      <p className="text-sm text-slate-200">
                        Upload CSV files and discover profit leaks
                      </p>
                    </div>
                  </div>
                </a>

                {/* Sample Data Card */}
                <button onClick={handleSampleDataClick} className="block w-full text-left p-0 border-0 bg-transparent cursor-pointer">
                  <div 
                    className="group relative overflow-hidden rounded-2xl p-6 border cursor-pointer transition-all duration-300 hover:scale-105 h-full"
                    style={{
                      background: 'rgba(6, 182, 212, 0.12)',
                      backdropFilter: 'blur(16px)',
                      borderColor: 'rgba(6, 182, 212, 0.35)',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                    }}
                  >
                    <div className="relative z-10">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                        style={{
                          background: 'linear-gradient(135deg, #06B6D4 0%, #0891B2 100%)',
                          boxShadow: '0 0 20px rgba(6, 182, 212, 0.4)',
                        }}
                      >
                        <BarChart3 className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">Try Sample Data</h3>
                      <p className="text-sm text-slate-200">
                        Test with pre-loaded demo dataset
                      </p>
                    </div>
                  </div>
                </button>

                {/* Documentation Card */}
                <Link href="/docs" className="block">
                  <div 
                    className="group relative overflow-hidden rounded-2xl p-6 border cursor-pointer transition-all duration-300 hover:scale-105 h-full"
                    style={{
                      background: 'rgba(167, 139, 250, 0.12)',
                      backdropFilter: 'blur(16px)',
                      borderColor: 'rgba(167, 139, 250, 0.35)',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                    }}
                  >
                    <div className="relative z-10">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                        style={{
                          background: 'linear-gradient(135deg, #A78BFA 0%, #8B5CF6 100%)',
                          boxShadow: '0 0 20px rgba(167, 139, 250, 0.4)',
                        }}
                      >
                        <FileText className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">Documentation</h3>
                      <p className="text-sm text-slate-200">
                        Learn how to use LeakLogic AI
                      </p>
                    </div>
                  </div>
                </Link>
              </div>

              {/* Stats Overview */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                {[
                  { label: "Total Analyses", value: "0", icon: BarChart3, color: "#7C3AED" },
                  { label: "Leaks Detected", value: "0", icon: TrendingDown, color: "#EF4444" },
                  { label: "Avg Analysis Time", value: "< 30s", icon: Clock, color: "#06B6D4" },
                  { label: "System Status", value: "Online", icon: Activity, color: "#10B981" },
                ].map(({ label, value, icon: Icon, color }) => (
                  <div
                    key={label}
                    className="rounded-xl p-4 border"
                    style={{
                      background: 'rgba(255,255,255,0.06)',
                      backdropFilter: 'blur(16px)',
                      borderColor: 'rgba(255,255,255,0.15)',
                    }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <Icon className="w-4 h-4" style={{ color }} />
                      <span className="text-xs text-slate-300 uppercase tracking-wider font-semibold">{label}</span>
                    </div>
                    <div className="text-2xl font-bold text-white">{value}</div>
                  </div>
                ))}
              </div>

              {/* Analysis History */}
              <div
                className="rounded-2xl p-8 border mb-12"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  backdropFilter: 'blur(16px)',
                  borderColor: 'rgba(255,255,255,0.15)',
                }}
              >
                <h2 className="text-2xl font-bold text-white mb-6">Recent Analyses</h2>
                
                {!hasHistory ? (
                  <div className="text-center py-12">
                    <div 
                      className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                      style={{
                        background: 'rgba(124, 58, 237, 0.15)',
                        border: '1px solid rgba(124, 58, 237, 0.4)',
                      }}
                    >
                      <BarChart3 className="w-8 h-8 text-violet-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">No analyses yet</h3>
                    <p className="text-slate-200 mb-6">
                      Upload your business data to get started with profit leak detection
                    </p>
                    <a href="#upload">
                      <button
                        className="px-6 py-3 rounded-lg font-semibold text-white transition-all duration-300 hover:scale-105"
                        style={{
                          background: 'linear-gradient(135deg, #7C3AED 0%, #4F46E5 50%, #06B6D4 100%)',
                          boxShadow: '0 0 24px rgba(124,58,237,0.4)',
                        }}
                      >
                        Run Your First Analysis
                      </button>
                    </a>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {/* TODO: Add history items when available */}
                  </div>
                )}
              </div>
            </div>
            
            {/* Features and Upload - Full Width, No Container */}
            <div>
              <div id="features">
                <FeaturesSection />
              </div>
              <div id="upload" className="py-8">
                <UploadSection
                  onAnalysisComplete={handleAnalysisComplete}
                  isAnalyzing={isAnalyzing}
                  setIsAnalyzing={setIsAnalyzing}
                  triggerSampleData={triggerSampleData}
                  onSampleDataTriggered={() => setTriggerSampleData(false)}
                />
              </div>
            </div>
          </>
        ) : (
          <div className="py-12 px-6 lg:px-12">
            <ResultsDashboard result={analysisResult} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t" style={{
        background: 'rgba(0,0,0,0.3)',
        backdropFilter: 'blur(20px)',
        borderColor: 'rgba(124, 58, 237, 0.2)',
      }}>
        <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
          {/* Top Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                LeakLogic AI
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                AI-powered profit leak detection for smarter business decisions
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-3 uppercase tracking-wider">Quick Links</h4>
              <div className="flex flex-col gap-2">
                <a href="#home" className="text-sm text-slate-300 hover:text-violet-400 transition-colors">Home</a>
                <a href="#dashboard" className="text-sm text-slate-300 hover:text-violet-400 transition-colors">Dashboard</a>
                <a href="#features" className="text-sm text-slate-300 hover:text-violet-400 transition-colors">Features</a>
                <a href="/docs" className="text-sm text-slate-300 hover:text-violet-400 transition-colors">Documentation</a>
              </div>
            </div>

            {/* Built With */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-3 uppercase tracking-wider">Powered By</h4>
              <div className="flex flex-col gap-2 text-sm text-slate-300">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-violet-400 to-purple-400"></div>
                  <span>AMD AI Technology</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-400"></div>
                  <span>Next.js & FastAPI</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-emerald-400 to-green-400"></div>
                  <span>Advanced ML Models</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4" style={{
            borderColor: 'rgba(255,255,255,0.1)',
          }}>
            <p className="text-sm text-slate-300 font-mono">
              © 2024 LeakLogic AI. Built for AMD Developer Hackathon: ACT II
            </p>
            <div className="flex items-center gap-2 text-xs" style={{
              background: 'rgba(124, 58, 237, 0.1)',
              border: '1px solid rgba(124, 58, 237, 0.25)',
              padding: '6px 12px',
              borderRadius: '8px',
            }}>
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" style={{
                boxShadow: '0 0 8px rgba(16, 185, 129, 0.6)',
              }}></div>
              <span className="text-slate-300 font-semibold">All Systems Operational</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
