"use client";

import { useState, useEffect, useRef } from "react";
import {
  AlertTriangle, Boxes, ChevronDown, ChevronUp,
  CircleDollarSign, Download, Factory, Percent,
  Receipt, ShieldCheck, TrendingDown,
} from "lucide-react";
import { AnalysisResult } from "@/types";
import LeakCard from "./LeakCard";
import Card3D from "./Card3D";

interface ResultsDashboardProps { result: AnalysisResult; }

const CAT: Record<string, { bg: string; border: string; text: string; glow: string }> = {
  refund:    { bg:"rgba(239,68,68,0.10)",   border:"rgba(239,68,68,0.28)",   text:"#FCA5A5", glow:"rgba(239,68,68,0.18)"   },
  discount:  { bg:"rgba(245,158,11,0.09)",  border:"rgba(245,158,11,0.26)",  text:"#FCD34D", glow:"rgba(245,158,11,0.16)"  },
  supplier:  { bg:"rgba(167,139,250,0.09)", border:"rgba(167,139,250,0.26)", text:"#C4B5FD", glow:"rgba(167,139,250,0.16)" },
  inventory: { bg:"rgba(6,182,212,0.08)",   border:"rgba(6,182,212,0.24)",   text:"#67E8F9", glow:"rgba(6,182,212,0.14)"  },
};

function CategoryIcon({ category }: { category: string }) {
  const cls = "h-4 w-4";
  switch (category.toLowerCase()) {
    case "refund":    return <Receipt className={cls}/>;
    case "discount":  return <Percent className={cls}/>;
    case "supplier":  return <Factory className={cls}/>;
    case "inventory": return <Boxes className={cls}/>;
    default:          return <AlertTriangle className={cls}/>;
  }
}

function Counter({ to, prefix="", suffix="", dur=1.4 }: { to:number; prefix?:string; suffix?:string; dur?:number }) {
  const [v, setV] = useState(0);
  const raf = useRef<number|null>(null);
  const t0  = useRef<number|null>(null);
  useEffect(() => {
    t0.current = null;
    const tick = (ts: number) => {
      if (!t0.current) t0.current = ts;
      const p = Math.min((ts - t0.current) / (dur * 1000), 1);
      setV(to * (p === 1 ? 1 : 1 - Math.pow(2, -10 * p)));
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => { if (raf.current) cancelAnimationFrame(raf.current); };
  }, [to, dur]);
  return <span>{prefix}{Math.round(v).toLocaleString()}{suffix}</span>;
}

export default function ResultsDashboard({ result }: ResultsDashboardProps) {
  const [expanded, setExpanded] = useState<number|null>(0);
  const avgConf = result.findings.length
    ? result.findings.reduce((s,f) => s+f.confidence, 0) / result.findings.length : 0;

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">

      {/* ── Summary ──────────────────────────────────────── */}
      <Card3D className="rounded-2xl mb-8 overflow-hidden glass-panel" glowColor="rgba(124, 58, 237, 0.15)">
        <section className="h-full w-full">
        <div className="p-6 sm:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[10px] font-mono tracking-widest mb-4 border"
                style={{ background:"rgba(16,185,129,0.08)", borderColor:"rgba(16,185,129,0.22)", color:"#34D399" }}>
                <ShieldCheck className="h-3.5 w-3.5" />
                AUDIT COMPLETE
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white leading-snug">
                Forensic Analysis Report
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-400 max-w-2xl">
                {result.executive_summary}
              </p>
            </div>
            <button onClick={() => window.print()}
              className="flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium border transition hover:bg-white/5 btn-liquid-highlight"
              style={{ borderColor:"rgba(255,255,255,0.10)", color:"#CBD5E1", background:"rgba(255,255,255,0.03)" }}>
              <Download className="h-4 w-4" />
              Export Brief
            </button>
          </div>

          {/* Metrics */}
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              { label:"ANOMALIES DETECTED", value:result.findings.length,               icon:TrendingDown,      bg:"rgba(239,68,68,0.06)", border:"rgba(239,68,68,0.22)", text:"#EF4444", prefix:"",  suffix:"" },
              { label:"ESTIMATED LOSS",     value:Math.abs(result.total_estimated_leak), icon:CircleDollarSign, bg:"rgba(239,68,68,0.06)", border:"rgba(239,68,68,0.22)", text:"#EF4444", prefix:"$", suffix:"" },
              { label:"AVG CONFIDENCE",     value:avgConf*100,                           icon:ShieldCheck,      bg:"rgba(6,182,212,0.06)", border:"rgba(6,182,212,0.20)", text:"#06B6D4", prefix:"",  suffix:"%" },
            ].map(({ label, value, icon:Icon, bg, border, text, prefix, suffix }, i) => (
              <div key={label}
                className="rounded-xl p-5 border flex items-center gap-4 glass-panel animate-fade-in-up"
                style={{ background: bg, borderColor: border, animationDelay: `${i * 80}ms` }}>
                <div className="rounded-lg p-2.5" style={{ background: `${text}1a`, color: text, border: `1px solid ${text}33` }}>
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] font-mono tracking-widest text-slate-500">{label}</p>
                  <p className="mt-0.5 text-2xl font-bold font-mono text-white">
                    <Counter to={value} prefix={prefix} suffix={suffix} dur={1.3+i*0.15} />
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        </section>
      </Card3D>

      {/* ── Findings ─────────────────────────────────────── */}
      <div className="mb-5 flex justify-between items-end">
        <h3 className="text-xl font-bold text-white">Findings Registry</h3>
        <span className="text-[10px] font-mono tracking-widest text-slate-600">SORTED BY FINANCIAL IMPACT</span>
      </div>

      {result.findings.length === 0 ? (
        <div className="glass-panel rounded-2xl p-10 text-center" style={{ borderColor:"rgba(16,185,129,0.22)" }}>
          <ShieldCheck className="mx-auto h-10 w-10" style={{ color:"#10B981" }} />
          <h4 className="mt-4 text-lg font-semibold text-white">No Major Leaks Detected</h4>
          <p className="mt-2 text-sm text-slate-500">Financial streams appear stable.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {result.findings.map((finding, idx) => {
            const cat = finding.category.toLowerCase();
            const s = CAT[cat] ?? { bg:"rgba(100,116,139,0.10)", border:"rgba(100,116,139,0.25)", text:"#94A3B8", glow:"rgba(100,116,139,0.15)" };
            const isOpen = expanded === idx;

            return (
              <article key={`${cat}-${idx}`}
                className="glass-panel rounded-xl overflow-hidden animate-fade-in-up"
                style={{ animationDelay: `${idx * 60}ms` }}>
                <button type="button" onClick={() => setExpanded(isOpen ? null : idx)}
                  className="w-full flex items-start gap-4 p-5 text-left transition-colors"
                  style={{ background:"transparent" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.018)")}
                  onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>

                  {/* Icon */}
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg relative z-10"
                    style={{ background:s.bg, color:s.text, border:"1px solid", borderColor:s.border, boxShadow:`0 0 12px ${s.glow}` }}>
                    <CategoryIcon category={finding.category} />
                  </div>

                  <div className="min-w-0 flex-1 relative z-10">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className="rounded px-2 py-0.5 text-[10px] font-mono tracking-widest border"
                        style={{ background:s.bg, color:s.text, borderColor:s.border }}>
                        {finding.category.toUpperCase()}
                      </span>
                      <span className="text-[10px] font-mono flex items-center gap-1 text-slate-600">
                        <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background:"#A78BFA" }} />
                        {(finding.confidence*100).toFixed(0)}% CONF
                      </span>
                    </div>
                    <h4 className="text-base font-semibold text-slate-100 leading-snug">{finding.title}</h4>
                    <p className="mt-0.5 text-xs text-slate-500 truncate">{finding.entity}</p>
                  </div>

                  <div className="ml-auto shrink-0 flex items-center gap-3 pl-3 relative z-10">
                    <div className="text-right hidden sm:block">
                      <p className="text-[10px] font-mono text-slate-600">IMPACT</p>
                      <p className="text-base font-bold font-mono" style={{ color:"#F87171" }}>
                        −${Math.abs(finding.dollar_impact).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg border"
                      style={{ background:"rgba(255,255,255,0.04)", borderColor:"rgba(255,255,255,0.08)" }}>
                      {isOpen ? <ChevronUp className="h-3.5 w-3.5 text-slate-400"/>
                               : <ChevronDown className="h-3.5 w-3.5 text-slate-400"/>}
                    </div>
                  </div>
                </button>

                {/* Expandable detail */}
                {isOpen && (
                  <div style={{
                    overflow: "hidden",
                    animation: "fadeInUp 0.25s ease forwards",
                  }}>
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
