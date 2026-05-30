import { QUESTIONS, MAX_RISK_SCORE } from "./questions";
import type { GapScanFormData, ScoringResult, QuestionAnswer } from "./schema";

function isNo(answer: QuestionAnswer["answer"]): boolean {
  return answer === "no" || answer === "not_sure";
}

export function scoreQ25(doc1: string, doc2: string, doc3: string): number {
  const filled = [doc1, doc2, doc3].filter((d) => d.trim().length > 0).length;
  if (filled === 0) return 0;
  if (filled === 1) return 3;
  if (filled === 2) return 5;
  return 8;
}

export function calculateScore(data: Partial<GapScanFormData>): ScoringResult {
  const answers = data.answers ?? [];
  const q25Score = scoreQ25(data.q25_doc1 ?? "", data.q25_doc2 ?? "", data.q25_doc3 ?? "");

  let riskScore = 0;
  let criticalCount = 0;
  let highCount = 0;
  let mediumCount = 0;
  const gapList: { questionId: number; theme: string; riskLevel: string; weight: number }[] = [];

  for (const q of QUESTIONS.slice(0, 24)) {
    const ans = answers.find((a) => a.questionId === q.id);
    if (ans && isNo(ans.answer)) {
      riskScore += q.weight;
      if (q.riskLevel === "Critical") criticalCount++;
      if (q.riskLevel === "High") highCount++;
      if (q.riskLevel === "Medium") mediumCount++;
      gapList.push({ questionId: q.id, theme: q.theme, riskLevel: q.riskLevel, weight: q.weight });
    }
  }

  riskScore += q25Score;
  if (q25Score > 0) {
    criticalCount++;
    gapList.push({ questionId: 25, theme: "Audit readiness", riskLevel: "Critical", weight: q25Score });
  }

  const complianceScore = 100 - Math.round((riskScore / MAX_RISK_SCORE) * 100);

  let riskBand: ScoringResult["riskBand"];
  if (riskScore <= 15) riskBand = "Low Risk";
  else if (riskScore <= 35) riskBand = "Medium Risk";
  else if (riskScore <= 60) riskBand = "High Risk";
  else riskBand = "Critical Risk";

  // Sprint triggers
  const getAnswer = (id: number) => answers.find((a) => a.questionId === id)?.answer ?? null;
  const hasCriticalNo = QUESTIONS.filter((q) => q.riskLevel === "Critical" && q.id <= 24).some((q) =>
    isNo(getAnswer(q.id))
  );

  const triggers = {
    documentBlackHole: [data.q25_doc1, data.q25_doc2, data.q25_doc3].filter((d) => (d ?? "").trim().length > 0).length >= 3,
    welfareCluster: isNo(getAnswer(12)) && isNo(getAnswer(13)) && isNo(getAnswer(15)),
    harassmentCluster: isNo(getAnswer(15)) && isNo(getAnswer(16)),
    wageEvidenceAbsent: isNo(getAnswer(8)) && isNo(getAnswer(9)),
    childLabourExposure: isNo(getAnswer(2)),
    openCapUnmanaged: isNo(getAnswer(24)) && hasCriticalNo,
    criticalThreshold: riskScore >= 61,
  };

  const sprintTriggered = Object.values(triggers).some(Boolean);

  const topGaps = gapList
    .sort((a, b) => b.weight - a.weight)
    .slice(0, 5)
    .map(({ questionId, theme, riskLevel }) => ({ questionId, theme, riskLevel }));

  const missingDocuments = [data.q25_doc1, data.q25_doc2, data.q25_doc3]
    .filter((d) => (d ?? "").trim().length > 0) as string[];

  return {
    riskScore,
    complianceScore,
    riskBand,
    sprintTriggered,
    triggers,
    topGaps,
    missingDocuments,
    criticalCount,
    highCount,
    mediumCount,
  };
}
