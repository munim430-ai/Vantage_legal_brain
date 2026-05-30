import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import GapScanForm from "@/components/gap-scan/GapScanForm";

export const metadata: Metadata = {
  title: "Free BLA 2026 Gap Scan — VANTAGE",
  description:
    "Answer 25 questions. Get your BLA 2026 compliance score in 90 minutes. Free. No commitment. VANTAGE identifies your audit risk before the auditor does.",
};

export default function GapScanPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header dark={false} />
      <main className="flex-1 bg-white">
        {/* Page header */}
        <div className="bg-vantage-black text-white py-10 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-3">Free BLA 2026 Gap Scan</h1>
            <p className="text-vantage-black-10 max-w-xl">
              Answer 25 questions about your factory&apos;s compliance records. VANTAGE calculates your compliance score and identifies your top audit risks &mdash; in real time.
            </p>
            <p className="text-vantage-black-50 text-sm mt-3">
              Takes approximately 15 to 30 minutes.
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="py-10">
          <GapScanForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}
