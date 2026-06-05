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
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-all duration-300 ease-out ${
                    isComplete
                      ? "bg-black text-white"
                      : isCurrent
                      ? "border-2 border-black text-black bg-white"
                      : "border border-black text-black bg-white"
                  }`}
                >
                  {isComplete ? "✓" : step}
                </div>
                <span
                  className={`hidden sm:block text-[10px] mt-1 text-center max-w-[68px] leading-tight ${
                    isCurrent ? "text-black font-bold" : "text-black"
                  }`}
                >
                  {label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={`flex-1 h-px mx-1.5 ${
                    step < currentStep ? "bg-black" : "bg-black"
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
