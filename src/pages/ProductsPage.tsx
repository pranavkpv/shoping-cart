import { useCallback } from "react";

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
  } = useProductFilters({
    products,
  });

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  ]);

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
      emptyMessage="No products found."
      loadingComponent={<ProductSkeletonGrid />}
    >
      <section>
        <div className="mb-6">
          <h1 className="text-3xl font-bold">
            Products
          </h1>

          <p className="text-muted-foreground">
            Browse our products and add them to your cart.
          </p>
        </div>

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

        <ProductGrid products={filteredProducts} />

        {/* Infinite scroll trigger */}
        <div
          ref={loadMoreRef}
          className="mt-8 flex justify-center"
        >
          {isFetchingNextPage && (
            <p className="text-muted-foreground">
              Loading more products...
            </p>
          )}

          {!hasNextPage && products.length > 0 && (
            <p className="text-muted-foreground">
              No more products.
            </p>
          )}
        </div>
      </section>
    </ApiState>
  );
};

export default ProductsPage;