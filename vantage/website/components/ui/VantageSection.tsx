import { type ReactNode } from "react";

export type SectionVariant = "dark" | "light" | "grey" | "gold";

const variantClass: Record<SectionVariant, string> = {
  dark: "bg-vantage-black text-white",
  light: "bg-white text-vantage-black",
  grey: "bg-vantage-light-grey text-vantage-black",
  gold: "bg-vantage-gold text-vantage-black",
};

interface VantageSectionProps {
  variant?: SectionVariant;
  className?: string;
  children: ReactNode;
  id?: string;
}

export default function VantageSection({
  variant = "light",
  className = "",
  children,
  id,
}: VantageSectionProps) {
  return (
    <section
      id={id}
      className={`py-16 md:py-24 overflow-x-hidden ${variantClass[variant]} ${className}`}
    >
      {children}
    </section>
  );
}
