import type { ScoringResult } from "@/lib/gap-scan/schema";
import LegalDisclaimer from "@/components/layout/LegalDisclaimer";
import SprintCTA from "./SprintCTA";
import { whatsappLink } from "@/lib/brand/tokens";

interface RiskResultCardProps {
  result: ScoringResult;
  factoryName: string;
  contactName: string;
  contactWhatsApp: string;
}

const BAND_CONFIG = {
  "Low Risk": {
    headline: "Your factory shows a low visible compliance risk.",
    body: "The gaps identified are procedural. With targeted document improvement, your factory can reach a strong audit-preparation position. VANTAGE recommends a gap report review to confirm all records are complete and audit-preparation ready.",
  },
  "Medium Risk": {
    headline: "Your factory has compliance gaps that may be raised during audit preparation.",
    body: "The gaps identified may lead to CAP findings in a formal audit review. A corrective action plan is needed before your next buyer review. VANTAGE can prepare a full gap report and corrective action plan through the BLA 2026 Compliance Sprint — delivered in 3 to 5 working days.",
  },
  "High Risk": {
    headline: "Your factory has significant compliance gaps across multiple areas.",
    body: "These gaps create a risk of nonconformity findings and buyer compliance action. Without a corrective action plan, your next audit may produce CAP findings. VANTAGE recommends starting a BLA 2026 Compliance Sprint as soon as possible.",
  },
  "Critical Risk": {
    headline: "Your factory has critical compliance gaps.",
    body: "These gaps represent an immediate risk to your buyer relationships and audit-preparation posture. VANTAGE strongly recommends starting a BLA 2026 Compliance Sprint within the next 5 working days to reduce your exposure before any audit or buyer visit.",
  },
} as const;

function buildResultMessage(
  factoryName: string,
  contactName: string,
  contactWhatsApp: string,
  result: ScoringResult
): string {
  const topGapLines = result.topGaps
    .slice(0, 5)
    .map((g, i) => `${i + 1}. ${g.theme} (${g.riskLevel})`)
    .join("\n");
  return (
    `Gap Scan Result — ${factoryName}\n\n` +
    `Contact: ${contactName} | WA: ${contactWhatsApp}\n` +
    `Score: ${result.complianceScore}/100 — ${result.riskBand}\n\n` +
    `Top compliance gaps identified:\n${topGapLines}\n\n` +
    `Recommended service: BLA 2026 Compliance Sprint\n\n` +
    `Please contact me to discuss the next steps.`
  );
}

export default function RiskResultCard({
  result,
  factoryName,
  contactName,
  contactWhatsApp,
}: RiskResultCardProps) {
  const cfg = BAND_CONFIG[result.riskBand];
  const showResultCTA = result.riskBand !== "Low Risk";

  return (
    <div className="rounded-2xl overflow-hidden border border-black bg-white">
      {/* Score header */}
      <div className="p-8 text-center border-b border-black">
        {factoryName && (
          <p className="text-sm mb-2 text-black">
            Gap Scan Result — {factoryName}
          </p>
        )}
        <p className="text-xs uppercase tracking-widest mb-2 text-black">
          Your BLA 2026 Compliance Score
        </p>
        <div className="text-7xl font-black text-black">{result.complianceScore}</div>
        <div className="text-2xl text-black">/&nbsp;100</div>
        <div className="mt-3 inline-block text-xs font-bold uppercase tracking-widest px-4 py-1.5 border border-black rounded-full">
          {result.riskBand}
        </div>
      </div>

      {/* Gap summary */}
      <div className="px-8 py-4 border-b border-black">
        <div className="flex gap-6 text-sm text-black">
          <span>⬤ <strong>{result.criticalCount}</strong> Critical</span>
          <span>⬤ <strong>{result.highCount}</strong> High</span>
          <span>⬤ <strong>{result.mediumCount}</strong> Medium</span>
        </div>
      </div>

      {/* Top gaps */}
      {result.topGaps.length > 0 && (
        <div className="px-8 py-4 border-b border-black">
          <h3 className="text-xs font-semibold uppercase tracking-wide mb-3 text-black">
            Top gaps identified
          </h3>
          <ol className="space-y-2">
            {result.topGaps.map((gap, i) => (
              <li
                key={gap.questionId}
                className="flex items-center gap-3 text-sm text-black"
              >
                <span className="text-xs w-4 shrink-0 text-black">
                  {i + 1}.
                </span>
                <span>Q{gap.questionId} — {gap.theme}</span>
                <span className="ml-auto text-xs font-bold uppercase tracking-wide shrink-0">
                  {gap.riskLevel}
                </span>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Missing documents */}
      {result.missingDocuments.length > 0 && (
        <div className="px-8 py-4 border-b border-black">
          <h3 className="text-xs font-semibold uppercase tracking-wide mb-3 text-black">
            Missing documents (Q25)
          </h3>
          <ol className="space-y-1">
            {result.missingDocuments.map((doc, i) => (
              <li key={i} className="text-sm text-black">
                {i + 1}. {doc}
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Headline + body */}
      <div className="px-8 py-5 border-b border-black">
        <h2 className="text-lg font-bold mb-2 text-black">
          {cfg.headline}
        </h2>
        <p className="text-sm leading-relaxed text-black">
          {cfg.body}
        </p>
      </div>

      {/* WhatsApp result CTA */}
      {showResultCTA && (
        <div className="px-8 py-5 border-b border-black">
          <p className="text-xs mb-3 text-black">
            Send your scan result to VANTAGE so we can prepare your follow-up.
          </p>
          <a
            href={whatsappLink(buildResultMessage(factoryName, contactName, contactWhatsApp, result))}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-semibold text-sm px-6 py-3 rounded-full border border-black text-black hover:bg-black hover:text-white transition-all"
          >
            Send this result to VANTAGE on WhatsApp →
          </a>
          <p className="text-xs mt-2 text-black">
            This opens a pre-filled WhatsApp message with your score, gaps, and recommended service.
            No data is sent automatically — you review and send.
          </p>
        </div>
      )}

      {/* Sprint CTA */}
      <div className="px-8 py-6 border-b border-black">
        <SprintCTA riskBand={result.riskBand} complianceScore={result.complianceScore} />
      </div>

      {/* Disclaimer */}
      <div className="px-8 pb-8 pt-5">
        <LegalDisclaimer variant="full" />
      </div>
    </div>
  );
}
