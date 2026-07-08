import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SplineBackground from "@/components/SplineBackground";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "LeakLogic AI — Profit Intelligence Platform",
  description: "AI-powered financial forensics that identifies hidden profit leaks in your business data. Upload CSVs to detect refund anomalies, discount leakage, and supplier margin pressure.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col relative" style={{ background: "#000" }}>
        {/* Global Image Mesh Background */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <SplineBackground />
        </div>
        <div className="relative z-10 min-h-full flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
