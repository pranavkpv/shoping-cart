import { useState, useEffect } from "react";
import type { Product } from "@/schemas/product.schema";

export const useProductDetail = (id?: string) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        if (!res.ok) throw new Error("Failed to load product details.");
        const data: Product = await res.json();
        setProduct(data);
      } catch (err) {
        setIsError(true);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  return { product, isLoading, isError, error };
};