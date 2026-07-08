import type { Metadata } from "next";
import "./globals.css";
import SplineBackground from "@/components/SplineBackground";

export const metadata: Metadata = {
  title: "LeakLogic AI — Profit Intelligence Platform",
  description:
    "AI-powered financial forensics that identifies hidden profit leaks in your business data. Upload CSVs to detect refund anomalies, discount leakage, and supplier margin pressure.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body
        className="relative flex min-h-full flex-col"
        style={{
          background: "#000",
          fontFamily:
            "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        }}
      >
        <div className="pointer-events-none fixed inset-0 z-0">
          <SplineBackground />
        </div>

        <div className="relative z-10 flex min-h-full flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}