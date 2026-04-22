import { r as reactExports, j as jsxRuntimeExports, a as Button, I as Input, e as ue } from "./index-CfU2kVIJ.js";
import { d as Dialog, e as DialogContent, f as DialogHeader, g as DialogTitle } from "./dialog-BmCSuf7q.js";
import { L as Label } from "./label-BjUfKOjb.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-DWPZIEKW.js";
import { S as Skeleton } from "./skeleton-Dbe_tSkr.js";
import { T as Textarea } from "./textarea-CHqS0GCX.js";
import { b as useAdminTasks, D as useCreateAdminTask, E as useUpdateAdminTask, F as useDeleteAdminTask, G as useCompleteAdminTask, A as AdminPLayout, l as APTag, H as ClipboardList } from "./AdminPLayout-CIt5RHz_.js";
import { C as CircleAlert } from "./circle-alert-ucF-SypE.js";
import { R as RefreshCw } from "./refresh-cw-CczYOB5W.js";
import { C as CircleCheck } from "./circle-check-BnQJU1pP.js";
import { C as Circle } from "./circle-BAXsdxBB.js";
import { P as Pen } from "./pen-C8l-9AD8.js";
import { T as Trash2 } from "./trash-2-CLRUW9XH.js";
import { P as Plus } from "./plus-Dgb9NiV8.js";
import "./index-l7_3JU5-.js";
import "./index-D_sIzci6.js";
import "./index-Cv8ba7Pb.js";
import "./index-Dzwq3ONP.js";
import "./check-DSd0zFnf.js";
import "./useMutation-DVPdZiQH.js";
import "./convert-Cs1e6Uux.js";
import "./leaf-BdKoN6HX.js";
import "./chevron-right-DNGmMEAY.js";
import "./package-C5tkAuNr.js";
import "./users-BTrxV2BM.js";
import "./star-D6nQNTvb.js";
const PRIORITIES = ["High", "Medium", "Low"];
function genId() {
  return `TASK-${Date.now().toString(36).toUpperCase()}`;
}
const EMPTY_TASK = {
  id: "",
  title: "",
  description: "",
  notes: "",
  category: "General",
  priority: "Medium",
  assignedTo: "",
  completed: false,
  createdAt: Date.now()
};
function AdminPTasks() {
  const { data: tasks = [], isLoading, isError, refetch } = useAdminTasks();
  const createMutation = useCreateAdminTask();
  const updateMutation = useUpdateAdminTask();
  const deleteMutation = useDeleteAdminTask();
  const completeMutation = useCompleteAdminTask();
  const [filter, setFilter] = reactExports.useState("all");
  const [showModal, setShowModal] = reactExports.useState(false);
  const [editTarget, setEditTarget] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState(EMPTY_TASK);
  const filtered = tasks.filter((t) => {
    if (filter === "pending") return !t.completed;
    if (filter === "done") return t.completed;
    return true;
  });
  function openAdd() {
    setEditTarget(null);
    setForm({ ...EMPTY_TASK, id: genId(), createdAt: Date.now() });
    setShowModal(true);
  }
  function openEdit(t) {
    setEditTarget(t);
    setForm({ ...t });
    setShowModal(true);
  }
  async function handleSave() {
    if (!form.title.trim()) {
      ue.error("Title is required");
      return;
    }
    try {
      if (editTarget) {
        await updateMutation.mutateAsync({ id: editTarget.id, task: form });
        ue.success("Task updated");
      } else {
        await createMutation.mutateAsync(form);
        ue.success("Task added");
      }
      setShowModal(false);
    } catch {
      ue.error("Failed to save task");
    }
  }
  async function handleToggle(task) {
    if (task.completed) {
      try {
        await updateMutation.mutateAsync({
          id: task.id,
          task: { ...task, completed: false }
        });
      } catch {
        ue.error("Failed to update task");
      }
    } else {
      try {
        await completeMutation.mutateAsync(task.id);
      } catch {
        ue.error("Failed to complete task");
      }
    }
  }
  async function handleDelete(id) {
    try {
      await deleteMutation.mutateAsync(id);
      ue.success("Task removed");
    } catch {
      ue.error("Failed to delete task");
    }
  }
  const priorityColor = {
    High: "red",
    Medium: "yellow",
    Low: "gray"
  };
  if (isError) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminPLayout, { title: "Tasks & Notes", subtitle: "Track team tasks", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-red-50 border border-red-200 rounded-2xl p-8 text-center",
        "data-ocid": "adminp.tasks.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-8 h-8 text-red-400 mx-auto mb-3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-red-700 font-medium", children: "Failed to load tasks" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              className: "mt-3",
              onClick: () => void refetch(),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4 mr-1" }),
                " Retry"
              ]
            }
          )
        ]
      }
    ) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    AdminPLayout,
    {
      title: "Tasks & Notes",
      subtitle: "Track team tasks, goals, and follow-ups",
      actions: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          size: "sm",
          className: "gap-1 bg-[#004a38] hover:bg-[#003a2c]",
          onClick: openAdd,
          "data-ocid": "adminp.tasks.add_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
            " Add Task"
          ]
        }
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 mb-4", "data-ocid": "adminp.tasks.filters", children: ["all", "pending", "done"].map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setFilter(f),
            "data-ocid": `adminp.tasks.filter.${f}.tab`,
            className: `px-4 py-1.5 rounded-full text-sm font-medium capitalize transition-colors ${filter === f ? "bg-[#004a38] text-white" : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300"}`,
            children: f === "all" ? `All (${tasks.length})` : f === "pending" ? `Pending (${tasks.filter((t) => !t.completed).length})` : `Done (${tasks.filter((t) => t.completed).length})`
          },
          f
        )) }),
        isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "adminp.tasks.loading_state", children: ["a", "b", "c"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 w-full rounded-2xl" }, k)) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          filtered.map((task, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              "data-ocid": `adminp.tasks.item.${i + 1}`,
              className: `bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-start gap-4 ${task.completed ? "opacity-60" : ""}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => void handleToggle(task),
                    className: "mt-0.5 text-gray-400 hover:text-green-600 transition-colors flex-shrink-0",
                    disabled: completeMutation.isPending || updateMutation.isPending,
                    "data-ocid": `adminp.tasks.item.${i + 1}.toggle`,
                    children: task.completed ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-5 h-5 text-green-500" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Circle, { className: "w-5 h-5" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap mb-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: `font-medium text-gray-900 text-sm ${task.completed ? "line-through" : ""}`,
                        children: task.title
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      APTag,
                      {
                        label: task.priority,
                        color: priorityColor[task.priority] ?? "gray"
                      }
                    )
                  ] }),
                  task.notes && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 mb-1", children: task.notes }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-xs text-gray-400", children: [
                    task.dueDate && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                      "Due: ",
                      new Date(task.dueDate).toLocaleDateString("en-IN")
                    ] }),
                    task.assignedTo && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                      "→ ",
                      task.assignedTo
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 flex-shrink-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      size: "icon",
                      variant: "ghost",
                      className: "h-7 w-7",
                      onClick: () => openEdit(task),
                      "data-ocid": `adminp.tasks.item.${i + 1}.edit_button`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "w-3.5 h-3.5" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      size: "icon",
                      variant: "ghost",
                      className: "h-7 w-7 hover:bg-red-50 hover:text-red-600",
                      onClick: () => void handleDelete(task.id),
                      "data-ocid": `adminp.tasks.item.${i + 1}.delete_button`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
                    }
                  )
                ] })
              ]
            },
            task.id
          )),
          filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "bg-white rounded-2xl border border-gray-100 p-14 text-center",
              "data-ocid": "adminp.tasks.empty_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { className: "w-10 h-10 text-gray-300 mx-auto mb-3" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 text-sm", children: filter === "all" ? "No tasks yet — add your first task to get started!" : `No ${filter} tasks` })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showModal, onOpenChange: setShowModal, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          DialogContent,
          {
            className: "max-w-md",
            "data-ocid": "adminp.tasks.modal.dialog",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: editTarget ? "Edit Task" : "Add Task" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 pt-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Title *" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      value: form.title,
                      onChange: (e) => setForm((f) => ({ ...f, title: e.target.value })),
                      placeholder: "Task title",
                      "data-ocid": "adminp.tasks.modal.title_input"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Priority" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Select,
                      {
                        value: form.priority,
                        onValueChange: (v) => setForm((f) => ({ ...f, priority: v })),
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "adminp.tasks.modal.priority_select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: PRIORITIES.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: p, children: p }, p)) })
                        ]
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Due Date" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        type: "date",
                        value: form.dueDate ? new Date(form.dueDate).toISOString().split("T")[0] : "",
                        onChange: (e) => setForm((f) => ({
                          ...f,
                          dueDate: e.target.value ? new Date(e.target.value).getTime() : void 0
                        })),
                        "data-ocid": "adminp.tasks.modal.due_date_input"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Assign To" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      value: form.assignedTo ?? "",
                      onChange: (e) => setForm((f) => ({ ...f, assignedTo: e.target.value })),
                      placeholder: "Team member name",
                      "data-ocid": "adminp.tasks.modal.assigned_input"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Notes" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Textarea,
                    {
                      rows: 2,
                      value: form.notes,
                      onChange: (e) => setForm((f) => ({ ...f, notes: e.target.value })),
                      placeholder: "Additional notes…",
                      "data-ocid": "adminp.tasks.modal.notes_input"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      className: "flex-1 bg-[#004a38] hover:bg-[#003a2c]",
                      onClick: () => void handleSave(),
                      disabled: createMutation.isPending || updateMutation.isPending,
                      "data-ocid": "adminp.tasks.modal.submit_button",
                      children: createMutation.isPending || updateMutation.isPending ? "Saving…" : editTarget ? "Save" : "Add Task"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      variant: "outline",
                      className: "flex-1",
                      onClick: () => setShowModal(false),
                      "data-ocid": "adminp.tasks.modal.cancel_button",
                      children: "Cancel"
                    }
                  )
                ] })
              ] })
            ]
          }
        ) })
      ]
    }
  );
}
export {
  AdminPTasks as default
};
