import { create } from "zustand";
import { persist } from "zustand/middleware";

// Slim store — only auth and lightweight UI state.
// All domain data (products, orders, customers, reviews, inventory, blog,
// tasks, team, coupons, expenses, settings) comes from React Query hooks
// in hooks/useAdminData.ts — NOT from this store.

interface AdminPStore {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

export const useAdminPStore = create<AdminPStore>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      login: () => set({ isLoggedIn: true }),
      logout: () => set({ isLoggedIn: false }),
    }),
    { name: "forestheals-adminp-auth" },
  ),
);
