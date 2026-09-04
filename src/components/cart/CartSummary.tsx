import { Link } from "react-router-dom";

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

const CartSummary = () => {
  const items = useCartStore((state) => state.items);

  const subtotal = calculateSubtotal(items);
  const tax = calculateTax(subtotal);
  const discount = calculateDiscount(subtotal);
  const finalTotal = calculateFinalTotal(subtotal);

  const canCheckout =
    subtotal >= MINIMUM_CHECKOUT_VALUE;

  const remainingAmount = Math.max(
    MINIMUM_CHECKOUT_VALUE - subtotal,
    0
  );

  return (
    <div className="rounded-lg border bg-card p-6">
      <h2 className="mb-4 text-xl font-semibold">
        Cart Summary
      </h2>

      <div className="space-y-3">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span>Tax (5%)</span>
          <span>${tax.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span>Discount</span>
          <span className="text-green-600">
            -${discount.toFixed(2)}
          </span>
        </div>

        <Separator />

        <div className="flex justify-between text-lg font-bold">
          <span>Final Total</span>
          <span>${finalTotal.toFixed(2)}</span>
        </div>
      </div>

      {!canCheckout && (
        <p className="mt-4 text-sm text-destructive">
          Add ${remainingAmount.toFixed(2)} more to
          reach the minimum checkout value of $
          {MINIMUM_CHECKOUT_VALUE.toFixed(2)}.
        </p>
      )}

      <Button
        disabled={!canCheckout}
        className="mt-6 w-full"
      >
        {canCheckout ? (
          <Link to="/checkout">Checkout</Link>
        ) : (
          <span>Checkout</span>
        )}
      </Button>
    </div>
  );
};

export default CartSummary;