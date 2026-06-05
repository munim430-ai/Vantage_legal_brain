"use client";
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

type Variant = "fadeUp" | "blurIn" | "lineWipe" | "scaleIn";

const variantClass: Record<Variant, string> = {
  fadeUp: "motion-fade-up",
  blurIn: "motion-blur-in",
  lineWipe: "motion-line-wipe",
  scaleIn: "motion-scale-in",
};

interface MotionRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  variant?: Variant;
}

export default function MotionReveal({
  children,
  delay = 0,
  className = "",
  variant = "fadeUp",
}: MotionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${variantClass[variant]}${visible ? " motion-visible" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
