import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link, useSearch } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { ProductCard } from "../components/ui/ProductCard";
import { useRecommendations } from "../hooks/useProducts";

interface ConditionEntry {
  key: string;
  label: string;
  emoji: string;
  description: string;
}

const CONDITIONS: ConditionEntry[] = [
  {
    key: "hair-fall",
    label: "Hair Fall",
    emoji: "💇",
    description:
      "Hair loss is linked to nutritional deficiencies, stress, and hormonal imbalance. Ayurvedic herbs nourish follicles and strengthen scalp tissue from the root.",
  },
  {
    key: "stress",
    label: "Stress & Anxiety",
    emoji: "😰",
    description:
      "Chronic stress depletes your vital energy (ojas). Adaptogenic herbs recalibrate the nervous system, lower cortisol, and restore mental clarity.",
  },
  {
    key: "immunity",
    label: "Low Immunity",
    emoji: "🛡️",
    description:
      "A weakened immune system benefits from rasayana herbs packed with antioxidants, phytonutrients, and immunomodulators to fortify your defenses.",
  },
  {
    key: "digestion",
    label: "Digestion Issues",
    emoji: "🫄",
    description:
      "In Ayurveda, good digestion (agni) is the cornerstone of health. Specific herbs kindle digestive fire and restore gut microbiome balance.",
  },
  {
    key: "energy",
    label: "Low Energy",
    emoji: "⚡",
    description:
      "Fatigue often stems from nutrient gaps and weakened ojas. Tonic herbs and superfoods restore mitochondrial energy production and sustainable vitality.",
  },
  {
    key: "skin-care",
    label: "Skin Concerns",
    emoji: "✨",
    description:
      "Skin reflects internal health. Ayurvedic herbs cleanse blood, reduce inflammation, and provide topical minerals for clear, radiant skin.",
  },
  {
    key: "sleep",
    label: "Poor Sleep",
    emoji: "😴",
    description:
      "Sleep disorders arise from vata imbalance. Calming nervine herbs reduce mental chatter, lower cortisol at night, and promote deep restorative sleep.",
  },
  {
    key: "womens_health",
    label: "Women's Wellness",
    emoji: "🌸",
    description:
      "Hormonal fluctuations across the cycle, perimenopause, and beyond respond well to Ayurvedic rasayanas that nourish reproductive tissue.",
  },
  {
    key: "joint_health",
    label: "Joint Pain",
    emoji: "🦴",
    description:
      "Joint inflammation (ama accumulation) benefits from anti-inflammatory herbs that reduce swelling, improve circulation, and rebuild cartilage.",
  },
];

const CONDITION_MAP: Record<string, string> = Object.fromEntries(
  CONDITIONS.map((c) => [c.key, c.label]),
);

// Map non-standard keys to useRecommendations-supported keys
const KEY_ALIAS: Record<string, string> = {
  womens_health: "stress",
  joint_health: "joint-pain",
};

export default function RecommendationPage() {
  const searchParams = useSearch({ strict: false }) as { condition?: string };
  const [selected, setSelected] = useState<string>(
    searchParams.condition ?? "",
  );

  useEffect(() => {
    if (searchParams.condition) setSelected(searchParams.condition);
  }, [searchParams.condition]);

  const queryKey = KEY_ALIAS[selected] ?? selected;
  const { data: recommendations = [], isLoading } =
    useRecommendations(queryKey);
  const activeCondition = CONDITIONS.find((c) => c.key === selected);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="gradient-hero py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge className="bg-secondary/20 text-secondary border-secondary/30 mb-4">
              Ayurvedic Wisdom
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4 font-display">
              Find Your Natural Remedy
            </h1>
            <p className="text-lg text-primary-foreground/70 max-w-2xl mx-auto">
              Ayurveda wisdom for modern wellness — select your concern below
            </p>
          </motion.div>
        </div>
      </div>

      {/* Condition Grid */}
      <div
        className="max-w-5xl mx-auto px-4 py-12"
        data-ocid="recommend.section"
      >
        <h2 className="text-xl font-semibold text-foreground text-center mb-8">
          What would you like to address?
        </h2>
        <div
          className="grid grid-cols-3 gap-4 md:gap-6"
          data-ocid="recommend.conditions.list"
        >
          {CONDITIONS.map((cond, i) => (
            <motion.button
              key={cond.key}
              type="button"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05, duration: 0.35 }}
              onClick={() =>
                setSelected((prev) => (prev === cond.key ? "" : cond.key))
              }
              className={`relative rounded-2xl p-5 text-center border-2 transition-smooth cursor-pointer shadow-soft hover:shadow-elevated
                ${
                  selected === cond.key
                    ? "border-primary bg-primary/8 shadow-green"
                    : "border-border bg-card hover:border-primary/40"
                }`}
              data-ocid={`recommend.condition.${i + 1}`}
              aria-pressed={selected === cond.key}
            >
              {selected === cond.key && (
                <span className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                  <svg
                    viewBox="0 0 12 12"
                    className="w-3 h-3 text-primary-foreground fill-current"
                    aria-hidden="true"
                  >
                    <title>Selected</title>
                    <path
                      d="M2 6l3 3 5-5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              )}
              <span className="text-3xl mb-2 block">{cond.emoji}</span>
              <span
                className={`text-sm font-semibold leading-tight block ${
                  selected === cond.key ? "text-primary" : "text-foreground"
                }`}
              >
                {cond.label}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Results */}
        <AnimatePresence>
          {selected && (
            <motion.div
              key={selected}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="mt-14"
              data-ocid="recommend.results.section"
            >
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                  Recommended for{" "}
                  <span className="text-primary">
                    {CONDITION_MAP[selected] ?? selected}
                  </span>
                </h2>
                {activeCondition && (
                  <p className="text-muted-foreground max-w-2xl mx-auto text-base leading-relaxed">
                    {activeCondition.description}
                  </p>
                )}
              </div>

              {isLoading ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {(["a", "b", "c", "d"] as const).map((k) => (
                    <div
                      key={k}
                      className="bg-muted rounded-2xl aspect-[3/4] animate-pulse"
                    />
                  ))}
                </div>
              ) : recommendations.length > 0 ? (
                <div
                  className="grid grid-cols-2 md:grid-cols-4 gap-4"
                  data-ocid="recommend.results.list"
                >
                  {recommendations.map((product, i) => (
                    <ProductCard key={product.id} product={product} index={i} />
                  ))}
                </div>
              ) : (
                <div
                  className="text-center py-12 text-muted-foreground"
                  data-ocid="recommend.results.empty_state"
                >
                  <p>
                    No specific recommendations found. Explore our full range.
                  </p>
                  <Link to="/products">
                    <Button type="button" className="mt-4">
                      Browse All Products
                    </Button>
                  </Link>
                </div>
              )}

              <div className="text-center mt-10">
                <Link to="/products">
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    data-ocid="recommend.view_all.button"
                  >
                    View All Products
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!selected && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-12 text-center text-muted-foreground text-sm"
          >
            Select a condition above to see personalised Ayurvedic product
            recommendations
          </motion.p>
        )}
      </div>
    </div>
  );
}
