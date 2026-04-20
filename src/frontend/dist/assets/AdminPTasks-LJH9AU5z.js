import { J as useAdminPStore, r as reactExports, j as jsxRuntimeExports, a as Button, d as ue, I as Input } from "./index-xECe6EUo.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-DPHwvUjv.js";
import { L as Label } from "./label-DZAdsEyI.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-DaHBgVQv.js";
import { T as Textarea } from "./textarea-CK7joB3G.js";
import { A as AdminPLayout, b as APTag, c as ClipboardList } from "./AdminPLayout-EBT4KI9z.js";
import { C as CircleCheck } from "./circle-check-CLiuopvM.js";
import { C as Circle } from "./circle-6CSgoKwD.js";
import { P as Pen } from "./pen-C7HAvO3K.js";
import { T as Trash2 } from "./trash-2-DsjLmEQc.js";
import { P as Plus } from "./plus-CFLFiz8F.js";
import "./index-DUJPy3Kv.js";
import "./index-0zvCmYe-.js";
import "./index-Cwm_j1X6.js";
import "./index-BoTkzGeY.js";
import "./index-CG--HOM0.js";
import "./index-LegUYvjF.js";
import "./index-D807wfm0.js";
import "./check-O-YLQuAd.js";
import "./leaf-B3M59DIX.js";
import "./chevron-right-CASq3b8_.js";
import "./package-408It_ce.js";
import "./shopping-cart-Cu8657pd.js";
import "./users-D91Ah-hd.js";
import "./star-3Mia4EiO.js";
function genId() {
  return `TASK-${Date.now().toString(36).toUpperCase()}`;
}
const PRIORITIES = ["High", "Medium", "Low"];
function AdminPTasks() {
  const tasks = useAdminPStore((s) => s.tasks);
  const addTask = useAdminPStore((s) => s.addTask);
  const updateTask = useAdminPStore((s) => s.updateTask);
  const deleteTask = useAdminPStore((s) => s.deleteTask);
  const [filter, setFilter] = reactExports.useState("all");
  const [showModal, setShowModal] = reactExports.useState(false);
  const [editTarget, setEditTarget] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState({});
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
      createdAt: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
    });
    setShowModal(true);
  }
  function openEdit(t) {
    setEditTarget(t);
    setForm({ ...t });
    setShowModal(true);
  }
  function handleSave() {
    var _a;
    if (!((_a = form.title) == null ? void 0 : _a.trim())) {
      ue.error("Title is required");
      return;
    }
    if (editTarget) {
      updateTask({ ...editTarget, ...form });
      ue.success("Task updated");
    } else {
      addTask({
        id: genId(),
        title: form.title ?? "",
        priority: form.priority ?? "Medium",
        dueDate: form.dueDate ?? "",
        assignedTo: form.assignedTo ?? "",
        completed: false,
        notes: form.notes ?? "",
        createdAt: form.createdAt ?? ""
      });
      ue.success("Task added");
    }
    setShowModal(false);
  }
  const priorityColor = {
    High: "red",
    Medium: "yellow",
    Low: "gray"
  };
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
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
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
                    onClick: () => updateTask({ ...task, completed: !task.completed }),
                    className: "mt-0.5 text-gray-400 hover:text-green-600 transition-colors flex-shrink-0",
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
                        color: priorityColor[task.priority]
                      }
                    )
                  ] }),
                  task.notes && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 mb-1", children: task.notes }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-xs text-gray-400", children: [
                    task.dueDate && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                      "Due: ",
                      task.dueDate
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
                      onClick: () => {
                        deleteTask(task.id);
                        ue.success("Task removed");
                      },
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
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 text-sm", children: "No tasks here" })
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
                      value: form.title ?? "",
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
                        value: form.priority ?? "Medium",
                        onValueChange: (v) => setForm((f) => ({
                          ...f,
                          priority: v
                        })),
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
                        value: form.dueDate ?? "",
                        onChange: (e) => setForm((f) => ({ ...f, dueDate: e.target.value })),
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
                      value: form.notes ?? "",
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
                      onClick: handleSave,
                      "data-ocid": "adminp.tasks.modal.submit_button",
                      children: editTarget ? "Save" : "Add Task"
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
