import { useProducts } from "../hooks/useProducts";
import ApiState from "../components/common/ApiState";
import ProductGrid from "../components/products/ProductGrid";
import ProductSkeletonGrid from "../components/products/ProductSkeletonGrid";

const ProductsPage = () => {
  const {
    products,
    isLoading,
    isError,
    error,
    isEmpty,
  } = useProducts();

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

        <ProductGrid products={products} />
      </section>
    </ApiState>
  );
};

export default ProductsPage;