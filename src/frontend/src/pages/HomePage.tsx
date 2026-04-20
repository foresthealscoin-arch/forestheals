import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "@tanstack/react-router";
import {
  ArrowDown,
  Building2,
  Check,
  CheckCircle2,
  Heart,
  Leaf,
  Shield,
  ShoppingBag,
  Sparkles,
  Star,
  Truck,
  Users,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useFeaturedProducts } from "../hooks/useProducts";
import { PRODUCTS_SEED_DATA } from "../lib/seedData";
import { useCartStore } from "../stores/useCartStore";
import type { Product } from "../types";

// ─── Offer Banner ────────────────────────────────────────────────────────────
function OfferBanner() {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;
  return (
    <motion.div
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -40, opacity: 0 }}
      className="bg-primary text-primary-foreground text-center text-sm font-medium py-2.5 px-4 flex items-center justify-center gap-3 relative"
      data-ocid="offer.banner"
    >
      <Sparkles className="w-4 h-4 text-secondary shrink-0" />
      <span className="text-xs sm:text-sm">
        🎉 <strong>10% off</strong> your first order — Use code{" "}
        <span className="font-bold text-secondary">FOREST10</span>
        <span className="hidden sm:inline">
          {" "}
          &nbsp;|&nbsp; Free shipping on orders above ₹499
        </span>
      </span>
      <button
        type="button"
        onClick={() => setDismissed(true)}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full hover:bg-primary-foreground/15 flex items-center justify-center transition-smooth"
        aria-label="Dismiss offer"
        data-ocid="offer.banner.close_button"
      >
        ×
      </button>
    </motion.div>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      data-ocid="home.hero.section"
    >
      {/* Gradient background */}
      <div className="absolute inset-0 gradient-hero" />

      {/* Leaf SVG pattern overlay */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.055] pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="leaf-bg"
            x="0"
            y="0"
            width="80"
            height="80"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M40 8 C18 8, 8 24, 8 40 C8 56, 22 68, 40 68 C58 68, 72 56, 72 40 C72 24, 62 8, 40 8Z"
              fill="none"
              stroke="white"
              strokeWidth="1"
            />
            <line
              x1="40"
              y1="8"
              x2="40"
              y2="68"
              stroke="white"
              strokeWidth="0.8"
            />
            <line
              x1="20"
              y1="30"
              x2="60"
              y2="30"
              stroke="white"
              strokeWidth="0.5"
            />
            <line
              x1="14"
              y1="45"
              x2="66"
              y2="45"
              stroke="white"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#leaf-bg)" />
      </svg>

      {/* Decorative glows */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-secondary/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-accent/10 blur-3xl pointer-events-none" />

      {/* Main content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center gap-6 py-20">
        {/* Identity badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Badge className="bg-secondary/15 text-secondary border border-secondary/40 px-3 py-1.5 text-xs sm:text-sm font-medium backdrop-blur-sm text-center">
            Natural forest-based healing products for skin &amp; body — 100%
            chemical-free
          </Badge>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-secondary tracking-tight leading-none"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Heal Naturally
          <br />
          <span className="text-secondary/70 text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-light italic">
            with ForestHeals
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="text-secondary/70 text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed px-2"
        >
          Pure, chemical-free products made from forest-sourced ingredients for
          real results
        </motion.p>

        {/* CTAs — stack vertically on mobile, side by side on sm+ */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center w-full max-w-sm sm:max-w-none"
        >
          <Link
            to="/products"
            data-ocid="hero.shop_now_button"
            className="w-full sm:w-auto"
          >
            <Button
              type="button"
              size="lg"
              className="w-full sm:w-auto bg-secondary text-primary hover:bg-secondary/90 font-semibold px-8 shadow-green text-base h-12"
            >
              <ShoppingBag className="w-5 h-5 mr-2" />
              Shop Now
            </Button>
          </Link>
          <Link
            to="/products"
            data-ocid="hero.explore_button"
            className="w-full sm:w-auto"
          >
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="w-full sm:w-auto border-secondary/50 text-secondary hover:bg-secondary/10 font-semibold px-8 text-base bg-transparent backdrop-blur-sm h-12"
            >
              <Leaf className="w-5 h-5 mr-2" />
              Explore Products
            </Button>
          </Link>
        </motion.div>

        {/* Hero product image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="relative mt-4 w-full max-w-2xl"
        >
          <div className="relative rounded-3xl overflow-hidden shadow-elevated border border-secondary/10">
            <img
              src={PRODUCTS_SEED_DATA[0].imageUrl}
              alt="Forestheals premium Ayurvedic products"
              className="w-full aspect-[16/7] object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent" />
            {/* Floating badges */}
            <motion.div
              animate={{ y: [-4, 4, -4] }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="absolute bottom-4 left-4 glass-card rounded-xl px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm"
            >
              <span className="text-foreground font-semibold">⭐ 4.8/5</span>
              <span className="text-muted-foreground ml-1.5 sm:ml-2 text-xs hidden xs:inline">
                2,400+ happy customers
              </span>
            </motion.div>
            <motion.div
              animate={{ y: [4, -4, 4] }}
              transition={{
                duration: 3.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="absolute top-4 right-4 glass-card rounded-xl px-2.5 py-1.5 sm:px-3 text-xs sm:text-sm"
            >
              <span className="text-primary font-semibold text-xs">
                🌿 100% Chemical-Free
              </span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-secondary/40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 1.6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <ArrowDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─── Trust Badges ─────────────────────────────────────────────────────────────
const TRUST_BADGES = [
  {
    icon: Leaf,
    label: "100% Natural Ingredients",
    sub: "No chemicals or toxins",
  },
  { icon: Shield, label: "Handmade with Care", sub: "Crafted traditionally" },
  {
    icon: Star,
    label: "Inspired by Ayurveda",
    sub: "Ancient wisdom, real results",
  },
  { icon: Truck, label: "Free Shipping ₹499+", sub: "Pan India delivery" },
];

function TrustBadgesSection() {
  return (
    <section
      className="bg-secondary/10 border-y border-secondary/20 py-8"
      data-ocid="trust.section"
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {TRUST_BADGES.map((badge, i) => (
            <motion.div
              key={badge.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex items-center gap-2 sm:gap-3"
              data-ocid={`trust.badge.${i + 1}`}
            >
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <badge.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-foreground text-xs sm:text-sm truncate">
                  {badge.label}
                </p>
                <p className="text-xs text-muted-foreground hidden sm:block">
                  {badge.sub}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Best Seller Add Button ───────────────────────────────────────────────────
function BestSellerAddButton({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);
  const [added, setAdded] = useState(false);
  const finalPrice =
    product.discount > 0
      ? Math.round(product.price * (1 - product.discount / 100))
      : product.price;

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (added) return;
    addItem({ productId: product.id, quantity: 1, price: finalPrice });
    toast.success(`${product.name} added to cart`, { duration: 2500 });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <motion.button
      type="button"
      onClick={handleAdd}
      whileTap={{ scale: 0.92 }}
      animate={added ? { scale: [1, 1.12, 1] } : {}}
      transition={{ duration: 0.25 }}
      className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all duration-200 ${
        added ? "bg-green-600 text-white" : "text-white"
      }`}
      style={added ? {} : { background: "#004a38" }}
      aria-label={`Add ${product.name} to cart`}
      data-ocid={`best_sellers.add_button.${product.id}`}
    >
      {added ? (
        <Check className="w-3.5 h-3.5" />
      ) : (
        <ShoppingBag className="w-3.5 h-3.5" />
      )}
      {added ? "Added" : "Add"}
    </motion.button>
  );
}

// ─── Best Sellers Section ─────────────────────────────────────────────────────
function BestSellersSection() {
  const { data: featured = [] } = useFeaturedProducts();
  const displayProducts = (
    featured.length > 0
      ? featured
      : PRODUCTS_SEED_DATA.filter((p) => p.featured)
  ).slice(0, 8);

  return (
    <section
      className="py-16 sm:py-20 bg-background"
      id="bestsellers"
      data-ocid="best_sellers.section"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10 sm:mb-12">
          <p
            className="text-sm font-semibold tracking-widest uppercase mb-3"
            style={{ color: "#004a38" }}
          >
            Handpicked for You
          </p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3"
            style={{ color: "#004a38" }}
          >
            Best Sellers
          </h2>
          <div
            className="w-12 h-0.5 mx-auto mb-4"
            style={{ background: "#004a38" }}
          />
          <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base">
            Our most loved natural products — trusted by thousands of customers
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
          {displayProducts.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
              className="group bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200"
              data-ocid={`best_sellers.product.${i + 1}`}
            >
              <Link to="/products/$id" params={{ id: String(product.id) }}>
                <div className="overflow-hidden" style={{ height: "160px" }}>
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                    onError={(e) => {
                      e.currentTarget.src =
                        "/assets/products/brahmi_forestheals.jpg";
                    }}
                  />
                </div>
                <div className="p-3 sm:p-4">
                  <h3
                    className="font-semibold text-xs sm:text-sm leading-snug mb-1 line-clamp-2 group-hover:text-primary transition-colors"
                    style={{ color: "#004a38" }}
                  >
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-1 mb-2 sm:mb-3">
                    <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-amber-400 text-amber-400" />
                    <span className="text-xs font-medium text-foreground">
                      {product.ratings.toFixed(1)}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      ({product.reviewCount})
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-1 sm:gap-2">
                    <span
                      className="font-bold text-sm sm:text-base"
                      style={{ color: "#004a38" }}
                    >
                      ₹
                      {product.discount > 0
                        ? Math.round(
                            product.price * (1 - product.discount / 100),
                          )
                        : product.price}
                    </span>
                    <BestSellerAddButton product={product} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10 sm:mt-12">
          <Link to="/products">
            <Button
              type="button"
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 sm:px-10 font-semibold transition-smooth h-12"
              data-ocid="best_sellers.view_all_button"
            >
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── Why ForestHeals ──────────────────────────────────────────────────────────
const WHY_PILLARS = [
  {
    emoji: "🌿",
    title: "100% Natural Ingredients",
    desc: "Every ingredient is wildcrafted or organically grown. No synthetic pesticides, no harmful chemicals.",
    outcome: "Real purity",
  },
  {
    emoji: "🚫",
    title: "No Chemicals or Toxins",
    desc: "We believe your skin and body deserve better. Zero parabens, sulfates, or artificial additives — ever.",
    outcome: "Clear skin",
  },
  {
    emoji: "🙌",
    title: "Handmade with Care",
    desc: "Every product is crafted in small batches using traditional methods, preserving the full potency of each ingredient.",
    outcome: "Deep nourishment",
  },
  {
    emoji: "🕉️",
    title: "Inspired by Ayurveda",
    desc: "Rooted in 5,000 years of healing wisdom. Our formulations follow classical Ayurvedic principles for lasting results.",
    outcome: "Natural healing",
  },
];

function WhyForestHealsSection() {
  return (
    <section
      className="py-16 sm:py-20 bg-muted/30"
      id="why"
      data-ocid="why_forestheals.section"
    >
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-14"
        >
          <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">
            Our Promise
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            🌱 Why ForestHeals?
          </h2>
          <div className="w-16 h-1 bg-primary rounded-full mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {WHY_PILLARS.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="glass-card rounded-3xl p-5 sm:p-6 text-center hover:shadow-elevated transition-smooth hover:-translate-y-2 overflow-hidden relative"
              data-ocid={`why.pillar.${i + 1}`}
            >
              <div className="text-4xl mb-4">{pillar.emoji}</div>
              <h3 className="text-base font-bold text-foreground mb-2">
                {pillar.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                {pillar.desc}
              </p>
              <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-semibold px-3 py-1.5 rounded-full">
                <Heart className="w-3 h-3" />
                {pillar.outcome}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Brand Story ──────────────────────────────────────────────────────────────
function BrandStorySection() {
  return (
    <section
      className="py-16 sm:py-20"
      id="story"
      data-ocid="brand_story.section"
      style={{ background: "oklch(0.97 0.015 90)" }}
    >
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-5 sm:space-y-6"
          >
            <div>
              <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">
                Our Origins
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight">
                Our Story 🌿
              </h2>
            </div>
            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
              ForestHeals was born from a simple belief — nature has all the
              answers. Deep in India's forests lie ancient secrets of healing,
              passed down through generations. We source the purest ingredients
              directly from forest communities, craft them with traditional
              Ayurvedic wisdom, and bring them straight to your home.
            </p>
            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
              <strong className="text-foreground">
                Why forest ingredients?
              </strong>{" "}
              Because forests hold plants untouched by chemicals, grown in rich
              soil, under open skies. That's the ForestHeals difference.
            </p>
            <Link to="/about">
              <Button
                type="button"
                variant="outline"
                size="lg"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold h-12"
                data-ocid="brand_story.learn_more_button"
              >
                <Leaf className="w-4 h-4 mr-2" />
                Learn Our Story
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-3 sm:gap-4"
          >
            {[
              { value: "2,400+", label: "Happy Customers" },
              { value: "100%", label: "Chemical Free" },
              { value: "50+", label: "Products" },
              { value: "5★", label: "Average Rating" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass-card rounded-2xl p-4 sm:p-5 text-center shadow-soft"
                data-ocid={`brand_story.stat.${i + 1}`}
              >
                <p className="text-2xl sm:text-3xl font-bold text-primary mb-1">
                  {stat.value}
                </p>
                <p className="text-xs text-muted-foreground font-medium">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Flash Sale ───────────────────────────────────────────────────────────────
function useCountdown(durationMs: number) {
  const endTime = useRef(Date.now() + durationMs);
  const [remaining, setRemaining] = useState(endTime.current - Date.now());

  useEffect(() => {
    const id = setInterval(
      () => setRemaining(Math.max(0, endTime.current - Date.now())),
      1000,
    );
    return () => clearInterval(id);
  }, []);

  const h = Math.floor(remaining / 3600000);
  const m = Math.floor((remaining % 3600000) / 60000);
  const s = Math.floor((remaining % 60000) / 1000);
  return { h, m, s };
}

function TimerDigit({ value, label }: { value: number; label: string }) {
  const display = String(value).padStart(2, "0");
  return (
    <div className="flex flex-col items-center">
      <motion.div
        key={display}
        animate={{ scale: [1.1, 1] }}
        transition={{ duration: 0.25 }}
        className="bg-secondary/15 border border-secondary/25 rounded-xl px-2 py-1.5 sm:px-3 sm:py-2 min-w-[2.8rem] sm:min-w-[3.5rem] text-center"
      >
        <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary tabular-nums">
          {display}
        </span>
      </motion.div>
      <span className="text-secondary/55 text-xs mt-1.5 uppercase tracking-wider font-medium">
        {label}
      </span>
    </div>
  );
}

function FlashSaleBanner() {
  const { h, m, s } = useCountdown(23 * 3600000 + 59 * 60000 + 47 * 1000);

  return (
    <section
      className="gradient-hero py-14 sm:py-16 relative overflow-hidden"
      data-ocid="flash_sale.section"
    >
      <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-secondary/5 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-secondary/5 blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-4 sm:gap-5"
        >
          <Badge className="bg-secondary/15 text-secondary border border-secondary/30 text-sm px-4 py-1.5 animate-pulse">
            🔥 Limited Time Offer
          </Badge>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-secondary text-balance">
            Flash Sale — Up to 30% Off!
          </h2>
          <p className="text-secondary/65 text-sm sm:text-base max-w-md">
            Stock up on your wellness essentials at exclusive prices. Only
            limited quantities available!
          </p>

          <div className="flex items-end gap-2 sm:gap-3 mt-2">
            <TimerDigit value={h} label="Hours" />
            <span className="text-secondary/50 text-xl sm:text-2xl font-bold mb-6">
              :
            </span>
            <TimerDigit value={m} label="Mins" />
            <span className="text-secondary/50 text-xl sm:text-2xl font-bold mb-6">
              :
            </span>
            <TimerDigit value={s} label="Secs" />
          </div>

          <Link to="/products">
            <Button
              type="button"
              size="lg"
              className="bg-secondary text-primary hover:bg-secondary/90 font-bold px-8 sm:px-10 shadow-green text-base h-12"
              data-ocid="flash_sale.shop_button"
            >
              <Zap className="w-5 h-5 mr-2" />
              Shop Flash Sale
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Bundles Section ──────────────────────────────────────────────────────────
type BundleConfig = {
  id: string;
  name: string;
  tagline: string;
  productIds: number[];
  totalPrice: number;
  ocid: string;
};

const BUNDLES: BundleConfig[] = [
  {
    id: "skincare",
    name: "Skincare Bundle",
    tagline: "Glow from within, naturally",
    productIds: [4, 7, 6],
    totalPrice: 199 + 149 + 219,
    ocid: "bundle.skincare",
  },
  {
    id: "haircare",
    name: "Haircare Bundle",
    tagline: "Nourish every strand",
    productIds: [2, 6, 11],
    totalPrice: 249 + 219 + 349,
    ocid: "bundle.haircare",
  },
];

function BundleCard({ bundle }: { bundle: BundleConfig }) {
  const products = bundle.productIds
    .map((id) => PRODUCTS_SEED_DATA.find((p) => p.id === id))
    .filter((p): p is (typeof PRODUCTS_SEED_DATA)[number] => p !== undefined);

  const discountedPrice = Math.round(bundle.totalPrice * 0.85);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -6 }}
      className="glass-card rounded-3xl overflow-hidden shadow-soft hover:shadow-elevated transition-smooth group w-full"
      data-ocid={bundle.ocid}
    >
      {/* Overlapping images */}
      <div className="relative h-44 sm:h-52 bg-gradient-to-br from-muted to-secondary/10 flex items-center justify-center overflow-hidden">
        {products.map((p, i) => (
          <img
            key={p.id}
            src={p.imageUrl}
            alt={p.name}
            className="absolute w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 object-cover rounded-2xl shadow-elevated border-2 border-card"
            style={{
              left: `${18 + i * 26}%`,
              top: "50%",
              transform: `translateY(-50%) rotate(${(i - 1) * 9}deg)`,
              zIndex: i + 1,
            }}
          />
        ))}
        <Badge className="absolute top-3 right-3 bg-destructive text-destructive-foreground font-bold px-3 text-sm z-10">
          Save 15%
        </Badge>
      </div>

      <div className="p-5 sm:p-6">
        <h3 className="text-lg sm:text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-smooth">
          {bundle.name}
        </h3>
        <p className="text-sm text-muted-foreground mb-3">{bundle.tagline}</p>
        <div className="flex flex-wrap gap-1.5 mb-5">
          {products.map((p) => (
            <span
              key={p.id}
              className="text-xs bg-muted text-muted-foreground rounded-full px-2.5 py-0.5"
            >
              {p.name.split(" ")[0]}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xl sm:text-2xl font-bold text-primary">
              ₹{discountedPrice}
            </span>
            <span className="text-sm text-muted-foreground line-through ml-2">
              ₹{bundle.totalPrice}
            </span>
          </div>
          <Link to="/bundles">
            <Button
              type="button"
              size="lg"
              className="font-semibold h-12 px-8 text-base"
              data-ocid={`${bundle.ocid}.shop_button`}
            >
              Shop Bundle
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

function BundlesSection() {
  return (
    <section
      className="py-16 sm:py-20 bg-muted/25"
      id="bundles"
      data-ocid="bundles.section"
    >
      <div className="max-w-5xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-12"
        >
          <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">
            Curated Sets
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Wellness Bundles
          </h2>
          <div className="w-16 h-1 bg-primary rounded-full mx-auto mb-5" />
          <p className="text-muted-foreground max-w-lg mx-auto text-sm sm:text-base">
            Expertly curated combinations for targeted wellness.{" "}
            <strong className="text-primary">Save 15%</strong> on every bundle.
          </p>
        </motion.div>

        {/* Grid: 1 col on mobile, 2 on md+ — centered always */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 justify-items-center">
          {BUNDLES.map((bundle) => (
            <BundleCard key={bundle.id} bundle={bundle} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Remedy Section ───────────────────────────────────────────────────────────
const CONDITIONS = [
  { label: "Hair Fall", value: "hair-fall", emoji: "💆" },
  { label: "Stress", value: "stress", emoji: "🧘" },
  { label: "Immunity", value: "immunity", emoji: "🛡️" },
  { label: "Digestion", value: "digestion", emoji: "🌿" },
  { label: "Energy", value: "energy", emoji: "⚡" },
  { label: "Skin Health", value: "skin-care", emoji: "✨" },
  { label: "Sleep", value: "sleep", emoji: "🌙" },
  { label: "Women's Health", value: "women", emoji: "🌸" },
];

function RemedySection() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <section
      className="py-16 sm:py-20 relative overflow-hidden"
      id="remedy"
      data-ocid="remedy.section"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.96 0.04 152) 0%, oklch(0.98 0.06 90) 100%)",
      }}
    >
      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-10"
        >
          <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">
            Ayurvedic Intelligence
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Find Your Natural Remedy
          </h2>
          <div className="w-16 h-1 bg-primary rounded-full mx-auto mb-5" />
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed text-sm sm:text-base">
            Select your concern and discover the perfect natural remedy.
          </p>
        </motion.div>

        <div className="flex flex-wrap gap-2 sm:gap-3 justify-center mb-8 sm:mb-10">
          {CONDITIONS.map((c, i) => (
            <motion.button
              key={c.value}
              type="button"
              initial={{ opacity: 0, scale: 0.88 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setSelected(c.value)}
              className={`px-4 py-2 sm:px-5 sm:py-2.5 rounded-full border font-medium text-xs sm:text-sm transition-smooth cursor-pointer select-none ${
                selected === c.value
                  ? "bg-primary text-primary-foreground border-primary shadow-green"
                  : "bg-card/80 text-foreground border-border hover:border-primary hover:text-primary backdrop-blur-sm"
              }`}
              data-ocid={`remedy.condition.${c.value}`}
            >
              <span className="mr-1.5">{c.emoji}</span>
              {c.label}
            </motion.button>
          ))}
        </div>

        <AnimatePresence>
          {selected && (
            <motion.div
              key="remedy-cta"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-center"
            >
              <Link to="/recommend">
                <Button
                  type="button"
                  size="lg"
                  className="font-semibold px-8 sm:px-10 shadow-green h-12"
                  data-ocid="remedy.see_recommendations_button"
                >
                  <Leaf className="w-5 h-5 mr-2" />
                  See My Recommendations
                </Button>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

// ─── Eco Section ──────────────────────────────────────────────────────────────
const ECO_PILLARS = [
  {
    emoji: "🌱",
    title: "Sustainably Sourced",
    desc: "Every ingredient is wildcrafted or organically grown — no synthetic pesticides, no harmful chemicals. We partner directly with traditional farmers.",
  },
  {
    emoji: "📦",
    title: "Kraft Paper Packaging",
    desc: "100% biodegradable and plastic-free packaging made from recycled kraft paper. Our planet doesn't pay the price for your wellness.",
  },
  {
    emoji: "🌍",
    title: "Carbon Conscious",
    desc: "We actively partner with reforestation initiatives, planting trees with every purchase. Real healing for real forests.",
  },
];

function EcoSection() {
  return (
    <section
      className="py-16 sm:py-20 bg-card"
      id="eco"
      data-ocid="eco.section"
    >
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-14"
        >
          <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">
            Our Earth Promise
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our Commitment to Earth
          </h2>
          <div className="w-16 h-1 bg-primary rounded-full mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {ECO_PILLARS.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative glass-card rounded-3xl p-6 sm:p-8 text-center hover:shadow-elevated transition-smooth hover:-translate-y-2 overflow-hidden"
              data-ocid={`eco.pillar.${i + 1}`}
            >
              <div className="text-4xl sm:text-5xl mb-4 sm:mb-5">
                {pillar.emoji}
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-foreground mb-3">
                {pillar.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                {pillar.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    quote:
      "My skin improved in just 2 weeks! I can't believe the difference. Finally something natural that actually works.",
    name: "Priya S.",
    role: "Mumbai",
    rating: 5,
    outcome: "Clear, glowing skin",
  },
  {
    quote:
      "Finally something natural that works. No more chemicals! My face feels so much cleaner and healthier.",
    name: "Rahul K.",
    role: "Delhi",
    rating: 5,
    outcome: "Chemical-free routine",
  },
  {
    quote:
      "My hair fall reduced significantly after using ForestHeals Hair Oil. I'm genuinely amazed by the results.",
    name: "Anjali M.",
    role: "Bangalore",
    rating: 5,
    outcome: "Reduced hair fall",
  },
  {
    quote:
      "The Brahmi powder has been amazing for my memory and focus. As a doctor, I appreciate the quality and purity.",
    name: "Dr. Suresh P.",
    role: "Ayurvedic Physician, Delhi",
    rating: 5,
    outcome: "Better focus & memory",
  },
];

function TestimonialsSection() {
  return (
    <section
      className="py-16 sm:py-20"
      id="testimonials"
      data-ocid="testimonials.section"
      style={{ background: "oklch(0.98 0.02 90)" }}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10 sm:mb-12">
          <p
            className="text-sm font-semibold tracking-widest uppercase mb-3"
            style={{ color: "#004a38" }}
          >
            Real Stories
          </p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3"
            style={{ color: "#004a38" }}
          >
            What Our Customers Say
          </h2>
          <div
            className="w-12 h-0.5 mx-auto"
            style={{ background: "#004a38" }}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.07 }}
              className="bg-card rounded-xl p-4 sm:p-5 shadow-sm flex flex-col gap-3"
              data-ocid={`testimonial.card.${i + 1}`}
            >
              {/* Stars */}
              <div className="flex gap-0.5">
                {Array.from({ length: t.rating }, (_v, si) => (
                  <span
                    key={`star-${i}-${si + 1}`}
                    className="text-amber-400 text-base"
                  >
                    ★
                  </span>
                ))}
              </div>
              {/* Quote */}
              <p className="text-foreground text-sm leading-relaxed flex-1">
                "{t.quote}"
              </p>
              {/* Author */}
              <div className="flex items-center gap-2.5 pt-2 border-t border-border">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                  style={{ background: "#004a38", color: "#f1e0a9" }}
                >
                  {t.name[0]}
                </div>
                <div className="min-w-0">
                  <p
                    className="font-semibold text-sm truncate"
                    style={{ color: "#004a38" }}
                  >
                    {t.name}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {t.role}
                  </p>
                </div>
                <CheckCircle2
                  className="w-4 h-4 shrink-0 ml-auto"
                  style={{ color: "#004a38" }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── B2B Section ──────────────────────────────────────────────────────────────
const B2B_STATS = [
  { value: "50+", label: "Product SKUs" },
  { value: "12", label: "Countries Served" },
  { value: "500+", label: "Business Partners" },
];

function B2BSection() {
  return (
    <section
      className="gradient-hero py-16 sm:py-20 relative overflow-hidden"
      id="b2b"
      data-ocid="b2b.section"
    >
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-5 sm:space-y-6"
          >
            <div>
              <p className="text-secondary/55 text-sm font-semibold tracking-widest uppercase mb-3">
                Wholesale &amp; Export
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-secondary leading-tight">
                Partner with Forestheals
              </h2>
            </div>
            <p className="text-secondary/65 text-sm sm:text-base leading-relaxed">
              Scale your wellness business with Forestheals' premium bulk supply
              program. Competitive wholesale pricing, custom labelling, and
              dedicated export support for international buyers.
            </p>
            <ul className="space-y-2 sm:space-y-2.5">
              {[
                "Custom branding & private label options",
                "Competitive bulk pricing from 10kg+",
                "FSSAI, ISO certified products",
                "Export-ready packaging & documentation",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-secondary/75 text-sm"
                >
                  <CheckCircle2 className="w-4 h-4 text-secondary/50 shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
            <Link to="/b2b">
              <Button
                type="button"
                size="lg"
                className="bg-secondary text-primary hover:bg-secondary/90 font-semibold px-8 shadow-green h-12"
                data-ocid="b2b.explore_button"
              >
                <Building2 className="w-5 h-5 mr-2" />
                Explore B2B Options
              </Button>
            </Link>
          </motion.div>

          <div className="space-y-3 sm:space-y-4">
            {B2B_STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="glass-card rounded-2xl p-4 sm:p-5 flex items-center gap-4 sm:gap-6"
                data-ocid={`b2b.stat.${i + 1}`}
              >
                <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-secondary">
                  {stat.value}
                </span>
                <span className="text-secondary/60 text-sm sm:text-base">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Final CTA Section ────────────────────────────────────────────────────────
function FinalCTASection() {
  return (
    <section
      className="py-16 sm:py-20 bg-background"
      id="final-cta"
      data-ocid="final_cta.section"
      style={{ background: "oklch(0.97 0.015 90)" }}
    >
      <div className="max-w-3xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-5 sm:space-y-6"
        >
          <div className="text-5xl mb-2">🌿</div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight">
            Start Your Natural Healing Journey Today
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Join thousands of happy customers who chose the natural way
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link to="/products" className="w-full sm:w-auto">
              <Button
                type="button"
                size="lg"
                className="w-full sm:w-auto font-semibold px-8 sm:px-10 shadow-green text-base h-12"
                data-ocid="final_cta.shop_button"
              >
                <ShoppingBag className="w-5 h-5 mr-2" />
                Shop Now
              </Button>
            </Link>
            <Link to="/recommend" className="w-full sm:w-auto">
              <Button
                type="button"
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold px-8 sm:px-10 text-base h-12"
                data-ocid="final_cta.recommend_button"
              >
                <Leaf className="w-5 h-5 mr-2" />
                Find My Remedy
              </Button>
            </Link>
          </div>
          <p className="text-xs text-muted-foreground">
            🌿 Free shipping above ₹499 &nbsp;|&nbsp; 10% off first order with
            code <strong className="text-primary">FOREST10</strong>
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Newsletter Section ───────────────────────────────────────────────────────
function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    await new Promise<void>((r) => setTimeout(r, 800));
    setLoading(false);
    setEmail("");
    toast.success("Welcome to the Forestheals community! 🌿", {
      description: "You'll receive exclusive wellness tips and offers.",
      duration: 5000,
    });
  };

  return (
    <section
      className="py-16 sm:py-20 bg-card"
      id="community"
      data-ocid="newsletter.section"
    >
      <div className="max-w-3xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-5 sm:space-y-6"
        >
          <div className="flex justify-center">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Users className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
            </div>
          </div>

          <div>
            <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">
              Join Our Community
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
              Join Our Wellness Community
            </h2>
            <div className="w-16 h-1 bg-primary rounded-full mx-auto mb-5" />
            <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed text-sm sm:text-base">
              Get exclusive Ayurvedic recipes, wellness tips, early access to
              new products, and members-only discounts.
            </p>
          </div>

          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto w-full"
          >
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-12 text-base bg-background flex-1"
              data-ocid="newsletter.email_input"
            />
            <Button
              type="submit"
              size="lg"
              disabled={loading}
              className="h-12 px-8 font-semibold shrink-0"
              data-ocid="newsletter.subscribe_button"
            >
              {loading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 1,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                  className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                />
              ) : (
                "Subscribe"
              )}
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <div className="min-h-screen" data-ocid="home.page">
      <OfferBanner />
      <HeroSection />
      <TrustBadgesSection />
      <BestSellersSection />
      <WhyForestHealsSection />
      <BrandStorySection />
      <FlashSaleBanner />
      <BundlesSection />
      <RemedySection />
      <EcoSection />
      <TestimonialsSection />
      <B2BSection />
      <FinalCTASection />
      <NewsletterSection />
    </div>
  );
}
