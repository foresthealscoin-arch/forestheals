import { q as useQuery, u as useActor, f as createActor } from "./index-CfU2kVIJ.js";
const STALE_5MIN = 5 * 60 * 1e3;
function useBackendActor() {
  return useActor(createActor);
}
function mapProduct(p) {
  return {
    id: Number(p.id),
    name: p.name,
    description: p.description,
    price: Number(p.price),
    comparePrice: p.comparePrice != null ? Number(p.comparePrice) : void 0,
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
    status: String(p.status ?? "active")
  };
}
function applyLocalFilters(products, filter) {
  let result = [...products];
  if (filter == null ? void 0 : filter.category) {
    result = result.filter((p) => p.category === filter.category);
  }
  if (filter == null ? void 0 : filter.search) {
    const q = filter.search.toLowerCase();
    result = result.filter(
      (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
    );
  }
  if ((filter == null ? void 0 : filter.minPrice) !== void 0) {
    result = result.filter((p) => p.price >= filter.minPrice);
  }
  if ((filter == null ? void 0 : filter.maxPrice) !== void 0) {
    result = result.filter((p) => p.price <= filter.maxPrice);
  }
  if ((filter == null ? void 0 : filter.minRating) !== void 0) {
    result = result.filter((p) => p.ratings >= filter.minRating);
  }
  if (filter == null ? void 0 : filter.featured) {
    result = result.filter((p) => p.featured);
  }
  if (filter == null ? void 0 : filter.sortBy) {
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
function useProducts(filter) {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["products", filter],
    queryFn: async () => {
      if (!actor || isFetching) return [];
      const backendFilter = {
        featured: (filter == null ? void 0 : filter.featured) ?? void 0,
        minRating: filter == null ? void 0 : filter.minRating,
        sortBy: (filter == null ? void 0 : filter.sortBy) ? filter.sortBy : void 0,
        maxPrice: (filter == null ? void 0 : filter.maxPrice) ? BigInt(filter.maxPrice) : void 0,
        category: (filter == null ? void 0 : filter.category) ?? void 0,
        minPrice: (filter == null ? void 0 : filter.minPrice) ? BigInt(filter.minPrice) : void 0,
        searchQuery: (filter == null ? void 0 : filter.search) ?? void 0
      };
      const raw = await actor.listProducts(backendFilter);
      const products = raw.map(mapProduct);
      return applyLocalFilters(products, filter);
    },
    staleTime: STALE_5MIN,
    refetchOnWindowFocus: true,
    retry: 2,
    enabled: !!actor && !isFetching
  });
}
function useFeaturedProducts() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["products", "featured"],
    queryFn: async () => {
      if (!actor || isFetching) return [];
      const raw = await actor.listFeaturedProducts();
      return raw.map(mapProduct);
    },
    staleTime: STALE_5MIN,
    refetchOnWindowFocus: true,
    retry: 2,
    enabled: !!actor && !isFetching
  });
}
function useBundles() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["products", "bundles"],
    queryFn: async () => {
      if (!actor || isFetching) return [];
      const raw = await actor.listBundles();
      return raw.map(mapProduct);
    },
    staleTime: STALE_5MIN,
    refetchOnWindowFocus: true,
    retry: 2,
    enabled: !!actor && !isFetching
  });
}
function useProduct(id) {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      if (!actor || isFetching || id <= 0) return null;
      const raw = await actor.getProduct(BigInt(id));
      if (!raw) return null;
      return mapProduct(raw);
    },
    enabled: id > 0 && !!actor && !isFetching,
    staleTime: STALE_5MIN,
    retry: 2
  });
}
function useProductCategories() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["product-categories"],
    queryFn: async () => {
      if (!actor || isFetching) return [];
      const raw = await actor.listProducts({});
      const cats = new Set(raw.map((p) => p.category));
      return Array.from(cats);
    },
    staleTime: STALE_5MIN,
    retry: 2,
    enabled: !!actor && !isFetching
  });
}
function useRecommendations(condition) {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["recommendations", condition],
    queryFn: async () => {
      if (!actor || isFetching || !condition) return [];
      const raw = await actor.getRecommendations(condition);
      return raw.map(mapProduct);
    },
    enabled: !!condition && !!actor && !isFetching,
    staleTime: STALE_5MIN,
    retry: 2
  });
}
export {
  useProductCategories as a,
  useProducts as b,
  useProduct as c,
  useRecommendations as d,
  useBundles as e,
  useFeaturedProducts as u
};
