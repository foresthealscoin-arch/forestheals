import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit2, Minus, Package, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { AdminPLayout } from "./AdminPLayout";
import type { APInventoryItem } from "./adminpStore";
import { useAdminPStore } from "./adminpStore";

export default function AdminPInventory() {
  const inventory = useAdminPStore((s) => s.inventory);
  const updateInventoryItem = useAdminPStore((s) => s.updateInventoryItem);

  const [editTarget, setEditTarget] = useState<APInventoryItem | null>(null);
  const [form, setForm] = useState<Partial<APInventoryItem>>({});

  function openEdit(item: APInventoryItem) {
    setEditTarget(item);
    setForm({ ...item });
  }

  function handleSave() {
    if (!editTarget) return;
    updateInventoryItem({ ...editTarget, ...form } as APInventoryItem);
    toast.success("Inventory updated");
    setEditTarget(null);
  }

  function adjust(item: APInventoryItem, delta: number) {
    const updated = { ...item, current: Math.max(0, item.current + delta) };
    updateInventoryItem(updated);
    toast.success(
      `Stock ${delta > 0 ? "increased" : "decreased"} by ${Math.abs(delta)}`,
    );
  }

  return (
    <AdminPLayout
      title="Inventory Management"
      subtitle="Track stock levels, batches, and suppliers"
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
            label: "Low Stock Items",
            value: inventory.filter((i) => i.current < i.lowStockThreshold)
              .length,
            color: "text-orange-600",
          },
          {
            label: "Out of Stock",
            value: inventory.filter((i) => i.current === 0).length,
            color: "text-red-600",
          },
          {
            label: "Incoming Stock",
            value: inventory.filter((i) => i.incoming > 0).length,
            color: "text-blue-600",
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

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm" data-ocid="adminp.inventory.table">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide border-b border-gray-100">
                <th className="text-left px-5 py-3 font-medium">Product</th>
                <th className="text-left px-4 py-3 font-medium hidden md:table-cell">
                  SKU
                </th>
                <th className="text-right px-4 py-3 font-medium">Current</th>
                <th className="text-right px-4 py-3 font-medium hidden sm:table-cell">
                  Reserved
                </th>
                <th className="text-right px-4 py-3 font-medium hidden lg:table-cell">
                  Incoming
                </th>
                <th className="text-left px-4 py-3 font-medium hidden xl:table-cell">
                  Batch / Expiry
                </th>
                <th className="text-right px-4 py-3 font-medium">Adjust</th>
                <th className="text-right px-4 py-3 font-medium">Edit</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((item, i) => (
                <tr
                  key={item.id}
                  data-ocid={`adminp.inventory.item.${i + 1}`}
                  className={`border-t border-gray-50 hover:bg-gray-50/60 transition-colors ${item.current < item.lowStockThreshold ? "bg-orange-50/40" : ""}`}
                >
                  <td className="px-5 py-3">
                    <p className="font-medium text-gray-900 text-sm truncate max-w-[150px]">
                      {item.productName}
                    </p>
                    <p className="text-xs text-gray-400">{item.supplier}</p>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell font-mono text-xs text-gray-500">
                    {item.sku}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span
                      className={`font-bold text-sm ${item.current === 0 ? "text-red-600" : item.current < item.lowStockThreshold ? "text-orange-600" : "text-green-700"}`}
                    >
                      {item.current}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right hidden sm:table-cell text-gray-500 text-xs">
                    {item.reserved}
                  </td>
                  <td className="px-4 py-3 text-right hidden lg:table-cell">
                    {item.incoming > 0 ? (
                      <span className="text-blue-600 font-medium text-xs">
                        +{item.incoming}
                      </span>
                    ) : (
                      <span className="text-gray-400 text-xs">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 hidden xl:table-cell">
                    <p className="text-xs text-gray-600">{item.batchNo}</p>
                    <p className="text-xs text-gray-400">{item.expiryDate}</p>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        type="button"
                        onClick={() => adjust(item, -1)}
                        className="w-6 h-6 rounded bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors"
                        data-ocid={`adminp.inventory.item.${i + 1}.decrease_button`}
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <button
                        type="button"
                        onClick={() => adjust(item, 1)}
                        className="w-6 h-6 rounded bg-green-100 hover:bg-green-200 flex items-center justify-center text-green-700 transition-colors"
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
                      onClick={() => openEdit(item)}
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
                    colSpan={8}
                    className="py-12 text-center"
                    data-ocid="adminp.inventory.empty_state"
                  >
                    <Package className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                    <p className="text-gray-400 text-sm">No inventory items</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      <Dialog open={!!editTarget} onOpenChange={() => setEditTarget(null)}>
        <DialogContent
          className="max-w-md max-h-[90vh] overflow-y-auto"
          data-ocid="adminp.inventory.modal.dialog"
        >
          <DialogHeader>
            <DialogTitle>
              Edit Inventory — {editTarget?.productName}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3 pt-2">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Current Stock</Label>
                <Input
                  type="number"
                  min={0}
                  value={form.current ?? ""}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, current: Number(e.target.value) }))
                  }
                  data-ocid="adminp.inventory.modal.current_input"
                />
              </div>
              <div className="space-y-1.5">
                <Label>Reserved</Label>
                <Input
                  type="number"
                  min={0}
                  value={form.reserved ?? ""}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, reserved: Number(e.target.value) }))
                  }
                  data-ocid="adminp.inventory.modal.reserved_input"
                />
              </div>
              <div className="space-y-1.5">
                <Label>Incoming</Label>
                <Input
                  type="number"
                  min={0}
                  value={form.incoming ?? ""}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, incoming: Number(e.target.value) }))
                  }
                  data-ocid="adminp.inventory.modal.incoming_input"
                />
              </div>
              <div className="space-y-1.5">
                <Label>Damaged</Label>
                <Input
                  type="number"
                  min={0}
                  value={form.damaged ?? ""}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, damaged: Number(e.target.value) }))
                  }
                  data-ocid="adminp.inventory.modal.damaged_input"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Low Stock Threshold</Label>
              <Input
                type="number"
                min={0}
                value={form.lowStockThreshold ?? ""}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    lowStockThreshold: Number(e.target.value),
                  }))
                }
                data-ocid="adminp.inventory.modal.threshold_input"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Supplier</Label>
              <Input
                value={form.supplier ?? ""}
                onChange={(e) =>
                  setForm((f) => ({ ...f, supplier: e.target.value }))
                }
                data-ocid="adminp.inventory.modal.supplier_input"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Batch Number</Label>
                <Input
                  value={form.batchNo ?? ""}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, batchNo: e.target.value }))
                  }
                  data-ocid="adminp.inventory.modal.batch_input"
                />
              </div>
              <div className="space-y-1.5">
                <Label>Expiry Date</Label>
                <Input
                  type="date"
                  value={form.expiryDate ?? ""}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, expiryDate: e.target.value }))
                  }
                  data-ocid="adminp.inventory.modal.expiry_input"
                />
              </div>
            </div>
            <div className="flex gap-2 pt-1">
              <Button
                className="flex-1 bg-[#004a38] hover:bg-[#003a2c]"
                onClick={handleSave}
                data-ocid="adminp.inventory.modal.submit_button"
              >
                Save
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setEditTarget(null)}
                data-ocid="adminp.inventory.modal.cancel_button"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </AdminPLayout>
  );
}
