import { type ReactNode } from "react";

export type CardVariant = "light" | "dark" | "bordered" | "metric" | "terminal";

const variantClass: Record<CardVariant, string> = {
  light: "bg-white border border-black",
  dark: "bg-black text-white",
  bordered: "border border-black bg-transparent",
  metric: "bg-white border border-black",
  terminal: "bg-black text-white border border-white",
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
