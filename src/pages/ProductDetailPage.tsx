import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Star,
  ShoppingCart,
  Check,
  Truck,
  ShieldCheck,
  RotateCcw,
  ArrowLeft,
  PackageCheck,
  User,
  Plus,
  Minus,
} from "lucide-react";

import { useProductDetail } from "@/hooks/useProductDetail";
import { useCartStore } from "@/store/cart.store";
import { showSuccessToast } from "@/components/common/SuccessToast";
import ApiState from "@/components/common/ApiState";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { product, isLoading, isError, error } = useProductDetail(id);

  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [isAdding, setIsAdding] = useState(false);

  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = () => {
    if (!product) return;

    // Add selected quantity to cart
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }

    setIsAdding(true);
    showSuccessToast(
      `Added ${quantity} x "${product.title}" to your cart.`,
      "Added to Cart"
    );

    setTimeout(() => {
      setIsAdding(false);
    }, 1000);
  };

  return (
    <ApiState
      isLoading={isLoading}
      isError={isError}
      error={error}
      isEmpty={!product}
      emptyMessage="Product not found."
    >
      {product && (
        <div className="space-y-10 sm:space-y-12">
          {/* Top Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link
              to="/products"
              className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Products</span>
            </Link>
            <span>/</span>
            <span className="capitalize">{product.category}</span>
            <span>/</span>
            <span className="text-foreground font-medium truncate max-w-[200px] sm:max-w-none">
              {product.title}
            </span>
          </div>

          {/* Product Overview Layout */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
            
            {/* Left Column: Image Gallery */}
            <div className="space-y-4 lg:col-span-6">
              <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-border/60 bg-muted/20">
                <img
                  src={
                    product.images[selectedImage] ||
                    product.thumbnail
                  }
                  alt={product.title}
                  className="h-full w-full object-cover object-center"
                />
                <Badge
                  variant="secondary"
                  className="absolute left-4 top-4 capitalize bg-background/90 backdrop-blur-md"
                >
                  {product.category}
                </Badge>
              </div>

              {/* Thumbnails list */}
              {product.images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                        selectedImage === idx
                          ? "border-primary ring-2 ring-primary/20"
                          : "border-border/60 opacity-70 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={img}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column: Product Info & Purchase Form */}
            <div className="flex flex-col justify-between space-y-6 lg:col-span-6">
              <div className="space-y-4">
                {/* Brand & Title */}
                <div>
                  {product.brand && (
                    <span className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                      {product.brand}
                    </span>
                  )}
                  <h1 className="mt-1 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                    {product.title}
                  </h1>
                </div>

                {/* Rating & Stock Badges */}
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-1 rounded-md bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700 dark:bg-amber-950/40 dark:text-amber-400">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <span>{product.rating.toFixed(2)}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <PackageCheck className="h-3.5 w-3.5" />
                    {product.availabilityStatus} ({product.stock} left)
                  </span>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground">
                    SKU: {product.sku}
                  </span>
                </div>

                {/* Pricing Block */}
                <div className="flex items-baseline gap-3 pt-2">
                  <span className="text-3xl font-extrabold tracking-tight text-foreground">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.discountPercentage > 0 && (
                    <Badge variant="destructive" className="font-semibold">
                      {product.discountPercentage.toFixed(0)}% OFF
                    </Badge>
                  )}
                </div>

                {/* Description */}
                <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {product.description}
                </p>

                {/* Quantity Controls & Add to Cart Button */}
                <div className="pt-4 space-y-3">
                  <label className="text-xs font-semibold text-muted-foreground uppercase">
                    Quantity
                  </label>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex items-center justify-between rounded-lg border border-border bg-muted/20 px-3 py-1 w-full sm:w-36">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        disabled={quantity <= 1}
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </Button>
                      <span className="text-sm font-semibold">{quantity}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => setQuantity((q) => q + 1)}
                        disabled={quantity >= product.stock}
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </Button>
                    </div>

                    <Button
                      size="lg"
                      onClick={handleAddToCart}
                      disabled={isAdding || product.stock === 0}
                      className="w-full gap-2 transition-all"
                    >
                      {isAdding ? (
                        <>
                          <Check className="h-5 w-5 text-emerald-400" />
                          <span>Added to Cart!</span>
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="h-5 w-5" />
                          <span>Add to Cart</span>
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Service Features Info */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-border/60 pt-6">
                <div className="flex items-center gap-2.5 rounded-lg border border-border/40 bg-card p-3">
                  <Truck className="h-5 w-5 text-primary shrink-0" />
                  <div className="text-xs">
                    <p className="font-semibold text-foreground">Shipping</p>
                    <p className="text-muted-foreground">{product.shippingInformation}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 rounded-lg border border-border/40 bg-card p-3">
                  <ShieldCheck className="h-5 w-5 text-primary shrink-0" />
                  <div className="text-xs">
                    <p className="font-semibold text-foreground">Warranty</p>
                    <p className="text-muted-foreground">{product.warrantyInformation}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 rounded-lg border border-border/40 bg-card p-3">
                  <RotateCcw className="h-5 w-5 text-primary shrink-0" />
                  <div className="text-xs">
                    <p className="font-semibold text-foreground">Return Policy</p>
                    <p className="text-muted-foreground">{product.returnPolicy}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Reviews Section */}
          <div className="border-t border-border/60 pt-8 space-y-6">
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              Customer Reviews ({product.reviews.length})
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {product.reviews.map((rev, index) => (
                <Card key={index} className="border-border/60 bg-card">
                  <CardContent className="p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <User className="h-3.5 w-3.5" />
                        </div>
                        <span className="text-sm font-semibold text-foreground">
                          {rev.reviewerName}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-xs font-semibold text-amber-600 dark:text-amber-400">
                        <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                        <span>{rev.rating}</span>
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground italic">
                      "{rev.comment}"
                    </p>
                    <span className="text-[10px] text-muted-foreground block text-right">
                      {new Date(rev.date).toLocaleDateString()}
                    </span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}
    </ApiState>
  );
};

export default ProductDetailPage;