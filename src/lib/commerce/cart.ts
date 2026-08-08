import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type CartItem = {
  variantId: string;
  productId: string;
  name: string;
  priceCents: number;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  add: (item: CartItem) => void;
  remove: (variantId: string) => void;
  clear: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],

      add: (item) =>
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

      remove: (variantId) =>
        set((state) => ({
          items: state.items.filter((x) => x.variantId !== variantId),
        })),

      clear: () => set({ items: [] }),
    }),
    {
      name: 'forestheals-cart',
    },
  ),
);
