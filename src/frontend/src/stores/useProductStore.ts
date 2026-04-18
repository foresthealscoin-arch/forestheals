import { create } from "zustand";
import type { Product, ProductFilter } from "../types";

interface ProductStore {
  products: Product[];
  featuredProducts: Product[];
  filters: ProductFilter;
  selectedCategory: string;
  setProducts: (products: Product[]) => void;
  setFeaturedProducts: (products: Product[]) => void;
  setFilters: (filters: Partial<ProductFilter>) => void;
  clearFilters: () => void;
  setCategory: (category: string) => void;
}

const defaultFilters: ProductFilter = {
  category: undefined,
  minPrice: undefined,
  maxPrice: undefined,
  minRating: undefined,
  search: undefined,
  sortBy: "popular",
};

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  featuredProducts: [],
  filters: defaultFilters,
  selectedCategory: "all",

  setProducts: (products) => set({ products }),
  setFeaturedProducts: (products) => set({ featuredProducts: products }),

  setFilters: (filters) =>
    set((state) => ({
      filters: { ...state.filters, ...filters },
    })),

  clearFilters: () => set({ filters: defaultFilters, selectedCategory: "all" }),

  setCategory: (category) =>
    set((state) => ({
      selectedCategory: category,
      filters: {
        ...state.filters,
        category: category === "all" ? undefined : category,
      },
    })),
}));
