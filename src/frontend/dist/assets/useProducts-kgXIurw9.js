import { P as PRODUCTS_SEED_DATA } from "./index-xECe6EUo.js";
import { u as useQuery, a as useActor, c as createActor } from "./backend-BLkFotdR.js";
function useBackendActor() {
  return useActor(createActor);
}
function useProducts(filter) {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["products", filter],
    queryFn: async () => {
      if (actor && !isFetching) {
        try {
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
          const products = raw.map((p) => ({
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
            bestseller: p.bestseller,
            discount: Number(p.discount),
            bundleIds: p.bundleIds.map(Number)
          }));
          if (products.length > 0) return applyLocalFilters(products, filter);
        } catch {
        }
      }
      return applyLocalFilters([...PRODUCTS_SEED_DATA], filter);
    },
    staleTime: 2 * 60 * 1e3,
    enabled: true
  });
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
function useFeaturedProducts() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["products", "featured"],
    queryFn: async () => {
      if (actor && !isFetching) {
        try {
          const raw = await actor.listFeaturedProducts();
          const products = raw.map((p) => ({
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
            bestseller: p.bestseller,
            discount: Number(p.discount),
            bundleIds: p.bundleIds.map(Number)
          }));
          if (products.length > 0) return products;
        } catch {
        }
      }
      return PRODUCTS_SEED_DATA.filter((p) => p.featured);
    },
    staleTime: 2 * 60 * 1e3
  });
}
function useProduct(id) {
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
              bundleIds: raw.bundleIds.map(Number)
            };
          }
        } catch {
        }
      }
      return PRODUCTS_SEED_DATA.find((p) => p.id === id) ?? null;
    },
    enabled: id > 0,
    staleTime: 2 * 60 * 1e3
  });
}
function useProductCategories() {
  return useQuery({
    queryKey: ["product-categories"],
    queryFn: async () => {
      const cats = new Set(PRODUCTS_SEED_DATA.map((p) => p.category));
      return Array.from(cats);
    },
    staleTime: 10 * 60 * 1e3
  });
}
function useRecommendations(condition) {
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
              bundleIds: p.bundleIds.map(Number)
            }));
          }
        } catch {
        }
      }
      const conditionMap = {
        "hair-fall": [
          "Brahmi Powder",
          "Organic Amla Powder",
          "Multani Mitti Powder"
        ],
        stress: ["Organic Ashwagandha", "Brahmi Powder", "Shatavari Powder"],
        immunity: ["Organic Moringa Powder", "Triphala Churan", "Tulsi Powder"],
        "skin-care": [
          "Multani Mitti Powder",
          "Organic Neem Powder",
          "Organic Amla Powder"
        ],
        digestion: ["Triphala Churan", "Dry Ginger Powder", "Mulethi Powder"],
        "joint-pain": [
          "Dry Ginger Powder",
          "Mulethi Powder",
          "Organic Ashwagandha"
        ],
        diabetes: [
          "Organic Moringa Powder",
          "Cinnamon Powder",
          "Organic Neem Powder"
        ],
        sleep: ["Organic Ashwagandha", "Brahmi Powder", "Shatavari Powder"],
        "weight-loss": [
          "Organic Moringa Powder",
          "Triphala Churan",
          "Chia Seeds"
        ],
        energy: ["Organic Ashwagandha", "Pumpkin Seeds", "Sunflower Seeds"]
      };
      const names = conditionMap[condition] ?? [];
      return PRODUCTS_SEED_DATA.filter(
        (p) => names.some((n) => p.name.includes(n.split(" ")[0]))
      ).slice(0, 6);
    },
    enabled: !!condition
  });
}
export {
  useProductCategories as a,
  useProducts as b,
  useProduct as c,
  useRecommendations as d,
  useFeaturedProducts as u
};
