import Link from "next/link";
import Image from "next/image";

export type HeaderVariant = "overlay" | "dark" | "light";

interface HeaderProps {
  variant?: HeaderVariant;
}

const containerClass: Record<HeaderVariant, string> = {
  overlay: "absolute top-0 left-0 right-0 z-20 bg-transparent",
  dark: "bg-vantage-black",
  light: "bg-white border-b border-vantage-black-10",
};

const navLinkClass: Record<HeaderVariant, string> = {
  overlay: "text-vantage-black-10 hover:text-white",
  dark: "text-vantage-black-10 hover:text-white",
  light: "text-vantage-dark-grey hover:text-vantage-black",
};

const ctaClass: Record<HeaderVariant, string> = {
  overlay: "border-white/30 text-white hover:bg-white/10",
  dark: "border-white/30 text-white hover:bg-white/10",
  light: "border-vantage-black text-vantage-black hover:bg-vantage-light-grey",
};

const logoSrc: Record<HeaderVariant, string> = {
  overlay: "/brand/logo-wordmark-white-on-black.jpeg",
  dark: "/brand/logo-wordmark-white-on-black.jpeg",
  light: "/brand/logo-wordmark-black-on-white.jpeg",
};

const NAV = [
  { label: "Gap Scan", href: "/gap-scan" },
  { label: "Sprint", href: "/pricing" },
  { label: "Contact", href: "/book" },
];

export default function Header({ variant = "dark" }: HeaderProps) {
  return (
    <header className={`w-full h-[72px] flex items-center ${containerClass[variant]}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <Image
            src={logoSrc[variant]}
            alt="VANTAGE"
            width={140}
            height={36}
            className="h-7 w-auto"
            priority
          />
        </Link>

        {/* Center nav — desktop */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className={`text-sm font-medium transition-colors ${navLinkClass[variant]}`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Right */}
        <div className="flex items-center gap-3">
          {/* Mobile shortcut */}
          <Link
            href="/gap-scan"
            className={`md:hidden text-sm font-medium transition-colors ${navLinkClass[variant]}`}
          >
            Scan ↗
          </Link>
          {/* Desktop CTA pill */}
          <Link
            href="/gap-scan"
            className={`hidden md:inline-flex items-center text-sm font-semibold px-4 py-2 rounded-full border transition-colors ${ctaClass[variant]}`}
          >
            Start scan ↗
          </Link>
        </div>
      </div>
    </header>
  );
}
