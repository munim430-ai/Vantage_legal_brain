import Link from "next/link";
import { type ReactNode } from "react";

export type ButtonVariant = "primary" | "dark" | "secondaryDark" | "secondaryLight" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

const variantClass: Record<ButtonVariant, string> = {
  primary: "bg-vantage-gold text-vantage-black hover:brightness-110",
  dark: "bg-vantage-black text-white hover:bg-vantage-black-90",
  secondaryDark: "border border-white/30 text-white hover:bg-white/10 hover:border-white/60",
  secondaryLight: "border border-vantage-black text-vantage-black hover:bg-vantage-light-grey",
  ghost: "text-vantage-black-30 hover:text-white",
};

const sizeClass: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-7 py-4 text-base",
};

interface VantageButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
  href?: string;
  external?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  fullWidth?: boolean;
}

export default function VantageButton({
  variant = "primary",
  size = "md",
  className = "",
  children,
  href,
  external = false,
  onClick,
  disabled,
  type = "button",
  fullWidth = false,
}: VantageButtonProps) {
  const cls = [
    "inline-flex items-center justify-center font-semibold rounded-full transition-all",
    variantClass[variant],
    sizeClass[size],
    fullWidth ? "w-full" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${cls} disabled:opacity-60 disabled:cursor-not-allowed`}
    >
      {children}
    </button>
  );
}
