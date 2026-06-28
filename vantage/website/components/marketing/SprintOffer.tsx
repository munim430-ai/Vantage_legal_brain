import MotionReveal from "@/components/ui/MotionReveal";
import { WHATSAPP_SCAN } from "@/lib/brand/tokens";

const sprintDeliverables = [
  "Full gap report across buyer readiness and core compliance records",
  "Corrective action plan prioritised by evidence and deadline risk",
  "Up to 5 policy documents drafted or remediated",
  "Buyer and framework requirement mapping",
  "30-day implementation roadmap with named responsibilities",
  "One 60-minute management review call",
  "PDF and editable DOCX deliverables",
  "Bangla operational summary and English management version",
];

const monthlyDeliverables = [
  "Monthly document-status review",
  "Compliance and renewal deadline tracker",
  "CAP action monitoring and evidence follow-up",
  "Policy review and drafting support",
  "BSCI, SMETA, RSC, WRAP, SLCP and buyer-requirement mapping",
  "Regulatory and buyer-intelligence alerts",
  "WhatsApp assistance for the factory team",
];

const steps = [
  {
    num: "01",
    heading: "Free 12-file document risk scan",
    body: "VANTAGE reviews the status of 12 essential document categories and identifies missing, expired, inconsistent or difficult-to-retrieve evidence.",
  },
  {
    num: "02",
    heading: "Choose Sprint or ongoing support",
    body: "Use the BDT 55,000 Sprint for concentrated remediation, or the monthly service for continuous monitoring, deadline control and factory-team support.",
  },
  {
    num: "03",
    heading: "Keep evidence controlled",
    body: "Documents, CAP actions, policies and deadlines are maintained against the frameworks and buyer requirements relevant to your factory.",
  },
];

export default function SprintOffer() {
  return (
    <>
      <section className="bg-black text-white py-16 md:py-20 overflow-x-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <MotionReveal variant="blurIn" className="max-w-xl mb-10">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white mb-4">
              Service Stack
            </p>
            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight leading-tight">
              Three ways to control factory compliance risk
            </h2>
          </MotionReveal>

          <div className="grid md:grid-cols-3 gap-4">
            <TierCard
              badge="Free"
              heading="12-File Document Risk Scan"
              body="A structured review of essential worker, wage, safety, policy, licence, CAP and buyer-readiness records. Receive a concise risk summary and recommended next action."
            />
            <TierCard
              badge="BDT 55,000"
              heading="BLA 2026 Compliance Sprint"
              body="A focused 3-to-5-working-day engagement for gap analysis, CAP planning, policy remediation and buyer-readiness documentation."
              featured
            />
            <TierCard
              badge="BDT 30,000 / month"
              heading="Ongoing Compliance Retainer"
              body="Continuous document monitoring, deadline control, CAP support, policy assistance, regulatory intelligence and WhatsApp access."
            />
          </div>
        </div>
      </section>

      <section id="launch-offer" className="bg-white py-16 md:py-24 overflow-x-hidden border-t border-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-14 items-start">
            <div>
              <MotionReveal variant="blurIn">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-black mb-4">
                  Limited Launch Offer
                </p>
                <h2 className="text-2xl md:text-4xl font-black text-black tracking-tight leading-tight mb-3">
                  Full monthly compliance support at launch pricing.
                </h2>
                <p className="text-black mb-8 text-base leading-relaxed">
                  Available for a limited number of factories while onboarding capacity remains open.
                </p>
              </MotionReveal>

              <ul className="space-y-3">
                {monthlyDeliverables.map((item, i) => (
                  <MotionReveal key={item} variant="lineWipe" delay={i * 60}>
                    <li className="flex items-start gap-3">
                      <span className="text-black mt-0.5 shrink-0 font-bold text-sm">✓</span>
                      <span className="text-black text-sm leading-relaxed">{item}</span>
                    </li>
                  </MotionReveal>
                ))}
              </ul>
            </div>

            <MotionReveal variant="scaleIn" delay={120}>
              <div className="bg-black text-white rounded-2xl p-8 flex flex-col gap-6">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-white mb-3">
                    Limited Launch Pricing
                  </p>
                  <div className="text-white text-4xl font-black tracking-tight">BDT 20,000</div>
                  <div className="text-white text-sm mt-1">One-time onboarding</div>
                  <div className="text-white text-4xl font-black tracking-tight mt-5">BDT 12,000</div>
                  <div className="text-white text-sm mt-1">Per month</div>
                </div>

                <div className="space-y-1.5 text-sm text-white font-mono">
                  <div>→ Standard monthly retainer: BDT 30,000</div>
                  <div>→ Launch offer is subject to onboarding capacity</div>
                  <div>→ Scope confirmed before work begins</div>
                </div>

                <div className="border-t border-white pt-6">
                  <a
                    href={WHATSAPP_SCAN}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-white text-white font-bold py-3.5 rounded-full text-center text-sm hover:bg-white hover:text-black transition-all block"
                  >
                    WhatsApp SCAN
                  </a>
                </div>
              </div>
            </MotionReveal>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24 overflow-x-hidden border-t border-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-14 items-start">
            <div>
              <MotionReveal variant="blurIn">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-black mb-4">
                  Sprint Product Sheet
                </p>
                <h2 className="text-2xl md:text-3xl font-black text-black tracking-tight leading-tight mb-3">
                  BLA 2026 Compliance Sprint
                </h2>
                <p className="text-black mb-8 text-base">
                  Concentrated remediation and buyer-readiness support in 3 to 5 working days.
                </p>
              </MotionReveal>

              <ul className="space-y-3">
                {sprintDeliverables.map((item, i) => (
                  <MotionReveal key={item} variant="lineWipe" delay={i * 60}>
                    <li className="flex items-start gap-3">
                      <span className="text-black mt-0.5 shrink-0 font-bold text-sm">✓</span>
                      <span className="text-black text-sm leading-relaxed">{item}</span>
                    </li>
                  </MotionReveal>
                ))}
              </ul>
            </div>

            <MotionReveal variant="scaleIn" delay={120}>
              <div className="bg-black text-white rounded-2xl p-8 flex flex-col gap-6">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-white mb-3">
                    Sprint Investment
                  </p>
                  <div className="text-white text-5xl font-black tracking-tight">BDT 55,000</div>
                  <div className="text-white text-sm mt-2">All inclusive · Scope confirmed before start</div>
                </div>
                <div className="space-y-1.5 text-sm text-white font-mono">
                  <div>→ 50% before Sprint start</div>
                  <div>→ 50% on delivery</div>
                  <div>→ Travel scope confirmed separately where required</div>
                </div>
                <div className="border-t border-white pt-6">
                  <a
                    href={WHATSAPP_SCAN}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-white text-white font-bold py-3.5 rounded-full text-center text-sm hover:bg-white hover:text-black transition-all block"
                  >
                    WhatsApp SCAN
                  </a>
                </div>
              </div>
            </MotionReveal>
          </div>
        </div>
      </section>

      <section className="bg-black py-16 md:py-24 overflow-x-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <MotionReveal variant="blurIn">
            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-12">
              How VANTAGE works
            </h2>
          </MotionReveal>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <MotionReveal key={step.num} variant="fadeUp" delay={i * 120}>
                <div className="flex flex-col gap-4">
                  <div className="text-5xl font-black text-white leading-none tracking-tighter font-mono">
                    {step.num}
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-2 text-base leading-snug">{step.heading}</h3>
                    <p className="text-sm text-white leading-relaxed">{step.body}</p>
                  </div>
                </div>
              </MotionReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function TierCard({
  badge,
  heading,
  body,
  featured,
}: {
  badge: string;
  heading: string;
  body: string;
  featured?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl p-6 flex flex-col gap-4 h-full ${
        featured ? "bg-white text-black" : "border border-white text-white"
      }`}
    >
      <div
        className={`inline-block text-xs font-bold px-3 py-1 rounded-full w-fit border ${
          featured ? "border-black text-black" : "border-white text-white"
        }`}
      >
        {badge}
      </div>
      <h3 className={`font-bold text-base leading-snug ${featured ? "text-black" : "text-white"}`}>
        {heading}
      </h3>
      <p className={`text-sm leading-relaxed ${featured ? "text-black" : "text-white"}`}>{body}</p>
      <a
        href={WHATSAPP_SCAN}
        target="_blank"
        rel="noopener noreferrer"
        className={`mt-auto inline-flex items-center justify-center font-bold py-3 rounded-full text-sm transition-all border ${
          featured
            ? "border-black text-black hover:bg-black hover:text-white"
            : "border-white text-white hover:bg-white hover:text-black"
        }`}
      >
        WhatsApp SCAN
      </a>
    </div>
  );
}
