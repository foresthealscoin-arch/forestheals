import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  Heart,
  Leaf,
  Minus,
  Package,
  Plus,
  RefreshCw,
  Shield,
  ShoppingBag,
  Star,
  Truck,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { ProductCard } from "../components/ui/ProductCard";
import { StarRating } from "../components/ui/StarRating";
import { useCart } from "../hooks/useCart";
import { useProduct } from "../hooks/useProducts";
import { formatDate, formatPrice, getDiscountedPrice } from "../lib/formatters";
import { PRODUCTS_SEED_DATA } from "../lib/seedData";
import { useAuthStore } from "../stores/useAuthStore";
import type { Review } from "../types";

// ─── Static mock reviews per product ──────────────────────────────────────────
const MOCK_REVIEWS: Review[] = [
  {
    id: 1,
    productId: 1,
    userId: "2vxsx-fae",
    rating: 5,
    text: "Absolutely love this product! Have been using it for 3 months and noticed significant improvement in my energy and stress levels. Packaging is eco-friendly and the quality is exceptional.",
    verified: true,
    createdAt: Date.now() - 7 * 24 * 3600 * 1000,
    approved: true,
  },
  {
    id: 2,
    productId: 1,
    userId: "be2us-64aaa",
    rating: 4,
    text: "Very good quality powder. Mixes well in warm milk. I appreciate that it's 100% pure with no additives. Will definitely reorder.",
    verified: true,
    createdAt: Date.now() - 14 * 24 * 3600 * 1000,
    approved: true,
  },
  {
    id: 3,
    productId: 1,
    userId: "djv73-kaaaa",
    rating: 5,
    text: "I've tried many brands but Forestheals is by far the best. You can smell the freshness. Great results for sleep and mood.",
    verified: false,
    createdAt: Date.now() - 21 * 24 * 3600 * 1000,
    approved: true,
  },
];

// ─── Usage instructions by category ──────────────────────────────────────────
const USAGE_BY_CATEGORY: Record<string, string[]> = {
  "Ayurvedic Powders": [
    "Mix ½ teaspoon in warm milk, water or honey.",
    "Best consumed on an empty stomach in the morning or before bed.",
    "For maximum results use consistently for 30–90 days.",
    "Can be added to smoothies, juices or porridge.",
  ],
  "Seeds & Spices": [
    "Add directly to cooking, salads or smoothies.",
    "Soak seeds overnight in water for easier digestion.",
    "Use as a garnish or blend into chutneys and dips.",
    "Store in a cool, dry place away from direct sunlight.",
  ],
  "Essential Oils": [
    "Dilute with carrier oil (coconut / almond) before topical use.",
    "Add 2–3 drops to diffuser for aromatherapy.",
    "Not for direct ingestion unless specifically stated.",
    "Perform a patch test before full application.",
  ],
  "Eco-Friendly": [
    "Follow care instructions on the packaging label.",
    "Compostable — dispose responsibly at end of life.",
    "Keep away from moisture to extend product life.",
    "Supports zero-waste lifestyle when used consistently.",
  ],
  default: [
    "Follow the usage instructions on the packaging.",
    "Start with a small amount and adjust as needed.",
    "Consult a healthcare professional if pregnant, nursing or on medication.",
    "Keep out of reach of children.",
  ],
};

function getUsageInstructions(category: string): string[] {
  return USAGE_BY_CATEGORY[category] ?? USAGE_BY_CATEGORY.default;
}

// ─── Benefits extractor ───────────────────────────────────────────────────────
function extractBenefits(description: string, name: string): string[] {
  const keywords = [
    {
      match: /stress|adaptogen|anxiety/,
      benefit: "Reduces stress and promotes calm",
    },
    {
      match: /memory|brain|cognitive|focus/,
      benefit: "Boosts memory and mental clarity",
    },
    {
      match: /energy|vitality|stamina/,
      benefit: "Elevates energy and stamina",
    },
    { match: /immunity|immune/, benefit: "Strengthens immune system" },
    { match: /digestion|digestive|gut/, benefit: "Supports healthy digestion" },
    { match: /hair|scalp/, benefit: "Promotes hair growth and scalp health" },
    {
      match: /skin|glow|brightening/,
      benefit: "Improves skin tone and radiance",
    },
    {
      match: /antioxidant|anti-inflam/,
      benefit: "Rich in antioxidants and anti-inflammatory",
    },
    { match: /hormone|hormonal|balance/, benefit: "Supports hormonal balance" },
    { match: /sleep/, benefit: "Improves sleep quality" },
    {
      match: /blood sugar|diabetes/,
      benefit: "Helps regulate blood sugar levels",
    },
    {
      match: /detox|purif|cleanse/,
      benefit: "Natural detoxification and cleansing",
    },
    { match: /calcium|bone|mineral/, benefit: "Strengthens bones and joints" },
    {
      match: /vitamin|nutrient|superfood/,
      benefit: "Dense source of essential nutrients",
    },
    {
      match: /weight|metabolism/,
      benefit: "Supports healthy weight management",
    },
    {
      match: /heart|cardiovascular/,
      benefit: "Promotes cardiovascular health",
    },
  ];
  const text = `${name} ${description}`.toLowerCase();
  const found = keywords
    .filter((k) => k.match.test(text))
    .map((k) => k.benefit);
  return found.length >= 3
    ? found.slice(0, 5)
    : [
        "100% natural, no artificial additives",
        "Ethically sourced from organic farms",
        "Eco-friendly kraft packaging",
        "Lab-tested for purity and potency",
      ]
        .concat(found)
        .slice(0, 5);
}

// ─── Rating distribution helper ───────────────────────────────────────────────
function calcDistribution(reviews: Review[]): Record<number, number> {
  const dist: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  for (const r of reviews) {
    if (r.rating >= 1 && r.rating <= 5) dist[Math.round(r.rating)]++;
  }
  return dist;
}

function maskPrincipal(uid: string): string {
  if (uid.length <= 8) return `${uid.slice(0, 4)}…`;
  return `${uid.slice(0, 5)}…${uid.slice(-3)}`;
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function ReviewCard({ review }: { review: Review }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass-card rounded-2xl p-5 shadow-soft"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-foreground text-sm">
              {maskPrincipal(review.userId)}
            </span>
            {review.verified && (
              <span className="inline-flex items-center gap-1 bg-primary/10 text-primary text-xs font-medium px-2 py-0.5 rounded-full">
                <CheckCircle2 className="w-3 h-3" />
                Verified
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground">
            {formatDate(review.createdAt)}
          </p>
        </div>
        <StarRating rating={review.rating} size="sm" />
      </div>
      <p className="text-sm text-foreground leading-relaxed">{review.text}</p>
    </motion.div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function ProductDetailPage() {
  const { id } = useParams({ from: "/products/$id" });
  const productId = Number(id);
  const { data: product, isLoading } = useProduct(productId);
  const { addToCart } = useCart();
  const { isLoggedIn } = useAuthStore();

  const [qty, setQty] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [wishlist, setWishlist] = useState(false);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          <Skeleton className="aspect-square rounded-3xl w-full" />
          <div className="space-y-4">
            <Skeleton className="h-6 w-24 rounded-full" />
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 py-24 text-center"
        data-ocid="product_detail.error_state"
      >
        <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-5">
          <Package className="w-9 h-9 text-muted-foreground" />
        </div>
        <h2 className="text-xl font-semibold text-foreground mb-3">
          Product not found
        </h2>
        <p className="text-muted-foreground mb-6 text-sm">
          This product may have been removed or the link is incorrect.
        </p>
        <Button asChild>
          <Link to="/products">Browse Products</Link>
        </Button>
      </div>
    );
  }

  const finalPrice =
    product.discount > 0
      ? getDiscountedPrice(product.price, product.discount)
      : product.price;

  const related = PRODUCTS_SEED_DATA.filter(
    (p) => p.category === product.category && p.id !== product.id,
  ).slice(0, 4);

  // Use seed reviews (keyed to product id for a bit of variety)
  const reviews = MOCK_REVIEWS.map((r) => ({ ...r, productId: productId }));
  const avgRating =
    reviews.reduce((sum, r) => sum + r.rating, 0) / (reviews.length || 1);
  const distribution = calcDistribution(reviews);

  const benefits = extractBenefits(product.description, product.name);
  const usageSteps = getUsageInstructions(product.category);

  const handleAddToCart = () => {
    if (isAdded) return;
    addToCart(
      { productId: product.id, quantity: qty, price: finalPrice },
      product.name,
    );
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const handleWishlist = () => {
    setWishlist((w) => !w);
    toast.success(
      wishlist ? "Removed from wishlist" : `${product.name} saved to wishlist`,
    );
  };

  const handleReviewSubmit = async () => {
    if (!reviewText.trim()) {
      toast.error("Please write a review before submitting.");
      return;
    }
    setReviewSubmitting(true);
    await new Promise((r) => setTimeout(r, 900));
    setReviewSubmitting(false);
    setReviewSubmitted(true);
    toast.success("Review submitted! It will appear after moderation.");
  };

  return (
    <div className="min-h-screen bg-background" data-ocid="product_detail.page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* ── Breadcrumb ── */}
        <nav className="flex items-center gap-1.5 text-sm text-muted-foreground mb-8 flex-wrap">
          <Link to="/" className="hover:text-primary transition-smooth">
            Home
          </Link>
          <span>/</span>
          <Link to="/products" className="hover:text-primary transition-smooth">
            Shop
          </Link>
          <span>/</span>
          <span className="text-muted-foreground">{product.category}</span>
          <span>/</span>
          <span className="text-foreground font-medium truncate max-w-[160px]">
            {product.name}
          </span>
        </nav>

        {/* ── Product Info ── */}
        <div className="grid lg:grid-cols-2 gap-10 xl:gap-16 mb-16">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="aspect-square rounded-3xl overflow-hidden glass-card shadow-elevated">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    "/assets/images/placeholder.svg";
                }}
              />
            </div>
            {product.discount > 0 && (
              <Badge className="absolute top-4 left-4 bg-destructive text-destructive-foreground text-sm font-bold px-3 py-1 shadow-soft">
                {product.discount}% OFF
              </Badge>
            )}
            {product.featured && (
              <Badge className="absolute top-4 right-4 bg-secondary text-secondary-foreground text-xs font-semibold px-2.5 py-1">
                Featured
              </Badge>
            )}
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col"
          >
            {/* Category badge */}
            <Badge
              variant="secondary"
              className="w-fit mb-4 bg-primary/10 text-primary border-none font-medium"
            >
              <Leaf className="w-3 h-3 mr-1" />
              {product.category}
            </Badge>

            <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-3 leading-tight">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-5">
              <StarRating rating={product.ratings} size="md" />
              <span className="font-semibold text-sm text-foreground">
                {product.ratings.toFixed(1)}
              </span>
              <span className="text-sm text-muted-foreground">
                ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mb-2">
              <span className="font-bold text-3xl text-primary">
                {formatPrice(finalPrice)}
              </span>
              {product.discount > 0 && (
                <>
                  <span className="text-lg text-muted-foreground line-through">
                    {formatPrice(product.price)}
                  </span>
                  <Badge className="bg-destructive/15 text-destructive border-none text-xs font-semibold">
                    Save {formatPrice(product.price - finalPrice)}
                  </Badge>
                </>
              )}
            </div>

            {/* Stock */}
            <div className="mb-5">
              {product.stock > 0 ? (
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-green-700 dark:text-green-400">
                  <CheckCircle2 className="w-4 h-4" />
                  In Stock ({product.stock} units)
                </span>
              ) : (
                <span className="text-sm font-medium text-destructive">
                  Out of Stock
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed mb-5 text-sm">
              {product.description}
            </p>

            {/* Benefits bullet list */}
            <ul className="space-y-2 mb-6">
              {benefits.slice(0, 4).map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-2.5 text-sm text-foreground"
                >
                  <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            {/* Qty + CTA */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center rounded-xl border border-input overflow-hidden">
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="px-3 py-2.5 hover:bg-muted transition-smooth"
                  aria-label="Decrease quantity"
                  data-ocid="product_detail.qty.decrease_button"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span
                  className="px-4 py-2.5 font-semibold text-sm min-w-[2.5rem] text-center"
                  data-ocid="product_detail.qty.value"
                >
                  {qty}
                </span>
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
                  className="px-3 py-2.5 hover:bg-muted transition-smooth"
                  aria-label="Increase quantity"
                  data-ocid="product_detail.qty.increase_button"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex gap-3 mb-6">
              <motion.div
                whileTap={{ scale: 0.97 }}
                animate={isAdded ? { scale: [1, 1.05, 1] } : {}}
                transition={{ duration: 0.3 }}
                className="flex-1"
              >
                <Button
                  size="lg"
                  className={`w-full gap-2 shadow-green transition-all duration-300 ${isAdded ? "bg-green-600 hover:bg-green-600" : ""}`}
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  data-ocid="product_detail.add_to_cart_button"
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      Added to Cart!
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      Add to Cart
                    </>
                  )}
                </Button>
              </motion.div>
              <Button
                size="lg"
                variant="outline"
                onClick={handleWishlist}
                className={`gap-2 ${wishlist ? "text-red-500 border-red-200 bg-red-50 dark:bg-red-950/20" : ""}`}
                data-ocid="product_detail.wishlist_button"
              >
                <Heart
                  className={`w-4 h-4 ${wishlist ? "fill-current" : ""}`}
                />
              </Button>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {["100g", "Eco-Friendly", "Kraft Packaging", "No Additives"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="bg-muted text-muted-foreground text-xs font-medium px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ),
              )}
            </div>

            {/* Assurances */}
            <div className="grid grid-cols-3 gap-3 pt-5 border-t border-border">
              {[
                { icon: Shield, label: "Quality Assured" },
                { icon: Truck, label: "Free Shipping ≥₹499" },
                { icon: RefreshCw, label: "Easy Returns" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="text-center">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-1.5">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <p className="text-xs text-muted-foreground font-medium">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Tabs ── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
          data-ocid="product_detail.tabs.section"
        >
          <Tabs defaultValue="description">
            <TabsList className="w-full sm:w-auto mb-6 bg-muted/60">
              <TabsTrigger
                value="description"
                data-ocid="product_detail.tab.description"
              >
                Description
              </TabsTrigger>
              <TabsTrigger
                value="benefits"
                data-ocid="product_detail.tab.benefits"
              >
                Benefits
              </TabsTrigger>
              <TabsTrigger
                value="how-to-use"
                data-ocid="product_detail.tab.how_to_use"
              >
                How to Use
              </TabsTrigger>
              <TabsTrigger
                value="ingredients"
                data-ocid="product_detail.tab.ingredients"
              >
                Ingredients
              </TabsTrigger>
            </TabsList>

            <TabsContent
              value="description"
              className="glass-card rounded-2xl p-6 shadow-soft"
            >
              <h3 className="font-semibold text-foreground mb-3">
                About {product.name}
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                {product.description}
              </p>
              <p className="text-muted-foreground leading-relaxed text-sm mt-3">
                Forestheals sources all ingredients directly from certified
                organic farms and wild-harvested forests. Every batch is tested
                for purity, potency, and heavy metals. No synthetic fillers, no
                preservatives, no compromises.
              </p>
            </TabsContent>

            <TabsContent
              value="benefits"
              className="glass-card rounded-2xl p-6 shadow-soft"
            >
              <h3 className="font-semibold text-foreground mb-4">
                Key Benefits
              </h3>
              <ul className="space-y-3">
                {benefits.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-3 text-sm text-foreground"
                  >
                    <div className="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3 h-3 text-primary" />
                    </div>
                    {b}
                  </li>
                ))}
              </ul>
            </TabsContent>

            <TabsContent
              value="how-to-use"
              className="glass-card rounded-2xl p-6 shadow-soft"
            >
              <h3 className="font-semibold text-foreground mb-4">How to Use</h3>
              <ol className="space-y-3">
                {usageSteps.map((step, i) => (
                  <li
                    key={step}
                    className="flex items-start gap-3 text-sm text-foreground"
                  >
                    <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
              <p className="text-xs text-muted-foreground mt-5 p-3 bg-muted/50 rounded-xl">
                ⚠️ Consult a qualified Ayurvedic practitioner or physician before
                use if you are pregnant, nursing, or taking prescription
                medication.
              </p>
            </TabsContent>

            <TabsContent
              value="ingredients"
              className="glass-card rounded-2xl p-6 shadow-soft"
            >
              <h3 className="font-semibold text-foreground mb-4">
                Ingredients
              </h3>
              <p className="text-sm text-foreground font-medium mb-3">
                100% Pure {product.name}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                No additives · No preservatives · No artificial colours · No
                fillers · No synthetic fragrances
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  "Certified Organic",
                  "Lab Tested",
                  "Non-GMO",
                  "Vegan Friendly",
                ].map((cert) => (
                  <div
                    key={cert}
                    className="flex items-center gap-2 bg-primary/5 rounded-xl px-3 py-2"
                  >
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    <span className="text-xs font-medium text-foreground">
                      {cert}
                    </span>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </motion.section>

        {/* ── Reviews Section ── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
          data-ocid="product_detail.reviews.section"
        >
          <h2 className="text-2xl font-bold text-foreground mb-8 font-display">
            Customer Reviews
          </h2>

          <div className="grid md:grid-cols-[280px_1fr] gap-8">
            {/* Summary */}
            <div className="glass-card rounded-2xl p-6 shadow-soft h-fit">
              <div className="text-center mb-5">
                <p className="text-6xl font-bold text-primary">
                  {avgRating.toFixed(1)}
                </p>
                <StarRating
                  rating={avgRating}
                  size="lg"
                  className="justify-center my-2"
                />
                <p className="text-sm text-muted-foreground">
                  {reviews.length} reviews
                </p>
              </div>
              {/* Distribution bars */}
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((star) => {
                  const count = distribution[star] ?? 0;
                  const pct =
                    reviews.length > 0
                      ? Math.round((count / reviews.length) * 100)
                      : 0;
                  return (
                    <div
                      key={star}
                      className="flex items-center gap-2 text-xs text-muted-foreground"
                    >
                      <span className="w-3 shrink-0">{star}</span>
                      <Star className="w-3 h-3 fill-accent text-accent shrink-0" />
                      <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full transition-smooth"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="w-7 text-right shrink-0">{pct}%</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Review list */}
            <div className="space-y-4" data-ocid="product_detail.reviews.list">
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          </div>

          {/* Write a Review */}
          <div
            className="glass-card rounded-2xl p-6 shadow-soft mt-8"
            data-ocid="product_detail.write_review.section"
          >
            <h3 className="font-semibold text-foreground mb-4">
              Write a Review
            </h3>
            {!isLoggedIn ? (
              <div
                className="text-center py-8"
                data-ocid="product_detail.review.auth_gate"
              >
                <p className="text-muted-foreground text-sm mb-4">
                  Sign in to share your experience with this product.
                </p>
                <Button asChild variant="outline" size="sm">
                  <Link to="/auth/login">Sign In to Review</Link>
                </Button>
              </div>
            ) : reviewSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center py-8 text-center"
                data-ocid="product_detail.review.success_state"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                  <CheckCircle2 className="w-7 h-7 text-primary" />
                </div>
                <h4 className="font-semibold text-foreground mb-1">
                  Thank you for your review!
                </h4>
                <p className="text-sm text-muted-foreground">
                  It will be published after moderation.
                </p>
              </motion.div>
            ) : (
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-foreground mb-2">
                    Your Rating
                  </p>
                  <StarRating
                    rating={reviewRating}
                    size="lg"
                    interactive
                    onChange={setReviewRating}
                    data-ocid="product_detail.review.star_input"
                  />
                </div>
                <div>
                  <Textarea
                    placeholder="Share your experience with this product…"
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    className="min-h-[120px] resize-none"
                    data-ocid="product_detail.review.textarea"
                  />
                </div>
                <Button
                  type="button"
                  onClick={handleReviewSubmit}
                  disabled={reviewSubmitting}
                  className="gap-2"
                  data-ocid="product_detail.review.submit_button"
                >
                  {reviewSubmitting ? "Submitting…" : "Submit Review"}
                </Button>
              </div>
            )}
          </div>
        </motion.section>

        {/* ── Related Products ── */}
        {related.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12"
            data-ocid="product_detail.related.section"
          >
            <h2 className="text-2xl font-bold text-foreground mb-8 font-display">
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </motion.section>
        )}

        {/* Back button */}
        <Button
          variant="ghost"
          asChild
          className="gap-2"
          data-ocid="product_detail.back_button"
        >
          <Link to="/products">
            <ArrowLeft className="w-4 h-4" />
            Back to Products
          </Link>
        </Button>
      </div>
    </div>
  );
}
