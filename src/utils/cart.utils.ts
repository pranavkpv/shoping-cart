import type { CartItem } from "../store/cart.store";

export const calculateSubtotal = (
  items: CartItem[]
): number => {
  return items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
};

export const calculateTax = (
  subtotal: number
): number => {
  return subtotal * 0.05;
};

export const calculateDiscount = (
  subtotal: number
): number => {
  return subtotal > 100 ? subtotal * 0.1 : 0;
};

export const calculateFinalTotal = (
  subtotal: number
): number => {
  const tax = calculateTax(subtotal);
  const discount = calculateDiscount(subtotal);

  return subtotal + tax - discount;
};

export const MINIMUM_CHECKOUT_VALUE = 10;

export const canCheckout = (
  subtotal: number
): boolean => {
  return subtotal >= MINIMUM_CHECKOUT_VALUE;
};