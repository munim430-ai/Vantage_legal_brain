"use client";

const STEPS = [
  "Factory Details",
  "Your Details",
  "Audit Urgency",
  "Gap Scan Questions",
  "Review & Submit",
];

interface ProgressIndicatorProps {
  currentStep: number;
}

export default function ProgressIndicator({ currentStep }: ProgressIndicatorProps) {
  return (
    <div className="w-full overflow-x-hidden">
      <div className="flex items-center">
        {STEPS.map((label, i) => {
          const step = i + 1;
          const isComplete = step < currentStep;
          const isCurrent = step === currentStep;
          return (
            <div key={label} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                    isComplete
                      ? "bg-vantage-teal text-white"
                      : isCurrent
                      ? "bg-vantage-gold text-vantage-black"
                      : "bg-vantage-light-grey text-vantage-medium-grey"
                  }`}
                >
                  {isComplete ? "✓" : step}
                </div>
                <span
                  className={`hidden sm:block text-[10px] mt-1 text-center max-w-[68px] leading-tight ${
                    isCurrent
                      ? "text-vantage-black font-medium"
                      : "text-vantage-medium-grey"
                  }`}
                >
                  {label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={`flex-1 h-px mx-1.5 transition-colors ${
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
