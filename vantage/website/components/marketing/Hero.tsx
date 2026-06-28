import { WHATSAPP_SCAN } from "@/lib/brand/tokens";

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] md:min-h-screen bg-black text-white overflow-hidden">
      <div className="cinematic-grain-overlay" aria-hidden="true" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-28 md:pt-32 pb-[28vw] md:pb-[25vw]">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 md:gap-10">
          <div className="flex flex-col gap-5 md:max-w-[760px]">
            <p className="hero-badge text-xs font-semibold uppercase tracking-[0.12em] text-white">
              Buyer Readiness · Document Control · CAP Support
            </p>

            <h1 className="hero-headline text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-[1.0] tracking-tight text-white">
              See the gap before the buyer does.
            </h1>

            <div className="hero-copy flex items-start gap-3 md:hidden">
              <span className="text-white mt-0.5 text-base leading-none shrink-0" aria-hidden="true">
                ↳
              </span>
              <p className="text-sm text-white leading-relaxed">
                VANTAGE helps Bangladesh RMG factories control compliance documents, track CAP actions, monitor deadlines and prepare evidence across buyer and audit frameworks.
              </p>
            </div>

            <div className="hero-cta flex flex-col sm:flex-row gap-3 mt-1">
              <a
                href={WHATSAPP_SCAN}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center border border-white text-white font-bold px-7 py-4 rounded-full text-base hover:bg-white hover:text-black transition-all"
              >
                WhatsApp SCAN
              </a>
            </div>

            <p className="hero-disclaimer text-xs text-white max-w-md">
              Compliance-readiness, document-control and remediation support. Not an audit, certification, legal opinion or guarantee of buyer outcome.
            </p>
          </div>

          <div className="hero-copy hidden md:flex items-start gap-3 max-w-[330px] pt-3 shrink-0">
            <span className="text-white mt-0.5 text-lg leading-none shrink-0" aria-hidden="true">
              ↳
            </span>
            <p className="text-sm text-white leading-relaxed">
              VANTAGE helps Bangladesh RMG factories control compliance documents, track CAP actions, monitor deadlines and prepare evidence across buyer and audit frameworks.
            </p>
          </div>
        </div>
      </div>

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
