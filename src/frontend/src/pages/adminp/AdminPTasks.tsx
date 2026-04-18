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
import {
  CheckCircle2,
  Circle,
  ClipboardList,
  Edit2,
  Plus,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { APTag, AdminPLayout } from "./AdminPLayout";
import type { APTask } from "./adminpStore";
import { useAdminPStore } from "./adminpStore";

function genId() {
  return `TASK-${Date.now().toString(36).toUpperCase()}`;
}

const PRIORITIES = ["High", "Medium", "Low"] as const;

export default function AdminPTasks() {
  const tasks = useAdminPStore((s) => s.tasks);
  const addTask = useAdminPStore((s) => s.addTask);
  const updateTask = useAdminPStore((s) => s.updateTask);
  const deleteTask = useAdminPStore((s) => s.deleteTask);

  const [filter, setFilter] = useState<"all" | "pending" | "done">("all");
  const [showModal, setShowModal] = useState(false);
  const [editTarget, setEditTarget] = useState<APTask | null>(null);
  const [form, setForm] = useState<Partial<APTask>>({});

  const filtered = tasks.filter((t) => {
    if (filter === "pending") return !t.completed;
    if (filter === "done") return t.completed;
    return true;
  });

  function openAdd() {
    setEditTarget(null);
    setForm({
      priority: "Medium",
      completed: false,
      createdAt: new Date().toISOString().split("T")[0],
    });
    setShowModal(true);
  }

  function openEdit(t: APTask) {
    setEditTarget(t);
    setForm({ ...t });
    setShowModal(true);
  }

  function handleSave() {
    if (!form.title?.trim()) {
      toast.error("Title is required");
      return;
    }
    if (editTarget) {
      updateTask({ ...editTarget, ...form } as APTask);
      toast.success("Task updated");
    } else {
      addTask({
        id: genId(),
        title: form.title ?? "",
        priority: form.priority ?? "Medium",
        dueDate: form.dueDate ?? "",
        assignedTo: form.assignedTo ?? "",
        completed: false,
        notes: form.notes ?? "",
        createdAt: form.createdAt ?? "",
      });
      toast.success("Task added");
    }
    setShowModal(false);
  }

  const priorityColor: Record<string, "red" | "yellow" | "gray"> = {
    High: "red",
    Medium: "yellow",
    Low: "gray",
  };

  return (
    <AdminPLayout
      title="Tasks & Notes"
      subtitle="Track team tasks, goals, and follow-ups"
      actions={
        <Button
          size="sm"
          className="gap-1 bg-[#004a38] hover:bg-[#003a2c]"
          onClick={openAdd}
          data-ocid="adminp.tasks.add_button"
        >
          <Plus className="w-4 h-4" /> Add Task
        </Button>
      }
    >
      {/* Filter tabs */}
      <div className="flex gap-2 mb-4" data-ocid="adminp.tasks.filters">
        {(["all", "pending", "done"] as const).map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            data-ocid={`adminp.tasks.filter.${f}.tab`}
            className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize transition-colors ${filter === f ? "bg-[#004a38] text-white" : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300"}`}
          >
            {f === "all"
              ? `All (${tasks.length})`
              : f === "pending"
                ? `Pending (${tasks.filter((t) => !t.completed).length})`
                : `Done (${tasks.filter((t) => t.completed).length})`}
          </button>
        ))}
      </div>

      {/* Task List */}
      <div className="space-y-3">
        {filtered.map((task, i) => (
          <div
            key={task.id}
            data-ocid={`adminp.tasks.item.${i + 1}`}
            className={`bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-start gap-4 ${task.completed ? "opacity-60" : ""}`}
          >
            <button
              type="button"
              onClick={() =>
                updateTask({ ...task, completed: !task.completed })
              }
              className="mt-0.5 text-gray-400 hover:text-green-600 transition-colors flex-shrink-0"
              data-ocid={`adminp.tasks.item.${i + 1}.toggle`}
            >
              {task.completed ? (
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              ) : (
                <Circle className="w-5 h-5" />
              )}
            </button>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <p
                  className={`font-medium text-gray-900 text-sm ${task.completed ? "line-through" : ""}`}
                >
                  {task.title}
                </p>
                <APTag
                  label={task.priority}
                  color={priorityColor[task.priority]}
                />
              </div>
              {task.notes && (
                <p className="text-xs text-gray-500 mb-1">{task.notes}</p>
              )}
              <div className="flex items-center gap-3 text-xs text-gray-400">
                {task.dueDate && <span>Due: {task.dueDate}</span>}
                {task.assignedTo && <span>→ {task.assignedTo}</span>}
              </div>
            </div>
            <div className="flex items-center gap-1 flex-shrink-0">
              <Button
                size="icon"
                variant="ghost"
                className="h-7 w-7"
                onClick={() => openEdit(task)}
                data-ocid={`adminp.tasks.item.${i + 1}.edit_button`}
              >
                <Edit2 className="w-3.5 h-3.5" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="h-7 w-7 hover:bg-red-50 hover:text-red-600"
                onClick={() => {
                  deleteTask(task.id);
                  toast.success("Task removed");
                }}
                data-ocid={`adminp.tasks.item.${i + 1}.delete_button`}
              >
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div
            className="bg-white rounded-2xl border border-gray-100 p-14 text-center"
            data-ocid="adminp.tasks.empty_state"
          >
            <ClipboardList className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">No tasks here</p>
          </div>
        )}
      </div>

      {/* Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent
          className="max-w-md"
          data-ocid="adminp.tasks.modal.dialog"
        >
          <DialogHeader>
            <DialogTitle>{editTarget ? "Edit Task" : "Add Task"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 pt-2">
            <div className="space-y-1.5">
              <Label>Title *</Label>
              <Input
                value={form.title ?? ""}
                onChange={(e) =>
                  setForm((f) => ({ ...f, title: e.target.value }))
                }
                placeholder="Task title"
                data-ocid="adminp.tasks.modal.title_input"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Priority</Label>
                <Select
                  value={form.priority ?? "Medium"}
                  onValueChange={(v) =>
                    setForm((f) => ({
                      ...f,
                      priority: v as APTask["priority"],
                    }))
                  }
                >
                  <SelectTrigger data-ocid="adminp.tasks.modal.priority_select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {PRIORITIES.map((p) => (
                      <SelectItem key={p} value={p}>
                        {p}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Due Date</Label>
                <Input
                  type="date"
                  value={form.dueDate ?? ""}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, dueDate: e.target.value }))
                  }
                  data-ocid="adminp.tasks.modal.due_date_input"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Assign To</Label>
              <Input
                value={form.assignedTo ?? ""}
                onChange={(e) =>
                  setForm((f) => ({ ...f, assignedTo: e.target.value }))
                }
                placeholder="Team member name"
                data-ocid="adminp.tasks.modal.assigned_input"
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
                placeholder="Additional notes…"
                data-ocid="adminp.tasks.modal.notes_input"
              />
            </div>
            <div className="flex gap-2 pt-1">
              <Button
                className="flex-1 bg-[#004a38] hover:bg-[#003a2c]"
                onClick={handleSave}
                data-ocid="adminp.tasks.modal.submit_button"
              >
                {editTarget ? "Save" : "Add Task"}
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowModal(false)}
                data-ocid="adminp.tasks.modal.cancel_button"
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
