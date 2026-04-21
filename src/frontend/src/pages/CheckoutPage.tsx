import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Link, redirect } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  CheckCircle2,
  CreditCard,
  FileText,
  MapPin,
  Package,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useCart } from "../hooks/useCart";
import { useCreateOrder } from "../hooks/useOrders";
import { formatDate, formatPrice } from "../lib/formatters";
import { PRODUCTS_SEED_DATA } from "../lib/seedData";
import { useAuthStore } from "../stores/useAuthStore";
import type { Address, CreateOrderInput, Order, PaymentMethod } from "../types";

const FREE_SHIPPING_THRESHOLD = 499;
const SHIPPING_FEE = 49;
const GST_RATE = 0.18;

const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Delhi",
  "Jammu & Kashmir",
  "Ladakh",
  "Puducherry",
];

const CONFETTI_PIECES = Array.from({ length: 30 }, (_, i) => ({
  id: `cp-${i}`,
  index: i,
}));

type CheckoutStep = "address" | "payment" | "review";

function ConfettiPiece({ index }: { index: number }) {
  const colors = ["bg-primary", "bg-secondary", "bg-accent", "bg-destructive"];
  const color = colors[index % colors.length];
  return (
    <motion.div
      className={`absolute w-2 h-2 rounded-sm ${color} opacity-80`}
      style={{ left: `${(index * 7 + 10) % 90}%`, top: "-10px" }}
      animate={{
        y: ["0vh", "100vh"],
        rotate: [0, 360 * (index % 2 === 0 ? 1 : -1)],
        x: [0, (index % 2 === 0 ? 1 : -1) * (20 + ((index * 13) % 40))],
        opacity: [1, 1, 0],
      }}
      transition={{
        duration: 2 + ((index * 0.2) % 1.5),
        delay: index * 0.05,
        ease: "easeIn",
      }}
    />
  );
}

// ─── Success Screen ───────────────────────────────────────────────────────────
function SuccessScreen({
  order,
}: { order: Order; cartItems: typeof PRODUCTS_SEED_DATA }) {
  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 5);

  return (
    <div
      className="min-h-[85vh] flex flex-col items-center justify-center gap-6 px-4 sm:px-6 py-10 relative overflow-hidden"
      data-ocid="checkout.success_state"
    >
      {/* Confetti */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
        {CONFETTI_PIECES.map((c) => (
          <ConfettiPiece key={c.id} index={c.index} />
        ))}
      </div>

      {/* Check icon */}
      <motion.div
        initial={{ scale: 0, rotate: -15 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 14 }}
        className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-primary/10 flex items-center justify-center"
      >
        <CheckCircle2 className="w-12 h-12 sm:w-14 sm:h-14 text-primary" />
      </motion.div>

      {/* Headline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-center max-w-sm"
      >
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-2">
          Order Placed! 🎉
        </h1>
        <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
          Thank you for choosing Forestheals. Your order is confirmed and we'll
          start processing it right away.
        </p>
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted/50 rounded-full mt-3">
          <Package className="w-4 h-4 text-primary" />
          <span className="text-sm font-mono font-semibold text-foreground">
            Order #{order.id}
          </span>
        </div>
      </motion.div>

      {/* Order summary card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="glass-card rounded-2xl p-5 shadow-soft w-full max-w-md text-sm"
        data-ocid="checkout.success.order_summary"
      >
        {/* Items */}
        <div className="space-y-2.5 mb-4">
          {order.items.slice(0, 3).map((item) => {
            const product = PRODUCTS_SEED_DATA.find(
              (p) => p.id === item.productId,
            );
            return (
              <div key={item.productId} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg overflow-hidden bg-muted shrink-0">
                  {product && (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-foreground line-clamp-1">
                    {product?.name ?? `Product #${item.productId}`}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Qty: {item.quantity}
                  </p>
                </div>
                <p className="text-xs font-semibold text-primary shrink-0">
                  {formatPrice(item.price * item.quantity)}
                </p>
              </div>
            );
          })}
          {order.items.length > 3 && (
            <p className="text-xs text-muted-foreground text-center">
              +{order.items.length - 3} more item
              {order.items.length - 3 > 1 ? "s" : ""}
            </p>
          )}
        </div>

        <Separator className="my-3" />

        {/* Total + Delivery */}
        <div className="space-y-2">
          <div className="flex justify-between items-center font-semibold text-base">
            <span className="text-foreground">Total Paid</span>
            <span className="text-primary">
              {formatPrice(order.totalAmount)}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/40 rounded-lg px-3 py-2">
            <Calendar className="w-3.5 h-3.5 text-primary shrink-0" />
            <span>
              Estimated delivery by{" "}
              <strong className="text-foreground">
                {formatDate(estimatedDelivery.getTime())}
              </strong>
            </span>
          </div>
          {order.paymentMethod === "cod" && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/40 rounded-lg px-3 py-2">
              <Truck className="w-3.5 h-3.5 text-primary shrink-0" />
              <span>
                Pay{" "}
                <strong className="text-foreground">
                  {formatPrice(order.totalAmount)}
                </strong>{" "}
                when your order arrives
              </span>
            </div>
          )}
          <div className="flex items-start gap-2 text-xs text-muted-foreground bg-muted/40 rounded-lg px-3 py-2">
            <FileText className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
            <span>
              GST invoice will be available in your dashboard for download.
            </span>
          </div>
        </div>

        {/* Address summary */}
        <Separator className="my-3" />
        <div className="text-xs text-muted-foreground space-y-0.5">
          <p className="flex items-center gap-1.5 font-medium text-foreground">
            <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
            Delivering to: {order.address.fullName}
          </p>
          <p className="pl-5">
            {order.address.line1}
            {order.address.line2 ? `, ${order.address.line2}` : ""}
          </p>
          <p className="pl-5">
            {order.address.city}, {order.address.state} —{" "}
            {order.address.pincode}
          </p>
        </div>
      </motion.div>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.65 }}
        className="flex flex-col sm:flex-row gap-3 w-full max-w-md z-20"
      >
        <Button
          size="lg"
          asChild
          className="flex-1 shadow-green"
          data-ocid="checkout.success.orders_button"
        >
          <Link to="/dashboard">View My Orders</Link>
        </Button>
        <Button
          size="lg"
          variant="outline"
          asChild
          className="flex-1"
          data-ocid="checkout.success.shop_button"
        >
          <Link to="/products">Continue Shopping</Link>
        </Button>
      </motion.div>
    </div>
  );
}

export default function CheckoutPage() {
  const { isLoggedIn, principal } = useAuthStore();
  const { items, discount, couponCode, clearAllCart } = useCart();
  const createOrder = useCreateOrder();
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);

  const [step, setStep] = useState<CheckoutStep>("address");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cod");
  const [gstNumber, setGstNumber] = useState("");
  const [address, setAddress] = useState<Address>({
    fullName: "",
    phone: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
  });

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoggedIn) {
      throw redirect({ to: "/auth/login" });
    }
  }, [isLoggedIn]);

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const gst = Math.round(subtotal * GST_RATE);
  const discountedSubtotal = Math.max(0, subtotal - discount);
  const grandTotal = discountedSubtotal + shipping + gst;

  const updateAddress =
    (field: keyof Address) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setAddress((a) => ({ ...a, [field]: e.target.value }));

  const isAddressValid =
    address.fullName.trim() &&
    address.phone.trim() &&
    address.line1.trim() &&
    address.city.trim() &&
    address.state.trim() &&
    /^\d{6}$/.test(address.pincode);

  const handlePlaceOrder = async () => {
    const addressWithGst: Address = gstNumber
      ? { ...address, gstNumber }
      : address;
    const input: CreateOrderInput = {
      items,
      totalAmount: grandTotal,
      paymentMethod,
      address: addressWithGst,
      couponCode: couponCode || undefined,
      discountAmount: discount,
    };
    try {
      const order = await createOrder.mutateAsync(input);
      clearAllCart();
      setPlacedOrder(order);
    } catch {
      // error toast handled in mutation onError
    }
  };

  const steps: { id: CheckoutStep; label: string; icon: typeof MapPin }[] = [
    { id: "address", label: "Delivery", icon: MapPin },
    { id: "payment", label: "Payment", icon: CreditCard },
    { id: "review", label: "Review", icon: FileText },
  ];
  const stepIndex = steps.findIndex((s) => s.id === step);

  // Order placed success screen
  if (placedOrder !== null) {
    return <SuccessScreen order={placedOrder} cartItems={PRODUCTS_SEED_DATA} />;
  }

  // Empty cart guard
  if (items.length === 0) {
    return (
      <div
        className="min-h-[70vh] flex flex-col items-center justify-center gap-5 px-4"
        data-ocid="checkout.empty_state"
      >
        <Package className="w-14 h-14 text-muted-foreground" />
        <div className="text-center">
          <h2 className="font-semibold text-xl text-foreground mb-2">
            No items to checkout
          </h2>
          <p className="text-sm text-muted-foreground">
            Add products to your cart first.
          </p>
        </div>
        <Button asChild data-ocid="checkout.empty_state.shop_button">
          <Link to="/products">Browse Products</Link>
        </Button>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-background py-6 sm:py-8 px-4 sm:px-6"
      data-ocid="checkout.page"
    >
      <div className="container max-w-5xl mx-auto">
        {/* Back + Title */}
        <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            asChild
            className="gap-1.5 shrink-0"
            data-ocid="checkout.back.button"
          >
            <Link to="/cart">
              <ArrowLeft className="w-4 h-4" /> Back
            </Link>
          </Button>
          <Separator orientation="vertical" className="h-5" />
          <h1 className="font-display text-lg sm:text-2xl font-bold text-foreground">
            Secure Checkout
          </h1>
          <ShieldCheck className="w-5 h-5 text-primary ml-auto hidden sm:block" />
        </div>

        {/* Step progress */}
        <div
          className="flex items-center gap-0 mb-6 sm:mb-10 max-w-xs sm:max-w-sm mx-auto"
          data-ocid="checkout.steps.nav"
        >
          {steps.map((s, idx) => (
            <div key={s.id} className="flex items-center flex-1">
              <button
                type="button"
                onClick={() => idx < stepIndex && setStep(s.id)}
                disabled={idx > stepIndex}
                className={`flex flex-col items-center gap-1 flex-1 ${idx < stepIndex ? "cursor-pointer" : "cursor-default"}`}
                data-ocid={`checkout.step.${s.id}.tab`}
              >
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-smooth ${
                    idx < stepIndex
                      ? "bg-primary text-primary-foreground"
                      : idx === stepIndex
                        ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {idx < stepIndex ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    <s.icon className="w-4 h-4" />
                  )}
                </div>
                <span
                  className={`text-xs font-medium ${idx <= stepIndex ? "text-foreground" : "text-muted-foreground"}`}
                >
                  {s.label}
                </span>
              </button>
              {idx < steps.length - 1 && (
                <div
                  className={`h-0.5 flex-1 mt-[-12px] transition-smooth ${idx < stepIndex ? "bg-primary" : "bg-border"}`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8">
          {/* Form Column */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {/* Step 1 — Address */}
              {step === "address" && (
                <motion.div
                  key="address"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.25 }}
                  className="glass-card rounded-2xl p-5 sm:p-6 shadow-soft space-y-4 sm:space-y-5"
                  data-ocid="checkout.address.panel"
                >
                  <h2 className="font-semibold text-foreground flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" /> Delivery Address
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input
                        id="fullName"
                        value={address.fullName}
                        onChange={updateAddress("fullName")}
                        placeholder="Rajesh Kumar"
                        data-ocid="checkout.fullname.input"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={address.phone}
                        onChange={updateAddress("phone")}
                        placeholder="+91 98765 43210"
                        data-ocid="checkout.phone.input"
                      />
                    </div>
                    <div className="sm:col-span-2 space-y-1.5">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={principal ?? ""}
                        readOnly
                        className="bg-muted/50 text-muted-foreground cursor-not-allowed"
                        data-ocid="checkout.email.input"
                      />
                    </div>
                    <div className="sm:col-span-2 space-y-1.5">
                      <Label htmlFor="line1">Address Line 1 *</Label>
                      <Input
                        id="line1"
                        value={address.line1}
                        onChange={updateAddress("line1")}
                        placeholder="House / Flat No., Street Name"
                        data-ocid="checkout.address1.input"
                      />
                    </div>
                    <div className="sm:col-span-2 space-y-1.5">
                      <Label htmlFor="line2">Address Line 2 (optional)</Label>
                      <Input
                        id="line2"
                        value={address.line2}
                        onChange={updateAddress("line2")}
                        placeholder="Landmark, Area"
                        data-ocid="checkout.address2.input"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        value={address.city}
                        onChange={updateAddress("city")}
                        placeholder="Mumbai"
                        data-ocid="checkout.city.input"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="state">State *</Label>
                      <select
                        id="state"
                        value={address.state}
                        onChange={updateAddress("state")}
                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                        data-ocid="checkout.state.select"
                      >
                        <option value="">Select state…</option>
                        {INDIAN_STATES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="pincode">PIN Code *</Label>
                      <Input
                        id="pincode"
                        value={address.pincode}
                        onChange={updateAddress("pincode")}
                        placeholder="400001"
                        maxLength={6}
                        pattern="\d{6}"
                        data-ocid="checkout.pincode.input"
                      />
                      {address.pincode && !/^\d{6}$/.test(address.pincode) && (
                        <p
                          className="text-xs text-destructive"
                          data-ocid="checkout.pincode.field_error"
                        >
                          PIN code must be 6 digits
                        </p>
                      )}
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="country">Country</Label>
                      <Input
                        id="country"
                        value="India"
                        readOnly
                        className="bg-muted/50 text-muted-foreground cursor-not-allowed"
                        data-ocid="checkout.country.input"
                      />
                    </div>
                    <div className="sm:col-span-2 space-y-1.5">
                      <Label htmlFor="gst">
                        GST Number (optional — for B2B invoicing)
                      </Label>
                      <Input
                        id="gst"
                        value={gstNumber}
                        onChange={(e) =>
                          setGstNumber(e.target.value.toUpperCase())
                        }
                        placeholder="22AAAAA0000A1Z5"
                        className="font-mono"
                        data-ocid="checkout.gst.input"
                      />
                    </div>
                  </div>

                  <Button
                    type="button"
                    size="lg"
                    className="w-full gap-2 mt-2"
                    disabled={!isAddressValid}
                    onClick={() => setStep("payment")}
                    data-ocid="checkout.address.next_button"
                  >
                    Continue to Payment <ArrowRight className="w-4 h-4" />
                  </Button>
                </motion.div>
              )}

              {/* Step 2 — Payment */}
              {step === "payment" && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.25 }}
                  className="glass-card rounded-2xl p-5 sm:p-6 shadow-soft space-y-5"
                  data-ocid="checkout.payment.panel"
                >
                  <h2 className="font-semibold text-foreground flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-primary" /> Payment
                    Method
                  </h2>

                  <div className="space-y-3">
                    {/* COD option */}
                    <label
                      className={`flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-smooth ${
                        paymentMethod === "cod"
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/40"
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value="cod"
                        checked={paymentMethod === "cod"}
                        onChange={() => setPaymentMethod("cod")}
                        className="mt-0.5 accent-primary"
                        data-ocid="checkout.payment.cod.radio"
                      />
                      <Truck className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                      <div className="flex-1">
                        <p className="font-semibold text-sm text-foreground">
                          Cash on Delivery
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Pay in cash when your order arrives at your doorstep
                        </p>
                        {paymentMethod === "cod" && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="mt-3 p-3 bg-primary/8 rounded-lg border border-primary/20"
                          >
                            <p className="text-sm font-medium text-primary">
                              Pay {formatPrice(grandTotal)} when order arrives
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Keep exact change ready for smooth delivery
                            </p>
                          </motion.div>
                        )}
                      </div>
                    </label>

                    {/* Online option */}
                    <label
                      className={`flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-smooth ${
                        paymentMethod === "stripe"
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/40"
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value="stripe"
                        checked={paymentMethod === "stripe"}
                        onChange={() => setPaymentMethod("stripe")}
                        className="mt-0.5 accent-primary"
                        data-ocid="checkout.payment.stripe.radio"
                      />
                      <CreditCard className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                      <div className="flex-1">
                        <p className="font-semibold text-sm text-foreground">
                          Pay Online
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Credit / Debit Card, UPI, Net Banking via Stripe
                        </p>
                        {paymentMethod === "stripe" && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="mt-3 p-3 bg-primary/8 rounded-lg border border-primary/20 space-y-2"
                          >
                            <div className="flex items-center gap-2">
                              <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
                              <p className="text-xs text-muted-foreground">
                                Secured by Stripe — 256-bit encryption
                              </p>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              You'll be redirected to Stripe's secure payment
                              page to complete payment of{" "}
                              <strong className="text-foreground">
                                {formatPrice(grandTotal)}
                              </strong>
                            </p>
                          </motion.div>
                        )}
                      </div>
                    </label>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="lg"
                      className="flex-1"
                      onClick={() => setStep("address")}
                      data-ocid="checkout.payment.back_button"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" /> Back
                    </Button>
                    <Button
                      type="button"
                      size="lg"
                      className="flex-1 gap-2"
                      onClick={() => setStep("review")}
                      data-ocid="checkout.payment.next_button"
                    >
                      Review Order <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Step 3 — Review */}
              {step === "review" && (
                <motion.div
                  key="review"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4"
                  data-ocid="checkout.review.panel"
                >
                  {/* Review — Cart items */}
                  <div className="glass-card rounded-2xl p-5 shadow-soft">
                    <h3 className="font-semibold text-sm text-foreground mb-3 flex items-center gap-2">
                      <Package className="w-4 h-4 text-primary" /> Order Items (
                      {items.length})
                    </h3>
                    <div className="space-y-3 max-h-48 overflow-y-auto scrollbar-hide">
                      {items.map((item, i) => {
                        const product = PRODUCTS_SEED_DATA.find(
                          (p) => p.id === item.productId,
                        );
                        return (
                          <div
                            key={item.productId}
                            className="flex items-center gap-3"
                            data-ocid={`checkout.review.item.${i + 1}`}
                          >
                            <div className="w-11 h-11 rounded-lg overflow-hidden bg-muted shrink-0">
                              {product && (
                                <img
                                  src={product.imageUrl}
                                  alt={product.name}
                                  className="w-full h-full object-cover"
                                />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-foreground line-clamp-1">
                                {product?.name ?? `Product #${item.productId}`}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Qty: {item.quantity} × {formatPrice(item.price)}
                              </p>
                            </div>
                            <p className="text-sm font-semibold text-primary shrink-0">
                              {formatPrice(item.price * item.quantity)}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Review — Address */}
                  <div className="glass-card rounded-2xl p-5 shadow-soft">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-sm text-foreground flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-primary" /> Delivery
                        Address
                      </h3>
                      <button
                        type="button"
                        onClick={() => setStep("address")}
                        className="text-xs text-primary hover:underline"
                        data-ocid="checkout.review.edit_address.button"
                      >
                        Edit
                      </button>
                    </div>
                    <div className="text-sm text-muted-foreground space-y-0.5">
                      <p className="font-semibold text-foreground">
                        {address.fullName}
                      </p>
                      <p>{address.phone}</p>
                      <p>
                        {address.line1}
                        {address.line2 ? `, ${address.line2}` : ""}
                      </p>
                      <p>
                        {address.city}, {address.state} — {address.pincode}
                      </p>
                      <p>{address.country}</p>
                      {gstNumber && (
                        <p className="font-mono text-xs mt-1">
                          GST: {gstNumber}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Review — Payment */}
                  <div className="glass-card rounded-2xl p-5 shadow-soft">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-sm text-foreground flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-primary" /> Payment
                        Method
                      </h3>
                      <button
                        type="button"
                        onClick={() => setStep("payment")}
                        className="text-xs text-primary hover:underline"
                        data-ocid="checkout.review.edit_payment.button"
                      >
                        Edit
                      </button>
                    </div>
                    <div className="flex items-center gap-3">
                      {paymentMethod === "cod" ? (
                        <>
                          <Truck className="w-5 h-5 text-primary" />
                          <div>
                            <p className="text-sm font-semibold text-foreground">
                              Cash on Delivery
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Pay {formatPrice(grandTotal)} on arrival
                            </p>
                          </div>
                        </>
                      ) : (
                        <>
                          <CreditCard className="w-5 h-5 text-primary" />
                          <div>
                            <p className="text-sm font-semibold text-foreground">
                              Pay Online via Stripe
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Secure card / UPI payment
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* GST Invoice note */}
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/50 border border-border/60">
                    <FileText className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <p className="text-xs text-muted-foreground">
                      A GST-compliant invoice will be automatically generated
                      for your order. You can download it from your dashboard
                      after order confirmation.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      size="lg"
                      className="flex-1"
                      onClick={() => setStep("payment")}
                      data-ocid="checkout.review.back_button"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" /> Back
                    </Button>
                    <Button
                      type="button"
                      size="lg"
                      className="flex-1 gap-2 shadow-green font-semibold"
                      disabled={createOrder.isPending}
                      onClick={handlePlaceOrder}
                      data-ocid="checkout.place_order.submit_button"
                    >
                      {createOrder.isPending ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full animate-spin" />
                          Placing Order…
                        </span>
                      ) : (
                        <>Place Order · {formatPrice(grandTotal)}</>
                      )}
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-2">
            <div
              className="glass-card rounded-2xl p-5 sm:p-6 shadow-elevated lg:sticky lg:top-24"
              data-ocid="checkout.summary.card"
            >
              <h2 className="font-display font-semibold text-base text-foreground mb-4 pb-3 border-b border-border">
                Order Summary
              </h2>

              {/* Product list */}
              <div className="space-y-3 mb-4 max-h-40 overflow-y-auto scrollbar-hide">
                {items.map((item) => {
                  const p = PRODUCTS_SEED_DATA.find(
                    (pr) => pr.id === item.productId,
                  );
                  return (
                    <div
                      key={item.productId}
                      className="flex items-center gap-2.5"
                    >
                      <div className="w-10 h-10 rounded-lg overflow-hidden bg-muted shrink-0">
                        {p && (
                          <img
                            src={p.imageUrl}
                            alt={p.name}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-foreground line-clamp-1">
                          {p?.name ?? `#${item.productId}`}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          ×{item.quantity}
                        </p>
                      </div>
                      <p className="text-xs font-semibold text-foreground shrink-0">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  );
                })}
              </div>

              <Separator className="my-3" />

              <div className="space-y-2.5 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span className="text-foreground">
                    {formatPrice(subtotal)}
                  </span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-primary">
                    <span className="flex items-center gap-1">
                      <Badge
                        variant="outline"
                        className="text-[10px] px-1 py-0 font-mono"
                      >
                        {couponCode}
                      </Badge>
                    </span>
                    <span className="font-semibold">
                      −{formatPrice(discount)}
                    </span>
                  </div>
                )}

                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span
                    className={
                      shipping === 0 ? "text-primary font-semibold" : ""
                    }
                  >
                    {shipping === 0 ? "Free" : formatPrice(shipping)}
                  </span>
                </div>

                <div className="flex justify-between text-muted-foreground">
                  <span>GST (18%)</span>
                  <span>{formatPrice(gst)}</span>
                </div>

                <Separator />

                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-base text-foreground">
                    Total
                  </span>
                  <span className="font-bold text-xl text-primary">
                    {formatPrice(grandTotal)}
                  </span>
                </div>
              </div>

              {/* Trust */}
              <div className="mt-5 pt-4 border-t border-border/50 flex items-center justify-center gap-1 text-xs text-muted-foreground">
                <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                <span>SSL secured · 100% safe checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
