import { Product } from "@/payload-types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

// Define CartItem with quantity
export type CartItem = {
  product: Product;
  quantity: number; // Add quantity to CartItem
};

type CartState = {
  items: CartItem[];
  addItem: (product: Product, quantity: number) => void; // Accept product and quantity
  removeItem: (productId: string) => void;
  clearCart: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (product, quantity) =>
        set((state) => {
          // Check if the product already exists in the cart
          const existingItemIndex = state.items.findIndex((item) => item.product.id === product.id);

          if (existingItemIndex !== -1) {
            // If it exists, update the quantity
            const existingItem = state.items[existingItemIndex];
            const updatedItems = [...state.items];

            // Update the quantity of the existing product
            updatedItems[existingItemIndex] = {
              ...existingItem,
              quantity: existingItem.quantity + quantity,
            };
            return { items: updatedItems };
          } else {
            return { items: [...state.items, { product, quantity }] };
          }
        }),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== id),
        })),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
