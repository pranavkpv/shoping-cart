import { Link } from "react-router-dom";
import { ShoppingCart, Store } from "lucide-react";

import { useCartStore } from "../../store/cart.store";
import ThemeToggle from "../common/ThemeToggle";

const Header = () => {
  const items = useCartStore((state) => state.items);

  const cartItemCount = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-md transition-all duration-200 supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand / Logo */}
        <Link
          to="/products"
          className="group flex items-center gap-2.5 text-lg font-bold tracking-tight text-foreground transition-opacity hover:opacity-90 sm:text-xl"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm shadow-primary/20 transition-transform group-hover:scale-105">
            <Store className="h-5 w-5" />
          </div>
          <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Shopping Cart
          </span>
        </Link>

        {/* Navigation & Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Products Nav Link */}
          <Link
            to="/products"
            className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            Products
          </Link>

          {/* Theme Toggle Wrapper */}
          <div className="flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:bg-accent">
            <ThemeToggle />
          </div>

          {/* Vertical Separator */}
          <div className="h-4 w-px bg-border/60" aria-hidden="true" />

          {/* Cart Icon Button */}
          <Link
            to="/cart"
            aria-label={`Shopping cart with ${cartItemCount} items`}
            className="relative flex h-10 items-center justify-center rounded-lg px-2.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <ShoppingCart className="h-5 w-5 transition-transform active:scale-95" />

            {/* Cart Count Badge */}
            {cartItemCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-[1.25rem] animate-in zoom-in-50 items-center justify-center rounded-full bg-primary px-1.5 text-[11px] font-semibold text-primary-foreground shadow-sm shadow-primary/30">
                {cartItemCount > 99 ? "99+" : cartItemCount}
              </span>
            )}
          </Link>

        </div>
      </div>
    </header>
  );
};

export default Header;