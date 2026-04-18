import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  Circle,
  Clock,
  Download,
  MessageCircle,
  Package,
  Truck,
} from "lucide-react";
import { motion } from "motion/react";
import { PageSpinner } from "../components/ui/Spinner";
import { useOrder } from "../hooks/useOrders";
import {
  formatDate,
  formatDateTime,
  formatPrice,
  getOrderStatusColor,
} from "../lib/formatters";
import { PRODUCTS_SEED_DATA } from "../lib/seedData";
import type { OrderStatus } from "../types";

const TIMELINE_STEPS: {
  key: OrderStatus | "confirmed";
  label: string;
  icon: React.ElementType;
}[] = [
  { key: "pending", label: "Order Placed", icon: Package },
  { key: "confirmed", label: "Processing", icon: Clock },
  { key: "shipped", label: "Shipped", icon: Truck },
  { key: "delivered", label: "Delivered", icon: CheckCircle2 },
];

const STATUS_ORDER: string[] = ["pending", "confirmed", "shipped", "delivered"];

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

  const currentStep = STATUS_ORDER.indexOf(order.status);
  const whatsappMsg = encodeURIComponent(
    `Hello! I need help with my Forestheals order #${order.id}. Please assist.`,
  );

  return (
    <div className="min-h-screen bg-background" data-ocid="order_detail.page">
      {/* Header bar */}
      <div className="bg-card border-b border-border/50">
        <div className="container max-w-4xl mx-auto px-4 py-4">
          {/* Breadcrumb */}
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
            <div className="flex items-center gap-2 flex-wrap">
              <Badge
                className={`capitalize text-sm px-3 py-1 ${getOrderStatusColor(order.status)}`}
              >
                {order.status}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container max-w-4xl mx-auto px-4 py-8 space-y-5">
        {/* Timeline */}
        {order.status !== "cancelled" && (
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

          {/* Table header */}
          <div className="hidden sm:grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 text-xs text-muted-foreground font-medium pb-2 border-b border-border/50 mb-3">
            <span className="w-12" />
            <span>Product</span>
            <span className="text-right">Price</span>
            <span className="text-right">Qty</span>
            <span className="text-right">Total</span>
          </div>

          <div className="space-y-0">
            {order.items.map((item, i) => {
              const product = PRODUCTS_SEED_DATA.find(
                (p) => p.id === item.productId,
              );
              return (
                <div
                  key={item.productId}
                  className="flex items-center gap-4 py-3.5 border-b border-border/40 last:border-0"
                  data-ocid={`order_detail.item.${i + 1}.row`}
                >
                  {/* Image */}
                  <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-muted">
                    {product ? (
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Package className="w-5 h-5 text-muted-foreground" />
                      </div>
                    )}
                  </div>

                  {/* Name */}
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

                  {/* Unit price */}
                  <span className="text-sm text-muted-foreground hidden sm:block w-20 text-right">
                    {formatPrice(item.price)}
                  </span>

                  {/* Qty */}
                  <span className="text-sm text-muted-foreground w-8 text-center">
                    ×{item.quantity}
                  </span>

                  {/* Line total */}
                  <span className="text-sm font-semibold text-primary w-20 text-right">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Totals */}
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
                  Discount
                  {order.couponCode && ` (${order.couponCode})`}
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

        {/* Address + Payment info */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="grid sm:grid-cols-2 gap-4"
        >
          {/* Delivery Address */}
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

          {/* Payment Info */}
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
                    order.paymentMethod === "cod" &&
                    order.status !== "delivered"
                      ? "bg-secondary text-secondary-foreground"
                      : "bg-primary/10 text-primary"
                  }
                >
                  {order.paymentMethod === "cod" && order.status !== "delivered"
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
