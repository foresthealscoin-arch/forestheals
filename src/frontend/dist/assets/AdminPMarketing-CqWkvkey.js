import { Z as useAdminPStore, r as reactExports, j as jsxRuntimeExports, a as Button, u as ue, I as Input } from "./index-BTLW_NIC.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-DiMklLnQ.js";
import { L as Label } from "./label-BUCCGSyY.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-BX7DqIsr.js";
import { S as Switch } from "./switch-Bwl0-6DY.js";
import { A as AdminPLayout, M as Megaphone, b as APTag } from "./AdminPLayout-DuXyq7Yf.js";
import { T as Tag } from "./tag-C7TYpHOJ.js";
import { P as Pen } from "./pen-Bt1CYM1O.js";
import { T as Trash2 } from "./trash-2-BSOfqa-y.js";
import { P as Plus } from "./plus-BR3-oajm.js";
import "./index-n-hXPyKH.js";
import "./index-CdALTCxJ.js";
import "./index-B4_ux9p8.js";
import "./index-CnBxW9r1.js";
import "./index-BWWxSKzl.js";
import "./index-DJIIwdg5.js";
import "./index-DzxR8ZBH.js";
import "./check-Dzh62hXf.js";
import "./leaf-CzbpTTMi.js";
import "./chevron-right-CYy9z0A9.js";
import "./chevron-left-V7RNY0PU.js";
import "./package-CJHu-mD6.js";
import "./shopping-cart-D31XYOt2.js";
import "./users-CPUsLN16.js";
import "./star-B8b4SvdS.js";
function genId() {
  return `CPN-${Date.now().toString(36).toUpperCase()}`;
}
function AdminPMarketing() {
  const coupons = useAdminPStore((s) => s.coupons);
  const addCoupon = useAdminPStore((s) => s.addCoupon);
  const updateCoupon = useAdminPStore((s) => s.updateCoupon);
  const deleteCoupon = useAdminPStore((s) => s.deleteCoupon);
  const [showModal, setShowModal] = reactExports.useState(false);
  const [editTarget, setEditTarget] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState({});
  function openAdd() {
    setEditTarget(null);
    setForm({ type: "Percentage", active: true, usedCount: 0 });
    setShowModal(true);
  }
  function openEdit(c) {
    setEditTarget(c);
    setForm({ ...c });
    setShowModal(true);
  }
  function handleSave() {
    var _a;
    if (!((_a = form.code) == null ? void 0 : _a.trim())) {
      ue.error("Coupon code required");
      return;
    }
    if (editTarget) {
      updateCoupon({ ...editTarget, ...form });
      ue.success("Coupon updated");
    } else {
      addCoupon({
        id: genId(),
        code: form.code ?? "",
        type: form.type ?? "Percentage",
        value: form.value ?? 0,
        minCart: form.minCart ?? 0,
        maxUses: form.maxUses ?? 100,
        usedCount: 0,
        active: form.active ?? true,
        expiry: form.expiry ?? ""
      });
      ue.success("Coupon created!");
    }
    setShowModal(false);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    AdminPLayout,
    {
      title: "Marketing & Coupons",
      subtitle: "Manage promotions, discounts, and campaigns",
      actions: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          size: "sm",
          className: "gap-1 bg-[#004a38] hover:bg-[#003a2c]",
          onClick: openAdd,
          "data-ocid": "adminp.marketing.add_coupon_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
            " Add Coupon"
          ]
        }
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4 mb-6", children: [
          {
            label: "Active Coupons",
            value: coupons.filter((c) => c.active).length,
            icon: Tag,
            color: "bg-green-50 text-green-700"
          },
          {
            label: "Total Coupons",
            value: coupons.length,
            icon: Tag,
            color: "bg-blue-50 text-blue-700"
          },
          {
            label: "Total Usages",
            value: coupons.reduce((s, c) => s + c.usedCount, 0),
            icon: Megaphone,
            color: "bg-yellow-50 text-yellow-700"
          },
          {
            label: "Inactive",
            value: coupons.filter((c) => !c.active).length,
            icon: Tag,
            color: "bg-gray-50 text-gray-600"
          }
        ].map((card) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "bg-white rounded-2xl border border-gray-100 shadow-sm p-5",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 font-medium uppercase tracking-wide", children: card.label }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-gray-900 mt-1", children: card.value })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: `w-10 h-10 rounded-xl flex items-center justify-center ${card.color}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(card.icon, { className: "w-5 h-5" })
                }
              )
            ] })
          },
          card.label
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 py-4 border-b border-gray-100", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-gray-900 text-sm", children: "All Coupons" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "table",
            {
              className: "w-full text-sm",
              "data-ocid": "adminp.marketing.coupons_table",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-gray-50 text-gray-500 text-xs uppercase tracking-wide border-b border-gray-100", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-5 py-3 font-medium", children: "Code" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-medium hidden sm:table-cell", children: "Type" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-medium", children: "Value" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-medium hidden md:table-cell", children: "Min Cart" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-center px-4 py-3 font-medium hidden lg:table-cell", children: "Used / Max" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-medium hidden md:table-cell", children: "Expiry" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-center px-4 py-3 font-medium", children: "Active" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-medium", children: "Actions" })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
                  coupons.map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "tr",
                    {
                      "data-ocid": `adminp.marketing.coupon.item.${i + 1}`,
                      className: "border-t border-gray-50 hover:bg-gray-50/60 transition-colors",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3 font-mono font-bold text-[#004a38] text-sm", children: c.code }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 hidden sm:table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          APTag,
                          {
                            label: c.type,
                            color: c.type === "Percentage" ? "blue" : c.type === "Flat" ? "green" : "yellow"
                          }
                        ) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right font-semibold text-gray-900", children: c.type === "Percentage" ? `${c.value}%` : c.type === "Flat" ? `₹${c.value}` : "Free" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-right hidden md:table-cell text-gray-500 text-xs", children: [
                          "₹",
                          c.minCart
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-center hidden lg:table-cell text-xs text-gray-500", children: [
                          c.usedCount,
                          " / ",
                          c.maxUses
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 hidden md:table-cell text-xs text-gray-500", children: c.expiry || "—" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Switch,
                          {
                            checked: c.active,
                            onCheckedChange: (v) => updateCoupon({ ...c, active: v }),
                            "data-ocid": `adminp.marketing.coupon.item.${i + 1}.active_switch`
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
                              "data-ocid": `adminp.marketing.coupon.item.${i + 1}.edit_button`,
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
                                deleteCoupon(c.id);
                                ue.success("Coupon deleted");
                              },
                              "data-ocid": `adminp.marketing.coupon.item.${i + 1}.delete_button`,
                              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
                            }
                          )
                        ] }) })
                      ]
                    },
                    c.id
                  )),
                  coupons.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "td",
                    {
                      colSpan: 8,
                      className: "py-10 text-center text-gray-400 text-sm",
                      "data-ocid": "adminp.marketing.coupons.empty_state",
                      children: "No coupons created yet"
                    }
                  ) })
                ] })
              ]
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showModal, onOpenChange: setShowModal, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          DialogContent,
          {
            className: "max-w-md",
            "data-ocid": "adminp.marketing.modal.dialog",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: editTarget ? "Edit Coupon" : "Create Coupon" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 pt-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Coupon Code *" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      value: form.code ?? "",
                      onChange: (e) => setForm((f) => ({ ...f, code: e.target.value.toUpperCase() })),
                      placeholder: "SAVE10",
                      "data-ocid": "adminp.marketing.modal.code_input"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Type" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Select,
                      {
                        value: form.type ?? "Percentage",
                        onValueChange: (v) => setForm((f) => ({ ...f, type: v })),
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "adminp.marketing.modal.type_select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Percentage", children: "Percentage" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Flat", children: "Flat" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Free Shipping", children: "Free Shipping" })
                          ] })
                        ]
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Value" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        type: "number",
                        min: 0,
                        value: form.value ?? "",
                        onChange: (e) => setForm((f) => ({ ...f, value: Number(e.target.value) })),
                        "data-ocid": "adminp.marketing.modal.value_input"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Min Cart (₹)" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        type: "number",
                        min: 0,
                        value: form.minCart ?? "",
                        onChange: (e) => setForm((f) => ({ ...f, minCart: Number(e.target.value) })),
                        "data-ocid": "adminp.marketing.modal.mincart_input"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Max Uses" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        type: "number",
                        min: 1,
                        value: form.maxUses ?? "",
                        onChange: (e) => setForm((f) => ({ ...f, maxUses: Number(e.target.value) })),
                        "data-ocid": "adminp.marketing.modal.maxuses_input"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Expiry Date" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      type: "date",
                      value: form.expiry ?? "",
                      onChange: (e) => setForm((f) => ({ ...f, expiry: e.target.value })),
                      "data-ocid": "adminp.marketing.modal.expiry_input"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Switch,
                    {
                      id: "ap-coupon-active",
                      checked: form.active ?? true,
                      onCheckedChange: (v) => setForm((f) => ({ ...f, active: v })),
                      "data-ocid": "adminp.marketing.modal.active_switch"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "ap-coupon-active", children: "Active" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      className: "flex-1 bg-[#004a38] hover:bg-[#003a2c]",
                      onClick: handleSave,
                      "data-ocid": "adminp.marketing.modal.submit_button",
                      children: editTarget ? "Save Changes" : "Create Coupon"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      variant: "outline",
                      className: "flex-1",
                      onClick: () => setShowModal(false),
                      "data-ocid": "adminp.marketing.modal.cancel_button",
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
  AdminPMarketing as default
};
