import MotionReveal from "@/components/ui/MotionReveal";

const problems = [
  {
    title: "Appointment letters missing",
    ref: "BLA s.5",
    severity: "Critical" as const,
    detail:
      "Written appointment letter required for every worker. Absence is a zero-tolerance nonconformity in BSCI, SMETA, and SA8000.",
  },
  {
    title: "Wage records missing breakdown",
    ref: "BLA s.123",
    severity: "Critical" as const,
    detail:
      "Payroll records must show basic wage, overtime rate, and deductions separately. A single total fails audit evidence requirements.",
  },
  {
    title: "No written anti-harassment policy",
    ref: "BLA s.332",
    severity: "Critical" as const,
    detail:
      "Zero-tolerance item in Sedex/SMETA 4-Pillar and Better Work. Verbal policies are not accepted as evidence.",
  },
  {
    title: "Grievance register not maintained",
    ref: "BLA s.205",
    severity: "High" as const,
    detail:
      "Factories without a grievance register and closure log fail Worker Voice requirements across RSC and H&M CoC.",
  },
  {
    title: "Open CAP items not closed",
    ref: "Audit protocol",
    severity: "High" as const,
    detail:
      "Open corrective action items from prior audits are escalated in the next buyer visit as repeat findings.",
  },
  {
    title: "Audit window is short",
    ref: "Time-critical",
    severity: "Urgent" as const,
    detail:
      "Sprint delivery is 3 to 5 working days. With less than 4 weeks to audit, documentation gaps cannot be closed after the fact.",
  },
];

type Severity = "Critical" | "High" | "Urgent";

export default function ProblemCards() {
  return (
    <section className="bg-white py-16 md:py-24 overflow-x-hidden border-t border-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <MotionReveal variant="blurIn" className="max-w-2xl mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-black mb-4">
            Risk Intelligence Grid
          </p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-black tracking-tight leading-tight">
            The gaps that trigger nonconformity findings — and what VANTAGE fixes first.
          </h2>
          <p className="text-black mt-4 text-base leading-relaxed">
            BLA 2006 enforcement has intensified. Buyers now require documented evidence against
            specific sections — verbal assurances are not accepted.
          </p>
        </MotionReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {problems.map((p, i) => (
            <MotionReveal key={p.title} variant="scaleIn" delay={i * 80}>
              <div className="border border-black rounded-xl p-5 h-full">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-black">
                    {p.severity}
                  </span>
                  <span className="text-[10px] font-mono text-black">
                    {p.ref}
                  </span>
                </div>
                <h3 className="font-bold text-black mb-2 leading-snug text-sm">
                  {p.title}
                </h3>
                <p className="text-sm text-black leading-relaxed">{p.detail}</p>
              </div>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
