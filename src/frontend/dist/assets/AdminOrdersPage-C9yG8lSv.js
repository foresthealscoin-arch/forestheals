import { r as reactExports, j as jsxRuntimeExports, m as motion, B as Badge, C as ChevronDown, a as Button } from "./index-Oxc-_oxi.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-D5S7-Nn1.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-Bsuph0kU.js";
import { S as Skeleton } from "./skeleton-DItXWvDl.js";
import { c as useAllOrders } from "./useOrders-BU3bpvql.js";
import { a as formatDate, f as formatPrice, b as getOrderStatusColor, c as formatDateTime } from "./formatters-C5vW1ZnJ.js";
import { AdminSidebar } from "./AdminDashboardPage-BPsJsC0y.js";
import { S as ShoppingCart } from "./shopping-cart-DpA4wU_V.js";
import { C as CircleX } from "./circle-x-DjJ94ety.js";
import { C as CircleCheck } from "./circle-check-dPMw8Eeh.js";
import { T as Truck } from "./truck-DXSgzoOp.js";
import { C as Clock } from "./clock-CgG0A1UB.js";
import { E as Eye } from "./eye-C8re7zjK.js";
import { P as Package } from "./package-6xCQkTPQ.js";
import { M as MapPin } from "./map-pin-Bhr0Ongf.js";
import { C as CreditCard } from "./credit-card-BWIcCD6L.js";
import "./index-B6-06I7M.js";
import "./index-BtdL0eLz.js";
import "./index-DYUerbpP.js";
import "./index-njhBbO9Y.js";
import "./index-BIglNuiB.js";
import "./index-DvWPYnjA.js";
import "./index-D8FRnOyd.js";
import "./check-DKcnpQxu.js";
import "./backend-BS-t6_G-.js";
import "./useMutation-C8tWLAXr.js";
import "./users-Dm9XPlxR.js";
import "./star-DV5fN0x3.js";
import "./trending-up-CreNqbnI.js";
import "./arrow-right-Byi3z3nZ.js";
import "./plus-C8NM5nzO.js";
const STATUS_OPTIONS = [
  "pending",
  "confirmed",
  "shipped",
  "delivered",
  "cancelled"
];
const STATUS_ICONS = {
  pending: Clock,
  confirmed: CircleCheck,
  shipped: Truck,
  delivered: CircleCheck,
  cancelled: CircleX
};
const STATUS_LABELS = {
  pending: "Pending",
  confirmed: "Confirmed",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled"
};
function AdminOrdersPage() {
  const { data: orders, isLoading } = useAllOrders();
  const [statusFilter, setStatusFilter] = reactExports.useState("all");
  const [selectedOrder, setSelectedOrder] = reactExports.useState(null);
  const [localStatuses, setLocalStatuses] = reactExports.useState({});
  const filtered = (orders ?? []).filter((o) => {
    if (statusFilter === "all") return true;
    const status = localStatuses[o.id] ?? o.status;
    return status === statusFilter;
  });
  function getStatus(order) {
    return localStatuses[order.id] ?? order.status;
  }
  function updateStatus(orderId, status) {
    setLocalStatuses((prev) => ({ ...prev, [orderId]: status }));
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AdminSidebar, { active: "/admin/orders" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "flex-1 overflow-auto", "data-ocid": "admin.orders.page", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border px-8 py-5 flex items-center justify-between gap-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold text-foreground", children: "Orders" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-0.5", children: [
          (orders ?? []).length,
          " total orders"
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-8 space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "flex items-center gap-3",
            "data-ocid": "admin.orders.filters",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: statusFilter, onValueChange: setStatusFilter, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SelectTrigger,
                {
                  className: "w-44",
                  "data-ocid": "admin.orders.status_filter_select",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All statuses" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All statuses" }),
                STATUS_OPTIONS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s, children: STATUS_LABELS[s] }, s))
              ] })
            ] })
          }
        ),
        isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-14 w-full rounded-xl" }, i)) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-card rounded-2xl border border-border p-14 text-center",
            "data-ocid": "admin.orders.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "w-10 h-10 text-muted-foreground mx-auto mb-3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground mb-1", children: "No orders found" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Try changing the filter or wait for new orders" })
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card rounded-2xl border border-border shadow-soft overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "table",
          {
            className: "w-full text-sm",
            "data-ocid": "admin.orders.table",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-muted/40 text-muted-foreground text-xs uppercase tracking-wide border-b border-border", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-5 py-3 font-medium", children: "Order ID" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-medium hidden md:table-cell", children: "Customer" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-medium hidden lg:table-cell", children: "Date" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-center px-4 py-3 font-medium hidden sm:table-cell", children: "Items" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-medium", children: "Total" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-medium hidden md:table-cell", children: "Payment" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-medium", children: "Status" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-medium", children: "Actions" })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: filtered.map((order, i) => {
                const status = getStatus(order);
                const Icon = STATUS_ICONS[status];
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.tr,
                  {
                    initial: { opacity: 0 },
                    animate: { opacity: 1 },
                    transition: { delay: i * 0.03 },
                    "data-ocid": `admin.orders.item.${i + 1}`,
                    className: "border-t border-border hover:bg-muted/20 transition-colors",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-5 py-3 font-mono text-xs text-muted-foreground", children: [
                        "#",
                        String(order.id).slice(-7)
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 font-mono text-xs hidden md:table-cell truncate max-w-[100px]", children: [
                        order.userId.slice(0, 12),
                        "…"
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground text-xs hidden lg:table-cell whitespace-nowrap", children: formatDate(order.createdAt) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-center hidden sm:table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "text-xs", children: [
                        order.items.length,
                        " ",
                        order.items.length === 1 ? "item" : "items"
                      ] }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right font-semibold", children: formatPrice(order.totalAmount) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 hidden md:table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: `text-xs font-medium px-2 py-0.5 rounded-full ${order.paymentMethod === "stripe" ? "bg-primary/10 text-primary" : "bg-secondary text-secondary-foreground"}`,
                          children: order.paymentMethod === "stripe" ? "Stripe" : "COD"
                        }
                      ) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Select,
                        {
                          value: status,
                          onValueChange: (v) => updateStatus(order.id, v),
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsxs(
                              SelectTrigger,
                              {
                                className: `h-7 text-xs border-0 w-32 px-2 rounded-full font-medium ${getOrderStatusColor(status)}`,
                                "data-ocid": `admin.orders.item.${i + 1}.status_select`,
                                children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                                    /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-3 h-3" }),
                                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                                  ] }),
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-3 h-3 ml-auto opacity-60" })
                                ]
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: STATUS_OPTIONS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s, children: STATUS_LABELS[s] }, s)) })
                          ]
                        }
                      ) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Button,
                        {
                          type: "button",
                          variant: "ghost",
                          size: "sm",
                          className: "h-7 text-xs gap-1",
                          onClick: () => setSelectedOrder(order),
                          "data-ocid": `admin.orders.item.${i + 1}.view_button`,
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-3 h-3" }),
                            " View"
                          ]
                        }
                      ) })
                    ]
                  },
                  order.id
                );
              }) })
            ]
          }
        ) }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        open: !!selectedOrder,
        onOpenChange: () => setSelectedOrder(null),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          DialogContent,
          {
            className: "max-w-xl max-h-[90vh] overflow-y-auto",
            "data-ocid": "admin.orders.detail.dialog",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-4 h-4" }),
                "Order #",
                selectedOrder ? String(selectedOrder.id).slice(-7) : ""
              ] }) }),
              selectedOrder && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5 pt-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 text-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded-xl p-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1 font-medium", children: "Placed on" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground", children: formatDateTime(selectedOrder.createdAt) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded-xl p-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1 font-medium", children: "Status" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: `inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getOrderStatusColor(getStatus(selectedOrder))}`,
                        children: STATUS_LABELS[getStatus(selectedOrder)]
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-foreground mb-3 flex items-center gap-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-4 h-4" }),
                    " Order Items"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: selectedOrder.items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "flex justify-between items-center bg-muted/30 rounded-xl px-4 py-2.5 text-sm",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground", children: [
                          "Product #",
                          item.productId
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
                          "×",
                          item.quantity
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: formatPrice(item.price * item.quantity) })
                      ]
                    },
                    item.productId
                  )) }),
                  selectedOrder.discountAmount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center px-4 py-2 text-sm text-primary", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                      "Discount",
                      " ",
                      selectedOrder.couponCode ? `(${selectedOrder.couponCode})` : ""
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                      "− ",
                      formatPrice(selectedOrder.discountAmount)
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center px-4 py-2 text-sm font-bold border-t border-border mt-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: formatPrice(selectedOrder.totalAmount) })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-foreground mb-3 flex items-center gap-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-4 h-4" }),
                    " Delivery Address"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded-xl p-4 text-sm space-y-0.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: selectedOrder.address.fullName }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: selectedOrder.address.phone }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
                      selectedOrder.address.line1,
                      selectedOrder.address.line2 ? `, ${selectedOrder.address.line2}` : ""
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
                      selectedOrder.address.city,
                      ", ",
                      selectedOrder.address.state,
                      " ",
                      "– ",
                      selectedOrder.address.pincode
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: selectedOrder.address.country })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-foreground mb-3 flex items-center gap-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-4 h-4" }),
                    " Payment Info"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded-xl p-4 text-sm space-y-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Method" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: selectedOrder.paymentMethod === "stripe" ? "Stripe (Card)" : "Cash on Delivery" })
                    ] }),
                    selectedOrder.stripePaymentId && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Payment ID" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs", children: selectedOrder.stripePaymentId })
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    variant: "outline",
                    className: "w-full",
                    onClick: () => setSelectedOrder(null),
                    "data-ocid": "admin.orders.detail.close_button",
                    children: "Close"
                  }
                )
              ] })
            ]
          }
        )
      }
    )
  ] });
}
export {
  AdminOrdersPage as default
};
