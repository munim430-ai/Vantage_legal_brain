import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-white border-t border-vantage-black-10 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          <div className="flex flex-col gap-3">
            <Image
              src="/brand/logo-wordmark-black-on-white.jpeg"
              alt="VANTAGE"
              width={140}
              height={36}
              className="h-8 w-auto"
            />
            <p className="text-sm text-vantage-dark-grey max-w-xs">
              Keystone Consultancy trading as VANTAGE
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-2 text-sm">
            <Link href="/gap-scan" className="text-vantage-dark-grey hover:text-vantage-black transition-colors">
              Gap Scan
            </Link>
            <Link href="/pricing" className="text-vantage-dark-grey hover:text-vantage-black transition-colors">
              Pricing
            </Link>
            <Link href="/book" className="text-vantage-dark-grey hover:text-vantage-black transition-colors">
              Book a Call
            </Link>
            <Link href="/legal/disclaimer" className="text-vantage-dark-grey hover:text-vantage-black transition-colors">
              Disclaimer
            </Link>
          </nav>
        </div>

        <div className="mt-8 pt-6 border-t border-vantage-black-10">
          <p className="text-xs text-vantage-dark-grey max-w-2xl">
            VANTAGE provides compliance guidance and audit-preparation support for Bangladesh RMG factories.
            We are not a law firm. We do not provide legal advice. No audit outcome is guaranteed.{" "}
            <Link href="/legal/disclaimer" className="underline hover:text-vantage-black">
              Legal disclaimer &amp; service boundaries
            </Link>
          </p>
          <p className="text-xs text-vantage-medium-grey mt-3">
            &copy; {year} Keystone Consultancy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
