export type EyebrowVariant = "gold" | "grey" | "dark" | "white";

const textClass: Record<EyebrowVariant, string> = {
  gold: "text-white",
  grey: "text-black",
  dark: "text-black",
  white: "text-white",
};

const borderClass: Record<EyebrowVariant, string> = {
  gold: "border-white",
  grey: "border-black",
  dark: "border-black",
  white: "border-white",
};

interface VantageEyebrowProps {
  children: string;
  variant?: EyebrowVariant;
  pill?: boolean;
  className?: string;
}

export default function VantageEyebrow({
  children,
  variant = "dark",
  pill = false,
  className = "",
}: VantageEyebrowProps) {
  const base = "inline-flex items-center text-xs font-semibold uppercase tracking-[0.12em]";
  if (pill) {
    return (
      <div
        className={`${base} px-3 py-1.5 rounded-full border w-fit ${textClass[variant]} ${borderClass[variant]} ${className}`}
      >
        {children}
      </div>
    );
  }
  return (
    <p className={`${base} ${textClass[variant]} ${className}`}>{children}</p>
  );
}
