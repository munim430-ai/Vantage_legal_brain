import Link from "next/link";
import { WHATSAPP_DEFAULT } from "@/lib/brand/tokens";

const coverageAreas = [
  {
    title: "Employment documentation",
    detail: "Appointment letters, service terms, personnel files — Section 5 and Section 6 compliance",
  },
  {
    title: "Wage and hour records",
    detail: "Payroll breakdown, overtime calculation, deduction register — Section 123 evidence",
  },
  {
    title: "Working hours and rest periods",
    detail: "Daily and weekly hour registers, compensatory rest documentation — Section 100–108",
  },
  {
    title: "Leave entitlements",
    detail: "Annual leave, sick leave, maternity leave registers — Section 115–121",
  },
  {
    title: "Health and safety documentation",
    detail: "OSHI notices, fire safety certificates, accident register — Section 61–77",
  },
  {
    title: "Worker rights policies",
    detail: "Anti-harassment policy, grievance register, closure log — Section 205 and 332",
  },
  {
    title: "Factory registration and licences",
    detail: "Trade licence, factory licence, fire NOC, BGMEA/BKMEA membership — legal standing evidence",
  },
];

export default function DashboardPreview() {
  return (
    <>
      {/* What the assessment covers */}
      <section className="bg-vantage-light-grey py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-vantage-black mb-4">
              Seven areas — every one auditors examine first.
            </h2>
            <p className="text-vantage-dark-grey">
              The VANTAGE gap assessment covers the sections of BLA 2006 that generate the most nonconformity findings in BSCI, SMETA, SA8000, and RSC audits.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {coverageAreas.map((area, i) => (
              <div key={area.title} className="bg-white rounded-lg p-5">
                <div className="text-xs font-mono text-vantage-medium-grey mb-3">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="font-semibold text-vantage-black mb-2 leading-snug">
                  {area.title}
                </h3>
                <p className="text-sm text-vantage-dark-grey leading-relaxed">{area.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Audit standards alignment */}
      <section className="bg-white py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h3 className="text-xs font-semibold text-vantage-medium-grey uppercase tracking-widest mb-4">
            Aligned with international audit frameworks
          </h3>
          <p className="text-vantage-dark-grey mb-4 max-w-2xl">
            VANTAGE audit-preparation support is aligned with the evidence requirements of:{" "}
            <span className="font-semibold text-vantage-black">
              BSCI · WRAP · SA8000 · Sedex / SMETA · Better Work · RSC
            </span>
          </p>
          <p className="text-xs text-vantage-medium-grey max-w-2xl">
            VANTAGE is not affiliated with, approved by, or a representative of any audit body. We provide compliance guidance and audit-preparation support only.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-vantage-black text-white py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-5 tracking-tight">
            Start with a free gap scan.
            <br />
            <span className="text-vantage-gold">No cost. No commitment.</span>
          </h2>
          <p className="text-vantage-black-10 mb-10 max-w-xl mx-auto text-lg">
            Identify your BLA 2026 compliance risk in 90 minutes. Then decide if the Sprint is right for your factory.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/gap-scan"
              className="bg-vantage-gold text-vantage-black font-semibold px-8 py-3.5 rounded hover:bg-yellow-400 transition-colors"
            >
              Start Free Gap Scan →
            </Link>
            <Link
              href="/book"
              className="border border-vantage-black-50 text-vantage-black-10 px-8 py-3.5 rounded hover:border-white hover:text-white transition-colors"
            >
              Book a call with VANTAGE →
            </Link>
          </div>
          <div className="mt-6">
            <a
              href={WHATSAPP_DEFAULT}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-vantage-teal hover:text-white transition-colors"
            >
              Or message us on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
