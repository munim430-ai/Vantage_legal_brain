import Link from "next/link";
import { WHATSAPP_DEFAULT } from "@/lib/brand/tokens";

export default function DashboardPreview() {
  return (
    <>
      {/* Audit standards alignment */}
      <section className="bg-white py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h3 className="text-base font-semibold text-vantage-dark-grey mb-4 uppercase tracking-wide text-sm">
            Aligned with international audit frameworks
          </h3>
          <p className="text-vantage-dark-grey mb-4 max-w-2xl">
            VANTAGE audit-preparation support is aligned with the evidence requirements of:{" "}
            <span className="font-medium text-vantage-black">
              BSCI · WRAP · SA8000 · Sedex/SMETA · Better Work · RSC
            </span>
          </p>
          <p className="text-xs text-vantage-medium-grey">
            VANTAGE is not affiliated with, approved by, or a representative of any audit body.
            We provide compliance guidance and audit-preparation support only.
          </p>
        </div>
      </section>

      {/* Social proof placeholder */}
      <section className="bg-vantage-light-grey py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h3 className="text-base font-semibold text-vantage-black mb-2">Factories we have helped prepare</h3>
          <p className="text-sm text-vantage-medium-grey italic">
            [Client quote — factory name, district, audit framework — to be added after first Sprint delivery]
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-vantage-black text-white py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Start with a free gap scan. No cost. No commitment.
          </h2>
          <p className="text-vantage-black-10 mb-8 max-w-xl mx-auto">
            Identify your BLA 2006 compliance risk in 90 minutes. Then decide if the Sprint is right for your factory.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/gap-scan"
              className="bg-vantage-gold text-vantage-black font-semibold px-8 py-3 rounded hover:bg-yellow-400 transition-colors"
            >
              Start Free Gap Scan →
            </Link>
            <Link
              href="/book"
              className="border border-vantage-black-50 text-vantage-black-10 px-8 py-3 rounded hover:border-white hover:text-white transition-colors"
            >
              Book a call with VANTAGE instead →
            </Link>
          </div>
          <div className="mt-6">
            <a
              href={WHATSAPP_DEFAULT}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-vantage-teal hover:text-white transition-colors"
            >
              Or message us on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
