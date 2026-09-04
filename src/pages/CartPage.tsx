import { Link } from "react-router-dom";
import { useState } from "react";

import { useCartStore } from "../store/cart.store";

import CartItem from "../components/cart/CartItem";
import CartSummary from "../components/cart/CartSummary";

import { Button } from "@/components/ui/button";

const ITEMS_PER_PAGE = 5;

const CartPage = () => {
  const items = useCartStore((state) => state.items);

  const clearCart = useCartStore(
    (state) => state.clearCart
  );

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(
    items.length / ITEMS_PER_PAGE
  );

  const startIndex =
    (currentPage - 1) * ITEMS_PER_PAGE;

  const paginatedItems = items.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handlePrevious = () => {
    setCurrentPage((page) => Math.max(page - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((page) =>
      Math.min(page + 1, totalPages)
    );
  };

  if (items.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <h1 className="text-2xl font-bold">
          Your cart is empty
        </h1>

        <p className="mt-2 text-muted-foreground">
          Add some products to your cart to continue.
        </p>

        <Button
          className="mt-6"
          render={<Link to="/products" />}
        >
          Browse Products
        </Button>
      </div>
    );
  }

  return (
    <section>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          Shopping Cart
        </h1>

        <Button
          variant="outline"
          onClick={() => {
            clearCart();
            setCurrentPage(1);
          }}
        >
          Clear Cart
        </Button>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        {/* Cart Items */}
        <div>
          <div className="space-y-4">
            {paginatedItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6 flex items-center justify-center gap-4">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentPage === 1}
              >
                Previous
              </Button>

              <span className="text-sm">
                Page {currentPage} of {totalPages}
              </span>

              <Button
                variant="outline"
                onClick={handleNext}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </div>

        {/* Cart Summary */}
        <CartSummary />
      </div>
    </section>
  );
};

export default CartPage;