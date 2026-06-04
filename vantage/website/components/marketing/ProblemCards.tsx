const problems = [
  {
    title: "Appointment letters missing",
    body: "BLA 2006 Section 5 requires a written appointment letter for every worker. Its absence is a Critical nonconformity in BSCI, SMETA, and SA8000.",
    ref: "BLA s.5",
    severity: "Critical",
  },
  {
    title: "Wage records don't show the breakdown",
    body: "Section 123 requires payroll records to show basic wage, overtime rate, and deductions separately. A single total fails audit evidence requirements.",
    ref: "BLA s.123",
    severity: "Critical",
  },
  {
    title: "No written anti-harassment policy",
    body: "Required under BLA 2006 and a zero-tolerance item in Sedex/SMETA 4-Pillar and Better Work assessments. Verbal policies are not accepted as evidence.",
    ref: "BLA s.332",
    severity: "Critical",
  },
  {
    title: "Grievance register not maintained",
    body: "Factories without a grievance register and closure log fail Worker Voice requirements across every major audit framework, including RSC and H&M CoC.",
    ref: "BLA s.205",
    severity: "High",
  },
  {
    title: "Previous CAP items not closed",
    body: "Open corrective action plan items from a prior audit are escalated in the next buyer visit. Incomplete closure is treated as a repeat finding.",
    ref: "Audit protocol",
    severity: "High",
  },
  {
    title: "Audit window is short",
    body: "Sprint delivery is 3 to 5 working days. With less than 4 weeks to your audit date, documentation gaps can no longer be closed after the fact.",
    ref: "Time-critical",
    severity: "Urgent",
  },
];

const severityStyle: Record<string, { border: string; label: string }> = {
  Critical: { border: "border-l-vantage-black", label: "text-vantage-black" },
  High:     { border: "border-l-vantage-teal",  label: "text-vantage-teal" },
  Urgent:   { border: "border-l-vantage-gold",  label: "text-vantage-gold" },
};

export default function ProblemCards() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-vantage-black mb-4">
            The gaps that trigger nonconformity findings — and what VANTAGE fixes first.
          </h2>
          <p className="text-vantage-dark-grey">
            BLA 2006 enforcement has intensified since the 2022 amendments. Buyers now require documented evidence against specific sections of the Act — verbal assurances are no longer accepted.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {problems.map((p) => {
            const style = severityStyle[p.severity];
            return (
              <div
                key={p.title}
                className={`bg-vantage-light-grey border-l-4 ${style.border} rounded-r-lg p-5`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs font-semibold uppercase tracking-wide ${style.label}`}>
                    {p.severity}
                  </span>
                  <span className="text-[10px] font-mono text-vantage-medium-grey">{p.ref}</span>
                </div>
                <h3 className="font-semibold text-vantage-black mb-2 leading-snug">{p.title}</h3>
                <p className="text-sm text-vantage-dark-grey leading-relaxed">{p.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
