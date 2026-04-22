import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ProductStatus } from "../backend";
import { createActor } from "../backend";
import type { CreateProductInput, Product, ProductFilter } from "../types";

const STALE_5MIN = 5 * 60 * 1000;

function useBackendActor() {
  return useActor(createActor);
}

function mapProduct(p: {
  id: bigint;
  name: string;
  description: string;
  price: bigint;
  comparePrice?: bigint;
  category: string;
  imageUrl: string;
  imageKey: string;
  images?: string[];
  stock: bigint;
  ratings: number;
  reviewCount: bigint;
  featured: boolean;
  bestseller: boolean;
  discount: bigint;
  bundleIds: bigint[];
  status?: unknown;
}): Product {
  return {
    id: Number(p.id),
    name: p.name,
    description: p.description,
    price: Number(p.price),
    comparePrice: p.comparePrice != null ? Number(p.comparePrice) : undefined,
    category: p.category,
    imageUrl: p.imageUrl || "",
    imageKey: p.imageKey,
    images: p.images ?? [],
    stock: Number(p.stock),
    ratings: p.ratings,
    reviewCount: Number(p.reviewCount),
    featured: p.featured,
    bestseller: p.bestseller,
    discount: Number(p.discount),
    bundleIds: p.bundleIds.map(Number),
    status: String(p.status ?? "active") as "active" | "inactive" | "draft",
  };
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

export function useProducts(filter?: ProductFilter) {
  const { actor, isFetching } = useBackendActor();

  return useQuery<Product[]>({
    queryKey: ["products", filter],
    queryFn: async () => {
      if (!actor || isFetching) return [];
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
      // Backend returns empty array when no products — show empty state, no seed fallback
      const products = raw.map(mapProduct);
      return applyLocalFilters(products, filter);
    },
    staleTime: STALE_5MIN,
    refetchOnWindowFocus: true,
    retry: 2,
    enabled: !!actor && !isFetching,
  });
}

export function useFeaturedProducts() {
  const { actor, isFetching } = useBackendActor();

  return useQuery<Product[]>({
    queryKey: ["products", "featured"],
    queryFn: async () => {
      if (!actor || isFetching) return [];
      const raw = await actor.listFeaturedProducts();
      return raw.map(mapProduct);
    },
    staleTime: STALE_5MIN,
    refetchOnWindowFocus: true,
    retry: 2,
    enabled: !!actor && !isFetching,
  });
}

export function useBundles() {
  const { actor, isFetching } = useBackendActor();

  return useQuery<Product[]>({
    queryKey: ["products", "bundles"],
    queryFn: async () => {
      if (!actor || isFetching) return [];
      const raw = await actor.listBundles();
      return raw.map(mapProduct);
    },
    staleTime: STALE_5MIN,
    refetchOnWindowFocus: true,
    retry: 2,
    enabled: !!actor && !isFetching,
  });
}

export function useProduct(id: number) {
  const { actor, isFetching } = useBackendActor();

  return useQuery<Product | null>({
    queryKey: ["product", id],
    queryFn: async () => {
      if (!actor || isFetching || id <= 0) return null;
      const raw = await actor.getProduct(BigInt(id));
      if (!raw) return null;
      return mapProduct(raw);
    },
    enabled: id > 0 && !!actor && !isFetching,
    staleTime: STALE_5MIN,
    retry: 2,
  });
}

export function useProductCategories() {
  const { actor, isFetching } = useBackendActor();

  return useQuery<string[]>({
    queryKey: ["product-categories"],
    queryFn: async () => {
      if (!actor || isFetching) return [];
      const raw = await actor.listProducts({});
      const cats = new Set(raw.map((p) => p.category));
      return Array.from(cats);
    },
    staleTime: STALE_5MIN,
    retry: 2,
    enabled: !!actor && !isFetching,
  });
}

export function useRecommendations(condition: string) {
  const { actor, isFetching } = useBackendActor();

  return useQuery<Product[]>({
    queryKey: ["recommendations", condition],
    queryFn: async () => {
      if (!actor || isFetching || !condition) return [];
      const raw = await actor.getRecommendations(condition);
      return raw.map(mapProduct);
    },
    enabled: !!condition && !!actor && !isFetching,
    staleTime: STALE_5MIN,
    retry: 2,
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
        comparePrice: undefined,
        category: input.category,
        imageUrl: input.imageUrl,
        imageKey: input.imageKey,
        images: [],
        stock: BigInt(input.stock),
        featured: input.featured,
        bestseller: input.bestseller ?? false,
        discount: BigInt(input.discount ?? 0),
        bundleIds: (input.bundleIds ?? []).map(BigInt),
        status: ProductStatus.active,
      });
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] }),
  });
}

export function useUpdateProduct() {
  const qc = useQueryClient();
  const { actor } = useBackendActor();

  return useMutation({
    mutationFn: async ({
      id,
      input,
    }: {
      id: number;
      input: CreateProductInput;
    }) => {
      if (!actor) throw new Error("Backend not connected");
      return actor.updateProduct(BigInt(id), {
        name: input.name,
        description: input.description,
        price: BigInt(input.price),
        comparePrice: undefined,
        category: input.category,
        imageUrl: input.imageUrl,
        imageKey: input.imageKey,
        images: [],
        stock: BigInt(input.stock),
        featured: input.featured,
        bestseller: input.bestseller ?? false,
        discount: BigInt(input.discount ?? 0),
        bundleIds: (input.bundleIds ?? []).map(BigInt),
        status: ProductStatus.active,
      });
    },
    onSuccess: (_data, vars) => {
      void qc.invalidateQueries({ queryKey: ["products"] });
      void qc.invalidateQueries({ queryKey: ["product", vars.id] });
    },
  });
}

export function useDeleteProduct() {
  const qc = useQueryClient();
  const { actor } = useBackendActor();

  return useMutation({
    mutationFn: async (id: number) => {
      if (!actor) throw new Error("Backend not connected");
      return actor.deleteProduct(BigInt(id));
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] }),
  });
}
