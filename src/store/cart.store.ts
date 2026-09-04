import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "../schemas/product.schema";

export interface CartItem extends Product {
   quantity: number;
}

interface CartState {
   items: CartItem[];

   addToCart: (product: Product) => void;
   removeFromCart: (productId: number) => void;
   updateQuantity: (productId: number, quantity: number) => void;
   clearCart: () => void;
}

export const useCartStore = create<CartState>()(
   persist(
      (set) => ({
         items: [],

         addToCart: (product) =>
            set((state) => {
               const existingItem = state.items.find(
                  (item) => item.id === product.id
               );

               // Product already exists
               if (existingItem) {
                  if (existingItem.quantity >= 5) {
                     return state;
                  }

                  return {
                     items: state.items.map((item) =>
                        item.id === product.id
                           ? {
                              ...item,
                              quantity: item.quantity + 1,
                           }
                           : item
                     ),
                  };
               }

               // New product starts with quantity 1
               return {
                  items: [
                     ...state.items,
                     {
                        ...product,
                        quantity: 1,
                     },
                  ],
               };
            }),

         removeFromCart: (productId) =>
            set((state) => ({
               items: state.items.filter(
                  (item) => item.id !== productId
               ),
            })),

         updateQuantity: (productId, quantity) =>
            set((state) => ({
               items: state.items
                  .map((item) => {
                     if (item.id !== productId) {
                        return item;
                     }

                     const newQuantity = Math.min(
                        Math.max(quantity, 1),
                        5
                     );

                     return {
                        ...item,
                        quantity: newQuantity,
                     };
                  }),
            })),

         clearCart: () => set({ items: [] }),
      }),
      {
         name: "shopping-cart",
      }
   )
);