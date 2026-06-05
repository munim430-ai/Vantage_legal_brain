import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { WHATSAPP_BOOK } from "@/lib/brand/tokens";

export const metadata: Metadata = {
  title: "Contact — VANTAGE BLA 2026 Compliance",
  description:
    "Put your factory risk on the table. Send your details and VANTAGE will respond on WhatsApp within 24 hours.",
};

const inputCls =
  "w-full text-sm border border-black rounded px-3 py-3 focus:outline-none focus:ring-1 focus:ring-black transition-colors";

export default function BookPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header variant="dark" />
      <main className="flex-1">
        {/* Hero */}
        <div className="bg-black text-white py-16 md:py-20 overflow-x-hidden">
          <div className="max-w-2xl mx-auto px-4 sm:px-6">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white mb-4">
              VANTAGE · Contact
            </p>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight leading-tight mb-4 text-white">
              Put your factory risk on the table.
            </h1>
            <p className="text-white text-base leading-relaxed">
              Send your details. VANTAGE will respond on WhatsApp within 24 hours.
            </p>
          </div>
        </div>

        <div className="bg-white py-12">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 space-y-8">

            {/* Consultant info */}
            <div className="border border-black rounded-2xl p-6">
              <p className="text-sm text-black">
                You will speak with{" "}
                <strong className="text-black">Munim</strong> — compliance specialist
                at Keystone Consultancy trading as VANTAGE.
              </p>
              <p className="text-sm text-black mt-2">
                Available: Saturday to Thursday, 9 am to 6 pm Bangladesh time.
                Response time: within 24 hours on WhatsApp.
              </p>
            </div>

            {/* Primary: WhatsApp */}
            <div className="bg-black text-white rounded-2xl p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white mb-3">
                Fastest response
              </p>
              <h2 className="font-black text-xl mb-2 tracking-tight text-white">Message on WhatsApp</h2>
              <p className="text-white text-sm mb-6 leading-relaxed">
                Send a message directly and Munim will respond within 24 hours.
                Your details stay private — no automated marketing.
              </p>
              <a
                href={WHATSAPP_BOOK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center font-bold px-7 py-4 rounded-full border border-white text-white hover:bg-white hover:text-black transition-all text-sm"
              >
                Message VANTAGE on WhatsApp →
              </a>
            </div>

            {/* Secondary: Leave details */}
            <div className="border border-black rounded-2xl p-7">
              <h2 className="font-black text-lg text-black mb-1 tracking-tight">
                Leave your details
              </h2>
              <p className="text-sm text-black mb-7">
                Fill in the form below. Munim will contact you on WhatsApp within 24 hours.
              </p>

              <div className="space-y-5">
                {[
                  { label: "Your name", name: "name", type: "text", required: true },
                  { label: "Factory name", name: "factory_name", type: "text", required: true },
                  { label: "District / zone", name: "district", type: "text", required: true },
                  { label: "WhatsApp number", name: "whatsapp", type: "tel", required: true },
                  {
                    label: "Number of workers (approximate)",
                    name: "worker_count",
                    type: "text",
                    required: false,
                  },
                ].map((f) => (
                  <div key={f.name}>
                    <label className="block text-sm font-medium text-black mb-1.5">
                      {f.label}
                      {f.required && (
                        <span className="text-black ml-1 font-bold" title="Required">
                          ·
                        </span>
                      )}
                    </label>
                    <input type={f.type} name={f.name} className={inputCls} />
                  </div>
                ))}

                <div>
                  <label className="block text-sm font-medium text-black mb-1.5">
                    Anything else you want to mention
                  </label>
                  <textarea rows={3} className={`${inputCls} resize-none`} />
                </div>

                <div>
                  <label className="block text-sm font-medium text-black mb-1.5">
                    How did you find VANTAGE?
                  </label>
                  <select className={inputCls}>
                    <option value="">Select</option>
                    <option>WhatsApp</option>
                    <option>LinkedIn</option>
                    <option>BGMEA workshop</option>
                    <option>Audit firm referral</option>
                    <option>Other</option>
                  </select>
                </div>

                <a
                  href={WHATSAPP_BOOK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-black text-white font-bold py-3.5 rounded-full text-center hover:opacity-80 transition-all text-sm mt-2"
                >
                  Send Request via WhatsApp →
                </a>
              </div>

              <p className="text-xs text-black mt-5">
                No audit outcome is guaranteed. VANTAGE provides compliance guidance and
                audit-preparation support.{" "}
                <Link href="/legal/disclaimer" className="underline hover:opacity-60">
                  See full disclaimer
                </Link>
                .
              </p>
            </div>

            {/* Soft CTA */}
            <div className="text-center">
              <p className="text-sm text-black mb-3">
                Not ready to call? Start with the free gap scan instead.
              </p>
              <Link
                href="/gap-scan"
                className="inline-flex items-center border border-black text-black font-medium px-6 py-3 rounded-full hover:bg-black hover:text-white transition-all text-sm"
              >
                Start Free Gap Scan →
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
