import { c as createLucideIcon, j as jsxRuntimeExports, r as reactExports, m as motion, B as Badge, L as Link, a as Button, S as ShoppingBag, P as PRODUCTS_SEED_DATA, b as Shield, H as Heart, A as AnimatePresence, I as Input, u as useCartStore, d as ue } from "./index-Oxc-_oxi.js";
import { u as useFeaturedProducts } from "./useProducts-DeyqMnbq.js";
import { S as Sparkles } from "./sparkles-BCdz1axw.js";
import { L as Leaf } from "./leaf-N_oh7OWh.js";
import { S as Star } from "./star-DV5fN0x3.js";
import { T as Truck } from "./truck-DXSgzoOp.js";
import { Z as Zap } from "./zap-DDJQ42SD.js";
import { C as CircleCheck } from "./circle-check-dPMw8Eeh.js";
import { U as Users } from "./users-Dm9XPlxR.js";
import { C as Check } from "./check-DKcnpQxu.js";
import "./backend-BS-t6_G-.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M12 5v14", key: "s699le" }],
  ["path", { d: "m19 12-7 7-7-7", key: "1idqje" }]
];
const ArrowDown = createLucideIcon("arrow-down", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z", key: "1b4qmf" }],
  ["path", { d: "M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2", key: "i71pzd" }],
  ["path", { d: "M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2", key: "10jefs" }],
  ["path", { d: "M10 6h4", key: "1itunk" }],
  ["path", { d: "M10 10h4", key: "tcdvrf" }],
  ["path", { d: "M10 14h4", key: "kelpxr" }],
  ["path", { d: "M10 18h4", key: "1ulq68" }]
];
const Building2 = createLucideIcon("building-2", __iconNode);
function OfferBanner() {
  const [dismissed, setDismissed] = reactExports.useState(false);
  if (dismissed) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { y: -40, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      exit: { y: -40, opacity: 0 },
      className: "bg-primary text-primary-foreground text-center text-sm font-medium py-2.5 px-4 flex items-center justify-center gap-3 relative",
      "data-ocid": "offer.banner",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4 text-secondary shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs sm:text-sm", children: [
          "🎉 ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "10% off" }),
          " your first order — Use code",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-secondary", children: "FOREST10" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "hidden sm:inline", children: [
            " ",
            " |  Free shipping on orders above ₹499"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setDismissed(true),
            className: "absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full hover:bg-primary-foreground/15 flex items-center justify-center transition-smooth",
            "aria-label": "Dismiss offer",
            "data-ocid": "offer.banner.close_button",
            children: "×"
          }
        )
      ]
    }
  );
}
function HeroSection() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "section",
    {
      className: "relative min-h-screen flex flex-col items-center justify-center overflow-hidden",
      "data-ocid": "home.hero.section",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 gradient-hero" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "svg",
          {
            className: "absolute inset-0 w-full h-full opacity-[0.055] pointer-events-none",
            xmlns: "http://www.w3.org/2000/svg",
            "aria-hidden": "true",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "pattern",
                {
                  id: "leaf-bg",
                  x: "0",
                  y: "0",
                  width: "80",
                  height: "80",
                  patternUnits: "userSpaceOnUse",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "path",
                      {
                        d: "M40 8 C18 8, 8 24, 8 40 C8 56, 22 68, 40 68 C58 68, 72 56, 72 40 C72 24, 62 8, 40 8Z",
                        fill: "none",
                        stroke: "white",
                        strokeWidth: "1"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "line",
                      {
                        x1: "40",
                        y1: "8",
                        x2: "40",
                        y2: "68",
                        stroke: "white",
                        strokeWidth: "0.8"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "line",
                      {
                        x1: "20",
                        y1: "30",
                        x2: "60",
                        y2: "30",
                        stroke: "white",
                        strokeWidth: "0.5"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "line",
                      {
                        x1: "14",
                        y1: "45",
                        x2: "66",
                        y2: "45",
                        stroke: "white",
                        strokeWidth: "0.5"
                      }
                    )
                  ]
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { width: "100%", height: "100%", fill: "url(#leaf-bg)" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-secondary/10 blur-3xl pointer-events-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-accent/10 blur-3xl pointer-events-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center gap-6 py-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: -20 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-secondary/15 text-secondary border border-secondary/40 px-3 py-1.5 text-xs sm:text-sm font-medium backdrop-blur-sm text-center", children: "Natural forest-based healing products for skin & body — 100% chemical-free" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.h1,
            {
              initial: { opacity: 0, y: 30 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] },
              className: "text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-secondary tracking-tight leading-none",
              style: { fontFamily: "var(--font-display)" },
              children: [
                "Heal Naturally",
                /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-secondary/70 text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-light italic", children: "with ForestHeals" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.p,
            {
              initial: { opacity: 0, y: 18 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.6, delay: 0.45 },
              className: "text-secondary/70 text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed px-2",
              children: "Pure, chemical-free products made from forest-sourced ingredients for real results"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 18 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.6, delay: 0.65 },
              className: "flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center w-full max-w-sm sm:max-w-none",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Link,
                  {
                    to: "/products",
                    "data-ocid": "hero.shop_now_button",
                    className: "w-full sm:w-auto",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        type: "button",
                        size: "lg",
                        className: "w-full sm:w-auto bg-secondary text-primary hover:bg-secondary/90 font-semibold px-8 shadow-green text-base h-12",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-5 h-5 mr-2" }),
                          "Shop Now"
                        ]
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Link,
                  {
                    to: "/products",
                    "data-ocid": "hero.explore_button",
                    className: "w-full sm:w-auto",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        type: "button",
                        variant: "outline",
                        size: "lg",
                        className: "w-full sm:w-auto border-secondary/50 text-secondary hover:bg-secondary/10 font-semibold px-8 text-base bg-transparent backdrop-blur-sm h-12",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Leaf, { className: "w-5 h-5 mr-2" }),
                          "Explore Products"
                        ]
                      }
                    )
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, scale: 0.92 },
              animate: { opacity: 1, scale: 1 },
              transition: { duration: 0.9, delay: 0.5 },
              className: "relative mt-4 w-full max-w-2xl",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative rounded-3xl overflow-hidden shadow-elevated border border-secondary/10", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: PRODUCTS_SEED_DATA[0].imageUrl,
                    alt: "Forestheals premium Ayurvedic products",
                    className: "w-full aspect-[16/7] object-cover object-center"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    animate: { y: [-4, 4, -4] },
                    transition: {
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut"
                    },
                    className: "absolute bottom-4 left-4 glass-card rounded-xl px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-semibold", children: "⭐ 4.8/5" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground ml-1.5 sm:ml-2 text-xs hidden xs:inline", children: "2,400+ happy customers" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    animate: { y: [4, -4, 4] },
                    transition: {
                      duration: 3.5,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut"
                    },
                    className: "absolute top-4 right-4 glass-card rounded-xl px-2.5 py-1.5 sm:px-3 text-xs sm:text-sm",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-semibold text-xs", children: "🌿 100% Chemical-Free" })
                  }
                )
              ] })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            className: "absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-secondary/40",
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { delay: 1.6 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs tracking-widest uppercase", children: "Scroll" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  animate: { y: [0, 8, 0] },
                  transition: {
                    duration: 1.6,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut"
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDown, { className: "w-5 h-5" })
                }
              )
            ]
          }
        )
      ]
    }
  );
}
const TRUST_BADGES = [
  {
    icon: Leaf,
    label: "100% Natural Ingredients",
    sub: "No chemicals or toxins"
  },
  { icon: Shield, label: "Handmade with Care", sub: "Crafted traditionally" },
  {
    icon: Star,
    label: "Inspired by Ayurveda",
    sub: "Ancient wisdom, real results"
  },
  { icon: Truck, label: "Free Shipping ₹499+", sub: "Pan India delivery" }
];
function TrustBadgesSection() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "section",
    {
      className: "bg-secondary/10 border-y border-secondary/20 py-8",
      "data-ocid": "trust.section",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-6xl mx-auto px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8", children: TRUST_BADGES.map((badge, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 12 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.4, delay: i * 0.08 },
          className: "flex items-center gap-2 sm:gap-3",
          "data-ocid": `trust.badge.${i + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(badge.icon, { className: "w-4 h-4 sm:w-5 sm:h-5 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-xs sm:text-sm truncate", children: badge.label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground hidden sm:block", children: badge.sub })
            ] })
          ]
        },
        badge.label
      )) }) })
    }
  );
}
function BestSellerAddButton({ product }) {
  const addItem = useCartStore((s) => s.addItem);
  const [added, setAdded] = reactExports.useState(false);
  const finalPrice = product.discount > 0 ? Math.round(product.price * (1 - product.discount / 100)) : product.price;
  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (added) return;
    addItem({ productId: product.id, quantity: 1, price: finalPrice });
    ue.success(`${product.name} added to cart`, { duration: 2500 });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.button,
    {
      type: "button",
      onClick: handleAdd,
      whileTap: { scale: 0.92 },
      animate: added ? { scale: [1, 1.12, 1] } : {},
      transition: { duration: 0.25 },
      className: `flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all duration-200 ${added ? "bg-green-600 text-white" : "text-white"}`,
      style: added ? {} : { background: "#004a38" },
      "aria-label": `Add ${product.name} to cart`,
      "data-ocid": `best_sellers.add_button.${product.id}`,
      children: [
        added ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-3.5 h-3.5" }),
        added ? "Added" : "Add"
      ]
    }
  );
}
function BestSellersSection() {
  const { data: featured = [] } = useFeaturedProducts();
  const displayProducts = (featured.length > 0 ? featured : PRODUCTS_SEED_DATA.filter((p) => p.featured)).slice(0, 8);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "section",
    {
      className: "py-16 sm:py-20 bg-background",
      id: "bestsellers",
      "data-ocid": "best_sellers.section",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-10 sm:mb-12", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-sm font-semibold tracking-widest uppercase mb-3",
              style: { color: "#004a38" },
              children: "Handpicked for You"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h2",
            {
              className: "text-3xl sm:text-4xl md:text-5xl font-bold mb-3",
              style: { color: "#004a38" },
              children: "Best Sellers"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-12 h-0.5 mx-auto mb-4",
              style: { background: "#004a38" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-xl mx-auto text-sm sm:text-base", children: "Our most loved natural products — trusted by thousands of customers" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6", children: displayProducts.map((product, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 16 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.35, delay: i * 0.06 },
            className: "group bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200",
            "data-ocid": `best_sellers.product.${i + 1}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/products/$id", params: { id: String(product.id) }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden", style: { height: "160px" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: product.imageUrl,
                  alt: product.name,
                  loading: "lazy",
                  className: "w-full h-full object-cover group-hover:scale-103 transition-transform duration-300",
                  onError: (e) => {
                    e.currentTarget.src = "/assets/products/brahmi_forestheals.jpg";
                  }
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 sm:p-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "h3",
                  {
                    className: "font-semibold text-xs sm:text-sm leading-snug mb-1 line-clamp-2 group-hover:text-primary transition-colors",
                    style: { color: "#004a38" },
                    children: product.name
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 mb-2 sm:mb-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-3 h-3 sm:w-3.5 sm:h-3.5 fill-amber-400 text-amber-400" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-foreground", children: product.ratings.toFixed(1) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                    "(",
                    product.reviewCount,
                    ")"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-1 sm:gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: "font-bold text-sm sm:text-base",
                      style: { color: "#004a38" },
                      children: [
                        "₹",
                        product.discount > 0 ? Math.round(
                          product.price * (1 - product.discount / 100)
                        ) : product.price
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(BestSellerAddButton, { product })
                ] })
              ] })
            ] })
          },
          product.id
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center mt-10 sm:mt-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            size: "lg",
            variant: "outline",
            className: "border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 sm:px-10 font-semibold transition-smooth h-12",
            "data-ocid": "best_sellers.view_all_button",
            children: "View All Products"
          }
        ) }) })
      ] })
    }
  );
}
const WHY_PILLARS = [
  {
    emoji: "🌿",
    title: "100% Natural Ingredients",
    desc: "Every ingredient is wildcrafted or organically grown. No synthetic pesticides, no harmful chemicals.",
    outcome: "Real purity"
  },
  {
    emoji: "🚫",
    title: "No Chemicals or Toxins",
    desc: "We believe your skin and body deserve better. Zero parabens, sulfates, or artificial additives — ever.",
    outcome: "Clear skin"
  },
  {
    emoji: "🙌",
    title: "Handmade with Care",
    desc: "Every product is crafted in small batches using traditional methods, preserving the full potency of each ingredient.",
    outcome: "Deep nourishment"
  },
  {
    emoji: "🕉️",
    title: "Inspired by Ayurveda",
    desc: "Rooted in 5,000 years of healing wisdom. Our formulations follow classical Ayurvedic principles for lasting results.",
    outcome: "Natural healing"
  }
];
function WhyForestHealsSection() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "section",
    {
      className: "py-16 sm:py-20 bg-muted/30",
      id: "why",
      "data-ocid": "why_forestheals.section",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            className: "text-center mb-12 sm:mb-14",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary text-sm font-semibold tracking-widest uppercase mb-3", children: "Our Promise" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4", children: "🌱 Why ForestHeals?" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-1 bg-primary rounded-full mx-auto" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6", children: WHY_PILLARS.map((pillar, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 30 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { delay: i * 0.12 },
            className: "glass-card rounded-3xl p-5 sm:p-6 text-center hover:shadow-elevated transition-smooth hover:-translate-y-2 overflow-hidden relative",
            "data-ocid": `why.pillar.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-4xl mb-4", children: pillar.emoji }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-bold text-foreground mb-2", children: pillar.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed mb-4", children: pillar.desc }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-semibold px-3 py-1.5 rounded-full", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-3 h-3" }),
                pillar.outcome
              ] })
            ]
          },
          pillar.title
        )) })
      ] })
    }
  );
}
function BrandStorySection() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "section",
    {
      className: "py-16 sm:py-20",
      id: "story",
      "data-ocid": "brand_story.section",
      style: { background: "oklch(0.97 0.015 90)" },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-5xl mx-auto px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-8 sm:gap-12 items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, x: -30 },
            whileInView: { opacity: 1, x: 0 },
            viewport: { once: true },
            className: "space-y-5 sm:space-y-6",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary text-sm font-semibold tracking-widest uppercase mb-3", children: "Our Origins" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight", children: "Our Story 🌿" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed text-sm sm:text-base", children: "ForestHeals was born from a simple belief — nature has all the answers. Deep in India's forests lie ancient secrets of healing, passed down through generations. We source the purest ingredients directly from forest communities, craft them with traditional Ayurvedic wisdom, and bring them straight to your home." }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground leading-relaxed text-sm sm:text-base", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Why forest ingredients?" }),
                " ",
                "Because forests hold plants untouched by chemicals, grown in rich soil, under open skies. That's the ForestHeals difference."
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/about", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  variant: "outline",
                  size: "lg",
                  className: "border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold h-12",
                  "data-ocid": "brand_story.learn_more_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Leaf, { className: "w-4 h-4 mr-2" }),
                    "Learn Our Story"
                  ]
                }
              ) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, x: 30 },
            whileInView: { opacity: 1, x: 0 },
            viewport: { once: true },
            className: "grid grid-cols-2 gap-3 sm:gap-4",
            children: [
              { value: "2,400+", label: "Happy Customers" },
              { value: "100%", label: "Chemical Free" },
              { value: "50+", label: "Products" },
              { value: "5★", label: "Average Rating" }
            ].map((stat, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, scale: 0.9 },
                whileInView: { opacity: 1, scale: 1 },
                viewport: { once: true },
                transition: { delay: i * 0.08 },
                className: "glass-card rounded-2xl p-4 sm:p-5 text-center shadow-soft",
                "data-ocid": `brand_story.stat.${i + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl sm:text-3xl font-bold text-primary mb-1", children: stat.value }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-medium", children: stat.label })
                ]
              },
              stat.label
            ))
          }
        )
      ] }) })
    }
  );
}
function useCountdown(durationMs) {
  const endTime = reactExports.useRef(Date.now() + durationMs);
  const [remaining, setRemaining] = reactExports.useState(endTime.current - Date.now());
  reactExports.useEffect(() => {
    const id = setInterval(
      () => setRemaining(Math.max(0, endTime.current - Date.now())),
      1e3
    );
    return () => clearInterval(id);
  }, []);
  const h = Math.floor(remaining / 36e5);
  const m = Math.floor(remaining % 36e5 / 6e4);
  const s = Math.floor(remaining % 6e4 / 1e3);
  return { h, m, s };
}
function TimerDigit({ value, label }) {
  const display = String(value).padStart(2, "0");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        animate: { scale: [1.1, 1] },
        transition: { duration: 0.25 },
        className: "bg-secondary/15 border border-secondary/25 rounded-xl px-2 py-1.5 sm:px-3 sm:py-2 min-w-[2.8rem] sm:min-w-[3.5rem] text-center",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl sm:text-3xl md:text-4xl font-bold text-secondary tabular-nums", children: display })
      },
      display
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-secondary/55 text-xs mt-1.5 uppercase tracking-wider font-medium", children: label })
  ] });
}
function FlashSaleBanner() {
  const { h, m, s } = useCountdown(23 * 36e5 + 59 * 6e4 + 47 * 1e3);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "section",
    {
      className: "gradient-hero py-14 sm:py-16 relative overflow-hidden",
      "data-ocid": "flash_sale.section",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-24 -left-24 w-72 h-72 rounded-full bg-secondary/5 blur-3xl pointer-events-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-secondary/5 blur-3xl pointer-events-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-5xl mx-auto px-4 text-center relative z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, scale: 0.92 },
            whileInView: { opacity: 1, scale: 1 },
            viewport: { once: true },
            className: "flex flex-col items-center gap-4 sm:gap-5",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-secondary/15 text-secondary border border-secondary/30 text-sm px-4 py-1.5 animate-pulse", children: "🔥 Limited Time Offer" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl sm:text-3xl md:text-5xl font-bold text-secondary text-balance", children: "Flash Sale — Up to 30% Off!" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-secondary/65 text-sm sm:text-base max-w-md", children: "Stock up on your wellness essentials at exclusive prices. Only limited quantities available!" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end gap-2 sm:gap-3 mt-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TimerDigit, { value: h, label: "Hours" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-secondary/50 text-xl sm:text-2xl font-bold mb-6", children: ":" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TimerDigit, { value: m, label: "Mins" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-secondary/50 text-xl sm:text-2xl font-bold mb-6", children: ":" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TimerDigit, { value: s, label: "Secs" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  size: "lg",
                  className: "bg-secondary text-primary hover:bg-secondary/90 font-bold px-8 sm:px-10 shadow-green text-base h-12",
                  "data-ocid": "flash_sale.shop_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-5 h-5 mr-2" }),
                    "Shop Flash Sale"
                  ]
                }
              ) })
            ]
          }
        ) })
      ]
    }
  );
}
const BUNDLES = [
  {
    id: "skincare",
    name: "Skincare Bundle",
    tagline: "Glow from within, naturally",
    productIds: [4, 7, 6],
    totalPrice: 199 + 149 + 219,
    ocid: "bundle.skincare"
  },
  {
    id: "haircare",
    name: "Haircare Bundle",
    tagline: "Nourish every strand",
    productIds: [2, 6, 11],
    totalPrice: 249 + 219 + 349,
    ocid: "bundle.haircare"
  }
];
function BundleCard({ bundle }) {
  const products = bundle.productIds.map((id) => PRODUCTS_SEED_DATA.find((p) => p.id === id)).filter((p) => p !== void 0);
  const discountedPrice = Math.round(bundle.totalPrice * 0.85);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 24 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 0.5 },
      whileHover: { y: -6 },
      className: "glass-card rounded-3xl overflow-hidden shadow-soft hover:shadow-elevated transition-smooth group w-full",
      "data-ocid": bundle.ocid,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-44 sm:h-52 bg-gradient-to-br from-muted to-secondary/10 flex items-center justify-center overflow-hidden", children: [
          products.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: p.imageUrl,
              alt: p.name,
              className: "absolute w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 object-cover rounded-2xl shadow-elevated border-2 border-card",
              style: {
                left: `${18 + i * 26}%`,
                top: "50%",
                transform: `translateY(-50%) rotate(${(i - 1) * 9}deg)`,
                zIndex: i + 1
              }
            },
            p.id
          )),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "absolute top-3 right-3 bg-destructive text-destructive-foreground font-bold px-3 text-sm z-10", children: "Save 15%" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 sm:p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg sm:text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-smooth", children: bundle.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-3", children: bundle.tagline }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5 mb-5", children: products.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "text-xs bg-muted text-muted-foreground rounded-full px-2.5 py-0.5",
              children: p.name.split(" ")[0]
            },
            p.id
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xl sm:text-2xl font-bold text-primary", children: [
                "₹",
                discountedPrice
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground line-through ml-2", children: [
                "₹",
                bundle.totalPrice
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/bundles", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                size: "lg",
                className: "font-semibold h-12 px-8 text-base",
                "data-ocid": `${bundle.ocid}.shop_button`,
                children: "Shop Bundle"
              }
            ) })
          ] })
        ] })
      ]
    }
  );
}
function BundlesSection() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "section",
    {
      className: "py-16 sm:py-20 bg-muted/25",
      id: "bundles",
      "data-ocid": "bundles.section",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            className: "text-center mb-10 sm:mb-12",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary text-sm font-semibold tracking-widest uppercase mb-3", children: "Curated Sets" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4", children: "Wellness Bundles" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-1 bg-primary rounded-full mx-auto mb-5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground max-w-lg mx-auto text-sm sm:text-base", children: [
                "Expertly curated combinations for targeted wellness.",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-primary", children: "Save 15%" }),
                " on every bundle."
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 justify-items-center", children: BUNDLES.map((bundle) => /* @__PURE__ */ jsxRuntimeExports.jsx(BundleCard, { bundle }, bundle.id)) })
      ] })
    }
  );
}
const CONDITIONS = [
  { label: "Hair Fall", value: "hair-fall", emoji: "💆" },
  { label: "Stress", value: "stress", emoji: "🧘" },
  { label: "Immunity", value: "immunity", emoji: "🛡️" },
  { label: "Digestion", value: "digestion", emoji: "🌿" },
  { label: "Energy", value: "energy", emoji: "⚡" },
  { label: "Skin Health", value: "skin-care", emoji: "✨" },
  { label: "Sleep", value: "sleep", emoji: "🌙" },
  { label: "Women's Health", value: "women", emoji: "🌸" }
];
function RemedySection() {
  const [selected, setSelected] = reactExports.useState(null);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "section",
    {
      className: "py-16 sm:py-20 relative overflow-hidden",
      id: "remedy",
      "data-ocid": "remedy.section",
      style: {
        background: "linear-gradient(135deg, oklch(0.96 0.04 152) 0%, oklch(0.98 0.06 90) 100%)"
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-4 relative z-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            className: "text-center mb-8 sm:mb-10",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary text-sm font-semibold tracking-widest uppercase mb-3", children: "Ayurvedic Intelligence" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4", children: "Find Your Natural Remedy" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-1 bg-primary rounded-full mx-auto mb-5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-xl mx-auto leading-relaxed text-sm sm:text-base", children: "Select your concern and discover the perfect natural remedy." })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 sm:gap-3 justify-center mb-8 sm:mb-10", children: CONDITIONS.map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.button,
          {
            type: "button",
            initial: { opacity: 0, scale: 0.88 },
            whileInView: { opacity: 1, scale: 1 },
            viewport: { once: true },
            transition: { delay: i * 0.05 },
            whileTap: { scale: 0.96 },
            onClick: () => setSelected(c.value),
            className: `px-4 py-2 sm:px-5 sm:py-2.5 rounded-full border font-medium text-xs sm:text-sm transition-smooth cursor-pointer select-none ${selected === c.value ? "bg-primary text-primary-foreground border-primary shadow-green" : "bg-card/80 text-foreground border-border hover:border-primary hover:text-primary backdrop-blur-sm"}`,
            "data-ocid": `remedy.condition.${c.value}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mr-1.5", children: c.emoji }),
              c.label
            ]
          },
          c.value
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: selected && /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 14 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: -10 },
            className: "text-center",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/recommend", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                size: "lg",
                className: "font-semibold px-8 sm:px-10 shadow-green h-12",
                "data-ocid": "remedy.see_recommendations_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Leaf, { className: "w-5 h-5 mr-2" }),
                  "See My Recommendations"
                ]
              }
            ) })
          },
          "remedy-cta"
        ) })
      ] })
    }
  );
}
const ECO_PILLARS = [
  {
    emoji: "🌱",
    title: "Sustainably Sourced",
    desc: "Every ingredient is wildcrafted or organically grown — no synthetic pesticides, no harmful chemicals. We partner directly with traditional farmers."
  },
  {
    emoji: "📦",
    title: "Kraft Paper Packaging",
    desc: "100% biodegradable and plastic-free packaging made from recycled kraft paper. Our planet doesn't pay the price for your wellness."
  },
  {
    emoji: "🌍",
    title: "Carbon Conscious",
    desc: "We actively partner with reforestation initiatives, planting trees with every purchase. Real healing for real forests."
  }
];
function EcoSection() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "section",
    {
      className: "py-16 sm:py-20 bg-card",
      id: "eco",
      "data-ocid": "eco.section",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            className: "text-center mb-12 sm:mb-14",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary text-sm font-semibold tracking-widest uppercase mb-3", children: "Our Earth Promise" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4", children: "Our Commitment to Earth" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-1 bg-primary rounded-full mx-auto" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8", children: ECO_PILLARS.map((pillar, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 30 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { delay: i * 0.15 },
            className: "relative glass-card rounded-3xl p-6 sm:p-8 text-center hover:shadow-elevated transition-smooth hover:-translate-y-2 overflow-hidden",
            "data-ocid": `eco.pillar.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-4xl sm:text-5xl mb-4 sm:mb-5", children: pillar.emoji }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg sm:text-xl font-bold text-foreground mb-3", children: pillar.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed text-sm", children: pillar.desc })
            ]
          },
          pillar.title
        )) })
      ] })
    }
  );
}
const TESTIMONIALS = [
  {
    quote: "My skin improved in just 2 weeks! I can't believe the difference. Finally something natural that actually works.",
    name: "Priya S.",
    role: "Mumbai",
    rating: 5,
    outcome: "Clear, glowing skin"
  },
  {
    quote: "Finally something natural that works. No more chemicals! My face feels so much cleaner and healthier.",
    name: "Rahul K.",
    role: "Delhi",
    rating: 5,
    outcome: "Chemical-free routine"
  },
  {
    quote: "My hair fall reduced significantly after using ForestHeals Hair Oil. I'm genuinely amazed by the results.",
    name: "Anjali M.",
    role: "Bangalore",
    rating: 5,
    outcome: "Reduced hair fall"
  },
  {
    quote: "The Brahmi powder has been amazing for my memory and focus. As a doctor, I appreciate the quality and purity.",
    name: "Dr. Suresh P.",
    role: "Ayurvedic Physician, Delhi",
    rating: 5,
    outcome: "Better focus & memory"
  }
];
function TestimonialsSection() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "section",
    {
      className: "py-16 sm:py-20",
      id: "testimonials",
      "data-ocid": "testimonials.section",
      style: { background: "oklch(0.98 0.02 90)" },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-10 sm:mb-12", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-sm font-semibold tracking-widest uppercase mb-3",
              style: { color: "#004a38" },
              children: "Real Stories"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h2",
            {
              className: "text-3xl sm:text-4xl md:text-5xl font-bold mb-3",
              style: { color: "#004a38" },
              children: "What Our Customers Say"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-12 h-0.5 mx-auto",
              style: { background: "#004a38" }
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5", children: TESTIMONIALS.map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 18 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.35, delay: i * 0.07 },
            className: "bg-card rounded-xl p-4 sm:p-5 shadow-sm flex flex-col gap-3",
            "data-ocid": `testimonial.card.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-0.5", children: Array.from({ length: t.rating }, (_v, si) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "text-amber-400 text-base",
                  children: "★"
                },
                `star-${i}-${si + 1}`
              )) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-foreground text-sm leading-relaxed flex-1", children: [
                '"',
                t.quote,
                '"'
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 pt-2 border-t border-border", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0",
                    style: { background: "#004a38", color: "#f1e0a9" },
                    children: t.name[0]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "font-semibold text-sm truncate",
                      style: { color: "#004a38" },
                      children: t.name
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: t.role })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  CircleCheck,
                  {
                    className: "w-4 h-4 shrink-0 ml-auto",
                    style: { color: "#004a38" }
                  }
                )
              ] })
            ]
          },
          t.name
        )) })
      ] })
    }
  );
}
const B2B_STATS = [
  { value: "50+", label: "Product SKUs" },
  { value: "12", label: "Countries Served" },
  { value: "500+", label: "Business Partners" }
];
function B2BSection() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "section",
    {
      className: "gradient-hero py-16 sm:py-20 relative overflow-hidden",
      id: "b2b",
      "data-ocid": "b2b.section",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-6xl mx-auto px-4 relative z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-8 sm:gap-12 items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, x: -30 },
            whileInView: { opacity: 1, x: 0 },
            viewport: { once: true },
            className: "space-y-5 sm:space-y-6",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-secondary/55 text-sm font-semibold tracking-widest uppercase mb-3", children: "Wholesale & Export" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl sm:text-4xl md:text-5xl font-bold text-secondary leading-tight", children: "Partner with Forestheals" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-secondary/65 text-sm sm:text-base leading-relaxed", children: "Scale your wellness business with Forestheals' premium bulk supply program. Competitive wholesale pricing, custom labelling, and dedicated export support for international buyers." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2 sm:space-y-2.5", children: [
                "Custom branding & private label options",
                "Competitive bulk pricing from 10kg+",
                "FSSAI, ISO certified products",
                "Export-ready packaging & documentation"
              ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "li",
                {
                  className: "flex items-start gap-2.5 text-secondary/75 text-sm",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 text-secondary/50 shrink-0 mt-0.5" }),
                    item
                  ]
                },
                item
              )) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/b2b", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  size: "lg",
                  className: "bg-secondary text-primary hover:bg-secondary/90 font-semibold px-8 shadow-green h-12",
                  "data-ocid": "b2b.explore_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-5 h-5 mr-2" }),
                    "Explore B2B Options"
                  ]
                }
              ) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 sm:space-y-4", children: B2B_STATS.map((stat, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, x: 30 },
            whileInView: { opacity: 1, x: 0 },
            viewport: { once: true },
            transition: { delay: i * 0.12 },
            className: "glass-card rounded-2xl p-4 sm:p-5 flex items-center gap-4 sm:gap-6",
            "data-ocid": `b2b.stat.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl sm:text-4xl md:text-5xl font-bold text-secondary", children: stat.value }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-secondary/60 text-sm sm:text-base", children: stat.label })
            ]
          },
          stat.label
        )) })
      ] }) })
    }
  );
}
function FinalCTASection() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "section",
    {
      className: "py-16 sm:py-20 bg-background",
      id: "final-cta",
      "data-ocid": "final_cta.section",
      style: { background: "oklch(0.97 0.015 90)" },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-3xl mx-auto px-4 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          className: "space-y-5 sm:space-y-6",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-5xl mb-2", children: "🌿" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight", children: "Start Your Natural Healing Journey Today" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-base sm:text-lg max-w-xl mx-auto leading-relaxed", children: "Join thousands of happy customers who chose the natural way" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", className: "w-full sm:w-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  size: "lg",
                  className: "w-full sm:w-auto font-semibold px-8 sm:px-10 shadow-green text-base h-12",
                  "data-ocid": "final_cta.shop_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-5 h-5 mr-2" }),
                    "Shop Now"
                  ]
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/recommend", className: "w-full sm:w-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  variant: "outline",
                  size: "lg",
                  className: "w-full sm:w-auto border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold px-8 sm:px-10 text-base h-12",
                  "data-ocid": "final_cta.recommend_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Leaf, { className: "w-5 h-5 mr-2" }),
                    "Find My Remedy"
                  ]
                }
              ) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              "🌿 Free shipping above ₹499  |  10% off first order with code ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-primary", children: "FOREST10" })
            ] })
          ]
        }
      ) })
    }
  );
}
function NewsletterSection() {
  const [email, setEmail] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setEmail("");
    ue.success("Welcome to the Forestheals community! 🌿", {
      description: "You'll receive exclusive wellness tips and offers.",
      duration: 5e3
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "section",
    {
      className: "py-16 sm:py-20 bg-card",
      id: "community",
      "data-ocid": "newsletter.section",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-3xl mx-auto px-4 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          className: "space-y-5 sm:space-y-6",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-7 h-7 sm:w-8 sm:h-8 text-primary" }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary text-sm font-semibold tracking-widest uppercase mb-3", children: "Join Our Community" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4", children: "Join Our Wellness Community" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-1 bg-primary rounded-full mx-auto mb-5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-xl mx-auto leading-relaxed text-sm sm:text-base", children: "Get exclusive Ayurvedic recipes, wellness tips, early access to new products, and members-only discounts." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "form",
              {
                onSubmit: handleSubscribe,
                className: "flex flex-col sm:flex-row gap-3 max-w-md mx-auto w-full",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      type: "email",
                      placeholder: "Enter your email address",
                      value: email,
                      onChange: (e) => setEmail(e.target.value),
                      required: true,
                      className: "h-12 text-base bg-background flex-1",
                      "data-ocid": "newsletter.email_input"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "submit",
                      size: "lg",
                      disabled: loading,
                      className: "h-12 px-8 font-semibold shrink-0",
                      "data-ocid": "newsletter.subscribe_button",
                      children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                        motion.div,
                        {
                          animate: { rotate: 360 },
                          transition: {
                            duration: 1,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "linear"
                          },
                          className: "w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                        }
                      ) : "Subscribe"
                    }
                  )
                ]
              }
            )
          ]
        }
      ) })
    }
  );
}
function HomePage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen", "data-ocid": "home.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(OfferBanner, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(HeroSection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TrustBadgesSection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(BestSellersSection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(WhyForestHealsSection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(BrandStorySection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FlashSaleBanner, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(BundlesSection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(RemedySection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(EcoSection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TestimonialsSection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(B2BSection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FinalCTASection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(NewsletterSection, {})
  ] });
}
export {
  HomePage as default
};
