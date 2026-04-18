import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PRODUCTS_SEED_DATA } from "../lib/seedData";
import type { CreateProductInput, ProductFilter } from "../types";

// Since backend has no product methods yet, we use seed data
export function useProducts(filter?: ProductFilter) {
  return useQuery({
    queryKey: ["products", filter],
    queryFn: async () => {
      let products = [...PRODUCTS_SEED_DATA];
      if (filter?.category) {
        products = products.filter((p) => p.category === filter.category);
      }
      if (filter?.search) {
        const q = filter.search.toLowerCase();
        products = products.filter(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q),
        );
      }
      if (filter?.minPrice !== undefined) {
        products = products.filter((p) => p.price >= filter.minPrice!);
      }
      if (filter?.maxPrice !== undefined) {
        products = products.filter((p) => p.price <= filter.maxPrice!);
      }
      if (filter?.minRating !== undefined) {
        products = products.filter((p) => p.ratings >= filter.minRating!);
      }
      if (filter?.featured) {
        products = products.filter((p) => p.featured);
      }
      if (filter?.sortBy) {
        switch (filter.sortBy) {
          case "price-asc":
            products.sort((a, b) => a.price - b.price);
            break;
          case "price-desc":
            products.sort((a, b) => b.price - a.price);
            break;
          case "rating":
            products.sort((a, b) => b.ratings - a.ratings);
            break;
        }
      }
      return products;
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useFeaturedProducts() {
  return useQuery({
    queryKey: ["products", "featured"],
    queryFn: async () => PRODUCTS_SEED_DATA.filter((p) => p.featured),
    staleTime: 5 * 60 * 1000,
  });
}

export function useBundles() {
  return useQuery({
    queryKey: ["products", "bundles"],
    queryFn: async () =>
      PRODUCTS_SEED_DATA.filter((p) => p.category === "Bundles"),
    staleTime: 5 * 60 * 1000,
  });
}

export function useProduct(id: number) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => PRODUCTS_SEED_DATA.find((p) => p.id === id) ?? null,
    enabled: id > 0,
    staleTime: 5 * 60 * 1000,
  });
}

export function useProductCategories() {
  return useQuery({
    queryKey: ["product-categories"],
    queryFn: async () => {
      const cats = new Set(PRODUCTS_SEED_DATA.map((p) => p.category));
      return Array.from(cats);
    },
    staleTime: 10 * 60 * 1000,
  });
}

export function useRecommendations(condition: string) {
  return useQuery({
    queryKey: ["recommendations", condition],
    queryFn: async () => {
      const conditionMap: Record<string, string[]> = {
        "hair-fall": [
          "Brahmi Powder",
          "Organic Amla Powder",
          "Multani Mitti Powder",
        ],
        stress: ["Organic Ashwagandha", "Brahmi Powder", "Shatavari Powder"],
        immunity: ["Organic Moringa Powder", "Triphala Churan", "Tulsi Powder"],
        "skin-care": [
          "Multani Mitti Powder",
          "Organic Neem Powder",
          "Organic Amla Powder",
        ],
        digestion: ["Triphala Churan", "Dry Ginger Powder", "Mulethi Powder"],
        "joint-pain": [
          "Dry Ginger Powder",
          "Mulethi Powder",
          "Organic Ashwagandha",
        ],
        diabetes: [
          "Organic Moringa Powder",
          "Cinnamon Powder",
          "Organic Neem Powder",
        ],
        sleep: ["Organic Ashwagandha", "Brahmi Powder", "Shatavari Powder"],
        "weight-loss": [
          "Organic Moringa Powder",
          "Triphala Churan",
          "Chia Seeds",
        ],
        energy: ["Organic Ashwagandha", "Pumpkin Seeds", "Sunflower Seeds"],
      };
      const names = conditionMap[condition] ?? [];
      return PRODUCTS_SEED_DATA.filter((p) =>
        names.some((n) => p.name.includes(n.split(" ")[0])),
      ).slice(0, 6);
    },
    enabled: !!condition,
  });
}

export function useCreateProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (_input: CreateProductInput) => {
      throw new Error("Backend not ready");
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] }),
  });
}
