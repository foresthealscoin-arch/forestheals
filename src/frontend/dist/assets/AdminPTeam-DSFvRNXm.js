import { r as reactExports, j as jsxRuntimeExports, a as Button, I as Input, e as ue } from "./index-CfU2kVIJ.js";
import { d as Dialog, e as DialogContent, f as DialogHeader, g as DialogTitle } from "./dialog-BmCSuf7q.js";
import { L as Label } from "./label-BjUfKOjb.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-DWPZIEKW.js";
import { S as Skeleton } from "./skeleton-Dbe_tSkr.js";
import { x as useAdminTeam, y as useAddTeamMember, z as useUpdateTeamMember, B as useDeleteTeamMember, A as AdminPLayout, l as APTag } from "./AdminPLayout-CIt5RHz_.js";
import { C as CircleAlert } from "./circle-alert-ucF-SypE.js";
import { R as RefreshCw } from "./refresh-cw-CczYOB5W.js";
import { S as ShieldCheck } from "./shield-check-Bo58OvYG.js";
import { P as Pen } from "./pen-C8l-9AD8.js";
import { T as Trash2 } from "./trash-2-CLRUW9XH.js";
import { U as Users } from "./users-BTrxV2BM.js";
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
import "./star-D6nQNTvb.js";
const ROLES = [
  "Super Admin",
  "Admin",
  "Manager",
  "Staff",
  "Customer Support"
];
function genId() {
  return `TM-${Date.now().toString(36).toUpperCase()}`;
}
const EMPTY_MEMBER = {
  id: "",
  name: "",
  email: "",
  role: "Staff",
  active: true,
  permissions: [],
  createdAt: Date.now()
};
function AdminPTeam() {
  const { data: team = [], isLoading, isError, refetch } = useAdminTeam();
  const addMutation = useAddTeamMember();
  const updateMutation = useUpdateTeamMember();
  const deleteMutation = useDeleteTeamMember();
  const [showModal, setShowModal] = reactExports.useState(false);
  const [editTarget, setEditTarget] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState(EMPTY_MEMBER);
  function openAdd() {
    setEditTarget(null);
    setForm({ ...EMPTY_MEMBER, id: genId(), createdAt: Date.now() });
    setShowModal(true);
  }
  function openEdit(m) {
    setEditTarget(m);
    setForm({ ...m });
    setShowModal(true);
  }
  async function handleSave() {
    if (!form.name.trim() || !form.email.trim()) {
      ue.error("Name and email required");
      return;
    }
    try {
      if (editTarget) {
        await updateMutation.mutateAsync({ id: editTarget.id, member: form });
        ue.success("Team member updated");
      } else {
        await addMutation.mutateAsync(form);
        ue.success("Team member added");
      }
      setShowModal(false);
    } catch {
      ue.error("Failed to save team member");
    }
  }
  async function handleDelete(id) {
    try {
      await deleteMutation.mutateAsync(id);
      ue.success("Member removed");
    } catch {
      ue.error("Failed to remove member");
    }
  }
  const roleColor = {
    "Super Admin": "green",
    Admin: "blue",
    Manager: "blue",
    Staff: "gray",
    "Customer Support": "yellow"
  };
  if (isError) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminPLayout, { title: "Team Management", subtitle: "Manage team members", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-red-50 border border-red-200 rounded-2xl p-8 text-center",
        "data-ocid": "adminp.team.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-8 h-8 text-red-400 mx-auto mb-3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-red-700 font-medium", children: "Failed to load team members" }),
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
      title: "Team Management",
      subtitle: "Manage team members, roles, and permissions",
      actions: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          size: "sm",
          className: "gap-1 bg-[#004a38] hover:bg-[#003a2c]",
          onClick: openAdd,
          "data-ocid": "adminp.team.add_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
            " Add Member"
          ]
        }
      ),
      children: [
        isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", "data-ocid": "adminp.team.loading_state", children: ["a", "b", "c"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-14 w-full rounded-xl" }, k)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", "data-ocid": "adminp.team.table", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-gray-50 text-gray-500 text-xs uppercase tracking-wide border-b border-gray-100", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-5 py-3 font-medium", children: "Member" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-medium hidden md:table-cell", children: "Email" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-medium", children: "Role" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-medium hidden sm:table-cell", children: "Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-medium", children: "Actions" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
            team.map((m, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "tr",
              {
                "data-ocid": `adminp.team.item.${i + 1}`,
                className: "border-t border-gray-50 hover:bg-gray-50/60 transition-colors",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-4 h-4 text-green-700" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-gray-900 text-sm", children: m.name })
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 hidden md:table-cell text-gray-500 text-xs", children: m.email }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    APTag,
                    {
                      label: m.role,
                      color: roleColor[m.role] ?? "gray"
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 hidden sm:table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    APTag,
                    {
                      label: m.active ? "Active" : "Inactive",
                      color: m.active ? "green" : "gray"
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        size: "icon",
                        variant: "ghost",
                        className: "h-7 w-7",
                        onClick: () => openEdit(m),
                        "data-ocid": `adminp.team.item.${i + 1}.edit_button`,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "w-3.5 h-3.5" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        size: "icon",
                        variant: "ghost",
                        className: "h-7 w-7 hover:bg-red-50 hover:text-red-600",
                        onClick: () => void handleDelete(m.id),
                        "data-ocid": `adminp.team.item.${i + 1}.delete_button`,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
                      }
                    )
                  ] }) })
                ]
              },
              m.id
            )),
            team.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "td",
              {
                colSpan: 5,
                className: "py-12 text-center",
                "data-ocid": "adminp.team.empty_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-8 h-8 text-gray-300 mx-auto mb-2" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400 text-sm", children: "No team members — add your first team member" })
                ]
              }
            ) })
          ] })
        ] }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showModal, onOpenChange: setShowModal, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          DialogContent,
          {
            className: "max-w-md",
            "data-ocid": "adminp.team.modal.dialog",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: editTarget ? "Edit Member" : "Add Team Member" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 pt-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Full Name *" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      value: form.name,
                      onChange: (e) => setForm((f) => ({ ...f, name: e.target.value })),
                      placeholder: "Arjun Patel",
                      "data-ocid": "adminp.team.modal.name_input"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Email *" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      type: "email",
                      value: form.email,
                      onChange: (e) => setForm((f) => ({ ...f, email: e.target.value })),
                      placeholder: "arjun@forestheals.in",
                      "data-ocid": "adminp.team.modal.email_input"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Role" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Select,
                      {
                        value: form.role,
                        onValueChange: (v) => setForm((f) => ({ ...f, role: v })),
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "adminp.team.modal.role_select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: ROLES.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: r, children: r }, r)) })
                        ]
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Status" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Select,
                      {
                        value: form.active ? "active" : "inactive",
                        onValueChange: (v) => setForm((f) => ({ ...f, active: v === "active" })),
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "adminp.team.modal.status_select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "active", children: "Active" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "inactive", children: "Inactive" })
                          ] })
                        ]
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      className: "flex-1 bg-[#004a38] hover:bg-[#003a2c]",
                      onClick: () => void handleSave(),
                      disabled: addMutation.isPending || updateMutation.isPending,
                      "data-ocid": "adminp.team.modal.submit_button",
                      children: addMutation.isPending || updateMutation.isPending ? "Saving…" : editTarget ? "Save" : "Add Member"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      variant: "outline",
                      className: "flex-1",
                      onClick: () => setShowModal(false),
                      "data-ocid": "adminp.team.modal.cancel_button",
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
  AdminPTeam as default
};
