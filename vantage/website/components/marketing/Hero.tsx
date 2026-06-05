import Link from "next/link";
import { WHATSAPP_DEFAULT } from "@/lib/brand/tokens";

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] md:min-h-screen bg-black text-white overflow-hidden">

      {/* Cinematic grain overlay */}
      <div className="cinematic-grain-overlay" aria-hidden="true" />

      {/* Main content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-28 md:pt-32 pb-[28vw] md:pb-[25vw]">

        {/* Upper layout: headline left + copy right */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 md:gap-10">

          {/* Left: label + headline + mobile copy + CTA */}
          <div className="flex flex-col gap-5 md:max-w-[720px]">

            {/* Eyebrow label */}
            <p className="hero-badge text-xs font-semibold uppercase tracking-[0.12em] text-white">
              BLA 2026 · Factory Risk Intelligence
            </p>

            {/* Main headline */}
            <h1 className="hero-headline text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-[1.0] tracking-tight text-white">
              Know your factory risk position before your buyer does.
            </h1>

            {/* Right copy — below headline on mobile, hidden on desktop */}
            <div className="hero-copy flex items-start gap-3 md:hidden">
              <span className="text-white mt-0.5 text-base leading-none shrink-0" aria-hidden="true">
                ↳
              </span>
              <p className="text-sm text-white leading-relaxed">
                VANTAGE turns labour, audit, buyer, and bond-risk signals into actionable factory intelligence for Bangladesh RMG exporters.
              </p>
            </div>

            {/* CTA */}
            <div className="hero-cta flex flex-col sm:flex-row gap-3 mt-1">
              <Link
                href="/gap-scan"
                className="inline-flex items-center justify-center border border-white text-white font-bold px-7 py-4 rounded-full text-base hover:bg-white hover:text-black transition-all"
              >
                Start Free Gap Scan →
              </Link>
              <a
                href={WHATSAPP_DEFAULT}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center border border-white text-white font-medium px-7 py-4 rounded-full text-base hover:bg-white hover:text-black transition-all"
              >
                Talk on WhatsApp
              </a>
            </div>

            {/* Footer disclaimer */}
            <p className="hero-disclaimer text-xs text-white max-w-sm">
              Compliance guidance and audit-preparation support. Not a legal opinion, audit, certification, or guarantee of buyer outcome.
            </p>
          </div>

          {/* Right copy block — desktop only */}
          <div className="hero-copy hidden md:flex items-start gap-3 max-w-[320px] pt-3 shrink-0">
            <span className="text-white mt-0.5 text-lg leading-none shrink-0" aria-hidden="true">
              ↳
            </span>
            <p className="text-sm text-white leading-relaxed">
              VANTAGE turns labour, audit, buyer, and bond-risk signals into actionable factory intelligence for Bangladesh RMG exporters.
            </p>
          </div>

        </div>
      </div>

      {/* Mega wordmark — anchored to bottom */}
      <div
        className="absolute bottom-[-0.06em] left-0 right-0 pointer-events-none select-none overflow-hidden z-[2]"
        aria-hidden="true"
      >
        <p
          className="hero-mega-word text-[24vw] md:text-[22vw] font-black tracking-[-0.08em] text-white text-center whitespace-nowrap overflow-hidden"
          style={{ lineHeight: "0.82" }}
        >
          VANTAGE
        </p>
      </div>
    </section>
  );
}
