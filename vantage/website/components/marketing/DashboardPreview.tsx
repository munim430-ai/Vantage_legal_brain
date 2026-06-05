import Link from "next/link";
import { WHATSAPP_DEFAULT } from "@/lib/brand/tokens";

const modules = [
  {
    id: "01",
    title: "Employment documentation",
    detail: "Appointment letters, service terms, personnel files — s.5 and s.6 compliance",
  },
  {
    id: "02",
    title: "Wage and hour records",
    detail: "Payroll breakdown, overtime calculation, deduction register — s.123 evidence",
  },
  {
    id: "03",
    title: "Working hours and rest periods",
    detail: "Daily and weekly hour registers, compensatory rest documentation — s.100–108",
  },
  {
    id: "04",
    title: "Leave entitlements",
    detail: "Annual leave, sick leave, maternity leave registers — s.115–121",
  },
  {
    id: "05",
    title: "Health and safety documentation",
    detail: "OSHI notices, fire safety certificates, accident register — s.61–77",
  },
  {
    id: "06",
    title: "Worker rights policies",
    detail: "Anti-harassment policy, grievance register, closure log — s.205 and s.332",
  },
  {
    id: "07",
    title: "Factory registration and licences",
    detail: "Trade licence, factory licence, fire NOC, BGMEA/BKMEA membership — legal standing",
  },
];

export default function DashboardPreview() {
  return (
    <>
      {/* Control Tower modules */}
      <section className="bg-vantage-black py-16 md:py-24 overflow-x-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-10">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-vantage-black-50 mb-4">
              Control Tower Preview
            </p>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
              Seven assessment modules — every one auditors examine first.
            </h2>
            <p className="text-vantage-black-10 mt-4 text-base leading-relaxed">
              VANTAGE gap assessment covers the sections of BLA 2006 that generate the most
              nonconformity findings in BSCI, SMETA, SA8000, and RSC assessments.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {modules.map((m) => (
              <div
                key={m.title}
                className="border border-vantage-black-70 rounded-xl p-5 hover:border-vantage-gold/30 transition-colors"
              >
                <div className="text-[10px] font-mono text-vantage-black-50 mb-3">{m.id}</div>
                <h3 className="font-bold text-white mb-2 text-sm leading-snug">{m.title}</h3>
                <p className="text-xs text-vantage-black-30 leading-relaxed">{m.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Audit standards */}
      <section className="bg-vantage-light-grey py-10 overflow-x-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h3 className="text-xs font-semibold text-vantage-dark-grey uppercase tracking-widest mb-4">
            Aligned with international audit frameworks
          </h3>
          <p className="text-vantage-dark-grey mb-3 max-w-2xl text-sm leading-relaxed">
            VANTAGE audit-preparation support is aligned with the evidence requirements of:{" "}
            <span className="font-semibold text-vantage-black">
              BSCI · WRAP · SA8000 · Sedex / SMETA · Better Work · RSC
            </span>
          </p>
          <p className="text-xs text-vantage-medium-grey max-w-2xl">
            VANTAGE is not affiliated with, approved by, or a representative of any audit body.
            We provide compliance guidance and audit-preparation support only.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-vantage-black text-white py-16 md:py-24 overflow-x-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-vantage-black-50 mb-4">
            Start Here
          </p>
          <h2 className="text-3xl md:text-4xl font-black mb-2 tracking-tight">
            Start with a free gap scan.
          </h2>
          <p className="text-vantage-gold font-bold text-lg mb-8">No cost. No commitment.</p>
          <p className="text-vantage-black-10 mb-10 max-w-xl mx-auto text-base leading-relaxed">
            Identify your BLA 2026 compliance risk position in 90 minutes. Then decide if the
            Sprint is right for your factory.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/gap-scan"
              className="bg-vantage-gold text-vantage-black font-bold px-8 py-4 rounded-full hover:brightness-110 transition-all text-sm"
            >
              Start Free Gap Scan →
            </Link>
            <Link
              href="/book"
              className="border border-white/30 text-white px-8 py-4 rounded-full hover:bg-white/10 transition-all text-sm font-medium"
            >
              Talk to VANTAGE →
            </Link>
          </div>
          <div className="mt-5">
            <a
              href={WHATSAPP_DEFAULT}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-vantage-black-30 hover:text-white transition-colors"
            >
              Or message us on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
