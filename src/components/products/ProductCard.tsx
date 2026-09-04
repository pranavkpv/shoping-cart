import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Star, Check } from "lucide-react";

import type { Product } from "../../schemas/product.schema";
import { useCartStore } from "../../store/cart.store";
import { showSuccessToast } from "@/components/common/SuccessToast";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isAdding, setIsAdding] = useState(false);

  const addToCart = useCartStore((state) => state.addToCart);
  const items = useCartStore((state) => state.items);

  // Check how many of this item are currently in the cart
  const cartItem = items.find((item) => item.id === product.id);
  const quantityInCart = cartItem ? cartItem.quantity : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    // Prevent triggering navigation when clicking the button inside a Link wrapper
    e.preventDefault();
    e.stopPropagation();

    addToCart(product);
    setIsAdding(true);

    // Trigger styled success toast
    showSuccessToast(
      `Added "${product.title}" to your cart.`,
      "Added to Cart"
    );

    // Brief active state animation
    setTimeout(() => {
      setIsAdding(false);
    }, 1000);
  };

  return (
    <Card className="group flex h-full flex-col justify-between overflow-hidden border-border/60 bg-card transition-all duration-300 hover:-translate-y-1 hover:border-border hover:shadow-lg">
      
      {/* Clickable Card Link Body */}
      <Link to={`/products/${product.id}`} className="flex flex-1 flex-col">
        
        {/* Image Container with Badge Overlay */}
        <div className="relative aspect-square w-full overflow-hidden bg-muted/30">
          <img
            src={product.thumbnail}
            alt={product.title}
            loading="lazy"
            className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />

          {/* Floating Category Badge */}
          <Badge
            variant="secondary"
            className="absolute left-3 top-3 capitalize backdrop-blur-md bg-background/80 font-medium text-xs shadow-2xs"
          >
            {product.category}
          </Badge>

          {/* Quantity Indicator Overlay */}
          {quantityInCart > 0 && (
            <Badge
              variant="default"
              className="absolute right-3 top-3 bg-primary text-primary-foreground font-semibold text-xs shadow-2xs"
            >
              {quantityInCart} in cart
            </Badge>
          )}
        </div>

        {/* Product Content Details */}
        <CardContent className="flex flex-1 flex-col justify-between p-4 sm:p-5">
          <div className="space-y-1.5">
            <h3 className="line-clamp-2 text-base font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors">
              {product.title}
            </h3>
          </div>

          {/* Price & Rating Section */}
          <div className="mt-4 flex items-center justify-between border-t border-border/40 pt-3">
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold tracking-tight text-foreground">
                ${product.price.toFixed(2)}
              </span>
            </div>

            <div className="flex items-center gap-1 rounded-md bg-amber-50 px-2 py-0.5 text-xs font-semibold text-amber-700 dark:bg-amber-950/40 dark:text-amber-400">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating.toFixed(1)}</span>
            </div>
          </div>
        </CardContent>
      </Link>

      {/* Action Footer */}
      <CardFooter className="p-4 pt-0 sm:p-5 sm:pt-0">
        <Button
          className="w-full gap-2 transition-all active:scale-[0.98]"
          onClick={handleAddToCart}
          disabled={isAdding}
          variant={quantityInCart > 0 ? "outline" : "default"}
        >
          {isAdding ? (
            <>
              <Check className="h-4 w-4 text-emerald-500 animate-in zoom-in-50" />
              <span>Added!</span>
            </>
          ) : (
            <>
              <ShoppingCart className="h-4 w-4" />
              <span>{quantityInCart > 0 ? "Add Another" : "Add to Cart"}</span>
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;