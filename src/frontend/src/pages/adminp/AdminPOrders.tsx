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
import { useActor } from "@caffeineai/core-infrastructure";
import {
  CheckCircle2,
  Eye,
  Package,
  RefreshCw,
  ShoppingCart,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { OrderStatus, createActor } from "../../backend";
import { useAllOrders } from "../../hooks/useOrders";
import { formatDate, formatPrice } from "../../lib/formatters";
import { PRODUCTS_SEED_DATA } from "../../lib/seedData";
import type { Order } from "../../types";
import { AdminPLayout } from "./AdminPLayout";

const STATUSES = [
  "pending",
  "confirmed",
  "shipped",
  "delivered",
  "cancelled",
] as const;

const STATUS_LABELS: Record<string, string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

const STATUS_COLOR: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  shipped: "bg-cyan-100 text-cyan-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

function mapToBackendStatus(status: string): OrderStatus {
  const map: Record<string, OrderStatus> = {
    pending: OrderStatus.pending,
    confirmed: OrderStatus.processing,
    shipped: OrderStatus.shipped,
    delivered: OrderStatus.delivered,
    cancelled: OrderStatus.cancelled,
  };
  return map[status] ?? OrderStatus.pending;
}

export default function AdminPOrders() {
  const { data: orders, isLoading, refetch } = useAllOrders();
  const { actor, isFetching } = useActor(createActor);
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState<Order | null>(null);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const filtered = !orders
    ? []
    : filter === "all"
      ? orders
      : orders.filter((o) => o.status === filter);

  async function changeStatus(order: Order, newStatus: string) {
    setUpdatingId(order.id);
    try {
      if (actor && !isFetching) {
        await actor.updateOrderStatus(
          BigInt(order.id),
          mapToBackendStatus(newStatus),
        );
      }
      toast.success(
        `Order #${order.id} marked as ${STATUS_LABELS[newStatus] ?? newStatus}`,
      );
      void refetch();
    } catch (err) {
      console.error("Failed to update order status:", err);
      toast.error("Failed to update status. Please try again.");
    } finally {
      setUpdatingId(null);
    }
  }

  return (
    <AdminPLayout
      title="Orders"
      subtitle={`${orders?.length ?? 0} total orders`}
    >
      {/* Filters */}
      <div
        className="flex flex-wrap gap-3 mb-4 items-center"
        data-ocid="adminp.orders.filters"
      >
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger
            className="w-44"
            data-ocid="adminp.orders.status_filter_select"
          >
            <SelectValue placeholder="All statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            {STATUSES.map((s) => (
              <SelectItem key={s} value={s}>
                {STATUS_LABELS[s]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span className="text-sm text-gray-500 flex-1">
          Showing {filtered.length} order{filtered.length !== 1 ? "s" : ""}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => void refetch()}
          className="gap-1.5 text-xs"
          data-ocid="adminp.orders.refresh_button"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Refresh
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-2" data-ocid="adminp.orders.loading_state">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-14 w-full rounded-xl" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div
          className="bg-white rounded-2xl border border-gray-100 p-14 text-center"
          data-ocid="adminp.orders.empty_state"
        >
          <ShoppingCart className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 font-medium">No orders found</p>
          <p className="text-gray-400 text-sm mt-1">
            {filter === "all"
              ? "Orders placed by customers will appear here."
              : `No ${STATUS_LABELS[filter] ?? filter} orders.`}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm" data-ocid="adminp.orders.table">
              <thead>
                <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide border-b border-gray-100">
                  <th className="text-left px-5 py-3 font-medium">Order ID</th>
                  <th className="text-left px-4 py-3 font-medium hidden md:table-cell">
                    Customer
                  </th>
                  <th className="text-left px-4 py-3 font-medium hidden lg:table-cell">
                    Date
                  </th>
                  <th className="text-right px-4 py-3 font-medium">Total</th>
                  <th className="text-left px-4 py-3 font-medium hidden sm:table-cell">
                    Payment
                  </th>
                  <th className="text-left px-4 py-3 font-medium">Status</th>
                  <th className="text-right px-4 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((order, i) => (
                  <tr
                    key={order.id}
                    data-ocid={`adminp.orders.item.${i + 1}`}
                    className="border-t border-gray-50 hover:bg-gray-50/60 transition-colors"
                  >
                    <td className="px-5 py-3 font-mono text-xs text-gray-500">
                      #{order.id}
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell font-medium text-gray-800 text-xs">
                      {order.address.fullName ||
                        `${order.userId.slice(0, 14)}…`}
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell text-gray-500 text-xs">
                      {formatDate(order.createdAt)}
                    </td>
                    <td className="px-4 py-3 text-right font-semibold text-gray-900">
                      {formatPrice(order.totalAmount)}
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          order.paymentMethod === "stripe"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {order.paymentMethod === "stripe" ? "Online" : "COD"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <Select
                        value={order.status}
                        onValueChange={(v) => void changeStatus(order, v)}
                        disabled={updatingId === order.id}
                      >
                        <SelectTrigger
                          className={`h-7 text-xs w-32 border-0 px-2 rounded-full font-medium ${STATUS_COLOR[order.status] ?? "bg-gray-100 text-gray-600"}`}
                          data-ocid={`adminp.orders.item.${i + 1}.status_select`}
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {STATUSES.map((s) => (
                            <SelectItem key={s} value={s}>
                              {STATUS_LABELS[s]}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 text-xs gap-1"
                          onClick={() => setSelected(order)}
                          data-ocid={`adminp.orders.item.${i + 1}.view_button`}
                        >
                          <Eye className="w-3 h-3" /> View
                        </Button>
                        {order.status === "pending" && (
                          <Button
                            size="sm"
                            className="h-7 text-xs gap-1 bg-green-600 hover:bg-green-700"
                            onClick={() =>
                              void changeStatus(order, "confirmed")
                            }
                            disabled={updatingId === order.id}
                            data-ocid={`adminp.orders.item.${i + 1}.confirm_button`}
                          >
                            <CheckCircle2 className="w-3 h-3" /> Confirm
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Order Detail Dialog */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent
          className="max-w-lg max-h-[90vh] overflow-y-auto"
          data-ocid="adminp.orders.detail.dialog"
        >
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Package className="w-4 h-4" /> Order #{selected?.id}
            </DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-4 pt-2 text-sm">
              {/* Status badge */}
              <div className="flex items-center gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${STATUS_COLOR[selected.status] ?? "bg-gray-100 text-gray-600"}`}
                >
                  {STATUS_LABELS[selected.status] ?? selected.status}
                </span>
                <span className="text-gray-400 text-xs">
                  {formatDate(selected.createdAt)}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-gray-500 mb-1">Customer</p>
                  <p className="font-medium text-gray-900 text-xs">
                    {selected.address.fullName || "—"}
                  </p>
                  <p className="text-gray-500 text-xs">
                    {selected.address.phone}
                  </p>
                  <p className="text-gray-500 text-xs truncate">
                    {selected.userId.slice(0, 20)}…
                  </p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-gray-500 mb-1">Delivery Address</p>
                  <p className="text-gray-700 text-xs">
                    {selected.address.line1}
                  </p>
                  {selected.address.line2 && (
                    <p className="text-gray-700 text-xs">
                      {selected.address.line2}
                    </p>
                  )}
                  <p className="text-gray-700 text-xs">
                    {selected.address.city}, {selected.address.state}{" "}
                    {selected.address.pincode}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs text-gray-500 mb-2 font-semibold uppercase tracking-wide">
                  Products ({selected.items.length})
                </p>
                {selected.items.map((item) => {
                  const product = PRODUCTS_SEED_DATA.find(
                    (p) => p.id === item.productId,
                  );
                  return (
                    <div
                      key={item.productId}
                      className="flex justify-between bg-gray-50 rounded-lg px-3 py-2 mb-1 text-xs items-center gap-2"
                    >
                      <span className="text-gray-800 flex-1">
                        {product?.name ?? `Product #${item.productId}`} ×
                        {item.quantity}
                      </span>
                      <span className="font-semibold shrink-0">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  );
                })}
                {selected.discountAmount > 0 && (
                  <div className="flex justify-between px-3 py-1.5 text-xs text-green-700">
                    <span>
                      Discount
                      {selected.couponCode ? ` (${selected.couponCode})` : ""}
                    </span>
                    <span>−{formatPrice(selected.discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold px-3 py-2 border-t border-gray-100 text-sm">
                  <span>Total</span>
                  <span className="text-[#004a38]">
                    {formatPrice(selected.totalAmount)}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-gray-500 mb-1">Payment</p>
                  <p className="font-medium">
                    {selected.paymentMethod === "stripe"
                      ? "Online / Stripe"
                      : "Cash on Delivery"}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-gray-500 mb-1">Order Date</p>
                  <p className="font-medium">
                    {formatDate(selected.createdAt)}
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 text-xs"
                  onClick={() => void changeStatus(selected, "confirmed")}
                  disabled={
                    selected.status !== "pending" || updatingId === selected.id
                  }
                  data-ocid="adminp.orders.detail.confirm_button"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Confirm
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 text-xs"
                  size="sm"
                  onClick={() => setSelected(null)}
                  data-ocid="adminp.orders.detail.close_button"
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminPLayout>
  );
}
