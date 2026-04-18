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
import { CheckCircle2, Eye, Package, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { AdminPLayout } from "./AdminPLayout";
import type { APOrder } from "./adminpStore";
import { useAdminPStore } from "./adminpStore";

const STATUSES = [
  "Pending",
  "Confirmed",
  "Processing",
  "Packed",
  "Shipped",
  "Delivered",
  "Cancelled",
  "Returned",
  "Refunded",
] as const;

const STATUS_COLOR: Record<string, string> = {
  Pending: "bg-yellow-100 text-yellow-800",
  Confirmed: "bg-blue-100 text-blue-800",
  Processing: "bg-purple-100 text-purple-800",
  Packed: "bg-indigo-100 text-indigo-800",
  Shipped: "bg-cyan-100 text-cyan-800",
  Delivered: "bg-green-100 text-green-800",
  Cancelled: "bg-red-100 text-red-800",
  Returned: "bg-orange-100 text-orange-800",
  Refunded: "bg-gray-100 text-gray-600",
};

export default function AdminPOrders() {
  const orders = useAdminPStore((s) => s.orders);
  const updateOrder = useAdminPStore((s) => s.updateOrder);
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState<APOrder | null>(null);

  const filtered =
    filter === "all" ? orders : orders.filter((o) => o.status === filter);

  function changeStatus(order: APOrder, status: APOrder["status"]) {
    updateOrder({ ...order, status });
    toast.success(`Order ${order.id} marked as ${status}`);
  }

  return (
    <AdminPLayout title="Orders" subtitle={`${orders.length} total orders`}>
      {/* Filters */}
      <div
        className="flex flex-wrap gap-3 mb-4"
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
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span className="text-sm text-gray-500 self-center">
          Showing {filtered.length} orders
        </span>
      </div>

      {filtered.length === 0 ? (
        <div
          className="bg-white rounded-2xl border border-gray-100 p-14 text-center"
          data-ocid="adminp.orders.empty_state"
        >
          <ShoppingCart className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No orders found for this filter</p>
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
                      {order.id}
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell font-medium text-gray-800 text-xs">
                      {order.customer}
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell text-gray-500 text-xs">
                      {order.createdAt}
                    </td>
                    <td className="px-4 py-3 text-right font-semibold text-gray-900">
                      ₹{order.total.toLocaleString("en-IN")}
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-medium ${order.paymentMethod === "Online" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}
                      >
                        {order.paymentMethod}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <Select
                        value={order.status}
                        onValueChange={(v) =>
                          changeStatus(order, v as APOrder["status"])
                        }
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
                              {s}
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
                        {order.status === "Pending" && (
                          <Button
                            size="sm"
                            className="h-7 text-xs gap-1 bg-green-600 hover:bg-green-700"
                            onClick={() => changeStatus(order, "Confirmed")}
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
              <Package className="w-4 h-4" /> Order {selected?.id}
            </DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-4 pt-2 text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-gray-500 mb-1">Customer</p>
                  <p className="font-medium text-gray-900">
                    {selected.customer}
                  </p>
                  <p className="text-gray-500 text-xs">{selected.email}</p>
                  <p className="text-gray-500 text-xs">{selected.phone}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-gray-500 mb-1">Delivery Address</p>
                  <p className="text-gray-700 text-xs">{selected.address}</p>
                  <p className="text-gray-700 text-xs">
                    {selected.city}, {selected.state} {selected.pincode}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-2 font-semibold uppercase tracking-wide">
                  Products
                </p>
                {selected.products.map((item) => (
                  <div
                    key={item.name}
                    className="flex justify-between bg-gray-50 rounded-lg px-3 py-2 mb-1 text-xs"
                  >
                    <span className="text-gray-800">
                      {item.name} ×{item.qty}
                    </span>
                    <span className="font-semibold">
                      ₹{(item.price * item.qty).toLocaleString("en-IN")}
                    </span>
                  </div>
                ))}
                <div className="flex justify-between font-bold px-3 py-2 border-t border-gray-100 text-sm">
                  <span>Total</span>
                  <span className="text-[#004a38]">
                    ₹{selected.total.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-gray-500 mb-1">Payment</p>
                  <p className="font-medium">{selected.paymentMethod}</p>
                  <span
                    className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium ${selected.paymentStatus === "Paid" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}
                  >
                    {selected.paymentStatus}
                  </span>
                </div>
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-gray-500 mb-1">Tracking ID</p>
                  <p className="font-medium font-mono">
                    {selected.trackingId || "—"}
                  </p>
                  <p className="text-gray-500 mt-1">
                    Ordered: {selected.createdAt}
                  </p>
                </div>
              </div>
              {selected.notes && (
                <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-3 text-xs text-yellow-800">
                  <strong>Notes:</strong> {selected.notes}
                </div>
              )}
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setSelected(null)}
                data-ocid="adminp.orders.detail.close_button"
              >
                Close
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminPLayout>
  );
}
