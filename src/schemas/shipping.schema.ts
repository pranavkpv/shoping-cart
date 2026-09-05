import { z } from "zod";

export const shippingSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  postalCode: z
    .string()
    .min(4, "Postal code is required")
    .max(10, "Invalid postal code"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits"),
});

export type ShippingData = z.infer<typeof shippingSchema>;