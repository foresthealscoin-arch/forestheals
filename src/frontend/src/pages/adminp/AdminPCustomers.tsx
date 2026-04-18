import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Edit2, Plus, Search, Trash2, User, Users } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { APTag, AdminPLayout } from "./AdminPLayout";
import type { APCustomer } from "./adminpStore";
import { useAdminPStore } from "./adminpStore";

function genId() {
  return `CUST-${Date.now().toString(36).toUpperCase()}`;
}

export default function AdminPCustomers() {
  const customers = useAdminPStore((s) => s.customers);
  const addCustomer = useAdminPStore((s) => s.addCustomer);
  const updateCustomer = useAdminPStore((s) => s.updateCustomer);
  const deleteCustomer = useAdminPStore((s) => s.deleteCustomer);

  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editTarget, setEditTarget] = useState<APCustomer | null>(null);
  const [form, setForm] = useState<Partial<APCustomer>>({});

  const filtered = customers.filter(
    (c) =>
      !search ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()),
  );

  function openAdd() {
    setEditTarget(null);
    setForm({ status: "Active", tags: [], notes: "" });
    setShowModal(true);
  }

  function openEdit(c: APCustomer) {
    setEditTarget(c);
    setForm({ ...c });
    setShowModal(true);
  }

  function handleSave() {
    if (!form.name?.trim() || !form.email?.trim()) {
      toast.error("Name and email are required");
      return;
    }
    if (editTarget) {
      updateCustomer({ ...editTarget, ...form } as APCustomer);
      toast.success("Customer updated");
    } else {
      addCustomer({
        id: genId(),
        name: form.name ?? "",
        email: form.email ?? "",
        phone: form.phone ?? "",
        address: form.address ?? "",
        totalSpend: 0,
        orderCount: 0,
        lastOrder: "—",
        status: form.status ?? "Active",
        tags: form.tags ?? [],
        notes: form.notes ?? "",
        joinedAt: new Date().toISOString().split("T")[0],
      });
      toast.success("Customer added");
    }
    setShowModal(false);
  }

  const statusColor: Record<string, string> = {
    Active: "green",
    VIP: "yellow",
    Blocked: "red",
  };

  return (
    <AdminPLayout
      title="Customers"
      subtitle={`${customers.length} registered customers`}
      actions={
        <Button
          size="sm"
          className="gap-1 bg-[#004a38] hover:bg-[#003a2c]"
          onClick={openAdd}
          data-ocid="adminp.customers.add_button"
        >
          <Plus className="w-4 h-4" /> Add Customer
        </Button>
      }
    >
      <div className="relative max-w-sm mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          placeholder="Search customers…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
          data-ocid="adminp.customers.search_input"
        />
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm" data-ocid="adminp.customers.table">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide border-b border-gray-100">
                <th className="text-left px-5 py-3 font-medium">Customer</th>
                <th className="text-left px-4 py-3 font-medium hidden md:table-cell">
                  Contact
                </th>
                <th className="text-right px-4 py-3 font-medium hidden sm:table-cell">
                  Total Spend
                </th>
                <th className="text-center px-4 py-3 font-medium hidden lg:table-cell">
                  Orders
                </th>
                <th className="text-left px-4 py-3 font-medium">Status</th>
                <th className="text-right px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c, i) => (
                <tr
                  key={c.id}
                  data-ocid={`adminp.customers.item.${i + 1}`}
                  className="border-t border-gray-50 hover:bg-gray-50/60 transition-colors"
                >
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 text-green-700" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-gray-900 text-sm truncate">
                          {c.name}
                        </p>
                        <p className="text-xs text-gray-400">{c.joinedAt}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <p className="text-xs text-gray-700">{c.email}</p>
                    <p className="text-xs text-gray-400">{c.phone}</p>
                  </td>
                  <td className="px-4 py-3 text-right hidden sm:table-cell font-semibold text-[#004a38] text-sm">
                    ₹{c.totalSpend.toLocaleString("en-IN")}
                  </td>
                  <td className="px-4 py-3 text-center hidden lg:table-cell text-gray-700 text-sm">
                    {c.orderCount}
                  </td>
                  <td className="px-4 py-3">
                    <APTag
                      label={c.status}
                      color={
                        (statusColor[c.status] as "green" | "yellow" | "red") ??
                        "gray"
                      }
                    />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-7 w-7"
                        onClick={() => openEdit(c)}
                        data-ocid={`adminp.customers.item.${i + 1}.edit_button`}
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-7 w-7 hover:bg-red-50 hover:text-red-600"
                        onClick={() => {
                          deleteCustomer(c.id);
                          toast.success("Customer removed");
                        }}
                        data-ocid={`adminp.customers.item.${i + 1}.delete_button`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="py-12 text-center"
                    data-ocid="adminp.customers.empty_state"
                  >
                    <Users className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                    <p className="text-gray-400 text-sm">No customers found</p>
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
          data-ocid="adminp.customers.modal.dialog"
        >
          <DialogHeader>
            <DialogTitle>
              {editTarget ? "Edit Customer" : "Add Customer"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3 pt-2">
            <div className="space-y-1.5">
              <Label>Full Name *</Label>
              <Input
                value={form.name ?? ""}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
                placeholder="Priya Sharma"
                data-ocid="adminp.customers.modal.name_input"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Email *</Label>
              <Input
                type="email"
                value={form.email ?? ""}
                onChange={(e) =>
                  setForm((f) => ({ ...f, email: e.target.value }))
                }
                placeholder="priya@example.com"
                data-ocid="adminp.customers.modal.email_input"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Phone</Label>
              <Input
                value={form.phone ?? ""}
                onChange={(e) =>
                  setForm((f) => ({ ...f, phone: e.target.value }))
                }
                placeholder="9876543210"
                data-ocid="adminp.customers.modal.phone_input"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Address</Label>
              <Textarea
                rows={2}
                value={form.address ?? ""}
                onChange={(e) =>
                  setForm((f) => ({ ...f, address: e.target.value }))
                }
                placeholder="Full address"
                data-ocid="adminp.customers.modal.address_input"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Notes</Label>
              <Textarea
                rows={2}
                value={form.notes ?? ""}
                onChange={(e) =>
                  setForm((f) => ({ ...f, notes: e.target.value }))
                }
                placeholder="Internal notes…"
                data-ocid="adminp.customers.modal.notes_input"
              />
            </div>
            <div className="flex gap-2 pt-1">
              <Button
                className="flex-1 bg-[#004a38] hover:bg-[#003a2c]"
                onClick={handleSave}
                data-ocid="adminp.customers.modal.submit_button"
              >
                {editTarget ? "Save Changes" : "Add Customer"}
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowModal(false)}
                data-ocid="adminp.customers.modal.cancel_button"
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
