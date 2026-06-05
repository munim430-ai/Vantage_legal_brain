import Link from "next/link";
import Image from "next/image";

interface HeaderProps {
  dark?: boolean;
  overlay?: boolean;
}

export default function Header({ dark = true, overlay = false }: HeaderProps) {
  const isLight = !dark && !overlay;

  return (
    <header
      className={[
        "w-full h-[72px] flex items-center",
        overlay
          ? "absolute top-0 left-0 right-0 z-20 bg-transparent"
          : isLight
          ? "bg-white border-b border-vantage-black-10"
          : "bg-vantage-black",
      ].join(" ")}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <Image
            src={
              isLight
                ? "/brand/logo-wordmark-black-on-white.jpeg"
                : "/brand/logo-wordmark-white-on-black.jpeg"
            }
            alt="VANTAGE"
            width={140}
            height={36}
            className="h-7 w-auto"
            priority
          />
        </Link>

        {/* Center nav — desktop only */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/gap-scan"
            className={`text-sm font-medium transition-colors ${
              isLight
                ? "text-vantage-dark-grey hover:text-vantage-black"
                : "text-vantage-black-10 hover:text-white"
            }`}
          >
            Gap Scan
          </Link>
          <Link
            href="/pricing"
            className={`text-sm font-medium transition-colors ${
              isLight
                ? "text-vantage-dark-grey hover:text-vantage-black"
                : "text-vantage-black-10 hover:text-white"
            }`}
          >
            Sprint
          </Link>
          <Link
            href="/book"
            className={`text-sm font-medium transition-colors ${
              isLight
                ? "text-vantage-dark-grey hover:text-vantage-black"
                : "text-vantage-black-10 hover:text-white"
            }`}
          >
            Contact
          </Link>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Mobile: compact label */}
          <span className="md:hidden text-sm font-medium text-vantage-black-10 select-none">
            Menu
          </span>

          {/* Desktop CTA pill */}
          <Link
            href="/gap-scan"
            className={`hidden md:inline-flex items-center gap-1 text-sm font-semibold px-4 py-2 rounded-full border transition-colors ${
              isLight
                ? "border-vantage-black text-vantage-black hover:bg-vantage-light-grey"
                : "border-white/30 text-white hover:bg-white/10"
            }`}
          >
            Start scan ↗
          </Link>
        </div>
      </div>
    </header>
  );
}
