import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import { PRODUCTS_SEED_DATA } from "../lib/seedData";
import type { CreateProductInput, Product, ProductFilter } from "../types";

function useBackendActor() {
  return useActor(createActor);
}

export function useProducts(filter?: ProductFilter) {
  const { actor, isFetching } = useBackendActor();

  return useQuery({
    queryKey: ["products", filter],
    queryFn: async () => {
      if (actor && !isFetching) {
        try {
          const backendFilter = {
            featured: filter?.featured ?? undefined,
            minRating: filter?.minRating,
            sortBy: filter?.sortBy ? filter.sortBy : undefined,
            maxPrice: filter?.maxPrice ? BigInt(filter.maxPrice) : undefined,
            category: filter?.category ?? undefined,
            minPrice: filter?.minPrice ? BigInt(filter.minPrice) : undefined,
            searchQuery: filter?.search ?? undefined,
          };
          const raw = await actor.listProducts(backendFilter);
          const products: Product[] = raw.map((p) => ({
            id: Number(p.id),
            name: p.name,
            description: p.description,
            price: Number(p.price),
            category: p.category,
            imageUrl: p.imageUrl,
            imageKey: p.imageKey,
            stock: Number(p.stock),
            ratings: p.ratings,
            reviewCount: Number(p.reviewCount),
            featured: p.featured,
            discount: Number(p.discount),
            bundleIds: p.bundleIds.map(Number),
          }));
          if (products.length > 0) return applyLocalFilters(products, filter);
        } catch {
          // fallback to seed
        }
      }
      // Fallback: seed data with local filtering
      return applyLocalFilters([...PRODUCTS_SEED_DATA], filter);
    },
    staleTime: 2 * 60 * 1000,
    enabled: true,
  });
}

function applyLocalFilters(
  products: Product[],
  filter?: ProductFilter,
): Product[] {
  let result = [...products];
  if (filter?.category) {
    result = result.filter((p) => p.category === filter.category);
  }
  if (filter?.search) {
    const q = filter.search.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q),
    );
  }
  if (filter?.minPrice !== undefined) {
    result = result.filter((p) => p.price >= filter.minPrice!);
  }
  if (filter?.maxPrice !== undefined) {
    result = result.filter((p) => p.price <= filter.maxPrice!);
  }
  if (filter?.minRating !== undefined) {
    result = result.filter((p) => p.ratings >= filter.minRating!);
  }
  if (filter?.featured) {
    result = result.filter((p) => p.featured);
  }
  if (filter?.sortBy) {
    switch (filter.sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.ratings - a.ratings);
        break;
    }
  }
  return result;
}

export function useFeaturedProducts() {
  const { actor, isFetching } = useBackendActor();

  return useQuery({
    queryKey: ["products", "featured"],
    queryFn: async () => {
      if (actor && !isFetching) {
        try {
          const raw = await actor.listFeaturedProducts();
          const products: Product[] = raw.map((p) => ({
            id: Number(p.id),
            name: p.name,
            description: p.description,
            price: Number(p.price),
            category: p.category,
            imageUrl: p.imageUrl,
            imageKey: p.imageKey,
            stock: Number(p.stock),
            ratings: p.ratings,
            reviewCount: Number(p.reviewCount),
            featured: p.featured,
            discount: Number(p.discount),
            bundleIds: p.bundleIds.map(Number),
          }));
          if (products.length > 0) return products;
        } catch {
          // fallback
        }
      }
      return PRODUCTS_SEED_DATA.filter((p) => p.featured);
    },
    staleTime: 2 * 60 * 1000,
  });
}

export function useBundles() {
  const { actor, isFetching } = useBackendActor();

  return useQuery({
    queryKey: ["products", "bundles"],
    queryFn: async () => {
      if (actor && !isFetching) {
        try {
          const raw = await actor.listBundles();
          if (raw.length > 0) {
            return raw.map((p) => ({
              id: Number(p.id),
              name: p.name,
              description: p.description,
              price: Number(p.price),
              category: p.category,
              imageUrl: p.imageUrl,
              imageKey: p.imageKey,
              stock: Number(p.stock),
              ratings: p.ratings,
              reviewCount: Number(p.reviewCount),
              featured: p.featured,
              discount: Number(p.discount),
              bundleIds: p.bundleIds.map(Number),
            }));
          }
        } catch {
          // fallback
        }
      }
      return PRODUCTS_SEED_DATA.filter((p) => p.category === "Bundles");
    },
    staleTime: 2 * 60 * 1000,
  });
}

export function useProduct(id: number) {
  const { actor, isFetching } = useBackendActor();

  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      if (actor && !isFetching && id > 0) {
        try {
          const raw = await actor.getProduct(BigInt(id));
          if (raw) {
            return {
              id: Number(raw.id),
              name: raw.name,
              description: raw.description,
              price: Number(raw.price),
              category: raw.category,
              imageUrl: raw.imageUrl,
              imageKey: raw.imageKey,
              stock: Number(raw.stock),
              ratings: raw.ratings,
              reviewCount: Number(raw.reviewCount),
              featured: raw.featured,
              discount: Number(raw.discount),
              bundleIds: raw.bundleIds.map(Number),
            } as Product;
          }
        } catch {
          // fallback
        }
      }
      return PRODUCTS_SEED_DATA.find((p) => p.id === id) ?? null;
    },
    enabled: id > 0,
    staleTime: 2 * 60 * 1000,
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
  const { actor, isFetching } = useBackendActor();

  return useQuery({
    queryKey: ["recommendations", condition],
    queryFn: async () => {
      if (actor && !isFetching && condition) {
        try {
          const raw = await actor.getRecommendations(condition);
          if (raw.length > 0) {
            return raw.map((p) => ({
              id: Number(p.id),
              name: p.name,
              description: p.description,
              price: Number(p.price),
              category: p.category,
              imageUrl: p.imageUrl,
              imageKey: p.imageKey,
              stock: Number(p.stock),
              ratings: p.ratings,
              reviewCount: Number(p.reviewCount),
              featured: p.featured,
              discount: Number(p.discount),
              bundleIds: p.bundleIds.map(Number),
            })) as Product[];
          }
        } catch {
          // fallback
        }
      }
      // Local fallback
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
  const { actor } = useBackendActor();

  return useMutation({
    mutationFn: async (input: CreateProductInput) => {
      if (!actor) throw new Error("Backend not connected");
      return actor.createProduct({
        name: input.name,
        description: input.description,
        price: BigInt(input.price),
        category: input.category,
        imageUrl: input.imageUrl,
        imageKey: input.imageKey,
        stock: BigInt(input.stock),
        featured: input.featured,
        discount: BigInt(input.discount ?? 0),
        bundleIds: (input.bundleIds ?? []).map(BigInt),
      });
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] }),
  });
}
