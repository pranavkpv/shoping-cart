import { Minus, Plus, Trash2 } from "lucide-react";

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

interface CartReviewStepProps {
  onNext: () => void;
}

const CartReviewStep = ({ onNext }: CartReviewStepProps) => {
  const cartItems = useCartStore((state) => state.items);

  const removeFromCart = useCartStore(
    (state) => state.removeFromCart
  );

  const updateQuantity = useCartStore(
    (state) => state.updateQuantity
  );

  // Same calculation logic as CartSummary
  const subtotal = calculateSubtotal(cartItems);
  const tax = calculateTax(subtotal);
  const discount = calculateDiscount(subtotal);
  const finalTotal = calculateFinalTotal(subtotal);

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      {/* Cart Items */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Cart Review</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {cartItems.length === 0 ? (
            <p className="text-muted-foreground">
              Your cart is empty.
            </p>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 border-b pb-6 last:border-0"
              >
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="h-20 w-20 rounded-md object-cover"
                />

                <div className="flex-1">
                  <h3 className="font-medium">
                    {item.title}
                  </h3>

                  <p className="text-sm text-muted-foreground">
                    ${item.price.toFixed(2)}
                  </p>
                </div>

                {/* Quantity */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      updateQuantity(
                        item.id,
                        item.quantity - 1
                      )
                    }
                    disabled={item.quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>

                  <span className="w-8 text-center">
                    {item.quantity}
                  </span>

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      updateQuantity(
                        item.id,
                        item.quantity + 1
                      )
                    }
                    disabled={item.quantity >= 5}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                {/* Remove */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFromCart(item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* Order Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
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

          <div className="border-t pt-4">
            {/* Final Total */}
            <div className="flex justify-between text-lg font-bold">
              <span>Final Total</span>
              <span>${finalTotal.toFixed(2)}</span>
            </div>
          </div>

          {/* Continue */}
          <Button
            className="w-full"
            onClick={onNext}
            disabled={cartItems.length === 0}
          >
            Continue to Shipping
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CartReviewStep;