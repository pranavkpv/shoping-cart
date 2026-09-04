import { CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface PaymentSummaryStepProps {
  onBack: () => void;
}

const PaymentSummaryStep = ({
  onBack,
}: PaymentSummaryStepProps) => {
  const subtotal = 239.97;
  const shipping = 0;
  const total = subtotal + shipping;

  const handlePlaceOrder = () => {
    // TODO: Call your place-order API here
    console.log("Order placed");
  };

  return (
    <div className="mx-auto max-w-3xl">
      <Card>
        <CardHeader>
          <CardTitle>Payment Summary</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="flex items-center gap-3 rounded-lg border p-4">
            <CheckCircle2 className="h-5 w-5 text-primary" />

            <div>
              <p className="font-medium">
                Payment Method
              </p>

              <p className="text-sm text-muted-foreground">
                Cash on Delivery
              </p>
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-medium">
              Order Summary
            </h3>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>
                  {shipping === 0
                    ? "Free"
                    : `$${shipping.toFixed(2)}`}
                </span>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between">
            <Button variant="outline" onClick={onBack}>
              Back
            </Button>

            <Button onClick={handlePlaceOrder}>
              Place Order
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentSummaryStep;