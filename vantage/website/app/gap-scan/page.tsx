import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import GapScanForm from "@/components/gap-scan/GapScanForm";

export const metadata: Metadata = {
  title: "Free 12-File Document Risk Scan — VANTAGE",
  description: "Review 12 essential document categories through 25 structured checks.",
};

export default function GapScanPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header variant="dark" />
      <main className="flex-1 bg-white">
        <div className="bg-black text-white py-16 md:py-20 overflow-hidden">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white mb-4">VANTAGE · Document Risk Intelligence</p>
            <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight mb-4">Free 12-File Document Risk Scan</h1>
            <p className="text-white max-w-2xl text-base leading-relaxed">Complete 25 structured checks across 12 essential document categories. Identify missing, expired, inconsistent or difficult-to-retrieve evidence.</p>
            <p className="text-white text-sm mt-3 font-mono">About 15 to 30 minutes · No commitment</p>
          </div>
        </div>
        <div className="py-10 bg-white"><GapScanForm /></div>
      </main>
      <Footer />
    </div>
  );
}
