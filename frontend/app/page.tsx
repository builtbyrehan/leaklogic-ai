"use client";

import { useState, useEffect } from "react";
import UploadSection from "@/components/UploadSection";
import ResultsDashboard from "@/components/ResultsDashboard";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import Navbar from "@/components/Navbar";
import { AnalysisResult } from "@/types";

export default function Home() {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

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
                />
              </div>
            </div>
          </>
        ) : (
          <div className="py-8">
            <ResultsDashboard result={analysisResult} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t" style={{
        background: 'rgba(255,255,255,0.03)',
        borderColor: 'rgba(124, 58, 237, 0.15)',
      }}>
        <div className="px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-slate-500 font-mono tracking-wider">
            Built for AMD Developer Hackathon: ACT II — Unicorn Track
          </p>
        </div>
      </footer>
    </div>
  );
}
