import { c as createLucideIcon, x as useAdminPStore, r as reactExports, j as jsxRuntimeExports, I as Input, a as Button, d as ue } from "./index-Oxc-_oxi.js";
import { L as Label } from "./label-5KV58XeA.js";
import { A as AdminPLayout, S as Store } from "./AdminPLayout-DOfPyUMC.js";
import "./leaf-N_oh7OWh.js";
import "./chevron-right-D_aTDRZh.js";
import "./package-6xCQkTPQ.js";
import "./shopping-cart-DpA4wU_V.js";
import "./users-Dm9XPlxR.js";
import "./star-DV5fN0x3.js";
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
function AdminPSettings() {
  const settings = useAdminPStore((s) => s.settings);
  const updateSettings = useAdminPStore((s) => s.updateSettings);
  const [form, setForm] = reactExports.useState({ ...settings });
  function handleSave() {
    updateSettings(form);
    ue.success("Settings saved successfully!");
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
          onClick: handleSave,
          "data-ocid": "adminp.settings.save_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-4 h-4" }),
            " Save Settings"
          ]
        }
      ),
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl space-y-6", children: [
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
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "GST Number" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  value: form.gstNumber,
                  onChange: (e) => setForm((f) => ({ ...f, gstNumber: e.target.value })),
                  "data-ocid": "adminp.settings.gst_input"
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
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-green-50 border border-green-200 rounded-2xl p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-green-900 text-sm mb-2", children: "Admin Panel Credentials" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1 text-sm text-green-800", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Username:" }),
              " forestheals"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Password:" }),
              " domex@1000"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Access URL:" }),
              " /admin-p"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-green-600 mt-3", children: "To change credentials, update the values in AdminPLoginPage.tsx and adminpStore.ts." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            className: "bg-[#004a38] hover:bg-[#003a2c] w-full gap-2",
            onClick: handleSave,
            "data-ocid": "adminp.settings.submit_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-4 h-4" }),
              " Save All Settings"
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
