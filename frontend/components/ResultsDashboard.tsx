"use client";

import { useState } from "react";
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
  TrendingDown,
} from "lucide-react";
import { AnalysisResult } from "@/types";
import LeakCard from "./LeakCard";

interface ResultsDashboardProps {
  result: AnalysisResult;
}

const categoryStyles: Record<string, string> = {
  refund: "border-rose-400/20 bg-rose-400/10 text-rose-300",
  discount: "border-amber-400/20 bg-amber-400/10 text-amber-300",
  supplier: "border-violet-400/20 bg-violet-400/10 text-violet-300",
  inventory: "border-blue-400/20 bg-blue-400/10 text-blue-300",
};

function CategoryIcon({ category }: { category: string }) {
  const iconClass = "h-5 w-5";

  switch (category.toLowerCase()) {
    case "refund":
      return <Receipt className={iconClass} />;
    case "discount":
      return <Percent className={iconClass} />;
    case "supplier":
      return <Factory className={iconClass} />;
    case "inventory":
      return <Boxes className={iconClass} />;
    default:
      return <AlertTriangle className={iconClass} />;
  }
}

export default function ResultsDashboard({
  result,
}: ResultsDashboardProps) {
  const [expandedLeak, setExpandedLeak] = useState<number | null>(0);

  const averageConfidence =
    result.findings.length > 0
      ? result.findings.reduce(
          (total, finding) => total + finding.confidence,
          0
        ) / result.findings.length
      : 0;

  const toggleLeak = (index: number) => {
    setExpandedLeak((current) => (current === index ? null : index));
  };

  const handleExport = () => {
    window.print();
  };

  return (
    <div className="mx-auto max-w-6xl">
      <section className="relative overflow-hidden rounded-3xl border border-rose-400/20 bg-gradient-to-br from-rose-500/20 via-slate-900 to-slate-950 p-6 shadow-2xl shadow-black/30 sm:p-8">
        <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-rose-500/20 blur-3xl" />

        <div className="relative">
          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-start">
            <div className="max-w-3xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-xs font-medium text-emerald-300">
                <ShieldCheck className="h-4 w-4" />
                Analysis complete
              </div>

              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Profit leak report
              </h2>

              <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">
                {result.executive_summary}
              </p>
            </div>

            <button
              onClick={handleExport}
              className="flex shrink-0 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/15"
            >
              <Download className="h-4 w-4" />
              Print report
            </button>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-rose-400/10 p-2.5 text-rose-300">
                  <TrendingDown className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Leaks detected
                  </p>
                  <p className="mt-1 text-3xl font-bold text-white">
                    {result.findings.length}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-amber-400/10 p-2.5 text-amber-300">
                  <CircleDollarSign className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Estimated impact
                  </p>
                  <p className="mt-1 text-3xl font-bold text-white">
                    ${Math.abs(
                      result.total_estimated_leak
                    ).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-blue-400/10 p-2.5 text-blue-300">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Average confidence
                  </p>
                  <p className="mt-1 text-3xl font-bold text-white">
                    {(averageConfidence * 100).toFixed(0)}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-10">
        <div className="mb-5 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-medium text-blue-300">
              Ranked by financial impact
            </p>
            <h3 className="mt-1 text-2xl font-bold text-white">
              Detected profit leaks
            </h3>
          </div>

          <p className="text-sm text-slate-500">
            Select a finding to view evidence and recommended action
          </p>
        </div>

        {result.findings.length === 0 ? (
          <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-8 text-center">
            <ShieldCheck className="mx-auto h-10 w-10 text-emerald-300" />
            <h4 className="mt-4 text-lg font-semibold text-white">
              No major leaks detected
            </h4>
            <p className="mt-2 text-sm text-slate-400">
              The uploaded files did not contain any high-priority findings.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {result.findings.map((finding, index) => {
              const category = finding.category.toLowerCase();
              const categoryStyle =
                categoryStyles[category] ||
                "border-slate-400/20 bg-slate-400/10 text-slate-300";

              return (
                <article
                  key={`${finding.category}-${finding.entity}-${index}`}
                  className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] transition hover:border-white/20"
                >
                  <button
                    type="button"
                    onClick={() => toggleLeak(index)}
                    className="flex w-full items-start gap-4 p-5 text-left transition hover:bg-white/[0.03] sm:p-6"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/5 text-slate-300">
                      <CategoryIcon category={finding.category} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`rounded-full border px-2.5 py-1 text-xs font-semibold uppercase tracking-wide ${categoryStyle}`}
                        >
                          {finding.category}
                        </span>

                        <span className="text-xs text-slate-500">
                          {(finding.confidence * 100).toFixed(0)}% confidence
                        </span>
                      </div>

                      <h4 className="mt-3 text-lg font-semibold text-white sm:text-xl">
                        {finding.title}
                      </h4>

                      <p className="mt-1 truncate text-sm text-slate-400">
                        {finding.entity}
                      </p>
                    </div>

                    <div className="ml-auto flex shrink-0 items-center gap-4">
                      <div className="text-right">
                        <p className="text-xs uppercase tracking-wide text-slate-500">
                          Impact
                        </p>
                        <p className="mt-1 text-lg font-bold text-rose-300 sm:text-xl">
                          -$
                          {Math.abs(
                            finding.dollar_impact
                          ).toLocaleString()}
                        </p>
                      </div>

                      {expandedLeak === index ? (
                        <ChevronUp className="h-5 w-5 text-slate-500" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-slate-500" />
                      )}
                    </div>
                  </button>

                  {expandedLeak === index && (
                    <LeakCard finding={finding} />
                  )}
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
