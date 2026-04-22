import { r as reactExports, j as jsxRuntimeExports, a as Button, I as Input, e as ue } from "./index-CfU2kVIJ.js";
import { d as Dialog, e as DialogContent, f as DialogHeader, g as DialogTitle } from "./dialog-BmCSuf7q.js";
import { L as Label } from "./label-BjUfKOjb.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-DWPZIEKW.js";
import { S as Skeleton } from "./skeleton-Dbe_tSkr.js";
import { S as Switch } from "./switch-BPNoaHft.js";
import { r as useAdminCoupons, s as useCreateAdminCoupon, t as useUpdateAdminCoupon, v as useDeleteAdminCoupon, w as useToggleCouponActive, A as AdminPLayout, M as Megaphone, l as APTag } from "./AdminPLayout-CIt5RHz_.js";
import { C as CircleAlert } from "./circle-alert-ucF-SypE.js";
import { R as RefreshCw } from "./refresh-cw-CczYOB5W.js";
import { T as Tag } from "./tag-RoRywvnF.js";
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
const DISCOUNT_TYPES = ["percentage", "flat", "free_shipping"];
const DISCOUNT_TYPE_LABELS = {
  percentage: "Percentage",
  flat: "Flat",
  free_shipping: "Free Shipping"
};
function genId() {
  return `CPN-${Date.now().toString(36).toUpperCase()}`;
}
const EMPTY_COUPON = {
  id: "",
  code: "",
  discountType: "percentage",
  discountValue: 10,
  minCartValue: 0,
  maxUses: 100,
  usedCount: 0,
  active: true,
  description: "",
  createdAt: Date.now()
};
function AdminPMarketing() {
  const { data: coupons = [], isLoading, isError, refetch } = useAdminCoupons();
  const createMutation = useCreateAdminCoupon();
  const updateMutation = useUpdateAdminCoupon();
  const deleteMutation = useDeleteAdminCoupon();
  const toggleMutation = useToggleCouponActive();
  const [showModal, setShowModal] = reactExports.useState(false);
  const [editTarget, setEditTarget] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState(EMPTY_COUPON);
  function openAdd() {
    setEditTarget(null);
    setForm({ ...EMPTY_COUPON, id: genId() });
    setShowModal(true);
  }
  function openEdit(c) {
    setEditTarget(c);
    setForm({ ...c });
    setShowModal(true);
  }
  async function handleSave() {
    if (!form.code.trim()) {
      ue.error("Coupon code required");
      return;
    }
    try {
      if (editTarget) {
        await updateMutation.mutateAsync({ id: editTarget.id, coupon: form });
        ue.success("Coupon updated");
      } else {
        await createMutation.mutateAsync(form);
        ue.success("Coupon created!");
      }
      setShowModal(false);
    } catch {
      ue.error("Failed to save coupon");
    }
  }
  async function handleDelete(id) {
    try {
      await deleteMutation.mutateAsync(id);
      ue.success("Coupon deleted");
    } catch {
      ue.error("Failed to delete coupon");
    }
  }
  async function handleToggle(id) {
    try {
      await toggleMutation.mutateAsync(id);
    } catch {
      ue.error("Failed to toggle coupon");
    }
  }
  if (isError) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      AdminPLayout,
      {
        title: "Marketing & Coupons",
        subtitle: "Manage promotions and discounts",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-red-50 border border-red-200 rounded-2xl p-8 text-center",
            "data-ocid": "adminp.marketing.error_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-8 h-8 text-red-400 mx-auto mb-3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-red-700 font-medium", children: "Failed to load coupons" }),
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
        )
      }
    );
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
          isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 space-y-2", children: ["a", "b", "c"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full rounded" }, k)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
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
                            label: DISCOUNT_TYPE_LABELS[c.discountType] ?? c.discountType,
                            color: "blue"
                          }
                        ) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right font-semibold text-gray-900", children: c.discountType === "percentage" ? `${c.discountValue}%` : c.discountType === "flat" ? `₹${c.discountValue}` : "Free" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-right hidden md:table-cell text-gray-500 text-xs", children: [
                          "₹",
                          c.minCartValue
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-center hidden lg:table-cell text-xs text-gray-500", children: [
                          c.usedCount,
                          " / ",
                          c.maxUses
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Switch,
                          {
                            checked: c.active,
                            onCheckedChange: () => void handleToggle(c.id),
                            disabled: toggleMutation.isPending,
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
                              onClick: () => void handleDelete(c.id),
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
                      colSpan: 7,
                      className: "py-10 text-center text-gray-400 text-sm",
                      "data-ocid": "adminp.marketing.coupons.empty_state",
                      children: "No coupons created yet. Create your first coupon to start promoting!"
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
                      value: form.code,
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
                        value: form.discountType,
                        onValueChange: (v) => setForm((f) => ({ ...f, discountType: v })),
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "adminp.marketing.modal.type_select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: DISCOUNT_TYPES.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: t, children: DISCOUNT_TYPE_LABELS[t] }, t)) })
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
                        value: form.discountValue || "",
                        onChange: (e) => setForm((f) => ({
                          ...f,
                          discountValue: Number(e.target.value)
                        })),
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
                        value: form.minCartValue || "",
                        onChange: (e) => setForm((f) => ({
                          ...f,
                          minCartValue: Number(e.target.value)
                        })),
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
                        value: form.maxUses || "",
                        onChange: (e) => setForm((f) => ({ ...f, maxUses: Number(e.target.value) })),
                        "data-ocid": "adminp.marketing.modal.maxuses_input"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Description" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      value: form.description,
                      onChange: (e) => setForm((f) => ({ ...f, description: e.target.value })),
                      placeholder: "Describe this coupon…"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Switch,
                    {
                      id: "ap-coupon-active",
                      checked: form.active,
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
                      onClick: () => void handleSave(),
                      disabled: createMutation.isPending || updateMutation.isPending,
                      "data-ocid": "adminp.marketing.modal.submit_button",
                      children: createMutation.isPending || updateMutation.isPending ? "Saving…" : editTarget ? "Save Changes" : "Create Coupon"
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
