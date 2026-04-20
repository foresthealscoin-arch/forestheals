import { J as useAdminPStore, r as reactExports, j as jsxRuntimeExports, a as Button, d as ue, I as Input } from "./index-C77TdgT2.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-CLZ4CVsS.js";
import { L as Label } from "./label-Bdg5wNUV.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-CZZguE-Y.js";
import { A as AdminPLayout, b as APTag } from "./AdminPLayout-DXQoX6aZ.js";
import { S as ShieldCheck } from "./shield-check-DdASUgaf.js";
import { P as Pen } from "./pen-_taNolNe.js";
import { T as Trash2 } from "./trash-2-BT7W5K0q.js";
import { U as Users } from "./users-YYSJrKmY.js";
import { P as Plus } from "./plus-B9luQg0g.js";
import "./index-CdCJTNlH.js";
import "./index-CO47XDRv.js";
import "./index-DR1O-5dL.js";
import "./index-BJEZxP4l.js";
import "./index-CfvA_s5j.js";
import "./index-CpwwMQ4U.js";
import "./index-DWnu7L6s.js";
import "./check-CXBlVq0H.js";
import "./leaf-BotUdxvq.js";
import "./chevron-right-ZsOnTFmP.js";
import "./package-B8cYcbks.js";
import "./shopping-cart-DPqgd3XG.js";
import "./star-DR91Bj0n.js";
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
function AdminPTeam() {
  const team = useAdminPStore((s) => s.team);
  const addTeamMember = useAdminPStore((s) => s.addTeamMember);
  const updateTeamMember = useAdminPStore((s) => s.updateTeamMember);
  const deleteTeamMember = useAdminPStore((s) => s.deleteTeamMember);
  const [showModal, setShowModal] = reactExports.useState(false);
  const [editTarget, setEditTarget] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState({});
  function openAdd() {
    setEditTarget(null);
    setForm({
      role: "Staff",
      status: "Active",
      joinedAt: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      lastLogin: "Never"
    });
    setShowModal(true);
  }
  function openEdit(m) {
    setEditTarget(m);
    setForm({ ...m });
    setShowModal(true);
  }
  function handleSave() {
    var _a, _b;
    if (!((_a = form.name) == null ? void 0 : _a.trim()) || !((_b = form.email) == null ? void 0 : _b.trim())) {
      ue.error("Name and email required");
      return;
    }
    if (editTarget) {
      updateTeamMember({ ...editTarget, ...form });
      ue.success("Team member updated");
    } else {
      addTeamMember({
        id: genId(),
        name: form.name ?? "",
        email: form.email ?? "",
        role: form.role ?? "Staff",
        status: form.status ?? "Active",
        joinedAt: form.joinedAt ?? "",
        lastLogin: "Never"
      });
      ue.success("Team member added");
    }
    setShowModal(false);
  }
  const roleColor = {
    "Super Admin": "green",
    Admin: "blue",
    Manager: "blue",
    Staff: "gray",
    "Customer Support": "yellow"
  };
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
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", "data-ocid": "adminp.team.table", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-gray-50 text-gray-500 text-xs uppercase tracking-wide border-b border-gray-100", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-5 py-3 font-medium", children: "Member" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-medium hidden md:table-cell", children: "Email" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-medium", children: "Role" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-medium hidden lg:table-cell", children: "Joined" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-medium hidden xl:table-cell", children: "Last Login" }),
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
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(APTag, { label: m.role, color: roleColor[m.role] ?? "gray" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 hidden lg:table-cell text-gray-500 text-xs", children: m.joinedAt }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 hidden xl:table-cell text-gray-500 text-xs", children: m.lastLogin }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 hidden sm:table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    APTag,
                    {
                      label: m.status,
                      color: m.status === "Active" ? "green" : "gray"
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
                        onClick: () => {
                          deleteTeamMember(m.id);
                          ue.success("Member removed");
                        },
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
                colSpan: 7,
                className: "py-12 text-center",
                "data-ocid": "adminp.team.empty_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-8 h-8 text-gray-300 mx-auto mb-2" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400 text-sm", children: "No team members" })
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
                      value: form.name ?? "",
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
                      value: form.email ?? "",
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
                        value: form.role ?? "Staff",
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
                        value: form.status ?? "Active",
                        onValueChange: (v) => setForm((f) => ({
                          ...f,
                          status: v
                        })),
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "adminp.team.modal.status_select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Active", children: "Active" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Inactive", children: "Inactive" })
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
                      onClick: handleSave,
                      "data-ocid": "adminp.team.modal.submit_button",
                      children: editTarget ? "Save" : "Add Member"
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
