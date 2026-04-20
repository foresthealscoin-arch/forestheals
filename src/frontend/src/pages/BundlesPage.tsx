import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, CheckCircle, ShoppingBag, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { formatPrice, getDiscountedPrice } from "../lib/formatters";
import { PRODUCTS_SEED_DATA } from "../lib/seedData";
import { useCartStore } from "../stores/useCartStore";

interface Bundle {
  id: string;
  name: string;
  tagline: string;
  productIds: number[];
  concern: string;
  emoji: string;
}

const BUNDLES: Bundle[] = [
  {
    id: "skincare",
    name: "Radiant Skin Bundle",
    tagline: "Deep cleanse, brighten & protect your skin naturally",
    productIds: [7, 4, 6], // Multani Mitti, Neem, Amla
    concern: "Skin Concerns",
    emoji: "✨",
  },
  {
    id: "haircare",
    name: "Luscious Hair Bundle",
    tagline: "Nourish follicles, reduce hair fall & add natural shine",
    productIds: [2, 6, 11], // Brahmi, Amla, Shatavari
    concern: "Hair Care",
    emoji: "💇",
  },
];

const DISCOUNT = 15;

type SeedProduct = (typeof PRODUCTS_SEED_DATA)[0];

function BundleCard({ bundle, index }: { bundle: Bundle; index: number }) {
  const addItem = useCartStore((s) => s.addItem);
  const [isAdded, setIsAdded] = useState(false);

  const products = bundle.productIds
    .map((id) => PRODUCTS_SEED_DATA.find((p) => p.id === id))
    .filter((p): p is SeedProduct => p !== undefined);

  const totalOriginal = products.reduce((sum, p) => sum + p.price, 0);
  const bundlePrice = getDiscountedPrice(totalOriginal, DISCOUNT);
  const savings = totalOriginal - bundlePrice;

  const handleAddBundle = () => {
    if (isAdded) return;
    for (const p of products) {
      addItem({
        productId: p.id,
        quantity: 1,
        price: Math.round(p.price * (1 - DISCOUNT / 100)),
      });
    }
    toast.success(`${bundle.name} added to cart`, { duration: 3000 });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="glass-card rounded-3xl overflow-hidden shadow-elevated hover:shadow-green transition-smooth w-full"
      data-ocid={`bundles.card.${index + 1}`}
    >
      {/* Product images — centered */}
      <div className="relative bg-muted/50 p-6 flex flex-col items-center">
        <div className="absolute top-4 right-4 z-10">
          <Badge className="bg-destructive text-destructive-foreground font-bold text-sm px-3 py-1">
            Save {DISCOUNT}%
          </Badge>
        </div>
        {/* Centered product images with "+" separators */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 w-full">
          {products.map((product, i) => (
            <div key={product.id} className="relative flex items-center">
              <div
                className="rounded-2xl overflow-hidden shadow-soft border-2 border-card"
                style={{
                  width: i === 1 ? 100 : 76,
                  height: i === 1 ? 100 : 76,
                  opacity: i !== 1 ? 0.85 : 1,
                  flexShrink: 0,
                }}
              >
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              {i < products.length - 1 && (
                <span className="text-primary font-bold text-lg ml-2 sm:ml-3">
                  +
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="p-5 sm:p-6">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xl">{bundle.emoji}</span>
          <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
            {bundle.concern}
          </span>
        </div>
        <h3 className="text-xl font-bold text-foreground mt-1 mb-1">
          {bundle.name}
        </h3>
        <p className="text-sm text-muted-foreground mb-4">{bundle.tagline}</p>

        {/* Included items */}
        <ul className="space-y-1.5 mb-5">
          {products.map((p) => (
            <li key={p.id} className="flex items-center gap-2 text-sm">
              <CheckCircle className="w-4 h-4 text-primary shrink-0" />
              <span className="text-foreground min-w-0 truncate">{p.name}</span>
              <span className="text-muted-foreground ml-auto text-xs shrink-0">
                {formatPrice(p.price)}
              </span>
            </li>
          ))}
        </ul>

        {/* Price */}
        <div className="flex items-center gap-3 mb-5 bg-primary/5 rounded-xl p-3 border border-primary/10">
          <div>
            <div className="text-xs text-muted-foreground">Bundle Price</div>
            <div className="text-2xl font-bold text-primary">
              {formatPrice(bundlePrice)}
            </div>
          </div>
          <div className="ml-auto text-right">
            <div className="text-xs text-muted-foreground line-through">
              {formatPrice(totalOriginal)}
            </div>
            <div className="text-sm font-semibold text-destructive">
              Save {formatPrice(savings)}
            </div>
          </div>
        </div>

        <motion.div
          whileTap={{ scale: 0.97 }}
          animate={isAdded ? { scale: [1, 1.05, 1] } : {}}
          transition={{ duration: 0.3 }}
        >
          <Button
            type="button"
            size="lg"
            className={cn(
              "w-full transition-all duration-300 h-12",
              isAdded && "bg-green-600 hover:bg-green-600",
            )}
            onClick={handleAddBundle}
            data-ocid={`bundles.add_bundle.${index + 1}`}
          >
            {isAdded ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                Bundle Added!
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4 mr-2" />
                Add Bundle to Cart
              </>
            )}
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function BundlesPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div
        className="gradient-hero py-14 sm:py-16 px-4"
        data-ocid="bundles.hero.section"
      >
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge className="bg-secondary/20 text-secondary border-secondary/30 mb-4">
              <Sparkles className="w-3.5 h-3.5 mr-1" />
              Save 15% on Bundles
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary-foreground font-display mb-4">
              Wellness Bundles — Better Together
            </h1>
            <p className="text-base sm:text-lg text-primary-foreground/75">
              Curated Ayurvedic bundles at 15% savings
            </p>
          </motion.div>
        </div>
      </div>

      {/* Bundles Grid — centered, max-w-5xl */}
      <div className="max-w-5xl mx-auto px-4 py-10 sm:py-14">
        {/* Section heading */}
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
            Our Product Bundles
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            Expertly curated for your wellness journey
          </p>
        </div>

        {/* Grid: 1 col on mobile, 2 on md+ — always centered */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 justify-items-center mb-8"
          data-ocid="bundles.list"
        >
          {BUNDLES.map((bundle, i) => (
            <BundleCard key={bundle.id} bundle={bundle} index={i} />
          ))}

          {/* Coming Soon — centered */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="glass-card rounded-3xl border-2 border-dashed border-border p-8 sm:p-10 flex flex-col items-center justify-center text-center shadow-soft w-full"
            data-ocid="bundles.coming_soon.card"
          >
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
              <Sparkles className="w-7 h-7 sm:w-8 sm:h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">
              More Coming Soon
            </h3>
            <p className="text-muted-foreground text-sm max-w-xs">
              Immunity, Energy Boost, and Seasonal Wellness bundles are being
              curated for you.
            </p>
            <Badge className="mt-4 bg-muted text-muted-foreground">
              Coming Q1 2026
            </Badge>
          </motion.div>
        </div>

        {/* Info strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="gradient-cream rounded-2xl p-5 sm:p-6 border border-border/50 text-center"
        >
          <p className="text-muted-foreground text-sm">
            All bundles include free shipping · Sourced from certified organic
            farms · 30-day return guarantee
          </p>
        </motion.div>
      </div>
    </div>
  );
}
