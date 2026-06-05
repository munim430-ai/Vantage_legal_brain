import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Legal Disclaimer — VANTAGE Compliance Services",
  description:
    "VANTAGE service boundary statement. Compliance guidance and audit-preparation support only. Not a law firm. No audit outcome guaranteed.",
};

const today = new Date().toLocaleDateString("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export default function DisclaimerPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header variant="dark" />
      <main className="flex-1">
        {/* Dark header band */}
        <div className="bg-vantage-black text-white py-12 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-vantage-black-50 mb-4">
              Legal Document
            </p>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight leading-tight">
              Legal Disclaimer and Service Boundary Statement
            </h1>
            <p className="text-sm text-vantage-black-50 mt-3">
              Keystone Consultancy trading as VANTAGE · Last updated: {today}
            </p>
          </div>
        </div>

        {/* Document body */}
        <div className="bg-white py-12">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="space-y-10">
              <Section title="1. Who We Are">
                <p>
                  Keystone Consultancy is a compliance technology and advisory service operating
                  under the trading name VANTAGE. We are registered in Bangladesh.
                </p>
                <p>
                  VANTAGE is not a law firm. We do not employ licensed advocates. We do not
                  provide legal advice as defined under the Bangladesh Bar Council Act or any
                  equivalent legislation.
                </p>
              </Section>

              <Section title="2. What We Do">
                <p>VANTAGE provides:</p>
                <ol className="list-[lower-alpha] pl-5 space-y-2">
                  <li>
                    Compliance guidance based on the Bangladesh Labour Act 2006 (BLA 2006) and
                    its 2013 and 2018 amendments, BEPZA regulations, and related international
                    audit frameworks.
                  </li>
                  <li>
                    Audit-preparation support — helping factories identify gaps between their
                    current documentation and the evidence requirements of international labour
                    assessments (including BSCI, WRAP, SA8000, Sedex/SMETA, and Better Work).
                  </li>
                  <li>
                    Documentation services — drafting, redrafting, and reviewing factory HR
                    policies, registers, and employment documents to align with BLA 2006
                    requirements.
                  </li>
                  <li>
                    Worker Voice services — operating a WhatsApp-based anonymous grievance intake
                    system for factory workers.
                  </li>
                  <li>
                    Regulatory intelligence — producing a monthly summary of Bangladesh labour
                    law changes and audit standard updates.
                  </li>
                </ol>
              </Section>

              <Section title="3. What We Do Not Do">
                <p>VANTAGE does not:</p>
                <ol className="list-[lower-alpha] pl-5 space-y-2">
                  <li>Provide legal advice or legal opinions.</li>
                  <li>
                    Represent factories in any legal proceeding, labour court, or government
                    inspection.
                  </li>
                  <li>Certify factories as compliant with any standard.</li>
                  <li>
                    Guarantee that a factory will pass any audit or receive any specific audit
                    result.
                  </li>
                  <li>
                    Act as a representative, affiliate, or approved partner of any audit body,
                    buyer, or government agency unless explicitly and separately stated.
                  </li>
                </ol>
                <p>
                  Factories requiring legal advice should consult a licensed advocate.
                </p>
              </Section>

              <Section title="4. Compliance Score and Gap Scan Disclaimer">
                <p>
                  The VANTAGE Free Gap Scan produces a compliance score and risk assessment based
                  on the answers and documents provided during the session.
                </p>
                <p>This score is compliance guidance only. It is not:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>an audit result</li>
                  <li>a certification</li>
                  <li>a verified compliance determination</li>
                  <li>a legal opinion</li>
                </ul>
                <p>
                  The score may change if additional documents are reviewed or if the factory
                  updates its records. The gap scan is a point-in-time assessment of visible
                  documentation and process gaps.
                </p>
                <p>
                  Third-party audit outcomes are determined solely by the relevant audit body
                  and its assessors. VANTAGE has no influence over third-party audit results.
                </p>
              </Section>

              <Section title="5. Limitation of Liability">
                <p>
                  In no event shall Keystone Consultancy&apos;s liability to any client exceed
                  the total fees paid by that client for the specific service giving rise to the
                  claim in the three months immediately before the claim.
                </p>
                <p>
                  Keystone Consultancy accepts no liability for audit outcomes, buyer decisions,
                  regulatory enforcement actions, or business losses arising from compliance gaps
                  identified or not identified during a gap scan or Sprint engagement.
                </p>
              </Section>

              <Section title="6. Confidentiality and Data Handling">
                <p>
                  Keystone Consultancy treats all factory documents, worker data, audit records,
                  and buyer relationships as strictly confidential.
                </p>
                <p>
                  We do not share client information with any third party without written consent,
                  except as required by Bangladesh law.
                </p>
                <p>
                  Worker grievance data collected through the Worker Voice service is held
                  separately. Individual grievances are not disclosed to factory management
                  without the worker&apos;s informed consent, except where there is an imminent
                  risk to worker safety.
                </p>
                <p>
                  Data submitted through this website is used solely for the purpose of providing
                  VANTAGE services and following up on gap scan submissions. We do not sell or
                  license client data.
                </p>
              </Section>

              <Section title="7. Intellectual Property">
                <p>
                  All VANTAGE deliverables — including gap reports, corrective action plans,
                  policy templates, and Intelligence Briefs — are produced by Keystone
                  Consultancy.
                </p>
                <p>
                  Upon full payment, the client receives a licence to use the deliverables for
                  their own compliance purposes. Keystone Consultancy retains ownership of all
                  templates, methodologies, and tools.
                </p>
                <p>
                  Clients may not resell, redistribute, or represent VANTAGE deliverables as
                  their own work.
                </p>
              </Section>

              <Section title="8. Governing Law">
                <p>
                  These terms are governed by the laws of Bangladesh. Any dispute arising from
                  VANTAGE services will be subject to mediation in the first instance, followed
                  by the jurisdiction of the courts of Dhaka, Bangladesh.
                </p>
              </Section>

              <Section title="9. Contact">
                <p>For questions about this disclaimer or our service boundaries:</p>
                <address className="not-italic text-vantage-dark-grey space-y-1 mt-2">
                  <div className="font-medium text-vantage-black">
                    Keystone Consultancy trading as VANTAGE
                  </div>
                  <div>
                    WhatsApp:{" "}
                    <a
                      href="https://wa.me/8801941646278"
                      className="text-vantage-teal underline hover:text-vantage-black transition-colors"
                    >
                      +8801941646278
                    </a>
                  </div>
                  <div>
                    Website:{" "}
                    <Link
                      href="/"
                      className="text-vantage-teal underline hover:text-vantage-black transition-colors"
                    >
                      govantage.vercel.app
                    </Link>
                  </div>
                </address>
              </Section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-base font-bold text-vantage-black mb-3 pb-2 border-b border-vantage-black-10 tracking-tight">
        {title}
      </h2>
      <div className="text-sm text-vantage-dark-grey space-y-3 leading-relaxed">
        {children}
      </div>
    </section>
  );
}
