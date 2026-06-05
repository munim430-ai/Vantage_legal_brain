import Link from "next/link";

const NAV = [
  { label: "Gap Scan", href: "/gap-scan" },
  { label: "Sprint", href: "/pricing" },
  { label: "Contact", href: "/book" },
  { label: "Disclaimer", href: "/legal/disclaimer" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-black text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <span className="font-black tracking-[-0.08em] text-2xl text-white">VANTAGE</span>
            <p className="text-sm text-white max-w-xs">
              Keystone Consultancy trading as VANTAGE
            </p>
          </div>

          {/* Nav */}
          <nav className="flex flex-wrap gap-x-8 gap-y-2 text-sm">
            {NAV.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="text-white hover:opacity-60 transition-opacity"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-10 pt-6 border-t border-white">
          <p className="text-xs text-white max-w-2xl leading-relaxed">
            VANTAGE provides compliance guidance and audit-preparation support for Bangladesh RMG factories.
            Not a law firm. Not legal advice. No audit outcome guaranteed.{" "}
            <Link
              href="/legal/disclaimer"
              className="underline hover:opacity-60 transition-opacity"
            >
              Full service boundary statement
            </Link>
          </p>
          <p className="text-xs text-white mt-3">
            &copy; {year} Keystone Consultancy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
