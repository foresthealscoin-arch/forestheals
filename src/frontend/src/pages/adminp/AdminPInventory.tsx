import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertCircle,
  Edit2,
  Minus,
  Package,
  Plus,
  RefreshCw,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  useAdminInventory,
  useUpdateInventory,
} from "../../hooks/useAdminData";
import type { InventorySummaryView } from "../../services/adminService";
import { AdminPLayout } from "./AdminPLayout";

export default function AdminPInventory() {
  const {
    data: inventory = [],
    isLoading,
    isError,
    refetch,
  } = useAdminInventory();
  const updateMutation = useUpdateInventory();
  const [editTarget, setEditTarget] = useState<InventorySummaryView | null>(
    null,
  );
  const [adjustQty, setAdjustQty] = useState(1);
  const [adjustNotes, setAdjustNotes] = useState("");

  async function adjust(item: InventorySummaryView, delta: number) {
    try {
      await updateMutation.mutateAsync({
        productId: `${item.productId}`,
        quantity: delta,
        type: delta > 0 ? "restock" : "sale",
        notes: `Admin manual adjustment: ${delta > 0 ? "+" : ""}${String(delta)}`,
      });
      toast.success(
        `Stock ${delta > 0 ? "increased" : "decreased"} by ${Math.abs(delta)}`,
      );
    } catch {
      toast.error("Failed to update stock");
    }
  }

  async function handleAdjust(type: "add" | "remove") {
    if (!editTarget || adjustQty <= 0) return;
    const delta = type === "add" ? adjustQty : -adjustQty;
    try {
      await updateMutation.mutateAsync({
        productId: String(editTarget.productId),
        quantity: delta,
        type: type === "add" ? "restock" : "remove",
        notes: adjustNotes || "Admin adjustment",
      });
      toast.success("Inventory updated");
      setEditTarget(null);
      setAdjustQty(1);
      setAdjustNotes("");
    } catch {
      toast.error("Failed to update inventory");
    }
  }

  if (isError) {
    return (
      <AdminPLayout title="Inventory Management" subtitle="Track stock levels">
        <div
          className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center"
          data-ocid="adminp.inventory.error_state"
        >
          <AlertCircle className="w-8 h-8 text-red-400 mx-auto mb-3" />
          <p className="text-red-700 font-medium">Failed to load inventory</p>
          <Button
            variant="outline"
            size="sm"
            className="mt-3"
            onClick={() => void refetch()}
          >
            <RefreshCw className="w-4 h-4 mr-1" /> Retry
          </Button>
        </div>
      </AdminPLayout>
    );
  }

  const lowStockCount = inventory.filter((i) => i.lowStockFlag).length;
  const outOfStockCount = inventory.filter((i) => i.outOfStockFlag).length;

  return (
    <AdminPLayout
      title="Inventory Management"
      subtitle="Track stock levels and availability"
    >
      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          {
            label: "Total SKUs",
            value: inventory.length,
            color: "text-gray-900",
          },
          {
            label: "Low Stock",
            value: lowStockCount,
            color: "text-orange-600",
          },
          {
            label: "Out of Stock",
            value: outOfStockCount,
            color: "text-red-600",
          },
          {
            label: "In Stock",
            value: inventory.length - outOfStockCount,
            color: "text-green-700",
          },
        ].map((card) => (
          <div
            key={card.label}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5"
          >
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
              {card.label}
            </p>
            <p className={`text-2xl font-bold mt-1 ${card.color}`}>
              {card.value}
            </p>
          </div>
        ))}
      </div>

      {isLoading ? (
        <div className="space-y-2" data-ocid="adminp.inventory.loading_state">
          {["a", "b", "c", "d", "e"].map((k) => (
            <Skeleton key={k} className="h-14 w-full rounded-xl" />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table
              className="w-full text-sm"
              data-ocid="adminp.inventory.table"
            >
              <thead>
                <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide border-b border-gray-100">
                  <th className="text-left px-5 py-3 font-medium">Product</th>
                  <th className="text-right px-4 py-3 font-medium">
                    Available
                  </th>
                  <th className="text-right px-4 py-3 font-medium hidden sm:table-cell">
                    Reserved
                  </th>
                  <th className="text-left px-4 py-3 font-medium hidden md:table-cell">
                    Status
                  </th>
                  <th className="text-right px-4 py-3 font-medium">
                    Quick Adjust
                  </th>
                  <th className="text-right px-4 py-3 font-medium">Edit</th>
                </tr>
              </thead>
              <tbody>
                {inventory.map((item, i) => (
                  <tr
                    key={item.productId}
                    data-ocid={`adminp.inventory.item.${i + 1}`}
                    className={`border-t border-gray-50 hover:bg-gray-50/60 transition-colors ${item.lowStockFlag ? "bg-orange-50/40" : ""}`}
                  >
                    <td className="px-5 py-3">
                      <p className="font-medium text-gray-900 text-sm truncate max-w-[180px]">
                        {item.productName}
                      </p>
                      <p className="text-xs text-gray-400">
                        ID: {item.productId}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span
                        className={`font-bold text-sm ${item.outOfStockFlag ? "text-red-600" : item.lowStockFlag ? "text-orange-600" : "text-green-700"}`}
                      >
                        {item.availableStock}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right hidden sm:table-cell text-gray-500 text-xs">
                      {item.reservedStock}
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      {item.outOfStockFlag ? (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-700 font-medium">
                          Out of Stock
                        </span>
                      ) : item.lowStockFlag ? (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 font-medium">
                          Low Stock
                        </span>
                      ) : (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-medium">
                          In Stock
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => void adjust(item, -1)}
                          className="w-6 h-6 rounded bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors"
                          disabled={updateMutation.isPending}
                          data-ocid={`adminp.inventory.item.${i + 1}.decrease_button`}
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <button
                          type="button"
                          onClick={() => void adjust(item, 1)}
                          className="w-6 h-6 rounded bg-green-100 hover:bg-green-200 flex items-center justify-center text-green-700 transition-colors"
                          disabled={updateMutation.isPending}
                          data-ocid={`adminp.inventory.item.${i + 1}.increase_button`}
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-7 w-7"
                        onClick={() => {
                          setEditTarget(item);
                          setAdjustQty(1);
                          setAdjustNotes("");
                        }}
                        data-ocid={`adminp.inventory.item.${i + 1}.edit_button`}
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </Button>
                    </td>
                  </tr>
                ))}
                {inventory.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="py-12 text-center"
                      data-ocid="adminp.inventory.empty_state"
                    >
                      <Package className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                      <p className="text-gray-400 text-sm">
                        No inventory data — add products to see inventory here
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Adjust Modal */}
      <Dialog open={!!editTarget} onOpenChange={() => setEditTarget(null)}>
        <DialogContent
          className="max-w-sm"
          data-ocid="adminp.inventory.modal.dialog"
        >
          <DialogHeader>
            <DialogTitle>Adjust Stock — {editTarget?.productName}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 pt-2">
            <div className="bg-gray-50 rounded-xl p-3 text-sm">
              <p className="text-gray-500 text-xs mb-1">
                Current Available Stock
              </p>
              <p className="font-bold text-gray-900 text-lg">
                {editTarget?.availableStock ?? 0}
              </p>
            </div>
            <div className="space-y-1.5">
              <Label>Quantity</Label>
              <Input
                type="number"
                min={1}
                value={adjustQty}
                onChange={(e) => setAdjustQty(Number(e.target.value))}
                data-ocid="adminp.inventory.modal.quantity_input"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Notes (optional)</Label>
              <Input
                value={adjustNotes}
                onChange={(e) => setAdjustNotes(e.target.value)}
                placeholder="Reason for adjustment…"
                data-ocid="adminp.inventory.modal.notes_input"
              />
            </div>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <Button
                className="bg-green-600 hover:bg-green-700"
                onClick={() => void handleAdjust("add")}
                disabled={updateMutation.isPending}
                data-ocid="adminp.inventory.modal.add_button"
              >
                <Plus className="w-4 h-4 mr-1" /> Add Stock
              </Button>
              <Button
                variant="outline"
                className="border-red-200 text-red-600 hover:bg-red-50"
                onClick={() => void handleAdjust("remove")}
                disabled={updateMutation.isPending}
                data-ocid="adminp.inventory.modal.remove_button"
              >
                <Minus className="w-4 h-4 mr-1" /> Remove
              </Button>
            </div>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setEditTarget(null)}
              data-ocid="adminp.inventory.modal.cancel_button"
            >
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </AdminPLayout>
  );
}
