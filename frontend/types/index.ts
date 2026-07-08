export interface Finding {
  category: string;
  entity: string;
  title: string;
  metric_change: string;
  dollar_impact: number;
  confidence: number;
  time_window: string;
  evidence: string[];
  likely_cause: string | null;
  suggested_action: string;
}

export interface ChartData {
  revenue_over_time: Array<{
    month: string;
    value: number;
  }>;
  records_by_source: Record<string, number>;
  date_range: string;
}

export interface AnalysisResult {
  status: string;
  total_estimated_leak: number;
  findings: Finding[];
  executive_summary: string;
  narrative_source: "openrouter" | "fallback";
  amd_usage_note: string;
  chart_data?: ChartData;
}

export interface UploadedFiles {
  sales: File | null;
  refunds: File | null;
  suppliers: File | null;
  inventory: File | null;
}