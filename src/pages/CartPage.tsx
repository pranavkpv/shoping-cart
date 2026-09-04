import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { useCartStore } from "../store/cart.store";

import CartItem from "../components/cart/CartItem";
import CartSummary from "../components/cart/CartSummary";
import Pagination from "@/components/common/Pagination";

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

  // Keep page valid when items are removed
  useEffect(() => {
    if (totalPages === 0) {
      setCurrentPage(1);
      return;
    }

    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [items.length, currentPage, totalPages]);

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

          {/* Reusable Pagination */}
          <div className="mt-6">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>

        {/* Cart Summary */}
        <CartSummary />
      </div>
    </section>
  );
};

export default CartPage;