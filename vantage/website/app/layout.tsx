import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VANTAGE — RMG Compliance Readiness",
  description: "Document control, CAP support, regulatory intelligence and multi-framework preparation for Bangladesh RMG factories.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body className="min-h-screen">{children}</body></html>;
}
