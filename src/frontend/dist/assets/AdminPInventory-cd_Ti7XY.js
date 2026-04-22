import { r as reactExports, j as jsxRuntimeExports, a as Button, I as Input, e as ue } from "./index-CfU2kVIJ.js";
import { d as Dialog, e as DialogContent, f as DialogHeader, g as DialogTitle } from "./dialog-BmCSuf7q.js";
import { L as Label } from "./label-BjUfKOjb.js";
import { S as Skeleton } from "./skeleton-Dbe_tSkr.js";
import { c as useAdminInventory, I as useUpdateInventory, A as AdminPLayout } from "./AdminPLayout-CIt5RHz_.js";
import { C as CircleAlert } from "./circle-alert-ucF-SypE.js";
import { R as RefreshCw } from "./refresh-cw-CczYOB5W.js";
import { M as Minus } from "./minus-BUEJcusP.js";
import { P as Plus } from "./plus-Dgb9NiV8.js";
import { P as Pen } from "./pen-C8l-9AD8.js";
import { P as Package } from "./package-C5tkAuNr.js";
import "./index-l7_3JU5-.js";
import "./index-D_sIzci6.js";
import "./useMutation-DVPdZiQH.js";
import "./convert-Cs1e6Uux.js";
import "./leaf-BdKoN6HX.js";
import "./chevron-right-DNGmMEAY.js";
import "./users-BTrxV2BM.js";
import "./star-D6nQNTvb.js";
function AdminPInventory() {
  const {
    data: inventory = [],
    isLoading,
    isError,
    refetch
  } = useAdminInventory();
  const updateMutation = useUpdateInventory();
  const [editTarget, setEditTarget] = reactExports.useState(
    null
  );
  const [adjustQty, setAdjustQty] = reactExports.useState(1);
  const [adjustNotes, setAdjustNotes] = reactExports.useState("");
  async function adjust(item, delta) {
    try {
      await updateMutation.mutateAsync({
        productId: `${item.productId}`,
        quantity: delta,
        type: delta > 0 ? "restock" : "sale",
        notes: `Admin manual adjustment: ${delta > 0 ? "+" : ""}${String(delta)}`
      });
      ue.success(
        `Stock ${delta > 0 ? "increased" : "decreased"} by ${Math.abs(delta)}`
      );
    } catch {
      ue.error("Failed to update stock");
    }
  }
  async function handleAdjust(type) {
    if (!editTarget || adjustQty <= 0) return;
    const delta = type === "add" ? adjustQty : -adjustQty;
    try {
      await updateMutation.mutateAsync({
        productId: String(editTarget.productId),
        quantity: delta,
        type: type === "add" ? "restock" : "remove",
        notes: adjustNotes || "Admin adjustment"
      });
      ue.success("Inventory updated");
      setEditTarget(null);
      setAdjustQty(1);
      setAdjustNotes("");
    } catch {
      ue.error("Failed to update inventory");
    }
  }
  if (isError) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminPLayout, { title: "Inventory Management", subtitle: "Track stock levels", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-red-50 border border-red-200 rounded-2xl p-8 text-center",
        "data-ocid": "adminp.inventory.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-8 h-8 text-red-400 mx-auto mb-3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-red-700 font-medium", children: "Failed to load inventory" }),
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
    ) });
  }
  const lowStockCount = inventory.filter((i) => i.lowStockFlag).length;
  const outOfStockCount = inventory.filter((i) => i.outOfStockFlag).length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    AdminPLayout,
    {
      title: "Inventory Management",
      subtitle: "Track stock levels and availability",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4 mb-6", children: [
          {
            label: "Total SKUs",
            value: inventory.length,
            color: "text-gray-900"
          },
          {
            label: "Low Stock",
            value: lowStockCount,
            color: "text-orange-600"
          },
          {
            label: "Out of Stock",
            value: outOfStockCount,
            color: "text-red-600"
          },
          {
            label: "In Stock",
            value: inventory.length - outOfStockCount,
            color: "text-green-700"
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
        isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", "data-ocid": "adminp.inventory.loading_state", children: ["a", "b", "c", "d", "e"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-14 w-full rounded-xl" }, k)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "table",
          {
            className: "w-full text-sm",
            "data-ocid": "adminp.inventory.table",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-gray-50 text-gray-500 text-xs uppercase tracking-wide border-b border-gray-100", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-5 py-3 font-medium", children: "Product" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-medium", children: "Available" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-medium hidden sm:table-cell", children: "Reserved" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-medium hidden md:table-cell", children: "Status" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-medium", children: "Quick Adjust" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-medium", children: "Edit" })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
                inventory.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "tr",
                  {
                    "data-ocid": `adminp.inventory.item.${i + 1}`,
                    className: `border-t border-gray-50 hover:bg-gray-50/60 transition-colors ${item.lowStockFlag ? "bg-orange-50/40" : ""}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-5 py-3", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-gray-900 text-sm truncate max-w-[180px]", children: item.productName }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-gray-400", children: [
                          "ID: ",
                          item.productId
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: `font-bold text-sm ${item.outOfStockFlag ? "text-red-600" : item.lowStockFlag ? "text-orange-600" : "text-green-700"}`,
                          children: item.availableStock
                        }
                      ) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right hidden sm:table-cell text-gray-500 text-xs", children: item.reservedStock }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 hidden md:table-cell", children: item.outOfStockFlag ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-700 font-medium", children: "Out of Stock" }) : item.lowStockFlag ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 font-medium", children: "Low Stock" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-medium", children: "In Stock" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "button",
                          {
                            type: "button",
                            onClick: () => void adjust(item, -1),
                            className: "w-6 h-6 rounded bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors",
                            disabled: updateMutation.isPending,
                            "data-ocid": `adminp.inventory.item.${i + 1}.decrease_button`,
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "w-3 h-3" })
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "button",
                          {
                            type: "button",
                            onClick: () => void adjust(item, 1),
                            className: "w-6 h-6 rounded bg-green-100 hover:bg-green-200 flex items-center justify-center text-green-700 transition-colors",
                            disabled: updateMutation.isPending,
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
                          onClick: () => {
                            setEditTarget(item);
                            setAdjustQty(1);
                            setAdjustNotes("");
                          },
                          "data-ocid": `adminp.inventory.item.${i + 1}.edit_button`,
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "w-3.5 h-3.5" })
                        }
                      ) })
                    ]
                  },
                  item.productId
                )),
                inventory.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "td",
                  {
                    colSpan: 6,
                    className: "py-12 text-center",
                    "data-ocid": "adminp.inventory.empty_state",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-8 h-8 text-gray-300 mx-auto mb-2" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400 text-sm", children: "No inventory data — add products to see inventory here" })
                    ]
                  }
                ) })
              ] })
            ]
          }
        ) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!editTarget, onOpenChange: () => setEditTarget(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          DialogContent,
          {
            className: "max-w-sm",
            "data-ocid": "adminp.inventory.modal.dialog",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { children: [
                "Adjust Stock — ",
                editTarget == null ? void 0 : editTarget.productName
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 pt-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-50 rounded-xl p-3 text-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 text-xs mb-1", children: "Current Available Stock" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-gray-900 text-lg", children: (editTarget == null ? void 0 : editTarget.availableStock) ?? 0 })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Quantity" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      type: "number",
                      min: 1,
                      value: adjustQty,
                      onChange: (e) => setAdjustQty(Number(e.target.value)),
                      "data-ocid": "adminp.inventory.modal.quantity_input"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Notes (optional)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      value: adjustNotes,
                      onChange: (e) => setAdjustNotes(e.target.value),
                      placeholder: "Reason for adjustment…",
                      "data-ocid": "adminp.inventory.modal.notes_input"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2 pt-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      className: "bg-green-600 hover:bg-green-700",
                      onClick: () => void handleAdjust("add"),
                      disabled: updateMutation.isPending,
                      "data-ocid": "adminp.inventory.modal.add_button",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-1" }),
                        " Add Stock"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      variant: "outline",
                      className: "border-red-200 text-red-600 hover:bg-red-50",
                      onClick: () => void handleAdjust("remove"),
                      disabled: updateMutation.isPending,
                      "data-ocid": "adminp.inventory.modal.remove_button",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "w-4 h-4 mr-1" }),
                        " Remove"
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "outline",
                    className: "w-full",
                    onClick: () => setEditTarget(null),
                    "data-ocid": "adminp.inventory.modal.cancel_button",
                    children: "Cancel"
                  }
                )
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
