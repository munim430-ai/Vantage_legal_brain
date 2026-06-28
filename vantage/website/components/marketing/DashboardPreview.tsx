import { WHATSAPP_SCAN } from "@/lib/brand/tokens";
import MotionReveal from "@/components/ui/MotionReveal";

const modules = [
  { id: "01", title: "Worker personnel files", detail: "Appointment, identity, service and acknowledgement records" },
  { id: "02", title: "Attendance records", detail: "Daily attendance, working-hour and shift evidence" },
  { id: "03", title: "Wage and overtime files", detail: "Calculations, approvals, deductions and payment evidence" },
  { id: "04", title: "Leave and maternity files", detail: "Entitlement, approval, payment and return-to-work records" },
  { id: "05", title: "Health and safety records", detail: "Training, inspection, incident and corrective-action evidence" },
  { id: "06", title: "Fire and emergency records", detail: "Drills, equipment checks, plans and renewal tracking" },
  { id: "07", title: "Policies and procedures", detail: "Current versions, approvals, translations and implementation evidence" },
  { id: "08", title: "Worker grievance records", detail: "Intake, review, action, closure and confidentiality controls" },
  { id: "09", title: "Committee records", detail: "Formation, meetings, attendance, decisions and follow-up" },
  { id: "10", title: "Licences and certificates", detail: "Validity, renewal dates, ownership and document location" },
  { id: "11", title: "CAP and remediation files", detail: "Owners, deadlines, evidence status and repeat-action control" },
  { id: "12", title: "Buyer and audit evidence", detail: "Framework mapping, buyer requests and submission readiness" },
];

export default function DashboardPreview() {
  return (
    <>
      <section className="bg-white py-16 md:py-24 overflow-x-hidden border-t border-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <MotionReveal variant="blurIn" className="max-w-2xl mb-10">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-black mb-4">
              Free Document Risk Scan
            </p>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-black tracking-tight leading-tight">
              Twelve file categories. One clear risk position.
            </h2>
            <p className="text-black mt-4 text-base leading-relaxed">
              The scan checks whether essential records are available, current, consistent and ready to support buyer, audit and management review.
            </p>
          </MotionReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {modules.map((module, i) => (
              <MotionReveal key={module.title} variant="scaleIn" delay={i * 50}>
                <div className="border border-black rounded-xl p-5 hover:bg-black hover:text-white transition-all group h-full">
                  <div className="text-[10px] font-mono text-black group-hover:text-white mb-3">{module.id}</div>
                  <h3 className="font-bold text-black group-hover:text-white mb-2 text-sm leading-snug">{module.title}</h3>
                  <p className="text-xs text-black group-hover:text-white leading-relaxed">{module.detail}</p>
                </div>
              </MotionReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-black text-white py-12 overflow-x-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <MotionReveal variant="lineWipe">
            <h3 className="text-xs font-semibold text-white uppercase tracking-widest mb-4">
              Multi-framework preparation
            </h3>
            <p className="text-white mb-3 max-w-3xl text-sm leading-relaxed">
              VANTAGE maps document and remediation work against the factory&apos;s relevant requirements, including <span className="font-semibold">BSCI · SMETA · RSC · WRAP · SLCP · buyer-specific requirements</span>.
            </p>
            <p className="text-xs text-white max-w-3xl">
              Framework names are used for preparation and requirement mapping only. VANTAGE is not affiliated with or authorised by these organisations.
            </p>
          </MotionReveal>
        </div>
      </section>

      <section className="bg-white text-black py-16 md:py-24 overflow-x-hidden border-t border-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <MotionReveal variant="blurIn">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-black mb-4">Start Here</p>
            <h2 className="text-3xl md:text-4xl font-black mb-3 tracking-tight text-black">
              Find the document risk before the next deadline.
            </h2>
            <p className="text-black mb-9 max-w-xl mx-auto text-base leading-relaxed">
              Message SCAN to start the free 12-file document risk review.
            </p>
            <a
              href={WHATSAPP_SCAN}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex bg-black text-white font-bold px-8 py-4 rounded-full hover:opacity-80 transition-all text-sm"
            >
              WhatsApp SCAN
            </a>
          </MotionReveal>
        </div>
      </section>
    </>
  );
}
