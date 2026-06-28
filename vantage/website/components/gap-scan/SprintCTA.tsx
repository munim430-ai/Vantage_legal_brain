import { whatsappLink } from "@/lib/brand/tokens";
import type { ScoringResult } from "@/lib/gap-scan/schema";

interface SprintCTAProps {
  riskBand: ScoringResult["riskBand"];
  complianceScore: number;
}

const btnBase = "inline-flex items-center justify-center font-semibold px-6 py-3 rounded-full text-sm transition-all text-center";

export default function SprintCTA({ riskBand, complianceScore }: SprintCTAProps) {
  const message = `SCAN\nRisk band: ${riskBand}\nScore: ${complianceScore}/100\nI want to discuss the next step with VANTAGE.`;

  return (
    <a
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`${btnBase} bg-black text-white hover:opacity-80`}
    >
      WhatsApp SCAN
    </a>
  );
}
