import { Link } from "react-router-dom";

import { useCartStore } from "../store/cart.store";

import CartItem from "../components/cart/CartItem";
import CartSummary from "../components/cart/CartSummary";

import { Button } from "@/components/ui/button";

const CartPage = () => {
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore(
    (state) => state.clearCart
  );

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
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          Shopping Cart
        </h1>

        <Button
          variant="outline"
          onClick={clearCart}
        >Type
          Clear Cart
        </Button>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <div>
          {items.map((item) => (
            <CartItem
              key={item.id}
              item={item}
            />
          ))}
        </div>

        <CartSummary />
      </div>
    </section>
  );
};

export default CartPage;