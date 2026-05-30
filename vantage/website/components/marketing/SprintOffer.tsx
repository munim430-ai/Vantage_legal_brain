import Link from "next/link";

const deliverables = [
  "Gap report — section-by-section BLA 2006 compliance analysis",
  "Corrective action plan — prioritised by audit risk level",
  "Up to 5 policy documents drafted or remediated",
  "30-day implementation roadmap",
  "One 60-minute review call after delivery",
  "All documents in PDF and editable format",
  "Bangla summary for your HR team",
  "English version for buyer submission",
];

const steps = [
  {
    num: "1",
    heading: "Free Gap Scan — 90 minutes",
    body: "Answer 25 structured questions about your factory's BLA compliance. VANTAGE scores each gap by audit risk. You receive a compliance score and a written gap summary.",
  },
  {
    num: "2",
    heading: "Sprint — 3 to 5 working days",
    body: "VANTAGE prepares your gap report, corrective action plan, and up to 5 remediated policy documents. You review and implement.",
  },
  {
    num: "3",
    heading: "Audit-preparation ready",
    body: "Your factory enters the audit-preparation phase with clear documentation, closed gaps, and a corrective action plan that is structured for buyer and audit review.",
  },
];

export default function SprintOffer() {
  return (
    <>
      {/* What VANTAGE does — 3 cards */}
      <section className="bg-vantage-light-grey py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-vantage-black mb-10">
            VANTAGE finds the gaps and fixes them — before your audit.
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <ServiceCard
              heading="Free Gap Scan"
              body="A 90-minute structured assessment identifies your BLA 2006 compliance gaps. You get a risk score and a written gap summary. No cost. No commitment."
              badge="Free"
            />
            <ServiceCard
              heading="BLA 2026 Compliance Sprint"
              body="A 3 to 5 working day intensive. You receive a full gap report, a corrective action plan, and up to 5 remediated policy documents. BDT 55,000 — all inclusive."
              badge="BDT 55,000"
              featured
            />
            <ServiceCard
              heading="Ongoing Compliance Retainer"
              body="Monthly advisory support. VANTAGE monitors regulatory changes, reviews your documents, and answers compliance questions. BDT 30,000 per month."
              badge="BDT 30,000/mo"
            />
          </div>
        </div>
      </section>

      {/* Sprint detail block */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-vantage-black mb-3">
                The BLA 2026 Compliance Sprint
              </h2>
              <p className="text-vantage-dark-grey mb-6">
                From gap scan to corrective action plan — in 5 working days.
              </p>
              <ul className="space-y-3">
                {deliverables.map((d) => (
                  <li key={d} className="flex items-start gap-3">
                    <span className="text-vantage-teal mt-0.5 shrink-0">✓</span>
                    <span className="text-vantage-dark-grey text-sm">{d}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-vantage-black text-white rounded-lg p-8 flex flex-col gap-6">
              <div>
                <div className="text-vantage-gold text-4xl font-bold">BDT 55,000</div>
                <div className="text-vantage-black-10 text-sm mt-1">All inclusive · No hidden fees</div>
              </div>
              <div className="text-sm text-vantage-black-10 space-y-1">
                <div>50% before Sprint start</div>
                <div>50% on delivery</div>
                <div>No travel charge within Dhaka and Gazipur</div>
              </div>
              <div className="flex flex-col gap-3">
                <Link
                  href="/gap-scan"
                  className="bg-vantage-gold text-vantage-black font-semibold py-3 rounded text-center hover:bg-yellow-400 transition-colors"
                >
                  Start Your Free Gap Scan →
                </Link>
                <Link
                  href="/pricing"
                  className="text-vantage-black-10 text-sm text-center hover:text-white transition-colors"
                >
                  See full pricing →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-vantage-light-grey py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-vantage-black mb-10">How VANTAGE works</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((s) => (
              <div key={s.num} className="bg-white p-6 rounded">
                <div className="text-3xl font-bold text-vantage-gold mb-3">{s.num}</div>
                <h3 className="font-semibold text-vantage-black mb-2">{s.heading}</h3>
                <p className="text-sm text-vantage-dark-grey">{s.body}</p>
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
    <div className={`rounded p-6 flex flex-col gap-3 ${featured ? "bg-vantage-black text-white" : "bg-white"}`}>
      <div
        className={`inline-block text-xs font-semibold px-2 py-1 rounded w-fit ${
          featured ? "bg-vantage-gold text-vantage-black" : "bg-vantage-light-grey text-vantage-dark-grey"
        }`}
      >
        {badge}
      </div>
      <h3 className={`font-semibold text-base ${featured ? "text-white" : "text-vantage-black"}`}>{heading}</h3>
      <p className={`text-sm ${featured ? "text-vantage-black-10" : "text-vantage-dark-grey"}`}>{body}</p>
    </div>
  );
}
