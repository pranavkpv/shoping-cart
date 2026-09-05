import { Link } from "react-router-dom";
import { ArrowRight, AlertCircle, ShieldCheck } from "lucide-react";

import { useCartStore } from "../../store/cart.store";
import {
  calculateDiscount,
  calculateFinalTotal,
  calculateSubtotal,
  calculateTax,
  MINIMUM_CHECKOUT_VALUE,
} from "../../utils/cart.utils";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const CartSummary = () => {
  const items = useCartStore((state) => state.items);

  const subtotal = calculateSubtotal(items);
  const tax = calculateTax(subtotal);
  const discount = calculateDiscount(subtotal);
  const finalTotal = calculateFinalTotal(subtotal);

  const canCheckout = subtotal >= MINIMUM_CHECKOUT_VALUE;
  const remainingAmount = Math.max(MINIMUM_CHECKOUT_VALUE - subtotal, 0);

  return (
    <Card className="border-border/60 shadow-xs">
      <CardHeader className="border-b border-border/40 bg-muted/20 pb-4">
        <CardTitle className="text-lg font-bold text-foreground">
          Order Summary
        </CardTitle>
      </CardHeader>

      <CardContent className="p-6 space-y-4">
        {/* Cost Rows */}
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
            <span className="text-base font-bold text-foreground">Final Total</span>
            <span className="text-xl font-extrabold text-foreground">
              ${finalTotal.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Highlighted Minimum Order Warning Banner */}
        {!canCheckout && (
          <div className="flex items-start gap-3 rounded-lg border-2 border-red-500/40 bg-red-500/10 p-3.5 text-xs text-red-600 dark:text-red-400 shadow-sm animate-in fade-in duration-200">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 animate-pulse text-red-600 dark:text-red-400" />
            <p className="leading-relaxed">
              Add <span className="font-extrabold text-red-700 dark:text-red-300 underline underline-offset-2">${remainingAmount.toFixed(2)}</span> more to reach the minimum order limit of ${MINIMUM_CHECKOUT_VALUE.toFixed(2)}.
            </p>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex-col gap-4 bg-muted/10 p-6 border-t border-border/40">
        <Button
          disabled={!canCheckout}
          className="w-full h-11 text-sm font-semibold shadow-xs"
        >
          {canCheckout ? (
            <Link to="/checkout" className="flex items-center justify-center gap-2 w-full h-full">
              <span>Proceed to Checkout</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          ) : (
            <span>Checkout</span>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CartSummary;