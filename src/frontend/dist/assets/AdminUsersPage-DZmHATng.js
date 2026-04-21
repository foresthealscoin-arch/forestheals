import { c as createLucideIcon, k as useAuthStore, r as reactExports, j as jsxRuntimeExports, m as motion, U as User, B as Badge, d as ue } from "./index-Oxc-_oxi.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-Bsuph0kU.js";
import { AdminSidebar } from "./AdminDashboardPage-BPsJsC0y.js";
import { S as ShieldCheck } from "./shield-check-CL_lSoHN.js";
import "./index-BtdL0eLz.js";
import "./index-DvWPYnjA.js";
import "./index-njhBbO9Y.js";
import "./index-DYUerbpP.js";
import "./index-D8FRnOyd.js";
import "./check-DKcnpQxu.js";
import "./skeleton-DItXWvDl.js";
import "./useOrders-BU3bpvql.js";
import "./backend-BS-t6_G-.js";
import "./useMutation-C8tWLAXr.js";
import "./formatters-C5vW1ZnJ.js";
import "./package-6xCQkTPQ.js";
import "./shopping-cart-DpA4wU_V.js";
import "./users-Dm9XPlxR.js";
import "./star-DV5fN0x3.js";
import "./trending-up-CreNqbnI.js";
import "./clock-CgG0A1UB.js";
import "./arrow-right-Byi3z3nZ.js";
import "./circle-x-DjJ94ety.js";
import "./circle-check-dPMw8Eeh.js";
import "./truck-DXSgzoOp.js";
import "./eye-C8re7zjK.js";
import "./plus-C8NM5nzO.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 16v-4", key: "1dtifu" }],
  ["path", { d: "M12 8h.01", key: "e9boi3" }]
];
const Info = createLucideIcon("info", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m2 2 20 20", key: "1ooewy" }],
  [
    "path",
    {
      d: "M5 5a1 1 0 0 0-1 1v7c0 5 3.5 7.5 7.67 8.94a1 1 0 0 0 .67.01c2.35-.82 4.48-1.97 5.9-3.71",
      key: "1jlk70"
    }
  ],
  [
    "path",
    {
      d: "M9.309 3.652A12.252 12.252 0 0 0 11.24 2.28a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1v7a9.784 9.784 0 0 1-.08 1.264",
      key: "18rp1v"
    }
  ]
];
const ShieldOff = createLucideIcon("shield-off", __iconNode);
function truncatePrincipal(p) {
  if (p.length <= 20) return p;
  return `${p.slice(0, 10)}…${p.slice(-6)}`;
}
function AdminUsersPage() {
  const { principal } = useAuthStore();
  const [users, setUsers] = reactExports.useState(() => {
    const entries = [
      {
        principal: "2vxsx-fae",
        role: "customer",
        joinedAt: Date.now() - 864e5 * 90
      },
      {
        principal: "aaaaa-aa",
        role: "customer",
        joinedAt: Date.now() - 864e5 * 45
      },
      {
        principal: "rkp4c-7iaaa-aaaaa-aaaca-cai",
        role: "customer",
        joinedAt: Date.now() - 864e5 * 14
      }
    ];
    if (principal) {
      entries.unshift({
        principal,
        role: "admin",
        joinedAt: Date.now() - 864e5 * 180
      });
    }
    return entries;
  });
  function handleRoleChange(p, role) {
    setUsers(
      (prev) => prev.map((u) => u.principal === p ? { ...u, role } : u)
    );
    ue.success(`Role updated to ${role}`);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AdminSidebar, { active: "/admin/users" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "flex-1 overflow-auto", "data-ocid": "admin.users.page", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border-b border-border px-8 py-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold text-foreground", children: "Users" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-0.5", children: [
          users.length,
          " registered identities"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-8 space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-start gap-3 bg-secondary/30 border border-secondary rounded-2xl px-5 py-4",
            "data-ocid": "admin.users.info_banner",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "w-4 h-4 text-accent-foreground mt-0.5 flex-shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground/80", children: "On the Internet Computer, users authenticate via Internet Identity — a privacy-preserving system that does not expose names or emails. Only principal IDs are available. The list below shows principals that have interacted with Forestheals." })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card rounded-2xl border border-border shadow-soft overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", "data-ocid": "admin.users.table", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-muted/40 text-muted-foreground text-xs uppercase tracking-wide border-b border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-6 py-3 font-medium", children: "Principal ID" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-medium hidden md:table-cell", children: "Joined" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-medium", children: "Role" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-medium", children: "Change Role" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: users.map((user, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.tr,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { delay: i * 0.05 },
              "data-ocid": `admin.users.item.${i + 1}`,
              className: "border-t border-border hover:bg-muted/20 transition-colors",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0", children: user.role === "admin" ? /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-4 h-4 text-primary" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-4 h-4 text-muted-foreground" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-muted-foreground", children: truncatePrincipal(user.principal) }),
                  user.principal === principal && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs", children: "You" })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground text-xs hidden md:table-cell", children: new Intl.DateTimeFormat("en-IN", {
                  year: "numeric",
                  month: "short",
                  day: "numeric"
                }).format(new Date(user.joinedAt)) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: `inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${user.role === "admin" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`,
                    children: [
                      user.role === "admin" ? /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-3 h-3" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldOff, { className: "w-3 h-3" }),
                      user.role === "admin" ? "Admin" : "Customer"
                    ]
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Select,
                  {
                    value: user.role,
                    onValueChange: (v) => handleRoleChange(
                      user.principal,
                      v
                    ),
                    disabled: user.principal === principal,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        SelectTrigger,
                        {
                          className: "w-32 h-7 text-xs ml-auto",
                          "data-ocid": `admin.users.item.${i + 1}.role_select`,
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "customer", children: "Customer" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "admin", children: "Admin" })
                      ] })
                    ]
                  }
                ) })
              ]
            },
            user.principal
          )) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground text-center pt-2", children: [
          "Role changes are saved locally. Connect backend",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "bg-muted px-1 py-0.5 rounded", children: "setUserRole()" }),
          " ",
          "to persist across sessions."
        ] })
      ] })
    ] })
  ] });
}
export {
  AdminUsersPage as default
};
