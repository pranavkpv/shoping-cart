import {
  productsResponseSchema,
  type ProductsResponse,
} from "../schemas/product.schema";

import { config } from "../config";

export const fetchProducts = async (
  limit: number,
  skip: number
): Promise<ProductsResponse> => {
  const url = new URL(config.productsApiUrl);

  url.searchParams.set("limit", String(limit));
  url.searchParams.set("skip", String(skip));

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data: unknown = await response.json();

  return productsResponseSchema.parse(data);
};