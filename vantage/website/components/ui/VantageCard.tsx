import { type ReactNode } from "react";

export type CardVariant = "light" | "dark" | "bordered" | "metric" | "terminal";

const variantClass: Record<CardVariant, string> = {
  light: "bg-white border border-vantage-black-10",
  dark: "bg-vantage-black text-white",
  bordered: "border border-vantage-black-10 bg-transparent",
  metric: "bg-vantage-light-grey",
  terminal: "bg-vantage-black text-white border border-vantage-black-70",
};

interface VantageCardProps {
  variant?: CardVariant;
  className?: string;
  children: ReactNode;
}

export default function VantageCard({
  variant = "light",
  className = "",
  children,
}: VantageCardProps) {
  return (
    <div className={`rounded-2xl p-6 ${variantClass[variant]} ${className}`}>
      {children}
    </div>
  );
}
