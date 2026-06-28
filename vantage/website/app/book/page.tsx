import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { WHATSAPP_SCAN } from "@/lib/brand/tokens";

export const metadata: Metadata = {
  title: "Contact VANTAGE",
  description: "Start a confidential conversation about document control, CAP support, deadlines and buyer readiness.",
};

export default function BookPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header variant="dark" />
      <main className="flex-1">
        <section className="bg-black text-white py-16 md:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] mb-4">VANTAGE · Contact</p>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight mb-4">Put the document risk on the table.</h1>
            <p className="text-base leading-relaxed max-w-2xl">Message SCAN with your factory name, location, role, worker count and next deadline. VANTAGE will respond on WhatsApp.</p>
          </div>
        </section>

        <section className="bg-white py-14">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="border border-black rounded-2xl p-8 md:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] mb-3">What to send</p>
              <ul className="space-y-3 text-sm text-black mb-8">
                <li>1. Factory name and location</li>
                <li>2. Your name and designation</li>
                <li>3. Approximate worker count</li>
                <li>4. Upcoming buyer, assessment or CAP deadline</li>
                <li>5. The main document problem you want reviewed</li>
              </ul>
              <a href={WHATSAPP_SCAN} target="_blank" rel="noopener noreferrer" className="inline-flex bg-black text-white font-bold px-8 py-4 rounded-full hover:opacity-80 transition-all">WhatsApp SCAN</a>
              <p className="text-xs text-black mt-5">VANTAGE provides compliance-readiness, document-control and remediation support. No audit or buyer outcome is guaranteed.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
