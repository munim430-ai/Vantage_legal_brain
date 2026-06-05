import Link from "next/link";

const deliverables = [
  "Gap report — section-by-section BLA 2006 analysis",
  "Corrective action plan — prioritised by audit risk band",
  "Up to 5 policy documents drafted or remediated to audit-evidence standard",
  "30-day implementation roadmap with named responsibilities",
  "One 60-minute review call after delivery",
  "PDF and editable DOCX formats",
  "Bangla summary for your factory HR team",
  "International buyer-ready document set in English",
];

const steps = [
  {
    num: "01",
    heading: "Free Gap Scan — 90 minutes",
    body: "Answer 25 structured questions mapped to BLA 2006 sections. VANTAGE scores every gap by audit risk band. You receive a written risk summary before committing to anything.",
  },
  {
    num: "02",
    heading: "Sprint — 3 to 5 working days",
    body: "VANTAGE remediates your critical gaps. Each deliverable is mapped to a BLA section and audit framework requirement — structured for the evidence your auditor will request.",
  },
  {
    num: "03",
    heading: "Audit-preparation documentation in hand",
    body: "Your factory holds a corrective action plan, compliant policy documents, and a 30-day roadmap. Every item traceable to a specific BLA section and audit criterion.",
  },
];

export default function SprintOffer() {
  return (
    <>
      {/* Service tiers */}
      <section className="bg-black text-white py-16 md:py-20 overflow-x-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-xl mb-10">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white mb-4">
              Service Stack
            </p>
            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight leading-tight">
              Three ways to work with VANTAGE
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <TierCard
              badge="Free"
              heading="Gap Scan"
              body="A 90-minute structured assessment identifies your BLA 2006 compliance gaps. Risk score and gap summary delivered. No cost. No commitment."
            />
            <TierCard
              badge="BDT 55,000"
              heading="Compliance Sprint"
              body="3 to 5 working day intensive. Full gap report, corrective action plan, and up to 5 remediated policy documents — all mapped to BLA sections and audit evidence requirements."
              featured
            />
            <TierCard
              badge="BDT 30,000 / mo"
              heading="Compliance Retainer"
              body="Monthly advisory support. VANTAGE monitors regulatory changes, reviews your documents, and answers compliance questions year-round."
            />
          </div>
        </div>
      </section>

      {/* Sprint detail */}
      <section className="bg-white py-16 md:py-24 overflow-x-hidden border-t border-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-14 items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-black mb-4">
                Sprint Product Sheet
              </p>
              <h2 className="text-2xl md:text-3xl font-black text-black tracking-tight leading-tight mb-3">
                BLA 2026 Compliance Sprint
              </h2>
              <p className="text-black mb-8 text-base">
                From gap scan to corrective action plan — in 3 to 5 working days.
              </p>
              <ul className="space-y-3">
                {deliverables.map((d) => (
                  <li key={d} className="flex items-start gap-3">
                    <span className="text-black mt-0.5 shrink-0 font-bold text-sm">
                      ✓
                    </span>
                    <span className="text-black text-sm leading-relaxed">{d}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pricing card */}
            <div className="bg-black text-white rounded-2xl p-8 flex flex-col gap-6">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-white mb-3">
                  Sprint Investment
                </p>
                <div className="text-white text-5xl font-black tracking-tight">
                  BDT 55,000
                </div>
                <div className="text-white text-sm mt-2">
                  All inclusive · No hidden fees
                </div>
              </div>
              <div className="space-y-1.5 text-sm text-white font-mono">
                <div>→ 50% before Sprint start</div>
                <div>→ 50% on delivery</div>
                <div>→ No travel charge within Dhaka / Gazipur</div>
              </div>
              <div className="border-t border-white pt-6 flex flex-col gap-3">
                <Link
                  href="/gap-scan"
                  className="border border-white text-white font-bold py-3.5 rounded-full text-center text-sm hover:bg-white hover:text-black transition-all"
                >
                  Start Free Gap Scan →
                </Link>
                <Link
                  href="/pricing"
                  className="text-white text-sm text-center hover:opacity-60 transition-opacity"
                >
                  See full service stack →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-black py-16 md:py-24 overflow-x-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-12">
            How VANTAGE works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((s) => (
              <div key={s.num} className="flex flex-col gap-4">
                <div className="text-5xl font-black text-white leading-none tracking-tighter font-mono">
                  {s.num}
                </div>
                <div>
                  <h3 className="font-bold text-white mb-2 text-base leading-snug">
                    {s.heading}
                  </h3>
                  <p className="text-sm text-white leading-relaxed">{s.body}</p>
                </div>
              </div>
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
      className={`rounded-2xl p-6 flex flex-col gap-4 ${
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
      <h3
        className={`font-bold text-base leading-snug ${
          featured ? "text-black" : "text-white"
        }`}
      >
        {heading}
      </h3>
      <p
        className={`text-sm leading-relaxed ${
          featured ? "text-black" : "text-white"
        }`}
      >
        {body}
      </p>
    </div>
  );
}
