import { c as createLucideIcon, x as useAdminPStore, j as jsxRuntimeExports } from "./index-Oxc-_oxi.js";
import { c as useAllOrders } from "./useOrders-BU3bpvql.js";
import { f as formatPrice } from "./formatters-C5vW1ZnJ.js";
import { A as AdminPLayout, a as APKpiCard, C as ChartColumn, W as Warehouse } from "./AdminPLayout-DOfPyUMC.js";
import { R as RefreshCw } from "./refresh-cw-BrDB5UaA.js";
import { T as TrendingUp } from "./trending-up-CreNqbnI.js";
import { S as ShoppingCart } from "./shopping-cart-DpA4wU_V.js";
import { C as Clock } from "./clock-CgG0A1UB.js";
import { P as Package } from "./package-6xCQkTPQ.js";
import { U as Users } from "./users-Dm9XPlxR.js";
import { T as Tag } from "./tag-CStEkWET.js";
import { C as CircleCheck } from "./circle-check-dPMw8Eeh.js";
import { C as CircleX } from "./circle-x-DjJ94ety.js";
import "./backend-BS-t6_G-.js";
import "./useMutation-C8tWLAXr.js";
import "./leaf-N_oh7OWh.js";
import "./chevron-right-D_aTDRZh.js";
import "./star-DV5fN0x3.js";
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
function AdminPDashboard() {
  const products = useAdminPStore((s) => s.products);
  const customers = useAdminPStore((s) => s.customers);
  const expenses = useAdminPStore((s) => s.expenses);
  const tasks = useAdminPStore((s) => s.tasks);
  const { data: orders = [], isLoading, refetch } = useAllOrders();
  const totalRevenue = orders.reduce((s, o) => s + o.totalAmount, 0);
  const totalExpenses = expenses.reduce((s, e) => s + e.amount, 0);
  const netProfit = totalRevenue - totalExpenses;
  const pending = orders.filter((o) => o.status === "pending").length;
  const completed = orders.filter((o) => o.status === "delivered").length;
  const cancelled = orders.filter((o) => o.status === "cancelled").length;
  const adSpend = expenses.filter((e) => e.category === "Ad Spend").reduce((s, e) => s + e.amount, 0);
  const lowStock = products.filter((p) => p.stock < 30).length;
  const pendingTasks = tasks.filter((t) => !t.completed).length;
  const avgOrder = orders.length > 0 ? Math.round(totalRevenue / orders.length) : 0;
  const recentOrders = [...orders].slice(0, 6);
  const statusColor = {
    pending: "bg-yellow-100 text-yellow-800",
    confirmed: "bg-blue-100 text-blue-800",
    shipped: "bg-cyan-100 text-cyan-800",
    delivered: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800"
  };
  const statusLabel = {
    pending: "Pending",
    confirmed: "Confirmed",
    shipped: "Shipped",
    delivered: "Delivered",
    cancelled: "Cancelled"
  };
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
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mb-6",
            "data-ocid": "adminp.dashboard.kpi_row",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                APKpiCard,
                {
                  label: "Total Revenue",
                  value: formatPrice(totalRevenue),
                  icon: TrendingUp,
                  color: "green",
                  "data-ocid": "adminp.kpi.revenue"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                APKpiCard,
                {
                  label: "Total Orders",
                  value: isLoading ? "…" : orders.length,
                  sub: `${completed} delivered`,
                  icon: ShoppingCart,
                  color: "blue"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                APKpiCard,
                {
                  label: "Pending Orders",
                  value: isLoading ? "…" : pending,
                  icon: Clock,
                  color: "yellow"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                APKpiCard,
                {
                  label: "Net Profit",
                  value: formatPrice(netProfit),
                  icon: DollarSign,
                  color: netProfit >= 0 ? "green" : "red"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                APKpiCard,
                {
                  label: "Total Products",
                  value: products.length,
                  sub: `${lowStock} low stock`,
                  icon: Package,
                  color: "blue"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                APKpiCard,
                {
                  label: "Total Customers",
                  value: customers.length,
                  icon: Users,
                  color: "green"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                APKpiCard,
                {
                  label: "Avg Order Value",
                  value: formatPrice(avgOrder),
                  icon: ChartColumn,
                  color: "blue"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                APKpiCard,
                {
                  label: "Marketing Spend",
                  value: formatPrice(adSpend),
                  icon: Tag,
                  color: "yellow"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                APKpiCard,
                {
                  label: "Completed Orders",
                  value: isLoading ? "…" : completed,
                  icon: CircleCheck,
                  color: "green"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                APKpiCard,
                {
                  label: "Cancelled Orders",
                  value: isLoading ? "…" : cancelled,
                  icon: CircleX,
                  color: "red"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                APKpiCard,
                {
                  label: "Total Expenses",
                  value: formatPrice(totalExpenses),
                  icon: Warehouse,
                  color: "red"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                APKpiCard,
                {
                  label: "Pending Tasks",
                  value: pendingTasks,
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
                    recentOrders.map((order, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
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
                              className: `px-2 py-0.5 rounded-full text-xs font-medium ${statusColor[order.status] ?? "bg-gray-100 text-gray-700"}`,
                              children: statusLabel[order.status] ?? order.status
                            }
                          ) })
                        ]
                      },
                      order.id
                    )),
                    recentOrders.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "td",
                      {
                        colSpan: 4,
                        className: "px-5 py-10 text-center text-gray-400 text-sm",
                        children: isLoading ? "Loading orders…" : "No orders yet — orders placed by customers will appear here."
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
              products.filter((p) => p.stock < 30).length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500", children: "All stock levels are good!" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: products.filter((p) => p.stock < 30).slice(0, 5).map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex items-center justify-between text-xs",
                  "data-ocid": `adminp.dashboard.lowstock.${p.id}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-700 truncate max-w-[140px]", children: p.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-orange-600", children: [
                      p.stock,
                      " left"
                    ] })
                  ]
                },
                p.id
              )) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border border-gray-100 shadow-sm p-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-semibold text-gray-900 text-sm mb-3 flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 text-[#004a38]" }),
                " Pending Tasks"
              ] }),
              tasks.filter((t) => !t.completed).length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500", children: "All tasks done! 🎉" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: tasks.filter((t) => !t.completed).slice(0, 4).map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 text-xs", children: [
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
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { className: "w-4 h-4 text-blue-500" }),
                " Expense Breakdown"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: ["Ad Spend", "Packaging", "Shipping", "Salary", "Misc"].map(
                (cat) => {
                  const amt = expenses.filter((e) => e.category === cat).reduce((s, e) => s + e.amount, 0);
                  const pct = totalExpenses > 0 ? Math.round(amt / totalExpenses * 100) : 0;
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-gray-600 mb-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: cat }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium", children: [
                        formatPrice(amt),
                        " (",
                        pct,
                        "%)"
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 bg-gray-100 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "h-full bg-[#004a38] rounded-full transition-all duration-500",
                        style: { width: `${pct}%` }
                      }
                    ) })
                  ] }, cat);
                }
              ) })
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
