import { CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useCartStore } from "@/store/cart.store";

import {
  calculateDiscount,
  calculateFinalTotal,
  calculateSubtotal,
  calculateTax,
} from "@/utils/cart.utils";
import { useNavigate } from "react-router-dom";

interface PaymentSummaryStepProps {
  onBack: () => void;
}

const PaymentSummaryStep = ({
  onBack,
}: PaymentSummaryStepProps) => {
  const items = useCartStore((state) => state.items);

  const subtotal = calculateSubtotal(items);
  const tax = calculateTax(subtotal);
  const discount = calculateDiscount(subtotal);
  const finalTotal = calculateFinalTotal(subtotal);

  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    console.log("Order placed");

    navigate("/order-success");
  };

  return (
    <div className="mx-auto max-w-3xl">
      <Card>
        <CardHeader>
          <CardTitle>Payment Summary</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Payment Method */}
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

          {/* Order Summary */}
          <div>
            <h3 className="mb-4 font-medium">
              Order Summary
            </h3>

            <div className="space-y-3">
              {/* Subtotal */}
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              {/* Tax */}
              <div className="flex justify-between">
                <span>Tax (5%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>

              {/* Discount */}
              <div className="flex justify-between">
                <span>Discount</span>

                <span className="text-green-600">
                  -${discount.toFixed(2)}
                </span>
              </div>

              {/* Final Total */}
              <div className="border-t pt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={onBack}
            >
              Back
            </Button>

            <Button
              onClick={handlePlaceOrder}
              disabled={items.length === 0}
            >
              Place Order
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentSummaryStep;