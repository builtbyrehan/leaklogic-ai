"use client";

import {
  Activity,
  BarChart3,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface NavbarProps {
  hasResults: boolean;
  onReset: () => void;
}

const SECTION_IDS = [
  "home",
  "dashboard",
  "features",
  "upload",
];

export default function Navbar({
  hasResults,
  onReset,
}: NavbarProps) {
  const [activeSection, setActiveSection] =
    useState<string>("home");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150;

      if (window.scrollY < 100) {
        setActiveSection("home");
        return;
      }

      for (const sectionId of SECTION_IDS) {
        const element = document.getElementById(sectionId);

        if (!element) {
          continue;
        }

        const { offsetTop, offsetHeight } = element;

        if (
          scrollPosition >= offsetTop &&
          scrollPosition < offsetTop + offsetHeight
        ) {
          setActiveSection(sectionId);
          return;
        }
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const performScroll = (sectionId: string) => {
    if (sectionId === "home") {
      const homeElement = document.getElementById("home");

      if (homeElement) {
        homeElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      } else {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }

      return;
    }

    const element = document.getElementById(sectionId);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const scrollToSection = (sectionId: string) => {
    const normalizedSectionId =
      sectionId.replace(/^#/, "") || "home";

    if (hasResults) {
      onReset();

      window.setTimeout(() => {
        performScroll(normalizedSectionId);
      }, 150);

      return;
    }

    performScroll(normalizedSectionId);
  };

  const handleDashboardClick = () => {
    if (hasResults) {
      const dashboardElement =
        document.getElementById("dashboard");

      if (dashboardElement) {
        dashboardElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        return;
      }
    }

    scrollToSection("dashboard");
  };

  const isActive = (sectionId: string) =>
    activeSection === sectionId;

  const activeButtonStyle = {
    background: "rgba(124, 58, 237, 0.12)",
    borderColor: "rgba(124, 58, 237, 0.35)",
    boxShadow: "0 0 12px rgba(124,58,237,0.15)",
  };

  const handleActiveMouseEnter = (
    event: React.MouseEvent<HTMLButtonElement>,
    sectionId: string,
  ) => {
    if (!isActive(sectionId)) {
      return;
    }

    event.currentTarget.style.boxShadow =
      "0 0 20px rgba(124,58,237,0.4)";
    event.currentTarget.style.borderColor =
      "rgba(124,58,237,0.6)";
  };

  const handleActiveMouseLeave = (
    event: React.MouseEvent<HTMLButtonElement>,
    sectionId: string,
  ) => {
    if (!isActive(sectionId)) {
      return;
    }

    event.currentTarget.style.boxShadow =
      "0 0 12px rgba(124,58,237,0.15)";
    event.currentTarget.style.borderColor =
      "rgba(124,58,237,0.35)";
  };

  return (
    <header
      className="sticky top-0 z-50 border-b"
      style={{
        background: "rgba(255,255,255,0.05)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderColor: "rgba(124, 58, 237, 0.18)",
        boxShadow:
          "0 4px 24px rgba(0, 0, 0, 0.3), " +
          "0 0 0 0.5px rgba(124,58,237,0.08) inset",
      }}
    >
      <div className="mx-auto max-w-[1920px] px-8 lg:px-12">
        <div className="flex h-[72px] items-center justify-between">
          {/* Logo and brand */}
          <Link
            href="/"
            onClick={(event) => {
              event.preventDefault();
              scrollToSection("home");
            }}
            className="group flex items-center gap-4 transition-all duration-300 hover:opacity-90"
          >
            <div className="relative shrink-0">
              <div
                className="absolute inset-0 rounded-full opacity-30 blur-2xl transition-opacity group-hover:opacity-50"
                style={{
                  background:
                    "radial-gradient(circle, #A78BFA, #7C3AED)",
                }}
              />

              <Image
                src="/logo-leak-logic.png"
                alt="LeakLogic AI"
                width={56}
                height={56}
                className="relative object-contain drop-shadow-xl"
                style={{
                  mixBlendMode: "screen",
                  width: 56,
                  height: 56,
                }}
                priority
              />
            </div>

            <div className="flex flex-col items-start justify-center gap-1">
              <h1 className="bg-gradient-to-r from-[#A78BFA] to-[#67E8F9] bg-clip-text text-[20px] font-bold leading-none tracking-tight text-transparent">
                LeakLogic AI
              </h1>

              <p className="text-[10px] font-semibold uppercase leading-none tracking-[0.2em] text-slate-400">
                Profit Intelligence Platform
              </p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-2 lg:flex">
            <button
              type="button"
              onClick={() => scrollToSection("home")}
              className={`rounded-lg border px-5 py-2.5 text-[13px] transition-all duration-300 ${
                isActive("home")
                  ? "font-semibold text-white"
                  : "border-transparent font-medium text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
              style={
                isActive("home")
                  ? activeButtonStyle
                  : undefined
              }
              onMouseEnter={(event) =>
                handleActiveMouseEnter(event, "home")
              }
              onMouseLeave={(event) =>
                handleActiveMouseLeave(event, "home")
              }
            >
              Home
            </button>

            <button
              type="button"
              onClick={handleDashboardClick}
              className={`rounded-lg border px-5 py-2.5 text-[13px] transition-all duration-300 ${
                isActive("dashboard")
                  ? "font-semibold text-white"
                  : "border-transparent font-medium text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
              style={
                isActive("dashboard")
                  ? activeButtonStyle
                  : undefined
              }
              onMouseEnter={(event) =>
                handleActiveMouseEnter(event, "dashboard")
              }
              onMouseLeave={(event) =>
                handleActiveMouseLeave(event, "dashboard")
              }
            >
              Dashboard
            </button>

            <button
              type="button"
              onClick={() => scrollToSection("features")}
              className={`rounded-lg border px-5 py-2.5 text-[13px] transition-all duration-300 ${
                isActive("features")
                  ? "font-semibold text-white"
                  : "border-transparent font-medium text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
              style={
                isActive("features")
                  ? activeButtonStyle
                  : undefined
              }
              onMouseEnter={(event) =>
                handleActiveMouseEnter(event, "features")
              }
              onMouseLeave={(event) =>
                handleActiveMouseLeave(event, "features")
              }
            >
              Features
            </button>

            <button
              type="button"
              onClick={() => scrollToSection("upload")}
              className={`rounded-lg border px-5 py-2.5 text-[13px] transition-all duration-300 ${
                isActive("upload")
                  ? "font-semibold text-white"
                  : "border-transparent font-medium text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
              style={
                isActive("upload")
                  ? activeButtonStyle
                  : undefined
              }
              onMouseEnter={(event) =>
                handleActiveMouseEnter(event, "upload")
              }
              onMouseLeave={(event) =>
                handleActiveMouseLeave(event, "upload")
              }
            >
              Analyze
            </button>
          </nav>

          {/* Status and actions */}
          <div className="flex items-center gap-4">
            <div className="mr-2 hidden items-center gap-4 xl:flex">
              <div
                className="flex items-center gap-2.5 rounded-lg border px-3.5 py-2"
                style={{
                  background: "rgba(16,185,129,0.08)",
                  borderColor: "rgba(16,185,129,0.28)",
                  boxShadow:
                    "0 0 10px rgba(16,185,129,0.1)",
                }}
              >
                <div className="relative">
                  <Activity
                    className="h-3.5 w-3.5 text-emerald-400"
                    strokeWidth={2.5}
                  />

                  <div className="absolute -inset-1 animate-pulse rounded-full bg-emerald-400/30 blur-sm" />
                </div>

                <div className="flex flex-col">
                  <span className="text-[10px] font-bold leading-none text-emerald-400">
                    SYSTEM LIVE
                  </span>

                  <span className="mt-0.5 text-[9px] leading-none text-emerald-400/50">
                    Optimal
                  </span>
                </div>
              </div>

              <div
                className="relative flex items-center gap-2.5 overflow-hidden rounded-lg border px-3.5 py-2"
                style={{
                  background:
                    "linear-gradient(135deg, " +
                    "rgba(124, 58, 237, 0.08) 0%, " +
                    "rgba(6, 182, 212, 0.08) 100%)",
                  borderColor: "rgba(124, 58, 237, 0.3)",
                  boxShadow:
                    "0 0 10px rgba(124,58,237,0.12)",
                }}
              >
                <Sparkles
                  className="h-3.5 w-3.5 text-violet-400"
                  strokeWidth={2.5}
                />

                <span className="text-[11px] font-bold tracking-wide text-violet-400">
                  AI POWERED
                </span>
              </div>
            </div>

            {hasResults ? (
              <button
                type="button"
                onClick={onReset}
                className="btn-liquid-highlight relative overflow-hidden rounded-lg px-6 py-2.5 text-[13px] font-bold text-white transition-all duration-300 hover:scale-[1.02]"
                style={{
                  background:
                    "linear-gradient(135deg, " +
                    "#7C3AED 0%, #4F46E5 50%, #06B6D4 100%)",
                  boxShadow:
                    "0 0 24px rgba(124,58,237,0.45)",
                }}
              >
                <div className="absolute inset-0 translate-y-full bg-white/15 transition-transform duration-300 hover:translate-y-0" />

                <span className="relative flex items-center gap-2">
                  <BarChart3
                    className="h-4 w-4"
                    strokeWidth={2.5}
                  />
                  New Analysis
                </span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => scrollToSection("upload")}
                className="btn-liquid-highlight relative overflow-hidden rounded-lg px-6 py-2.5 text-[13px] font-bold text-white transition-all duration-300 hover:scale-[1.02]"
                style={{
                  background:
                    "linear-gradient(135deg, " +
                    "#7C3AED 0%, #4F46E5 50%, #06B6D4 100%)",
                  boxShadow:
                    "0 0 24px rgba(124,58,237,0.45)",
                }}
              >
                <div className="absolute inset-0 translate-y-full bg-white/15 transition-transform duration-300 hover:translate-y-0" />

                <span className="relative flex items-center gap-2">
                  Get Started
                  <ChevronDown
                    className="h-3.5 w-3.5"
                    strokeWidth={3}
                  />
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}