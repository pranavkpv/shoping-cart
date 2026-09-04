import { z } from "zod";

export const shippingSchema = z.object({
  fullName: z
    .string()
    .transform((val) => val.trim())
    .refine((val) => val.length > 2, {
      message: "Full name must be more than 2 characters",
    }),
  address: z
    .string()
    .transform((val) => val.trim())
    .refine((val) => val.length >= 5, {
      message: "Street address must be at least 5 characters",
    }),
  city: z
    .string()
    .transform((val) => val.trim())
    .refine((val) => val.length >= 2, {
      message: "City must be at least 2 characters",
    }),
  postalCode: z
    .string()
    .transform((val) => val.trim())
    .refine((val) => /^\d+$/.test(val), {
      message: "Postal code must contain numbers only",
    })
    .refine((val) => val.length >= 4 && val.length <= 10, {
      message: "Postal code must be between 4 and 10 digits",
    }),
  phone: z
    .string()
    .transform((val) => val.trim())
    .refine((val) => /^\d+$/.test(val), {
      message: "Phone number must contain numbers only",
    })
    .refine((val) => val.length >= 10, {
      message: "Phone number must be at least 10 digits",
    }),
});

export type ShippingData = z.infer<typeof shippingSchema>;