import { Minus, Plus, Trash2 } from "lucide-react";

import type { CartItem as CartItemType } from "../../store/cart.store";
import { useCartStore } from "../../store/cart.store";

import { Button } from "@/components/ui/button";

interface CartItemProps {
  item: CartItemType;
}

const CartItem = ({
  item,
}: CartItemProps) => {
  const updateQuantity = useCartStore(
    (state) => state.updateQuantity
  );

  const removeFromCart = useCartStore(
    (state) => state.removeFromCart
  );

  const itemTotal = item.price * item.quantity;

  return (
    <div className="flex gap-4 border-b py-4">
      <img
        src={item.thumbnail}
        alt={item.title}
        className="h-24 w-24 rounded-md object-cover"
      />

      <div className="flex min-w-0 flex-1 flex-col justify-between">
        <div>
          <h3 className="font-semibold">
            {item.title}
          </h3>

          <p className="text-sm text-muted-foreground">
            ${item.price.toFixed(2)} each
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center rounded-md border">
            <Button
              variant="ghost"
              size="icon"
              onClick={() =>
                updateQuantity(
                  item.id,
                  item.quantity - 1
                )
              }
              disabled={item.quantity <= 1}
            >
              <Minus />
            </Button>

            <span className="w-8 text-center">
              {item.quantity}
            </span>

            <Button
              variant="ghost"
              size="icon"
              onClick={() =>
                updateQuantity(
                  item.id,
                  item.quantity + 1
                )
              }
              disabled={item.quantity >= 5}
            >
              <Plus />
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() =>
              removeFromCart(item.id)
            }
          >
            <Trash2 />
          </Button>
        </div>
      </div>

      <p className="font-semibold">
        ${itemTotal.toFixed(2)}
      </p>
    </div>
  );
};

export default CartItem;