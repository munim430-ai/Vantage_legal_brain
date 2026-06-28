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
    headline: "Your records show a relatively controlled readiness position.",
    body: "The visible issues appear limited, but document dates, consistency, ownership and retrieval should still be confirmed before the next external review.",
  },
  "Medium Risk": {
    headline: "Your factory has document-control gaps that need attention.",
    body: "Prioritise missing evidence, inconsistent records and upcoming deadlines. VANTAGE can convert the findings into a controlled action plan.",
  },
  "High Risk": {
    headline: "Your factory has significant gaps across several evidence areas.",
    body: "Assign owners and deadlines now, then confirm closure evidence. Concentrated remediation or ongoing monitoring may be appropriate.",
  },
  "Critical Risk": {
    headline: "Your factory has urgent document and remediation gaps.",
    body: "Management should review the highest-risk evidence, CAP actions and deadlines immediately. The score is an internal readiness indicator, not an audit result.",
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
    .map((gap, index) => `${index + 1}. ${gap.theme} (${gap.riskLevel})`)
    .join("\n");

  return (
    `SCAN — ${factoryName}\n\n` +
    `Contact: ${contactName} | WA: ${contactWhatsApp}\n` +
    `Readiness score: ${result.complianceScore}/100 — ${result.riskBand}\n\n` +
    `Top gaps:\n${topGapLines}\n\n` +
    `Please contact me to discuss the next step.`
  );
}

export default function RiskResultCard({
  result,
  factoryName,
  contactName,
  contactWhatsApp,
}: RiskResultCardProps) {
  const config = BAND_CONFIG[result.riskBand];

  return (
    <div className="rounded-2xl overflow-hidden border border-black bg-white">
      <div className="p-8 text-center border-b border-black">
        {factoryName && <p className="text-sm mb-2 text-black">Document Risk Scan — {factoryName}</p>}
        <p className="text-xs uppercase tracking-widest mb-2 text-black">Document Readiness Score</p>
        <div className="text-7xl font-black text-black">{result.complianceScore}</div>
        <div className="text-2xl text-black">/&nbsp;100</div>
        <div className="mt-3 inline-block text-xs font-bold uppercase tracking-widest px-4 py-1.5 border border-black rounded-full">
          {result.riskBand}
        </div>
      </div>

      <div className="px-8 py-4 border-b border-black">
        <div className="flex flex-wrap gap-6 text-sm text-black">
          <span><strong>{result.criticalCount}</strong> Critical</span>
          <span><strong>{result.highCount}</strong> High</span>
          <span><strong>{result.mediumCount}</strong> Medium</span>
        </div>
      </div>

      {result.topGaps.length > 0 && (
        <div className="px-8 py-4 border-b border-black">
          <h3 className="text-xs font-semibold uppercase tracking-wide mb-3 text-black">Top gaps identified</h3>
          <ol className="space-y-2">
            {result.topGaps.map((gap, index) => (
              <li key={gap.questionId} className="flex items-center gap-3 text-sm text-black">
                <span className="text-xs w-4 shrink-0">{index + 1}.</span>
                <span>Q{gap.questionId} — {gap.theme}</span>
                <span className="ml-auto text-xs font-bold uppercase tracking-wide shrink-0">{gap.riskLevel}</span>
              </li>
            ))}
          </ol>
        </div>
      )}

      {result.missingDocuments.length > 0 && (
        <div className="px-8 py-4 border-b border-black">
          <h3 className="text-xs font-semibold uppercase tracking-wide mb-3 text-black">Missing documents reported</h3>
          <ol className="space-y-1">
            {result.missingDocuments.map((documentName, index) => (
              <li key={documentName} className="text-sm text-black">{index + 1}. {documentName}</li>
            ))}
          </ol>
        </div>
      )}

      <div className="px-8 py-5 border-b border-black">
        <h2 className="text-lg font-bold mb-2 text-black">{config.headline}</h2>
        <p className="text-sm leading-relaxed text-black">{config.body}</p>
      </div>

      <div className="px-8 py-5 border-b border-black">
        <a
          href={whatsappLink(buildResultMessage(factoryName, contactName, contactWhatsApp, result))}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center font-semibold text-sm px-6 py-3 rounded-full border border-black text-black hover:bg-black hover:text-white transition-all"
        >
          WhatsApp SCAN
        </a>
        <p className="text-xs mt-2 text-black">A pre-filled message will open for your review. Nothing is sent automatically.</p>
      </div>

      <div className="px-8 py-6 border-b border-black">
        <SprintCTA riskBand={result.riskBand} complianceScore={result.complianceScore} />
      </div>

      <div className="px-8 pb-8 pt-5">
        <LegalDisclaimer variant="full" />
      </div>
    </div>
  );
}
