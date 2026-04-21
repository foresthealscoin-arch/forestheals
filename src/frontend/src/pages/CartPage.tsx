import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  Minus,
  Package,
  Plus,
  ShoppingBag,
  Tag,
  Trash2,
  XCircle,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useCart, useValidateCoupon } from "../hooks/useCart";
import { formatPrice } from "../lib/formatters";
import { PRODUCTS_SEED_DATA } from "../lib/seedData";

const FREE_SHIPPING_THRESHOLD = 499;
const SHIPPING_FEE = 49;
const GST_RATE = 0.18;

export default function CartPage() {
  const {
    items,
    itemCount,
    removeFromCart,
    updateQty,
    couponCode,
    discount,
    removeCoupon,
  } = useCart();
  const validateCoupon = useValidateCoupon();
  const [couponInput, setCouponInput] = useState(couponCode || "");
  const [couponError, setCouponError] = useState("");

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const gst = Math.round(subtotal * GST_RATE);
  const discountedSubtotal = Math.max(0, subtotal - discount);
  const grandTotal = discountedSubtotal + shipping + gst;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError("");
    const code = couponInput.trim();
    if (!code) return;
    validateCoupon.mutate(code, {
      onError: () => setCouponError("Invalid coupon code. Please try again."),
      onSuccess: (data) => {
        if (!data.valid) setCouponError(data.message);
      },
    });
  };

  const handleRemoveCoupon = () => {
    removeCoupon();
    setCouponInput("");
    setCouponError("");
  };

  if (items.length === 0) {
    return (
      <div
        className="min-h-[80vh] flex flex-col items-center justify-center gap-8 px-4"
        data-ocid="cart.empty_state"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="relative"
        >
          <div className="w-36 h-36 rounded-full bg-primary/10 flex items-center justify-center">
            <ShoppingBag className="w-16 h-16 text-primary/50" />
          </div>
          <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-secondary flex items-center justify-center shadow-soft">
            <span className="text-lg font-bold text-secondary-foreground">
              0
            </span>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="text-center max-w-sm"
        >
          <h2 className="font-display text-2xl font-bold text-foreground mb-3">
            Your cart is empty
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Discover our premium Ayurvedic products, pure seeds, and
            eco-friendly essentials — crafted from forest to your home.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.4 }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <Button
            size="lg"
            className="gap-2 shadow-green"
            asChild
            data-ocid="cart.empty_state.shop_button"
          >
            <Link to="/products">
              <ShoppingBag className="w-4 h-4" /> Shop Now
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            asChild
            data-ocid="cart.empty_state.bundles_button"
          >
            <Link to="/bundles">View Bundles</Link>
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-background py-10 px-4 sm:px-6"
      data-ocid="cart.page"
    >
      <div className="container max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
              Your Cart
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {itemCount} {itemCount === 1 ? "item" : "items"} in your cart
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="text-muted-foreground hover:text-foreground"
            data-ocid="cart.continue_shopping.button"
          >
            <Link to="/products">← Continue Shopping</Link>
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Cart Items — spans 3 cols */}
          <div className="lg:col-span-3 space-y-4">
            <AnimatePresence mode="popLayout">
              {items.map((item, i) => {
                const product = PRODUCTS_SEED_DATA.find(
                  (p) => p.id === item.productId,
                );
                const lineTotal = item.price * item.quantity;

                return (
                  <motion.div
                    key={item.productId}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -40, scale: 0.95 }}
                    transition={{ delay: i * 0.06, duration: 0.3 }}
                    className="glass-card rounded-2xl p-4 sm:p-5 shadow-soft"
                    data-ocid={`cart.item.${i + 1}`}
                  >
                    <div className="flex gap-4">
                      {/* Thumbnail */}
                      <Link
                        to="/products/$id"
                        params={{ id: String(item.productId) }}
                        className="shrink-0"
                      >
                        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-muted ring-1 ring-border/50 hover:ring-primary/30 transition-smooth">
                          {product ? (
                            <img
                              src={product.imageUrl}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Package className="w-6 h-6 text-muted-foreground" />
                            </div>
                          )}
                        </div>
                      </Link>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <Link
                            to="/products/$id"
                            params={{ id: String(item.productId) }}
                          >
                            <h3 className="font-semibold text-sm sm:text-base text-foreground hover:text-primary transition-smooth line-clamp-2 leading-snug">
                              {product?.name ?? `Product #${item.productId}`}
                            </h3>
                          </Link>
                          <button
                            type="button"
                            onClick={() =>
                              removeFromCart(
                                item.productId,
                                product?.name ?? "Item",
                              )
                            }
                            className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-smooth shrink-0"
                            aria-label="Remove item"
                            data-ocid={`cart.item.${i + 1}.delete_button`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {product?.category && (
                          <Badge
                            variant="secondary"
                            className="text-xs mb-3 font-normal"
                          >
                            {product.category}
                          </Badge>
                        )}

                        <div className="flex items-center justify-between gap-4 flex-wrap">
                          {/* Quantity controls */}
                          <div className="flex items-center gap-0 border border-input rounded-xl overflow-hidden shadow-sm">
                            <button
                              type="button"
                              onClick={() =>
                                updateQty(item.productId, item.quantity - 1)
                              }
                              className="w-8 h-8 flex items-center justify-center hover:bg-muted text-muted-foreground hover:text-foreground transition-smooth"
                              aria-label="Decrease quantity"
                              data-ocid={`cart.item.${i + 1}.decrease.button`}
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="w-10 text-center text-sm font-bold text-foreground border-x border-input">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                updateQty(item.productId, item.quantity + 1)
                              }
                              className="w-8 h-8 flex items-center justify-center hover:bg-muted text-muted-foreground hover:text-foreground transition-smooth"
                              aria-label="Increase quantity"
                              data-ocid={`cart.item.${i + 1}.increase.button`}
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {/* Price */}
                          <div className="text-right">
                            <p className="font-bold text-primary text-base">
                              {formatPrice(lineTotal)}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {formatPrice(item.price)} each
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {/* Coupon Section */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card rounded-2xl p-5 shadow-soft"
              data-ocid="cart.coupon.card"
            >
              <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <Tag className="w-4 h-4 text-primary" />
                Apply Coupon Code
              </h3>
              {couponCode ? (
                <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-primary/8 border border-primary/20">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-primary">
                        {couponCode}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Saving {formatPrice(discount)} on this order!
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemoveCoupon}
                    className="text-muted-foreground hover:text-destructive transition-smooth"
                    aria-label="Remove coupon"
                    data-ocid="cart.coupon.remove_button"
                  >
                    <XCircle className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <Input
                    placeholder="e.g. FOREST10, HEAL20"
                    value={couponInput}
                    onChange={(e) => {
                      setCouponInput(e.target.value);
                      setCouponError("");
                    }}
                    className="text-sm font-mono uppercase placeholder:normal-case placeholder:font-sans"
                    data-ocid="cart.coupon.input"
                  />
                  <Button
                    type="submit"
                    variant="outline"
                    size="sm"
                    disabled={validateCoupon.isPending || !couponInput.trim()}
                    className="shrink-0 min-w-[72px]"
                    data-ocid="cart.coupon.submit_button"
                  >
                    {validateCoupon.isPending ? "…" : "Apply"}
                  </Button>
                </form>
              )}
              {couponError && (
                <p
                  className="text-xs text-destructive mt-2 flex items-center gap-1"
                  data-ocid="cart.coupon.error_state"
                >
                  <XCircle className="w-3.5 h-3.5" />
                  {couponError}
                </p>
              )}
              {!couponCode && !couponError && (
                <p className="text-xs text-muted-foreground mt-2">
                  Try: FOREST10, HEAL20, NATURE15, WELCOME5
                </p>
              )}
            </motion.div>
          </div>

          {/* Order Summary — spans 2 cols, sticky */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="lg:col-span-2"
          >
            <div
              className="glass-card rounded-2xl p-6 shadow-elevated sticky top-24"
              data-ocid="cart.summary.card"
            >
              <h2 className="font-display font-semibold text-lg text-foreground mb-5 pb-4 border-b border-border">
                Order Summary
              </h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>
                    Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"})
                  </span>
                  <span className="font-medium text-foreground">
                    {formatPrice(subtotal)}
                  </span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-primary">
                    <span className="flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5" />
                      Coupon ({couponCode})
                    </span>
                    <span className="font-semibold">
                      −{formatPrice(discount)}
                    </span>
                  </div>
                )}

                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  {shipping === 0 ? (
                    <span className="font-semibold text-primary">Free 🎉</span>
                  ) : (
                    <span>{formatPrice(shipping)}</span>
                  )}
                </div>

                {shipping > 0 && (
                  <p className="text-xs text-muted-foreground bg-muted/50 rounded-lg px-3 py-2">
                    Add{" "}
                    <strong className="text-foreground">
                      {formatPrice(FREE_SHIPPING_THRESHOLD - subtotal)}
                    </strong>{" "}
                    more for free shipping 🚚
                  </p>
                )}
                {shipping === 0 && (
                  <div className="flex items-center gap-2 text-xs font-medium text-primary bg-primary/8 border border-primary/20 rounded-lg px-3 py-2">
                    <span>🎉</span> Free shipping unlocked! Orders above ₹499
                    ship free.
                  </div>
                )}

                <div className="flex justify-between text-muted-foreground">
                  <span>GST (18%)</span>
                  <span>{formatPrice(gst)}</span>
                </div>

                <div className="border-t border-border pt-4 mt-2 flex justify-between items-baseline">
                  <span className="font-bold text-base text-foreground">
                    Total
                  </span>
                  <span className="font-bold text-xl text-primary">
                    {formatPrice(grandTotal)}
                  </span>
                </div>
              </div>

              <Button
                size="lg"
                className="w-full mt-6 gap-2 shadow-green font-semibold text-base"
                asChild
                data-ocid="cart.checkout.primary_button"
              >
                <Link to="/checkout">
                  Proceed to Checkout <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>

              {/* Trust badges */}
              <div className="mt-5 pt-4 border-t border-border/50 grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                {[
                  { icon: "🔒", text: "Secure payment" },
                  { icon: "🌿", text: "100% natural" },
                  { icon: "📦", text: "Express delivery" },
                  { icon: "↩️", text: "Easy returns" },
                ].map(({ icon, text }) => (
                  <div key={text} className="flex items-center gap-1.5">
                    <span>{icon}</span>
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
