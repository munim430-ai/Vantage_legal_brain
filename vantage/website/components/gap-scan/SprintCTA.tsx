import Link from "next/link";
import { whatsappLink } from "@/lib/brand/tokens";
import type { ScoringResult } from "@/lib/gap-scan/schema";

interface SprintCTAProps {
  riskBand: ScoringResult["riskBand"];
  complianceScore: number;
}

const btnBase = "inline-flex items-center justify-center font-semibold px-6 py-3 rounded-full text-sm transition-all text-center";

export default function SprintCTA({ riskBand, complianceScore }: SprintCTAProps) {
  const waMessage = `I just completed the VANTAGE gap scan. My score is ${complianceScore}/100. I want to book the Sprint.`;

  if (riskBand === "Low Risk") {
    return (
      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/book?offer=gap-report"
          className={`${btnBase} bg-vantage-teal text-white hover:opacity-90`}
        >
          Request a Full Gap Report →
        </Link>
        <Link
          href="/pricing"
          className={`${btnBase} border border-vantage-black-10 text-vantage-dark-grey hover:border-vantage-black hover:text-vantage-black`}
        >
          See all services
        </Link>
      </div>
    );
  }

  if (riskBand === "Medium Risk" || riskBand === "High Risk") {
    return (
      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/book?offer=sprint"
          className={`${btnBase} bg-vantage-black text-white hover:bg-vantage-black-90`}
        >
          Start the BLA 2026 Compliance Sprint — BDT 55,000 →
        </Link>
        <a
          href={whatsappLink(waMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className={`${btnBase} border border-vantage-black-10 text-vantage-dark-grey hover:border-vantage-black hover:text-vantage-black`}
        >
          Book Sprint on WhatsApp
        </a>
      </div>
    );
  }

  // Critical Risk
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <Link
        href="/book?offer=sprint&urgency=critical"
        className={`${btnBase} bg-vantage-gold text-vantage-black hover:brightness-110`}
      >
        Book Your Sprint Now — BDT 55,000 →
      </Link>
      <a
        href={whatsappLink(waMessage)}
        target="_blank"
        rel="noopener noreferrer"
        className={`${btnBase} border border-white/30 text-white hover:bg-white/10`}
      >
        Book Sprint on WhatsApp
      </a>
    </div>
  );
}
