import Link from "next/link";

export type HeaderVariant = "overlay" | "dark" | "light";

interface HeaderProps {
  variant?: HeaderVariant;
}

const containerClass: Record<HeaderVariant, string> = {
  overlay: "absolute top-0 left-0 right-0 z-20 bg-transparent",
  dark: "bg-black",
  light: "bg-white border-b border-black",
};

const wordmarkClass: Record<HeaderVariant, string> = {
  overlay: "text-white",
  dark: "text-white",
  light: "text-black",
};

const navLinkClass: Record<HeaderVariant, string> = {
  overlay: "text-white hover:opacity-60",
  dark: "text-white hover:opacity-60",
  light: "text-black hover:opacity-60",
};

const ctaClass: Record<HeaderVariant, string> = {
  overlay: "border border-white text-white hover:bg-white hover:text-black",
  dark: "border border-white text-white hover:bg-white hover:text-black",
  light: "border border-black text-black hover:bg-black hover:text-white",
};

const NAV = [
  { label: "Gap Scan", href: "/gap-scan" },
  { label: "Sprint", href: "/pricing" },
  { label: "Contact", href: "/book" },
];

export default function Header({ variant = "dark" }: HeaderProps) {
  return (
    <header className={`w-full h-[72px] flex items-center ${containerClass[variant]}${variant === "overlay" ? " hero-header-fade" : ""}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full flex items-center justify-between">
        {/* Text wordmark */}
        <Link href="/" className="flex items-center shrink-0">
          <span className={`font-black tracking-[-0.08em] text-sm md:text-base transition-opacity ${wordmarkClass[variant]}`}>
            VANTAGE
          </span>
        </Link>

        {/* Center nav — desktop */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className={`text-sm font-medium transition-opacity ${navLinkClass[variant]}`}
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
            className={`md:hidden text-sm font-medium transition-opacity ${navLinkClass[variant]}`}
          >
            Scan ↗
          </Link>
          {/* Desktop CTA pill */}
          <Link
            href="/gap-scan"
            className={`hidden md:inline-flex items-center text-sm font-semibold px-4 py-2 rounded-full border transition-all ${ctaClass[variant]}`}
          >
            Start scan ↗
          </Link>
        </div>
      </div>
    </header>
  );
}
