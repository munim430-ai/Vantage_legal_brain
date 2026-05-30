import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { WHATSAPP_BOOK } from "@/lib/brand/tokens";

export const metadata: Metadata = {
  title: "Book a Call — VANTAGE BLA 2026 Compliance",
  description:
    "Talk to VANTAGE about your factory's BLA 2006 compliance gaps. Book a free 30-minute call or contact us on WhatsApp.",
};

export default function BookPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header dark={false} />
      <main className="flex-1 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
          <h1 className="text-3xl font-bold text-vantage-black mb-3">Book a Call with VANTAGE</h1>
          <p className="text-vantage-dark-grey mb-8">
            Tell us about your factory. We will contact you within 24 hours to discuss your compliance gaps and recommend the right level of support.
          </p>

          {/* About Munim */}
          <div className="bg-vantage-light-grey rounded p-5 mb-8">
            <p className="text-sm text-vantage-dark-grey">
              You will speak with <strong className="text-vantage-black">Munim</strong> — compliance specialist at Keystone Consultancy trading as VANTAGE.
            </p>
            <p className="text-sm text-vantage-dark-grey mt-2">
              Available: Saturday to Thursday, 9 am to 6 pm Bangladesh time.
              Response time: within 24 hours on WhatsApp.
            </p>
          </div>

          {/* Direct WhatsApp */}
          <div className="bg-vantage-black text-white rounded p-6 mb-8">
            <h2 className="font-semibold mb-2">Prefer WhatsApp?</h2>
            <p className="text-vantage-black-10 text-sm mb-4">
              Send a message directly and Munim will respond within 24 hours.
            </p>
            <a
              href={WHATSAPP_BOOK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-vantage-gold text-vantage-black font-semibold px-6 py-3 rounded hover:bg-yellow-400 transition-colors"
            >
              Message VANTAGE on WhatsApp →
            </a>
          </div>

          {/* Contact form note */}
          <div className="border border-vantage-black-10 rounded p-6">
            <h2 className="font-semibold text-vantage-black mb-3">Leave your details</h2>
            <p className="text-sm text-vantage-dark-grey mb-6">
              Fill in the form below and Munim will contact you on WhatsApp within 24 hours. Or use the WhatsApp button above for faster response.
            </p>

            <div className="space-y-4">
              {[
                { label: "Your name", name: "name", type: "text", required: true },
                { label: "Factory name", name: "factory_name", type: "text", required: true },
                { label: "District / zone", name: "district", type: "text", required: true },
                { label: "WhatsApp number", name: "whatsapp", type: "tel", required: true },
                { label: "Number of workers (approximate)", name: "worker_count", type: "text", required: false },
              ].map((f) => (
                <div key={f.name}>
                  <label className="block text-sm font-medium text-vantage-black mb-1">
                    {f.label}
                    {f.required && <span className="text-red-500 ml-1">*</span>}
                  </label>
                  <input
                    type={f.type}
                    name={f.name}
                    className="w-full text-sm border border-vantage-black-10 rounded px-3 py-2.5 focus:outline-none focus:border-vantage-teal"
                  />
                </div>
              ))}

              <div>
                <label className="block text-sm font-medium text-vantage-black mb-1">
                  Anything else you want to mention
                </label>
                <textarea
                  rows={3}
                  className="w-full text-sm border border-vantage-black-10 rounded px-3 py-2.5 focus:outline-none focus:border-vantage-teal resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-vantage-black mb-1">
                  How did you find VANTAGE?
                </label>
                <select className="w-full text-sm border border-vantage-black-10 rounded px-3 py-2.5 focus:outline-none focus:border-vantage-teal">
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
                className="block w-full bg-vantage-black text-white font-semibold py-3 rounded text-center hover:bg-vantage-black-90 transition-colors mt-2"
              >
                Send Request via WhatsApp →
              </a>
            </div>

            <p className="text-xs text-vantage-medium-grey mt-4">
              No audit outcome is guaranteed. VANTAGE provides compliance guidance and audit-preparation support.{" "}
              <Link href="/legal/disclaimer" className="underline">See full disclaimer</Link>.
            </p>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-vantage-dark-grey mb-3">
              Not ready to call? Start with the free gap scan instead.
            </p>
            <Link
              href="/gap-scan"
              className="inline-block border border-vantage-black text-vantage-black font-medium px-6 py-3 rounded hover:bg-vantage-black hover:text-white transition-colors"
            >
              Start Free Gap Scan →
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
