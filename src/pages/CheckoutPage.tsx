import { useState } from "react";

import CheckoutSteps from "../components/checkout/CheckoutSteps";
import CartReviewStep from "../components/checkout/CartReviewStep";
import ShippingStep from "../components/checkout/ShippingStep";
import PaymentSummaryStep from "../components/checkout/PaymentSummaryStep";

type CheckoutStep = 1 | 2 | 3;

const CheckoutPage = () => {
  const [currentStep, setCurrentStep] = useState<CheckoutStep>(1);

  const handleNext = () => {
    setCurrentStep((prev) => {
      if (prev < 3) {
        return (prev + 1) as CheckoutStep;
      }
      return prev;
    });
  };

  const handleBack = () => {
    setCurrentStep((prev) => {
      if (prev > 1) {
        return (prev - 1) as CheckoutStep;
      }
      return prev;
    });
  };

  return (
    <section className="container mx-auto max-w-6xl px-4 py-8 sm:py-12">
      {/* Header */}
      <div className="mb-8 text-center sm:text-left">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Checkout
        </h1>
        <p className="mt-1.5 text-sm sm:text-base text-muted-foreground">
          Complete your purchase in a few simple steps.
        </p>
      </div>

      {/* Progress Tracker */}
      <div className="mb-10 rounded-xl border border-border/60 bg-card p-4 sm:p-6 shadow-xs">
        <CheckoutSteps currentStep={currentStep} />
      </div>

      {/* Step Components */}
      <div>
        {currentStep === 1 && <CartReviewStep onNext={handleNext} />}

        {currentStep === 2 && (
          <ShippingStep onNext={handleNext} onBack={handleBack} />
        )}

        {currentStep === 3 && <PaymentSummaryStep onBack={handleBack} />}
      </div>
    </section>
  );
};

export default CheckoutPage;