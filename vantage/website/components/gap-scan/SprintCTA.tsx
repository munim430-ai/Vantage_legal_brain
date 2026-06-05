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
          className={`${btnBase} bg-black text-white hover:opacity-80`}
        >
          Request a Full Gap Report →
        </Link>
        <Link
          href="/pricing"
          className={`${btnBase} border border-black text-black hover:bg-black hover:text-white`}
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
          className={`${btnBase} bg-black text-white hover:opacity-80`}
        >
          Start the BLA 2026 Compliance Sprint — BDT 55,000 →
        </Link>
        <a
          href={whatsappLink(waMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className={`${btnBase} border border-black text-black hover:bg-black hover:text-white`}
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
        className={`${btnBase} bg-black text-white hover:opacity-80`}
      >
        Book Your Sprint Now — BDT 55,000 →
      </Link>
      <a
        href={whatsappLink(waMessage)}
        target="_blank"
        rel="noopener noreferrer"
        className={`${btnBase} border border-black text-black hover:bg-black hover:text-white`}
      >
        Book Sprint on WhatsApp
      </a>
    </div>
  );
}
