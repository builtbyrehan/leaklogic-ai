"use client";

"use client";

import { useState } from "react";
import {
  AlertCircle,
  Boxes,
  Database,
  Factory,
  FileCheck2,
  LoaderCircle,
  PlayCircle,
  Receipt,
  ShieldCheck,
  Sparkles,
  UploadCloud,
} from "lucide-react";

import { AnalysisResult, UploadedFiles } from "@/types";



interface UploadSectionProps {
  onAnalysisComplete: (result: AnalysisResult) => void;
  isAnalyzing: boolean;
  setIsAnalyzing: (analyzing: boolean) => void;
}

const API_URL = "http://127.0.0.1:8000";

export default function UploadSection({
  onAnalysisComplete,
  isAnalyzing,
  setIsAnalyzing,
}: UploadSectionProps) {
  const [files, setFiles] = useState<UploadedFiles>({
    sales: null,
    refunds: null,
    suppliers: null,
    inventory: null,
  });

  const [error, setError] = useState<string | null>(null);

  const fileTypes = [
    {
      key: "sales" as keyof UploadedFiles,
      label: "Sales Data",
      required: true,
      description: "Orders, revenue, product sales, discounts",
      icon: Database,
    },
    {
      key: "refunds" as keyof UploadedFiles,
      label: "Refunds",
      required: false,
      description: "Returns, refund amounts, affected products",
      icon: Receipt,
    },
    {
      key: "suppliers" as keyof UploadedFiles,
      label: "Supplier / COGS",
      required: false,
      description: "Supplier costs, unit prices, purchase volume",
      icon: Factory,
    },
    {
      key: "inventory" as keyof UploadedFiles,
      label: "Inventory",
      required: false,
      description: "Stock levels, age, turnover, holding value",
      icon: Boxes,
    },
  ];

  const uploadedCount = Object.values(files).filter(Boolean).length;

  const handleFileChange = (
    type: keyof UploadedFiles,
    file: File | null
  ) => {
    setFiles((previous) => ({
      ...previous,
      [type]: file,
    }));
    setError(null);
  };

  const submitAnalysis = async (formData: FormData) => {
    const response = await fetch(`${API_URL}/analyze`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      let message = "Analysis failed. Please check the backend and try again.";

      try {
        const data = await response.json();
        message = data.detail || message;
      } catch {
        // Keep the default error message.
      }

      throw new Error(message);
    }

    const result: AnalysisResult = await response.json();
    onAnalysisComplete(result);
  };

  const handleAnalyze = async () => {
    if (!files.sales) {
      setError("Upload a sales CSV file before starting the analysis.");
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      const formData = new FormData();

      if (files.sales) formData.append("sales", files.sales);
      if (files.refunds) formData.append("refunds", files.refunds);
      if (files.suppliers) formData.append("suppliers", files.suppliers);
      if (files.inventory) formData.append("inventory", files.inventory);

      await submitAnalysis(formData);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An unexpected error occurred during analysis."
      );
      setIsAnalyzing(false);
    }
  };

  const handleUseSampleData = async () => {
    setIsAnalyzing(true);
    setError(null);

    try {
      const formData = new FormData();
      const sampleFiles = ["sales", "refunds", "suppliers", "inventory"];

      for (const fileName of sampleFiles) {
        const response = await fetch(
          `${API_URL}/sample-data/${fileName}.csv`
        );

        if (!response.ok) {
          throw new Error(`Could not load ${fileName} sample data.`);
        }

        const blob = await response.blob();
        const file = new File([blob], `${fileName}.csv`, {
          type: "text/csv",
        });

        formData.append(fileName, file);
      }

      await submitAnalysis(formData);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Could not analyze the sample data."
      );
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl">
      <section className="mb-10 text-center">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/10 px-4 py-2 text-sm font-medium text-blue-300">
          <Sparkles className="h-4 w-4" />
          AI-powered profit intelligence
        </div>

        <h2 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Find where your business is
          <span className="block bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
            quietly losing money
          </span>
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
          Upload operational CSV files and receive ranked, evidence-backed
          findings across refunds, discounts, suppliers, and inventory.
        </p>
      </section>

      <section className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-2xl shadow-black/20 backdrop-blur-xl">
        <div className="border-b border-white/10 px-6 py-5 sm:px-8">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <h3 className="text-xl font-semibold text-white">
                Upload business data
              </h3>
              <p className="mt-1 text-sm text-slate-400">
                CSV files only. Sales data is required.
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-300">
              <FileCheck2 className="h-4 w-4 text-emerald-400" />
              {uploadedCount} of 4 files selected
            </div>
          </div>
        </div>

        <div className="grid gap-4 p-6 sm:grid-cols-2 sm:p-8">
          {fileTypes.map((fileType) => {
            const Icon = fileType.icon;
            const selectedFile = files[fileType.key];

            return (
              <label
                key={fileType.key}
                htmlFor={`file-${fileType.key}`}
                className={`group relative cursor-pointer rounded-2xl border p-5 transition-all ${
                  selectedFile
                    ? "border-emerald-400/40 bg-emerald-400/10"
                    : "border-white/10 bg-slate-900/50 hover:-translate-y-0.5 hover:border-blue-400/40 hover:bg-slate-900"
                }`}
              >
                <input
                  id={`file-${fileType.key}`}
                  type="file"
                  accept=".csv,text/csv"
                  disabled={isAnalyzing}
                  className="sr-only"
                  onChange={(event) =>
                    handleFileChange(
                      fileType.key,
                      event.target.files?.[0] || null
                    )
                  }
                />

                <div className="flex items-start justify-between gap-4">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                      selectedFile
                        ? "bg-emerald-400/15 text-emerald-300"
                        : "bg-blue-400/10 text-blue-300"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>

                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                      fileType.required
                        ? "bg-rose-400/10 text-rose-300"
                        : "bg-white/5 text-slate-400"
                    }`}
                  >
                    {fileType.required ? "Required" : "Optional"}
                  </span>
                </div>

                <h4 className="mt-5 font-semibold text-white">
                  {fileType.label}
                </h4>

                <p className="mt-1 min-h-10 text-sm leading-5 text-slate-400">
                  {fileType.description}
                </p>

                <div className="mt-5 flex items-center gap-2 text-sm font-medium">
                  {selectedFile ? (
                    <>
                      <FileCheck2 className="h-4 w-4 text-emerald-400" />
                      <span className="max-w-[220px] truncate text-emerald-300">
                        {selectedFile.name}
                      </span>
                    </>
                  ) : (
                    <>
                      <UploadCloud className="h-4 w-4 text-blue-400" />
                      <span className="text-blue-300">
                        Choose CSV file
                      </span>
                    </>
                  )}
                </div>
              </label>
            );
          })}
        </div>

        {error && (
          <div className="mx-6 mb-6 flex items-start gap-3 rounded-2xl border border-rose-400/20 bg-rose-400/10 p-4 sm:mx-8">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-rose-300" />
            <p className="text-sm text-rose-200">{error}</p>
          </div>
        )}

        <div className="border-t border-white/10 bg-black/10 p-6 sm:p-8">
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing || !files.sales}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
            >
              {isAnalyzing ? (
                <>
                  <LoaderCircle className="h-5 w-5 animate-spin" />
                  Analyzing business data...
                </>
              ) : (
                <>
                  <UploadCloud className="h-5 w-5" />
                  Analyze uploaded files
                </>
              )}
            </button>

            <button
              onClick={handleUseSampleData}
              disabled={isAnalyzing}
              className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3.5 font-semibold text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <PlayCircle className="h-5 w-5 text-emerald-400" />
              Try sample data
            </button>
          </div>

          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="h-4 w-4" />
            Your uploaded files are used only for this analysis
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ["Refund anomalies", "Detect unusual return and refund patterns"],
          ["Discount leakage", "Find promotions that reduce profit"],
          ["Supplier pressure", "Spot rising costs and shrinking margins"],
          ["Inventory drag", "Identify stock tying up working capital"],
        ].map(([title, description]) => (
          <div
            key={title}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
          >
            <h4 className="font-semibold text-white">{title}</h4>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              {description}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
}
