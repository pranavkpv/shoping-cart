import { ShoppingCart } from "lucide-react";

import type { Product } from "../../schemas/product.schema";
import { useCartStore } from "../../store/cart.store";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({
  product,
}: ProductCardProps) => {
  const addToCart = useCartStore(
    (state) => state.addToCart
  );

  return (
    <Card className="overflow-hidden">
      <div className="aspect-square overflow-hidden">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-full w-full object-cover transition-transform hover:scale-105"
        />
      </div>

      <CardContent className="space-y-2 p-4">
        <Badge variant="secondary">
          {product.category}
        </Badge>

        <h2 className="line-clamp-2 font-semibold">
          {product.title}
        </h2>

        <div className="flex items-center justify-between">
          <span className="text-lg font-bold">
            ${product.price.toFixed(2)}
          </span>

          <span className="text-sm">
            ⭐ {product.rating}
          </span>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full"
          onClick={() => addToCart(product)}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;