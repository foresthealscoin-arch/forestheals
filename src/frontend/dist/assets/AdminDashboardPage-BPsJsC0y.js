import { t as LayoutDashboard, P as PRODUCTS_SEED_DATA, j as jsxRuntimeExports, m as motion, L as Link, a as Button, f as useNavigate, k as useAuthStore, v as useInternetIdentity, p as LogOut } from "./index-Oxc-_oxi.js";
import { S as Skeleton } from "./skeleton-DItXWvDl.js";
import { c as useAllOrders } from "./useOrders-BU3bpvql.js";
import { f as formatPrice, a as formatDate, b as getOrderStatusColor } from "./formatters-C5vW1ZnJ.js";
import { P as Package } from "./package-6xCQkTPQ.js";
import { S as ShoppingCart } from "./shopping-cart-DpA4wU_V.js";
import { U as Users } from "./users-Dm9XPlxR.js";
import { S as Star } from "./star-DV5fN0x3.js";
import { T as TrendingUp } from "./trending-up-CreNqbnI.js";
import { C as Clock } from "./clock-CgG0A1UB.js";
import { A as ArrowRight } from "./arrow-right-Byi3z3nZ.js";
import { C as CircleX } from "./circle-x-DjJ94ety.js";
import { C as CircleCheck } from "./circle-check-dPMw8Eeh.js";
import { T as Truck } from "./truck-DXSgzoOp.js";
import { E as Eye } from "./eye-C8re7zjK.js";
import { P as Plus } from "./plus-C8NM5nzO.js";
import "./backend-BS-t6_G-.js";
import "./useMutation-C8tWLAXr.js";
const ADMIN_NAV = [
  { icon: LayoutDashboard, label: "Dashboard", to: "/admin" },
  { icon: Package, label: "Products", to: "/admin/products" },
  { icon: ShoppingCart, label: "Orders", to: "/admin/orders" },
  { icon: Users, label: "Users", to: "/admin/users" },
  { icon: Star, label: "Reviews", to: "/admin/reviews" }
];
function AdminSidebar({ active }) {
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const { clear } = useInternetIdentity();
  function handleLogout() {
    clear();
    logout();
    navigate({ to: "/" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "w-64 min-h-screen bg-primary flex flex-col shadow-elevated flex-shrink-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 border-b border-primary-foreground/10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: "/assets/logo.png",
          alt: "Forestheals",
          className: "h-8 w-auto object-contain brightness-0 invert"
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary-foreground/55 text-xs mt-1.5", children: "Admin Panel" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "flex-1 p-4 space-y-0.5", "data-ocid": "admin.sidebar", children: ADMIN_NAV.map((item) => {
      const Icon = item.icon;
      const isActive = active === item.to;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: item.to,
          "data-ocid": `admin.nav.${item.label.toLowerCase()}`,
          className: `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-smooth ${isActive ? "bg-primary-foreground/15 text-primary-foreground" : "text-primary-foreground/65 hover:bg-primary-foreground/10 hover:text-primary-foreground"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-4 h-4 flex-shrink-0" }),
            item.label
          ]
        },
        item.to
      );
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 border-t border-primary-foreground/10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: handleLogout,
        "data-ocid": "admin.logout_button",
        className: "flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-sm font-medium text-primary-foreground/65 hover:bg-destructive/20 hover:text-primary-foreground transition-smooth",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-4 h-4" }),
          "Logout"
        ]
      }
    ) })
  ] });
}
const STATUS_ICONS = {
  pending: Clock,
  confirmed: CircleCheck,
  shipped: Truck,
  delivered: CircleCheck,
  cancelled: CircleX
};
function AdminDashboardPage() {
  const { data: orders, isLoading } = useAllOrders();
  const totalRevenue = (orders == null ? void 0 : orders.reduce((s, o) => s + o.totalAmount, 0)) ?? 0;
  const pendingCount = (orders == null ? void 0 : orders.filter((o) => o.status === "pending").length) ?? 0;
  const statCards = [
    { label: "Total Orders", value: (orders == null ? void 0 : orders.length) ?? 0, icon: ShoppingCart },
    {
      label: "Total Revenue",
      value: formatPrice(totalRevenue),
      icon: TrendingUp
    },
    {
      label: "Total Products",
      value: PRODUCTS_SEED_DATA.length,
      icon: Package
    },
    { label: "Pending Orders", value: pendingCount, icon: Clock }
  ];
  const recentOrders = [...orders ?? []].sort((a, b) => b.createdAt - a.createdAt).slice(0, 5);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AdminSidebar, { active: "/admin" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "flex-1 overflow-auto", "data-ocid": "admin.dashboard.page", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border-b border-border px-8 py-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold text-foreground", children: "Dashboard Overview" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "Welcome back — here's what's happening with Forestheals" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-8 space-y-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "grid grid-cols-2 lg:grid-cols-4 gap-5",
            "data-ocid": "admin.stats.row",
            children: statCards.map((card, i) => {
              const Icon = card.icon;
              return /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  initial: { opacity: 0, y: 16 },
                  animate: { opacity: 1, y: 0 },
                  transition: { delay: i * 0.08 },
                  "data-ocid": `admin.stats.item.${i + 1}`,
                  className: "glass-card rounded-2xl p-5 shadow-soft",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-medium uppercase tracking-wide", children: card.label }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-primary mt-1", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-7 w-16 mt-1" }) : card.value })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-5 h-5 text-primary" }) })
                  ] })
                },
                card.label
              );
            })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 bg-card rounded-2xl border border-border shadow-soft overflow-hidden", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-6 py-4 border-b border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-foreground", children: "Recent Orders" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/orders", "data-ocid": "admin.view_all_orders_link", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "ghost",
                  size: "sm",
                  className: "gap-1 text-primary text-xs",
                  children: [
                    "View all ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3 h-3" })
                  ]
                }
              ) })
            ] }),
            isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 space-y-3", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full" }, i)) }) : recentOrders.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "p-12 text-center",
                "data-ocid": "admin.recent_orders.empty_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "w-8 h-8 text-muted-foreground mx-auto mb-2" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "No orders yet" })
                ]
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-muted/40 text-muted-foreground text-xs uppercase tracking-wide", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-6 py-3 font-medium", children: "Order ID" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-medium", children: "Customer" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-medium", children: "Date" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-medium", children: "Amount" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-medium", children: "Status" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-medium", children: "Action" })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: recentOrders.map((order, i) => {
                const Icon = STATUS_ICONS[order.status];
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "tr",
                  {
                    "data-ocid": `admin.recent_orders.item.${i + 1}`,
                    className: "border-t border-border hover:bg-muted/20 transition-colors",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-6 py-3 font-mono text-xs text-muted-foreground", children: [
                        "#",
                        String(order.id).slice(-6)
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 font-mono text-xs truncate max-w-[80px]", children: [
                        order.userId.slice(0, 10),
                        "…"
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground text-xs", children: formatDate(order.createdAt) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right font-semibold text-sm", children: formatPrice(order.totalAmount) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "span",
                        {
                          className: `inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getOrderStatusColor(order.status)}`,
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-3 h-3" }),
                            order.status
                          ]
                        }
                      ) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Link,
                        {
                          to: "/admin/orders",
                          "data-ocid": `admin.order_view.${i + 1}`,
                          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            Button,
                            {
                              variant: "ghost",
                              size: "sm",
                              className: "h-7 text-xs gap-1",
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-3 h-3" }),
                                " View"
                              ]
                            }
                          )
                        }
                      ) })
                    ]
                  },
                  order.id
                );
              }) })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl border border-border shadow-soft p-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-foreground mb-5", children: "Quick Actions" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/products", "data-ocid": "admin.quick_add_product", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "w-full justify-start gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
                " Add Product"
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/orders", "data-ocid": "admin.quick_view_orders", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "outline",
                  className: "w-full justify-start gap-2 mt-1",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "w-4 h-4" }),
                    " View All Orders"
                  ]
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/admin/reviews",
                  "data-ocid": "admin.quick_manage_reviews",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      variant: "outline",
                      className: "w-full justify-start gap-2 mt-1",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-4 h-4" }),
                        " Manage Reviews"
                      ]
                    }
                  )
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 pt-6 border-t border-border space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3", children: "Quick Stats" }),
              [
                { label: "Total Products", value: PRODUCTS_SEED_DATA.length },
                { label: "Pending Orders", value: pendingCount },
                { label: "Flash Sales Active", value: 0 }
              ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex justify-between text-sm",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: item.label }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: item.value })
                  ]
                },
                item.label
              ))
            ] })
          ] })
        ] })
      ] })
    ] })
  ] });
}
export {
  ADMIN_NAV,
  AdminSidebar,
  AdminDashboardPage as default
};
