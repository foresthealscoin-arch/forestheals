import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  CheckCircle2,
  ChevronDown,
  Clock,
  CreditCard,
  Eye,
  MapPin,
  Package,
  ShoppingCart,
  Truck,
  XCircle,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useAllOrders } from "../../hooks/useOrders";
import {
  formatDate,
  formatDateTime,
  formatPrice,
  getOrderStatusColor,
} from "../../lib/formatters";
import type { Order, OrderStatus } from "../../types";
import { AdminSidebar } from "./AdminDashboardPage";

const STATUS_OPTIONS: OrderStatus[] = [
  "pending",
  "confirmed",
  "processing",
  "shipped",
  "completed",
  "cancelled",
];

const STATUS_ICONS: Record<OrderStatus, React.ElementType> = {
  pending: Clock,
  confirmed: CheckCircle2,
  processing: Clock,
  shipped: Truck,
  completed: CheckCircle2,
  cancelled: XCircle,
};

const STATUS_LABELS: Record<OrderStatus, string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  processing: "Processing",
  shipped: "Shipped",
  completed: "Completed",
  cancelled: "Cancelled",
};

export default function AdminOrdersPage() {
  const { data: orders, isLoading } = useAllOrders();
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [localStatuses, setLocalStatuses] = useState<
    Record<number, OrderStatus>
  >({});

  const filtered = (orders ?? []).filter((o) => {
    if (statusFilter === "all") return true;
    const status = localStatuses[o.id] ?? o.status;
    return status === statusFilter;
  });

  function getStatus(order: Order): OrderStatus {
    return localStatuses[order.id] ?? order.status;
  }

  function updateStatus(orderId: number, status: OrderStatus) {
    setLocalStatuses((prev) => ({ ...prev, [orderId]: status }));
  }

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar active="/admin/orders" />

      <main className="flex-1 overflow-auto" data-ocid="admin.orders.page">
        {/* Header */}
        <div className="bg-card border-b border-border px-8 py-5 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-foreground">Orders</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {(orders ?? []).length} total orders
            </p>
          </div>
        </div>

        <div className="p-8 space-y-5">
          {/* Filters */}
          <div
            className="flex items-center gap-3"
            data-ocid="admin.orders.filters"
          >
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger
                className="w-44"
                data-ocid="admin.orders.status_filter_select"
              >
                <SelectValue placeholder="All statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                {STATUS_OPTIONS.map((s) => (
                  <SelectItem key={s} value={s}>
                    {STATUS_LABELS[s]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          {isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-14 w-full rounded-xl" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div
              className="bg-card rounded-2xl border border-border p-14 text-center"
              data-ocid="admin.orders.empty_state"
            >
              <ShoppingCart className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
              <p className="font-medium text-foreground mb-1">
                No orders found
              </p>
              <p className="text-sm text-muted-foreground">
                Try changing the filter or wait for new orders
              </p>
            </div>
          ) : (
            <div className="bg-card rounded-2xl border border-border shadow-soft overflow-hidden">
              <div className="overflow-x-auto">
                <table
                  className="w-full text-sm"
                  data-ocid="admin.orders.table"
                >
                  <thead>
                    <tr className="bg-muted/40 text-muted-foreground text-xs uppercase tracking-wide border-b border-border">
                      <th className="text-left px-5 py-3 font-medium">
                        Order ID
                      </th>
                      <th className="text-left px-4 py-3 font-medium hidden md:table-cell">
                        Customer
                      </th>
                      <th className="text-left px-4 py-3 font-medium hidden lg:table-cell">
                        Date
                      </th>
                      <th className="text-center px-4 py-3 font-medium hidden sm:table-cell">
                        Items
                      </th>
                      <th className="text-right px-4 py-3 font-medium">
                        Total
                      </th>
                      <th className="text-left px-4 py-3 font-medium hidden md:table-cell">
                        Payment
                      </th>
                      <th className="text-left px-4 py-3 font-medium">
                        Status
                      </th>
                      <th className="text-right px-4 py-3 font-medium">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((order, i) => {
                      const status = getStatus(order);
                      const Icon = STATUS_ICONS[status];
                      return (
                        <motion.tr
                          key={order.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: i * 0.03 }}
                          data-ocid={`admin.orders.item.${i + 1}`}
                          className="border-t border-border hover:bg-muted/20 transition-colors"
                        >
                          <td className="px-5 py-3 font-mono text-xs text-muted-foreground">
                            #{String(order.id).slice(-7)}
                          </td>
                          <td className="px-4 py-3 font-mono text-xs hidden md:table-cell truncate max-w-[100px]">
                            {order.userId.slice(0, 12)}…
                          </td>
                          <td className="px-4 py-3 text-muted-foreground text-xs hidden lg:table-cell whitespace-nowrap">
                            {formatDate(order.createdAt)}
                          </td>
                          <td className="px-4 py-3 text-center hidden sm:table-cell">
                            <Badge variant="secondary" className="text-xs">
                              {order.items.length}{" "}
                              {order.items.length === 1 ? "item" : "items"}
                            </Badge>
                          </td>
                          <td className="px-4 py-3 text-right font-semibold">
                            {formatPrice(order.totalAmount)}
                          </td>
                          <td className="px-4 py-3 hidden md:table-cell">
                            <span
                              className={`text-xs font-medium px-2 py-0.5 rounded-full ${order.paymentMethod === "stripe" ? "bg-primary/10 text-primary" : "bg-secondary text-secondary-foreground"}`}
                            >
                              {order.paymentMethod === "stripe"
                                ? "Stripe"
                                : "COD"}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <Select
                              value={status}
                              onValueChange={(v) =>
                                updateStatus(order.id, v as OrderStatus)
                              }
                            >
                              <SelectTrigger
                                className={`h-7 text-xs border-0 w-32 px-2 rounded-full font-medium ${getOrderStatusColor(status)}`}
                                data-ocid={`admin.orders.item.${i + 1}.status_select`}
                              >
                                <span className="flex items-center gap-1">
                                  <Icon className="w-3 h-3" />
                                  <SelectValue />
                                </span>
                                <ChevronDown className="w-3 h-3 ml-auto opacity-60" />
                              </SelectTrigger>
                              <SelectContent>
                                {STATUS_OPTIONS.map((s) => (
                                  <SelectItem key={s} value={s}>
                                    {STATUS_LABELS[s]}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="h-7 text-xs gap-1"
                              onClick={() => setSelectedOrder(order)}
                              data-ocid={`admin.orders.item.${i + 1}.view_button`}
                            >
                              <Eye className="w-3 h-3" /> View
                            </Button>
                          </td>
                        </motion.tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Order Detail Modal */}
      <Dialog
        open={!!selectedOrder}
        onOpenChange={() => setSelectedOrder(null)}
      >
        <DialogContent
          className="max-w-xl max-h-[90vh] overflow-y-auto"
          data-ocid="admin.orders.detail.dialog"
        >
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              Order #{selectedOrder ? String(selectedOrder.id).slice(-7) : ""}
            </DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-5 pt-2">
              {/* Meta */}
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="bg-muted/30 rounded-xl p-3">
                  <p className="text-xs text-muted-foreground mb-1 font-medium">
                    Placed on
                  </p>
                  <p className="text-foreground">
                    {formatDateTime(selectedOrder.createdAt)}
                  </p>
                </div>
                <div className="bg-muted/30 rounded-xl p-3">
                  <p className="text-xs text-muted-foreground mb-1 font-medium">
                    Status
                  </p>
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getOrderStatusColor(getStatus(selectedOrder))}`}
                  >
                    {STATUS_LABELS[getStatus(selectedOrder)]}
                  </span>
                </div>
              </div>

              {/* Items */}
              <div>
                <p className="text-sm font-semibold text-foreground mb-3 flex items-center gap-1.5">
                  <Package className="w-4 h-4" /> Order Items
                </p>
                <div className="space-y-2">
                  {selectedOrder.items.map((item) => (
                    <div
                      key={item.productId}
                      className="flex justify-between items-center bg-muted/30 rounded-xl px-4 py-2.5 text-sm"
                    >
                      <span className="text-foreground">
                        Product #{item.productId}
                      </span>
                      <span className="text-muted-foreground">
                        ×{item.quantity}
                      </span>
                      <span className="font-semibold">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
                {selectedOrder.discountAmount > 0 && (
                  <div className="flex justify-between items-center px-4 py-2 text-sm text-primary">
                    <span>
                      Discount{" "}
                      {selectedOrder.couponCode
                        ? `(${selectedOrder.couponCode})`
                        : ""}
                    </span>
                    <span>− {formatPrice(selectedOrder.discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between items-center px-4 py-2 text-sm font-bold border-t border-border mt-1">
                  <span>Total</span>
                  <span className="text-primary">
                    {formatPrice(selectedOrder.totalAmount)}
                  </span>
                </div>
              </div>

              {/* Address */}
              <div>
                <p className="text-sm font-semibold text-foreground mb-3 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" /> Delivery Address
                </p>
                <div className="bg-muted/30 rounded-xl p-4 text-sm space-y-0.5">
                  <p className="font-medium text-foreground">
                    {selectedOrder.address.fullName}
                  </p>
                  <p className="text-muted-foreground">
                    {selectedOrder.address.phone}
                  </p>
                  <p className="text-muted-foreground">
                    {selectedOrder.address.line1}
                    {selectedOrder.address.line2
                      ? `, ${selectedOrder.address.line2}`
                      : ""}
                  </p>
                  <p className="text-muted-foreground">
                    {selectedOrder.address.city}, {selectedOrder.address.state}{" "}
                    – {selectedOrder.address.pincode}
                  </p>
                  <p className="text-muted-foreground">
                    {selectedOrder.address.country}
                  </p>
                </div>
              </div>

              {/* Payment */}
              <div>
                <p className="text-sm font-semibold text-foreground mb-3 flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4" /> Payment Info
                </p>
                <div className="bg-muted/30 rounded-xl p-4 text-sm space-y-1">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Method</span>
                    <span className="font-medium">
                      {selectedOrder.paymentMethod === "stripe"
                        ? "Stripe (Card)"
                        : "Cash on Delivery"}
                    </span>
                  </div>
                  {selectedOrder.stripePaymentId && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Payment ID</span>
                      <span className="font-mono text-xs">
                        {selectedOrder.stripePaymentId}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => setSelectedOrder(null)}
                data-ocid="admin.orders.detail.close_button"
              >
                Close
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
