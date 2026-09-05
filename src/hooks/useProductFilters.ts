import { useMemo, useState } from "react";
import type { Product } from "../schemas/product.schema";

interface UseProductFiltersProps {
   products: Product[];
}

export const useProductFilters = ({
   products,
}: UseProductFiltersProps) => {
   const [search, setSearch] = useState("");
   const [category, setCategory] = useState("all");
   const [minPrice, setMinPrice] = useState("");
   const [maxPrice, setMaxPrice] = useState("");

   const categories = useMemo(() => {
      return [...new Set(products.map((product) => product.category))];
   }, [products]);

   const filteredProducts = useMemo(() => {
      return products.filter((product) => {
         // Search by title
         const matchesSearch = product.title
            .toLowerCase()
            .includes(search.toLowerCase());

         // Filter by category
         const matchesCategory =
            category === "all" ||
            product.category === category;

         // Filter by minimum price
         const matchesMinPrice =
            minPrice === "" ||
            product.price >= Number(minPrice);

         // Filter by maximum price
         const matchesMaxPrice =
            maxPrice === "" ||
            product.price <= Number(maxPrice);

         return (
            matchesSearch &&
            matchesCategory &&
            matchesMinPrice &&
            matchesMaxPrice
         );
      });
   }, [
      products,
      search,
      category,
      minPrice,
      maxPrice,
   ]);

   const clearFilters = () => {
      setSearch("");
      setCategory("all");
      setMinPrice("");
      setMaxPrice("");
   };

   return {
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
   };
};