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
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import {
  AlertCircle,
  Edit2,
  Megaphone,
  Plus,
  RefreshCw,
  Tag,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  useAdminCoupons,
  useCreateAdminCoupon,
  useDeleteAdminCoupon,
  useToggleCouponActive,
  useUpdateAdminCoupon,
} from "../../hooks/useAdminData";
import type { AdminCouponView } from "../../services/couponService";
import { APTag, AdminPLayout } from "./AdminPLayout";

const DISCOUNT_TYPES = ["percentage", "flat", "free_shipping"] as const;
const DISCOUNT_TYPE_LABELS: Record<string, string> = {
  percentage: "Percentage",
  flat: "Flat",
  free_shipping: "Free Shipping",
};

function genId() {
  return `CPN-${Date.now().toString(36).toUpperCase()}`;
}

const EMPTY_COUPON: AdminCouponView = {
  id: "",
  code: "",
  discountType: "percentage",
  discountValue: 10,
  minCartValue: 0,
  maxUses: 100,
  usedCount: 0,
  active: true,
  description: "",
  createdAt: Date.now(),
};

export default function AdminPMarketing() {
  const { data: coupons = [], isLoading, isError, refetch } = useAdminCoupons();
  const createMutation = useCreateAdminCoupon();
  const updateMutation = useUpdateAdminCoupon();
  const deleteMutation = useDeleteAdminCoupon();
  const toggleMutation = useToggleCouponActive();

  const [showModal, setShowModal] = useState(false);
  const [editTarget, setEditTarget] = useState<AdminCouponView | null>(null);
  const [form, setForm] = useState<AdminCouponView>(EMPTY_COUPON);

  function openAdd() {
    setEditTarget(null);
    setForm({ ...EMPTY_COUPON, id: genId() });
    setShowModal(true);
  }

  function openEdit(c: AdminCouponView) {
    setEditTarget(c);
    setForm({ ...c });
    setShowModal(true);
  }

  async function handleSave() {
    if (!form.code.trim()) {
      toast.error("Coupon code required");
      return;
    }
    try {
      if (editTarget) {
        await updateMutation.mutateAsync({ id: editTarget.id, coupon: form });
        toast.success("Coupon updated");
      } else {
        await createMutation.mutateAsync(form);
        toast.success("Coupon created!");
      }
      setShowModal(false);
    } catch {
      toast.error("Failed to save coupon");
    }
  }

  async function handleDelete(id: string) {
    try {
      await deleteMutation.mutateAsync(id);
      toast.success("Coupon deleted");
    } catch {
      toast.error("Failed to delete coupon");
    }
  }

  async function handleToggle(id: string) {
    try {
      await toggleMutation.mutateAsync(id);
    } catch {
      toast.error("Failed to toggle coupon");
    }
  }

  if (isError) {
    return (
      <AdminPLayout
        title="Marketing & Coupons"
        subtitle="Manage promotions and discounts"
      >
        <div
          className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center"
          data-ocid="adminp.marketing.error_state"
        >
          <AlertCircle className="w-8 h-8 text-red-400 mx-auto mb-3" />
          <p className="text-red-700 font-medium">Failed to load coupons</p>
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
      {/* Overview Cards */}
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
        {isLoading ? (
          <div className="p-4 space-y-2">
            {["a", "b", "c"].map((k) => (
              <Skeleton key={k} className="h-12 w-full rounded" />
            ))}
          </div>
        ) : (
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
                        label={
                          DISCOUNT_TYPE_LABELS[c.discountType] ?? c.discountType
                        }
                        color="blue"
                      />
                    </td>
                    <td className="px-4 py-3 text-right font-semibold text-gray-900">
                      {c.discountType === "percentage"
                        ? `${c.discountValue}%`
                        : c.discountType === "flat"
                          ? `₹${c.discountValue}`
                          : "Free"}
                    </td>
                    <td className="px-4 py-3 text-right hidden md:table-cell text-gray-500 text-xs">
                      ₹{c.minCartValue}
                    </td>
                    <td className="px-4 py-3 text-center hidden lg:table-cell text-xs text-gray-500">
                      {c.usedCount} / {c.maxUses}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Switch
                        checked={c.active}
                        onCheckedChange={() => void handleToggle(c.id)}
                        disabled={toggleMutation.isPending}
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
                          onClick={() => void handleDelete(c.id)}
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
                      colSpan={7}
                      className="py-10 text-center text-gray-400 text-sm"
                      data-ocid="adminp.marketing.coupons.empty_state"
                    >
                      No coupons created yet. Create your first coupon to start
                      promoting!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
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
                value={form.code}
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
                  value={form.discountType}
                  onValueChange={(v) =>
                    setForm((f) => ({ ...f, discountType: v }))
                  }
                >
                  <SelectTrigger data-ocid="adminp.marketing.modal.type_select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {DISCOUNT_TYPES.map((t) => (
                      <SelectItem key={t} value={t}>
                        {DISCOUNT_TYPE_LABELS[t]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Value</Label>
                <Input
                  type="number"
                  min={0}
                  value={form.discountValue || ""}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      discountValue: Number(e.target.value),
                    }))
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
                  value={form.minCartValue || ""}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      minCartValue: Number(e.target.value),
                    }))
                  }
                  data-ocid="adminp.marketing.modal.mincart_input"
                />
              </div>
              <div className="space-y-1.5">
                <Label>Max Uses</Label>
                <Input
                  type="number"
                  min={1}
                  value={form.maxUses || ""}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, maxUses: Number(e.target.value) }))
                  }
                  data-ocid="adminp.marketing.modal.maxuses_input"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Description</Label>
              <Input
                value={form.description}
                onChange={(e) =>
                  setForm((f) => ({ ...f, description: e.target.value }))
                }
                placeholder="Describe this coupon…"
              />
            </div>
            <div className="flex items-center gap-3">
              <Switch
                id="ap-coupon-active"
                checked={form.active}
                onCheckedChange={(v) => setForm((f) => ({ ...f, active: v }))}
                data-ocid="adminp.marketing.modal.active_switch"
              />
              <Label htmlFor="ap-coupon-active">Active</Label>
            </div>
            <div className="flex gap-2 pt-1">
              <Button
                className="flex-1 bg-[#004a38] hover:bg-[#003a2c]"
                onClick={() => void handleSave()}
                disabled={createMutation.isPending || updateMutation.isPending}
                data-ocid="adminp.marketing.modal.submit_button"
              >
                {createMutation.isPending || updateMutation.isPending
                  ? "Saving…"
                  : editTarget
                    ? "Save Changes"
                    : "Create Coupon"}
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
