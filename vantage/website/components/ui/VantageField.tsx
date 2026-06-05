import { type ReactNode } from "react";

interface VantageFieldProps {
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: ReactNode;
}

export default function VantageField({
  label,
  required,
  error,
  hint,
  children,
}: VantageFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-vantage-black mb-1.5">
        {label}
        {required && (
          <span className="text-vantage-gold ml-1 font-bold" title="Required">
            ·
          </span>
        )}
      </label>
      {children}
      {hint && !error && (
        <p className="text-xs text-vantage-medium-grey mt-1">{hint}</p>
      )}
      {error && (
        <p className="text-xs text-vantage-gold mt-1 font-medium">{error}</p>
      )}
    </div>
  );
}
