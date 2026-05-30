const problems = [
  {
    title: "Appointment letters missing",
    body: "No written employment contract means a Critical nonconformity in every major audit standard.",
    severity: "Critical",
  },
  {
    title: "Wage evidence unclear",
    body: "Payroll records that don't show grade, overtime rate, and deductions are a direct BLA 2006 violation.",
    severity: "Critical",
  },
  {
    title: "No anti-harassment policy",
    body: "Required by BLA 2006 and a zero-tolerance issue in Sedex/SMETA 4-Pillar audits.",
    severity: "Critical",
  },
  {
    title: "Grievance records incomplete",
    body: "Factories with no grievance register or closure log fail Worker Voice requirements across all audit frameworks.",
    severity: "High",
  },
  {
    title: "CAP not tracked to closure",
    body: "Previous audit findings not remediated will be escalated in the next buyer visit.",
    severity: "High",
  },
  {
    title: "Audit date approaching",
    body: "Sprint delivery is 5 working days. With less than 4 weeks to your audit, time is the risk.",
    severity: "Urgent",
  },
];

const severityStyle: Record<string, string> = {
  Critical: "border-l-vantage-black text-vantage-black",
  High: "border-l-vantage-teal text-vantage-teal",
  Urgent: "border-l-vantage-gold text-vantage-gold",
};

export default function ProblemCards() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-vantage-black mb-4">
          Your factory has compliance gaps. Most do.
        </h2>
        <p className="text-vantage-dark-grey mb-10 max-w-2xl">
          Bangladesh has 4,400 export-oriented factories. Every one faces buyer pressure on BLA 2006 compliance.
          Missed gaps mean nonconformity findings, corrective action plans, and buyer suspension risk.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {problems.map((p) => (
            <div
              key={p.title}
              className={`bg-vantage-light-grey border-l-4 ${severityStyle[p.severity].split(" ")[0]} rounded-r p-5`}
            >
              <div className={`text-xs font-semibold uppercase tracking-wide mb-2 ${severityStyle[p.severity].split(" ")[1]}`}>
                {p.severity}
              </div>
              <h3 className="font-semibold text-vantage-black mb-1">{p.title}</h3>
              <p className="text-sm text-vantage-dark-grey">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
