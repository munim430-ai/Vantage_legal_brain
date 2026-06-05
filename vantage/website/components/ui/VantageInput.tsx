import {
  type InputHTMLAttributes,
  type TextareaHTMLAttributes,
  type SelectHTMLAttributes,
} from "react";

const base =
  "w-full text-sm border rounded px-3 py-2.5 focus:outline-none transition-colors bg-white text-black";
const normalState = "border-black focus:ring-1 focus:ring-black";
const errorState = "border-2 border-black focus:ring-1 focus:ring-black";

export function inputClass(hasError: boolean): string {
  return `${base} ${hasError ? errorState : normalState}`;
}

// ── Input ──────────────────────────────────────────────────────────────────

interface VantageInputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

export function VantageInput({
  hasError = false,
  className = "",
  ...rest
}: VantageInputProps) {
  return (
    <input {...rest} className={`${inputClass(hasError)} ${className}`} />
  );
}

// ── Textarea ───────────────────────────────────────────────────────────────

interface VantageTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasError?: boolean;
}

export function VantageTextarea({
  hasError = false,
  className = "",
  ...rest
}: VantageTextareaProps) {
  return (
    <textarea
      {...rest}
      className={`${inputClass(hasError)} resize-none ${className}`}
    />
  );
}

// ── Select ─────────────────────────────────────────────────────────────────

interface VantageSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  hasError?: boolean;
}

export function VantageSelect({
  hasError = false,
  className = "",
  ...rest
}: VantageSelectProps) {
  return (
    <select {...rest} className={`${inputClass(hasError)} ${className}`} />
  );
}
