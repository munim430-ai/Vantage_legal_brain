import Link from "next/link";
import Image from "next/image";

const NAV = [
  { label: "Gap Scan", href: "/gap-scan" },
  { label: "Sprint", href: "/pricing" },
  { label: "Contact", href: "/book" },
  { label: "Disclaimer", href: "/legal/disclaimer" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-vantage-black text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <Image
              src="/brand/logo-wordmark-white-on-black.jpeg"
              alt="VANTAGE"
              width={130}
              height={34}
              className="h-7 w-auto"
            />
            <p className="text-sm text-vantage-black-30 max-w-xs">
              Keystone Consultancy trading as VANTAGE
            </p>
          </div>

          {/* Nav */}
          <nav className="flex flex-wrap gap-x-8 gap-y-2 text-sm">
            {NAV.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="text-vantage-black-30 hover:text-white transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-10 pt-6 border-t border-vantage-black-70">
          <p className="text-xs text-vantage-black-50 max-w-2xl leading-relaxed">
            VANTAGE provides compliance guidance and audit-preparation support for Bangladesh RMG factories.
            Not a law firm. Not legal advice. No audit outcome guaranteed.{" "}
            <Link
              href="/legal/disclaimer"
              className="underline hover:text-vantage-black-10 transition-colors"
            >
              Full service boundary statement
            </Link>
          </p>
          <p className="text-xs text-vantage-black-70 mt-3">
            &copy; {year} Keystone Consultancy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
