import { c as createLucideIcon, n as useParams, u as useActor, q as useQuery, j as jsxRuntimeExports, P as PageSpinner, a as Button, L as Link, B as Badge, m as motion, M as MessageCircle, f as createActor } from "./index-CfU2kVIJ.js";
import { b as useOrder } from "./useOrders-2Z68O22a.js";
import { b as formatDateTime, f as formatPrice, a as formatDate } from "./formatters-CN9TrYCS.js";
import { P as Package } from "./package-C5tkAuNr.js";
import { C as ChevronRight } from "./chevron-right-DNGmMEAY.js";
import { A as ArrowLeft } from "./arrow-left-BC-g7eMh.js";
import { C as CircleX } from "./circle-x-ByMEtOgM.js";
import { C as CircleCheck } from "./circle-check-BnQJU1pP.js";
import { C as Clock } from "./clock-DXcQvN8f.js";
import { T as Truck } from "./truck-DEhc-m44.js";
import { D as Download } from "./download-UavYxjpm.js";
import { C as Circle } from "./circle-BAXsdxBB.js";
import "./useMutation-DVPdZiQH.js";
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
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
];
const TriangleAlert = createLucideIcon("triangle-alert", __iconNode);
function getDetailStatusColor(status) {
  const map = {
    pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
    confirmed: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    processing: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
    shipped: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
    completed: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    delivered: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    cancelled: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
  };
  return map[status.toLowerCase()] ?? "bg-muted text-muted-foreground";
}
const EDIBLE_CATEGORIES = [
  "Ayurvedic Powders",
  "Seeds & Spices",
  "Spices",
  "Herbs",
  "Food"
];
function isEdibleProduct(product) {
  if (!product) return false;
  return EDIBLE_CATEGORIES.some(
    (cat) => {
      var _a;
      return (_a = product.category) == null ? void 0 : _a.toLowerCase().includes(cat.toLowerCase());
    }
  );
}
const TIMELINE_STEPS = [
  { key: "pending", label: "Order Placed", icon: Package },
  { key: "confirmed", label: "Confirmed", icon: CircleCheck },
  { key: "processing", label: "Processing", icon: Clock },
  { key: "shipped", label: "Shipped", icon: Truck },
  { key: "completed", label: "Delivered", icon: CircleCheck }
];
const STATUS_ORDER = [
  "pending",
  "confirmed",
  "processing",
  "shipped",
  "completed"
];
function TimelineStep({
  label,
  icon: Icon,
  state,
  isLast
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 flex-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: `w-9 h-9 rounded-full flex items-center justify-center transition-smooth
            ${state === "complete" ? "bg-primary text-primary-foreground" : ""}
            ${state === "active" ? "bg-primary/20 border-2 border-primary text-primary" : ""}
            ${state === "upcoming" ? "bg-muted border-2 border-border text-muted-foreground" : ""}
          `,
          children: state === "complete" ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4" }) : state === "active" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Circle, { className: "w-4 h-4" })
        }
      ),
      !isLast && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: `w-0.5 h-8 mt-1 rounded-full transition-smooth
              ${state === "complete" ? "bg-primary" : "bg-border"}`
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: `text-sm font-medium ${state === "upcoming" ? "text-muted-foreground" : "text-foreground"}`,
          children: label
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground capitalize", children: state })
    ] })
  ] });
}
function OrderDetailPage() {
  const { id } = useParams({ from: "/dashboard/orders/$id" });
  const { data: order, isLoading } = useOrder(Number(id));
  const { actor, isFetching } = useActor(createActor);
  const { data: productMap = {} } = useQuery({
    queryKey: ["products-map"],
    queryFn: async () => {
      if (!actor || isFetching) return {};
      const raw = await actor.listProducts({});
      const map = {};
      for (const p of raw) {
        map[Number(p.id)] = {
          id: Number(p.id),
          name: p.name,
          description: p.description,
          price: Number(p.price),
          category: p.category,
          imageUrl: p.imageUrl,
          imageKey: p.imageKey,
          images: p.images ?? [],
          stock: Number(p.stock),
          ratings: p.ratings,
          reviewCount: Number(p.reviewCount),
          featured: p.featured,
          bestseller: p.bestseller,
          discount: Number(p.discount),
          bundleIds: p.bundleIds.map(Number),
          status: String(p.status ?? "active")
        };
      }
      return map;
    },
    enabled: !!actor && !isFetching,
    staleTime: 5 * 60 * 1e3
  });
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(PageSpinner, {});
  if (!order) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "container max-w-3xl mx-auto px-4 py-24 text-center",
        "data-ocid": "order_detail.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-14 h-14 text-muted-foreground mx-auto mb-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-xl mb-3 text-foreground", children: "Order not found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-6", children: "This order doesn't exist or may have been removed." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, "data-ocid": "order_detail.back.button", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard", children: "Back to Dashboard" }) })
        ]
      }
    );
  }
  const normalizedStatus = order.status.toLowerCase();
  const isCompleted = normalizedStatus === "completed" || normalizedStatus === "delivered";
  const isCancelled = normalizedStatus === "cancelled";
  const currentStep = STATUS_ORDER.indexOf(normalizedStatus);
  const hasEdibleItem = order.items.some((item) => {
    const product = productMap[item.productId];
    return isEdibleProduct(product);
  });
  const whatsappMsg = encodeURIComponent(
    `Hello! I need help with my Forestheals order #${order.id}. Please assist.`
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", "data-ocid": "order_detail.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border/50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container max-w-4xl mx-auto px-4 py-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "nav",
        {
          className: "flex items-center gap-1.5 text-xs text-muted-foreground mb-3",
          "aria-label": "Breadcrumb",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/dashboard",
                className: "hover:text-primary transition-colors",
                children: "Dashboard"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3 h-3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/dashboard",
                className: "hover:text-primary transition-colors",
                children: "Orders"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3 h-3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground font-medium", children: [
              "#",
              order.id
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4 flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "sm",
              asChild: true,
              className: "gap-1.5 -ml-2",
              "data-ocid": "order_detail.back.button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/dashboard", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
                "Back"
              ] })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-xl font-bold text-foreground", children: [
              "Order #",
              order.id
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              "Placed ",
              formatDateTime(order.createdAt)
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Badge,
          {
            className: `capitalize text-sm px-3 py-1 ${getDetailStatusColor(order.status)}`,
            children: order.status
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container max-w-4xl mx-auto px-4 py-8 space-y-5", children: [
      isCompleted && hasEdibleItem && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: -8 },
          animate: { opacity: 1, y: 0 },
          className: "flex items-start gap-3 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800",
          "data-ocid": "order_detail.edible_notice",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-amber-800 dark:text-amber-300", children: "Not returnable due to edible item" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-amber-700 dark:text-amber-400 mt-0.5", children: "This order contains edible products (Ayurvedic powders / spices) which cannot be returned for hygiene and safety reasons." })
            ] })
          ]
        }
      ),
      isCancelled && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: -8 },
          animate: { opacity: 1, y: 0 },
          className: "flex items-start gap-3 p-4 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800",
          "data-ocid": "order_detail.cancelled_notice",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-5 h-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-red-800 dark:text-red-300", children: "Order Cancelled" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-red-700 dark:text-red-400 mt-0.5", children: "This order has been cancelled. If you paid online, a refund will be processed within 5–7 business days." })
            ] })
          ]
        }
      ),
      !isCancelled && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.05 },
          className: "glass-card rounded-2xl p-6 shadow-soft",
          "data-ocid": "order_detail.timeline.section",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-foreground text-sm mb-5", children: "Order Timeline" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col sm:flex-row sm:gap-2", children: TIMELINE_STEPS.map((step, i) => {
              const stepIdx = STATUS_ORDER.indexOf(step.key);
              const state = stepIdx < currentStep ? "complete" : stepIdx === currentStep ? "active" : "upcoming";
              return /* @__PURE__ */ jsxRuntimeExports.jsx(
                TimelineStep,
                {
                  label: step.label,
                  icon: step.icon,
                  state,
                  isLast: i === TIMELINE_STEPS.length - 1
                },
                step.key
              );
            }) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.1 },
          className: "glass-card rounded-2xl p-6 shadow-soft",
          "data-ocid": "order_detail.items.section",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-foreground text-sm mb-4", children: "Order Items" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden sm:grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 text-xs text-muted-foreground font-medium pb-2 border-b border-border/50 mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-12" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Product" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-right", children: "Price" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-right", children: "Qty" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-right", children: "Total" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-0", children: order.items.map((item, i) => {
              const product = productMap[item.productId];
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex items-center gap-4 py-3.5 border-b border-border/40 last:border-0",
                  "data-ocid": `order_detail.item.${i + 1}.row`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-muted", children: (product == null ? void 0 : product.imageUrl) ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: product.imageUrl,
                        alt: product.name,
                        className: "w-full h-full object-cover",
                        onError: (e) => {
                          e.currentTarget.style.display = "none";
                        }
                      }
                    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-5 h-5 text-muted-foreground" }) }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground line-clamp-1", children: (product == null ? void 0 : product.name) ?? `Product #${item.productId}` }),
                      (product == null ? void 0 : product.category) && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: product.category })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground hidden sm:block w-20 text-right", children: formatPrice(item.price) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground w-8 text-center", children: [
                      "×",
                      item.quantity
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-primary w-20 text-right", children: formatPrice(item.price * item.quantity) })
                  ]
                },
                item.productId
              );
            }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-4 mt-2 border-t border-border space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Subtotal" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: formatPrice(order.totalAmount + order.discountAmount) })
              ] }),
              order.discountAmount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
                  "Discount",
                  order.couponCode && ` (${order.couponCode})`
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-primary", children: [
                  "−",
                  formatPrice(order.discountAmount)
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-base font-bold text-foreground pt-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: formatPrice(order.totalAmount) })
              ] })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.15 },
          className: "grid sm:grid-cols-2 gap-4",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "glass-card rounded-2xl p-5 shadow-soft",
                "data-ocid": "order_detail.address.section",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-sm text-foreground mb-3", children: "Delivery Address" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-0.5 text-sm text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: order.address.fullName }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: order.address.line1 }),
                    order.address.line2 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: order.address.line2 }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                      order.address.city,
                      ", ",
                      order.address.state,
                      " ",
                      order.address.pincode
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: order.address.country }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "pt-1 font-medium text-foreground", children: [
                      "📞 ",
                      order.address.phone
                    ] })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "glass-card rounded-2xl p-5 shadow-soft",
                "data-ocid": "order_detail.payment.section",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-sm text-foreground mb-3", children: "Payment Details" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2.5 text-sm", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Method" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "capitalize", children: order.paymentMethod === "cod" ? "Cash on Delivery" : "Stripe / Card" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Status" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Badge,
                        {
                          className: order.paymentMethod === "cod" && !isCompleted ? "bg-secondary text-secondary-foreground" : "bg-primary/10 text-primary",
                          children: order.paymentMethod === "cod" && !isCompleted ? "Pay on Delivery" : "Paid"
                        }
                      )
                    ] }),
                    order.stripePaymentId && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Payment ID" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono text-foreground text-right break-all max-w-[150px]", children: order.stripePaymentId })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Order Date" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground text-xs", children: formatDate(order.createdAt) })
                    ] })
                  ] })
                ]
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.2 },
          className: "flex flex-col sm:flex-row gap-3",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                variant: "outline",
                className: "gap-2 flex-1",
                onClick: () => window.print(),
                "data-ocid": "order_detail.download_invoice.button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4" }),
                  "Download Invoice"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                asChild: true,
                type: "button",
                variant: "outline",
                className: "gap-2 flex-1 border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366]/5 transition-smooth",
                "data-ocid": "order_detail.whatsapp.button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "a",
                  {
                    href: `https://wa.me/919929059240?text=${whatsappMsg}`,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-4 h-4" }),
                      "Contact Support via WhatsApp"
                    ]
                  }
                )
              }
            )
          ]
        }
      )
    ] })
  ] });
}
export {
  OrderDetailPage as default
};
