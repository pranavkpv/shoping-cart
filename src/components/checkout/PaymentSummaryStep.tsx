import { useNavigate } from "react-router-dom";
import { CheckCircle2, ArrowLeft, CreditCard, ShieldCheck, ShoppingBag } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { useCartStore } from "@/store/cart.store";

import {
  calculateDiscount,
  calculateFinalTotal,
  calculateSubtotal,
  calculateTax,
} from "@/utils/cart.utils";

interface PaymentSummaryStepProps {
  onBack: () => void;
}

const PaymentSummaryStep = ({ onBack }: PaymentSummaryStepProps) => {
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);

  const subtotal = calculateSubtotal(items);
  const tax = calculateTax(subtotal);
  const discount = calculateDiscount(subtotal);
  const finalTotal = calculateFinalTotal(subtotal);

  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    clearCart();
    navigate("/order-success");
  };

  return (
    <div className="mx-auto max-w-2xl">
      <Card className="border-border/60 shadow-xs">
        <CardHeader className="border-b border-border/40 bg-muted/20 px-4 py-4 sm:px-6">
          <CardTitle className="text-base sm:text-lg font-bold text-foreground flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-primary" />
            <span>Payment Summary</span>
          </CardTitle>
        </CardHeader>

        <CardContent className="p-4 sm:p-6 space-y-6">
          {/* Payment Method Selected */}
          <div className="flex items-center gap-3.5 rounded-lg border border-primary/20 bg-primary/5 p-4">
            <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
            <div className="space-y-0.5">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Selected Payment Method
              </p>
              <p className="text-sm font-semibold text-foreground">
                Cash on Delivery (COD)
              </p>
            </div>
          </div>

          {/* Items Preview */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <ShoppingBag className="h-3.5 w-3.5" /> Order Items ({items.length})
            </h3>

            <div className="rounded-lg border border-border/60 divide-y divide-border/60 max-h-48 overflow-y-auto p-2 bg-muted/10">
              {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-2 text-sm">
                  <div className="flex items-center gap-3 min-w-0 pr-2">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="h-10 w-10 rounded-md object-cover border border-border/60 shrink-0"
                    />
                    <span className="truncate font-medium text-foreground">
                      {item.title}
                    </span>
                  </div>
                  <div className="text-right whitespace-nowrap text-xs sm:text-sm">
                    <span className="text-muted-foreground">x{item.quantity} </span>
                    <span className="font-semibold text-foreground">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="space-y-3 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span className="font-medium text-foreground">${subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-muted-foreground">
              <span>Estimated Tax (5%)</span>
              <span className="font-medium text-foreground">${tax.toFixed(2)}</span>
            </div>

            {discount > 0 && (
              <div className="flex justify-between text-muted-foreground">
                <span>Discount</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                  -${discount.toFixed(2)}
                </span>
              </div>
            )}

            <Separator className="my-2" />

            <div className="flex justify-between items-baseline pt-1">
              <span className="text-base font-bold text-foreground">Total Amount</span>
              <span className="text-2xl font-extrabold text-foreground">
                ${finalTotal.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between gap-4 pt-4 border-t border-border/60">
            <Button variant="outline" onClick={onBack} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </Button>

            <Button
              onClick={handlePlaceOrder}
              disabled={items.length === 0}
              className="gap-2 font-semibold h-11 px-6 shadow-xs"
            >
              <ShieldCheck className="h-4 w-4" />
              <span>Place Order</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentSummaryStep;