export type AnswerValue = "yes" | "no" | "not_sure" | "not_applicable";

export interface QuestionAnswer {
  questionId: number;
  answer: AnswerValue | null;
  evidenceNote: string;
}

export interface GapScanFormData {
  // Step 1 — Factory Profile
  factory_name: string;
  factory_address: string;
  district_zone: string;
  worker_count_range: string;
  main_products: string;
  main_buyers: string;
  audit_frameworks: string[];

  // Step 2 — Contact Profile
  contact_name: string;
  contact_role: string;
  whatsapp_number: string;
  email: string;
  decision_maker_present: string;

  // Step 3 — Audit Urgency
  upcoming_audit: string;
  upcoming_audit_date: string;
  recent_failed_audit: string;
  cap_deadline: string;
  buyer_pressure: string;

  // Step 4 — Answers (Q1–Q24)
  answers: QuestionAnswer[];

  // Q25 — short answer
  q25_doc1: string;
  q25_doc2: string;
  q25_doc3: string;
}

export interface ScoringResult {
  riskScore: number;
  complianceScore: number;
  riskBand: "Low Risk" | "Medium Risk" | "High Risk" | "Critical Risk";
  sprintTriggered: boolean;
  triggers: {
    documentBlackHole: boolean;
    welfareCluster: boolean;
    harassmentCluster: boolean;
    wageEvidenceAbsent: boolean;
    childLabourExposure: boolean;
    openCapUnmanaged: boolean;
    criticalThreshold: boolean;
  };
  topGaps: { questionId: number; theme: string; riskLevel: string }[];
  missingDocuments: string[];
  criticalCount: number;
  highCount: number;
  mediumCount: number;
}
