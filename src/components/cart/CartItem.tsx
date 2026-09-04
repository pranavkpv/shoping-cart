import { Link } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import type { CartItem as CartItemType } from "../../store/cart.store";
import { useCartStore } from "../../store/cart.store";

import { Button } from "@/components/ui/button";

interface CartItemProps {
  item: CartItemType;
}

const CartItem = ({ item }: CartItemProps) => {
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  const itemTotal = item.price * item.quantity;

  const handleDecreaseQuantity = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
      toast.info(`Updated quantity for "${item.title}"`);
    }
  };

  const handleIncreaseQuantity = () => {
    if (item.quantity < 5) {
      updateQuantity(item.id, item.quantity + 1);
      toast.info(`Updated quantity for "${item.title}"`);
    }
  };

  const handleRemoveItem = () => {
    removeFromCart(item.id);
    toast.error(`Removed "${item.title}" from cart`);
  };

  return (
    <div className="p-4 sm:p-6 transition-colors hover:bg-muted/10">
      <div className="flex gap-4 sm:gap-6">
        {/* Item Thumbnail */}
        <Link
          to={`/products/${item.id}`}
          className="relative h-20 w-20 sm:h-24 sm:w-24 shrink-0 overflow-hidden rounded-lg border border-border/60 bg-muted/20"
        >
          <img
            src={item.thumbnail}
            alt={item.title}
            className="h-full w-full object-cover object-center transition-transform hover:scale-105"
          />
        </Link>

        {/* Item Information & Controls */}
        <div className="flex flex-1 flex-col justify-between gap-3 min-w-0">
          {/* Title & Unit Price */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-4">
            <Link
              to={`/products/${item.id}`}
              className="font-semibold text-sm sm:text-base text-foreground hover:text-primary transition-colors line-clamp-2"
            >
              {item.title}
            </Link>
            <span className="font-bold text-sm sm:text-base text-foreground whitespace-nowrap self-start sm:self-auto">
              ${itemTotal.toFixed(2)}
            </span>
          </div>

          <p className="text-xs text-muted-foreground">
            ${item.price.toFixed(2)} each
          </p>

          {/* Action Row: Quantity Buttons & Remove */}
          <div className="flex items-center justify-between gap-4 pt-1">
            {/* Quantity Controls */}
            <div className="flex items-center rounded-lg border border-border bg-background">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-r-none text-muted-foreground hover:text-foreground"
                onClick={handleDecreaseQuantity}
                disabled={item.quantity <= 1}
                aria-label="Decrease quantity"
              >
                <Minus className="h-3.5 w-3.5" />
              </Button>

              <span className="w-9 text-center text-xs sm:text-sm font-semibold select-none">
                {item.quantity}
              </span>

              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-l-none text-muted-foreground hover:text-foreground"
                onClick={handleIncreaseQuantity}
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
              onClick={handleRemoveItem}
              aria-label="Remove item from cart"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;