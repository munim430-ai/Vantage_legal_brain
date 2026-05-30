import Link from "next/link";
import Image from "next/image";

interface HeaderProps {
  dark?: boolean;
}

export default function Header({ dark = true }: HeaderProps) {
  return (
    <header
      className={`w-full ${dark ? "bg-vantage-black" : "bg-white border-b border-vantage-black-10"}`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src={dark ? "/brand/logo-wordmark-white-on-black.jpeg" : "/brand/logo-wordmark-black-on-white.jpeg"}
            alt="VANTAGE"
            width={160}
            height={40}
            className="h-8 w-auto"
            priority
          />
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/gap-scan"
            className={`text-sm font-medium ${dark ? "text-vantage-black-10 hover:text-white" : "text-vantage-dark-grey hover:text-vantage-black"} transition-colors`}
          >
            Gap Scan
          </Link>
          <Link
            href="/pricing"
            className={`text-sm font-medium ${dark ? "text-vantage-black-10 hover:text-white" : "text-vantage-dark-grey hover:text-vantage-black"} transition-colors`}
          >
            Pricing
          </Link>
          <Link
            href="/book"
            className={`text-sm font-medium ${dark ? "text-vantage-black-10 hover:text-white" : "text-vantage-dark-grey hover:text-vantage-black"} transition-colors`}
          >
            Book a Call
          </Link>
        </nav>

        <Link
          href="/gap-scan"
          className="bg-white text-vantage-black text-sm font-semibold px-4 py-2 rounded hover:bg-vantage-light-grey transition-colors"
        >
          Start Free Gap Scan
        </Link>
      </div>
    </header>
  );
}
