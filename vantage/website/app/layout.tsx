import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VANTAGE — BLA 2026 Compliance for Bangladesh RMG Factories",
  description:
    "Fix your BLA 2006 gaps before the auditor arrives. Free gap scan. Gap report and corrective action plan delivered in 3–5 working days. BDT 55,000.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
