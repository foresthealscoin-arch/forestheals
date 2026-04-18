import { create } from "zustand";

interface UIStore {
  isMenuOpen: boolean;
  isSearchOpen: boolean;
  isCartOpen: boolean;
  theme: "light" | "dark";
  toggleMenu: () => void;
  closeMenu: () => void;
  toggleSearch: () => void;
  closeSearch: () => void;
  toggleCart: () => void;
  closeCart: () => void;
  setTheme: (theme: "light" | "dark") => void;
}

export const useUIStore = create<UIStore>((set) => ({
  isMenuOpen: false,
  isSearchOpen: false,
  isCartOpen: false,
  theme: "light",

  toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
  closeMenu: () => set({ isMenuOpen: false }),

  toggleSearch: () => set((state) => ({ isSearchOpen: !state.isSearchOpen })),
  closeSearch: () => set({ isSearchOpen: false }),

  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
  closeCart: () => set({ isCartOpen: false }),

  setTheme: (theme) => set({ theme }),
}));
