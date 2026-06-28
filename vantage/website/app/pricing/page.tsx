import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { WHATSAPP_SCAN } from "@/lib/brand/tokens";

export const metadata: Metadata = {
  title: "Services and Pricing — VANTAGE",
  description: "Document control, remediation support and multi-framework preparation for Bangladesh RMG factories.",
};

const plans = [
  ["Free 12-File Document Risk Scan", "BDT 0", "Essential file review, deadline check and risk summary."],
  ["BLA 2026 Compliance Sprint", "BDT 55,000", "Gap report, corrective action plan, policy support and implementation roadmap."],
  ["Ongoing Compliance Retainer", "BDT 30,000 / month", "Monthly monitoring, deadline tracking, CAP support, policy support and WhatsApp assistance."],
];

export default function PricingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header variant="dark" />
      <main className="flex-1 bg-white">
        <section className="bg-black text-white py-16 md:py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] mb-4">VANTAGE Services</p>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4">Choose the level of control your factory needs.</h1>
            <p className="max-w-2xl">Buyer readiness, document control, CAP support, regulatory intelligence and multi-framework preparation.</p>
          </div>
        </section>

        <section id="launch-offer" className="py-14 border-b border-black">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="bg-black text-white rounded-2xl p-8">
              <p className="text-xs font-semibold uppercase tracking-widest mb-3">Limited Launch Offer</p>
              <h2 className="text-3xl font-black mb-5">BDT 20,000 onboarding + BDT 12,000/month</h2>
              <p className="max-w-2xl mb-6">Includes monthly document monitoring, deadline tracking, CAP follow-up, policy support, regulatory alerts, WhatsApp assistance and mapping for BSCI, SMETA, RSC, WRAP, SLCP and buyer requirements. Availability is subject to onboarding capacity.</p>
              <a href={WHATSAPP_SCAN} target="_blank" rel="noopener noreferrer" className="inline-flex border border-white px-7 py-3 rounded-full font-bold hover:bg-white hover:text-black transition-all">WhatsApp SCAN</a>
            </div>
          </div>
        </section>

        <section className="py-14">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 grid md:grid-cols-3 gap-5">
            {plans.map(([title, price, description]) => (
              <article key={title} className="border border-black rounded-2xl p-7 flex flex-col">
                <h2 className="text-lg font-black mb-3">{title}</h2>
                <p className="text-2xl font-black mb-4">{price}</p>
                <p className="text-sm leading-relaxed flex-1 mb-6">{description}</p>
                <a href={WHATSAPP_SCAN} target="_blank" rel="noopener noreferrer" className="text-center bg-black text-white font-bold py-3 rounded-full">WhatsApp SCAN</a>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
