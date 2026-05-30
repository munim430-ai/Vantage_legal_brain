import Link from "next/link";
import { whatsappLink } from "@/lib/brand/tokens";
import type { ScoringResult } from "@/lib/gap-scan/schema";

interface SprintCTAProps {
  riskBand: ScoringResult["riskBand"];
  complianceScore: number;
}

export default function SprintCTA({ riskBand, complianceScore }: SprintCTAProps) {
  const waMessage = `I just completed the VANTAGE gap scan. My score is ${complianceScore}/100. I want to book the Sprint.`;

  if (riskBand === "Low Risk") {
    return (
      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/book?offer=gap-report"
          className="bg-vantage-teal text-white font-semibold px-6 py-3 rounded text-center hover:bg-teal-700 transition-colors"
        >
          Request a Full Gap Report →
        </Link>
        <Link
          href="/pricing"
          className="border border-vantage-black-10 text-vantage-dark-grey px-6 py-3 rounded text-center hover:border-vantage-teal hover:text-vantage-teal transition-colors"
        >
          See all services
        </Link>
      </div>
    );
  }

  if (riskBand === "Medium Risk") {
    return (
      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/book?offer=sprint"
          className="bg-vantage-black text-white font-semibold px-6 py-3 rounded text-center hover:bg-vantage-black-90 transition-colors"
        >
          Start the BLA 2026 Compliance Sprint — BDT 55,000 →
        </Link>
        <a
          href={whatsappLink(waMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="border border-vantage-black-10 text-vantage-dark-grey px-6 py-3 rounded text-center hover:border-vantage-teal hover:text-vantage-teal transition-colors"
        >
          Book Sprint on WhatsApp
        </a>
      </div>
    );
  }

  if (riskBand === "High Risk") {
    return (
      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/book?offer=sprint"
          className="bg-vantage-black text-white font-semibold px-6 py-3 rounded text-center hover:bg-vantage-black-90 transition-colors"
        >
          Start the BLA 2026 Compliance Sprint — BDT 55,000 →
        </Link>
        <a
          href={whatsappLink(waMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="border border-vantage-black-10 text-vantage-dark-grey px-6 py-3 rounded text-center hover:border-vantage-teal hover:text-vantage-teal transition-colors"
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
        className="bg-vantage-gold text-vantage-black font-semibold px-6 py-3 rounded text-center hover:bg-yellow-400 transition-colors"
      >
        Book Your Sprint Now — BDT 55,000 →
      </Link>
      <a
        href={whatsappLink(waMessage)}
        target="_blank"
        rel="noopener noreferrer"
        className="border border-vantage-black-50 text-vantage-black-10 px-6 py-3 rounded text-center hover:border-white hover:text-white transition-colors"
      >
        Book Sprint on WhatsApp
      </a>
    </div>
  );
}
