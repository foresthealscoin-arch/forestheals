import { r as reactExports, j as jsxRuntimeExports, m as motion, S as ShoppingBag, a as Button, L as Link, A as AnimatePresence, P as PRODUCTS_SEED_DATA, B as Badge, I as Input } from "./index-Oxc-_oxi.js";
import { u as useCart, a as useValidateCoupon } from "./useCart-CFy8Ts2_.js";
import { f as formatPrice } from "./formatters-C5vW1ZnJ.js";
import { P as Package } from "./package-6xCQkTPQ.js";
import { T as Trash2 } from "./trash-2-CoI9XUCD.js";
import { M as Minus } from "./minus-BIpjT4p2.js";
import { P as Plus } from "./plus-C8NM5nzO.js";
import { T as Tag } from "./tag-CStEkWET.js";
import { C as CircleCheck } from "./circle-check-dPMw8Eeh.js";
import { C as CircleX } from "./circle-x-DjJ94ety.js";
import { A as ArrowRight } from "./arrow-right-Byi3z3nZ.js";
import "./backend-BS-t6_G-.js";
import "./useMutation-C8tWLAXr.js";
const FREE_SHIPPING_THRESHOLD = 499;
const SHIPPING_FEE = 49;
const GST_RATE = 0.18;
function CartPage() {
  const {
    items,
    itemCount,
    removeFromCart,
    updateQty,
    couponCode,
    discount,
    removeCoupon
  } = useCart();
  const validateCoupon = useValidateCoupon();
  const [couponInput, setCouponInput] = reactExports.useState(couponCode || "");
  const [couponError, setCouponError] = reactExports.useState("");
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const gst = Math.round(subtotal * GST_RATE);
  const discountedSubtotal = Math.max(0, subtotal - discount);
  const grandTotal = discountedSubtotal + shipping + gst;
  const handleApplyCoupon = (e) => {
    e.preventDefault();
    setCouponError("");
    const code = couponInput.trim();
    if (!code) return;
    validateCoupon.mutate(code, {
      onError: () => setCouponError("Invalid coupon code. Please try again."),
      onSuccess: (data) => {
        if (!data.valid) setCouponError(data.message);
      }
    });
  };
  const handleRemoveCoupon = () => {
    removeCoupon();
    setCouponInput("");
    setCouponError("");
  };
  if (items.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "min-h-[80vh] flex flex-col items-center justify-center gap-8 px-4",
        "data-ocid": "cart.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, scale: 0.8 },
              animate: { opacity: 1, scale: 1 },
              transition: { duration: 0.5, type: "spring" },
              className: "relative",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-36 h-36 rounded-full bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-16 h-16 text-primary/50" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-2 -right-2 w-10 h-10 rounded-full bg-secondary flex items-center justify-center shadow-soft", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg font-bold text-secondary-foreground", children: "0" }) })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 16 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.2, duration: 0.4 },
              className: "text-center max-w-sm",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground mb-3", children: "Your cart is empty" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed", children: "Discover our premium Ayurvedic products, pure seeds, and eco-friendly essentials — crafted from forest to your home." })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 12 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.35, duration: 0.4 },
              className: "flex flex-col sm:flex-row gap-3",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    size: "lg",
                    className: "gap-2 shadow-green",
                    asChild: true,
                    "data-ocid": "cart.empty_state.shop_button",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/products", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-4 h-4" }),
                      " Shop Now"
                    ] })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    size: "lg",
                    variant: "outline",
                    asChild: true,
                    "data-ocid": "cart.empty_state.bundles_button",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/bundles", children: "View Bundles" })
                  }
                )
              ]
            }
          )
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "min-h-screen bg-background py-10 px-4 sm:px-6",
      "data-ocid": "cart.page",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container max-w-6xl mx-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: -12 },
            animate: { opacity: 1, y: 0 },
            className: "flex items-center justify-between mb-8",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl sm:text-3xl font-bold text-foreground", children: "Your Cart" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-1", children: [
                  itemCount,
                  " ",
                  itemCount === 1 ? "item" : "items",
                  " in your cart"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "ghost",
                  size: "sm",
                  asChild: true,
                  className: "text-muted-foreground hover:text-foreground",
                  "data-ocid": "cart.continue_shopping.button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", children: "← Continue Shopping" })
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-5 gap-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-3 space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "popLayout", children: items.map((item, i) => {
              const product = PRODUCTS_SEED_DATA.find(
                (p) => p.id === item.productId
              );
              const lineTotal = item.price * item.quantity;
              return /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  initial: { opacity: 0, y: 16 },
                  animate: { opacity: 1, y: 0 },
                  exit: { opacity: 0, x: -40, scale: 0.95 },
                  transition: { delay: i * 0.06, duration: 0.3 },
                  className: "glass-card rounded-2xl p-4 sm:p-5 shadow-soft",
                  "data-ocid": `cart.item.${i + 1}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Link,
                      {
                        to: "/products/$id",
                        params: { id: String(item.productId) },
                        className: "shrink-0",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-muted ring-1 ring-border/50 hover:ring-primary/30 transition-smooth", children: product ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "img",
                          {
                            src: product.imageUrl,
                            alt: product.name,
                            className: "w-full h-full object-cover"
                          }
                        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-6 h-6 text-muted-foreground" }) }) })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2 mb-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Link,
                          {
                            to: "/products/$id",
                            params: { id: String(item.productId) },
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-sm sm:text-base text-foreground hover:text-primary transition-smooth line-clamp-2 leading-snug", children: (product == null ? void 0 : product.name) ?? `Product #${item.productId}` })
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "button",
                          {
                            type: "button",
                            onClick: () => removeFromCart(
                              item.productId,
                              (product == null ? void 0 : product.name) ?? "Item"
                            ),
                            className: "p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-smooth shrink-0",
                            "aria-label": "Remove item",
                            "data-ocid": `cart.item.${i + 1}.delete_button`,
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" })
                          }
                        )
                      ] }),
                      (product == null ? void 0 : product.category) && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Badge,
                        {
                          variant: "secondary",
                          className: "text-xs mb-3 font-normal",
                          children: product.category
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4 flex-wrap", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-0 border border-input rounded-xl overflow-hidden shadow-sm", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "button",
                            {
                              type: "button",
                              onClick: () => updateQty(item.productId, item.quantity - 1),
                              className: "w-8 h-8 flex items-center justify-center hover:bg-muted text-muted-foreground hover:text-foreground transition-smooth",
                              "aria-label": "Decrease quantity",
                              "data-ocid": `cart.item.${i + 1}.decrease.button`,
                              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "w-3.5 h-3.5" })
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-10 text-center text-sm font-bold text-foreground border-x border-input", children: item.quantity }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "button",
                            {
                              type: "button",
                              onClick: () => updateQty(item.productId, item.quantity + 1),
                              className: "w-8 h-8 flex items-center justify-center hover:bg-muted text-muted-foreground hover:text-foreground transition-smooth",
                              "aria-label": "Increase quantity",
                              "data-ocid": `cart.item.${i + 1}.increase.button`,
                              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3.5 h-3.5" })
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-primary text-base", children: formatPrice(lineTotal) }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                            formatPrice(item.price),
                            " each"
                          ] })
                        ] })
                      ] })
                    ] })
                  ] })
                },
                item.productId
              );
            }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 12 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: 0.3 },
                className: "glass-card rounded-2xl p-5 shadow-soft",
                "data-ocid": "cart.coupon.card",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-semibold text-foreground mb-3 flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "w-4 h-4 text-primary" }),
                    "Apply Coupon Code"
                  ] }),
                  couponCode ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 p-3 rounded-xl bg-primary/8 border border-primary/20", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 text-primary shrink-0" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-primary", children: couponCode }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                          "Saving ",
                          formatPrice(discount),
                          " on this order!"
                        ] })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: handleRemoveCoupon,
                        className: "text-muted-foreground hover:text-destructive transition-smooth",
                        "aria-label": "Remove coupon",
                        "data-ocid": "cart.coupon.remove_button",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-4 h-4" })
                      }
                    )
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleApplyCoupon, className: "flex gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        placeholder: "e.g. FOREST10, HEAL20",
                        value: couponInput,
                        onChange: (e) => {
                          setCouponInput(e.target.value);
                          setCouponError("");
                        },
                        className: "text-sm font-mono uppercase placeholder:normal-case placeholder:font-sans",
                        "data-ocid": "cart.coupon.input"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        type: "submit",
                        variant: "outline",
                        size: "sm",
                        disabled: validateCoupon.isPending || !couponInput.trim(),
                        className: "shrink-0 min-w-[72px]",
                        "data-ocid": "cart.coupon.submit_button",
                        children: validateCoupon.isPending ? "…" : "Apply"
                      }
                    )
                  ] }),
                  couponError && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "p",
                    {
                      className: "text-xs text-destructive mt-2 flex items-center gap-1",
                      "data-ocid": "cart.coupon.error_state",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-3.5 h-3.5" }),
                        couponError
                      ]
                    }
                  ),
                  !couponCode && !couponError && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-2", children: "Try: FOREST10, HEAL20, NATURE15, WELCOME5" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, x: 20 },
              animate: { opacity: 1, x: 0 },
              transition: { delay: 0.2, duration: 0.4 },
              className: "lg:col-span-2",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "glass-card rounded-2xl p-6 shadow-elevated sticky top-24",
                  "data-ocid": "cart.summary.card",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-lg text-foreground mb-5 pb-4 border-b border-border", children: "Order Summary" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 text-sm", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-muted-foreground", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                          "Subtotal (",
                          itemCount,
                          " ",
                          itemCount === 1 ? "item" : "items",
                          ")"
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: formatPrice(subtotal) })
                      ] }),
                      discount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-primary", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "w-3.5 h-3.5" }),
                          "Coupon (",
                          couponCode,
                          ")"
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold", children: [
                          "−",
                          formatPrice(discount)
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-muted-foreground", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Shipping" }),
                        shipping === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-primary", children: "Free 🎉" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatPrice(shipping) })
                      ] }),
                      shipping > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground bg-muted/50 rounded-lg px-3 py-2", children: [
                        "Add",
                        " ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: formatPrice(FREE_SHIPPING_THRESHOLD - subtotal) }),
                        " ",
                        "more for free shipping 🚚"
                      ] }),
                      shipping === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs font-medium text-primary bg-primary/8 border border-primary/20 rounded-lg px-3 py-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "🎉" }),
                        " Free shipping unlocked! Orders above ₹499 ship free."
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-muted-foreground", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "GST (18%)" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatPrice(gst) })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border pt-4 mt-2 flex justify-between items-baseline", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-base text-foreground", children: "Total" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-xl text-primary", children: formatPrice(grandTotal) })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        size: "lg",
                        className: "w-full mt-6 gap-2 shadow-green font-semibold text-base",
                        asChild: true,
                        "data-ocid": "cart.checkout.primary_button",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/checkout", children: [
                          "Proceed to Checkout ",
                          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
                        ] })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 pt-4 border-t border-border/50 grid grid-cols-2 gap-2 text-xs text-muted-foreground", children: [
                      { icon: "🔒", text: "Secure payment" },
                      { icon: "🌿", text: "100% natural" },
                      { icon: "📦", text: "Express delivery" },
                      { icon: "↩️", text: "Easy returns" }
                    ].map(({ icon, text }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: icon }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: text })
                    ] }, text)) })
                  ]
                }
              )
            }
          )
        ] })
      ] })
    }
  );
}
export {
  CartPage as default
};
