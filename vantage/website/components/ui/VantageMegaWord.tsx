export type MegaWordVariant = "gold" | "black" | "white" | "teal" | "subtle";

const variantClass: Record<MegaWordVariant, string> = {
  gold: "text-vantage-gold",
  black: "text-vantage-black",
  white: "text-white",
  teal: "text-vantage-teal",
  subtle: "text-white/5",
};

interface VantageMegaWordProps {
  word: string;
  variant?: MegaWordVariant;
  className?: string;
}

export default function VantageMegaWord({
  word,
  variant = "gold",
  className = "",
}: VantageMegaWordProps) {
  return (
    <div
      className="pointer-events-none select-none overflow-hidden"
      aria-hidden="true"
    >
      <p
        className={`text-[24vw] md:text-[22vw] font-black tracking-[-0.08em] text-center whitespace-nowrap overflow-hidden ${variantClass[variant]} ${className}`}
        style={{ lineHeight: "0.82" }}
      >
        {word}
      </p>
    </div>
  );
}
