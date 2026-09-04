import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

import { useCartStore } from "../../store/cart.store";
import ThemeToggle from "../common/ThemeToggle";

const Header = () => {
  const items = useCartStore((state) => state.items);

  const cartItemCount = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <header className="border-b bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link
          to="/products"
          className="text-xl font-bold"
        >
          Shopping Cart
        </Link>

        <div className="flex items-center gap-4">
          <ThemeToggle />

          <Link
            to="/cart"
            className="relative"
            aria-label="Shopping cart"
          >
            <ShoppingCart className="h-5 w-5" />

            {cartItemCount > 0 && (
              <span className="absolute -right-3 -top-3 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-xs text-primary-foreground">
                {cartItemCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;