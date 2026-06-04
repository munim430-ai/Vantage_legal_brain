import Link from "next/link";

const deliverables = [
  "Gap report — section-by-section BLA 2006 compliance analysis",
  "Corrective action plan — prioritised by audit risk band",
  "Up to 5 policy documents drafted or remediated to audit evidence standard",
  "30-day implementation roadmap with named responsibilities",
  "One 60-minute review call after delivery",
  "All documents in PDF and editable format",
  "Bangla summary for your factory HR team",
  "International buyer-ready document set in English",
];

const steps = [
  {
    num: "01",
    heading: "Free Gap Scan — 90 minutes",
    body: "Answer 25 structured questions mapped to BLA 2006 sections. VANTAGE scores every gap by audit risk band: Critical, High, Medium, or Low. You receive a written risk summary before committing to anything.",
  },
  {
    num: "02",
    heading: "Sprint — 3 to 5 working days",
    body: "VANTAGE remediates your critical gaps. Each deliverable is mapped to a BLA section and an audit framework requirement — not generic templates, but documents structured for the evidence your auditor will request.",
  },
  {
    num: "03",
    heading: "Audit-preparation documentation in hand",
    body: "Your factory holds a corrective action plan, compliant policy documents, and a 30-day roadmap with clear ownership. Every item is traceable to a specific BLA section and audit criterion.",
  },
];

export default function SprintOffer() {
  return (
    <>
      {/* What VANTAGE does — 3 service tiers */}
      <section className="bg-vantage-light-grey py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-vantage-black">
              Three ways to work with VANTAGE
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <ServiceCard
              heading="Free Gap Scan"
              body="A 90-minute structured assessment identifies your BLA 2006 compliance gaps. You receive a risk score and a written gap summary. No cost. No commitment."
              badge="Free"
            />
            <ServiceCard
              heading="BLA 2026 Compliance Sprint"
              body="A 3 to 5 working day intensive. You receive a full gap report, a corrective action plan, and up to 5 remediated policy documents — all mapped to BLA sections and audit evidence requirements."
              badge="BDT 55,000"
              featured
            />
            <ServiceCard
              heading="Ongoing Compliance Retainer"
              body="Monthly advisory support. VANTAGE monitors regulatory changes, reviews your documents, and answers compliance questions throughout the year."
              badge="BDT 30,000/mo"
            />
          </div>
        </div>
      </section>

      {/* Sprint detail block */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-14 items-start">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-vantage-black mb-3 tracking-tight">
                The BLA 2026 Compliance Sprint
              </h2>
              <p className="text-vantage-dark-grey mb-8">
                From gap scan to corrective action plan — in 3 to 5 working days.
              </p>
              <ul className="space-y-3.5">
                {deliverables.map((d) => (
                  <li key={d} className="flex items-start gap-3">
                    <span className="text-vantage-teal mt-0.5 shrink-0 font-bold">✓</span>
                    <span className="text-vantage-dark-grey text-sm leading-relaxed">{d}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-vantage-black text-white rounded-xl p-8 flex flex-col gap-6">
              <div>
                <div className="text-vantage-gold text-5xl font-bold tracking-tight">BDT 55,000</div>
                <div className="text-vantage-black-10 text-sm mt-1.5">All inclusive · No hidden fees</div>
              </div>
              <div className="text-sm text-vantage-black-30 space-y-1.5">
                <div>50% before Sprint start</div>
                <div>50% on delivery</div>
                <div>No travel charge within Dhaka and Gazipur</div>
              </div>
              <div className="border-t border-vantage-black-70 pt-6 flex flex-col gap-3">
                <Link
                  href="/gap-scan"
                  className="bg-vantage-gold text-vantage-black font-semibold py-3.5 rounded text-center hover:bg-yellow-400 transition-colors"
                >
                  Start Your Free Gap Scan →
                </Link>
                <Link
                  href="/pricing"
                  className="text-vantage-black-30 text-sm text-center hover:text-white transition-colors"
                >
                  See full pricing →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-vantage-black py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-12 tracking-tight">
            How VANTAGE works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((s) => (
              <div key={s.num} className="flex flex-col gap-4">
                <div className="text-6xl font-bold text-vantage-black-70 leading-none tracking-tighter">
                  {s.num}
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2 text-lg leading-snug">{s.heading}</h3>
                  <p className="text-sm text-vantage-black-10 leading-relaxed">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function ServiceCard({
  heading,
  body,
  badge,
  featured,
}: {
  heading: string;
  body: string;
  badge: string;
  featured?: boolean;
}) {
  return (
    <div
      className={`rounded-xl p-6 flex flex-col gap-4 ${
        featured ? "bg-vantage-black text-white" : "bg-white"
      }`}
    >
      <div
        className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full w-fit ${
          featured
            ? "bg-vantage-gold text-vantage-black"
            : "bg-vantage-light-grey text-vantage-dark-grey"
        }`}
      >
        {badge}
      </div>
      <h3
        className={`font-semibold text-base leading-snug ${
          featured ? "text-white" : "text-vantage-black"
        }`}
      >
        {heading}
      </h3>
      <p
        className={`text-sm leading-relaxed ${
          featured ? "text-vantage-black-10" : "text-vantage-dark-grey"
        }`}
      >
        {body}
      </p>
    </div>
  );
}
