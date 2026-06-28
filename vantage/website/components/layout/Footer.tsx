import Link from "next/link";
import { WHATSAPP_SCAN } from "@/lib/brand/tokens";

const NAV = [
  { label: "Free Scan", href: "/gap-scan" },
  { label: "Services", href: "/pricing" },
  { label: "Limited Offer", href: "/pricing#launch-offer" },
  { label: "Contact", href: "/book" },
  { label: "Disclaimer", href: "/legal/disclaimer" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-black text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          <div className="flex flex-col gap-3">
            <p className="text-sm text-white max-w-xs">RMG compliance readiness, document control and factory intelligence.</p>
            <a href={WHATSAPP_SCAN} target="_blank" rel="noopener noreferrer" className="text-sm font-bold underline underline-offset-4">WhatsApp SCAN</a>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-2 text-sm">
            {NAV.map(({ label, href }) => (
              <Link key={label} href={href} className="text-white hover:opacity-60 transition-opacity">
                {label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-10 pt-6 border-t border-white">
          <p className="text-xs text-white max-w-2xl leading-relaxed">
            VANTAGE provides compliance-readiness, document-control and remediation support for Bangladesh RMG factories. It does not issue audits, certifications or buyer approvals, and no outcome is guaranteed.{" "}
            <Link href="/legal/disclaimer" className="underline hover:opacity-60 transition-opacity">Full service boundary statement</Link>
          </p>
          <p className="text-xs text-white mt-3">&copy; {year} VANTAGE. All rights reserved.</p>
          <span className="font-black tracking-[-0.08em] text-white mt-8 block" style={{ fontSize: "clamp(3rem, 8vw, 7rem)", lineHeight: "0.9" }}>VANTAGE</span>
        </div>
      </div>
    </footer>
  );
}
