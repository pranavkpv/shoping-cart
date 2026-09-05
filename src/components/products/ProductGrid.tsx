import type { Product } from "../../schemas/product.schema";
import ProductCard from "./ProductCard";
import { PackageSearch } from "lucide-react";

interface ProductGridProps {
  products: Product[];
}

const ProductGrid = ({ products }: ProductGridProps) => {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border p-8 text-center sm:p-12">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground mb-3">
          <PackageSearch className="h-6 w-6" />
        </div>
        <h3 className="text-base font-semibold text-foreground">No matching products</h3>
        <p className="mt-1 text-xs sm:text-sm text-muted-foreground max-w-sm">
          Try adjusting your search terms or resetting your category and price filters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;