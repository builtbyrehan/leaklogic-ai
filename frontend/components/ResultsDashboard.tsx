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
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

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
  const badgeConfiguration = {
    fireworks: {
      label: "FIREWORKS AI NARRATIVE",
      background: "rgba(249,115,22,0.10)",
      borderColor: "rgba(249,115,22,0.32)",
      color: "#FDBA74",
      iconColor: "#FB923C",
      icon: <Sparkles className="h-3.5 w-3.5" />,
    },
    openrouter: {
      label: "NEMOTRON AI NARRATIVE",
      background: "rgba(139,92,246,0.10)",
      borderColor: "rgba(139,92,246,0.30)",
      color: "#C4B5FD",
      iconColor: "#A78BFA",
      icon: <Sparkles className="h-3.5 w-3.5" />,
    },
    fallback: {
      label: "DETERMINISTIC FALLBACK",
      background: "rgba(245,158,11,0.10)",
      borderColor: "rgba(245,158,11,0.30)",
      color: "#FCD34D",
      iconColor: "#F59E0B",
      icon: <ShieldCheck className="h-3.5 w-3.5" />,
    },
  } as const;

  const configuration =
    badgeConfiguration[narrativeSource] ??
    badgeConfiguration.fallback;

  return (
    <div
      className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[10px] font-mono tracking-widest"
      style={{
        background: configuration.background,
        borderColor: configuration.borderColor,
        color: configuration.color,
      }}
    >
      <span
        style={{
          color: configuration.iconColor,
        }}
      >
        {configuration.icon}
      </span>

      {configuration.label}
    </div>
  );
}

function ExecutiveSummary({
  summary,
}: {
  summary: string;
}) {
  return (
    <div className="mt-5 max-w-3xl text-sm leading-7 text-slate-200">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="mb-4 mt-6 text-2xl font-bold text-white first:mt-0">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="mb-3 mt-6 text-xl font-bold text-white first:mt-0">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="mb-2 mt-5 text-lg font-semibold text-cyan-100 first:mt-0">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="mb-4 leading-7 text-slate-200 last:mb-0">
              {children}
            </p>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-white">
              {children}
            </strong>
          ),
          em: ({ children }) => (
            <em className="text-slate-300">
              {children}
            </em>
          ),
          ul: ({ children }) => (
            <ul className="mb-5 ml-5 list-disc space-y-2 text-slate-200 marker:text-violet-400">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="mb-5 ml-5 list-decimal space-y-2 text-slate-200 marker:font-semibold marker:text-violet-400">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="pl-1 leading-7">
              {children}
            </li>
          ),
          hr: () => (
            <hr className="my-6 border-white/10" />
          ),
          blockquote: ({ children }) => (
            <blockquote className="my-5 border-l-4 border-violet-500/60 bg-violet-500/5 px-4 py-3 text-slate-300">
              {children}
            </blockquote>
          ),
          table: ({ children }) => (
            <div className="my-5 overflow-x-auto rounded-xl border border-white/10">
              <table className="min-w-full border-collapse text-left text-sm">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-white/5 text-slate-100">
              {children}
            </thead>
          ),
          tbody: ({ children }) => (
            <tbody className="divide-y divide-white/10">
              {children}
            </tbody>
          ),
          tr: ({ children }) => (
            <tr className="transition-colors hover:bg-white/[0.02]">
              {children}
            </tr>
          ),
          th: ({ children }) => (
            <th className="border-r border-white/10 px-4 py-3 font-semibold last:border-r-0">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border-r border-white/10 px-4 py-3 align-top text-slate-300 last:border-r-0">
              {children}
            </td>
          ),
          code: ({ children }) => (
            <code className="rounded bg-black/40 px-1.5 py-0.5 font-mono text-xs text-cyan-200">
              {children}
            </code>
          ),
        }}
      >
        {summary}
      </ReactMarkdown>
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
    <div className="w-full">
      <Card3D
        className="glass-panel mb-8 overflow-hidden rounded-3xl"
        glowColor="rgba(124, 58, 237, 0.15)"
      >
        <section
          className="h-full w-full"
          style={{
            background: "rgba(0,0,0,0.35)",
            backdropFilter: "blur(10px)",
          }}
        >
          <div className="p-8 sm:p-10 lg:p-12">
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

                <h2 className="text-3xl font-bold leading-snug text-white sm:text-4xl lg:text-5xl">
                  Forensic Analysis Report
                </h2>

                <ExecutiveSummary
                  summary={result.executive_summary}
                />

                <p className="mt-5 border-t border-white/10 pt-4 text-sm leading-5 text-slate-500">
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

            <div className="mt-10 grid gap-6 md:grid-cols-3">
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
                    className="glass-panel animate-fade-in-up flex items-center gap-5 rounded-2xl border p-8"
                    style={{
                      background,
                      borderColor: border,
                      animationDelay: `${index * 80}ms`,
                    }}
                  >
                    <div
                      className="rounded-xl p-4"
                      style={{
                        background: `${text}1a`,
                        color: text,
                        border: `1px solid ${text}33`,
                      }}
                    >
                      <Icon className="h-7 w-7" />
                    </div>

                    <div>
                      <p className="text-xs font-semibold font-mono tracking-widest text-slate-300">
                        {label}
                      </p>

                      <p className="mt-1 text-3xl font-bold font-mono text-white">
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

      <div className="mb-10">
        <h3 className="mb-6 text-3xl font-bold text-white">
          Visual Analysis
        </h3>

        <AnalyticsCharts result={result} />
      </div>

      <div className="mb-6 flex items-end justify-between gap-4">
        <h3 className="text-3xl font-bold text-white">
          Findings Registry
        </h3>

        <span className="text-right text-xs font-mono tracking-widest text-slate-500">
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
        <div className="space-y-4">
          {result.findings.map((finding, index) => {
            const category = finding.category.toLowerCase();

            const categoryStyle =
              CATEGORY_STYLES[category] ??
              DEFAULT_CATEGORY_STYLE;

            const isOpen = expandedFinding === index;

            return (
              <article
                key={`${category}-${finding.entity}-${index}`}
                className="glass-panel animate-fade-in-up overflow-hidden rounded-2xl"
                style={{
                  animationDelay: `${index * 60}ms`,
                }}
              >
                <button
                  type="button"
                  onClick={() =>
                    setExpandedFinding(isOpen ? null : index)
                  }
                  className="flex w-full items-start gap-5 p-6 lg:p-7 text-left transition-colors"
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
                    className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-xl"
                    style={{
                      background: categoryStyle.bg,
                      color: categoryStyle.text,
                      border: "1px solid",
                      borderColor: categoryStyle.border,
                      boxShadow: `0 0 12px ${categoryStyle.glow}`,
                    }}
                  >
                    <div className="scale-125">
                      <CategoryIcon category={finding.category} />
                    </div>
                  </div>

                  <div className="relative z-10 min-w-0 flex-1">
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <span
                        className="rounded border px-2.5 py-1 text-xs font-mono tracking-widest"
                        style={{
                          background: categoryStyle.bg,
                          color: categoryStyle.text,
                          borderColor: categoryStyle.border,
                        }}
                      >
                        {finding.category.toUpperCase()}
                      </span>

                      <span className="flex items-center gap-1.5 text-xs font-mono text-slate-500">
                        <span
                          className="inline-block h-2 w-2 rounded-full"
                          style={{
                            background: "#A78BFA",
                          }}
                        />

                        {(finding.confidence * 100).toFixed(0)}% CONF
                      </span>
                    </div>

                    <h4 className="text-lg font-semibold leading-snug text-slate-100 lg:text-xl">
                      {finding.title}
                    </h4>

                    <p className="mt-1 truncate text-sm text-slate-400">
                      {finding.entity}
                    </p>
                  </div>

                  <div className="relative z-10 ml-auto flex shrink-0 items-center gap-4 pl-4">
                    <div className="hidden text-right sm:block">
                      <p className="text-xs font-mono text-slate-500">
                        IMPACT
                      </p>

                      <p
                        className="text-xl font-bold font-mono lg:text-2xl"
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
                      className="flex h-9 w-9 items-center justify-center rounded-xl border"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        borderColor: "rgba(255,255,255,0.08)",
                      }}
                    >
                      {isOpen ? (
                        <ChevronUp className="h-4 w-4 text-slate-400" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-slate-400" />
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