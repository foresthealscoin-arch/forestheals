import { r as reactExports, j as jsxRuntimeExports, a as Button, m as motion, B as Badge, P as PRODUCTS_SEED_DATA, d as ue } from "./index-xECe6EUo.js";
import { A as AlertDialog, a as AlertDialogContent, b as AlertDialogHeader, c as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, f as AlertDialogCancel, g as AlertDialogAction } from "./alert-dialog-B57-tg4i.js";
import { T as Tabs, a as TabsList, b as TabsTrigger } from "./tabs-BFQggrOp.js";
import { AdminSidebar } from "./AdminDashboardPage-D-UBTf6P.js";
import { T as ThumbsUp } from "./thumbs-up-DLezYjdO.js";
import { S as Star } from "./star-3Mia4EiO.js";
import { S as SquareCheckBig, a as Square } from "./square-Bj4u73x-.js";
import { C as CircleCheckBig } from "./circle-check-big-CzXkZ66V.js";
import { F as Funnel } from "./funnel-DalfHE3X.js";
import { T as Trash2 } from "./trash-2-DsjLmEQc.js";
import "./index-0zvCmYe-.js";
import "./index-DUJPy3Kv.js";
import "./index-Cwm_j1X6.js";
import "./index-BoTkzGeY.js";
import "./index-CG--HOM0.js";
import "./index-LegUYvjF.js";
import "./skeleton-BKspbrzu.js";
import "./useOrders-Dnszgtif.js";
import "./backend-BLkFotdR.js";
import "./useMutation-DoWd_StX.js";
import "./formatters-C5vW1ZnJ.js";
import "./package-408It_ce.js";
import "./shopping-cart-Cu8657pd.js";
import "./users-D91Ah-hd.js";
import "./trending-up-BC__7wxV.js";
import "./clock-CI_vdoMP.js";
import "./arrow-right-BQAa6h9N.js";
import "./circle-x-C7PhP7Bl.js";
import "./circle-check-CLiuopvM.js";
import "./truck-EANVqEfs.js";
import "./eye-DWPxAPe9.js";
import "./plus-CFLFiz8F.js";
const SEED_REVIEWS = [
  {
    id: 1,
    productId: 1,
    userId: "2vxsx-fae",
    rating: 5,
    text: "Absolutely love this Ashwagandha powder! My energy levels are so much better and stress has reduced significantly. Will definitely buy again.",
    verified: true,
    createdAt: Date.now() - 864e5 * 5,
    approved: true
  },
  {
    id: 2,
    productId: 3,
    userId: "aaaaa-aa",
    rating: 4,
    text: "Moringa is great — I add it to my morning smoothie every day. Noticeable improvement in immunity this season.",
    verified: true,
    createdAt: Date.now() - 864e5 * 3,
    approved: false
  },
  {
    id: 3,
    productId: 5,
    userId: "rkp4c-7iaaa",
    rating: 5,
    text: "Triphala Churan has completely transformed my digestion. I've been using it for 2 months and feel so much lighter.",
    verified: false,
    createdAt: Date.now() - 864e5 * 1,
    approved: false
  },
  {
    id: 4,
    productId: 2,
    userId: "rdmx6-jaaaa",
    rating: 3,
    text: "Brahmi is decent but the taste is quite bitter. Might mix with honey next time.",
    verified: true,
    createdAt: Date.now() - 864e5 * 7,
    approved: true
  },
  {
    id: 5,
    productId: 9,
    userId: "b77ix-aaaaa",
    rating: 5,
    text: "These chia seeds are so fresh and plump. Perfect for overnight oats. Great quality for the price!",
    verified: true,
    createdAt: Date.now() - 864e5 * 2,
    approved: false
  }
];
function StarDisplay({ rating }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-0.5", children: [1, 2, 3, 4, 5].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    Star,
    {
      className: `w-3 h-3 ${s <= rating ? "fill-current text-accent-foreground" : "text-muted-foreground"}`
    },
    s
  )) });
}
function truncatePrincipal(p) {
  return p.length > 14 ? `${p.slice(0, 10)}…` : p;
}
function AdminReviewsPage() {
  const [reviews, setReviews] = reactExports.useState(SEED_REVIEWS);
  const [activeTab, setActiveTab] = reactExports.useState(
    "all"
  );
  const [selected, setSelected] = reactExports.useState(/* @__PURE__ */ new Set());
  const [deleteTarget, setDeleteTarget] = reactExports.useState(null);
  const filtered = reviews.filter((r) => {
    if (activeTab === "pending") return !r.approved;
    if (activeTab === "approved") return r.approved;
    return true;
  });
  function getProductName(id) {
    var _a;
    return ((_a = PRODUCTS_SEED_DATA.find((p) => p.id === id)) == null ? void 0 : _a.name) ?? `Product #${id}`;
  }
  function handleApprove(id) {
    setReviews(
      (prev) => prev.map((r) => r.id === id ? { ...r, approved: true } : r)
    );
    ue.success("Review approved");
  }
  function handleDelete(r) {
    setReviews((prev) => prev.filter((x) => x.id !== r.id));
    setSelected((prev) => {
      const s = new Set(prev);
      s.delete(r.id);
      return s;
    });
    setDeleteTarget(null);
    ue.success("Review deleted");
  }
  function toggleSelect(id) {
    setSelected((prev) => {
      const s = new Set(prev);
      s.has(id) ? s.delete(id) : s.add(id);
      return s;
    });
  }
  function toggleSelectAll() {
    if (selected.size === filtered.length) {
      setSelected(/* @__PURE__ */ new Set());
    } else {
      setSelected(new Set(filtered.map((r) => r.id)));
    }
  }
  function handleBulkApprove() {
    setReviews(
      (prev) => prev.map((r) => selected.has(r.id) ? { ...r, approved: true } : r)
    );
    ue.success(`${selected.size} reviews approved`);
    setSelected(/* @__PURE__ */ new Set());
  }
  const pendingCount = reviews.filter((r) => !r.approved).length;
  const approvedCount = reviews.filter((r) => r.approved).length;
  const allOnPageSelected = filtered.length > 0 && filtered.every((r) => selected.has(r.id));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AdminSidebar, { active: "/admin/reviews" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "flex-1 overflow-auto", "data-ocid": "admin.reviews.page", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border-b border-border px-8 py-5 flex items-center justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold text-foreground", children: "Reviews" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-0.5", children: [
            reviews.length,
            " total · ",
            pendingCount,
            " pending approval"
          ] })
        ] }),
        selected.size > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            size: "sm",
            className: "gap-2 bg-primary",
            onClick: handleBulkApprove,
            "data-ocid": "admin.reviews.bulk_approve_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ThumbsUp, { className: "w-4 h-4" }),
              " Approve ",
              selected.size,
              " selected"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-8 space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Tabs,
          {
            value: activeTab,
            onValueChange: (v) => {
              setActiveTab(v);
              setSelected(/* @__PURE__ */ new Set());
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { "data-ocid": "admin.reviews.filter.tab", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "all", "data-ocid": "admin.reviews.tab.all", children: [
                "All (",
                reviews.length,
                ")"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                TabsTrigger,
                {
                  value: "pending",
                  "data-ocid": "admin.reviews.tab.pending",
                  children: [
                    "Pending (",
                    pendingCount,
                    ")"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                TabsTrigger,
                {
                  value: "approved",
                  "data-ocid": "admin.reviews.tab.approved",
                  children: [
                    "Approved (",
                    approvedCount,
                    ")"
                  ]
                }
              )
            ] })
          }
        ),
        filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-card rounded-2xl border border-border p-14 text-center",
            "data-ocid": "admin.reviews.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-10 h-10 text-muted-foreground mx-auto mb-3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground mb-1", children: "No reviews found" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Reviews from customers will appear here" })
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card rounded-2xl border border-border shadow-soft overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "table",
          {
            className: "w-full text-sm",
            "data-ocid": "admin.reviews.table",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-muted/40 text-muted-foreground text-xs uppercase tracking-wide border-b border-border", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-3 text-left w-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: toggleSelectAll,
                    className: "text-muted-foreground hover:text-foreground transition-colors",
                    children: allOnPageSelected ? /* @__PURE__ */ jsxRuntimeExports.jsx(SquareCheckBig, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Square, { className: "w-4 h-4" })
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-medium", children: "Product" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-medium hidden md:table-cell", children: "Reviewer" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-medium", children: "Rating" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-medium hidden lg:table-cell", children: "Review" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-center px-4 py-3 font-medium hidden sm:table-cell", children: "Verified" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-medium", children: "Status" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-medium", children: "Actions" })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: filtered.map((review, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.tr,
                {
                  initial: { opacity: 0 },
                  animate: { opacity: 1 },
                  transition: { delay: i * 0.04 },
                  "data-ocid": `admin.reviews.item.${i + 1}`,
                  className: `border-t border-border hover:bg-muted/20 transition-colors ${selected.has(review.id) ? "bg-primary/5" : ""}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => toggleSelect(review.id),
                        className: "text-muted-foreground hover:text-foreground transition-colors",
                        children: selected.has(review.id) ? /* @__PURE__ */ jsxRuntimeExports.jsx(SquareCheckBig, { className: "w-4 h-4 text-primary" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Square, { className: "w-4 h-4" })
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground text-xs truncate max-w-[120px]", children: getProductName(review.productId) }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-mono text-xs text-muted-foreground hidden md:table-cell", children: truncatePrincipal(review.userId) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StarDisplay, { rating: review.rating }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground hidden lg:table-cell max-w-[200px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "line-clamp-2 text-xs", children: review.text }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-center hidden sm:table-cell", children: review.verified ? /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-primary/10 text-primary text-xs", children: "Verified" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs", children: "Unverified" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: review.approved ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-xs font-medium text-primary", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3 h-3" }),
                      " Approved"
                    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-xs font-medium text-muted-foreground", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "w-3 h-3" }),
                      " Pending"
                    ] }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-1", children: [
                      !review.approved && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Button,
                        {
                          type: "button",
                          size: "sm",
                          className: "h-7 text-xs gap-1 bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground",
                          onClick: () => handleApprove(review.id),
                          "data-ocid": `admin.reviews.item.${i + 1}.approve_button`,
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(ThumbsUp, { className: "w-3 h-3" }),
                            " Approve"
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Button,
                        {
                          type: "button",
                          size: "icon",
                          variant: "ghost",
                          className: "h-7 w-7 hover:text-destructive",
                          onClick: () => setDeleteTarget(review),
                          "data-ocid": `admin.reviews.item.${i + 1}.delete_button`,
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
                        }
                      )
                    ] }) })
                  ]
                },
                review.id
              )) })
            ]
          }
        ) }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AlertDialog,
      {
        open: !!deleteTarget,
        onOpenChange: () => setDeleteTarget(null),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { "data-ocid": "admin.reviews.delete.dialog", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Delete Review" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { children: "Are you sure you want to delete this review? This action cannot be undone." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { "data-ocid": "admin.reviews.delete.cancel_button", children: "Cancel" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              AlertDialogAction,
              {
                onClick: () => deleteTarget && handleDelete(deleteTarget),
                "data-ocid": "admin.reviews.delete.confirm_button",
                className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                children: "Delete"
              }
            )
          ] })
        ] })
      }
    )
  ] });
}
export {
  AdminReviewsPage as default
};
