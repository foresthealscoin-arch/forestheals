import { c as createLucideIcon, r as reactExports, i as useAuthStore, j as jsxRuntimeExports, H as Heart, S as ShoppingBag, U as User, m as motion, n as useAuth, a as Button, o as LogOut, I as Input, L as Link, P as PRODUCTS_SEED_DATA, B as Badge } from "./index-BTLW_NIC.js";
import { L as Label } from "./label-BUCCGSyY.js";
import { S as Separator } from "./separator-CojwXxA6.js";
import { S as Skeleton } from "./skeleton-B_W_nVt9.js";
import { S as Switch } from "./switch-Bwl0-6DY.js";
import { a as useUserOrders } from "./useOrders-CumPQW3r.js";
import { f as formatPrice, b as getOrderStatusColor, a as formatDate } from "./formatters-C5vW1ZnJ.js";
import { P as Package } from "./package-CJHu-mD6.js";
import { T as Trash2 } from "./trash-2-BSOfqa-y.js";
import "./index-CdALTCxJ.js";
import "./index-DzxR8ZBH.js";
import "./useQuery-BNvAOOwo.js";
import "./useMutation-Cg-O1UYS.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M10.268 21a2 2 0 0 0 3.464 0", key: "vwvbt9" }],
  [
    "path",
    {
      d: "M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",
      key: "11g9vi"
    }
  ]
];
const Bell = createLucideIcon("bell", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",
      key: "1qme2f"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
];
const Settings = createLucideIcon("settings", __iconNode);
const TABS = [
  { id: "orders", label: "My Orders", icon: Package },
  { id: "wishlist", label: "Wishlist", icon: Heart },
  { id: "profile", label: "My Profile", icon: User },
  { id: "settings", label: "Settings", icon: Settings }
];
function OrdersTab() {
  const { data: orders, isLoading } = useUserOrders();
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "dashboard.orders.loading_state", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 w-full rounded-2xl" }, i)) });
  }
  if (!orders || orders.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "glass-card rounded-2xl p-14 text-center",
        "data-ocid": "dashboard.orders.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-12 h-12 text-muted-foreground mx-auto mb-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-lg mb-2", children: "No orders yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-6", children: "Start your wellness journey — your orders will appear here." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, "data-ocid": "dashboard.shop.button", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", children: "Browse Products" }) })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: orders.map((order, i) => {
    var _a;
    const firstProduct = PRODUCTS_SEED_DATA.find(
      (p) => {
        var _a2;
        return p.id === ((_a2 = order.items[0]) == null ? void 0 : _a2.productId);
      }
    );
    const extraCount = order.items.length - 1;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: i * 0.06 },
        className: "glass-card rounded-2xl p-4 sm:p-5 shadow-soft",
        "data-ocid": `dashboard.order.${i + 1}.row`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
          firstProduct && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: firstProduct.imageUrl,
              alt: firstProduct.name,
              className: "w-14 h-14 rounded-xl object-cover shrink-0"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap mb-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-semibold text-sm text-foreground", children: [
                "Order #",
                order.id
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  className: `text-xs ${getOrderStatusColor(order.status)} capitalize`,
                  children: order.status
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs capitalize", children: order.paymentMethod === "cod" ? "COD" : "Stripe" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mb-1.5", children: [
              formatDate(order.createdAt),
              " · ",
              order.items.length,
              " ",
              order.items.length === 1 ? "item" : "items"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground line-clamp-1", children: [
              (firstProduct == null ? void 0 : firstProduct.name) ?? `Product #${(_a = order.items[0]) == null ? void 0 : _a.productId}`,
              extraCount > 0 && ` +${extraCount} more`
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-primary text-base", children: formatPrice(order.totalAmount) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                variant: "outline",
                asChild: true,
                className: "mt-2",
                "data-ocid": `dashboard.order.${i + 1}.view_button`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Link,
                  {
                    to: "/dashboard/orders/$id",
                    params: { id: String(order.id) },
                    children: "View Details"
                  }
                )
              }
            )
          ] })
        ] })
      },
      order.id
    );
  }) });
}
function WishlistTab() {
  const wishlistProducts = PRODUCTS_SEED_DATA.slice(0, 3);
  const [removed, setRemoved] = reactExports.useState([]);
  const visible = wishlistProducts.filter((p) => !removed.includes(p.id));
  if (visible.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "glass-card rounded-2xl p-14 text-center",
        "data-ocid": "dashboard.wishlist.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-12 h-12 text-muted-foreground mx-auto mb-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-lg mb-2", children: "Your wishlist is empty" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-6", children: "Save products you love to buy them later." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, "data-ocid": "dashboard.wishlist.browse.button", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", children: "Explore Products" }) })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: visible.map((product, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 12 },
      animate: { opacity: 1, y: 0 },
      transition: { delay: i * 0.08 },
      className: "glass-card rounded-2xl overflow-hidden shadow-soft",
      "data-ocid": `dashboard.wishlist.item.${i + 1}.card`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: product.imageUrl,
              alt: product.name,
              className: "w-full h-36 object-cover"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setRemoved((prev) => [...prev, product.id]),
              className: "absolute top-2 right-2 w-7 h-7 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center hover:bg-destructive/10 transition-smooth",
              "aria-label": "Remove from wishlist",
              "data-ocid": `dashboard.wishlist.remove.${i + 1}.button`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5 text-destructive" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-sm text-foreground line-clamp-2 mb-1", children: product.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-primary text-sm mb-3", children: formatPrice(product.price) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "sm",
              className: "w-full",
              asChild: true,
              "data-ocid": `dashboard.wishlist.view.${i + 1}.button`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products/$id", params: { id: String(product.id) }, children: "View Product" })
            }
          )
        ] })
      ]
    },
    product.id
  )) });
}
function ProfileTab() {
  const { principal } = useAuthStore();
  const [name, setName] = reactExports.useState("Wellness Seeker");
  const [email, setEmail] = reactExports.useState("");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card rounded-2xl p-6 shadow-soft space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "w-16 h-16 rounded-2xl flex items-center justify-center shrink-0",
          style: { background: "oklch(0.28 0.09 162)" },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-8 h-8 text-primary-foreground" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-base", children: name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-mono truncate max-w-[220px] mt-0.5", children: principal ?? "Not connected" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "profile-name", className: "text-sm", children: "Display Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "profile-name",
            value: name,
            onChange: (e) => setName(e.target.value),
            className: "h-10 rounded-xl",
            "data-ocid": "dashboard.profile.name.input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "profile-email", className: "text-sm", children: [
          "Email Address",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-normal", children: "(optional)" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "profile-email",
            type: "email",
            placeholder: "you@example.com",
            value: email,
            onChange: (e) => setEmail(e.target.value),
            className: "h-10 rounded-xl",
            "data-ocid": "dashboard.profile.email.input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1 pt-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground", children: "Principal ID (read-only)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-muted/60 rounded-xl px-3 py-2.5 font-mono text-xs text-muted-foreground break-all", children: principal ?? "—" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        type: "button",
        className: "w-full",
        "data-ocid": "dashboard.profile.save_button",
        children: "Save Profile"
      }
    )
  ] });
}
function SettingsTab() {
  const { logout } = useAuth();
  const [notifOrders, setNotifOrders] = reactExports.useState(true);
  const [notifPromo, setNotifPromo] = reactExports.useState(false);
  const [notifHealth, setNotifHealth] = reactExports.useState(true);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card rounded-2xl p-6 shadow-soft", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-4 h-4 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground text-sm", children: "Notification Preferences" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: [
        {
          id: "notif-orders",
          label: "Order Updates",
          desc: "Shipping & delivery notifications",
          checked: notifOrders,
          onChange: setNotifOrders,
          ocid: "dashboard.settings.notif_orders.switch"
        },
        {
          id: "notif-promo",
          label: "Promotions & Offers",
          desc: "Flash sales and discount alerts",
          checked: notifPromo,
          onChange: setNotifPromo,
          ocid: "dashboard.settings.notif_promo.switch"
        },
        {
          id: "notif-health",
          label: "Wellness Tips",
          desc: "Ayurvedic tips and product guides",
          checked: notifHealth,
          onChange: setNotifHealth,
          ocid: "dashboard.settings.notif_health.switch"
        }
      ].map(({ id, label, desc, checked, onChange, ocid }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: desc })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Switch,
          {
            id,
            checked,
            onCheckedChange: onChange,
            "data-ocid": ocid
          }
        )
      ] }, id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card rounded-2xl p-6 shadow-soft", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground text-sm mb-4", children: "Account" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          className: "w-full gap-2 border-destructive/30 text-destructive hover:bg-destructive/5 transition-smooth",
          onClick: logout,
          type: "button",
          "data-ocid": "dashboard.settings.logout.button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-4 h-4" }),
            "Log Out"
          ]
        }
      )
    ] })
  ] });
}
function DashboardPage() {
  var _a;
  const [activeTab, setActiveTab] = reactExports.useState("orders");
  const { data: orders } = useUserOrders();
  const { principal } = useAuthStore();
  const tabContent = {
    orders: /* @__PURE__ */ jsxRuntimeExports.jsx(OrdersTab, {}),
    wishlist: /* @__PURE__ */ jsxRuntimeExports.jsx(WishlistTab, {}),
    profile: /* @__PURE__ */ jsxRuntimeExports.jsx(ProfileTab, {}),
    settings: /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsTab, {})
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", "data-ocid": "dashboard.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border/50", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container max-w-6xl mx-auto px-4 py-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: "My Dashboard" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-mono truncate max-w-xs mt-0.5", children: principal ? `${principal.slice(0, 20)}…` : "Not connected" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden sm:flex gap-6", children: [
        { icon: Package, label: "Orders", value: (orders == null ? void 0 : orders.length) ?? 0 },
        { icon: Heart, label: "Wishlist", value: 3 },
        {
          icon: ShoppingBag,
          label: "Spent",
          value: formatPrice(
            (orders == null ? void 0 : orders.reduce((s, o) => s + o.totalAmount, 0)) ?? 0
          )
        }
      ].map(({ icon: Icon, label, value }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 justify-center mb-0.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-3.5 h-3.5 text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: label })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-foreground text-sm", children: value })
      ] }, label)) })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container max-w-6xl mx-auto px-4 py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col lg:flex-row gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "lg:w-56 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "nav",
        {
          className: "flex lg:flex-col gap-1 overflow-x-auto scrollbar-hide pb-2 lg:pb-0",
          "aria-label": "Dashboard navigation",
          children: TABS.map(({ id, label, icon: Icon }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setActiveTab(id),
              className: `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-smooth whitespace-nowrap w-full text-left
                    ${activeTab === id ? "bg-primary text-primary-foreground shadow-green" : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"}`,
              "data-ocid": `dashboard.${id}.tab`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-4 h-4 shrink-0" }),
                label
              ]
            },
            id
          ))
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 min-w-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 8 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.25 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold text-foreground mb-5", children: (_a = TABS.find((t) => t.id === activeTab)) == null ? void 0 : _a.label }),
            tabContent[activeTab]
          ]
        },
        activeTab
      ) })
    ] }) })
  ] });
}
export {
  DashboardPage as default
};
