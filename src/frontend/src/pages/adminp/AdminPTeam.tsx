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
import { Textarea } from "@/components/ui/textarea";
import { Edit2, Plus, ShieldCheck, Trash2, Users } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { APTag, AdminPLayout } from "./AdminPLayout";
import type { APTeamMember } from "./adminpStore";
import { useAdminPStore } from "./adminpStore";

const ROLES = [
  "Super Admin",
  "Admin",
  "Manager",
  "Staff",
  "Customer Support",
] as const;

function genId() {
  return `TM-${Date.now().toString(36).toUpperCase()}`;
}

export default function AdminPTeam() {
  const team = useAdminPStore((s) => s.team);
  const addTeamMember = useAdminPStore((s) => s.addTeamMember);
  const updateTeamMember = useAdminPStore((s) => s.updateTeamMember);
  const deleteTeamMember = useAdminPStore((s) => s.deleteTeamMember);

  const [showModal, setShowModal] = useState(false);
  const [editTarget, setEditTarget] = useState<APTeamMember | null>(null);
  const [form, setForm] = useState<Partial<APTeamMember>>({});

  function openAdd() {
    setEditTarget(null);
    setForm({
      role: "Staff",
      status: "Active",
      joinedAt: new Date().toISOString().split("T")[0],
      lastLogin: "Never",
    });
    setShowModal(true);
  }

  function openEdit(m: APTeamMember) {
    setEditTarget(m);
    setForm({ ...m });
    setShowModal(true);
  }

  function handleSave() {
    if (!form.name?.trim() || !form.email?.trim()) {
      toast.error("Name and email required");
      return;
    }
    if (editTarget) {
      updateTeamMember({ ...editTarget, ...form } as APTeamMember);
      toast.success("Team member updated");
    } else {
      addTeamMember({
        id: genId(),
        name: form.name ?? "",
        email: form.email ?? "",
        role: form.role ?? "Staff",
        status: form.status ?? "Active",
        joinedAt: form.joinedAt ?? "",
        lastLogin: "Never",
      });
      toast.success("Team member added");
    }
    setShowModal(false);
  }

  const roleColor: Record<string, "green" | "blue" | "yellow" | "gray"> = {
    "Super Admin": "green",
    Admin: "blue",
    Manager: "blue",
    Staff: "gray",
    "Customer Support": "yellow",
  };

  return (
    <AdminPLayout
      title="Team Management"
      subtitle="Manage team members, roles, and permissions"
      actions={
        <Button
          size="sm"
          className="gap-1 bg-[#004a38] hover:bg-[#003a2c]"
          onClick={openAdd}
          data-ocid="adminp.team.add_button"
        >
          <Plus className="w-4 h-4" /> Add Member
        </Button>
      }
    >
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm" data-ocid="adminp.team.table">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide border-b border-gray-100">
                <th className="text-left px-5 py-3 font-medium">Member</th>
                <th className="text-left px-4 py-3 font-medium hidden md:table-cell">
                  Email
                </th>
                <th className="text-left px-4 py-3 font-medium">Role</th>
                <th className="text-left px-4 py-3 font-medium hidden lg:table-cell">
                  Joined
                </th>
                <th className="text-left px-4 py-3 font-medium hidden xl:table-cell">
                  Last Login
                </th>
                <th className="text-left px-4 py-3 font-medium hidden sm:table-cell">
                  Status
                </th>
                <th className="text-right px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {team.map((m, i) => (
                <tr
                  key={m.id}
                  data-ocid={`adminp.team.item.${i + 1}`}
                  className="border-t border-gray-50 hover:bg-gray-50/60 transition-colors"
                >
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <ShieldCheck className="w-4 h-4 text-green-700" />
                      </div>
                      <span className="font-medium text-gray-900 text-sm">
                        {m.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell text-gray-500 text-xs">
                    {m.email}
                  </td>
                  <td className="px-4 py-3">
                    <APTag label={m.role} color={roleColor[m.role] ?? "gray"} />
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell text-gray-500 text-xs">
                    {m.joinedAt}
                  </td>
                  <td className="px-4 py-3 hidden xl:table-cell text-gray-500 text-xs">
                    {m.lastLogin}
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <APTag
                      label={m.status}
                      color={m.status === "Active" ? "green" : "gray"}
                    />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-7 w-7"
                        onClick={() => openEdit(m)}
                        data-ocid={`adminp.team.item.${i + 1}.edit_button`}
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-7 w-7 hover:bg-red-50 hover:text-red-600"
                        onClick={() => {
                          deleteTeamMember(m.id);
                          toast.success("Member removed");
                        }}
                        data-ocid={`adminp.team.item.${i + 1}.delete_button`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {team.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="py-12 text-center"
                    data-ocid="adminp.team.empty_state"
                  >
                    <Users className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                    <p className="text-gray-400 text-sm">No team members</p>
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
          data-ocid="adminp.team.modal.dialog"
        >
          <DialogHeader>
            <DialogTitle>
              {editTarget ? "Edit Member" : "Add Team Member"}
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
                placeholder="Arjun Patel"
                data-ocid="adminp.team.modal.name_input"
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
                placeholder="arjun@forestheals.in"
                data-ocid="adminp.team.modal.email_input"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Role</Label>
                <Select
                  value={form.role ?? "Staff"}
                  onValueChange={(v) =>
                    setForm((f) => ({ ...f, role: v as APTeamMember["role"] }))
                  }
                >
                  <SelectTrigger data-ocid="adminp.team.modal.role_select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ROLES.map((r) => (
                      <SelectItem key={r} value={r}>
                        {r}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Status</Label>
                <Select
                  value={form.status ?? "Active"}
                  onValueChange={(v) =>
                    setForm((f) => ({
                      ...f,
                      status: v as APTeamMember["status"],
                    }))
                  }
                >
                  <SelectTrigger data-ocid="adminp.team.modal.status_select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex gap-2 pt-1">
              <Button
                className="flex-1 bg-[#004a38] hover:bg-[#003a2c]"
                onClick={handleSave}
                data-ocid="adminp.team.modal.submit_button"
              >
                {editTarget ? "Save" : "Add Member"}
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowModal(false)}
                data-ocid="adminp.team.modal.cancel_button"
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
