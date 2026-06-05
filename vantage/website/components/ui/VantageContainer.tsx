import { type ReactNode } from "react";

interface VantageContainerProps {
  children: ReactNode;
  className?: string;
}

export default function VantageContainer({ children, className = "" }: VantageContainerProps) {
  return (
    <div className={`max-w-6xl mx-auto px-4 sm:px-6 ${className}`}>
      {children}
    </div>
  );
}
