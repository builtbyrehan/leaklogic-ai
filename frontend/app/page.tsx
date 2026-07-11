"use client";

import { useState, useEffect } from "react";
import {
  Activity,
  BarChart3,
  Clock,
  Cpu,
  ExternalLink,
  FileText,
  GitBranch,
  Github,
  Sparkles,
  TrendingDown,
  Upload,
  Users,
} from "lucide-react";
import Link from "next/link";
import UploadSection from "@/components/UploadSection";
import ResultsDashboard from "@/components/ResultsDashboard";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import Navbar from "@/components/Navbar";
import { AnalysisResult } from "@/types";

const teamMembers = [
  {
    name: "Muhammad Rehan",
    role: "Project Lead · Backend · AI · Deployment",
    github: "https://github.com/builtbyrehan",
  },
  {
    name: "Ehtisham Tahir",
    role: "Frontend Developer",
    github: "https://github.com/1ehtishamtahir",
  },
  {
    name: "Gul-e-Zara",
    role: "Full Stack Developer",
    github : "https://github.com/gulglitch",
  },
  {
    name: "Neha",
    role: "Full Stack Developer",
    github : "https://github.com/flash-source",
  },
  {
    name: "Zokirjanov Jasurbek",
    role: "Full Stack Developer",
    github: "https://github.com/shavkatjonboyboboyev31-glitch"
  },
];

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
      </main>{/* Footer */}
      <footer
        className="relative z-10 mt-16 overflow-hidden border-t"
        style={{
          background:
            "linear-gradient(180deg, rgba(7,8,23,0.92) 0%, rgba(3,4,15,0.98) 100%)",
          backdropFilter: "blur(24px)",
          borderColor: "rgba(124, 58, 237, 0.25)",
        }}
      >
        {/* Decorative background glow */}
        <div
          className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full blur-[120px]"
          style={{
            background: "rgba(124, 58, 237, 0.18)",
          }}
        />

        <div
          className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full blur-[120px]"
          style={{
            background: "rgba(6, 182, 212, 0.14)",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          {/* Main footer grid */}
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12">
            {/* Brand */}
            <div className="lg:col-span-4">
              <div className="mb-4 flex items-center gap-3">
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-xl"
                  style={{
                    background:
                      "linear-gradient(135deg, #7C3AED 0%, #4F46E5 50%, #06B6D4 100%)",
                    boxShadow: "0 0 24px rgba(124, 58, 237, 0.35)",
                  }}
                >
                  <TrendingDown className="h-5 w-5 text-white" />
                </div>

                <div>
                  <h3 className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-xl font-black text-transparent">
                    LeakLogic AI
                  </h3>

                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                    Profit Intelligence Platform
                  </p>
                </div>
              </div>

              <p className="max-w-md text-sm leading-6 text-slate-300">
                An explainable AI business auditor that analyzes sales,
                refunds, supplier costs, and inventory to uncover hidden
                profit leaks and generate actionable executive insights.
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href="https://github.com/builtbyrehan/leaklogic-ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-semibold text-slate-200 transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-400 hover:text-white"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    borderColor: "rgba(255,255,255,0.12)",
                  }}
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </a>

                <a
                  href="https://leaklogicai-backend.vercel.app/health"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-semibold text-slate-200 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-400 hover:text-white"
                  style={{
                    background: "rgba(6,182,212,0.07)",
                    borderColor: "rgba(6,182,212,0.2)",
                  }}
                >
                  <Activity className="h-4 w-4 text-emerald-400" />
                  API Status
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-2">
              <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-white">
                Quick Links
              </h4>

              <div className="flex flex-col gap-3">
                {[
                  { label: "Home", href: "#home" },
                  { label: "Dashboard", href: "#dashboard" },
                  { label: "Features", href: "#features" },
                  { label: "Run Analysis", href: "#upload" },
                  { label: "Documentation", href: "/docs" },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-violet-300"
                  >
                    <span className="h-1 w-1 rounded-full bg-slate-600 transition-all group-hover:w-3 group-hover:bg-violet-400" />
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Technology and hackathon */}
            <div className="lg:col-span-3">
              <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-white">
                Technology
              </h4>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-slate-300">
                  <Cpu className="h-4 w-4 text-red-400" />
                  <span>AMD Hackathon Ecosystem</span>
                </div>

                <div className="flex items-center gap-3 text-sm text-slate-300">
                  <Sparkles className="h-4 w-4 text-orange-400" />
                  <span>Fireworks AI Narrative</span>
                </div>

                <div className="flex items-center gap-3 text-sm text-slate-300">
                  <div className="h-2 w-2 rounded-full bg-cyan-400" />
                  <span>Next.js + TypeScript</span>
                </div>

                <div className="flex items-center gap-3 text-sm text-slate-300">
                  <div className="h-2 w-2 rounded-full bg-emerald-400" />
                  <span>FastAPI + pandas</span>
                </div>

                <div className="flex items-center gap-3 text-sm text-slate-300">
                  <div className="h-2 w-2 rounded-full bg-blue-400" />
                  <span>Docker + Cloud Deployment</span>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {["AMD", "lablab.ai", "Fireworks AI"].map((partner) => (
                  <span
                    key={partner}
                    className="rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-300"
                    style={{
                      background: "rgba(124,58,237,0.08)",
                      borderColor: "rgba(124,58,237,0.22)",
                    }}
                  >
                    {partner}
                  </span>
                ))}
              </div>
            </div>

            {/* Team */}
            <div className="lg:col-span-3">
              <div className="mb-4 flex items-center gap-2">
                <Users className="h-4 w-4 text-violet-400" />

                <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-white">
                  Team LeakLogic AI
                </h4>
              </div>

              <div className="space-y-3">
                {teamMembers.map((member) => (
                  <div
                    key={member.name}
                    className="group rounded-xl border px-3 py-2.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-400/50"
                    style={{
                      background: "rgba(255,255,255,0.035)",
                      borderColor: "rgba(255,255,255,0.08)",
                    }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-slate-100">
                          {member.name}
                        </p>

                        <p className="mt-0.5 text-[11px] leading-4 text-slate-500">
                          {member.role}
                        </p>
                      </div>

                      {member.github && (
                        <a
                          href={member.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${member.name} GitHub profile`}
                          className="rounded-md p-1.5 text-slate-500 transition-colors hover:bg-violet-500/10 hover:text-violet-300"
                        >
                          <Github className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Hackathon acknowledgement */}
          <div
            className="mt-10 rounded-2xl border p-4"
            style={{
              background:
                "linear-gradient(90deg, rgba(124,58,237,0.08), rgba(6,182,212,0.06))",
              borderColor: "rgba(124,58,237,0.2)",
            }}
          >
            <p className="text-center text-xs leading-5 text-slate-400">
              Built for the{" "}
              <span className="font-semibold text-slate-200">
                AMD Developer Hackathon: ACT II
              </span>{" "}
              hosted on{" "}
              <span className="font-semibold text-slate-200">
                lablab.ai
              </span>
              , with Fireworks AI powering the executive narrative layer.
            </p>
          </div>

          {/* Bottom footer */}
          <div
            className="mt-8 flex flex-col items-center justify-between gap-4 border-t pt-6 sm:flex-row"
            style={{
              borderColor: "rgba(255,255,255,0.09)",
            }}
          >
            <p className="text-center font-mono text-xs text-slate-500 sm:text-left">
              © {new Date().getFullYear()} LeakLogic AI. Built by Team
              LeakLogic AI.
            </p>

            <div
              className="flex items-center gap-2 rounded-full border px-3 py-1.5"
              style={{
                background: "rgba(16,185,129,0.07)",
                borderColor: "rgba(16,185,129,0.22)",
              }}
            >
              <div
                className="h-2 w-2 animate-pulse rounded-full bg-emerald-400"
                style={{
                  boxShadow: "0 0 9px rgba(16,185,129,0.7)",
                }}
              />

              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300">
                All Systems Operational
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
