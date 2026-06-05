import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Sprint — VANTAGE Service Stack",
  description:
    "VANTAGE compliance service pricing: BLA 2026 Sprint BDT 55,000 · Retainer BDT 30,000/month · Worker Voice BDT 15,000/month · Intelligence Brief BDT 8,000/month.",
};

export default function PricingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header variant="dark" />
      <main className="flex-1">
        {/* Hero header */}
        <div className="bg-black text-white py-16 md:py-20 overflow-x-hidden">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white mb-4">
              VANTAGE Service Stack
            </p>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight mb-4 text-white">
              Choose the level of factory-risk support you need.
            </h1>
            <p className="text-white text-base max-w-xl">
              All prices in BDT. No hidden fees. No unapproved charges.
              Payment by bKash Business, Nagad Business, or bank transfer.
            </p>
          </div>
        </div>

        {/* Cards */}
        <div className="bg-white py-14">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="grid md:grid-cols-2 gap-5 mb-12">
              <ServiceCard
                badge="FREE"
                badgeStyle="border border-black text-black"
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
                duration="≈ 90 minutes — on-site or virtual"
                cta={{ label: "Start Free Gap Scan →", href: "/gap-scan" }}
              />

              <ServiceCard
                badge="SPRINT"
                badgeStyle="border border-white text-white"
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

              <ServiceCard
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

              <ServiceCard
                title="Worker Voice"
                tagline="Anonymous worker grievance intake — supports worker voice and grievance-readiness expectations for Sedex/SMETA and Higg."
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

              <ServiceCard
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
            <div className="border-l-2 border-black px-5 py-4">
              <p className="text-sm text-black">
                All VANTAGE services provide compliance guidance and audit-preparation support.
                VANTAGE does not provide legal advice and is not a law firm. No service package
                guarantees an audit outcome. Audit results are determined solely by the relevant
                audit body.{" "}
                <Link href="/legal/disclaimer" className="underline hover:opacity-60">
                  Full terms at /legal/disclaimer
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

interface ServiceCardProps {
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

function ServiceCard({
  badge,
  badgeStyle,
  title,
  tagline,
  price,
  priceNote,
  deliverables,
  notIncluded,
  duration,
  availability,
  cta,
  secondaryCta,
  featured,
}: ServiceCardProps) {
  return (
    <div
      className={`rounded-2xl flex flex-col ${
        featured
          ? "bg-black text-white border border-white"
          : "border border-black bg-white"
      } p-7`}
    >
      {badge && (
        <span
          className={`inline-block text-xs font-bold px-3 py-1 rounded-full mb-4 w-fit ${badgeStyle}`}
        >
          {badge}
        </span>
      )}
      <h2
        className={`text-lg font-black tracking-tight mb-1 ${
          featured ? "text-white" : "text-black"
        }`}
      >
        {title}
      </h2>
      <p
        className={`text-sm mb-5 leading-relaxed ${
          featured ? "text-white" : "text-black"
        }`}
      >
        {tagline}
      </p>

      <div className="mb-5">
        <div
          className={`text-2xl font-black tracking-tight ${
            featured ? "text-white" : "text-black"
          }`}
        >
          {price}
        </div>
        {priceNote && (
          <div className={`text-xs mt-0.5 ${featured ? "text-white" : "text-black"}`}>
            {priceNote}
          </div>
        )}
      </div>

      <ul className="space-y-2.5 flex-1 mb-5">
        {deliverables.map((d) => (
          <li key={d} className="flex items-start gap-2">
            <span className={`shrink-0 mt-0.5 font-bold text-sm ${featured ? "text-white" : "text-black"}`}>
              ✓
            </span>
            <span className={`text-sm leading-relaxed ${featured ? "text-white" : "text-black"}`}>
              {d}
            </span>
          </li>
        ))}
      </ul>

      {notIncluded && (
        <p className={`text-xs mb-4 ${featured ? "text-white" : "text-black"}`}>
          <strong>Not included:</strong> {notIncluded}
        </p>
      )}
      {duration && (
        <p className={`text-xs mb-4 font-medium font-mono ${featured ? "text-white" : "text-black"}`}>
          Delivery: {duration}
        </p>
      )}
      {availability && (
        <p className={`text-xs mb-4 ${featured ? "text-white" : "text-black"}`}>
          {availability}
        </p>
      )}

      <div className="flex flex-col gap-2 mt-auto">
        <Link
          href={cta.href}
          className={`w-full text-center font-bold py-3 rounded-full text-sm transition-all ${
            featured
              ? "border border-white text-white hover:bg-white hover:text-black"
              : "bg-black text-white hover:opacity-80"
          }`}
        >
          {cta.label}
        </Link>
        {secondaryCta && (
          <Link
            href={secondaryCta.href}
            className={`w-full text-center text-sm py-2 transition-opacity hover:opacity-60 ${
              featured ? "text-white" : "text-black"
            }`}
          >
            {secondaryCta.label}
          </Link>
        )}
      </div>
    </div>
  );
}
