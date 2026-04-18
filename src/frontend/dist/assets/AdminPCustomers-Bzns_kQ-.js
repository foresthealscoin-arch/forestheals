import { Z as useAdminPStore, r as reactExports, j as jsxRuntimeExports, f as Search, I as Input, U as User, a as Button, u as ue } from "./index-BTLW_NIC.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-DiMklLnQ.js";
import { L as Label } from "./label-BUCCGSyY.js";
import { T as Textarea } from "./textarea-CjhYoXk_.js";
import { A as AdminPLayout, b as APTag } from "./AdminPLayout-DuXyq7Yf.js";
import { P as Pen } from "./pen-Bt1CYM1O.js";
import { T as Trash2 } from "./trash-2-BSOfqa-y.js";
import { U as Users } from "./users-CPUsLN16.js";
import { P as Plus } from "./plus-BR3-oajm.js";
import "./index-n-hXPyKH.js";
import "./index-CdALTCxJ.js";
import "./index-B4_ux9p8.js";
import "./index-CnBxW9r1.js";
import "./index-BWWxSKzl.js";
import "./leaf-CzbpTTMi.js";
import "./chevron-right-CYy9z0A9.js";
import "./chevron-left-V7RNY0PU.js";
import "./package-CJHu-mD6.js";
import "./shopping-cart-D31XYOt2.js";
import "./star-B8b4SvdS.js";
function genId() {
  return `CUST-${Date.now().toString(36).toUpperCase()}`;
}
function AdminPCustomers() {
  const customers = useAdminPStore((s) => s.customers);
  const addCustomer = useAdminPStore((s) => s.addCustomer);
  const updateCustomer = useAdminPStore((s) => s.updateCustomer);
  const deleteCustomer = useAdminPStore((s) => s.deleteCustomer);
  const [search, setSearch] = reactExports.useState("");
  const [showModal, setShowModal] = reactExports.useState(false);
  const [editTarget, setEditTarget] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState({});
  const filtered = customers.filter(
    (c) => !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase())
  );
  function openAdd() {
    setEditTarget(null);
    setForm({ status: "Active", tags: [], notes: "" });
    setShowModal(true);
  }
  function openEdit(c) {
    setEditTarget(c);
    setForm({ ...c });
    setShowModal(true);
  }
  function handleSave() {
    var _a, _b;
    if (!((_a = form.name) == null ? void 0 : _a.trim()) || !((_b = form.email) == null ? void 0 : _b.trim())) {
      ue.error("Name and email are required");
      return;
    }
    if (editTarget) {
      updateCustomer({ ...editTarget, ...form });
      ue.success("Customer updated");
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
        joinedAt: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
      });
      ue.success("Customer added");
    }
    setShowModal(false);
  }
  const statusColor = {
    Active: "green",
    VIP: "yellow",
    Blocked: "red"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    AdminPLayout,
    {
      title: "Customers",
      subtitle: `${customers.length} registered customers`,
      actions: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          size: "sm",
          className: "gap-1 bg-[#004a38] hover:bg-[#003a2c]",
          onClick: openAdd,
          "data-ocid": "adminp.customers.add_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
            " Add Customer"
          ]
        }
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-sm mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              placeholder: "Search customers…",
              value: search,
              onChange: (e) => setSearch(e.target.value),
              className: "pl-9",
              "data-ocid": "adminp.customers.search_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", "data-ocid": "adminp.customers.table", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-gray-50 text-gray-500 text-xs uppercase tracking-wide border-b border-gray-100", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-5 py-3 font-medium", children: "Customer" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-medium hidden md:table-cell", children: "Contact" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-medium hidden sm:table-cell", children: "Total Spend" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-center px-4 py-3 font-medium hidden lg:table-cell", children: "Orders" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-medium", children: "Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-medium", children: "Actions" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
            filtered.map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "tr",
              {
                "data-ocid": `adminp.customers.item.${i + 1}`,
                className: "border-t border-gray-50 hover:bg-gray-50/60 transition-colors",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-4 h-4 text-green-700" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-gray-900 text-sm truncate", children: c.name }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-400", children: c.joinedAt })
                    ] })
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 hidden md:table-cell", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-700", children: c.email }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-400", children: c.phone })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-right hidden sm:table-cell font-semibold text-[#004a38] text-sm", children: [
                    "₹",
                    c.totalSpend.toLocaleString("en-IN")
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-center hidden lg:table-cell text-gray-700 text-sm", children: c.orderCount }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    APTag,
                    {
                      label: c.status,
                      color: statusColor[c.status] ?? "gray"
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        size: "icon",
                        variant: "ghost",
                        className: "h-7 w-7",
                        onClick: () => openEdit(c),
                        "data-ocid": `adminp.customers.item.${i + 1}.edit_button`,
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
                          deleteCustomer(c.id);
                          ue.success("Customer removed");
                        },
                        "data-ocid": `adminp.customers.item.${i + 1}.delete_button`,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
                      }
                    )
                  ] }) })
                ]
              },
              c.id
            )),
            filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "td",
              {
                colSpan: 6,
                className: "py-12 text-center",
                "data-ocid": "adminp.customers.empty_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-8 h-8 text-gray-300 mx-auto mb-2" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400 text-sm", children: "No customers found" })
                ]
              }
            ) })
          ] })
        ] }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showModal, onOpenChange: setShowModal, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          DialogContent,
          {
            className: "max-w-md",
            "data-ocid": "adminp.customers.modal.dialog",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: editTarget ? "Edit Customer" : "Add Customer" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 pt-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Full Name *" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      value: form.name ?? "",
                      onChange: (e) => setForm((f) => ({ ...f, name: e.target.value })),
                      placeholder: "Priya Sharma",
                      "data-ocid": "adminp.customers.modal.name_input"
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
                      placeholder: "priya@example.com",
                      "data-ocid": "adminp.customers.modal.email_input"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Phone" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      value: form.phone ?? "",
                      onChange: (e) => setForm((f) => ({ ...f, phone: e.target.value })),
                      placeholder: "9876543210",
                      "data-ocid": "adminp.customers.modal.phone_input"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Address" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Textarea,
                    {
                      rows: 2,
                      value: form.address ?? "",
                      onChange: (e) => setForm((f) => ({ ...f, address: e.target.value })),
                      placeholder: "Full address",
                      "data-ocid": "adminp.customers.modal.address_input"
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
                      placeholder: "Internal notes…",
                      "data-ocid": "adminp.customers.modal.notes_input"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      className: "flex-1 bg-[#004a38] hover:bg-[#003a2c]",
                      onClick: handleSave,
                      "data-ocid": "adminp.customers.modal.submit_button",
                      children: editTarget ? "Save Changes" : "Add Customer"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      variant: "outline",
                      className: "flex-1",
                      onClick: () => setShowModal(false),
                      "data-ocid": "adminp.customers.modal.cancel_button",
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
  AdminPCustomers as default
};
