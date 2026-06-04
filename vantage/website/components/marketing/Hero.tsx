import Link from "next/link";
import { WHATSAPP_DEFAULT } from "@/lib/brand/tokens";
import CommandPanelPreview from "./CommandPanelPreview";

export default function Hero() {
  return (
    <section className="bg-vantage-black text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-28">
        <div className="grid md:grid-cols-2 gap-14 items-center">
          {/* Left: copy */}
          <div className="flex flex-col gap-7">
            <div className="inline-flex items-center gap-2 bg-vantage-black-90 text-vantage-gold text-xs font-semibold px-3 py-1.5 rounded-full w-fit tracking-wide">
              BLA 2026 · New requirements in force
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] tracking-tight text-balance">
              Know your BLA&nbsp;2026 compliance position before your buyer does.
            </h1>

            <p className="text-lg text-vantage-black-10 leading-relaxed max-w-lg">
              Bangladesh Labour Act amendments take full effect in 2026. VANTAGE assesses 25 compliance checkpoints and delivers your gap report and corrective action plan in 3 to 5 working days.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/gap-scan"
                className="bg-vantage-gold text-vantage-black font-semibold px-6 py-3.5 rounded text-center hover:bg-yellow-400 transition-colors"
              >
                Start Your Free Gap Scan →
              </Link>
              <a
                href={WHATSAPP_DEFAULT}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-vantage-black-50 text-vantage-black-10 font-medium px-6 py-3.5 rounded text-center hover:border-white hover:text-white transition-colors"
              >
                Talk to VANTAGE on WhatsApp
              </a>
            </div>

            <p className="text-xs text-vantage-black-50 max-w-sm">
              Compliance guidance and audit-preparation support. Not a legal opinion or guarantee of audit outcome.
            </p>
          </div>

          {/* Right: sprint facts panel */}
          <div className="hidden md:block">
            <CommandPanelPreview />
          </div>
        </div>
      </div>
    </section>
  );
}
