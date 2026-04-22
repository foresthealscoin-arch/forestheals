import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, a as Button, I as Input, e as ue } from "./index-CfU2kVIJ.js";
import { L as Label } from "./label-BjUfKOjb.js";
import { S as Skeleton } from "./skeleton-Dbe_tSkr.js";
import { U as useAdminSettings, V as useSaveAdminSettings, A as AdminPLayout, X as Store } from "./AdminPLayout-CIt5RHz_.js";
import { a as toNumber } from "./convert-Cs1e6Uux.js";
import { C as CircleAlert } from "./circle-alert-ucF-SypE.js";
import { R as RefreshCw } from "./refresh-cw-CczYOB5W.js";
import "./useMutation-DVPdZiQH.js";
import "./leaf-BdKoN6HX.js";
import "./chevron-right-DNGmMEAY.js";
import "./package-C5tkAuNr.js";
import "./users-BTrxV2BM.js";
import "./star-D6nQNTvb.js";
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
      d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
      key: "1c8476"
    }
  ],
  ["path", { d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7", key: "1ydtos" }],
  ["path", { d: "M7 3v4a1 1 0 0 0 1 1h7", key: "t51u73" }]
];
const Save = createLucideIcon("save", __iconNode);
const DEFAULT_SETTINGS = {
  storeName: "Forestheals",
  contactEmail: "hello@forestheals.in",
  contactPhone: "+91 9929059240",
  gstNumber: "",
  gstRate: BigInt(18),
  currency: "INR",
  timezone: "Asia/Kolkata",
  seoTitle: "Forestheals — From Forest to Homes",
  seoDescription: "Premium eco-Ayurvedic products sourced from nature's heart.",
  logoUrl: "/assets/logo.png",
  faviconUrl: "/favicon.ico",
  facebookUrl: "",
  instagramUrl: "",
  whatsappNumber: "9929059240",
  shippingDefault: BigInt(50),
  freeShippingThreshold: BigInt(499)
};
function settingsToForm(s) {
  return {
    storeName: s.storeName,
    contactEmail: s.contactEmail,
    contactPhone: s.contactPhone,
    gstNumber: s.gstNumber,
    gstRate: toNumber(s.gstRate),
    currency: s.currency,
    timezone: s.timezone,
    seoTitle: s.seoTitle,
    seoDescription: s.seoDescription,
    logoUrl: s.logoUrl,
    faviconUrl: s.faviconUrl,
    facebookUrl: s.facebookUrl,
    instagramUrl: s.instagramUrl,
    whatsappNumber: s.whatsappNumber,
    shippingDefault: toNumber(s.shippingDefault),
    freeShippingThreshold: toNumber(s.freeShippingThreshold)
  };
}
function formToSettings(f) {
  return {
    storeName: f.storeName,
    contactEmail: f.contactEmail,
    contactPhone: f.contactPhone,
    gstNumber: f.gstNumber,
    gstRate: BigInt(f.gstRate),
    currency: f.currency,
    timezone: f.timezone,
    seoTitle: f.seoTitle,
    seoDescription: f.seoDescription,
    logoUrl: f.logoUrl,
    faviconUrl: f.faviconUrl,
    facebookUrl: f.facebookUrl,
    instagramUrl: f.instagramUrl,
    whatsappNumber: f.whatsappNumber,
    shippingDefault: BigInt(f.shippingDefault),
    freeShippingThreshold: BigInt(f.freeShippingThreshold)
  };
}
function AdminPSettings() {
  const { data: settings, isLoading, isError, refetch } = useAdminSettings();
  const saveMutation = useSaveAdminSettings();
  const [form, setForm] = reactExports.useState(settingsToForm(DEFAULT_SETTINGS));
  reactExports.useEffect(() => {
    if (settings) setForm(settingsToForm(settings));
  }, [settings]);
  async function handleSave() {
    try {
      await saveMutation.mutateAsync(formToSettings(form));
      ue.success("Settings saved successfully!");
    } catch {
      ue.error("Failed to save settings. Please try again.");
    }
  }
  if (isError) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      AdminPLayout,
      {
        title: "Store Settings",
        subtitle: "Configure your store preferences",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-red-50 border border-red-200 rounded-2xl p-8 text-center",
            "data-ocid": "adminp.settings.error_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-8 h-8 text-red-400 mx-auto mb-3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-red-700 font-medium", children: "Failed to load settings" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "outline",
                  size: "sm",
                  className: "mt-3",
                  onClick: () => void refetch(),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4 mr-1" }),
                    " Retry"
                  ]
                }
              )
            ]
          }
        )
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    AdminPLayout,
    {
      title: "Store Settings",
      subtitle: "Configure your store preferences and details",
      actions: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          size: "sm",
          className: "gap-1 bg-[#004a38] hover:bg-[#003a2c]",
          onClick: () => void handleSave(),
          disabled: saveMutation.isPending,
          "data-ocid": "adminp.settings.save_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-4 h-4" }),
            " ",
            saveMutation.isPending ? "Saving…" : "Save Settings"
          ]
        }
      ),
      children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "max-w-2xl space-y-4",
          "data-ocid": "adminp.settings.loading_state",
          children: ["a", "b", "c"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-40 w-full rounded-2xl" }, k))
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border border-gray-100 shadow-sm p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Store, { className: "w-5 h-5 text-[#004a38]" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-gray-900", children: "Store Information" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Store Name" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  value: form.storeName,
                  onChange: (e) => setForm((f) => ({ ...f, storeName: e.target.value })),
                  "data-ocid": "adminp.settings.store_name_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Contact Email" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  type: "email",
                  value: form.contactEmail,
                  onChange: (e) => setForm((f) => ({ ...f, contactEmail: e.target.value })),
                  "data-ocid": "adminp.settings.contact_email_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Contact Phone" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  value: form.contactPhone,
                  onChange: (e) => setForm((f) => ({ ...f, contactPhone: e.target.value })),
                  "data-ocid": "adminp.settings.contact_phone_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "WhatsApp Number" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  value: form.whatsappNumber,
                  onChange: (e) => setForm((f) => ({ ...f, whatsappNumber: e.target.value })),
                  "data-ocid": "adminp.settings.whatsapp_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "GST Number" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  value: form.gstNumber,
                  onChange: (e) => setForm((f) => ({ ...f, gstNumber: e.target.value })),
                  "data-ocid": "adminp.settings.gst_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "GST Rate (%)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  type: "number",
                  min: 0,
                  max: 28,
                  value: form.gstRate,
                  onChange: (e) => setForm((f) => ({ ...f, gstRate: Number(e.target.value) }))
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border border-gray-100 shadow-sm p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-gray-900 mb-5", children: "Shipping" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Default Shipping (₹)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  type: "number",
                  min: 0,
                  value: form.shippingDefault,
                  onChange: (e) => setForm((f) => ({
                    ...f,
                    shippingDefault: Number(e.target.value)
                  }))
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Free Shipping From (₹)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  type: "number",
                  min: 0,
                  value: form.freeShippingThreshold,
                  onChange: (e) => setForm((f) => ({
                    ...f,
                    freeShippingThreshold: Number(e.target.value)
                  }))
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border border-gray-100 shadow-sm p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-gray-900 mb-5", children: "Social Links & SEO" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Facebook URL" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  value: form.facebookUrl,
                  onChange: (e) => setForm((f) => ({ ...f, facebookUrl: e.target.value })),
                  placeholder: "https://facebook.com/forestheals"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Instagram URL" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  value: form.instagramUrl,
                  onChange: (e) => setForm((f) => ({ ...f, instagramUrl: e.target.value })),
                  placeholder: "https://instagram.com/forestheals"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "SEO Title" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  value: form.seoTitle,
                  onChange: (e) => setForm((f) => ({ ...f, seoTitle: e.target.value })),
                  "data-ocid": "adminp.settings.seo_title_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "SEO Description" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  value: form.seoDescription,
                  onChange: (e) => setForm((f) => ({ ...f, seoDescription: e.target.value })),
                  "data-ocid": "adminp.settings.seo_desc_input"
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border border-gray-100 shadow-sm p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-gray-900 mb-5", children: "Localization" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Currency" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  value: form.currency,
                  onChange: (e) => setForm((f) => ({ ...f, currency: e.target.value })),
                  "data-ocid": "adminp.settings.currency_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Timezone" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  value: form.timezone,
                  onChange: (e) => setForm((f) => ({ ...f, timezone: e.target.value })),
                  "data-ocid": "adminp.settings.timezone_input"
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            className: "bg-[#004a38] hover:bg-[#003a2c] w-full gap-2",
            onClick: () => void handleSave(),
            disabled: saveMutation.isPending,
            "data-ocid": "adminp.settings.submit_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-4 h-4" }),
              " ",
              saveMutation.isPending ? "Saving…" : "Save All Settings"
            ]
          }
        )
      ] })
    }
  );
}
export {
  AdminPSettings as default
};
