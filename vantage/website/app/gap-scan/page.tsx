import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import GapScanForm from "@/components/gap-scan/GapScanForm";

export const metadata: Metadata = {
  title: "Free BLA 2026 Gap Scan — VANTAGE",
  description:
    "Answer 25 questions. Get your BLA 2026 compliance score. Free. No commitment. VANTAGE identifies your factory risk position before your buyer does.",
};

export default function GapScanPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header variant="dark" />
      <main className="flex-1 bg-white">
        {/* Dark command-style hero header */}
        <div className="bg-black text-white py-16 md:py-20 overflow-hidden">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white mb-4">
              VANTAGE · Factory Risk Intelligence
            </p>
            <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight mb-4">
              Free BLA 2026 Gap Scan
            </h1>
            <p className="text-white max-w-xl text-base leading-relaxed">
              Answer 25 structured questions about your factory&apos;s compliance records. VANTAGE
              calculates your compliance score and identifies your top risk gaps — in real time.
            </p>
            <p className="text-white text-sm mt-3 font-mono">
              ≈ 15 to 30 minutes · No commitment
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="py-10 bg-white">
          <GapScanForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}
