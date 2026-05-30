export default function CommandPanelPreview() {
  return (
    <div className="bg-vantage-black-90 border border-vantage-black-70 rounded-lg p-5 font-mono text-xs">
      {/* Header bar */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-vantage-black-70">
        <span className="text-vantage-black-30 text-[10px] uppercase tracking-widest">VANTAGE COMPLIANCE SCORE</span>
        <span className="text-vantage-black-30 text-[10px]">LIVE</span>
      </div>

      {/* Score */}
      <div className="text-center mb-4">
        <div className="text-6xl font-bold text-vantage-gold">57</div>
        <div className="text-vantage-black-10 text-sm mt-1">/ 100</div>
        <div className="mt-2 inline-block bg-vantage-black text-white text-xs font-semibold px-3 py-1 rounded-full">
          HIGH RISK
        </div>
      </div>

      <div className="border-t border-vantage-black-70 pt-3 mb-3 space-y-1.5">
        <PanelRow label="Critical gaps" value="3" valueColor="text-white" />
        <PanelRow label="High gaps" value="5" valueColor="text-vantage-black-10" />
        <PanelRow label="Medium gaps" value="2" valueColor="text-vantage-black-30" />
        <PanelRow label="Missing documents" value="2" valueColor="text-vantage-gold" />
      </div>

      <div className="border-t border-vantage-black-70 pt-3 space-y-1.5">
        <div className="text-vantage-black-30 text-[10px] uppercase tracking-widest mb-2">Top gaps</div>
        <GapRow q="Q01" label="Employment documentation" level="Critical" />
        <GapRow q="Q09" label="Wage calculation records" level="Critical" />
        <GapRow q="Q15" label="Anti-harassment policy" level="Critical" />
        <GapRow q="Q05" label="Working hours docs" level="High" />
        <GapRow q="Q11" label="Leave records" level="High" />
      </div>

      <div className="mt-4 border-t border-vantage-black-70 pt-3">
        <div className="bg-vantage-gold text-vantage-black text-xs font-semibold px-3 py-2 rounded text-center">
          ⚡ Sprint recommended
        </div>
      </div>
    </div>
  );
}

function PanelRow({ label, value, valueColor }: { label: string; value: string; valueColor: string }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-vantage-black-30">{label}</span>
      <span className={`font-semibold ${valueColor}`}>{value}</span>
    </div>
  );
}

function GapRow({ q, label, level }: { q: string; label: string; level: "Critical" | "High" }) {
  const color = level === "Critical" ? "text-white" : "text-vantage-black-10";
  const dot = level === "Critical" ? "bg-white" : "bg-vantage-teal";
  return (
    <div className="flex items-center gap-2">
      <span className={`inline-block w-1.5 h-1.5 rounded-full ${dot}`} />
      <span className="text-vantage-black-50">{q}</span>
      <span className={`flex-1 truncate ${color}`}>{label}</span>
    </div>
  );
}
