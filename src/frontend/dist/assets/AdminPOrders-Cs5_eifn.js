import { r as reactExports, j as jsxRuntimeExports, a as Button, P as PRODUCTS_SEED_DATA, d as ue } from "./index-Oxc-_oxi.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-D5S7-Nn1.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-Bsuph0kU.js";
import { S as Skeleton } from "./skeleton-DItXWvDl.js";
import { a as useActor, O as OrderStatus, c as createActor } from "./backend-BS-t6_G-.js";
import { c as useAllOrders } from "./useOrders-BU3bpvql.js";
import { a as formatDate, f as formatPrice } from "./formatters-C5vW1ZnJ.js";
import { A as AdminPLayout } from "./AdminPLayout-DOfPyUMC.js";
import { R as RefreshCw } from "./refresh-cw-BrDB5UaA.js";
import { S as ShoppingCart } from "./shopping-cart-DpA4wU_V.js";
import { E as Eye } from "./eye-C8re7zjK.js";
import { C as CircleCheck } from "./circle-check-dPMw8Eeh.js";
import { P as Package } from "./package-6xCQkTPQ.js";
import "./index-B6-06I7M.js";
import "./index-BtdL0eLz.js";
import "./index-DYUerbpP.js";
import "./index-njhBbO9Y.js";
import "./index-BIglNuiB.js";
import "./index-DvWPYnjA.js";
import "./index-D8FRnOyd.js";
import "./check-DKcnpQxu.js";
import "./useMutation-C8tWLAXr.js";
import "./leaf-N_oh7OWh.js";
import "./chevron-right-D_aTDRZh.js";
import "./users-Dm9XPlxR.js";
import "./star-DV5fN0x3.js";
const STATUSES = [
  "pending",
  "confirmed",
  "shipped",
  "delivered",
  "cancelled"
];
const STATUS_LABELS = {
  pending: "Pending",
  confirmed: "Confirmed",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled"
};
const STATUS_COLOR = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  shipped: "bg-cyan-100 text-cyan-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800"
};
function mapToBackendStatus(status) {
  const map = {
    pending: OrderStatus.pending,
    confirmed: OrderStatus.processing,
    shipped: OrderStatus.shipped,
    delivered: OrderStatus.delivered,
    cancelled: OrderStatus.cancelled
  };
  return map[status] ?? OrderStatus.pending;
}
function AdminPOrders() {
  const { data: orders, isLoading, refetch } = useAllOrders();
  const { actor, isFetching } = useActor(createActor);
  const [filter, setFilter] = reactExports.useState("all");
  const [selected, setSelected] = reactExports.useState(null);
  const [updatingId, setUpdatingId] = reactExports.useState(null);
  const filtered = !orders ? [] : filter === "all" ? orders : orders.filter((o) => o.status === filter);
  async function changeStatus(order, newStatus) {
    setUpdatingId(order.id);
    try {
      if (actor && !isFetching) {
        await actor.updateOrderStatus(
          BigInt(order.id),
          mapToBackendStatus(newStatus)
        );
      }
      ue.success(
        `Order #${order.id} marked as ${STATUS_LABELS[newStatus] ?? newStatus}`
      );
      void refetch();
    } catch (err) {
      console.error("Failed to update order status:", err);
      ue.error("Failed to update status. Please try again.");
    } finally {
      setUpdatingId(null);
    }
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
        isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", "data-ocid": "adminp.orders.loading_state", children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-14 w-full rounded-xl" }, i)) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
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
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-5 py-3 font-medium", children: "Order ID" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-medium hidden md:table-cell", children: "Customer" }),
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
                /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-5 py-3 font-mono text-xs text-gray-500", children: [
                  "#",
                  order.id
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 hidden md:table-cell font-medium text-gray-800 text-xs", children: order.address.fullName || `${order.userId.slice(0, 14)}…` }),
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
                    disabled: updatingId === order.id,
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
                      onClick: () => setSelected(order),
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
                      disabled: updatingId === order.id,
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
        /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!selected, onOpenChange: () => setSelected(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          DialogContent,
          {
            className: "max-w-lg max-h-[90vh] overflow-y-auto",
            "data-ocid": "adminp.orders.detail.dialog",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-4 h-4" }),
                " Order #",
                selected == null ? void 0 : selected.id
              ] }) }),
              selected && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 pt-2 text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: `px-3 py-1 rounded-full text-xs font-semibold ${STATUS_COLOR[selected.status] ?? "bg-gray-100 text-gray-600"}`,
                      children: STATUS_LABELS[selected.status] ?? selected.status
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-400 text-xs", children: formatDate(selected.createdAt) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-50 rounded-xl p-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 mb-1", children: "Customer" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-gray-900 text-xs", children: selected.address.fullName || "—" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 text-xs", children: selected.address.phone }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-gray-500 text-xs truncate", children: [
                      selected.userId.slice(0, 20),
                      "…"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-50 rounded-xl p-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 mb-1", children: "Delivery Address" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-700 text-xs", children: selected.address.line1 }),
                    selected.address.line2 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-700 text-xs", children: selected.address.line2 }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-gray-700 text-xs", children: [
                      selected.address.city,
                      ", ",
                      selected.address.state,
                      " ",
                      selected.address.pincode
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-gray-500 mb-2 font-semibold uppercase tracking-wide", children: [
                    "Products (",
                    selected.items.length,
                    ")"
                  ] }),
                  selected.items.map((item) => {
                    const product = PRODUCTS_SEED_DATA.find(
                      (p) => p.id === item.productId
                    );
                    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "flex justify-between bg-gray-50 rounded-lg px-3 py-2 mb-1 text-xs items-center gap-2",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-gray-800 flex-1", children: [
                            (product == null ? void 0 : product.name) ?? `Product #${item.productId}`,
                            " ×",
                            item.quantity
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold shrink-0", children: formatPrice(item.price * item.quantity) })
                        ]
                      },
                      item.productId
                    );
                  }),
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
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 text-xs", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-50 rounded-xl p-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 mb-1", children: "Payment" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: selected.paymentMethod === "stripe" ? "Online / Stripe" : "Cash on Delivery" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-50 rounded-xl p-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 mb-1", children: "Order Date" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: formatDate(selected.createdAt) })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      variant: "outline",
                      size: "sm",
                      className: "flex-1 text-xs",
                      onClick: () => void changeStatus(selected, "confirmed"),
                      disabled: selected.status !== "pending" || updatingId === selected.id,
                      "data-ocid": "adminp.orders.detail.confirm_button",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5 mr-1" }),
                        " Confirm"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      variant: "outline",
                      className: "flex-1 text-xs",
                      size: "sm",
                      onClick: () => setSelected(null),
                      "data-ocid": "adminp.orders.detail.close_button",
                      children: "Close"
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
  AdminPOrders as default
};
