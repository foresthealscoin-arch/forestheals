import { c as createLucideIcon, i as useAuthStore, r as reactExports, k as redirect, j as jsxRuntimeExports, m as motion, a as Button, L as Link, A as AnimatePresence, I as Input, P as PRODUCTS_SEED_DATA, B as Badge } from "./index-BTLW_NIC.js";
import { L as Label } from "./label-BUCCGSyY.js";
import { S as Separator } from "./separator-CojwXxA6.js";
import { u as useCart } from "./useCart-BvpO-d44.js";
import { u as useCreateOrder } from "./useOrders-CumPQW3r.js";
import { f as formatPrice } from "./formatters-C5vW1ZnJ.js";
import { M as MapPin } from "./map-pin-ChRWiBAJ.js";
import { C as CreditCard } from "./credit-card-BJX53ept.js";
import { C as CircleCheck } from "./circle-check-BBKQs0Vb.js";
import { P as Package } from "./package-CJHu-mD6.js";
import { A as ArrowLeft } from "./arrow-left-iW99Tmf3.js";
import { S as ShieldCheck } from "./shield-check-DFt1t1fq.js";
import { A as ArrowRight } from "./arrow-right-DjP4Z_RZ.js";
import { T as Truck } from "./truck-su5aUVQW.js";
import "./useMutation-Cg-O1UYS.js";
import "./useQuery-BNvAOOwo.js";
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
function CheckoutPage() {
  const { isLoggedIn, principal } = useAuthStore();
  const { items, discount, couponCode, clearAllCart } = useCart();
  const createOrder = useCreateOrder();
  const [orderId, setOrderId] = reactExports.useState(null);
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
  const handlePlaceOrder = async () => {
    const input = {
      items,
      totalAmount: grandTotal,
      paymentMethod,
      address,
      couponCode: couponCode || void 0,
      discountAmount: discount
    };
    const order = await createOrder.mutateAsync(input);
    clearAllCart();
    setOrderId(order.id);
  };
  const steps = [
    { id: "address", label: "Delivery", icon: MapPin },
    { id: "payment", label: "Payment", icon: CreditCard },
    { id: "review", label: "Review", icon: FileText }
  ];
  const stepIndex = steps.findIndex((s) => s.id === step);
  if (orderId !== null) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "min-h-[85vh] flex flex-col items-center justify-center gap-8 px-4 relative overflow-hidden",
        "data-ocid": "checkout.success_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 pointer-events-none overflow-hidden z-10", children: CONFETTI_PIECES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(ConfettiPiece, { index: c.index }, c.id)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { scale: 0, rotate: -15 },
              animate: { scale: 1, rotate: 0 },
              transition: { type: "spring", stiffness: 200, damping: 14 },
              className: "w-28 h-28 rounded-full bg-primary/10 flex items-center justify-center",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-14 h-14 text-primary" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.35 },
              className: "text-center max-w-md",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl sm:text-4xl font-bold text-foreground mb-3", children: "Order Placed! 🎉" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed mb-2", children: "Thank you for choosing Forestheals. Your order has been confirmed and we'll start processing it right away." }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 bg-muted/50 rounded-full mt-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-4 h-4 text-primary" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-mono font-semibold text-foreground", children: [
                    "Order #",
                    orderId
                  ] })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 16 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.5 },
              className: "glass-card rounded-2xl p-4 shadow-soft max-w-sm w-full text-sm text-muted-foreground",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-4 h-4 text-primary mt-0.5 shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "A GST invoice will be generated for your order. You can download it from your dashboard." })
              ] })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { delay: 0.65 },
              className: "flex flex-col sm:flex-row gap-3 z-20",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    size: "lg",
                    asChild: true,
                    className: "shadow-green",
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
      className: "min-h-screen bg-background py-8 px-4 sm:px-6",
      "data-ocid": "checkout.page",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container max-w-5xl mx-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "ghost",
              size: "sm",
              asChild: true,
              className: "gap-1.5",
              "data-ocid": "checkout.back.button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/cart", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
                " Back to Cart"
              ] })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { orientation: "vertical", className: "h-5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-xl sm:text-2xl font-bold text-foreground", children: "Secure Checkout" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-5 h-5 text-primary ml-auto hidden sm:block" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "flex items-center gap-0 mb-10 max-w-sm mx-auto lg:mx-0",
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
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-5 gap-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatePresence, { mode: "wait", children: [
            step === "address" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, x: 30 },
                animate: { opacity: 1, x: 0 },
                exit: { opacity: 0, x: -30 },
                transition: { duration: 0.25 },
                className: "glass-card rounded-2xl p-6 shadow-soft space-y-5",
                "data-ocid": "checkout.address.panel",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-semibold text-foreground flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-4 h-4 text-primary" }),
                    " Delivery Address"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
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
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "email", children: "Email" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "email",
                          type: "email",
                          value: principal ?? "",
                          readOnly: true,
                          className: "bg-muted/50 text-muted-foreground cursor-not-allowed",
                          "data-ocid": "checkout.email.input"
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
                className: "glass-card rounded-2xl p-6 shadow-soft space-y-5",
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
                            paymentMethod === "cod" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                              motion.div,
                              {
                                initial: { opacity: 0, height: 0 },
                                animate: { opacity: 1, height: "auto" },
                                className: "mt-3 p-3 bg-primary/8 rounded-lg border border-primary/20",
                                children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium text-primary", children: [
                                    "Pay ",
                                    formatPrice(grandTotal),
                                    " when order arrives"
                                  ] }),
                                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Keep exact change ready for smooth delivery" })
                                ]
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
                            paymentMethod === "stripe" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                              motion.div,
                              {
                                initial: { opacity: 0, height: 0 },
                                animate: { opacity: 1, height: "auto" },
                                className: "mt-3 p-3 bg-primary/8 rounded-lg border border-primary/20 space-y-2",
                                children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                                    /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-4 h-4 text-primary shrink-0" }),
                                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Secured by Stripe — 256-bit encryption" })
                                  ] }),
                                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                                    "You'll be redirected to Stripe's secure payment page to complete payment of",
                                    " ",
                                    /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: formatPrice(grandTotal) })
                                  ] })
                                ]
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
                      " Order Items"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: items.map((item, i) => {
                      const product = PRODUCTS_SEED_DATA.find(
                        (p) => p.id === item.productId
                      );
                      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          className: "flex items-center gap-3",
                          "data-ocid": `checkout.review.item.${i + 1}`,
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-lg overflow-hidden bg-muted shrink-0", children: product && /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "img",
                              {
                                src: product.imageUrl,
                                alt: product.name,
                                className: "w-full h-full object-cover"
                              }
                            ) }),
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
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: address.country }),
                      gstNumber && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-xs mt-1", children: [
                        "GST: ",
                        gstNumber
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
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 p-4 rounded-xl bg-muted/50 border border-border/60", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-4 h-4 text-primary mt-0.5 shrink-0" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "A GST-compliant invoice will be automatically generated for your order. You can download it from your dashboard after order confirmation." })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
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
              className: "glass-card rounded-2xl p-6 shadow-elevated sticky top-24",
              "data-ocid": "checkout.summary.card",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-base text-foreground mb-4 pb-3 border-b border-border", children: "Order Summary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 mb-4 max-h-48 overflow-y-auto scrollbar-hide", children: items.map((item) => {
                  const p = PRODUCTS_SEED_DATA.find(
                    (pr) => pr.id === item.productId
                  );
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "flex items-center gap-2.5",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg overflow-hidden bg-muted shrink-0", children: p && /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "img",
                          {
                            src: p.imageUrl,
                            alt: p.name,
                            className: "w-full h-full object-cover"
                          }
                        ) }),
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
