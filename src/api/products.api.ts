import {
  productsResponseSchema,
  type ProductsResponse,
} from "../schemas/product.schema";

import { config } from "../config";

export const fetchProducts = async (): Promise<ProductsResponse> => {
  const response = await fetch(config.productsApiUrl);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data: unknown = await response.json();

  return productsResponseSchema.parse(data);
};