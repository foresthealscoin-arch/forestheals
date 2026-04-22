import { c as createLucideIcon, g as create, h as useNavigate, r as reactExports, j as jsxRuntimeExports, m as motion, B as Badge, i as Search, I as Input, X, a as Button, A as AnimatePresence } from "./index-CfU2kVIJ.js";
import { L as Label } from "./label-BjUfKOjb.js";
import { S as Skeleton } from "./skeleton-Dbe_tSkr.js";
import { P as ProductCard } from "./ProductCard-D6YMmcmu.js";
import { a as useProductCategories, b as useProducts } from "./useProducts-B7nbWxOB.js";
import "./formatters-CN9TrYCS.js";
import "./tag-RoRywvnF.js";
import "./check-DSd0zFnf.js";
import "./star-D6nQNTvb.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z",
      key: "sc7q7i"
    }
  ]
];
const Funnel = createLucideIcon("funnel", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
];
const RotateCcw = createLucideIcon("rotate-ccw", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["line", { x1: "21", x2: "14", y1: "4", y2: "4", key: "obuewd" }],
  ["line", { x1: "10", x2: "3", y1: "4", y2: "4", key: "1q6298" }],
  ["line", { x1: "21", x2: "12", y1: "12", y2: "12", key: "1iu8h1" }],
  ["line", { x1: "8", x2: "3", y1: "12", y2: "12", key: "ntss68" }],
  ["line", { x1: "21", x2: "16", y1: "20", y2: "20", key: "14d8ph" }],
  ["line", { x1: "12", x2: "3", y1: "20", y2: "20", key: "m0wm8r" }],
  ["line", { x1: "14", x2: "14", y1: "2", y2: "6", key: "14e1ph" }],
  ["line", { x1: "8", x2: "8", y1: "10", y2: "14", key: "1i6ji0" }],
  ["line", { x1: "16", x2: "16", y1: "18", y2: "22", key: "1lctlv" }]
];
const SlidersHorizontal = createLucideIcon("sliders-horizontal", __iconNode);
const defaultFilters = {
  category: void 0,
  minPrice: void 0,
  maxPrice: void 0,
  minRating: void 0,
  search: void 0,
  sortBy: "popular"
};
const useProductStore = create((set) => ({
  products: [],
  featuredProducts: [],
  filters: defaultFilters,
  selectedCategory: "all",
  setProducts: (products) => set({ products }),
  setFeaturedProducts: (products) => set({ featuredProducts: products }),
  setFilters: (filters) => set((state) => ({
    filters: { ...state.filters, ...filters }
  })),
  clearFilters: () => set({ filters: defaultFilters, selectedCategory: "all" }),
  setCategory: (category) => set((state) => ({
    selectedCategory: category,
    filters: {
      ...state.filters,
      category: category === "all" ? void 0 : category
    }
  }))
}));
const SORT_OPTIONS = [
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Top Rated", value: "rating" }
];
const RATING_OPTIONS = [
  { label: "All Ratings", value: 0 },
  { label: "3★ & above", value: 3 },
  { label: "4★ & above", value: 4 }
];
function SkeletonGrid() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4", children: Array.from({ length: 12 }, (_, i) => `skeleton-${i}`).map((key) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "glass-card rounded-2xl overflow-hidden shadow-soft",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-square w-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-20" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-3/4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-16" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-14 rounded-lg" })
          ] })
        ] })
      ]
    },
    key
  )) });
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
  onReset
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-7", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground text-xs uppercase tracking-widest mb-3 text-primary", children: "Category" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2.5", children: allCategories.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "label",
        {
          className: "flex items-center gap-2.5 cursor-pointer group",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "checkbox",
                checked: selectedCategories.includes(cat),
                onChange: () => onCategoryToggle(cat),
                className: "w-4 h-4 rounded accent-primary cursor-pointer",
                "data-ocid": `products.filter.category.${cat.toLowerCase().replace(/[\s&]/g, "_")}`
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground group-hover:text-primary transition-smooth select-none", children: cat })
          ]
        },
        cat
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground text-xs uppercase tracking-widest mb-3 text-primary", children: "Price Range" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground mb-1", children: "Min ₹" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "number",
              value: minPrice,
              min: 0,
              onChange: (e) => onPriceChange(Number(e.target.value), maxPrice),
              className: "h-9 text-sm",
              "data-ocid": "products.filter.min_price"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground pb-2 text-sm", children: "–" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground mb-1", children: "Max ₹" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "number",
              value: maxPrice,
              min: minPrice,
              onChange: (e) => onPriceChange(minPrice, Number(e.target.value)),
              className: "h-9 text-sm",
              "data-ocid": "products.filter.max_price"
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground text-xs uppercase tracking-widest mb-3 text-primary", children: "Min Rating" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2.5", children: RATING_OPTIONS.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "label",
        {
          className: "flex items-center gap-2.5 cursor-pointer group",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "radio",
                name: "rating",
                checked: minRating === opt.value,
                onChange: () => onRatingChange(opt.value),
                className: "w-4 h-4 accent-primary cursor-pointer",
                "data-ocid": `products.filter.rating.${opt.value || "all"}`
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground group-hover:text-primary transition-smooth select-none", children: opt.label })
          ]
        },
        opt.value
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground text-xs uppercase tracking-widest mb-3 text-primary", children: "Sort By" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2.5", children: SORT_OPTIONS.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "label",
        {
          className: "flex items-center gap-2.5 cursor-pointer group",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "radio",
                name: "sort",
                checked: sortBy === opt.value,
                onChange: () => onSortChange(opt.value),
                className: "w-4 h-4 accent-primary cursor-pointer",
                "data-ocid": `products.filter.sort.${opt.value}`
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground group-hover:text-primary transition-smooth select-none", children: opt.label })
          ]
        },
        opt.value
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        variant: "outline",
        size: "sm",
        onClick: onReset,
        type: "button",
        className: "w-full gap-2 border-primary/30 text-primary hover:bg-primary/5",
        "data-ocid": "products.filter.reset_button",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "w-3.5 h-3.5" }),
          "Reset Filters"
        ]
      }
    )
  ] });
}
function ProductsPage() {
  const navigate = useNavigate();
  const { filters, setFilters, clearFilters, setCategory } = useProductStore();
  const [search, setSearch] = reactExports.useState(filters.search ?? "");
  const [debouncedSearch, setDebouncedSearch] = reactExports.useState(filters.search ?? "");
  const [selectedCategories, setSelectedCategories] = reactExports.useState(
    filters.category ? [filters.category] : []
  );
  const [minPrice, setMinPrice] = reactExports.useState(filters.minPrice ?? 0);
  const [maxPrice, setMaxPrice] = reactExports.useState(filters.maxPrice ?? 2e3);
  const [minRating, setMinRating] = reactExports.useState(filters.minRating ?? 0);
  const [sortBy, setSortBy] = reactExports.useState(
    filters.sortBy ?? "newest"
  );
  const [mobileFilterOpen, setMobileFilterOpen] = reactExports.useState(false);
  const { data: allCategories = [] } = useProductCategories();
  reactExports.useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(t);
  }, [search]);
  const syncStore = reactExports.useCallback(
    (cats, rating, price, sort, q) => {
      setFilters({
        category: cats.length === 1 ? cats[0] : void 0,
        minRating: rating > 0 ? rating : void 0,
        minPrice: price[0] > 0 ? price[0] : void 0,
        maxPrice: price[1] < 2e3 ? price[1] : void 0,
        sortBy: sort,
        search: q || void 0
      });
    },
    [setFilters]
  );
  const handleCategoryToggle = (cat) => {
    const next = selectedCategories.includes(cat) ? selectedCategories.filter((c) => c !== cat) : [...selectedCategories, cat];
    setSelectedCategories(next);
    if (next.length === 1) setCategory(next[0]);
    else setCategory("all");
    syncStore(next, minRating, [minPrice, maxPrice], sortBy, debouncedSearch);
  };
  const handleRatingChange = (r) => {
    setMinRating(r);
    syncStore(
      selectedCategories,
      r,
      [minPrice, maxPrice],
      sortBy,
      debouncedSearch
    );
  };
  const handlePriceChange = (min, max) => {
    setMinPrice(min);
    setMaxPrice(max);
    syncStore(
      selectedCategories,
      minRating,
      [min, max],
      sortBy,
      debouncedSearch
    );
  };
  const handleSortChange = (s) => {
    setSortBy(s);
    syncStore(
      selectedCategories,
      minRating,
      [minPrice, maxPrice],
      s,
      debouncedSearch
    );
  };
  const handleReset = () => {
    setSelectedCategories([]);
    setMinPrice(0);
    setMaxPrice(2e3);
    setMinRating(0);
    setSortBy("newest");
    setSearch("");
    setDebouncedSearch("");
    clearFilters();
    void navigate({ to: "/products", search: {}, replace: true });
  };
  const activeFilter = {
    search: debouncedSearch || void 0,
    category: selectedCategories.length === 1 ? selectedCategories[0] : void 0,
    minPrice: minPrice > 0 ? minPrice : void 0,
    maxPrice: maxPrice < 2e3 ? maxPrice : void 0,
    minRating: minRating > 0 ? minRating : void 0,
    sortBy
  };
  const { data: products, isLoading } = useProducts(activeFilter);
  const filtered = products && selectedCategories.length > 1 ? products.filter((p) => selectedCategories.includes(p.category)) : products ?? [];
  const activeFilterCount = selectedCategories.length + (minPrice > 0 ? 1 : 0) + (maxPrice < 2e3 ? 1 : 0) + (minRating > 0 ? 1 : 0);
  const sidebarProps = {
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
    onReset: handleReset
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", "data-ocid": "products.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b shadow-soft py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: -8 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-1", children: "Forestheals Store" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl md:text-4xl font-bold text-foreground font-display", children: "Nature's Finest Collection" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-2 max-w-xl", children: "Ethically sourced Ayurvedic herbs, spices & superfoods — from forest to your home" })
        ]
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "hidden lg:block w-60 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card rounded-2xl p-5 shadow-soft sticky top-24", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-foreground flex items-center gap-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "w-4 h-4 text-primary" }),
            "Filters"
          ] }),
          activeFilterCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-primary text-primary-foreground text-xs px-1.5", children: activeFilterCount })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FilterSidebar, { ...sidebarProps })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 mb-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                placeholder: "Search herbs, spices, products…",
                value: search,
                onChange: (e) => setSearch(e.target.value),
                className: "pl-10 h-11",
                "data-ocid": "products.search_input"
              }
            ),
            search && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => {
                  setSearch("");
                  setDebouncedSearch("");
                },
                className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth",
                "aria-label": "Clear search",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              type: "button",
              onClick: () => setMobileFilterOpen(true),
              className: "lg:hidden gap-2 h-11 shrink-0",
              "data-ocid": "products.mobile_filter.open_modal_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SlidersHorizontal, { className: "w-4 h-4" }),
                "Filters",
                activeFilterCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-primary text-primary-foreground text-xs px-1.5 ml-1", children: activeFilterCount })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mb-5 overflow-x-auto scrollbar-hide pb-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => {
                setSelectedCategories([]);
                setCategory("all");
                syncStore(
                  [],
                  minRating,
                  [minPrice, maxPrice],
                  sortBy,
                  debouncedSearch
                );
              },
              className: `px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-smooth ${selectedCategories.length === 0 ? "bg-primary text-primary-foreground shadow-green" : "bg-muted text-muted-foreground hover:bg-muted/70"}`,
              "data-ocid": "products.category.all.tab",
              children: "All"
            }
          ),
          allCategories.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => handleCategoryToggle(cat),
              className: `px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-smooth ${selectedCategories.includes(cat) ? "bg-primary text-primary-foreground shadow-green" : "bg-muted text-muted-foreground hover:bg-muted/70"}`,
              "data-ocid": `products.category.${cat.toLowerCase().replace(/[\s&]/g, "_")}.tab`,
              children: cat
            },
            cat
          ))
        ] }),
        selectedCategories.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 mb-4", children: selectedCategories.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => handleCategoryToggle(cat),
            className: "inline-flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-medium px-3 py-1.5 rounded-full hover:bg-primary/20 transition-smooth",
            "data-ocid": `products.filter.chip.${cat.toLowerCase().replace(/[\s&]/g, "_")}`,
            children: [
              cat,
              /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3 h-3" })
            ]
          },
          cat
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "text-sm text-muted-foreground",
            "data-ocid": "products.count",
            children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-36 inline-block" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              "Showing",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: filtered.length }),
              " ",
              "products"
            ] })
          }
        ) }),
        isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonGrid, {}) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, scale: 0.97 },
            animate: { opacity: 1, scale: 1 },
            className: "text-center py-24",
            "data-ocid": "products.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-9 h-9 text-muted-foreground" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-semibold text-foreground mb-2", children: "No products found" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-6 max-w-sm mx-auto", children: "No products match your current filters. Try adjusting or clearing them." }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  variant: "outline",
                  onClick: handleReset,
                  className: "gap-2",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "w-4 h-4" }),
                    "Clear all filters"
                  ]
                }
              )
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4",
            "data-ocid": "products.list",
            children: filtered.map((product, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, { product, index: i }, product.id))
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: mobileFilterOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          className: "fixed inset-0 bg-foreground/40 backdrop-blur-sm z-40 lg:hidden",
          onClick: () => setMobileFilterOpen(false)
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { x: "-100%" },
          animate: { x: 0 },
          exit: { x: "-100%" },
          transition: { type: "spring", damping: 28, stiffness: 300 },
          className: "fixed top-0 left-0 bottom-0 w-80 bg-card z-50 overflow-y-auto shadow-elevated lg:hidden",
          "data-ocid": "products.mobile_filter.sheet",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-5 border-b border-border sticky top-0 bg-card z-10", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-foreground flex items-center gap-2 text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "w-4 h-4 text-primary" }),
                "Filters"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setMobileFilterOpen(false),
                  className: "text-muted-foreground hover:text-foreground transition-smooth p-1 rounded-lg hover:bg-muted",
                  "aria-label": "Close filters",
                  "data-ocid": "products.mobile_filter.close_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              FilterSidebar,
              {
                ...sidebarProps,
                onReset: () => {
                  handleReset();
                  setMobileFilterOpen(false);
                }
              }
            ) })
          ]
        }
      )
    ] }) })
  ] });
}
export {
  ProductsPage as default
};
