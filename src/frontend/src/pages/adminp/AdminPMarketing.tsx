import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Edit2, Megaphone, Plus, Tag, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { APTag, AdminPLayout } from "./AdminPLayout";
import type { APCoupon } from "./adminpStore";
import { useAdminPStore } from "./adminpStore";

function genId() {
  return `CPN-${Date.now().toString(36).toUpperCase()}`;
}

export default function AdminPMarketing() {
  const coupons = useAdminPStore((s) => s.coupons);
  const addCoupon = useAdminPStore((s) => s.addCoupon);
  const updateCoupon = useAdminPStore((s) => s.updateCoupon);
  const deleteCoupon = useAdminPStore((s) => s.deleteCoupon);

  const [showModal, setShowModal] = useState(false);
  const [editTarget, setEditTarget] = useState<APCoupon | null>(null);
  const [form, setForm] = useState<Partial<APCoupon>>({});

  function openAdd() {
    setEditTarget(null);
    setForm({ type: "Percentage", active: true, usedCount: 0 });
    setShowModal(true);
  }

  function openEdit(c: APCoupon) {
    setEditTarget(c);
    setForm({ ...c });
    setShowModal(true);
  }

  function handleSave() {
    if (!form.code?.trim()) {
      toast.error("Coupon code required");
      return;
    }
    if (editTarget) {
      updateCoupon({ ...editTarget, ...form } as APCoupon);
      toast.success("Coupon updated");
    } else {
      addCoupon({
        id: genId(),
        code: form.code ?? "",
        type: form.type ?? "Percentage",
        value: form.value ?? 0,
        minCart: form.minCart ?? 0,
        maxUses: form.maxUses ?? 100,
        usedCount: 0,
        active: form.active ?? true,
        expiry: form.expiry ?? "",
      });
      toast.success("Coupon created!");
    }
    setShowModal(false);
  }

  return (
    <AdminPLayout
      title="Marketing & Coupons"
      subtitle="Manage promotions, discounts, and campaigns"
      actions={
        <Button
          size="sm"
          className="gap-1 bg-[#004a38] hover:bg-[#003a2c]"
          onClick={openAdd}
          data-ocid="adminp.marketing.add_coupon_button"
        >
          <Plus className="w-4 h-4" /> Add Coupon
        </Button>
      }
    >
      {/* Marketing Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          {
            label: "Active Coupons",
            value: coupons.filter((c) => c.active).length,
            icon: Tag,
            color: "bg-green-50 text-green-700",
          },
          {
            label: "Total Coupons",
            value: coupons.length,
            icon: Tag,
            color: "bg-blue-50 text-blue-700",
          },
          {
            label: "Total Usages",
            value: coupons.reduce((s, c) => s + c.usedCount, 0),
            icon: Megaphone,
            color: "bg-yellow-50 text-yellow-700",
          },
          {
            label: "Inactive",
            value: coupons.filter((c) => !c.active).length,
            icon: Tag,
            color: "bg-gray-50 text-gray-600",
          },
        ].map((card) => (
          <div
            key={card.label}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                  {card.label}
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {card.value}
                </p>
              </div>
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center ${card.color}`}
              >
                <card.icon className="w-5 h-5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Coupons Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900 text-sm">All Coupons</h2>
        </div>
        <div className="overflow-x-auto">
          <table
            className="w-full text-sm"
            data-ocid="adminp.marketing.coupons_table"
          >
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide border-b border-gray-100">
                <th className="text-left px-5 py-3 font-medium">Code</th>
                <th className="text-left px-4 py-3 font-medium hidden sm:table-cell">
                  Type
                </th>
                <th className="text-right px-4 py-3 font-medium">Value</th>
                <th className="text-right px-4 py-3 font-medium hidden md:table-cell">
                  Min Cart
                </th>
                <th className="text-center px-4 py-3 font-medium hidden lg:table-cell">
                  Used / Max
                </th>
                <th className="text-left px-4 py-3 font-medium hidden md:table-cell">
                  Expiry
                </th>
                <th className="text-center px-4 py-3 font-medium">Active</th>
                <th className="text-right px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((c, i) => (
                <tr
                  key={c.id}
                  data-ocid={`adminp.marketing.coupon.item.${i + 1}`}
                  className="border-t border-gray-50 hover:bg-gray-50/60 transition-colors"
                >
                  <td className="px-5 py-3 font-mono font-bold text-[#004a38] text-sm">
                    {c.code}
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <APTag
                      label={c.type}
                      color={
                        c.type === "Percentage"
                          ? "blue"
                          : c.type === "Flat"
                            ? "green"
                            : "yellow"
                      }
                    />
                  </td>
                  <td className="px-4 py-3 text-right font-semibold text-gray-900">
                    {c.type === "Percentage"
                      ? `${c.value}%`
                      : c.type === "Flat"
                        ? `₹${c.value}`
                        : "Free"}
                  </td>
                  <td className="px-4 py-3 text-right hidden md:table-cell text-gray-500 text-xs">
                    ₹{c.minCart}
                  </td>
                  <td className="px-4 py-3 text-center hidden lg:table-cell text-xs text-gray-500">
                    {c.usedCount} / {c.maxUses}
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell text-xs text-gray-500">
                    {c.expiry || "—"}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <Switch
                      checked={c.active}
                      onCheckedChange={(v) => updateCoupon({ ...c, active: v })}
                      data-ocid={`adminp.marketing.coupon.item.${i + 1}.active_switch`}
                    />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-7 w-7"
                        onClick={() => openEdit(c)}
                        data-ocid={`adminp.marketing.coupon.item.${i + 1}.edit_button`}
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-7 w-7 hover:bg-red-50 hover:text-red-600"
                        onClick={() => {
                          deleteCoupon(c.id);
                          toast.success("Coupon deleted");
                        }}
                        data-ocid={`adminp.marketing.coupon.item.${i + 1}.delete_button`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {coupons.length === 0 && (
                <tr>
                  <td
                    colSpan={8}
                    className="py-10 text-center text-gray-400 text-sm"
                    data-ocid="adminp.marketing.coupons.empty_state"
                  >
                    No coupons created yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent
          className="max-w-md"
          data-ocid="adminp.marketing.modal.dialog"
        >
          <DialogHeader>
            <DialogTitle>
              {editTarget ? "Edit Coupon" : "Create Coupon"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3 pt-2">
            <div className="space-y-1.5">
              <Label>Coupon Code *</Label>
              <Input
                value={form.code ?? ""}
                onChange={(e) =>
                  setForm((f) => ({ ...f, code: e.target.value.toUpperCase() }))
                }
                placeholder="SAVE10"
                data-ocid="adminp.marketing.modal.code_input"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Type</Label>
                <Select
                  value={form.type ?? "Percentage"}
                  onValueChange={(v) =>
                    setForm((f) => ({ ...f, type: v as APCoupon["type"] }))
                  }
                >
                  <SelectTrigger data-ocid="adminp.marketing.modal.type_select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Percentage">Percentage</SelectItem>
                    <SelectItem value="Flat">Flat</SelectItem>
                    <SelectItem value="Free Shipping">Free Shipping</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Value</Label>
                <Input
                  type="number"
                  min={0}
                  value={form.value ?? ""}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, value: Number(e.target.value) }))
                  }
                  data-ocid="adminp.marketing.modal.value_input"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Min Cart (₹)</Label>
                <Input
                  type="number"
                  min={0}
                  value={form.minCart ?? ""}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, minCart: Number(e.target.value) }))
                  }
                  data-ocid="adminp.marketing.modal.mincart_input"
                />
              </div>
              <div className="space-y-1.5">
                <Label>Max Uses</Label>
                <Input
                  type="number"
                  min={1}
                  value={form.maxUses ?? ""}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, maxUses: Number(e.target.value) }))
                  }
                  data-ocid="adminp.marketing.modal.maxuses_input"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Expiry Date</Label>
              <Input
                type="date"
                value={form.expiry ?? ""}
                onChange={(e) =>
                  setForm((f) => ({ ...f, expiry: e.target.value }))
                }
                data-ocid="adminp.marketing.modal.expiry_input"
              />
            </div>
            <div className="flex items-center gap-3">
              <Switch
                id="ap-coupon-active"
                checked={form.active ?? true}
                onCheckedChange={(v) => setForm((f) => ({ ...f, active: v }))}
                data-ocid="adminp.marketing.modal.active_switch"
              />
              <Label htmlFor="ap-coupon-active">Active</Label>
            </div>
            <div className="flex gap-2 pt-1">
              <Button
                className="flex-1 bg-[#004a38] hover:bg-[#003a2c]"
                onClick={handleSave}
                data-ocid="adminp.marketing.modal.submit_button"
              >
                {editTarget ? "Save Changes" : "Create Coupon"}
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowModal(false)}
                data-ocid="adminp.marketing.modal.cancel_button"
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
