import { useEffect, useState } from "react";
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag } from "lucide-react";

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
import Pagination from "../common/Pagination";

interface CartReviewStepProps {
  onNext: () => void;
}

const ITEMS_PER_PAGE = 5;

const CartReviewStep = ({ onNext }: CartReviewStepProps) => {
  const cartItems = useCartStore((state) => state.items);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(cartItems.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedItems = cartItems.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  useEffect(() => {
    if (totalPages === 0) {
      setCurrentPage(1);
      return;
    }

    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [cartItems.length, currentPage, totalPages]);

  // Cart calculations
  const subtotal = calculateSubtotal(cartItems);
  const tax = calculateTax(subtotal);
  const discount = calculateDiscount(subtotal);
  const finalTotal = calculateFinalTotal(subtotal);

  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
      {/* Cart Items List */}
      <Card className="border-border/60 shadow-xs lg:col-span-7 xl:col-span-8 overflow-hidden">
        <CardHeader className="border-b border-border/40 bg-muted/20 px-4 py-4 sm:px-6">
          <CardTitle className="text-base sm:text-lg font-bold text-foreground">
            Review Items ({cartItems.length})
          </CardTitle>
        </CardHeader>

        <CardContent className="p-4 sm:p-6 space-y-6">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <ShoppingBag className="h-12 w-12 text-muted-foreground/50 mb-3" />
              <p className="text-base font-medium text-foreground">
                Your cart is empty
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Add some items to your cart before proceeding to checkout.
              </p>
            </div>
          ) : (
            <>
              {/* Paginated Cart Items */}
              <div className="divide-y divide-border/60">
                {paginatedItems.map((item) => {
                  const itemTotal = item.price * item.quantity;
                  return (
                    <div
                      key={item.id}
                      className="flex gap-4 py-4 first:pt-0 last:pb-0"
                    >
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="h-20 w-20 sm:h-24 sm:w-24 shrink-0 rounded-lg border border-border/60 bg-muted/20 object-cover"
                      />

                      <div className="flex flex-1 flex-col justify-between gap-2 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
                          <h3 className="font-semibold text-sm sm:text-base text-foreground line-clamp-2">
                            {item.title}
                          </h3>
                          <span className="font-bold text-sm sm:text-base text-foreground whitespace-nowrap">
                            ${itemTotal.toFixed(2)}
                          </span>
                        </div>

                        <p className="text-xs text-muted-foreground">
                          ${item.price.toFixed(2)} each
                        </p>

                        <div className="flex items-center justify-between gap-4 pt-1">
                          {/* Quantity Controls */}
                          <div className="flex items-center rounded-lg border border-border bg-background">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-r-none text-muted-foreground hover:text-foreground"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              disabled={item.quantity <= 1}
                              aria-label="Decrease quantity"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </Button>

                            <span className="w-8 text-center text-xs sm:text-sm font-semibold select-none">
                              {item.quantity}
                            </span>

                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-l-none text-muted-foreground hover:text-foreground"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              disabled={item.quantity >= 5}
                              aria-label="Increase quantity"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </Button>
                          </div>

                          {/* Remove Button */}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                            onClick={() => removeFromCart(item.id)}
                            aria-label="Remove item"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="pt-4 flex justify-center sm:justify-end border-t border-border/60">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Order Summary Sidebar */}
      <Card className="border-border/60 shadow-xs lg:col-span-5 xl:col-span-4 lg:sticky lg:top-20">
        <CardHeader className="border-b border-border/40 bg-muted/20 px-4 py-4 sm:px-6">
          <CardTitle className="text-base sm:text-lg font-bold text-foreground">
            Order Summary
          </CardTitle>
        </CardHeader>

        <CardContent className="p-6 space-y-4">
          <div className="space-y-3 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span className="font-medium text-foreground">
                ${subtotal.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between text-muted-foreground">
              <span>Estimated Tax (5%)</span>
              <span className="font-medium text-foreground">
                ${tax.toFixed(2)}
              </span>
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
              <span className="text-base font-bold text-foreground">
                Final Total
              </span>
              <span className="text-xl font-extrabold text-foreground">
                ${finalTotal.toFixed(2)}
              </span>
            </div>
          </div>

          <Button
            className="w-full gap-2 h-11 text-sm font-semibold shadow-xs mt-2"
            onClick={onNext}
            disabled={cartItems.length === 0}
          >
            <span>Continue to Shipping</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CartReviewStep;