import { r as reactExports, j as jsxRuntimeExports, a as Button, e as ue } from "./index-CfU2kVIJ.js";
import { d as Dialog, e as DialogContent, f as DialogHeader, g as DialogTitle } from "./dialog-BmCSuf7q.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-DWPZIEKW.js";
import { S as Skeleton } from "./skeleton-Dbe_tSkr.js";
import { T as Textarea } from "./textarea-CHqS0GCX.js";
import { a as useAdminOrders, i as useUpdateOrderStatus, j as useUpdateOrderNotes, A as AdminPLayout, S as ShoppingCart } from "./AdminPLayout-CIt5RHz_.js";
import { a as formatDate, f as formatPrice } from "./formatters-CN9TrYCS.js";
import { C as CircleAlert } from "./circle-alert-ucF-SypE.js";
import { R as RefreshCw } from "./refresh-cw-CczYOB5W.js";
import { E as Eye } from "./eye-BjoUj9TI.js";
import { C as CircleCheck } from "./circle-check-BnQJU1pP.js";
import { P as Package } from "./package-C5tkAuNr.js";
import "./index-l7_3JU5-.js";
import "./index-D_sIzci6.js";
import "./index-Cv8ba7Pb.js";
import "./index-Dzwq3ONP.js";
import "./check-DSd0zFnf.js";
import "./useMutation-DVPdZiQH.js";
import "./convert-Cs1e6Uux.js";
import "./leaf-BdKoN6HX.js";
import "./chevron-right-DNGmMEAY.js";
import "./users-BTrxV2BM.js";
import "./star-D6nQNTvb.js";
const STATUSES = [
  "pending",
  "confirmed",
  "processing",
  "shipped",
  "completed",
  "cancelled"
];
const STATUS_LABELS = {
  pending: "Pending",
  confirmed: "Confirmed",
  processing: "Processing",
  shipped: "Shipped",
  completed: "Completed",
  cancelled: "Cancelled"
};
const STATUS_COLOR = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  processing: "bg-purple-100 text-purple-800",
  shipped: "bg-cyan-100 text-cyan-800",
  completed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800"
};
function AdminPOrders() {
  const { data: orders, isLoading, isError, refetch } = useAdminOrders();
  const updateStatus = useUpdateOrderStatus();
  const updateNotes = useUpdateOrderNotes();
  const [filter, setFilter] = reactExports.useState("all");
  const [selected, setSelected] = reactExports.useState(null);
  const [notesEdit, setNotesEdit] = reactExports.useState("");
  const [savingNotes, setSavingNotes] = reactExports.useState(false);
  const filtered = !orders ? [] : filter === "all" ? orders : orders.filter((o) => o.status === filter);
  function openDetail(order) {
    setSelected(order);
    setNotesEdit(order.notes ?? "");
  }
  async function changeStatus(order, newStatus) {
    try {
      await updateStatus.mutateAsync({ id: order.id, status: newStatus });
      ue.success(
        `Order #${order.id} → ${STATUS_LABELS[newStatus] ?? newStatus}`
      );
      if ((selected == null ? void 0 : selected.id) === order.id) {
        setSelected({ ...selected, status: newStatus });
      }
    } catch {
      ue.error("Failed to update status. Please try again.");
    }
  }
  async function saveNotes() {
    if (!selected) return;
    setSavingNotes(true);
    try {
      await updateNotes.mutateAsync({
        id: selected.id,
        notes: notesEdit.trim() || null
      });
      setSelected({ ...selected, notes: notesEdit.trim() || void 0 });
      ue.success("Notes saved");
    } catch {
      ue.error("Failed to save notes");
    } finally {
      setSavingNotes(false);
    }
  }
  if (isError) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminPLayout, { title: "Orders", subtitle: "Manage customer orders", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-red-50 border border-red-200 rounded-2xl p-8 text-center",
        "data-ocid": "adminp.orders.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-8 h-8 text-red-400 mx-auto mb-3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-red-700 font-medium", children: "Failed to load orders" }),
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
      title: "Orders",
      subtitle: `${(orders == null ? void 0 : orders.length) ?? 0} total orders`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-wrap gap-3 mb-4 items-center",
            "data-ocid": "adminp.orders.filters",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: filter, onValueChange: setFilter, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SelectTrigger,
                  {
                    className: "w-44",
                    "data-ocid": "adminp.orders.status_filter_select",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All statuses" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All statuses" }),
                  STATUSES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s, children: STATUS_LABELS[s] }, s))
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-gray-500 flex-1", children: [
                "Showing ",
                filtered.length,
                " order",
                filtered.length !== 1 ? "s" : ""
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "outline",
                  size: "sm",
                  onClick: () => void refetch(),
                  className: "gap-1.5 text-xs",
                  "data-ocid": "adminp.orders.refresh_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-3.5 h-3.5" }),
                    " Refresh"
                  ]
                }
              )
            ]
          }
        ),
        isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", "data-ocid": "adminp.orders.loading_state", children: ["a", "b", "c", "d"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-14 w-full rounded-xl" }, k)) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-white rounded-2xl border border-gray-100 p-14 text-center",
            "data-ocid": "adminp.orders.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "w-10 h-10 text-gray-300 mx-auto mb-3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 font-medium", children: "No orders found" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400 text-sm mt-1", children: filter === "all" ? "Orders placed by customers will appear here." : `No ${STATUS_LABELS[filter] ?? filter} orders.` })
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", "data-ocid": "adminp.orders.table", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-gray-50 text-gray-500 text-xs uppercase tracking-wide border-b border-gray-100", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-5 py-3 font-medium", children: "Order" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-medium hidden md:table-cell", children: "Customer" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-medium hidden lg:table-cell", children: "Address" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-medium hidden lg:table-cell", children: "Date" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-medium", children: "Total" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-medium hidden sm:table-cell", children: "Payment" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-medium", children: "Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-medium", children: "Actions" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: filtered.map((order, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "tr",
            {
              "data-ocid": `adminp.orders.item.${i + 1}`,
              className: "border-t border-gray-50 hover:bg-gray-50/60 transition-colors",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-5 py-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-xs text-gray-500", children: [
                    "#",
                    order.id
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-gray-400 mt-0.5", children: [
                    order.items.length,
                    " item",
                    order.items.length !== 1 ? "s" : ""
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 hidden md:table-cell", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-gray-800 text-xs", children: order.address.fullName || "—" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400 text-xs", children: order.address.phone })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 hidden lg:table-cell text-gray-500 text-xs", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                    order.address.city,
                    ", ",
                    order.address.state
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: order.address.pincode })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 hidden lg:table-cell text-gray-500 text-xs", children: formatDate(order.createdAt) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right font-semibold text-gray-900", children: formatPrice(order.totalAmount) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 hidden sm:table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `text-xs px-2 py-0.5 rounded-full font-medium ${order.paymentMethod === "stripe" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`,
                    children: order.paymentMethod === "stripe" ? "Online" : "COD"
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Select,
                  {
                    value: order.status,
                    onValueChange: (v) => void changeStatus(order, v),
                    disabled: updateStatus.isPending,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        SelectTrigger,
                        {
                          className: `h-7 text-xs w-32 border-0 px-2 rounded-full font-medium ${STATUS_COLOR[order.status] ?? "bg-gray-100 text-gray-600"}`,
                          "data-ocid": `adminp.orders.item.${i + 1}.status_select`,
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: STATUSES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s, children: STATUS_LABELS[s] }, s)) })
                    ]
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      variant: "ghost",
                      size: "sm",
                      className: "h-7 text-xs gap-1",
                      onClick: () => openDetail(order),
                      "data-ocid": `adminp.orders.item.${i + 1}.view_button`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-3 h-3" }),
                        " View"
                      ]
                    }
                  ),
                  order.status === "pending" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      size: "sm",
                      className: "h-7 text-xs gap-1 bg-green-600 hover:bg-green-700",
                      onClick: () => void changeStatus(order, "confirmed"),
                      disabled: updateStatus.isPending,
                      "data-ocid": `adminp.orders.item.${i + 1}.confirm_button`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3" }),
                        " Confirm"
                      ]
                    }
                  )
                ] }) })
              ]
            },
            order.id
          )) })
        ] }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Dialog,
          {
            open: !!selected,
            onOpenChange: (open) => {
              if (!open) setSelected(null);
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              DialogContent,
              {
                className: "max-w-xl max-h-[92vh] overflow-y-auto",
                "data-ocid": "adminp.orders.detail.dialog",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-4 h-4" }),
                    " Order #",
                    selected == null ? void 0 : selected.id
                  ] }) }),
                  selected && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 pt-2 text-sm", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: `px-3 py-1 rounded-full text-xs font-semibold ${STATUS_COLOR[selected.status] ?? "bg-gray-100 text-gray-600"}`,
                          children: STATUS_LABELS[selected.status] ?? selected.status
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-400 text-xs", children: formatDate(selected.createdAt) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: `text-xs px-2 py-0.5 rounded-full font-medium ml-auto ${selected.paymentMethod === "stripe" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`,
                          children: selected.paymentMethod === "stripe" ? "Online Payment" : "Cash on Delivery"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-50 rounded-xl p-3", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 mb-1 font-semibold uppercase tracking-wide", children: "Customer" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-gray-900 text-xs", children: selected.address.fullName || "—" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 text-xs mt-0.5", children: selected.address.phone }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-gray-400 text-xs font-mono mt-0.5 truncate", children: [
                          selected.userId.slice(0, 20),
                          "…"
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-50 rounded-xl p-3", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 mb-1 font-semibold uppercase tracking-wide", children: "Delivery Address" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-700 text-xs", children: selected.address.line1 }),
                        selected.address.line2 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-700 text-xs", children: selected.address.line2 }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-gray-700 text-xs", children: [
                          selected.address.city,
                          ", ",
                          selected.address.state,
                          " ",
                          selected.address.pincode
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 text-xs", children: selected.address.country })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-gray-500 mb-2 font-semibold uppercase tracking-wide", children: [
                        "Items (",
                        selected.items.length,
                        ")"
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1", children: selected.items.map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          className: "flex justify-between bg-gray-50 rounded-lg px-3 py-2 text-xs items-center gap-2",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-gray-800", children: [
                                "Product #",
                                item.productId
                              ] }),
                              item.productType && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-2 text-gray-400", children: [
                                "(",
                                item.productType,
                                ")"
                              ] })
                            ] }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-gray-500", children: [
                              "×",
                              item.quantity
                            ] }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold shrink-0", children: formatPrice(item.price * item.quantity) })
                          ]
                        },
                        `${item.productId}-${idx}`
                      )) }),
                      selected.discountAmount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between px-3 py-1.5 text-xs text-green-700", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                          "Discount",
                          selected.couponCode ? ` (${selected.couponCode})` : ""
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                          "−",
                          formatPrice(selected.discountAmount)
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between font-bold px-3 py-2 border-t border-gray-100 text-sm", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#004a38]", children: formatPrice(selected.totalAmount) })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 mb-2 font-semibold uppercase tracking-wide", children: "Update Status" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Select,
                        {
                          value: selected.status,
                          onValueChange: (v) => void changeStatus(selected, v),
                          disabled: updateStatus.isPending,
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              SelectTrigger,
                              {
                                className: "w-full",
                                "data-ocid": "adminp.orders.detail.status_select",
                                children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: STATUSES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s, children: STATUS_LABELS[s] }, s)) })
                          ]
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 mb-2 font-semibold uppercase tracking-wide", children: "Admin Notes" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Textarea,
                        {
                          rows: 2,
                          value: notesEdit,
                          onChange: (e) => setNotesEdit(e.target.value),
                          placeholder: "Add internal notes (not visible to customer)…",
                          className: "text-xs",
                          "data-ocid": "adminp.orders.detail.notes_textarea"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Button,
                        {
                          size: "sm",
                          variant: "outline",
                          className: "mt-2 text-xs",
                          onClick: () => void saveNotes(),
                          disabled: savingNotes,
                          "data-ocid": "adminp.orders.detail.save_notes_button",
                          children: savingNotes ? "Saving…" : "Save Notes"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        variant: "outline",
                        className: "w-full text-xs",
                        size: "sm",
                        onClick: () => setSelected(null),
                        "data-ocid": "adminp.orders.detail.close_button",
                        children: "Close"
                      }
                    )
                  ] })
                ]
              }
            )
          }
        )
      ]
    }
  );
}
export {
  AdminPOrders as default
};
