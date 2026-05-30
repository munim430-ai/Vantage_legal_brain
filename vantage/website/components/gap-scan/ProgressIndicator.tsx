"use client";

const STEPS = [
  "Factory Details",
  "Your Details",
  "Audit Urgency",
  "Gap Scan Questions",
  "Review & Submit",
];

interface ProgressIndicatorProps {
  currentStep: number; // 1-indexed
}

export default function ProgressIndicator({ currentStep }: ProgressIndicatorProps) {
  return (
    <div className="w-full">
      <div className="flex items-center">
        {STEPS.map((label, i) => {
          const step = i + 1;
          const isComplete = step < currentStep;
          const isCurrent = step === currentStep;
          return (
            <div key={label} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 ${
                    isComplete
                      ? "bg-vantage-teal text-white"
                      : isCurrent
                      ? "bg-vantage-black text-white"
                      : "bg-vantage-light-grey text-vantage-medium-grey"
                  }`}
                >
                  {isComplete ? "✓" : step}
                </div>
                <span
                  className={`hidden sm:block text-[10px] mt-1 text-center max-w-[72px] leading-tight ${
                    isCurrent ? "text-vantage-black font-medium" : "text-vantage-medium-grey"
                  }`}
                >
                  {label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-2 ${
                    step < currentStep ? "bg-vantage-teal" : "bg-vantage-light-grey"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
