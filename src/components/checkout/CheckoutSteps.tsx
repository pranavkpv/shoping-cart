import { Check } from "lucide-react";

interface CheckoutStepsProps {
  currentStep: number;
}

const steps = [
  {
    number: 1,
    title: "Cart Review",
  },
  {
    number: 2,
    title: "Shipping",
  },
  {
    number: 3,
    title: "Payment Summary",
  },
];

const CheckoutSteps = ({ currentStep }: CheckoutStepsProps) => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = currentStep > step.number;
          const isCurrent = currentStep === step.number;

          return (
            <div key={step.number} className="flex flex-1 items-center">
              <div className="flex flex-1 sm:flex-initial items-center gap-2 sm:gap-3">
                {/* Badge Number / Check */}
                <div
                  className={`flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full border-2 text-xs sm:text-sm font-semibold transition-all duration-200 ${
                    isCompleted
                      ? "border-primary bg-primary text-primary-foreground shadow-xs"
                      : isCurrent
                      ? "border-primary bg-primary/10 text-primary ring-4 ring-primary/10"
                      : "border-muted-foreground/30 bg-muted/20 text-muted-foreground"
                  }`}
                >
                  {isCompleted ? (
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 stroke-[2.5]" />
                  ) : (
                    step.number
                  )}
                </div>

                {/* Step Title */}
                <span
                  className={`text-xs sm:text-sm transition-colors ${
                    isCurrent
                      ? "font-semibold text-foreground"
                      : isCompleted
                      ? "font-medium text-foreground/80"
                      : "text-muted-foreground hidden sm:inline"
                  }`}
                >
                  {step.title}
                </span>
              </div>

              {/* Connecting Line */}
              {index < steps.length - 1 && (
                <div
                  className={`mx-2 sm:mx-6 h-[2px] flex-1 rounded-full transition-colors duration-300 ${
                    currentStep > step.number ? "bg-primary" : "bg-border/60"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CheckoutSteps;