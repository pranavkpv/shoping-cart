import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ShoppingBag, Trash2, ArrowLeft } from "lucide-react";

import { useCartStore } from "../store/cart.store";

import CartItem from "../components/cart/CartItem";
import CartSummary from "../components/cart/CartSummary";
import Pagination from "@/components/common/Pagination";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ITEMS_PER_PAGE = 5;

const CartPage = () => {
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
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
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center px-4">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted/50 mb-4">
          <ShoppingBag className="h-10 w-10 text-muted-foreground" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          Your cart is empty
        </h1>
        <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-md">
          Looks like you haven't added anything to your cart yet. Explore our products and start shopping!
        </p>
        <Button className="mt-6 gap-2">
          <Link to="/products">
            <ArrowLeft className="h-4 w-4" />
            <span>Browse Products</span>
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <section className="space-y-6 sm:space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/60 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Shopping Cart
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Review your items and proceed to checkout ({items.length} unique {items.length === 1 ? "item" : "items"})
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          className="self-start sm:self-auto gap-2 text-destructive hover:bg-destructive/10 hover:text-destructive border-destructive/20"
          onClick={() => {
            clearCart();
            setCurrentPage(1);
          }}
        >
          <Trash2 className="h-4 w-4" />
          <span>Clear Cart</span>
        </Button>
      </div>

      {/* Grid Layout: Main List vs Summary Panel */}
      <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
        {/* Cart Items List */}
        <div className="space-y-6 lg:col-span-7 xl:col-span-8">
          <Card className="border-border/60 shadow-xs overflow-hidden">
            <CardHeader className="border-b border-border/40 bg-muted/20 px-4 py-3 sm:px-6">
              <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Cart Items
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 divide-y divide-border/60">
              {paginatedItems.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </CardContent>
          </Card>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="pt-2 flex justify-center sm:justify-end">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </div>

        {/* Sticky Cart Summary Side Panel */}
        <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-20">
          <CartSummary />
        </div>
      </div>
    </section>
  );
};

export default CartPage;