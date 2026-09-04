import { useCallback } from "react";
import { Loader2, PackageCheck, Layers } from "lucide-react";

import { useProducts } from "../hooks/useProducts";
import { useProductFilters } from "../hooks/useProductFilters";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";

import ApiState from "../components/common/ApiState";
import ProductGrid from "../components/products/ProductGrid";
import ProductSkeletonGrid from "../components/products/ProductSkeletonGrid";
import ProductFilters from "../components/products/ProductFilters";

const ProductsPage = () => {
  const {
    products,
    isLoading,
    isError,
    error,
    isEmpty,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useProducts();

  const {
    filteredProducts,
    categories,
    search,
    setSearch,
    category,
    setCategory,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    clearFilters,
  } = useProductFilters({ products });

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const loadMoreRef = useInfiniteScroll({
    onLoadMore: handleLoadMore,
    hasMore: hasNextPage,
    isLoading: isFetchingNextPage,
  });

  return (
    <ApiState
      isLoading={isLoading}
      isError={isError}
      error={error}
      isEmpty={isEmpty}
      emptyMessage="No products found in the database."
      loadingComponent={<ProductSkeletonGrid />}
    >
      <section className="space-y-6 sm:space-y-8">
        {/* Header Banner */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-border/50 pb-5">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Browse Products
            </h1>
            <p className="mt-1 text-sm text-muted-foreground sm:text-base">
              Explore our curated items, filter by category, or search by name.
            </p>
          </div>
          {filteredProducts.length > 0 && (
            <div className="inline-flex items-center gap-1.5 self-start sm:self-auto rounded-full bg-secondary/80 px-3 py-1 text-xs font-semibold text-secondary-foreground border border-border/60">
              <Layers className="h-3.5 w-3.5 text-primary" />
              <span>{filteredProducts.length} Products</span>
            </div>
          )}
        </div>

        {/* Filter Toolbar */}
        <ProductFilters
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          minPrice={minPrice}
          setMinPrice={setMinPrice}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          categories={categories}
          clearFilters={clearFilters}
        />

        {/* Product Cards Grid */}
        <ProductGrid products={filteredProducts} />

        {/* Infinite Scroll Trigger & State Feedback */}
        <div ref={loadMoreRef} className="pt-6 pb-12 flex justify-center">
          {isFetchingNextPage && (
            <div className="flex items-center gap-2.5 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium text-muted-foreground shadow-sm">
              <Loader2 className="h-4 w-4 animate-spin text-primary" />
              <span>Loading more products...</span>
            </div>
          )}

          {!hasNextPage && products.length > 0 && (
            <div className="flex flex-col items-center gap-1.5 text-center text-xs sm:text-sm text-muted-foreground/80">
              <div className="flex items-center gap-1.5 font-medium text-muted-foreground">
                <PackageCheck className="h-4 w-4 text-emerald-500" />
                <span>You've reached the end of the catalog</span>
              </div>
              <p className="text-xs">Showing all available products</p>
            </div>
          )}
        </div>
      </section>
    </ApiState>
  );
};

export default ProductsPage;