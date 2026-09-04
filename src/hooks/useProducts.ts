import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../api/products.api";

export const useProducts = () => {
   const query = useQuery({
      queryKey: ["products"],
      queryFn: fetchProducts,
   });

   return {
      products: query.data?.products ?? [],
      isLoading: query.isLoading,
      isError: query.isError,
      error: query.error,
      isEmpty: !query.isLoading && !query.isError && query.data?.products.length === 0,
   };
};