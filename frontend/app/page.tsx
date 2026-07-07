"use client";

import { useState } from "react";
import { BarChart3, ShieldCheck, Sparkles } from "lucide-react";
import UploadSection from "@/components/UploadSection";
import ResultsDashboard from "@/components/ResultsDashboard";
import { AnalysisResult } from "@/types";

export default function Home() {
  const [analysisResult, setAnalysisResult] =
    useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalysisComplete = (result: AnalysisResult) => {
    setAnalysisResult(result);
    setIsAnalyzing(false);
  };

  const handleReset = () => {
    setAnalysisResult(null);
    setIsAnalyzing(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.22),_transparent_35%),radial-gradient(circle_at_top_right,_rgba(16,185,129,0.16),_transparent_30%)]" />

      <header className="border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 shadow-lg shadow-blue-600/20">
              <BarChart3 className="h-6 w-6" />
            </div>

            <div>
              <h1 className="text-lg font-bold tracking-tight sm:text-xl">
                Profit Leak Hunter
              </h1>
              <p className="text-xs text-slate-400">
                AI Business Auditor
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-xs font-medium text-emerald-300 sm:flex">
              <ShieldCheck className="h-4 w-4" />
              Grounded analysis
            </div>

            {analysisResult && (
              <button
                onClick={handleReset}
                className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
              >
                New Analysis
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:py-14">
        {!analysisResult ? (
          <UploadSection
            onAnalysisComplete={handleAnalysisComplete}
            isAnalyzing={isAnalyzing}
            setIsAnalyzing={setIsAnalyzing}
          />
        ) : (
          <ResultsDashboard result={analysisResult} />
        )}
      </main>

      <footer className="border-t border-white/10 bg-slate-950/80">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-6 text-sm text-slate-400 sm:flex-row sm:px-8">
          <p>Built for AMD Developer Hackathon: ACT II</p>

          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-blue-400" />
            <span>Unicorn Track</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
