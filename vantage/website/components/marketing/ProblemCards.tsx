import MotionReveal from "@/components/ui/MotionReveal";

const problems = [
  {
    title: "Worker files do not match current records",
    ref: "Document control",
    severity: "Priority" as const,
    detail:
      "Appointment, identity, service and personnel records need consistent names, dates, signatures and current versions before they are presented for review.",
  },
  {
    title: "Attendance, overtime and payroll do not reconcile",
    ref: "Wage evidence",
    severity: "Priority" as const,
    detail:
      "Small inconsistencies across attendance, overtime approval, calculations and payment evidence can create avoidable questions during buyer or audit review.",
  },
  {
    title: "Policies exist but version control is weak",
    ref: "Policy support",
    severity: "Control" as const,
    detail:
      "VANTAGE checks approval dates, ownership, language versions, acknowledgement records and whether the policy is supported by implementation evidence.",
  },
  {
    title: "Grievance records show intake but not closure",
    ref: "Worker evidence",
    severity: "Control" as const,
    detail:
      "A complete evidence trail should show intake, review, action, closure and confidentiality controls without exposing worker identities unnecessarily.",
  },
  {
    title: "CAP actions lack owners and evidence",
    ref: "CAP support",
    severity: "Action" as const,
    detail:
      "Open actions need named owners, due dates, completion evidence and management visibility so repeat issues can be addressed before the next review.",
  },
  {
    title: "Deadlines are stored across separate files",
    ref: "Monitoring",
    severity: "Action" as const,
    detail:
      "Licences, certificates, buyer requests, CAP dates and document renewals should be tracked through one controlled deadline register.",
  },
];

export default function ProblemCards() {
  return (
    <section className="bg-white py-16 md:py-24 overflow-x-hidden border-t border-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <MotionReveal variant="blurIn" className="max-w-2xl mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-black mb-4">
            Readiness Risk Grid
          </p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-black tracking-tight leading-tight">
            The document gaps that create avoidable buyer pressure.
          </h2>
          <p className="text-black mt-4 text-base leading-relaxed">
            VANTAGE checks whether your evidence is current, consistent, owned and retrievable—not merely whether a document exists.
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
                  <span className="text-[10px] font-mono text-black">{p.ref}</span>
                </div>
                <h3 className="font-bold text-black mb-2 leading-snug text-sm">{p.title}</h3>
                <p className="text-sm text-black leading-relaxed">{p.detail}</p>
              </div>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
