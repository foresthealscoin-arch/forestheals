import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "@tanstack/react-router";
import { Filter, RotateCcw, Search, SlidersHorizontal, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { ProductCard } from "../components/ui/ProductCard";
import { useProductCategories, useProducts } from "../hooks/useProducts";
import { useProductStore } from "../stores/useProductStore";
import type { ProductFilter } from "../types";

const SORT_OPTIONS: {
  label: string;
  value: NonNullable<ProductFilter["sortBy"]>;
}[] = [
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Top Rated", value: "rating" },
];

const RATING_OPTIONS = [
  { label: "All Ratings", value: 0 },
  { label: "3★ & above", value: 3 },
  { label: "4★ & above", value: 4 },
];

function SkeletonGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
      {Array.from({ length: 12 }, (_, i) => `skeleton-${i}`).map((key) => (
        <div
          key={key}
          className="glass-card rounded-2xl overflow-hidden shadow-soft"
        >
          <Skeleton className="aspect-square w-full" />
          <div className="p-4 space-y-2">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <div className="flex items-center justify-between mt-3">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-8 w-14 rounded-lg" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

interface FilterSidebarProps {
  selectedCategories: string[];
  onCategoryToggle: (cat: string) => void;
  allCategories: string[];
  minPrice: number;
  maxPrice: number;
  onPriceChange: (min: number, max: number) => void;
  minRating: number;
  onRatingChange: (r: number) => void;
  sortBy: NonNullable<ProductFilter["sortBy"]>;
  onSortChange: (v: NonNullable<ProductFilter["sortBy"]>) => void;
  onReset: () => void;
}

function FilterSidebar({
  selectedCategories,
  onCategoryToggle,
  allCategories,
  minPrice,
  maxPrice,
  onPriceChange,
  minRating,
  onRatingChange,
  sortBy,
  onSortChange,
  onReset,
}: FilterSidebarProps) {
  return (
    <div className="space-y-7">
      {/* Categories */}
      <div>
        <h3 className="font-semibold text-foreground text-xs uppercase tracking-widest mb-3 text-primary">
          Category
        </h3>
        <div className="space-y-2.5">
          {allCategories.map((cat) => (
            <label
              key={cat}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat)}
                onChange={() => onCategoryToggle(cat)}
                className="w-4 h-4 rounded accent-primary cursor-pointer"
                data-ocid={`products.filter.category.${cat.toLowerCase().replace(/[\s&]/g, "_")}`}
              />
              <span className="text-sm text-foreground group-hover:text-primary transition-smooth select-none">
                {cat}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <h3 className="font-semibold text-foreground text-xs uppercase tracking-widest mb-3 text-primary">
          Price Range
        </h3>
        <div className="flex items-end gap-2">
          <div className="flex-1">
            <Label className="text-xs text-muted-foreground mb-1">Min ₹</Label>
            <Input
              type="number"
              value={minPrice}
              min={0}
              onChange={(e) => onPriceChange(Number(e.target.value), maxPrice)}
              className="h-9 text-sm"
              data-ocid="products.filter.min_price"
            />
          </div>
          <span className="text-muted-foreground pb-2 text-sm">–</span>
          <div className="flex-1">
            <Label className="text-xs text-muted-foreground mb-1">Max ₹</Label>
            <Input
              type="number"
              value={maxPrice}
              min={minPrice}
              onChange={(e) => onPriceChange(minPrice, Number(e.target.value))}
              className="h-9 text-sm"
              data-ocid="products.filter.max_price"
            />
          </div>
        </div>
      </div>

      {/* Rating */}
      <div>
        <h3 className="font-semibold text-foreground text-xs uppercase tracking-widest mb-3 text-primary">
          Min Rating
        </h3>
        <div className="space-y-2.5">
          {RATING_OPTIONS.map((opt) => (
            <label
              key={opt.value}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <input
                type="radio"
                name="rating"
                checked={minRating === opt.value}
                onChange={() => onRatingChange(opt.value)}
                className="w-4 h-4 accent-primary cursor-pointer"
                data-ocid={`products.filter.rating.${opt.value || "all"}`}
              />
              <span className="text-sm text-foreground group-hover:text-primary transition-smooth select-none">
                {opt.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Sort */}
      <div>
        <h3 className="font-semibold text-foreground text-xs uppercase tracking-widest mb-3 text-primary">
          Sort By
        </h3>
        <div className="space-y-2.5">
          {SORT_OPTIONS.map((opt) => (
            <label
              key={opt.value}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <input
                type="radio"
                name="sort"
                checked={sortBy === opt.value}
                onChange={() => onSortChange(opt.value)}
                className="w-4 h-4 accent-primary cursor-pointer"
                data-ocid={`products.filter.sort.${opt.value}`}
              />
              <span className="text-sm text-foreground group-hover:text-primary transition-smooth select-none">
                {opt.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={onReset}
        type="button"
        className="w-full gap-2 border-primary/30 text-primary hover:bg-primary/5"
        data-ocid="products.filter.reset_button"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        Reset Filters
      </Button>
    </div>
  );
}

export default function ProductsPage() {
  const navigate = useNavigate();
  const { filters, setFilters, clearFilters, setCategory } = useProductStore();

  const [search, setSearch] = useState(filters.search ?? "");
  const [debouncedSearch, setDebouncedSearch] = useState(filters.search ?? "");
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    filters.category ? [filters.category] : [],
  );
  const [minPrice, setMinPrice] = useState(filters.minPrice ?? 0);
  const [maxPrice, setMaxPrice] = useState(filters.maxPrice ?? 2000);
  const [minRating, setMinRating] = useState(filters.minRating ?? 0);
  const [sortBy, setSortBy] = useState<NonNullable<ProductFilter["sortBy"]>>(
    filters.sortBy ?? "newest",
  );
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const { data: allCategories = [] } = useProductCategories();

  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(t);
  }, [search]);

  const syncStore = useCallback(
    (
      cats: string[],
      rating: number,
      price: [number, number],
      sort: NonNullable<ProductFilter["sortBy"]>,
      q: string,
    ) => {
      setFilters({
        category: cats.length === 1 ? cats[0] : undefined,
        minRating: rating > 0 ? rating : undefined,
        minPrice: price[0] > 0 ? price[0] : undefined,
        maxPrice: price[1] < 2000 ? price[1] : undefined,
        sortBy: sort,
        search: q || undefined,
      });
    },
    [setFilters],
  );

  const handleCategoryToggle = (cat: string) => {
    const next = selectedCategories.includes(cat)
      ? selectedCategories.filter((c) => c !== cat)
      : [...selectedCategories, cat];
    setSelectedCategories(next);
    if (next.length === 1) setCategory(next[0]);
    else setCategory("all");
    syncStore(next, minRating, [minPrice, maxPrice], sortBy, debouncedSearch);
  };

  const handleRatingChange = (r: number) => {
    setMinRating(r);
    syncStore(
      selectedCategories,
      r,
      [minPrice, maxPrice],
      sortBy,
      debouncedSearch,
    );
  };

  const handlePriceChange = (min: number, max: number) => {
    setMinPrice(min);
    setMaxPrice(max);
    syncStore(
      selectedCategories,
      minRating,
      [min, max],
      sortBy,
      debouncedSearch,
    );
  };

  const handleSortChange = (s: NonNullable<ProductFilter["sortBy"]>) => {
    setSortBy(s);
    syncStore(
      selectedCategories,
      minRating,
      [minPrice, maxPrice],
      s,
      debouncedSearch,
    );
  };

  const handleReset = () => {
    setSelectedCategories([]);
    setMinPrice(0);
    setMaxPrice(2000);
    setMinRating(0);
    setSortBy("newest");
    setSearch("");
    setDebouncedSearch("");
    clearFilters();
    void navigate({ to: "/products", search: {}, replace: true });
  };

  const activeFilter: ProductFilter = {
    search: debouncedSearch || undefined,
    category:
      selectedCategories.length === 1 ? selectedCategories[0] : undefined,
    minPrice: minPrice > 0 ? minPrice : undefined,
    maxPrice: maxPrice < 2000 ? maxPrice : undefined,
    minRating: minRating > 0 ? minRating : undefined,
    sortBy,
  };

  const { data: products, isLoading } = useProducts(activeFilter);

  // Multi-category: useProducts only handles a single category so we filter client-side
  const filtered =
    products && selectedCategories.length > 1
      ? products.filter((p) => selectedCategories.includes(p.category))
      : (products ?? []);

  const activeFilterCount =
    selectedCategories.length +
    (minPrice > 0 ? 1 : 0) +
    (maxPrice < 2000 ? 1 : 0) +
    (minRating > 0 ? 1 : 0);

  const sidebarProps: FilterSidebarProps = {
    selectedCategories,
    onCategoryToggle: handleCategoryToggle,
    allCategories,
    minPrice,
    maxPrice,
    onPriceChange: handlePriceChange,
    minRating,
    onRatingChange: handleRatingChange,
    sortBy,
    onSortChange: handleSortChange,
    onReset: handleReset,
  };

  return (
    <div className="min-h-screen bg-background" data-ocid="products.page">
      {/* Page header */}
      <div className="bg-card border-b shadow-soft py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-1">
              Forestheals Store
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground font-display">
              Nature's Finest Collection
            </h1>
            <p className="text-muted-foreground mt-2 max-w-xl">
              Ethically sourced Ayurvedic herbs, spices & superfoods — from
              forest to your home
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex gap-8">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block w-60 shrink-0">
            <div className="glass-card rounded-2xl p-5 shadow-soft sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <span className="font-semibold text-foreground flex items-center gap-2 text-sm">
                  <Filter className="w-4 h-4 text-primary" />
                  Filters
                </span>
                {activeFilterCount > 0 && (
                  <Badge className="bg-primary text-primary-foreground text-xs px-1.5">
                    {activeFilterCount}
                  </Badge>
                )}
              </div>
              <FilterSidebar {...sidebarProps} />
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Search + mobile filter toggle */}
            <div className="flex gap-3 mb-5">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                <Input
                  placeholder="Search herbs, spices, products…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10 h-11"
                  data-ocid="products.search_input"
                />
                {search && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearch("");
                      setDebouncedSearch("");
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth"
                    aria-label="Clear search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              <Button
                variant="outline"
                type="button"
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden gap-2 h-11 shrink-0"
                data-ocid="products.mobile_filter.open_modal_button"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
                {activeFilterCount > 0 && (
                  <Badge className="bg-primary text-primary-foreground text-xs px-1.5 ml-1">
                    {activeFilterCount}
                  </Badge>
                )}
              </Button>
            </div>

            {/* Category quick-tabs */}
            <div className="flex gap-2 mb-5 overflow-x-auto scrollbar-hide pb-1">
              <button
                type="button"
                onClick={() => {
                  setSelectedCategories([]);
                  setCategory("all");
                  syncStore(
                    [],
                    minRating,
                    [minPrice, maxPrice],
                    sortBy,
                    debouncedSearch,
                  );
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-smooth ${
                  selectedCategories.length === 0
                    ? "bg-primary text-primary-foreground shadow-green"
                    : "bg-muted text-muted-foreground hover:bg-muted/70"
                }`}
                data-ocid="products.category.all.tab"
              >
                All
              </button>
              {allCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => handleCategoryToggle(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-smooth ${
                    selectedCategories.includes(cat)
                      ? "bg-primary text-primary-foreground shadow-green"
                      : "bg-muted text-muted-foreground hover:bg-muted/70"
                  }`}
                  data-ocid={`products.category.${cat.toLowerCase().replace(/[\s&]/g, "_")}.tab`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Active filter chips */}
            {selectedCategories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedCategories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => handleCategoryToggle(cat)}
                    className="inline-flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-medium px-3 py-1.5 rounded-full hover:bg-primary/20 transition-smooth"
                    data-ocid={`products.filter.chip.${cat.toLowerCase().replace(/[\s&]/g, "_")}`}
                  >
                    {cat}
                    <X className="w-3 h-3" />
                  </button>
                ))}
              </div>
            )}

            {/* Result count */}
            <div className="flex items-center justify-between mb-5">
              <p
                className="text-sm text-muted-foreground"
                data-ocid="products.count"
              >
                {isLoading ? (
                  <Skeleton className="h-4 w-36 inline-block" />
                ) : (
                  <>
                    Showing{" "}
                    <span className="font-semibold text-foreground">
                      {filtered.length}
                    </span>{" "}
                    products
                  </>
                )}
              </p>
            </div>

            {/* Products grid */}
            {isLoading ? (
              <SkeletonGrid />
            ) : filtered.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-24"
                data-ocid="products.empty_state"
              >
                <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-5">
                  <Search className="w-9 h-9 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  No products found
                </h3>
                <p className="text-muted-foreground text-sm mb-6 max-w-sm mx-auto">
                  No products match your current filters. Try adjusting or
                  clearing them.
                </p>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleReset}
                  className="gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Clear all filters
                </Button>
              </motion.div>
            ) : (
              <motion.div
                className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4"
                data-ocid="products.list"
              >
                {filtered.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      <AnimatePresence>
        {mobileFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-foreground/40 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setMobileFilterOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="fixed top-0 left-0 bottom-0 w-80 bg-card z-50 overflow-y-auto shadow-elevated lg:hidden"
              data-ocid="products.mobile_filter.sheet"
            >
              <div className="flex items-center justify-between p-5 border-b border-border sticky top-0 bg-card z-10">
                <span className="font-semibold text-foreground flex items-center gap-2 text-sm">
                  <Filter className="w-4 h-4 text-primary" />
                  Filters
                </span>
                <button
                  type="button"
                  onClick={() => setMobileFilterOpen(false)}
                  className="text-muted-foreground hover:text-foreground transition-smooth p-1 rounded-lg hover:bg-muted"
                  aria-label="Close filters"
                  data-ocid="products.mobile_filter.close_button"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-5">
                <FilterSidebar
                  {...sidebarProps}
                  onReset={() => {
                    handleReset();
                    setMobileFilterOpen(false);
                  }}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
