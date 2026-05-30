import type { ScoringResult } from "@/lib/gap-scan/schema";
import LegalDisclaimer from "@/lib/gap-scan/..//../components/layout/LegalDisclaimer";
import SprintCTA from "./SprintCTA";

interface RiskResultCardProps {
  result: ScoringResult;
  factoryName: string;
}

const BAND_CONFIG = {
  "Low Risk": {
    bg: "bg-vantage-light-grey",
    scoreColor: "text-vantage-teal",
    badgeBg: "bg-vantage-teal",
    headline: "Your factory shows a low visible compliance risk.",
    body: "The gaps identified are procedural. With targeted document improvement, your factory can reach a strong audit-preparation position. VANTAGE recommends a gap report review to confirm all records are complete and audit-ready.",
  },
  "Medium Risk": {
    bg: "bg-vantage-light-grey",
    scoreColor: "text-vantage-gold",
    badgeBg: "bg-vantage-gold text-vantage-black",
    headline: "Your factory has compliance gaps that will be raised in an audit.",
    body: "The gaps identified are likely to produce nonconformity findings in a formal audit. A corrective action plan is needed before your next buyer review. VANTAGE can prepare a full gap report and corrective action plan through the BLA 2026 Compliance Sprint — delivered in 3 to 5 working days.",
  },
  "High Risk": {
    bg: "bg-vantage-black-10",
    scoreColor: "text-vantage-black",
    badgeBg: "bg-vantage-black text-white",
    headline: "Your factory has significant compliance gaps across multiple areas.",
    body: "These gaps create a risk of nonconformity findings and buyer compliance action. Without a corrective action plan, your next audit will produce a CAP. VANTAGE recommends starting a BLA 2026 Compliance Sprint as soon as possible.",
  },
  "Critical Risk": {
    bg: "bg-vantage-black",
    scoreColor: "text-vantage-gold",
    badgeBg: "bg-vantage-gold text-vantage-black",
    headline: "Your factory has critical compliance gaps.",
    body: "These gaps represent an immediate risk to your buyer relationships and audit standing. VANTAGE strongly recommends starting a BLA 2026 Compliance Sprint within the next 5 working days to reduce your exposure before any audit or buyer visit.",
  },
} as const;

export default function RiskResultCard({ result, factoryName }: RiskResultCardProps) {
  const cfg = BAND_CONFIG[result.riskBand];
  const isLight = result.riskBand !== "Critical Risk";

  return (
    <div className={`rounded-lg overflow-hidden ${cfg.bg}`}>
      {/* Score header */}
      <div className={`p-8 text-center ${result.riskBand === "Critical Risk" ? "text-white" : ""}`}>
        {factoryName && (
          <p className={`text-sm mb-2 ${isLight ? "text-vantage-dark-grey" : "text-vantage-black-10"}`}>
            Gap Scan Result — {factoryName}
          </p>
        )}
        <p className={`text-xs uppercase tracking-widest mb-2 ${isLight ? "text-vantage-medium-grey" : "text-vantage-black-30"}`}>
          Your BLA 2026 Compliance Score
        </p>
        <div className={`text-7xl font-bold ${cfg.scoreColor}`}>{result.complianceScore}</div>
        <div className={`text-2xl ${isLight ? "text-vantage-dark-grey" : "text-vantage-black-10"}`}>/&nbsp;100</div>
        <div className={`mt-3 inline-block text-xs font-bold px-4 py-1.5 rounded-full ${cfg.badgeBg}`}>
          {result.riskBand.toUpperCase()}
        </div>
      </div>

      {/* Gap summary */}
      <div className={`px-8 py-4 border-t ${isLight ? "border-vantage-black-10" : "border-vantage-black-70"}`}>
        <div className={`flex gap-6 text-sm ${isLight ? "text-vantage-dark-grey" : "text-vantage-black-10"}`}>
          <span>⬤ <strong>{result.criticalCount}</strong> Critical</span>
          <span>⬤ <strong>{result.highCount}</strong> High</span>
          <span>⬤ <strong>{result.mediumCount}</strong> Medium</span>
        </div>
      </div>

      {/* Top gaps */}
      {result.topGaps.length > 0 && (
        <div className={`px-8 py-4 border-t ${isLight ? "border-vantage-black-10" : "border-vantage-black-70"}`}>
          <h3 className={`text-xs font-semibold uppercase tracking-wide mb-3 ${isLight ? "text-vantage-medium-grey" : "text-vantage-black-30"}`}>
            Top gaps identified
          </h3>
          <ol className="space-y-2">
            {result.topGaps.map((gap, i) => (
              <li key={gap.questionId} className={`flex items-center gap-3 text-sm ${isLight ? "text-vantage-black" : "text-white"}`}>
                <span className={`text-xs w-4 shrink-0 ${isLight ? "text-vantage-medium-grey" : "text-vantage-black-30"}`}>{i + 1}.</span>
                <span>Q{gap.questionId} — {gap.theme}</span>
                <span className={`ml-auto text-xs font-semibold shrink-0 ${gap.riskLevel === "Critical" ? (isLight ? "text-vantage-black" : "text-vantage-gold") : "text-vantage-teal"}`}>
                  {gap.riskLevel}
                </span>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Missing documents */}
      {result.missingDocuments.length > 0 && (
        <div className={`px-8 py-4 border-t ${isLight ? "border-vantage-black-10" : "border-vantage-black-70"}`}>
          <h3 className={`text-xs font-semibold uppercase tracking-wide mb-3 ${isLight ? "text-vantage-medium-grey" : "text-vantage-black-30"}`}>
            Missing documents (Q25)
          </h3>
          <ol className="space-y-1">
            {result.missingDocuments.map((doc, i) => (
              <li key={i} className={`text-sm ${isLight ? "text-vantage-dark-grey" : "text-vantage-black-10"}`}>
                {i + 1}. {doc}
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Headline + body */}
      <div className={`px-8 py-5 border-t ${isLight ? "border-vantage-black-10" : "border-vantage-black-70"}`}>
        <h2 className={`text-lg font-bold mb-2 ${isLight ? "text-vantage-black" : "text-white"}`}>
          {cfg.headline}
        </h2>
        <p className={`text-sm leading-relaxed ${isLight ? "text-vantage-dark-grey" : "text-vantage-black-10"}`}>
          {cfg.body}
        </p>
      </div>

      {/* CTA */}
      <div className={`px-8 py-6 border-t ${isLight ? "border-vantage-black-10" : "border-vantage-black-70"}`}>
        <SprintCTA riskBand={result.riskBand} complianceScore={result.complianceScore} />
      </div>

      {/* Disclaimer */}
      <div className={`px-8 pb-8 ${result.riskBand === "Critical Risk" ? "border-t border-vantage-black-70" : ""}`}>
        {result.riskBand === "Critical Risk" ? (
          <p className="text-xs text-vantage-black-30 leading-relaxed">
            VANTAGE compliance score is based on your answers during this gap scan session. It is compliance guidance only — not an audit result, certification, or verified compliance determination. Third-party audit outcomes are determined solely by the relevant audit body.{" "}
            <a href="/legal/disclaimer" className="underline hover:text-white">See full disclaimer</a>.
          </p>
        ) : (
          <LegalDisclaimer variant="full" />
        )}
      </div>
    </div>
  );
}
