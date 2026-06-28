interface LegalDisclaimerProps {
  variant?: "short" | "full";
  className?: string;
}

const SHORT_DISCLAIMER =
  "VANTAGE provides compliance-readiness, document-control and remediation support. This is not a legal opinion, certification, official audit or guarantee of outcome.";

const FULL_DISCLAIMER =
  "This document risk scan is a preliminary compliance-readiness review. It is not a legal opinion, certification, official audit or verification. VANTAGE provides remediation support, document-control assistance and preparation guidance only. Third-party decisions remain with the relevant buyer, programme or assessment body.";

export default function LegalDisclaimer({ variant = "short", className = "" }: LegalDisclaimerProps) {
  return (
    <div
      className={`border-l-2 border-black px-4 py-3 ${className}`}
      role="note"
      aria-label="Service boundary statement"
    >
      <p className="text-sm text-black leading-relaxed">
        {variant === "full" ? FULL_DISCLAIMER : SHORT_DISCLAIMER}
      </p>
      {variant === "full" && (
        <p className="text-xs text-black mt-2">
          Framework names are used for preparation and requirement mapping only. VANTAGE is not affiliated with or authorised by BSCI, SMETA, RSC, WRAP, SLCP or any buyer programme.
        </p>
      )}
    </div>
  );
}
