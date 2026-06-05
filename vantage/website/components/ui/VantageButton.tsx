import Link from "next/link";
import { type ReactNode } from "react";

export type ButtonVariant = "primary" | "dark" | "secondaryDark" | "secondaryLight" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

const variantClass: Record<ButtonVariant, string> = {
  primary: "bg-black text-white hover:opacity-80",
  dark: "bg-black text-white hover:opacity-80",
  secondaryDark: "border border-white text-white hover:bg-white hover:text-black",
  secondaryLight: "border border-black text-black hover:bg-black hover:text-white",
  ghost: "text-black underline hover:opacity-60",
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
      className={`${cls} disabled:opacity-40 disabled:cursor-not-allowed`}
    >
      {children}
    </button>
  );
}
