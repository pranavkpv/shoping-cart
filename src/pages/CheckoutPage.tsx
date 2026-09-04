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
    <section className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Checkout</h1>
        <p className="text-muted-foreground">
          Complete your order in a few simple steps.
        </p>
      </div>

      <CheckoutSteps currentStep={currentStep} />

      <div className="mt-8">
        {currentStep === 1 && (
          <CartReviewStep onNext={handleNext} />
        )}

        {currentStep === 2 && (
          <ShippingStep
            onNext={handleNext}
            onBack={handleBack}
          />
        )}

        {currentStep === 3 && (
          <PaymentSummaryStep onBack={handleBack} />
        )}
      </div>
    </section>
  );
};

export default CheckoutPage;