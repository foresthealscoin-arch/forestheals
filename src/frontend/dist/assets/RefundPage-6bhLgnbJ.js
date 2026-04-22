import { j as jsxRuntimeExports, L as Link } from "./index-CfU2kVIJ.js";
import { L as Leaf } from "./leaf-BdKoN6HX.js";
const LAST_UPDATED = "January 1, 2025";
function Section({
  title,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold text-foreground mb-3", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground leading-relaxed", children })
  ] });
}
function RefundPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border py-10 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2 mb-5 w-fit", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-primary flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Leaf, { className: "w-4 h-4 text-primary-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-foreground", children: "Forestheals" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold text-foreground mb-2", children: "Refund & Return Policy" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm", children: [
        "Last updated: ",
        LAST_UPDATED
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "max-w-3xl mx-auto px-4 py-12",
        "data-ocid": "refund.content.section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-primary/5 border border-primary/15 rounded-2xl p-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-bold text-foreground mb-2", children: "Our Commitment to You" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
              "We stand by the quality of every Forestheals product. If you're not satisfied for any reason, we offer a",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-primary", children: "30-day hassle-free return" }),
              " ",
              "policy. Your satisfaction is our promise."
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "1. Return Eligibility", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-3", children: "You may request a return or refund within 30 days of the delivery date, provided:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc list-inside space-y-2 ml-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "The product is unused and in its original sealed packaging" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "The product has not been tampered with or opened (unless defective)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "You have the original order confirmation or invoice" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: 'The product was not purchased as part of a flash sale marked "non-refundable"' })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "2. Non-Returnable Items", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-3", children: "The following items are not eligible for return or refund:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc list-inside space-y-2 ml-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Opened or partially consumed products (except defective items)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Products with broken seals due to customer handling" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Perishable items beyond their best-before date" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Gift cards or promotional vouchers" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: 'Items marked "Final Sale" at the time of purchase' })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "3. Return Process", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-3", children: "To initiate a return, follow these steps:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("ol", { className: "list-decimal list-inside space-y-3 ml-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Contact us" }),
                " within 30 days of delivery at",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "a",
                  {
                    href: "mailto:returns@forestheals.in",
                    className: "text-primary hover:underline",
                    children: "returns@forestheals.in"
                  }
                ),
                " ",
                "or WhatsApp us at +91 99290 59240 with your order ID and reason for return."
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Receive approval" }),
                " — our support team will review your request within 2 business days and send you a return authorisation code."
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Ship the item" }),
                " — pack the item securely and ship it to our returns centre in Jaipur using your preferred courier. Include the return authorisation code inside the package."
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Receive refund" }),
                " — once we receive and inspect the returned item, we will process your refund within 5-7 business days."
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "4. Refund Methods", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-3", children: "Refunds are issued using the original payment method:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc list-inside space-y-2 ml-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Credit/Debit Card (Stripe):" }),
                " ",
                "Refund to original card within 5-7 business days"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Cash on Delivery:" }),
                " ",
                "Bank transfer (NEFT/IMPS) within 7-10 business days"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Store Credit:" }),
                " ",
                "Available immediately as an alternative, valid for 12 months"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3", children: "Original shipping charges are non-refundable unless the return is due to our error or a defective product." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "5. Damaged or Defective Products", children: "If you receive a damaged, defective, or incorrect product, please notify us within 48 hours of delivery with photographic evidence. We will arrange a free return pickup and issue a full refund or replacement at no additional cost to you." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "6. Exchanges", children: "We currently do not process direct exchanges. If you wish to exchange a product, please initiate a return for the original item and place a new order for the desired product. This ensures faster processing and availability confirmation." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "7. Late or Missing Refunds", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-2", children: "If you haven't received your refund after the stated timeline, please:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("ol", { className: "list-decimal list-inside space-y-2 ml-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Check your bank account or card statement" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Contact your bank or card issuer — processing times vary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "If still unresolved, email us at returns@forestheals.in with your return reference number" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "8. Cancellations", children: "Orders may be cancelled free of charge within 2 hours of placement. After this window, cancellation may not be possible if the order has been processed for dispatch. For COD orders, you may refuse delivery — however, repeated refusals may affect your account standing." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "9. Returns Support", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
              "📧 Email:",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "a",
                {
                  href: "mailto:returns@forestheals.in",
                  className: "text-primary hover:underline",
                  children: "returns@forestheals.in"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "📱 WhatsApp: +91 99290 59240 (Mon–Sat, 10am–6pm IST)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "📍 Returns Address: Forestheals Returns Centre, Jaipur, Rajasthan 302001" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-4 border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/legal/terms",
                className: "text-primary hover:underline",
                "data-ocid": "refund.terms_link",
                children: "Terms & Conditions"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/legal/privacy",
                className: "text-primary hover:underline",
                "data-ocid": "refund.privacy_link",
                children: "Privacy Policy"
              }
            )
          ] }) })
        ] })
      }
    )
  ] });
}
export {
  RefundPage as default
};
