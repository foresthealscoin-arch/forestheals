import { j as jsxRuntimeExports, m as motion, B as Badge, u as useCartStore, r as reactExports, P as PRODUCTS_SEED_DATA, a as Button, S as ShoppingBag, h as cn, d as ue } from "./index-Oxc-_oxi.js";
import { f as formatPrice, g as getDiscountedPrice } from "./formatters-C5vW1ZnJ.js";
import { S as Sparkles } from "./sparkles-BCdz1axw.js";
import { C as CircleCheckBig } from "./circle-check-big-aYA9Pqja.js";
import { C as Check } from "./check-DKcnpQxu.js";
const BUNDLES = [
  {
    id: "skincare",
    name: "Radiant Skin Bundle",
    tagline: "Deep cleanse, brighten & protect your skin naturally",
    productIds: [7, 4, 6],
    // Multani Mitti, Neem, Amla
    concern: "Skin Concerns",
    emoji: "✨"
  },
  {
    id: "haircare",
    name: "Luscious Hair Bundle",
    tagline: "Nourish follicles, reduce hair fall & add natural shine",
    productIds: [2, 6, 11],
    // Brahmi, Amla, Shatavari
    concern: "Hair Care",
    emoji: "💇"
  }
];
const DISCOUNT = 15;
function BundleCard({ bundle, index }) {
  const addItem = useCartStore((s) => s.addItem);
  const [isAdded, setIsAdded] = reactExports.useState(false);
  const products = bundle.productIds.map((id) => PRODUCTS_SEED_DATA.find((p) => p.id === id)).filter((p) => p !== void 0);
  const totalOriginal = products.reduce((sum, p) => sum + p.price, 0);
  const bundlePrice = getDiscountedPrice(totalOriginal, DISCOUNT);
  const savings = totalOriginal - bundlePrice;
  const handleAddBundle = () => {
    if (isAdded) return;
    for (const p of products) {
      addItem({
        productId: p.id,
        quantity: 1,
        price: Math.round(p.price * (1 - DISCOUNT / 100))
      });
    }
    ue.success(`${bundle.name} added to cart`, { duration: 3e3 });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 24 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 0.5, delay: index * 0.15 },
      className: "glass-card rounded-3xl overflow-hidden shadow-elevated hover:shadow-green transition-smooth w-full",
      "data-ocid": `bundles.card.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative bg-muted/50 p-6 flex flex-col items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-4 right-4 z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-destructive text-destructive-foreground font-bold text-sm px-3 py-1", children: [
            "Save ",
            DISCOUNT,
            "%"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center gap-2 sm:gap-3 w-full", children: products.map((product, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "rounded-2xl overflow-hidden shadow-soft border-2 border-card",
                style: {
                  width: i === 1 ? 100 : 76,
                  height: i === 1 ? 100 : 76,
                  opacity: i !== 1 ? 0.85 : 1,
                  flexShrink: 0
                },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: product.imageUrl,
                    alt: product.name,
                    className: "w-full h-full object-cover",
                    loading: "lazy"
                  }
                )
              }
            ),
            i < products.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-bold text-lg ml-2 sm:ml-3", children: "+" })
          ] }, product.id)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 sm:p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: bundle.emoji }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground uppercase tracking-wider font-medium", children: bundle.concern })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold text-foreground mt-1 mb-1", children: bundle.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-4", children: bundle.tagline }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1.5 mb-5", children: products.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4 text-primary shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground min-w-0 truncate", children: p.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground ml-auto text-xs shrink-0", children: formatPrice(p.price) })
          ] }, p.id)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-5 bg-primary/5 rounded-xl p-3 border border-primary/10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Bundle Price" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-primary", children: formatPrice(bundlePrice) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-auto text-right", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground line-through", children: formatPrice(totalOriginal) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm font-semibold text-destructive", children: [
                "Save ",
                formatPrice(savings)
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              whileTap: { scale: 0.97 },
              animate: isAdded ? { scale: [1, 1.05, 1] } : {},
              transition: { duration: 0.3 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  size: "lg",
                  className: cn(
                    "w-full transition-all duration-300 h-12",
                    isAdded && "bg-green-600 hover:bg-green-600"
                  ),
                  onClick: handleAddBundle,
                  "data-ocid": `bundles.add_bundle.${index + 1}`,
                  children: isAdded ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4 mr-2" }),
                    "Bundle Added!"
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-4 h-4 mr-2" }),
                    "Add Bundle to Cart"
                  ] })
                }
              )
            }
          )
        ] })
      ]
    }
  );
}
function BundlesPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "gradient-hero py-14 sm:py-16 px-4",
        "data-ocid": "bundles.hero.section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-3xl mx-auto text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 16 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.5 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-secondary/20 text-secondary border-secondary/30 mb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3.5 h-3.5 mr-1" }),
                "Save 15% on Bundles"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl sm:text-4xl md:text-5xl font-bold text-primary-foreground font-display mb-4", children: "Wellness Bundles — Better Together" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base sm:text-lg text-primary-foreground/75", children: "Curated Ayurvedic bundles at 15% savings" })
            ]
          }
        ) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-4 py-10 sm:py-14", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-8 sm:mb-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl sm:text-3xl font-bold text-foreground mb-2", children: "Our Product Bundles" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm sm:text-base", children: "Expertly curated for your wellness journey" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 justify-items-center mb-8",
          "data-ocid": "bundles.list",
          children: [
            BUNDLES.map((bundle, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(BundleCard, { bundle, index: i }, bundle.id)),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 24 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true },
                transition: { duration: 0.5, delay: 0.3 },
                className: "glass-card rounded-3xl border-2 border-dashed border-border p-8 sm:p-10 flex flex-col items-center justify-center text-center shadow-soft w-full",
                "data-ocid": "bundles.coming_soon.card",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-muted flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-7 h-7 sm:w-8 sm:h-8 text-muted-foreground" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold text-foreground mb-2", children: "More Coming Soon" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm max-w-xs", children: "Immunity, Energy Boost, and Seasonal Wellness bundles are being curated for you." }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "mt-4 bg-muted text-muted-foreground", children: "Coming Q1 2026" })
                ]
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.45 },
          className: "gradient-cream rounded-2xl p-5 sm:p-6 border border-border/50 text-center",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "All bundles include free shipping · Sourced from certified organic farms · 30-day return guarantee" })
        }
      )
    ] })
  ] });
}
export {
  BundlesPage as default
};
