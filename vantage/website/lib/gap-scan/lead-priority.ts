export function getFollowUpPriority(
  riskBand: string,
  upcomingAudit: string,
  recentFailedAudit: string,
  q25Doc1: string,
  q25Doc2: string = "",
  q25Doc3: string = ""
): string {
  // Recent failed audit forces same day regardless of risk band
  if (recentFailedAudit === "yes") return "Same day";
  if (riskBand === "Critical Risk") return "Same day";
  if (riskBand === "High Risk") return "Same day";
  const hasQ25Doc = q25Doc1.trim() || q25Doc2.trim() || q25Doc3.trim();
  if (riskBand === "Medium Risk" && (upcomingAudit === "yes" || hasQ25Doc)) return "Within 24 hours";
  if (riskBand === "Medium Risk") return "Within 5 days";
  return "30-day re-contact";
}

export function getNextActionDate(priority: string): string {
  const d = new Date();
  if (priority === "Within 24 hours") d.setDate(d.getDate() + 1);
  else if (priority === "Within 5 days") d.setDate(d.getDate() + 5);
  else if (priority === "30-day re-contact") d.setDate(d.getDate() + 30);
  return d.toISOString().split("T")[0];
}

export function getRecommendedOffer(riskBand: string, sprintTriggered: boolean): string {
  if (riskBand === "Low Risk" && !sprintTriggered) return "Document health check";
  if (riskBand === "Medium Risk" && !sprintTriggered) return "BLA 2026 Compliance Sprint (soft)";
  return "BLA 2026 Compliance Sprint";
}

export function getWhatsAppTemplate(riskBand: string): "A" | "B" | "C" {
  if (riskBand === "High Risk" || riskBand === "Critical Risk") return "A";
  if (riskBand === "Medium Risk") return "B";
  return "C";
}
