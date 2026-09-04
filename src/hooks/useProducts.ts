import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchProducts } from "../api/products.api";

const PRODUCTS_PER_PAGE = 20;

export const useProducts = () => {
  const query = useInfiniteQuery({
    queryKey: ["products"],

    queryFn: ({ pageParam }) =>
      fetchProducts(PRODUCTS_PER_PAGE, pageParam),

    initialPageParam: 0,

    getNextPageParam: (lastPage, allPages) => {
      const loadedProducts = allPages.reduce(
        (total, page) => total + page.products.length,
        0
      );

      if (loadedProducts >= lastPage.total) {
        return undefined;
      }

      return loadedProducts;
    },
  });

  const products =
    query.data?.pages.flatMap(
      (page) => page.products
    ) ?? [];

  return {
    products,

    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,

    isEmpty:
      !query.isLoading &&
      !query.isError &&
      products.length === 0,

    fetchNextPage: query.fetchNextPage,
    hasNextPage: query.hasNextPage,
    isFetchingNextPage: query.isFetchingNextPage,
  };
};