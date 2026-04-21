import { x as useAdminPStore, r as reactExports, j as jsxRuntimeExports, a as Button, I as Input, d as ue } from "./index-Oxc-_oxi.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-D5S7-Nn1.js";
import { L as Label } from "./label-5KV58XeA.js";
import { A as AdminPLayout } from "./AdminPLayout-DOfPyUMC.js";
import { M as Minus } from "./minus-BIpjT4p2.js";
import { P as Plus } from "./plus-C8NM5nzO.js";
import { P as Pen } from "./pen-BZwjPUds.js";
import { P as Package } from "./package-6xCQkTPQ.js";
import "./index-B6-06I7M.js";
import "./index-BtdL0eLz.js";
import "./index-DYUerbpP.js";
import "./index-njhBbO9Y.js";
import "./index-BIglNuiB.js";
import "./leaf-N_oh7OWh.js";
import "./chevron-right-D_aTDRZh.js";
import "./shopping-cart-DpA4wU_V.js";
import "./users-Dm9XPlxR.js";
import "./star-DV5fN0x3.js";
function AdminPInventory() {
  const inventory = useAdminPStore((s) => s.inventory);
  const updateInventoryItem = useAdminPStore((s) => s.updateInventoryItem);
  const [editTarget, setEditTarget] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState({});
  function openEdit(item) {
    setEditTarget(item);
    setForm({ ...item });
  }
  function handleSave() {
    if (!editTarget) return;
    updateInventoryItem({ ...editTarget, ...form });
    ue.success("Inventory updated");
    setEditTarget(null);
  }
  function adjust(item, delta) {
    const updated = { ...item, current: Math.max(0, item.current + delta) };
    updateInventoryItem(updated);
    ue.success(
      `Stock ${delta > 0 ? "increased" : "decreased"} by ${Math.abs(delta)}`
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    AdminPLayout,
    {
      title: "Inventory Management",
      subtitle: "Track stock levels, batches, and suppliers",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4 mb-6", children: [
          {
            label: "Total SKUs",
            value: inventory.length,
            color: "text-gray-900"
          },
          {
            label: "Low Stock Items",
            value: inventory.filter((i) => i.current < i.lowStockThreshold).length,
            color: "text-orange-600"
          },
          {
            label: "Out of Stock",
            value: inventory.filter((i) => i.current === 0).length,
            color: "text-red-600"
          },
          {
            label: "Incoming Stock",
            value: inventory.filter((i) => i.incoming > 0).length,
            color: "text-blue-600"
          }
        ].map((card) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-white rounded-2xl border border-gray-100 shadow-sm p-5",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 font-medium uppercase tracking-wide", children: card.label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-2xl font-bold mt-1 ${card.color}`, children: card.value })
            ]
          },
          card.label
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", "data-ocid": "adminp.inventory.table", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-gray-50 text-gray-500 text-xs uppercase tracking-wide border-b border-gray-100", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-5 py-3 font-medium", children: "Product" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-medium hidden md:table-cell", children: "SKU" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-medium", children: "Current" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-medium hidden sm:table-cell", children: "Reserved" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-medium hidden lg:table-cell", children: "Incoming" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-medium hidden xl:table-cell", children: "Batch / Expiry" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-medium", children: "Adjust" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-medium", children: "Edit" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
            inventory.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "tr",
              {
                "data-ocid": `adminp.inventory.item.${i + 1}`,
                className: `border-t border-gray-50 hover:bg-gray-50/60 transition-colors ${item.current < item.lowStockThreshold ? "bg-orange-50/40" : ""}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-5 py-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-gray-900 text-sm truncate max-w-[150px]", children: item.productName }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-400", children: item.supplier })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 hidden md:table-cell font-mono text-xs text-gray-500", children: item.sku }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: `font-bold text-sm ${item.current === 0 ? "text-red-600" : item.current < item.lowStockThreshold ? "text-orange-600" : "text-green-700"}`,
                      children: item.current
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right hidden sm:table-cell text-gray-500 text-xs", children: item.reserved }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right hidden lg:table-cell", children: item.incoming > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-blue-600 font-medium text-xs", children: [
                    "+",
                    item.incoming
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-400 text-xs", children: "—" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 hidden xl:table-cell", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-600", children: item.batchNo }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-400", children: item.expiryDate })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => adjust(item, -1),
                        className: "w-6 h-6 rounded bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors",
                        "data-ocid": `adminp.inventory.item.${i + 1}.decrease_button`,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "w-3 h-3" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => adjust(item, 1),
                        className: "w-6 h-6 rounded bg-green-100 hover:bg-green-200 flex items-center justify-center text-green-700 transition-colors",
                        "data-ocid": `adminp.inventory.item.${i + 1}.increase_button`,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3 h-3" })
                      }
                    )
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      size: "icon",
                      variant: "ghost",
                      className: "h-7 w-7",
                      onClick: () => openEdit(item),
                      "data-ocid": `adminp.inventory.item.${i + 1}.edit_button`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "w-3.5 h-3.5" })
                    }
                  ) })
                ]
              },
              item.id
            )),
            inventory.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "td",
              {
                colSpan: 8,
                className: "py-12 text-center",
                "data-ocid": "adminp.inventory.empty_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-8 h-8 text-gray-300 mx-auto mb-2" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400 text-sm", children: "No inventory items" })
                ]
              }
            ) })
          ] })
        ] }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!editTarget, onOpenChange: () => setEditTarget(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          DialogContent,
          {
            className: "max-w-md max-h-[90vh] overflow-y-auto",
            "data-ocid": "adminp.inventory.modal.dialog",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { children: [
                "Edit Inventory — ",
                editTarget == null ? void 0 : editTarget.productName
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 pt-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Current Stock" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        type: "number",
                        min: 0,
                        value: form.current ?? "",
                        onChange: (e) => setForm((f) => ({ ...f, current: Number(e.target.value) })),
                        "data-ocid": "adminp.inventory.modal.current_input"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Reserved" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        type: "number",
                        min: 0,
                        value: form.reserved ?? "",
                        onChange: (e) => setForm((f) => ({ ...f, reserved: Number(e.target.value) })),
                        "data-ocid": "adminp.inventory.modal.reserved_input"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Incoming" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        type: "number",
                        min: 0,
                        value: form.incoming ?? "",
                        onChange: (e) => setForm((f) => ({ ...f, incoming: Number(e.target.value) })),
                        "data-ocid": "adminp.inventory.modal.incoming_input"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Damaged" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        type: "number",
                        min: 0,
                        value: form.damaged ?? "",
                        onChange: (e) => setForm((f) => ({ ...f, damaged: Number(e.target.value) })),
                        "data-ocid": "adminp.inventory.modal.damaged_input"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Low Stock Threshold" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      type: "number",
                      min: 0,
                      value: form.lowStockThreshold ?? "",
                      onChange: (e) => setForm((f) => ({
                        ...f,
                        lowStockThreshold: Number(e.target.value)
                      })),
                      "data-ocid": "adminp.inventory.modal.threshold_input"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Supplier" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      value: form.supplier ?? "",
                      onChange: (e) => setForm((f) => ({ ...f, supplier: e.target.value })),
                      "data-ocid": "adminp.inventory.modal.supplier_input"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Batch Number" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        value: form.batchNo ?? "",
                        onChange: (e) => setForm((f) => ({ ...f, batchNo: e.target.value })),
                        "data-ocid": "adminp.inventory.modal.batch_input"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Expiry Date" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        type: "date",
                        value: form.expiryDate ?? "",
                        onChange: (e) => setForm((f) => ({ ...f, expiryDate: e.target.value })),
                        "data-ocid": "adminp.inventory.modal.expiry_input"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      className: "flex-1 bg-[#004a38] hover:bg-[#003a2c]",
                      onClick: handleSave,
                      "data-ocid": "adminp.inventory.modal.submit_button",
                      children: "Save"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      variant: "outline",
                      className: "flex-1",
                      onClick: () => setEditTarget(null),
                      "data-ocid": "adminp.inventory.modal.cancel_button",
                      children: "Cancel"
                    }
                  )
                ] })
              ] })
            ]
          }
        ) })
      ]
    }
  );
}
export {
  AdminPInventory as default
};
