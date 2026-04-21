import { r as reactExports, j as jsxRuntimeExports, m as motion, B as Badge, I as Input, a as Button, d as ue } from "./index-Oxc-_oxi.js";
import { L as Label } from "./label-5KV58XeA.js";
import { T as Textarea } from "./textarea-PutpG2kr.js";
import { P as Package } from "./package-6xCQkTPQ.js";
import { U as Users } from "./users-Dm9XPlxR.js";
import { G as Globe } from "./globe-7eLTl_XL.js";
import { T as TrendingUp } from "./trending-up-CreNqbnI.js";
import { C as CircleCheckBig } from "./circle-check-big-aYA9Pqja.js";
import { D as Download } from "./download-HS9sT9T1.js";
const CATEGORIES = [
  "Ayurvedic Powders",
  "Essential Oils",
  "Spiritual Products",
  "Pure Cotton",
  "Eco-Friendly",
  "Handicrafts",
  "Bio-Coal"
];
const STATS = [
  { icon: Package, label: "Products", value: "50+" },
  { icon: Users, label: "B2B Partners", value: "500+" },
  { icon: Globe, label: "Countries", value: "12" },
  { icon: TrendingUp, label: "Revenue", value: "₹10Cr+" }
];
const EXPORT_COUNTRIES = [
  { flag: "🇮🇳", name: "India" },
  { flag: "🇦🇪", name: "UAE" },
  { flag: "🇬🇧", name: "UK" },
  { flag: "🇺🇸", name: "USA" },
  { flag: "🇸🇬", name: "Singapore" },
  { flag: "🇩🇪", name: "Germany" }
];
const BULK_TIERS = [
  { qty: "1 – 10 kg", discount: "—" },
  { qty: "11 – 50 kg", discount: "10% off" },
  { qty: "51 – 200 kg", discount: "20% off" },
  { qty: "200 kg +", discount: "Contact us" }
];
function B2BPage() {
  const [form, setForm] = reactExports.useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    productInterest: [],
    quantity: "",
    message: ""
  });
  const [submitted, setSubmitted] = reactExports.useState(false);
  const [loading, setLoading] = reactExports.useState(false);
  const toggleCategory = (cat) => {
    setForm((prev) => ({
      ...prev,
      productInterest: prev.productInterest.includes(cat) ? prev.productInterest.filter((c) => c !== cat) : [...prev.productInterest, cat]
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.companyName || !form.contactName || !form.email || !form.phone) {
      ue.error("Please fill in all required fields");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1e3));
    setLoading(false);
    setSubmitted(true);
    ue.success("Inquiry submitted! We'll contact you within 24 hours.");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "gradient-hero py-20 px-4 relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 opacity-10 pointer-events-none", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-10 right-20 w-64 h-64 rounded-full bg-secondary blur-3xl" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 left-0 w-96 h-48 rounded-full bg-accent blur-3xl" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "max-w-5xl mx-auto relative z-10",
          "data-ocid": "b2b.hero.section",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.55 },
                className: "text-center",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-secondary/20 text-secondary border-secondary/30 mb-5", children: "B2B & Export" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl md:text-6xl font-bold text-primary-foreground mb-6 font-display leading-tight", children: "Grow Together with Forestheals" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl text-primary-foreground/75 max-w-2xl mx-auto mb-12", children: "Premium natural products for bulk orders, retail partnerships, and global export" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: 0.2, duration: 0.5 },
                className: "grid grid-cols-2 md:grid-cols-4 gap-6",
                "data-ocid": "b2b.stats.section",
                children: STATS.map(({ icon: Icon, label, value }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "glass-card rounded-2xl p-5 text-center",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-6 h-6 text-secondary mx-auto mb-2" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl font-bold text-primary-foreground", children: value }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-primary-foreground/60 mt-1", children: label })
                    ]
                  },
                  label
                ))
              }
            )
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-4 py-14 grid md:grid-cols-5 gap-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: -20 },
          whileInView: { opacity: 1, x: 0 },
          viewport: { once: true },
          transition: { duration: 0.5 },
          className: "md:col-span-3",
          "data-ocid": "b2b.inquiry.section",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-foreground mb-2", children: "Submit a Bulk Inquiry" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-6", children: "Fill in the form and our partnership team will respond within 24 hours." }),
            submitted ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, scale: 0.95 },
                animate: { opacity: 1, scale: 1 },
                className: "glass-card rounded-2xl p-10 text-center shadow-soft",
                "data-ocid": "b2b.inquiry.success_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-14 h-14 text-primary mx-auto mb-4" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold text-foreground mb-2", children: "Inquiry Received!" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
                    "Thank you, ",
                    form.contactName,
                    ". Our B2B team will reach out to",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: form.email }),
                    " within 24 hours."
                  ] })
                ]
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "form",
              {
                onSubmit: handleSubmit,
                className: "glass-card rounded-2xl p-6 shadow-soft space-y-5",
                "data-ocid": "b2b.inquiry.form",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "companyName", children: "Company Name *" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "companyName",
                          value: form.companyName,
                          onChange: (e) => setForm({ ...form, companyName: e.target.value }),
                          placeholder: "Acme Wellness Pvt Ltd",
                          "data-ocid": "b2b.company_name.input",
                          required: true
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "contactName", children: "Contact Name *" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "contactName",
                          value: form.contactName,
                          onChange: (e) => setForm({ ...form, contactName: e.target.value }),
                          placeholder: "Rajesh Kumar",
                          "data-ocid": "b2b.contact_name.input",
                          required: true
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "b2bEmail", children: "Email *" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "b2bEmail",
                          type: "email",
                          value: form.email,
                          onChange: (e) => setForm({ ...form, email: e.target.value }),
                          placeholder: "rajesh@acme.com",
                          "data-ocid": "b2b.email.input",
                          required: true
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "b2bPhone", children: "Phone *" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "b2bPhone",
                          type: "tel",
                          value: form.phone,
                          onChange: (e) => setForm({ ...form, phone: e.target.value }),
                          placeholder: "+91 98765 43210",
                          "data-ocid": "b2b.phone.input",
                          required: true
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Product Interest" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "flex flex-wrap gap-2",
                        "data-ocid": "b2b.categories.list",
                        children: CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "button",
                          {
                            type: "button",
                            onClick: () => toggleCategory(cat),
                            className: `px-3 py-1.5 rounded-full text-sm font-medium border transition-smooth
                        ${form.productInterest.includes(cat) ? "bg-primary text-primary-foreground border-primary" : "bg-card text-foreground border-border hover:border-primary/50"}`,
                            "data-ocid": "b2b.category.toggle",
                            children: cat
                          },
                          cat
                        ))
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "quantity", children: "Quantity Needed" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "select",
                      {
                        id: "quantity",
                        value: form.quantity,
                        onChange: (e) => setForm({ ...form, quantity: e.target.value }),
                        className: "w-full h-10 px-3 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring",
                        "data-ocid": "b2b.quantity.select",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select quantity range" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "10-50kg", children: "10 – 50 kg" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "50-100kg", children: "50 – 100 kg" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "100-500kg", children: "100 – 500 kg" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "500kg+", children: "500 kg +" })
                        ]
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "b2bMessage", children: "Message / Special Requirements" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Textarea,
                      {
                        id: "b2bMessage",
                        value: form.message,
                        onChange: (e) => setForm({ ...form, message: e.target.value }),
                        placeholder: "Tell us about your business and requirements...",
                        rows: 4,
                        "data-ocid": "b2b.message.textarea"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "submit",
                      size: "lg",
                      className: "w-full",
                      disabled: loading,
                      "data-ocid": "b2b.inquiry.submit_button",
                      children: loading ? "Submitting…" : "Submit Inquiry"
                    }
                  )
                ]
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-2 space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, x: 20 },
            whileInView: { opacity: 1, x: 0 },
            viewport: { once: true },
            transition: { duration: 0.45 },
            className: "gradient-eco rounded-2xl p-6 shadow-green text-primary-foreground",
            "data-ocid": "b2b.biocoal.section",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold mb-1", children: "🌿 Bio-Coal" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-primary-foreground/80 mb-1 font-semibold", children: "Sustainable Fuel for Industry" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-primary-foreground/70 mb-4 leading-relaxed", children: "Biomass fuel crafted from agricultural waste — carbon-neutral, export-ready, and certified for international markets." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 mb-4", children: ["ISO 9001", "MSDS Compliant", "Export Ready"].map((cert) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  className: "bg-primary-foreground/15 text-primary-foreground border-primary-foreground/20 text-xs",
                  children: cert
                },
                cert
              )) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  variant: "secondary",
                  size: "sm",
                  className: "w-full",
                  "data-ocid": "b2b.biocoal.download_button",
                  onClick: () => ue.info("Product spec PDF coming soon"),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4 mr-2" }),
                    "Download Product Spec"
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, x: 20 },
            whileInView: { opacity: 1, x: 0 },
            viewport: { once: true },
            transition: { delay: 0.1, duration: 0.45 },
            className: "glass-card rounded-2xl p-5 shadow-soft",
            "data-ocid": "b2b.export.section",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-bold text-foreground mb-1", children: "🌍 Global Shipping" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-4", children: "Shipping globally with compliance documentation" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2", children: EXPORT_COUNTRIES.map(({ flag, name }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex flex-col items-center gap-1 p-2 bg-muted/50 rounded-xl",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: flag }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: name })
                  ]
                },
                name
              )) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, x: 20 },
            whileInView: { opacity: 1, x: 0 },
            viewport: { once: true },
            transition: { delay: 0.2, duration: 0.45 },
            className: "glass-card rounded-2xl p-5 shadow-soft",
            "data-ocid": "b2b.pricing.section",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-bold text-foreground mb-4", children: "💰 Bulk Pricing" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left text-muted-foreground font-medium pb-2 text-xs", children: "Quantity" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right text-muted-foreground font-medium pb-2 text-xs", children: "Discount" })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: BULK_TIERS.map((tier) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "tr",
                  {
                    className: "border-b border-border/50 last:border-0",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 text-foreground", children: tier.qty }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "td",
                        {
                          className: `py-2.5 text-right font-semibold ${tier.discount === "—" ? "text-muted-foreground" : "text-primary"}`,
                          children: tier.discount
                        }
                      )
                    ]
                  },
                  tier.qty
                )) })
              ] })
            ]
          }
        )
      ] })
    ] })
  ] });
}
export {
  B2BPage as default
};
