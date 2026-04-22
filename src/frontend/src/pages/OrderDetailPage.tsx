import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  Circle,
  Clock,
  Download,
  MessageCircle,
  Package,
  Truck,
  XCircle,
} from "lucide-react";
import { motion } from "motion/react";
import { createActor } from "../backend";
import { PageSpinner } from "../components/ui/Spinner";
import { useOrder } from "../hooks/useOrders";
import { formatDate, formatDateTime, formatPrice } from "../lib/formatters";
import type { Product } from "../types";

function getDetailStatusColor(status: string): string {
  const map: Record<string, string> = {
    pending:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
    confirmed:
      "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    processing:
      "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
    shipped:
      "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
    completed:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    delivered:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    cancelled: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  };
  return map[status.toLowerCase()] ?? "bg-muted text-muted-foreground";
}

const EDIBLE_CATEGORIES = [
  "Ayurvedic Powders",
  "Seeds & Spices",
  "Spices",
  "Herbs",
  "Food",
];

function isEdibleProduct(product?: Product): boolean {
  if (!product) return false;
  return EDIBLE_CATEGORIES.some((cat) =>
    product.category?.toLowerCase().includes(cat.toLowerCase()),
  );
}

const TIMELINE_STEPS: {
  key: string;
  label: string;
  icon: React.ElementType;
}[] = [
  { key: "pending", label: "Order Placed", icon: Package },
  { key: "confirmed", label: "Confirmed", icon: CheckCircle2 },
  { key: "processing", label: "Processing", icon: Clock },
  { key: "shipped", label: "Shipped", icon: Truck },
  { key: "completed", label: "Delivered", icon: CheckCircle2 },
];

const STATUS_ORDER: string[] = [
  "pending",
  "confirmed",
  "processing",
  "shipped",
  "completed",
];

function TimelineStep({
  label,
  icon: Icon,
  state,
  isLast,
}: {
  label: string;
  icon: React.ElementType;
  state: "complete" | "active" | "upcoming";
  isLast: boolean;
}) {
  return (
    <div className="flex items-start gap-3 flex-1">
      <div className="flex flex-col items-center">
        <div
          className={`w-9 h-9 rounded-full flex items-center justify-center transition-smooth
            ${state === "complete" ? "bg-primary text-primary-foreground" : ""}
            ${state === "active" ? "bg-primary/20 border-2 border-primary text-primary" : ""}
            ${state === "upcoming" ? "bg-muted border-2 border-border text-muted-foreground" : ""}
          `}
        >
          {state === "complete" ? (
            <CheckCircle2 className="w-4 h-4" />
          ) : state === "active" ? (
            <Icon className="w-4 h-4" />
          ) : (
            <Circle className="w-4 h-4" />
          )}
        </div>
        {!isLast && (
          <div
            className={`w-0.5 h-8 mt-1 rounded-full transition-smooth
              ${state === "complete" ? "bg-primary" : "bg-border"}`}
          />
        )}
      </div>
      <div className="pb-6">
        <p
          className={`text-sm font-medium ${state === "upcoming" ? "text-muted-foreground" : "text-foreground"}`}
        >
          {label}
        </p>
        <p className="text-xs text-muted-foreground capitalize">{state}</p>
      </div>
    </div>
  );
}

export default function OrderDetailPage() {
  const { id } = useParams({ from: "/dashboard/orders/$id" });
  const { data: order, isLoading } = useOrder(Number(id));
  const { actor, isFetching } = useActor(createActor);

  const { data: productMap = {} } = useQuery<Record<number, Product>>({
    queryKey: ["products-map"],
    queryFn: async () => {
      if (!actor || isFetching) return {};
      const raw = await actor.listProducts({});
      const map: Record<number, Product> = {};
      for (const p of raw) {
        map[Number(p.id)] = {
          id: Number(p.id),
          name: p.name,
          description: p.description,
          price: Number(p.price),
          category: p.category,
          imageUrl: p.imageUrl,
          imageKey: p.imageKey,
          images: p.images ?? [],
          stock: Number(p.stock),
          ratings: p.ratings,
          reviewCount: Number(p.reviewCount),
          featured: p.featured,
          bestseller: p.bestseller,
          discount: Number(p.discount),
          bundleIds: p.bundleIds.map(Number),
          status: String(p.status ?? "active") as
            | "active"
            | "inactive"
            | "draft",
        };
      }
      return map;
    },
    enabled: !!actor && !isFetching,
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) return <PageSpinner />;

  if (!order) {
    return (
      <div
        className="container max-w-3xl mx-auto px-4 py-24 text-center"
        data-ocid="order_detail.error_state"
      >
        <Package className="w-14 h-14 text-muted-foreground mx-auto mb-4" />
        <h2 className="font-display font-semibold text-xl mb-3 text-foreground">
          Order not found
        </h2>
        <p className="text-muted-foreground text-sm mb-6">
          This order doesn't exist or may have been removed.
        </p>
        <Button asChild data-ocid="order_detail.back.button">
          <Link to="/dashboard">Back to Dashboard</Link>
        </Button>
      </div>
    );
  }

  const normalizedStatus = order.status.toLowerCase();
  const isCompleted =
    normalizedStatus === "completed" || normalizedStatus === "delivered";
  const isCancelled = normalizedStatus === "cancelled";
  const currentStep = STATUS_ORDER.indexOf(normalizedStatus);

  const hasEdibleItem = order.items.some((item) => {
    const product = productMap[item.productId];
    return isEdibleProduct(product);
  });

  const whatsappMsg = encodeURIComponent(
    `Hello! I need help with my Forestheals order #${order.id}. Please assist.`,
  );

  return (
    <div className="min-h-screen bg-background" data-ocid="order_detail.page">
      <div className="bg-card border-b border-border/50">
        <div className="container max-w-4xl mx-auto px-4 py-4">
          <nav
            className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3"
            aria-label="Breadcrumb"
          >
            <Link
              to="/dashboard"
              className="hover:text-primary transition-colors"
            >
              Dashboard
            </Link>
            <ChevronRight className="w-3 h-3" />
            <Link
              to="/dashboard"
              className="hover:text-primary transition-colors"
            >
              Orders
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground font-medium">#{order.id}</span>
          </nav>

          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="gap-1.5 -ml-2"
                data-ocid="order_detail.back.button"
              >
                <Link to="/dashboard">
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </Link>
              </Button>
              <div>
                <h1 className="font-display text-xl font-bold text-foreground">
                  Order #{order.id}
                </h1>
                <p className="text-xs text-muted-foreground">
                  Placed {formatDateTime(order.createdAt)}
                </p>
              </div>
            </div>
            <Badge
              className={`capitalize text-sm px-3 py-1 ${getDetailStatusColor(order.status)}`}
            >
              {order.status}
            </Badge>
          </div>
        </div>
      </div>

      <div className="container max-w-4xl mx-auto px-4 py-8 space-y-5">
        {/* Non-returnable edible item notice */}
        {isCompleted && hasEdibleItem && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800"
            data-ocid="order_detail.edible_notice"
          >
            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-amber-800 dark:text-amber-300">
                Not returnable due to edible item
              </p>
              <p className="text-xs text-amber-700 dark:text-amber-400 mt-0.5">
                This order contains edible products (Ayurvedic powders / spices)
                which cannot be returned for hygiene and safety reasons.
              </p>
            </div>
          </motion.div>
        )}

        {/* Cancelled notice */}
        {isCancelled && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start gap-3 p-4 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800"
            data-ocid="order_detail.cancelled_notice"
          >
            <XCircle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-red-800 dark:text-red-300">
                Order Cancelled
              </p>
              <p className="text-xs text-red-700 dark:text-red-400 mt-0.5">
                This order has been cancelled. If you paid online, a refund will
                be processed within 5–7 business days.
              </p>
            </div>
          </motion.div>
        )}

        {/* Timeline */}
        {!isCancelled && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="glass-card rounded-2xl p-6 shadow-soft"
            data-ocid="order_detail.timeline.section"
          >
            <h2 className="font-semibold text-foreground text-sm mb-5">
              Order Timeline
            </h2>
            <div className="flex flex-col sm:flex-row sm:gap-2">
              {TIMELINE_STEPS.map((step, i) => {
                const stepIdx = STATUS_ORDER.indexOf(step.key);
                const state =
                  stepIdx < currentStep
                    ? "complete"
                    : stepIdx === currentStep
                      ? "active"
                      : "upcoming";
                return (
                  <TimelineStep
                    key={step.key}
                    label={step.label}
                    icon={step.icon}
                    state={state}
                    isLast={i === TIMELINE_STEPS.length - 1}
                  />
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Order Items */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-2xl p-6 shadow-soft"
          data-ocid="order_detail.items.section"
        >
          <h2 className="font-semibold text-foreground text-sm mb-4">
            Order Items
          </h2>

          <div className="hidden sm:grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 text-xs text-muted-foreground font-medium pb-2 border-b border-border/50 mb-3">
            <span className="w-12" />
            <span>Product</span>
            <span className="text-right">Price</span>
            <span className="text-right">Qty</span>
            <span className="text-right">Total</span>
          </div>

          <div className="space-y-0">
            {order.items.map((item, i) => {
              const product = productMap[item.productId];
              return (
                <div
                  key={item.productId}
                  className="flex items-center gap-4 py-3.5 border-b border-border/40 last:border-0"
                  data-ocid={`order_detail.item.${i + 1}.row`}
                >
                  <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-muted">
                    {product?.imageUrl ? (
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Package className="w-5 h-5 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground line-clamp-1">
                      {product?.name ?? `Product #${item.productId}`}
                    </p>
                    {product?.category && (
                      <p className="text-xs text-muted-foreground">
                        {product.category}
                      </p>
                    )}
                  </div>
                  <span className="text-sm text-muted-foreground hidden sm:block w-20 text-right">
                    {formatPrice(item.price)}
                  </span>
                  <span className="text-sm text-muted-foreground w-8 text-center">
                    ×{item.quantity}
                  </span>
                  <span className="text-sm font-semibold text-primary w-20 text-right">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="pt-4 mt-2 border-t border-border space-y-1.5">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="text-foreground">
                {formatPrice(order.totalAmount + order.discountAmount)}
              </span>
            </div>
            {order.discountAmount > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  Discount{order.couponCode && ` (${order.couponCode})`}
                </span>
                <span className="text-primary">
                  −{formatPrice(order.discountAmount)}
                </span>
              </div>
            )}
            <div className="flex justify-between text-base font-bold text-foreground pt-1">
              <span>Total</span>
              <span className="text-primary">
                {formatPrice(order.totalAmount)}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Address + Payment */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="grid sm:grid-cols-2 gap-4"
        >
          <div
            className="glass-card rounded-2xl p-5 shadow-soft"
            data-ocid="order_detail.address.section"
          >
            <h3 className="font-semibold text-sm text-foreground mb-3">
              Delivery Address
            </h3>
            <div className="space-y-0.5 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">
                {order.address.fullName}
              </p>
              <p>{order.address.line1}</p>
              {order.address.line2 && <p>{order.address.line2}</p>}
              <p>
                {order.address.city}, {order.address.state}{" "}
                {order.address.pincode}
              </p>
              <p>{order.address.country}</p>
              <p className="pt-1 font-medium text-foreground">
                📞 {order.address.phone}
              </p>
            </div>
          </div>

          <div
            className="glass-card rounded-2xl p-5 shadow-soft"
            data-ocid="order_detail.payment.section"
          >
            <h3 className="font-semibold text-sm text-foreground mb-3">
              Payment Details
            </h3>
            <div className="space-y-2.5 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Method</span>
                <Badge variant="outline" className="capitalize">
                  {order.paymentMethod === "cod"
                    ? "Cash on Delivery"
                    : "Stripe / Card"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Status</span>
                <Badge
                  className={
                    order.paymentMethod === "cod" && !isCompleted
                      ? "bg-secondary text-secondary-foreground"
                      : "bg-primary/10 text-primary"
                  }
                >
                  {order.paymentMethod === "cod" && !isCompleted
                    ? "Pay on Delivery"
                    : "Paid"}
                </Badge>
              </div>
              {order.stripePaymentId && (
                <div className="flex items-start justify-between gap-2">
                  <span className="text-muted-foreground">Payment ID</span>
                  <span className="text-xs font-mono text-foreground text-right break-all max-w-[150px]">
                    {order.stripePaymentId}
                  </span>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Order Date</span>
                <span className="text-foreground text-xs">
                  {formatDate(order.createdAt)}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <Button
            type="button"
            variant="outline"
            className="gap-2 flex-1"
            onClick={() => window.print()}
            data-ocid="order_detail.download_invoice.button"
          >
            <Download className="w-4 h-4" />
            Download Invoice
          </Button>
          <Button
            asChild
            type="button"
            variant="outline"
            className="gap-2 flex-1 border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366]/5 transition-smooth"
            data-ocid="order_detail.whatsapp.button"
          >
            <a
              href={`https://wa.me/919929059240?text=${whatsappMsg}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="w-4 h-4" />
              Contact Support via WhatsApp
            </a>
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
