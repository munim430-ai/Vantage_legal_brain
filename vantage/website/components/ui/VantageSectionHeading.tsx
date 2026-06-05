import { type ReactNode } from "react";
import VantageEyebrow, { type EyebrowVariant } from "./VantageEyebrow";

interface VantageSectionHeadingProps {
  eyebrow?: string;
  eyebrowVariant?: EyebrowVariant;
  title: string | ReactNode;
  subtitle?: string;
  maxWidth?: string;
  dark?: boolean;
  className?: string;
}

export default function VantageSectionHeading({
  eyebrow,
  eyebrowVariant = "grey",
  title,
  subtitle,
  maxWidth = "max-w-2xl",
  dark = false,
  className = "",
}: VantageSectionHeadingProps) {
  return (
    <div className={`${maxWidth} ${className}`}>
      {eyebrow && (
        <VantageEyebrow variant={eyebrowVariant} className="mb-4">
          {eyebrow}
        </VantageEyebrow>
      )}
      <h2
        className={`text-2xl md:text-3xl lg:text-4xl font-black tracking-tight leading-tight ${
          dark ? "text-white" : "text-vantage-black"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-base leading-relaxed ${
            dark ? "text-vantage-black-10" : "text-vantage-dark-grey"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
