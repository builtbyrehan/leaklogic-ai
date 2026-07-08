"use client";

import { useEffect, useRef, useState } from "react";
import {
  AlertTriangle,
  Boxes,
  ChevronDown,
  ChevronUp,
  CircleDollarSign,
  Download,
  Factory,
  Percent,
  Receipt,
  ShieldCheck,
  Sparkles,
  TrendingDown,
} from "lucide-react";

import { AnalysisResult } from "@/types";
import AnalyticsCharts from "./AnalyticsCharts";
import Card3D from "./Card3D";
import LeakCard from "./LeakCard";

interface ResultsDashboardProps {
  result: AnalysisResult;
}

interface CategoryStyle {
  bg: string;
  border: string;
  text: string;
  glow: string;
}

const CATEGORY_STYLES: Record<string, CategoryStyle> = {
  refund: {
    bg: "rgba(239,68,68,0.10)",
    border: "rgba(239,68,68,0.28)",
    text: "#FCA5A5",
    glow: "rgba(239,68,68,0.18)",
  },
  discount: {
    bg: "rgba(245,158,11,0.09)",
    border: "rgba(245,158,11,0.26)",
    text: "#FCD34D",
    glow: "rgba(245,158,11,0.16)",
  },
  supplier: {
    bg: "rgba(167,139,250,0.09)",
    border: "rgba(167,139,250,0.26)",
    text: "#C4B5FD",
    glow: "rgba(167,139,250,0.16)",
  },
  inventory: {
    bg: "rgba(6,182,212,0.08)",
    border: "rgba(6,182,212,0.24)",
    text: "#67E8F9",
    glow: "rgba(6,182,212,0.14)",
  },
};

const DEFAULT_CATEGORY_STYLE: CategoryStyle = {
  bg: "rgba(100,116,139,0.10)",
  border: "rgba(100,116,139,0.25)",
  text: "#94A3B8",
  glow: "rgba(100,116,139,0.15)",
};

function CategoryIcon({ category }: { category: string }) {
  const className = "h-4 w-4";

  switch (category.toLowerCase()) {
    case "refund":
      return <Receipt className={className} />;

    case "discount":
      return <Percent className={className} />;

    case "supplier":
      return <Factory className={className} />;

    case "inventory":
      return <Boxes className={className} />;

    default:
      return <AlertTriangle className={className} />;
  }
}

interface CounterProps {
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}

function Counter({
  to,
  prefix = "",
  suffix = "",
  duration = 1.4,
}: CounterProps) {
  const [value, setValue] = useState(0);
  const animationFrame = useRef<number | null>(null);
  const startTime = useRef<number | null>(null);

  useEffect(() => {
    startTime.current = null;

    const tick = (timestamp: number) => {
      if (startTime.current === null) {
        startTime.current = timestamp;
      }

      const progress = Math.min(
        (timestamp - startTime.current) / (duration * 1000),
        1,
      );

      const easedProgress =
        progress === 1
          ? 1
          : 1 - Math.pow(2, -10 * progress);

      setValue(to * easedProgress);

      if (progress < 1) {
        animationFrame.current = requestAnimationFrame(tick);
      }
    };

    animationFrame.current = requestAnimationFrame(tick);

    return () => {
      if (animationFrame.current !== null) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, [to, duration]);

  return (
    <span>
      {prefix}
      {Math.round(value).toLocaleString()}
      {suffix}
    </span>
  );
}

function NarrativeBadge({
  narrativeSource,
}: {
  narrativeSource: AnalysisResult["narrative_source"];
}) {
  const isAiNarrative = narrativeSource === "openrouter";

  return (
    <div
      className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[10px] font-mono tracking-widest"
      style={{
        background: isAiNarrative
          ? "rgba(139,92,246,0.10)"
          : "rgba(245,158,11,0.10)",
        borderColor: isAiNarrative
          ? "rgba(139,92,246,0.30)"
          : "rgba(245,158,11,0.30)",
        color: isAiNarrative ? "#C4B5FD" : "#FCD34D",
      }}
    >
      {isAiNarrative ? (
        <Sparkles className="h-3.5 w-3.5" />
      ) : (
        <ShieldCheck className="h-3.5 w-3.5" />
      )}

      {isAiNarrative
        ? "NEMOTRON AI NARRATIVE"
        : "DETERMINISTIC FALLBACK"}
    </div>
  );
}

export default function ResultsDashboard({
  result,
}: ResultsDashboardProps) {
  const [expandedFinding, setExpandedFinding] =
    useState<number | null>(0);

  const averageConfidence = result.findings.length
    ? result.findings.reduce(
        (total, finding) => total + finding.confidence,
        0,
      ) / result.findings.length
    : 0;

  const metrics = [
    {
      label: "ANOMALIES DETECTED",
      value: result.findings.length,
      icon: TrendingDown,
      background: "rgba(239,68,68,0.12)",
      border: "rgba(239,68,68,0.3)",
      text: "#EF4444",
      prefix: "",
      suffix: "",
    },
    {
      label: "ESTIMATED LOSS",
      value: Math.abs(result.total_estimated_leak),
      icon: CircleDollarSign,
      background: "rgba(239,68,68,0.12)",
      border: "rgba(239,68,68,0.3)",
      text: "#EF4444",
      prefix: "$",
      suffix: "",
    },
    {
      label: "AVG CONFIDENCE",
      value: averageConfidence * 100,
      icon: ShieldCheck,
      background: "rgba(6,182,212,0.12)",
      border: "rgba(6,182,212,0.3)",
      text: "#06B6D4",
      prefix: "",
      suffix: "%",
    },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
      {/* Summary */}
      <Card3D
        className="glass-panel mb-8 overflow-hidden rounded-2xl"
        glowColor="rgba(124, 58, 237, 0.15)"
      >
        <section
          className="h-full w-full"
          style={{
            background: "rgba(0,0,0,0.35)",
            backdropFilter: "blur(10px)",
          }}
        >
          <div className="p-6 sm:p-8">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              <div className="min-w-0 flex-1">
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <div
                    className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[10px] font-mono tracking-widest"
                    style={{
                      background: "rgba(16,185,129,0.08)",
                      borderColor: "rgba(16,185,129,0.22)",
                      color: "#34D399",
                    }}
                  >
                    <ShieldCheck className="h-3.5 w-3.5" />
                    AUDIT COMPLETE
                  </div>

                  <NarrativeBadge
                    narrativeSource={result.narrative_source}
                  />
                </div>

                <h2 className="text-2xl font-bold leading-snug text-white sm:text-3xl">
                  Forensic Analysis Report
                </h2>

                <div className="mt-4 max-w-2xl whitespace-pre-wrap text-sm leading-7 text-slate-200">
                  {result.executive_summary}
                </div>

                <p className="mt-4 text-xs leading-5 text-slate-500">
                  {result.amd_usage_note}
                </p>
              </div>

              <button
                type="button"
                onClick={() => window.print()}
                className="btn-liquid-highlight flex shrink-0 items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition hover:bg-white/5"
                style={{
                  borderColor: "rgba(6,182,212,0.3)",
                  color: "#67E8F9",
                  background: "rgba(6,182,212,0.08)",
                }}
              >
                <Download className="h-4 w-4" />
                Export Brief
              </button>
            </div>

            {/* Metrics */}
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {metrics.map(
                (
                  {
                    label,
                    value,
                    icon: Icon,
                    background,
                    border,
                    text,
                    prefix,
                    suffix,
                  },
                  index,
                ) => (
                  <div
                    key={label}
                    className="glass-panel animate-fade-in-up flex items-center gap-4 rounded-xl border p-5"
                    style={{
                      background,
                      borderColor: border,
                      animationDelay: `${index * 80}ms`,
                    }}
                  >
                    <div
                      className="rounded-lg p-2.5"
                      style={{
                        background: `${text}1a`,
                        color: text,
                        border: `1px solid ${text}33`,
                      }}
                    >
                      <Icon className="h-5 w-5" />
                    </div>

                    <div>
                      <p className="text-[10px] font-semibold font-mono tracking-widest text-slate-300">
                        {label}
                      </p>

                      <p className="mt-0.5 text-2xl font-bold font-mono text-white">
                        <Counter
                          to={value}
                          prefix={prefix}
                          suffix={suffix}
                          duration={1.3 + index * 0.15}
                        />
                      </p>
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
        </section>
      </Card3D>

      {/* Visual analytics */}
      <div className="mb-8">
        <h3 className="mb-4 text-2xl font-bold text-white">
          Visual Analysis
        </h3>

        <AnalyticsCharts result={result} />
      </div>

      {/* Findings */}
      <div className="mb-5 flex items-end justify-between gap-4">
        <h3 className="text-xl font-bold text-white">
          Findings Registry
        </h3>

        <span className="text-right text-[10px] font-mono tracking-widest text-slate-500">
          SORTED BY FINANCIAL IMPACT
        </span>
      </div>

      {result.findings.length === 0 ? (
        <div
          className="glass-panel rounded-2xl p-10 text-center"
          style={{
            borderColor: "rgba(16,185,129,0.22)",
          }}
        >
          <ShieldCheck
            className="mx-auto h-10 w-10"
            style={{
              color: "#10B981",
            }}
          />

          <h4 className="mt-4 text-lg font-semibold text-white">
            No Major Leaks Detected
          </h4>

          <p className="mt-2 text-sm text-slate-400">
            Financial streams appear stable.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {result.findings.map((finding, index) => {
            const category = finding.category.toLowerCase();

            const categoryStyle =
              CATEGORY_STYLES[category] ??
              DEFAULT_CATEGORY_STYLE;

            const isOpen = expandedFinding === index;

            return (
              <article
                key={`${category}-${finding.entity}-${index}`}
                className="glass-panel animate-fade-in-up overflow-hidden rounded-xl"
                style={{
                  animationDelay: `${index * 60}ms`,
                }}
              >
                <button
                  type="button"
                  onClick={() =>
                    setExpandedFinding(isOpen ? null : index)
                  }
                  className="flex w-full items-start gap-4 p-5 text-left transition-colors"
                  style={{
                    background: "transparent",
                  }}
                  onMouseEnter={(event) => {
                    event.currentTarget.style.background =
                      "rgba(255,255,255,0.018)";
                  }}
                  onMouseLeave={(event) => {
                    event.currentTarget.style.background =
                      "transparent";
                  }}
                >
                  <div
                    className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                    style={{
                      background: categoryStyle.bg,
                      color: categoryStyle.text,
                      border: "1px solid",
                      borderColor: categoryStyle.border,
                      boxShadow: `0 0 12px ${categoryStyle.glow}`,
                    }}
                  >
                    <CategoryIcon category={finding.category} />
                  </div>

                  <div className="relative z-10 min-w-0 flex-1">
                    <div className="mb-1.5 flex flex-wrap items-center gap-2">
                      <span
                        className="rounded border px-2 py-0.5 text-[10px] font-mono tracking-widest"
                        style={{
                          background: categoryStyle.bg,
                          color: categoryStyle.text,
                          borderColor: categoryStyle.border,
                        }}
                      >
                        {finding.category.toUpperCase()}
                      </span>

                      <span className="flex items-center gap-1 text-[10px] font-mono text-slate-500">
                        <span
                          className="inline-block h-1.5 w-1.5 rounded-full"
                          style={{
                            background: "#A78BFA",
                          }}
                        />

                        {(finding.confidence * 100).toFixed(0)}% CONF
                      </span>
                    </div>

                    <h4 className="text-base font-semibold leading-snug text-slate-100">
                      {finding.title}
                    </h4>

                    <p className="mt-0.5 truncate text-xs text-slate-400">
                      {finding.entity}
                    </p>
                  </div>

                  <div className="relative z-10 ml-auto flex shrink-0 items-center gap-3 pl-3">
                    <div className="hidden text-right sm:block">
                      <p className="text-[10px] font-mono text-slate-500">
                        IMPACT
                      </p>

                      <p
                        className="text-base font-bold font-mono"
                        style={{
                          color: "#F87171",
                        }}
                      >
                        -$
                        {Math.abs(
                          finding.dollar_impact,
                        ).toLocaleString()}
                      </p>
                    </div>

                    <div
                      className="flex h-7 w-7 items-center justify-center rounded-lg border"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        borderColor: "rgba(255,255,255,0.08)",
                      }}
                    >
                      {isOpen ? (
                        <ChevronUp className="h-3.5 w-3.5 text-slate-400" />
                      ) : (
                        <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
                      )}
                    </div>
                  </div>
                </button>

                {isOpen && (
                  <div
                    style={{
                      overflow: "hidden",
                      animation: "fadeInUp 0.25s ease forwards",
                    }}
                  >
                    <LeakCard finding={finding} />
                  </div>
                )}
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}