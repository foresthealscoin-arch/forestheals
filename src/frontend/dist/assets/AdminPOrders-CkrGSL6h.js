import { Z as useAdminPStore, r as reactExports, j as jsxRuntimeExports, a as Button, u as ue } from "./index-BTLW_NIC.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-DiMklLnQ.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-BX7DqIsr.js";
import { A as AdminPLayout } from "./AdminPLayout-DuXyq7Yf.js";
import { S as ShoppingCart } from "./shopping-cart-D31XYOt2.js";
import { E as Eye } from "./eye-Bl9RwSKM.js";
import { C as CircleCheck } from "./circle-check-BBKQs0Vb.js";
import { P as Package } from "./package-CJHu-mD6.js";
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
import "./users-CPUsLN16.js";
import "./star-B8b4SvdS.js";
const STATUSES = [
  "Pending",
  "Confirmed",
  "Processing",
  "Packed",
  "Shipped",
  "Delivered",
  "Cancelled",
  "Returned",
  "Refunded"
];
const STATUS_COLOR = {
  Pending: "bg-yellow-100 text-yellow-800",
  Confirmed: "bg-blue-100 text-blue-800",
  Processing: "bg-purple-100 text-purple-800",
  Packed: "bg-indigo-100 text-indigo-800",
  Shipped: "bg-cyan-100 text-cyan-800",
  Delivered: "bg-green-100 text-green-800",
  Cancelled: "bg-red-100 text-red-800",
  Returned: "bg-orange-100 text-orange-800",
  Refunded: "bg-gray-100 text-gray-600"
};
function AdminPOrders() {
  const orders = useAdminPStore((s) => s.orders);
  const updateOrder = useAdminPStore((s) => s.updateOrder);
  const [filter, setFilter] = reactExports.useState("all");
  const [selected, setSelected] = reactExports.useState(null);
  const filtered = filter === "all" ? orders : orders.filter((o) => o.status === filter);
  function changeStatus(order, status) {
    updateOrder({ ...order, status });
    ue.success(`Order ${order.id} marked as ${status}`);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AdminPLayout, { title: "Orders", subtitle: `${orders.length} total orders`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-wrap gap-3 mb-4",
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
              STATUSES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s, children: s }, s))
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-gray-500 self-center", children: [
            "Showing ",
            filtered.length,
            " orders"
          ] })
        ]
      }
    ),
    filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-white rounded-2xl border border-gray-100 p-14 text-center",
        "data-ocid": "adminp.orders.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "w-10 h-10 text-gray-300 mx-auto mb-3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500", children: "No orders found for this filter" })
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
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3 font-mono text-xs text-gray-500", children: order.id }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 hidden md:table-cell font-medium text-gray-800 text-xs", children: order.customer }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 hidden lg:table-cell text-gray-500 text-xs", children: order.createdAt }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-right font-semibold text-gray-900", children: [
              "₹",
              order.total.toLocaleString("en-IN")
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 hidden sm:table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `text-xs px-2 py-0.5 rounded-full font-medium ${order.paymentMethod === "Online" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`,
                children: order.paymentMethod
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: order.status,
                onValueChange: (v) => changeStatus(order, v),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SelectTrigger,
                    {
                      className: `h-7 text-xs w-32 border-0 px-2 rounded-full font-medium ${STATUS_COLOR[order.status] ?? "bg-gray-100 text-gray-600"}`,
                      "data-ocid": `adminp.orders.item.${i + 1}.status_select`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: STATUSES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s, children: s }, s)) })
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
              order.status === "Pending" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "sm",
                  className: "h-7 text-xs gap-1 bg-green-600 hover:bg-green-700",
                  onClick: () => changeStatus(order, "Confirmed"),
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
            " Order ",
            selected == null ? void 0 : selected.id
          ] }) }),
          selected && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 pt-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-50 rounded-xl p-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 mb-1", children: "Customer" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-gray-900", children: selected.customer }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 text-xs", children: selected.email }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 text-xs", children: selected.phone })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-50 rounded-xl p-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 mb-1", children: "Delivery Address" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-700 text-xs", children: selected.address }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-gray-700 text-xs", children: [
                  selected.city,
                  ", ",
                  selected.state,
                  " ",
                  selected.pincode
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 mb-2 font-semibold uppercase tracking-wide", children: "Products" }),
              selected.products.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex justify-between bg-gray-50 rounded-lg px-3 py-2 mb-1 text-xs",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-gray-800", children: [
                      item.name,
                      " ×",
                      item.qty
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold", children: [
                      "₹",
                      (item.price * item.qty).toLocaleString("en-IN")
                    ] })
                  ]
                },
                item.name
              )),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between font-bold px-3 py-2 border-t border-gray-100 text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[#004a38]", children: [
                  "₹",
                  selected.total.toLocaleString("en-IN")
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 text-xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-50 rounded-xl p-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 mb-1", children: "Payment" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: selected.paymentMethod }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium ${selected.paymentStatus === "Paid" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`,
                    children: selected.paymentStatus
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-50 rounded-xl p-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 mb-1", children: "Tracking ID" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium font-mono", children: selected.trackingId || "—" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-gray-500 mt-1", children: [
                  "Ordered: ",
                  selected.createdAt
                ] })
              ] })
            ] }),
            selected.notes && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-yellow-50 border border-yellow-100 rounded-xl p-3 text-xs text-yellow-800", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Notes:" }),
              " ",
              selected.notes
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                className: "w-full",
                onClick: () => setSelected(null),
                "data-ocid": "adminp.orders.detail.close_button",
                children: "Close"
              }
            )
          ] })
        ]
      }
    ) })
  ] });
}
export {
  AdminPOrders as default
};
