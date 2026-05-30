import Link from "next/link";
import { WHATSAPP_DEFAULT } from "@/lib/brand/tokens";
import CommandPanelPreview from "./CommandPanelPreview";

export default function Hero() {
  return (
    <section className="bg-vantage-black text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: copy */}
          <div className="flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 bg-vantage-black-90 text-vantage-black-10 text-xs font-medium px-3 py-1.5 rounded w-fit">
              BLA 2026 Compliance Sprint — BDT 55,000
            </div>

            <h1 className="text-4xl md:text-5xl font-bold leading-tight text-balance">
              Bangladesh Labour Compliance —
              <br />
              <span className="text-vantage-gold">Fast, Affordable, Done Right.</span>
            </h1>

            <p className="text-lg text-vantage-black-10 leading-relaxed">
              Fix your BLA 2006 gaps before the auditor arrives. Gap report and corrective action plan delivered in 3 to 5 working days.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/gap-scan"
                className="bg-vantage-gold text-vantage-black font-semibold px-6 py-3 rounded text-center hover:bg-yellow-400 transition-colors"
              >
                Start Your Free Gap Scan →
              </Link>
              <a
                href={WHATSAPP_DEFAULT}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-vantage-black-50 text-vantage-black-10 font-medium px-6 py-3 rounded text-center hover:border-white hover:text-white transition-colors"
              >
                Talk to VANTAGE on WhatsApp
              </a>
            </div>

            <p className="text-xs text-vantage-black-50">
              This is compliance guidance and audit-preparation support, not a legal opinion or guarantee of audit outcome.
            </p>
          </div>

          {/* Right: command panel preview */}
          <div className="hidden md:block">
            <CommandPanelPreview />
          </div>
        </div>
      </div>
    </section>
  );
}
