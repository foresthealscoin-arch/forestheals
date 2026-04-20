import { J as useAdminPStore, r as reactExports, j as jsxRuntimeExports, g as Search, I as Input, a as Button, d as ue, P as PRODUCTS_SEED_DATA } from "./index-xECe6EUo.js";
import { A as AlertDialog, a as AlertDialogContent, b as AlertDialogHeader, c as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, f as AlertDialogCancel, g as AlertDialogAction } from "./alert-dialog-B57-tg4i.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-DPHwvUjv.js";
import { L as Label } from "./label-DZAdsEyI.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-DaHBgVQv.js";
import { S as Switch } from "./switch-C5w98KK7.js";
import { T as Textarea } from "./textarea-CK7joB3G.js";
import { A as AdminPLayout } from "./AdminPLayout-EBT4KI9z.js";
import { T as Trash2 } from "./trash-2-DsjLmEQc.js";
import { S as Star } from "./star-3Mia4EiO.js";
import { P as Pen } from "./pen-C7HAvO3K.js";
import { P as Package } from "./package-408It_ce.js";
import { P as Plus } from "./plus-CFLFiz8F.js";
import "./index-0zvCmYe-.js";
import "./index-DUJPy3Kv.js";
import "./index-Cwm_j1X6.js";
import "./index-BoTkzGeY.js";
import "./index-CG--HOM0.js";
import "./index-LegUYvjF.js";
import "./index-D807wfm0.js";
import "./check-O-YLQuAd.js";
import "./leaf-B3M59DIX.js";
import "./chevron-right-CASq3b8_.js";
import "./shopping-cart-Cu8657pd.js";
import "./users-D91Ah-hd.js";
const CATEGORIES = [
  "Ayurvedic Powders",
  "Essential Oils",
  "Spiritual Products",
  "Pure Cotton",
  "Eco-Friendly",
  "Handicrafts",
  "Bio-Coal",
  "Seeds & Spices",
  "Bundles"
];
const EMPTY = {
  name: "",
  description: "",
  price: 0,
  category: "Ayurvedic Powders",
  imageUrl: "",
  imageKey: "",
  stock: 0,
  featured: false,
  bestseller: false,
  discount: 0,
  bundleIds: []
};
const IMG_FALLBACK = "https://images.unsplash.com/photo-1616391182219-e080b4d1043a?w=400&q=80";
function AdminPProducts() {
  const products = useAdminPStore((s) => s.products);
  const addProduct = useAdminPStore((s) => s.addProduct);
  const updateProduct = useAdminPStore((s) => s.updateProduct);
  const deleteProduct = useAdminPStore((s) => s.deleteProduct);
  const setProducts = useAdminPStore((s) => s.setProducts);
  const [search, setSearch] = reactExports.useState("");
  const [catFilter, setCatFilter] = reactExports.useState("all");
  const [showModal, setShowModal] = reactExports.useState(false);
  const [editTarget, setEditTarget] = reactExports.useState(null);
  const [deleteTarget, setDeleteTarget] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState(EMPTY);
  const [selected, setSelected] = reactExports.useState(/* @__PURE__ */ new Set());
  const filtered = products.filter((p) => {
    const q = search.toLowerCase();
    return (!q || p.name.toLowerCase().includes(q)) && (catFilter === "all" || p.category === catFilter);
  });
  function openAdd() {
    setEditTarget(null);
    setForm({ ...EMPTY });
    setShowModal(true);
  }
  function openEdit(p) {
    setEditTarget(p);
    setForm({
      name: p.name,
      description: p.description,
      price: p.price,
      category: p.category,
      imageUrl: p.imageUrl,
      imageKey: p.imageKey,
      stock: p.stock,
      featured: p.featured,
      bestseller: p.bestseller,
      discount: p.discount,
      bundleIds: p.bundleIds
    });
    setShowModal(true);
  }
  function handleSave() {
    if (!form.name.trim() || !form.price) {
      ue.error("Name and price are required");
      return;
    }
    if (editTarget) {
      updateProduct({ ...editTarget, ...form });
      ue.success("Product updated!");
    } else {
      const newId = products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;
      addProduct({ id: newId, ratings: 0, reviewCount: 0, ...form });
      ue.success("Product added and saved to catalog!");
    }
    setShowModal(false);
  }
  function handleDelete(p) {
    deleteProduct(p.id);
    setSelected((prev) => {
      const s = new Set(prev);
      s.delete(p.id);
      return s;
    });
    setDeleteTarget(null);
    ue.success("Product deleted");
  }
  function toggleSelect(id) {
    setSelected((prev) => {
      const s = new Set(prev);
      s.has(id) ? s.delete(id) : s.add(id);
      return s;
    });
  }
  function handleBulkDelete() {
    setProducts(products.filter((p) => !selected.has(p.id)));
    ue.success(`${selected.size} products deleted`);
    setSelected(/* @__PURE__ */ new Set());
  }
  function handleSeed() {
    setProducts(PRODUCTS_SEED_DATA.map((p) => ({ ...p })));
    ue.success("20 Forestheals products seeded!");
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    AdminPLayout,
    {
      title: "Products",
      subtitle: `${products.length} products in catalog`,
      actions: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: handleSeed,
            "data-ocid": "adminp.products.seed_button",
            children: "Reset Seed"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            onClick: openAdd,
            className: "gap-1 bg-[#004a38] hover:bg-[#003a2c]",
            "data-ocid": "adminp.products.add_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
              " Add Product"
            ]
          }
        )
      ] }),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-wrap gap-3 mb-4",
            "data-ocid": "adminp.products.filters",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 min-w-44", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    placeholder: "Search products…",
                    value: search,
                    onChange: (e) => setSearch(e.target.value),
                    className: "pl-9",
                    "data-ocid": "adminp.products.search_input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: catFilter, onValueChange: setCatFilter, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SelectTrigger,
                  {
                    className: "w-44",
                    "data-ocid": "adminp.products.category_select",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All categories" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All categories" }),
                  CATEGORIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c, children: c }, c))
                ] })
              ] }),
              selected.size > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "destructive",
                  size: "sm",
                  onClick: handleBulkDelete,
                  "data-ocid": "adminp.products.bulk_delete_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4 mr-1" }),
                    " Delete ",
                    selected.size
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", "data-ocid": "adminp.products.table", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-gray-50 text-gray-500 text-xs uppercase tracking-wide border-b border-gray-100", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left w-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "checkbox",
                checked: filtered.length > 0 && filtered.every((p) => selected.has(p.id)),
                onChange: () => {
                  if (filtered.every((p) => selected.has(p.id))) {
                    setSelected(/* @__PURE__ */ new Set());
                  } else {
                    setSelected(new Set(filtered.map((p) => p.id)));
                  }
                },
                className: "rounded"
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-medium", children: "Product" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-medium hidden md:table-cell", children: "Category" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-medium", children: "Price" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-medium hidden sm:table-cell", children: "Stock" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-center px-4 py-3 font-medium hidden lg:table-cell", children: "Featured" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-medium", children: "Actions" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
            filtered.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "tr",
              {
                "data-ocid": `adminp.products.item.${i + 1}`,
                className: `border-t border-gray-50 hover:bg-gray-50/60 transition-colors ${selected.has(p.id) ? "bg-green-50/40" : ""}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      type: "checkbox",
                      checked: selected.has(p.id),
                      onChange: () => toggleSelect(p.id),
                      className: "rounded"
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: p.imageUrl,
                        alt: p.name,
                        className: "w-10 h-10 rounded-lg object-cover border border-gray-100 flex-shrink-0",
                        onError: (e) => {
                          e.currentTarget.src = IMG_FALLBACK;
                        }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-gray-900 truncate max-w-[140px]", children: p.name }),
                      p.discount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-green-700 font-medium", children: [
                        p.discount,
                        "% off"
                      ] })
                    ] })
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-gray-500 hidden md:table-cell text-xs", children: p.category }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-right font-semibold text-[#004a38]", children: [
                    "₹",
                    p.price
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "td",
                    {
                      className: `px-4 py-3 text-right hidden sm:table-cell text-xs ${p.stock < 20 ? "text-red-600 font-semibold" : "text-gray-500"}`,
                      children: p.stock
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-center hidden lg:table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => updateProduct({ ...p, featured: !p.featured }),
                      "data-ocid": `adminp.products.item.${i + 1}.featured_toggle`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Star,
                        {
                          className: `w-4 h-4 ${p.featured ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`
                        }
                      )
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        size: "icon",
                        variant: "ghost",
                        className: "h-7 w-7 hover:bg-gray-100",
                        onClick: () => openEdit(p),
                        "data-ocid": `adminp.products.item.${i + 1}.edit_button`,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "w-3.5 h-3.5" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        size: "icon",
                        variant: "ghost",
                        className: "h-7 w-7 hover:bg-red-50 hover:text-red-600",
                        onClick: () => setDeleteTarget(p),
                        "data-ocid": `adminp.products.item.${i + 1}.delete_button`,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
                      }
                    )
                  ] }) })
                ]
              },
              p.id
            )),
            filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "td",
              {
                colSpan: 7,
                className: "text-center py-12",
                "data-ocid": "adminp.products.empty_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-8 h-8 text-gray-300 mx-auto mb-2" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400 text-sm", children: "No products found" })
                ]
              }
            ) })
          ] })
        ] }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showModal, onOpenChange: setShowModal, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          DialogContent,
          {
            className: "max-w-lg max-h-[90vh] overflow-y-auto",
            "data-ocid": "adminp.products.modal.dialog",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: editTarget ? "Edit Product" : "Add New Product" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 pt-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Product Name *" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      value: form.name,
                      onChange: (e) => setForm((f) => ({ ...f, name: e.target.value })),
                      placeholder: "e.g. Organic Ashwagandha Powder",
                      "data-ocid": "adminp.products.modal.name_input"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Description" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Textarea,
                    {
                      rows: 3,
                      value: form.description,
                      onChange: (e) => setForm((f) => ({ ...f, description: e.target.value })),
                      placeholder: "Product description…",
                      "data-ocid": "adminp.products.modal.textarea"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Price (₹) *" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        type: "number",
                        min: 0,
                        value: form.price || "",
                        onChange: (e) => setForm((f) => ({ ...f, price: Number(e.target.value) })),
                        "data-ocid": "adminp.products.modal.price_input"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Stock Qty" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        type: "number",
                        min: 0,
                        value: form.stock || "",
                        onChange: (e) => setForm((f) => ({ ...f, stock: Number(e.target.value) })),
                        "data-ocid": "adminp.products.modal.stock_input"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Category" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Select,
                      {
                        value: form.category,
                        onValueChange: (v) => setForm((f) => ({ ...f, category: v })),
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "adminp.products.modal.category_select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: CATEGORIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c, children: c }, c)) })
                        ]
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Discount (%)" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        type: "number",
                        min: 0,
                        max: 100,
                        value: form.discount || "",
                        onChange: (e) => setForm((f) => ({ ...f, discount: Number(e.target.value) })),
                        "data-ocid": "adminp.products.modal.discount_input"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Image URL" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      value: form.imageUrl,
                      onChange: (e) => setForm((f) => ({
                        ...f,
                        imageUrl: e.target.value,
                        imageKey: e.target.value
                      })),
                      placeholder: "https://… or /assets/products/…",
                      "data-ocid": "adminp.products.modal.image_input"
                    }
                  ),
                  form.imageUrl && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: form.imageUrl,
                      alt: "Preview",
                      className: "h-20 w-20 object-cover rounded-lg border mt-1",
                      onError: (e) => {
                        e.currentTarget.src = IMG_FALLBACK;
                      }
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 py-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Switch,
                    {
                      id: "ap-featured",
                      checked: form.featured,
                      onCheckedChange: (v) => setForm((f) => ({ ...f, featured: v })),
                      "data-ocid": "adminp.products.modal.featured_switch"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "ap-featured", children: "Mark as Featured" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      className: "flex-1 bg-[#004a38] hover:bg-[#003a2c]",
                      onClick: handleSave,
                      "data-ocid": "adminp.products.modal.submit_button",
                      children: editTarget ? "Save Changes" : "Add Product"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      variant: "outline",
                      className: "flex-1",
                      onClick: () => setShowModal(false),
                      "data-ocid": "adminp.products.modal.cancel_button",
                      children: "Cancel"
                    }
                  )
                ] })
              ] })
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          AlertDialog,
          {
            open: !!deleteTarget,
            onOpenChange: () => setDeleteTarget(null),
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { "data-ocid": "adminp.products.delete.dialog", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Delete Product" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
                  "Are you sure you want to delete",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: deleteTarget == null ? void 0 : deleteTarget.name }),
                  "? This cannot be undone."
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { "data-ocid": "adminp.products.delete.cancel_button", children: "Cancel" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  AlertDialogAction,
                  {
                    onClick: () => deleteTarget && handleDelete(deleteTarget),
                    className: "bg-red-600 hover:bg-red-700",
                    "data-ocid": "adminp.products.delete.confirm_button",
                    children: "Delete"
                  }
                )
              ] })
            ] })
          }
        )
      ]
    }
  );
}
export {
  AdminPProducts as default
};
