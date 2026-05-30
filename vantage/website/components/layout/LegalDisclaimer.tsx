interface LegalDisclaimerProps {
  variant?: "short" | "full";
  className?: string;
}

const SHORT_DISCLAIMER =
  "VANTAGE provides compliance guidance and audit-preparation support. This is not a legal opinion, certification, official audit, or guarantee of audit outcome.";

const FULL_DISCLAIMER =
  "This Free Gap Scan is a preliminary compliance guidance and audit-preparation review. It is not a legal opinion, certification, official audit, or verification. Keystone Consultancy trading as VANTAGE provides remediation support and documentation readiness guidance only. Third-party audit outcomes are determined solely by the relevant audit body.";

export default function LegalDisclaimer({ variant = "short", className = "" }: LegalDisclaimerProps) {
  return (
    <div
      className={`border-l-4 border-vantage-teal bg-vantage-light-grey px-4 py-3 rounded-r ${className}`}
      role="note"
      aria-label="Legal disclaimer"
    >
      <p className="text-sm text-vantage-dark-grey leading-relaxed">
        {variant === "full" ? FULL_DISCLAIMER : SHORT_DISCLAIMER}
      </p>
      {variant === "full" && (
        <p className="text-xs text-vantage-medium-grey mt-2">
          VANTAGE is not affiliated with BSCI, WRAP, SA8000, Sedex, DIFE, or any buyer compliance programme.
        </p>
      )}
    </div>
  );
}
