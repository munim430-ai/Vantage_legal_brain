export default function CommandPanelPreview() {
  const included = [
    "Gap report mapped to BLA sections",
    "Corrective action plan — by risk priority",
    "Up to 5 policy documents remediated",
    "30-day implementation roadmap",
    "Bangla summary for your HR team",
  ];

  return (
    <div className="bg-vantage-black-90 border border-vantage-black-70 rounded-xl p-8">
      <div className="text-xs font-medium text-vantage-black-50 uppercase tracking-widest mb-8">
        BLA 2026 Compliance Sprint
      </div>

      <div className="space-y-7 mb-8">
        <StatItem number="25" label="compliance checkpoints assessed" />
        <StatItem
          number="3–5"
          label="working days to delivery"
          sub="gap report + corrective action plan"
        />
        <StatItem
          number="55,000"
          label="BDT — all inclusive"
          sub="50% before start · 50% on delivery"
          isBDT
        />
      </div>

      <div className="border-t border-vantage-black-70 pt-6 space-y-2.5">
        {included.map((item) => (
          <div key={item} className="flex items-start gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-vantage-teal shrink-0 mt-1.5" />
            <span className="text-sm text-vantage-black-30">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatItem({
  number,
  label,
  sub,
  isBDT,
}: {
  number: string;
  label: string;
  sub?: string;
  isBDT?: boolean;
}) {
  return (
    <div>
      <div className="flex items-baseline gap-1.5">
        {isBDT && (
          <span className="text-base font-medium text-vantage-black-50">BDT</span>
        )}
        <span className="text-5xl font-bold text-vantage-gold leading-none">{number}</span>
      </div>
      <div className="text-sm text-vantage-black-10 mt-1">{label}</div>
      {sub && <div className="text-xs text-vantage-black-50 mt-0.5">{sub}</div>}
    </div>
  );
}
