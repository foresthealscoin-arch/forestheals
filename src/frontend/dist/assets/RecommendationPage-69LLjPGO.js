import { G as useSearch, r as reactExports, j as jsxRuntimeExports, m as motion, B as Badge, A as AnimatePresence, L as Link, a as Button } from "./index-xECe6EUo.js";
import { P as ProductCard } from "./ProductCard-BoYdzfR8.js";
import { d as useRecommendations } from "./useProducts-kgXIurw9.js";
import "./formatters-C5vW1ZnJ.js";
import "./tag-CpKiypdT.js";
import "./check-O-YLQuAd.js";
import "./star-3Mia4EiO.js";
import "./backend-BLkFotdR.js";
const CONDITIONS = [
  {
    key: "hair-fall",
    label: "Hair Fall",
    emoji: "💇",
    description: "Hair loss is linked to nutritional deficiencies, stress, and hormonal imbalance. Ayurvedic herbs nourish follicles and strengthen scalp tissue from the root."
  },
  {
    key: "stress",
    label: "Stress & Anxiety",
    emoji: "😰",
    description: "Chronic stress depletes your vital energy (ojas). Adaptogenic herbs recalibrate the nervous system, lower cortisol, and restore mental clarity."
  },
  {
    key: "immunity",
    label: "Low Immunity",
    emoji: "🛡️",
    description: "A weakened immune system benefits from rasayana herbs packed with antioxidants, phytonutrients, and immunomodulators to fortify your defenses."
  },
  {
    key: "digestion",
    label: "Digestion Issues",
    emoji: "🫄",
    description: "In Ayurveda, good digestion (agni) is the cornerstone of health. Specific herbs kindle digestive fire and restore gut microbiome balance."
  },
  {
    key: "energy",
    label: "Low Energy",
    emoji: "⚡",
    description: "Fatigue often stems from nutrient gaps and weakened ojas. Tonic herbs and superfoods restore mitochondrial energy production and sustainable vitality."
  },
  {
    key: "skin-care",
    label: "Skin Concerns",
    emoji: "✨",
    description: "Skin reflects internal health. Ayurvedic herbs cleanse blood, reduce inflammation, and provide topical minerals for clear, radiant skin."
  },
  {
    key: "sleep",
    label: "Poor Sleep",
    emoji: "😴",
    description: "Sleep disorders arise from vata imbalance. Calming nervine herbs reduce mental chatter, lower cortisol at night, and promote deep restorative sleep."
  },
  {
    key: "womens_health",
    label: "Women's Wellness",
    emoji: "🌸",
    description: "Hormonal fluctuations across the cycle, perimenopause, and beyond respond well to Ayurvedic rasayanas that nourish reproductive tissue."
  },
  {
    key: "joint_health",
    label: "Joint Pain",
    emoji: "🦴",
    description: "Joint inflammation (ama accumulation) benefits from anti-inflammatory herbs that reduce swelling, improve circulation, and rebuild cartilage."
  }
];
const CONDITION_MAP = Object.fromEntries(
  CONDITIONS.map((c) => [c.key, c.label])
);
const KEY_ALIAS = {
  womens_health: "stress",
  joint_health: "joint-pain"
};
function RecommendationPage() {
  const searchParams = useSearch({ strict: false });
  const [selected, setSelected] = reactExports.useState(
    searchParams.condition ?? ""
  );
  reactExports.useEffect(() => {
    if (searchParams.condition) setSelected(searchParams.condition);
  }, [searchParams.condition]);
  const queryKey = KEY_ALIAS[selected] ?? selected;
  const { data: recommendations = [], isLoading } = useRecommendations(queryKey);
  const activeCondition = CONDITIONS.find((c) => c.key === selected);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "gradient-hero py-16 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-4xl mx-auto text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: -10 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-secondary/20 text-secondary border-secondary/30 mb-4", children: "Ayurvedic Wisdom" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl md:text-5xl font-bold text-primary-foreground mb-4 font-display", children: "Find Your Natural Remedy" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-primary-foreground/70 max-w-2xl mx-auto", children: "Ayurveda wisdom for modern wellness — select your concern below" })
        ]
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "max-w-5xl mx-auto px-4 py-12",
        "data-ocid": "recommend.section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold text-foreground text-center mb-8", children: "What would you like to address?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "grid grid-cols-3 gap-4 md:gap-6",
              "data-ocid": "recommend.conditions.list",
              children: CONDITIONS.map((cond, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.button,
                {
                  type: "button",
                  initial: { opacity: 0, scale: 0.95 },
                  animate: { opacity: 1, scale: 1 },
                  transition: { delay: i * 0.05, duration: 0.35 },
                  onClick: () => setSelected((prev) => prev === cond.key ? "" : cond.key),
                  className: `relative rounded-2xl p-5 text-center border-2 transition-smooth cursor-pointer shadow-soft hover:shadow-elevated
                ${selected === cond.key ? "border-primary bg-primary/8 shadow-green" : "border-border bg-card hover:border-primary/40"}`,
                  "data-ocid": `recommend.condition.${i + 1}`,
                  "aria-pressed": selected === cond.key,
                  children: [
                    selected === cond.key && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "svg",
                      {
                        viewBox: "0 0 12 12",
                        className: "w-3 h-3 text-primary-foreground fill-current",
                        "aria-hidden": "true",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Selected" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "M2 6l3 3 5-5",
                              stroke: "currentColor",
                              strokeWidth: "1.5",
                              fill: "none",
                              strokeLinecap: "round",
                              strokeLinejoin: "round"
                            }
                          )
                        ]
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl mb-2 block", children: cond.emoji }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: `text-sm font-semibold leading-tight block ${selected === cond.key ? "text-primary" : "text-foreground"}`,
                        children: cond.label
                      }
                    )
                  ]
                },
                cond.key
              ))
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: selected && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 30 },
              animate: { opacity: 1, y: 0 },
              exit: { opacity: 0, y: -10 },
              transition: { duration: 0.45, ease: "easeOut" },
              className: "mt-14",
              "data-ocid": "recommend.results.section",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-8", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-2xl md:text-3xl font-bold text-foreground mb-3", children: [
                    "Recommended for",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: CONDITION_MAP[selected] ?? selected })
                  ] }),
                  activeCondition && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-2xl mx-auto text-base leading-relaxed", children: activeCondition.description })
                ] }),
                isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: ["a", "b", "c", "d"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "bg-muted rounded-2xl aspect-[3/4] animate-pulse"
                  },
                  k
                )) }) : recommendations.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "grid grid-cols-2 md:grid-cols-4 gap-4",
                    "data-ocid": "recommend.results.list",
                    children: recommendations.map((product, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, { product, index: i }, product.id))
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "text-center py-12 text-muted-foreground",
                    "data-ocid": "recommend.results.empty_state",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "No specific recommendations found. Explore our full range." }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", className: "mt-4", children: "Browse All Products" }) })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center mt-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    variant: "outline",
                    size: "lg",
                    "data-ocid": "recommend.view_all.button",
                    children: "View All Products"
                  }
                ) }) })
              ]
            },
            selected
          ) }),
          !selected && /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.p,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { delay: 0.6 },
              className: "mt-12 text-center text-muted-foreground text-sm",
              children: "Select a condition above to see personalised Ayurvedic product recommendations"
            }
          )
        ]
      }
    )
  ] });
}
export {
  RecommendationPage as default
};
