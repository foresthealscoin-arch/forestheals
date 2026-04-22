import { c as createLucideIcon, j as jsxRuntimeExports } from "./index-CfU2kVIJ.js";
import { S as Skeleton } from "./skeleton-Dbe_tSkr.js";
import { u as useAdminDashboard, a as useAdminOrders, b as useAdminTasks, c as useAdminInventory, A as AdminPLayout, d as APKpiCard, S as ShoppingCart, C as ChartColumn, W as Warehouse } from "./AdminPLayout-CIt5RHz_.js";
import { f as formatPrice } from "./formatters-CN9TrYCS.js";
import { R as RefreshCw } from "./refresh-cw-CczYOB5W.js";
import { T as TrendingUp } from "./trending-up-DpeIOp36.js";
import { C as Clock } from "./clock-DXcQvN8f.js";
import { P as Package } from "./package-C5tkAuNr.js";
import { U as Users } from "./users-BTrxV2BM.js";
import { T as Tag } from "./tag-RoRywvnF.js";
import { C as CircleCheck } from "./circle-check-BnQJU1pP.js";
import { C as CircleX } from "./circle-x-ByMEtOgM.js";
import "./useMutation-DVPdZiQH.js";
import "./convert-Cs1e6Uux.js";
import "./leaf-BdKoN6HX.js";
import "./chevron-right-DNGmMEAY.js";
import "./star-D6nQNTvb.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["line", { x1: "12", x2: "12", y1: "2", y2: "22", key: "7eqyqh" }],
  ["path", { d: "M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6", key: "1b0p4s" }]
];
const DollarSign = createLucideIcon("dollar-sign", __iconNode);
const STATUS_COLOR = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  shipped: "bg-cyan-100 text-cyan-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800"
};
const STATUS_LABEL = {
  pending: "Pending",
  confirmed: "Confirmed",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled"
};
function AdminPDashboard() {
  const { data: kpis, isLoading: kpisLoading, refetch } = useAdminDashboard();
  const { data: orders = [], isLoading: ordersLoading } = useAdminOrders();
  const { data: tasks = [] } = useAdminTasks();
  const { data: inventory = [] } = useAdminInventory();
  const recentOrders = [...orders].slice(0, 6);
  const pendingTasks = tasks.filter((t) => !t.completed);
  const lowStockItems = inventory.filter((i) => i.lowStockFlag);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    AdminPLayout,
    {
      title: "Dashboard Overview",
      subtitle: "Welcome back — here's your Forestheals business at a glance",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs text-green-700 bg-green-50 border border-green-100 rounded-full px-3 py-1 w-fit", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-green-500 animate-pulse" }),
            "Live data — auto-refreshes every 30s",
            /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-3 h-3" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => void refetch(),
              className: "text-xs text-gray-500 hover:text-gray-800 flex items-center gap-1 transition-colors",
              "data-ocid": "adminp.dashboard.refresh_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-3.5 h-3.5" }),
                " Refresh"
              ]
            }
          )
        ] }),
        kpisLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mb-6", children: ["a", "b", "c", "d", "e", "f", "g", "h"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 w-full rounded-2xl" }, k)) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mb-6",
            "data-ocid": "adminp.dashboard.kpi_row",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                APKpiCard,
                {
                  label: "Total Revenue",
                  value: formatPrice((kpis == null ? void 0 : kpis.totalRevenue) ?? 0),
                  icon: TrendingUp,
                  color: "green"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                APKpiCard,
                {
                  label: "Total Orders",
                  value: (kpis == null ? void 0 : kpis.totalOrders) ?? 0,
                  icon: ShoppingCart,
                  color: "blue"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                APKpiCard,
                {
                  label: "Pending Orders",
                  value: (kpis == null ? void 0 : kpis.pendingOrderCount) ?? 0,
                  icon: Clock,
                  color: "yellow"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                APKpiCard,
                {
                  label: "Today's Revenue",
                  value: formatPrice((kpis == null ? void 0 : kpis.todayRevenue) ?? 0),
                  icon: DollarSign,
                  color: "green"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                APKpiCard,
                {
                  label: "Total Products",
                  value: (kpis == null ? void 0 : kpis.totalProducts) ?? 0,
                  sub: `${(kpis == null ? void 0 : kpis.lowStockCount) ?? 0} low stock`,
                  icon: Package,
                  color: "blue"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                APKpiCard,
                {
                  label: "Total Customers",
                  value: (kpis == null ? void 0 : kpis.totalCustomers) ?? 0,
                  icon: Users,
                  color: "green"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                APKpiCard,
                {
                  label: "Month Revenue",
                  value: formatPrice((kpis == null ? void 0 : kpis.monthRevenue) ?? 0),
                  sub: `${(kpis == null ? void 0 : kpis.monthOrders) ?? 0} orders`,
                  icon: ChartColumn,
                  color: "blue"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                APKpiCard,
                {
                  label: "Pending Reviews",
                  value: (kpis == null ? void 0 : kpis.pendingReviewCount) ?? 0,
                  icon: Tag,
                  color: "yellow"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                APKpiCard,
                {
                  label: "Week Revenue",
                  value: formatPrice((kpis == null ? void 0 : kpis.weekRevenue) ?? 0),
                  sub: `${(kpis == null ? void 0 : kpis.weekOrders) ?? 0} orders`,
                  icon: TrendingUp,
                  color: "green"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                APKpiCard,
                {
                  label: "Today's Orders",
                  value: (kpis == null ? void 0 : kpis.todayOrders) ?? 0,
                  icon: ShoppingCart,
                  color: "blue"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                APKpiCard,
                {
                  label: "Low Stock Items",
                  value: (kpis == null ? void 0 : kpis.lowStockCount) ?? 0,
                  icon: Warehouse,
                  color: "red"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                APKpiCard,
                {
                  label: "Pending Tasks",
                  value: pendingTasks.length,
                  icon: CircleCheck,
                  color: "yellow"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden",
              "data-ocid": "adminp.dashboard.recent_orders",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-4 border-b border-gray-100 flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-gray-900 text-sm", children: "Recent Orders" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "a",
                    {
                      href: "/admin-p/orders",
                      className: "text-xs text-[#004a38] hover:underline font-medium",
                      children: "View all →"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-gray-50 text-gray-500 text-xs uppercase tracking-wide border-b border-gray-100", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-5 py-2.5 font-medium", children: "Order" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2.5 font-medium hidden sm:table-cell", children: "Customer" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-2.5 font-medium", children: "Amount" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2.5 font-medium", children: "Status" })
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
                    ordersLoading ? ["a", "b", "c", "d"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-t border-gray-50", children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 4, className: "px-5 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full rounded" }) }) }, k)) : recentOrders.map((order, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "tr",
                      {
                        "data-ocid": `adminp.dashboard.order.item.${i + 1}`,
                        className: "border-t border-gray-50 hover:bg-gray-50/60 transition-colors",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-5 py-3 font-mono text-xs text-gray-500", children: [
                            "#",
                            order.id
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 hidden sm:table-cell text-gray-700 font-medium text-xs", children: order.address.fullName || `${order.userId.slice(0, 12)}…` }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right font-semibold text-gray-900 text-xs", children: formatPrice(order.totalAmount) }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "span",
                            {
                              className: `px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_COLOR[order.status] ?? "bg-gray-100 text-gray-700"}`,
                              children: STATUS_LABEL[order.status] ?? order.status
                            }
                          ) })
                        ]
                      },
                      order.id
                    )),
                    !ordersLoading && recentOrders.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "td",
                      {
                        colSpan: 4,
                        className: "px-5 py-10 text-center text-gray-400 text-sm",
                        children: "No orders yet — orders placed by customers will appear here."
                      }
                    ) })
                  ] })
                ] }) })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border border-gray-100 shadow-sm p-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-semibold text-gray-900 text-sm mb-3 flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-4 h-4 text-orange-500" }),
                " Low Stock Alerts"
              ] }),
              lowStockItems.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500", children: "All stock levels are good!" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: lowStockItems.slice(0, 5).map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex items-center justify-between text-xs",
                  "data-ocid": `adminp.dashboard.lowstock.${item.productId}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-700 truncate max-w-[140px]", children: item.productName }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: `font-semibold ${item.outOfStockFlag ? "text-red-600" : "text-orange-600"}`,
                        children: item.outOfStockFlag ? "Out" : `${item.availableStock} left`
                      }
                    )
                  ]
                },
                item.productId
              )) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border border-gray-100 shadow-sm p-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-semibold text-gray-900 text-sm mb-3 flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 text-[#004a38]" }),
                " Pending Tasks"
              ] }),
              pendingTasks.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500", children: "All tasks done! 🎉" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: pendingTasks.slice(0, 4).map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 text-xs", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `px-1.5 py-0.5 rounded text-xs font-medium flex-shrink-0 ${t.priority === "High" ? "bg-red-100 text-red-700" : t.priority === "Medium" ? "bg-yellow-100 text-yellow-700" : "bg-gray-100 text-gray-600"}`,
                    children: t.priority
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "text-gray-700 line-clamp-1",
                    "data-ocid": `adminp.dashboard.task.${i + 1}`,
                    children: t.title
                  }
                )
              ] }, t.id)) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border border-gray-100 shadow-sm p-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-semibold text-gray-900 text-sm mb-3 flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-4 h-4 text-blue-500" }),
                " Order Summary"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: [
                {
                  label: "Delivered",
                  status: "delivered",
                  cls: "text-green-600"
                },
                { label: "Shipped", status: "shipped", cls: "text-cyan-600" },
                {
                  label: "Cancelled",
                  status: "cancelled",
                  cls: "text-red-600"
                }
              ].map((row) => {
                const count = orders.filter(
                  (o) => o.status === row.status
                ).length;
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex justify-between text-xs text-gray-600",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: row.label }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `font-semibold ${row.cls}`, children: count })
                    ]
                  },
                  row.label
                );
              }) })
            ] })
          ] })
        ] })
      ]
    }
  );
}
export {
  AdminPDashboard as default
};
