import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Pricing — VANTAGE BLA 2026 Compliance for Bangladesh RMG Factories",
  description:
    "VANTAGE compliance service pricing: BLA 2026 Sprint BDT 55,000 · Retainer BDT 30,000/month · Worker Voice BDT 15,000/month · Intelligence Brief BDT 8,000/month.",
};

export default function PricingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header dark={false} />
      <main className="flex-1 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
          <h1 className="text-3xl font-bold text-vantage-black mb-3">VANTAGE Service Pricing</h1>
          <p className="text-vantage-dark-grey mb-10">
            All prices in BDT. No hidden fees. No unapproved charges.
            Payment by bKash Business, Nagad Business, or bank transfer.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {/* Free Gap Scan */}
            <PricingCard
              badge="FREE"
              badgeStyle="bg-vantage-teal text-white"
              title="Free BLA 2026 Gap Scan"
              tagline="Identify your audit risk before you commit."
              price="BDT 0"
              priceNote="No cost. No commitment."
              deliverables={[
                "25-question BLA 2006 compliance assessment",
                "Compliance score (0–100)",
                "Risk band: Low / Medium / High / Critical",
                "Top 5 gaps identified",
                "Missing document list",
                "Recommended next step",
              ]}
              duration="90 minutes — on-site or virtual"
              cta={{ label: "Start Free Gap Scan →", href: "/gap-scan" }}
            />

            {/* Sprint — featured */}
            <PricingCard
              badge="MOST POPULAR"
              badgeStyle="bg-vantage-gold text-vantage-black"
              title="BLA 2026 Compliance Sprint"
              tagline="From gap scan to corrective action plan — in 5 working days."
              price="BDT 55,000"
              priceNote="All inclusive · 50% before start · 50% on delivery"
              deliverables={[
                "Full gap report — section-by-section BLA 2006 analysis",
                "Corrective action plan — prioritised by audit risk",
                "Up to 5 policy documents drafted or remediated",
                "30-day implementation roadmap",
                "One 60-minute review call after delivery",
                "PDF and editable DOCX formats",
                "Bangla summary for your HR team",
                "English version for buyer submission",
              ]}
              notIncluded="Representation at any audit · Legal advice · Factory visits outside Dhaka / Gazipur (transport billed separately)"
              duration="3 to 5 working days from Sprint start"
              cta={{ label: "Start With a Free Gap Scan →", href: "/gap-scan" }}
              secondaryCta={{ label: "Book a call to discuss →", href: "/book" }}
              featured
            />

            {/* Retainer */}
            <PricingCard
              title="Ongoing Compliance Retainer"
              tagline="Monthly advisory support between audits."
              price="BDT 30,000 / month"
              priceNote="Minimum 3-month commitment"
              deliverables={[
                "Regulatory update briefings when changes occur",
                "Up to 3 policy document reviews per month",
                "WhatsApp access to Munim (Mon–Fri, within 24 hours)",
                "Monthly 30-minute check-in call",
                "Priority booking for Sprint work",
              ]}
              availability="Available after completing a BLA 2026 Compliance Sprint, or by direct enrolment."
              cta={{ label: "Book a call to discuss →", href: "/book?offer=retainer" }}
            />

            {/* Worker Voice */}
            <PricingCard
              title="Worker Voice"
              tagline="Anonymous worker grievance intake — supports worker voice and grievance-readiness expectations for frameworks such as Sedex/SMETA and Higg."
              price="BDT 15,000 / month"
              priceNote="One-time setup: BDT 10,000 (waived for Retainer clients)"
              deliverables={[
                "Dedicated WhatsApp Business number for worker grievances",
                "Bangla-language automated intake flow",
                "Secure, encrypted grievance logging",
                "Weekly aggregated report for management",
                "Monthly summary for buyer submission",
                "Worker onboarding poster (A3, print-ready, Bangla)",
              ]}
              availability="For factories with 500 or more workers supplying to buyers requiring worker voice mechanisms."
              cta={{ label: "Book a call to discuss →", href: "/book?offer=worker-voice" }}
            />

            {/* Intelligence Brief */}
            <PricingCard
              title="VANTAGE Intelligence Brief"
              tagline="Monthly regulatory intelligence for HR Managers and Compliance Officers."
              price="BDT 8,000 / month"
              priceNote="Included free for Retainer clients"
              deliverables={[
                "Monthly regulatory changes summary",
                "Audit standard updates (BSCI, WRAP, SA8000, Sedex)",
                "Buyer ESG requirement movements",
                "VANTAGE anonymised case note",
                "English full edition + Bangla executive summary",
                "Delivered on the 1st of each month",
              ]}
              cta={{ label: "Subscribe →", href: "/book?offer=intelligence-brief" }}
            />
          </div>

          {/* Disclaimer */}
          <div className="border-l-4 border-vantage-teal bg-vantage-light-grey px-5 py-4 rounded-r">
            <p className="text-sm text-vantage-dark-grey">
              All VANTAGE services provide compliance guidance and audit-preparation support. VANTAGE does not provide legal advice and is not a law firm. No service package guarantees an audit outcome. Audit results are determined solely by the relevant audit body.{" "}
              <Link href="/legal/disclaimer" className="underline hover:text-vantage-black">
                Full terms at govantage.vercel.app/legal/disclaimer
              </Link>.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

interface PricingCardProps {
  badge?: string;
  badgeStyle?: string;
  title: string;
  tagline: string;
  price: string;
  priceNote?: string;
  deliverables: string[];
  notIncluded?: string;
  duration?: string;
  availability?: string;
  cta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  featured?: boolean;
}

function PricingCard({
  badge, badgeStyle, title, tagline, price, priceNote,
  deliverables, notIncluded, duration, availability,
  cta, secondaryCta, featured,
}: PricingCardProps) {
  return (
    <div
      className={`rounded border flex flex-col ${
        featured ? "border-vantage-black bg-vantage-black text-white" : "border-vantage-black-10 bg-white"
      } p-6`}
    >
      {badge && (
        <span className={`inline-block text-xs font-semibold px-2 py-1 rounded mb-3 w-fit ${badgeStyle}`}>
          {badge}
        </span>
      )}
      <h2 className={`text-lg font-bold mb-1 ${featured ? "text-white" : "text-vantage-black"}`}>{title}</h2>
      <p className={`text-sm mb-4 ${featured ? "text-vantage-black-10" : "text-vantage-dark-grey"}`}>{tagline}</p>

      <div className="mb-4">
        <div className={`text-2xl font-bold ${featured ? "text-vantage-gold" : "text-vantage-black"}`}>{price}</div>
        {priceNote && (
          <div className={`text-xs mt-0.5 ${featured ? "text-vantage-black-10" : "text-vantage-medium-grey"}`}>
            {priceNote}
          </div>
        )}
      </div>

      <ul className="space-y-2 flex-1 mb-4">
        {deliverables.map((d) => (
          <li key={d} className="flex items-start gap-2">
            <span className={`shrink-0 mt-0.5 ${featured ? "text-vantage-gold" : "text-vantage-teal"}`}>✓</span>
            <span className={`text-sm ${featured ? "text-vantage-black-10" : "text-vantage-dark-grey"}`}>{d}</span>
          </li>
        ))}
      </ul>

      {notIncluded && (
        <p className={`text-xs mb-4 ${featured ? "text-vantage-black-50" : "text-vantage-medium-grey"}`}>
          <strong>Not included:</strong> {notIncluded}
        </p>
      )}

      {duration && (
        <p className={`text-xs mb-4 font-medium ${featured ? "text-vantage-black-30" : "text-vantage-medium-grey"}`}>
          Delivery: {duration}
        </p>
      )}

      {availability && (
        <p className={`text-xs mb-4 ${featured ? "text-vantage-black-30" : "text-vantage-medium-grey"}`}>
          {availability}
        </p>
      )}

      <div className="flex flex-col gap-2 mt-auto">
        <Link
          href={cta.href}
          className={`w-full text-center font-semibold py-3 rounded transition-colors ${
            featured
              ? "bg-vantage-gold text-vantage-black hover:bg-yellow-400"
              : "bg-vantage-black text-white hover:bg-vantage-black-90"
          }`}
        >
          {cta.label}
        </Link>
        {secondaryCta && (
          <Link
            href={secondaryCta.href}
            className={`w-full text-center text-sm py-2 transition-colors ${
              featured
                ? "text-vantage-black-10 hover:text-white"
                : "text-vantage-dark-grey hover:text-vantage-black"
            }`}
          >
            {secondaryCta.label}
          </Link>
        )}
      </div>
    </div>
  );
}
