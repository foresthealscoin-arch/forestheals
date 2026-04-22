import { c as createLucideIcon, o as useAuthStore, r as reactExports, u as useActor, q as useQuery, s as redirect, j as jsxRuntimeExports, a as Button, L as Link, A as AnimatePresence, m as motion, I as Input, B as Badge, f as createActor } from "./index-CfU2kVIJ.js";
import { L as Label } from "./label-BjUfKOjb.js";
import { S as Separator } from "./separator-CmNF3NW2.js";
import { u as useCart } from "./useCart-BjgJtNmr.js";
import { u as useCreateOrder } from "./useOrders-2Z68O22a.js";
import { b as useProducts } from "./useProducts-B7nbWxOB.js";
import { f as formatPrice, a as formatDate } from "./formatters-CN9TrYCS.js";
import { M as MapPin } from "./map-pin-DbcUiQCi.js";
import { P as Package } from "./package-C5tkAuNr.js";
import { A as ArrowLeft } from "./arrow-left-BC-g7eMh.js";
import { S as ShieldCheck } from "./shield-check-Bo58OvYG.js";
import { C as CircleCheck } from "./circle-check-BnQJU1pP.js";
import { A as ArrowRight } from "./arrow-right-CITShBTT.js";
import { T as Truck } from "./truck-DEhc-m44.js";
import { C as Calendar } from "./calendar-DFAbWjKt.js";
import "./useMutation-DVPdZiQH.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["rect", { width: "20", height: "14", x: "2", y: "5", rx: "2", key: "ynyp8z" }],
  ["line", { x1: "2", x2: "22", y1: "10", y2: "10", key: "1b3vmo" }]
];
const CreditCard = createLucideIcon("credit-card", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z", key: "1rqfz7" }],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  ["path", { d: "M10 9H8", key: "b1mrlr" }],
  ["path", { d: "M16 13H8", key: "t4e002" }],
  ["path", { d: "M16 17H8", key: "z1uh3a" }]
];
const FileText = createLucideIcon("file-text", __iconNode);
const FREE_SHIPPING_THRESHOLD = 499;
const SHIPPING_FEE = 49;
const GST_RATE = 0.18;
const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Delhi",
  "Jammu & Kashmir",
  "Ladakh",
  "Puducherry"
];
const CONFETTI_PIECES = Array.from({ length: 30 }, (_, i) => ({
  id: `cp-${i}`,
  index: i
}));
function ConfettiPiece({ index }) {
  const colors = ["bg-primary", "bg-secondary", "bg-accent", "bg-destructive"];
  const color = colors[index % colors.length];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      className: `absolute w-2 h-2 rounded-sm ${color} opacity-80`,
      style: { left: `${(index * 7 + 10) % 90}%`, top: "-10px" },
      animate: {
        y: ["0vh", "100vh"],
        rotate: [0, 360 * (index % 2 === 0 ? 1 : -1)],
        x: [0, (index % 2 === 0 ? 1 : -1) * (20 + index * 13 % 40)],
        opacity: [1, 1, 0]
      },
      transition: {
        duration: 2 + index * 0.2 % 1.5,
        delay: index * 0.05,
        ease: "easeIn"
      }
    }
  );
}
function SuccessScreen({
  order,
  productMap
}) {
  const estimatedDelivery = /* @__PURE__ */ new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 5);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-[85vh] flex flex-col items-center justify-center gap-6 px-4 sm:px-6 py-10 relative overflow-hidden",
      "data-ocid": "checkout.success_state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 pointer-events-none overflow-hidden z-10", children: CONFETTI_PIECES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(ConfettiPiece, { index: c.index }, c.id)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { scale: 0, rotate: -15 },
            animate: { scale: 1, rotate: 0 },
            transition: { type: "spring", stiffness: 200, damping: 14 },
            className: "w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-primary/10 flex items-center justify-center",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-12 h-12 sm:w-14 sm:h-14 text-primary" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.3 },
            className: "text-center max-w-sm",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl sm:text-4xl font-bold text-foreground mb-2", children: "Order Placed! 🎉" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed text-sm sm:text-base", children: "Thank you for choosing Forestheals. Your order is confirmed and we'll start processing it right away." }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 bg-muted/50 rounded-full mt-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-4 h-4 text-primary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-mono font-semibold text-foreground", children: [
                  "Order #",
                  order.id
                ] })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 16 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.45 },
            className: "glass-card rounded-2xl p-5 shadow-soft w-full max-w-md text-sm",
            "data-ocid": "checkout.success.order_summary",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2.5 mb-4", children: [
                order.items.slice(0, 3).map((item) => {
                  const product = productMap[item.productId];
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg overflow-hidden bg-muted shrink-0", children: (product == null ? void 0 : product.imageUrl) ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: product.imageUrl,
                        alt: product.name,
                        className: "w-full h-full object-cover"
                      }
                    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-4 h-4 text-primary" }) }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-foreground line-clamp-1", children: (product == null ? void 0 : product.name) ?? `Product #${item.productId}` }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                        "Qty: ",
                        item.quantity
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-primary shrink-0", children: formatPrice(item.price * item.quantity) })
                  ] }, item.productId);
                }),
                order.items.length > 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground text-center", children: [
                  "+",
                  order.items.length - 3,
                  " more item",
                  order.items.length - 3 > 1 ? "s" : ""
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "my-3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center font-semibold text-base", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: "Total Paid" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: formatPrice(order.totalAmount) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground bg-muted/40 rounded-lg px-3 py-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3.5 h-3.5 text-primary shrink-0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    "Estimated delivery by",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: formatDate(estimatedDelivery.getTime()) })
                  ] })
                ] }),
                order.paymentMethod === "cod" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground bg-muted/40 rounded-lg px-3 py-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "w-3.5 h-3.5 text-primary shrink-0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    "Pay",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: formatPrice(order.totalAmount) }),
                    " ",
                    "when your order arrives"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 text-xs text-muted-foreground bg-muted/40 rounded-lg px-3 py-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-3.5 h-3.5 text-primary mt-0.5 shrink-0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "GST invoice will be available in your dashboard." })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "my-3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground space-y-0.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex items-center gap-1.5 font-medium text-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3.5 h-3.5 text-primary shrink-0" }),
                  "Delivering to: ",
                  order.address.fullName
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "pl-5", children: [
                  order.address.line1,
                  order.address.line2 ? `, ${order.address.line2}` : ""
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "pl-5", children: [
                  order.address.city,
                  ", ",
                  order.address.state,
                  " —",
                  " ",
                  order.address.pincode
                ] })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { delay: 0.65 },
            className: "flex flex-col sm:flex-row gap-3 w-full max-w-md z-20",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "lg",
                  asChild: true,
                  className: "flex-1 shadow-green",
                  "data-ocid": "checkout.success.orders_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard", children: "View My Orders" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "lg",
                  variant: "outline",
                  asChild: true,
                  className: "flex-1",
                  "data-ocid": "checkout.success.shop_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", children: "Continue Shopping" })
                }
              )
            ]
          }
        )
      ]
    }
  );
}
function ProductPlaceholder() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex flex-col items-center justify-center bg-primary/10 gap-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-5 h-5 text-primary/40" }) });
}
function CheckoutPage() {
  const { isLoggedIn } = useAuthStore();
  const { items, discount, couponCode, clearAllCart } = useCart();
  const createOrder = useCreateOrder();
  const [placedOrder, setPlacedOrder] = reactExports.useState(null);
  const [orderError, setOrderError] = reactExports.useState(null);
  const { actor, isFetching: actorFetching } = useActor(createActor);
  const { data: products = [] } = useProducts();
  const productMap = Object.fromEntries(products.map((p) => [p.id, p]));
  const { data: userProfile } = useQuery({
    queryKey: ["user-profile"],
    queryFn: async () => {
      if (!actor || actorFetching) return null;
      return actor.getUserProfile();
    },
    enabled: !!actor && !actorFetching && isLoggedIn,
    staleTime: 60 * 1e3
  });
  const [step, setStep] = reactExports.useState("address");
  const [paymentMethod, setPaymentMethod] = reactExports.useState("cod");
  const [gstNumber, setGstNumber] = reactExports.useState("");
  const [address, setAddress] = reactExports.useState({
    fullName: "",
    phone: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    pincode: "",
    country: "India"
  });
  reactExports.useEffect(() => {
    var _a;
    if (userProfile) {
      const savedAddr = (_a = userProfile.addresses) == null ? void 0 : _a[0];
      setAddress((prev) => ({
        fullName: prev.fullName || userProfile.name || "",
        phone: prev.phone || userProfile.phone || "",
        line1: prev.line1 || (savedAddr ? savedAddr.street : ""),
        line2: prev.line2 || "",
        city: prev.city || (savedAddr ? savedAddr.city : userProfile.city) || "",
        state: prev.state || (savedAddr ? savedAddr.state : userProfile.state) || "",
        pincode: prev.pincode || (savedAddr ? savedAddr.pincode : userProfile.pincode) || "",
        country: prev.country || "India"
      }));
    }
  }, [userProfile]);
  reactExports.useEffect(() => {
    if (!isLoggedIn) {
      throw redirect({ to: "/auth/login" });
    }
  }, [isLoggedIn]);
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const gst = Math.round(subtotal * GST_RATE);
  const discountedSubtotal = Math.max(0, subtotal - discount);
  const grandTotal = discountedSubtotal + shipping + gst;
  const updateAddress = (field) => (e) => setAddress((a) => ({ ...a, [field]: e.target.value }));
  const isAddressValid = address.fullName.trim() && address.phone.trim() && address.line1.trim() && address.city.trim() && address.state.trim() && /^\d{6}$/.test(address.pincode);
  const saveAddressToProfile = async (addr) => {
    if (!actor || !userProfile) return;
    try {
      const existingAddresses = userProfile.addresses ?? [];
      const alreadyExists = existingAddresses.some(
        (a) => a.street === addr.line1 && a.pincode === addr.pincode
      );
      if (alreadyExists) return;
      const newAddr = {
        id: `addr-${Date.now()}`,
        tag: "Home",
        street: addr.line1 + (addr.line2 ? `, ${addr.line2}` : ""),
        city: addr.city,
        state: addr.state,
        pincode: addr.pincode,
        country: addr.country ?? "India",
        fullName: addr.fullName,
        phone: addr.phone,
        isDefault: existingAddresses.length === 0
      };
      await actor.updateUserProfile({
        name: userProfile.name,
        email: userProfile.email,
        phone: userProfile.phone,
        city: userProfile.city,
        state: userProfile.state,
        pincode: userProfile.pincode,
        country: userProfile.country,
        addresses: [...existingAddresses, newAddr]
      });
    } catch {
    }
  };
  const handlePlaceOrder = async () => {
    setOrderError(null);
    const addressWithGst = gstNumber ? { ...address, gstNumber } : address;
    const input = {
      items,
      totalAmount: grandTotal,
      paymentMethod,
      address: addressWithGst,
      couponCode: couponCode || void 0,
      discountAmount: discount
    };
    try {
      const order = await createOrder.mutateAsync(input);
      void saveAddressToProfile(addressWithGst);
      clearAllCart();
      setPlacedOrder(order);
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : "Failed to place order. Please try again.";
      setOrderError(errMsg);
    }
  };
  const steps = [
    { id: "address", label: "Delivery", icon: MapPin },
    { id: "payment", label: "Payment", icon: CreditCard },
    { id: "review", label: "Review", icon: FileText }
  ];
  const stepIndex = steps.findIndex((s) => s.id === step);
  if (placedOrder !== null) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(SuccessScreen, { order: placedOrder, productMap });
  }
  if (items.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "min-h-[70vh] flex flex-col items-center justify-center gap-5 px-4",
        "data-ocid": "checkout.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-14 h-14 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-xl text-foreground mb-2", children: "No items to checkout" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Add products to your cart first." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, "data-ocid": "checkout.empty_state.shop_button", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", children: "Browse Products" }) })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "min-h-screen bg-background py-6 sm:py-8 px-4 sm:px-6",
      "data-ocid": "checkout.page",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container max-w-5xl mx-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "ghost",
              size: "sm",
              asChild: true,
              className: "gap-1.5 shrink-0",
              "data-ocid": "checkout.back.button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/cart", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
                " Back"
              ] })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { orientation: "vertical", className: "h-5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-lg sm:text-2xl font-bold text-foreground", children: "Secure Checkout" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-5 h-5 text-primary ml-auto hidden sm:block" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "flex items-center gap-0 mb-6 sm:mb-10 max-w-xs sm:max-w-sm mx-auto",
            "data-ocid": "checkout.steps.nav",
            children: steps.map((s, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => idx < stepIndex && setStep(s.id),
                  disabled: idx > stepIndex,
                  className: `flex flex-col items-center gap-1 flex-1 ${idx < stepIndex ? "cursor-pointer" : "cursor-default"}`,
                  "data-ocid": `checkout.step.${s.id}.tab`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: `w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-smooth ${idx < stepIndex ? "bg-primary text-primary-foreground" : idx === stepIndex ? "bg-primary text-primary-foreground ring-4 ring-primary/20" : "bg-muted text-muted-foreground"}`,
                        children: idx < stepIndex ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(s.icon, { className: "w-4 h-4" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: `text-xs font-medium ${idx <= stepIndex ? "text-foreground" : "text-muted-foreground"}`,
                        children: s.label
                      }
                    )
                  ]
                }
              ),
              idx < steps.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: `h-0.5 flex-1 mt-[-12px] transition-smooth ${idx < stepIndex ? "bg-primary" : "bg-border"}`
                }
              )
            ] }, s.id))
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatePresence, { mode: "wait", children: [
            step === "address" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, x: 30 },
                animate: { opacity: 1, x: 0 },
                exit: { opacity: 0, x: -30 },
                transition: { duration: 0.25 },
                className: "glass-card rounded-2xl p-5 sm:p-6 shadow-soft space-y-4 sm:space-y-5",
                "data-ocid": "checkout.address.panel",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-semibold text-foreground flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-4 h-4 text-primary" }),
                    " Delivery Address"
                  ] }),
                  (userProfile == null ? void 0 : userProfile.addresses) && userProfile.addresses.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 p-3 bg-muted/40 rounded-xl", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Your saved addresses" }),
                    userProfile.addresses.map((saved, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "button",
                      {
                        type: "button",
                        onClick: () => setAddress({
                          fullName: saved.fullName,
                          phone: saved.phone,
                          line1: saved.street,
                          line2: "",
                          city: saved.city,
                          state: saved.state,
                          pincode: saved.pincode,
                          country: saved.country ?? "India"
                        }),
                        className: "w-full text-left text-xs p-2.5 rounded-lg border border-border hover:border-primary/40 hover:bg-primary/5 transition-smooth",
                        "data-ocid": `checkout.saved_address.${idx + 1}`,
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-medium text-foreground", children: [
                            saved.fullName,
                            " — ",
                            saved.tag
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
                            saved.street,
                            ", ",
                            saved.city,
                            ", ",
                            saved.state,
                            " —",
                            " ",
                            saved.pincode
                          ] })
                        ]
                      },
                      saved.id || idx
                    ))
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "fullName", children: "Full Name *" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "fullName",
                          value: address.fullName,
                          onChange: updateAddress("fullName"),
                          placeholder: "Rajesh Kumar",
                          "data-ocid": "checkout.fullname.input"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "phone", children: "Phone Number *" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "phone",
                          type: "tel",
                          value: address.phone,
                          onChange: updateAddress("phone"),
                          placeholder: "+91 98765 43210",
                          "data-ocid": "checkout.phone.input"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2 space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "line1", children: "Address Line 1 *" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "line1",
                          value: address.line1,
                          onChange: updateAddress("line1"),
                          placeholder: "House / Flat No., Street Name",
                          "data-ocid": "checkout.address1.input"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2 space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "line2", children: "Address Line 2 (optional)" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "line2",
                          value: address.line2,
                          onChange: updateAddress("line2"),
                          placeholder: "Landmark, Area",
                          "data-ocid": "checkout.address2.input"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "city", children: "City *" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "city",
                          value: address.city,
                          onChange: updateAddress("city"),
                          placeholder: "Mumbai",
                          "data-ocid": "checkout.city.input"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "state", children: "State *" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "select",
                        {
                          id: "state",
                          value: address.state,
                          onChange: updateAddress("state"),
                          className: "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                          "data-ocid": "checkout.state.select",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select state…" }),
                            INDIAN_STATES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: s, children: s }, s))
                          ]
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "pincode", children: "PIN Code *" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "pincode",
                          value: address.pincode,
                          onChange: updateAddress("pincode"),
                          placeholder: "400001",
                          maxLength: 6,
                          pattern: "\\d{6}",
                          "data-ocid": "checkout.pincode.input"
                        }
                      ),
                      address.pincode && !/^\d{6}$/.test(address.pincode) && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          className: "text-xs text-destructive",
                          "data-ocid": "checkout.pincode.field_error",
                          children: "PIN code must be 6 digits"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "country", children: "Country" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "country",
                          value: "India",
                          readOnly: true,
                          className: "bg-muted/50 text-muted-foreground cursor-not-allowed",
                          "data-ocid": "checkout.country.input"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2 space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "gst", children: "GST Number (optional — for B2B invoicing)" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "gst",
                          value: gstNumber,
                          onChange: (e) => setGstNumber(e.target.value.toUpperCase()),
                          placeholder: "22AAAAA0000A1Z5",
                          className: "font-mono",
                          "data-ocid": "checkout.gst.input"
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      type: "button",
                      size: "lg",
                      className: "w-full gap-2 mt-2",
                      disabled: !isAddressValid,
                      onClick: () => setStep("payment"),
                      "data-ocid": "checkout.address.next_button",
                      children: [
                        "Continue to Payment ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
                      ]
                    }
                  )
                ]
              },
              "address"
            ),
            step === "payment" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, x: 30 },
                animate: { opacity: 1, x: 0 },
                exit: { opacity: 0, x: -30 },
                transition: { duration: 0.25 },
                className: "glass-card rounded-2xl p-5 sm:p-6 shadow-soft space-y-5",
                "data-ocid": "checkout.payment.panel",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-semibold text-foreground flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-4 h-4 text-primary" }),
                    " Payment Method"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "label",
                      {
                        className: `flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-smooth ${paymentMethod === "cod" ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"}`,
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "input",
                            {
                              type: "radio",
                              name: "payment",
                              value: "cod",
                              checked: paymentMethod === "cod",
                              onChange: () => setPaymentMethod("cod"),
                              className: "mt-0.5 accent-primary",
                              "data-ocid": "checkout.payment.cod.radio"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "w-5 h-5 text-primary mt-0.5 shrink-0" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground", children: "Cash on Delivery" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Pay in cash when your order arrives at your doorstep" }),
                            paymentMethod === "cod" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                              motion.div,
                              {
                                initial: { opacity: 0, height: 0 },
                                animate: { opacity: 1, height: "auto" },
                                className: "mt-3 p-3 bg-primary/8 rounded-lg border border-primary/20",
                                children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium text-primary", children: [
                                  "Pay ",
                                  formatPrice(grandTotal),
                                  " when order arrives"
                                ] })
                              }
                            )
                          ] })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "label",
                      {
                        className: `flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-smooth ${paymentMethod === "stripe" ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"}`,
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "input",
                            {
                              type: "radio",
                              name: "payment",
                              value: "stripe",
                              checked: paymentMethod === "stripe",
                              onChange: () => setPaymentMethod("stripe"),
                              className: "mt-0.5 accent-primary",
                              "data-ocid": "checkout.payment.stripe.radio"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-5 h-5 text-primary mt-0.5 shrink-0" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground", children: "Pay Online" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Credit / Debit Card, UPI, Net Banking via Stripe" }),
                            paymentMethod === "stripe" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                              motion.div,
                              {
                                initial: { opacity: 0, height: 0 },
                                animate: { opacity: 1, height: "auto" },
                                className: "mt-3 p-3 bg-primary/8 rounded-lg border border-primary/20 space-y-2",
                                children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-4 h-4 text-primary shrink-0" }),
                                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Secured by Stripe — 256-bit encryption" })
                                ] })
                              }
                            )
                          ] })
                        ]
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        type: "button",
                        variant: "outline",
                        size: "lg",
                        className: "flex-1",
                        onClick: () => setStep("address"),
                        "data-ocid": "checkout.payment.back_button",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4 mr-2" }),
                          " Back"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        type: "button",
                        size: "lg",
                        className: "flex-1 gap-2",
                        onClick: () => setStep("review"),
                        "data-ocid": "checkout.payment.next_button",
                        children: [
                          "Review Order ",
                          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
                        ]
                      }
                    )
                  ] })
                ]
              },
              "payment"
            ),
            step === "review" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, x: 30 },
                animate: { opacity: 1, x: 0 },
                exit: { opacity: 0, x: -30 },
                transition: { duration: 0.25 },
                className: "space-y-4",
                "data-ocid": "checkout.review.panel",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card rounded-2xl p-5 shadow-soft", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-semibold text-sm text-foreground mb-3 flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-4 h-4 text-primary" }),
                      " Order Items (",
                      items.length,
                      ")"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 max-h-48 overflow-y-auto scrollbar-hide", children: items.map((item, i) => {
                      const product = productMap[item.productId];
                      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          className: "flex items-center gap-3",
                          "data-ocid": `checkout.review.item.${i + 1}`,
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-11 h-11 rounded-lg overflow-hidden bg-muted shrink-0", children: (product == null ? void 0 : product.imageUrl) ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "img",
                              {
                                src: product.imageUrl,
                                alt: product.name,
                                className: "w-full h-full object-cover"
                              }
                            ) : /* @__PURE__ */ jsxRuntimeExports.jsx(ProductPlaceholder, {}) }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground line-clamp-1", children: (product == null ? void 0 : product.name) ?? `Product #${item.productId}` }),
                              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                                "Qty: ",
                                item.quantity,
                                " × ",
                                formatPrice(item.price)
                              ] })
                            ] }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-primary shrink-0", children: formatPrice(item.price * item.quantity) })
                          ]
                        },
                        item.productId
                      );
                    }) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card rounded-2xl p-5 shadow-soft", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-semibold text-sm text-foreground flex items-center gap-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-4 h-4 text-primary" }),
                        " Delivery Address"
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: () => setStep("address"),
                          className: "text-xs text-primary hover:underline",
                          "data-ocid": "checkout.review.edit_address.button",
                          children: "Edit"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-muted-foreground space-y-0.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: address.fullName }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: address.phone }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                        address.line1,
                        address.line2 ? `, ${address.line2}` : ""
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                        address.city,
                        ", ",
                        address.state,
                        " — ",
                        address.pincode
                      ] })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card rounded-2xl p-5 shadow-soft", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-semibold text-sm text-foreground flex items-center gap-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-4 h-4 text-primary" }),
                        " Payment Method"
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: () => setStep("payment"),
                          className: "text-xs text-primary hover:underline",
                          "data-ocid": "checkout.review.edit_payment.button",
                          children: "Edit"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3", children: paymentMethod === "cod" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "w-5 h-5 text-primary" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Cash on Delivery" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                          "Pay ",
                          formatPrice(grandTotal),
                          " on arrival"
                        ] })
                      ] })
                    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-5 h-5 text-primary" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Pay Online via Stripe" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Secure card / UPI payment" })
                      ] })
                    ] }) })
                  ] }),
                  orderError && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    motion.div,
                    {
                      initial: { opacity: 0, y: -8 },
                      animate: { opacity: 1, y: 0 },
                      className: "flex items-start gap-3 p-4 rounded-xl bg-destructive/8 border border-destructive/25",
                      "data-ocid": "checkout.error_state",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-4 h-4 rounded-full bg-destructive/20 flex items-center justify-center shrink-0 mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive text-xs font-bold", children: "!" }) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-destructive", children: orderError })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 p-4 rounded-xl bg-muted/50 border border-border/60", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-4 h-4 text-primary mt-0.5 shrink-0" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "A GST-compliant invoice will be automatically generated and available from your dashboard." })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        type: "button",
                        variant: "outline",
                        size: "lg",
                        className: "flex-1",
                        onClick: () => setStep("payment"),
                        "data-ocid": "checkout.review.back_button",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4 mr-2" }),
                          " Back"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        type: "button",
                        size: "lg",
                        className: "flex-1 gap-2 shadow-green font-semibold",
                        disabled: createOrder.isPending,
                        onClick: handlePlaceOrder,
                        "data-ocid": "checkout.place_order.submit_button",
                        children: createOrder.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-4 border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full animate-spin" }),
                          "Placing Order…"
                        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                          "Place Order · ",
                          formatPrice(grandTotal)
                        ] })
                      }
                    )
                  ] })
                ]
              },
              "review"
            )
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "glass-card rounded-2xl p-5 sm:p-6 shadow-elevated lg:sticky lg:top-24",
              "data-ocid": "checkout.summary.card",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-base text-foreground mb-4 pb-3 border-b border-border", children: "Order Summary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 mb-4 max-h-40 overflow-y-auto scrollbar-hide", children: items.map((item) => {
                  const p = productMap[item.productId];
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "flex items-center gap-2.5",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg overflow-hidden bg-muted shrink-0", children: (p == null ? void 0 : p.imageUrl) ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "img",
                          {
                            src: p.imageUrl,
                            alt: p.name,
                            className: "w-full h-full object-cover"
                          }
                        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(ProductPlaceholder, {}) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-foreground line-clamp-1", children: (p == null ? void 0 : p.name) ?? `#${item.productId}` }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                            "×",
                            item.quantity
                          ] })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground shrink-0", children: formatPrice(item.price * item.quantity) })
                      ]
                    },
                    item.productId
                  );
                }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "my-3" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2.5 text-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Subtotal" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: formatPrice(subtotal) })
                  ] }),
                  discount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-primary", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex items-center gap-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Badge,
                      {
                        variant: "outline",
                        className: "text-[10px] px-1 py-0 font-mono",
                        children: couponCode
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold", children: [
                      "−",
                      formatPrice(discount)
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Shipping" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: shipping === 0 ? "text-primary font-semibold" : "",
                        children: shipping === 0 ? "Free" : formatPrice(shipping)
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "GST (18%)" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatPrice(gst) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-baseline", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-base text-foreground", children: "Total" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-xl text-primary", children: formatPrice(grandTotal) })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 pt-4 border-t border-border/50 flex items-center justify-center gap-1 text-xs text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-3.5 h-3.5 text-primary" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "SSL secured · 100% safe checkout" })
                ] })
              ]
            }
          ) })
        ] })
      ] })
    }
  );
}
export {
  CheckoutPage as default
};
