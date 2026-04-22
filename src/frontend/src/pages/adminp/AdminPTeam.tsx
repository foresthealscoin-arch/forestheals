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
import {
  AlertCircle,
  Edit2,
  Plus,
  RefreshCw,
  ShieldCheck,
  Trash2,
  Users,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  useAddTeamMember,
  useAdminTeam,
  useDeleteTeamMember,
  useUpdateTeamMember,
} from "../../hooks/useAdminData";
import type { TeamMemberView } from "../../services/teamService";
import { APTag, AdminPLayout } from "./AdminPLayout";

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

const EMPTY_MEMBER: TeamMemberView = {
  id: "",
  name: "",
  email: "",
  role: "Staff",
  active: true,
  permissions: [],
  createdAt: Date.now(),
};

export default function AdminPTeam() {
  const { data: team = [], isLoading, isError, refetch } = useAdminTeam();
  const addMutation = useAddTeamMember();
  const updateMutation = useUpdateTeamMember();
  const deleteMutation = useDeleteTeamMember();

  const [showModal, setShowModal] = useState(false);
  const [editTarget, setEditTarget] = useState<TeamMemberView | null>(null);
  const [form, setForm] = useState<TeamMemberView>(EMPTY_MEMBER);

  function openAdd() {
    setEditTarget(null);
    setForm({ ...EMPTY_MEMBER, id: genId(), createdAt: Date.now() });
    setShowModal(true);
  }

  function openEdit(m: TeamMemberView) {
    setEditTarget(m);
    setForm({ ...m });
    setShowModal(true);
  }

  async function handleSave() {
    if (!form.name.trim() || !form.email.trim()) {
      toast.error("Name and email required");
      return;
    }
    try {
      if (editTarget) {
        await updateMutation.mutateAsync({ id: editTarget.id, member: form });
        toast.success("Team member updated");
      } else {
        await addMutation.mutateAsync(form);
        toast.success("Team member added");
      }
      setShowModal(false);
    } catch {
      toast.error("Failed to save team member");
    }
  }

  async function handleDelete(id: string) {
    try {
      await deleteMutation.mutateAsync(id);
      toast.success("Member removed");
    } catch {
      toast.error("Failed to remove member");
    }
  }

  const roleColor: Record<string, "green" | "blue" | "yellow" | "gray"> = {
    "Super Admin": "green",
    Admin: "blue",
    Manager: "blue",
    Staff: "gray",
    "Customer Support": "yellow",
  };

  if (isError) {
    return (
      <AdminPLayout title="Team Management" subtitle="Manage team members">
        <div
          className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center"
          data-ocid="adminp.team.error_state"
        >
          <AlertCircle className="w-8 h-8 text-red-400 mx-auto mb-3" />
          <p className="text-red-700 font-medium">
            Failed to load team members
          </p>
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
      {isLoading ? (
        <div className="space-y-2" data-ocid="adminp.team.loading_state">
          {["a", "b", "c"].map((k) => (
            <Skeleton key={k} className="h-14 w-full rounded-xl" />
          ))}
        </div>
      ) : (
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
                      <APTag
                        label={m.role}
                        color={roleColor[m.role] ?? "gray"}
                      />
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <APTag
                        label={m.active ? "Active" : "Inactive"}
                        color={m.active ? "green" : "gray"}
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
                          onClick={() => void handleDelete(m.id)}
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
                      colSpan={5}
                      className="py-12 text-center"
                      data-ocid="adminp.team.empty_state"
                    >
                      <Users className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                      <p className="text-gray-400 text-sm">
                        No team members — add your first team member
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

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
                value={form.name}
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
                value={form.email}
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
                  value={form.role}
                  onValueChange={(v) => setForm((f) => ({ ...f, role: v }))}
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
                  value={form.active ? "active" : "inactive"}
                  onValueChange={(v) =>
                    setForm((f) => ({ ...f, active: v === "active" }))
                  }
                >
                  <SelectTrigger data-ocid="adminp.team.modal.status_select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex gap-2 pt-1">
              <Button
                className="flex-1 bg-[#004a38] hover:bg-[#003a2c]"
                onClick={() => void handleSave()}
                disabled={addMutation.isPending || updateMutation.isPending}
                data-ocid="adminp.team.modal.submit_button"
              >
                {addMutation.isPending || updateMutation.isPending
                  ? "Saving…"
                  : editTarget
                    ? "Save"
                    : "Add Member"}
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
