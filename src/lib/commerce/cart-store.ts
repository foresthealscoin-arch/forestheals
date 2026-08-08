'use client';

import { create } from 'zustand';
import type { CartItem } from './cart';

type CartStore = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartStore>((set) => ({
  items: [],

  addItem: (item) =>
    set((state) => {
      const existing = state.items.find(
        (x) => x.variantId === item.variantId,
      );

      if (existing) {
        return {
          items: state.items.map((x) =>
            x.variantId === item.variantId
              ? { ...x, quantity: x.quantity + item.quantity }
              : x,
          ),
        };
      }

      return { items: [...state.items, item] };
    }),

  removeItem: (variantId) =>
    set((state) => ({
      items: state.items.filter((x) => x.variantId !== variantId),
    })),

  updateQuantity: (variantId, quantity) =>
    set((state) => ({
      items:
        quantity <= 0
          ? state.items.filter((x) => x.variantId !== variantId)
          : state.items.map((x) =>
              x.variantId === variantId
                ? { ...x, quantity }
                : x,
            ),
    })),

  clearCart: () => set({ items: [] }),
}));
