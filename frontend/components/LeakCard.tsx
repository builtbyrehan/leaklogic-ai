"use client";

import { Finding } from "@/types";
import { Lightbulb, AlertCircle, TrendingUp, Clock, CheckCircle } from "lucide-react";

export default function LeakCard({ finding }: { finding: Finding }) {
  return (
    <div className="border-t p-5 sm:p-6"
      style={{ borderColor:"rgba(255,255,255,0.06)", background:"rgba(0,0,0,0.22)" }}>
      <div className="grid md:grid-cols-2 gap-4">

        {/* ── LEFT: Hard evidence ──────────────────────────── */}
        <div className="space-y-3">

          {/* Metric shift */}
          <div className="rounded-xl border p-4"
            style={{ background:"rgba(6,182,212,0.05)", borderColor:"rgba(6,182,212,0.18)" }}>
            <div className="flex gap-3">
              <TrendingUp className="h-4 w-4 shrink-0 mt-0.5" style={{ color:"#22D3EE" }} />
              <div>
                <h5 className="text-[10px] font-mono tracking-widest mb-1.5" style={{ color:"rgba(103,232,249,0.55)" }}>
                  METRIC SHIFT
                </h5>
                <p className="text-sm font-mono leading-relaxed text-slate-300">{finding.metric_change}</p>
              </div>
            </div>
          </div>

          {/* Time window */}
          <div className="rounded-xl border p-4"
            style={{ background:"rgba(167,139,250,0.05)", borderColor:"rgba(167,139,250,0.18)" }}>
            <div className="flex gap-3">
              <Clock className="h-4 w-4 shrink-0 mt-0.5" style={{ color:"#A78BFA" }} />
              <div>
                <h5 className="text-[10px] font-mono tracking-widest mb-1.5" style={{ color:"rgba(167,139,250,0.55)" }}>
                  TIME WINDOW
                </h5>
                <p className="text-sm font-mono text-slate-300">{finding.time_window}</p>
              </div>
            </div>
          </div>

          {/* Evidence list */}
          <div className="rounded-xl border p-4"
            style={{ background:"rgba(255,255,255,0.025)", borderColor:"rgba(255,255,255,0.07)" }}>
            <div className="flex gap-3">
              <CheckCircle className="h-4 w-4 shrink-0 mt-0.5" style={{ color:"#34D399" }} />
              <div className="flex-1">
                <h5 className="text-[10px] font-mono tracking-widest mb-2" style={{ color:"rgba(52,211,153,0.55)" }}>
                  HARD EVIDENCE
                </h5>
                <ul className="space-y-2">
                  {finding.evidence.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs font-mono text-slate-400 leading-relaxed">
                      <span className="mt-1 shrink-0 text-[8px]" style={{ color:"#06B6D4" }}>◆</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT: AI reasoning ──────────────────────────── */}
        <div className="space-y-3">

          {/* Root cause */}
          <div className="rounded-xl border p-4"
            style={{ background:"rgba(239,68,68,0.07)", borderColor:"rgba(239,68,68,0.20)" }}>
            <div className="flex gap-3">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" style={{ color:"#F87171" }} />
              <div>
                <h5 className="text-[10px] font-mono tracking-widest mb-1.5" style={{ color:"rgba(248,113,113,0.55)" }}>
                  ROOT CAUSE HYPOTHESIS
                </h5>
                <p className="text-sm leading-relaxed" style={{ color:"#FECACA" }}>{finding.likely_cause}</p>
              </div>
            </div>
          </div>

          {/* Recommended action */}
          <div className="rounded-xl border p-4"
            style={{ background:"rgba(16,185,129,0.07)", borderColor:"rgba(16,185,129,0.20)" }}>
            <div className="flex gap-3">
              <Lightbulb className="h-4 w-4 shrink-0 mt-0.5" style={{ color:"#34D399" }} />
              <div>
                <h5 className="text-[10px] font-mono tracking-widest mb-1.5" style={{ color:"rgba(52,211,153,0.55)" }}>
                  RECOMMENDED INTERVENTION
                </h5>
                <p className="text-sm leading-relaxed" style={{ color:"#A7F3D0" }}>{finding.suggested_action}</p>
              </div>
            </div>
          </div>

          {/* Confidence bar */}
          <div className="rounded-xl border p-4"
            style={{ background:"rgba(124,58,237,0.07)", borderColor:"rgba(124,58,237,0.20)" }}>
            <h5 className="text-[10px] font-mono tracking-widest mb-3" style={{ color:"rgba(167,139,250,0.55)" }}>
              AI CONFIDENCE SCORE
            </h5>
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-md border"
                style={{ background:"rgba(167,139,250,0.10)", borderColor:"rgba(167,139,250,0.22)", color:"#C4B5FD" }}>
                VERIFIED MATCH
              </span>
              <span className="text-sm font-bold font-mono" style={{ color:"#A78BFA" }}>
                {(finding.confidence * 100).toFixed(0)}%
              </span>
            </div>
            <div className="h-1.5 rounded-full overflow-hidden"
              style={{ background:"rgba(255,255,255,0.07)" }}>
              <div className="h-full rounded-full transition-all duration-1000 ease-out"
                style={{
                  width: `${finding.confidence * 100}%`,
                  background: "linear-gradient(90deg,#7C3AED,#A78BFA,#67E8F9)",
                  boxShadow: "0 0 10px rgba(167,139,250,0.55)",
                }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
