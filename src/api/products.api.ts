import {
  productsResponseSchema,
  type ProductsResponse,
} from "../schemas/product.schema";

const PRODUCTS_API_URL = "https://dummyjson.com/products";

export const fetchProducts = async (): Promise<ProductsResponse> => {
  const response = await fetch(PRODUCTS_API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data: unknown = await response.json();

  return productsResponseSchema.parse(data);
};