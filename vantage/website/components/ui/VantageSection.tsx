import { type ReactNode } from "react";

export type SectionVariant = "dark" | "light" | "grey" | "gold";

const variantClass: Record<SectionVariant, string> = {
  dark: "bg-black text-white",
  light: "bg-white text-black",
  grey: "bg-white text-black",
  gold: "bg-black text-white",
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
