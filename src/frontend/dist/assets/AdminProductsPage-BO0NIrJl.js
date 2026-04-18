import { c as createLucideIcon, r as reactExports, P as PRODUCTS_SEED_DATA, j as jsxRuntimeExports, a as Button, f as Search, I as Input, m as motion, B as Badge, u as ue } from "./index-BTLW_NIC.js";
import { A as AlertDialog, a as AlertDialogContent, b as AlertDialogHeader, c as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, f as AlertDialogCancel, g as AlertDialogAction } from "./alert-dialog-CVys4Dal.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-DiMklLnQ.js";
import { L as Label } from "./label-BUCCGSyY.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-BX7DqIsr.js";
import { S as Switch } from "./switch-Bwl0-6DY.js";
import { T as Textarea } from "./textarea-CjhYoXk_.js";
import { f as formatPrice } from "./formatters-C5vW1ZnJ.js";
import { AdminSidebar } from "./AdminDashboardPage-Cq8xXEiO.js";
import { P as Plus } from "./plus-BR3-oajm.js";
import { T as Trash2 } from "./trash-2-BSOfqa-y.js";
import { S as SquareCheckBig, a as Square } from "./square-Cum52rUq.js";
import { S as Star } from "./star-B8b4SvdS.js";
import { P as Pen } from "./pen-Bt1CYM1O.js";
import { L as Leaf } from "./leaf-CzbpTTMi.js";
import "./index-CdALTCxJ.js";
import "./index-n-hXPyKH.js";
import "./index-B4_ux9p8.js";
import "./index-CnBxW9r1.js";
import "./index-BWWxSKzl.js";
import "./index-DJIIwdg5.js";
import "./index-DzxR8ZBH.js";
import "./check-Dzh62hXf.js";
import "./skeleton-B_W_nVt9.js";
import "./useOrders-CumPQW3r.js";
import "./useQuery-BNvAOOwo.js";
import "./useMutation-Cg-O1UYS.js";
import "./package-CJHu-mD6.js";
import "./shopping-cart-D31XYOt2.js";
import "./users-CPUsLN16.js";
import "./trending-up-BEtbgpY5.js";
import "./clock-DBEi-1zF.js";
import "./arrow-right-DjP4Z_RZ.js";
import "./circle-x-DnjA0Mbl.js";
import "./circle-check-BBKQs0Vb.js";
import "./truck-su5aUVQW.js";
import "./eye-Bl9RwSKM.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["ellipse", { cx: "12", cy: "5", rx: "9", ry: "3", key: "msslwz" }],
  ["path", { d: "M3 5V19A9 3 0 0 0 21 19V5", key: "1wlel7" }],
  ["path", { d: "M3 12A9 3 0 0 0 21 12", key: "mv7ke4" }]
];
const Database = createLucideIcon("database", __iconNode);
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
const EMPTY_FORM = {
  name: "",
  description: "",
  price: 0,
  category: "Ayurvedic Powders",
  imageUrl: "",
  imageKey: "",
  stock: 0,
  featured: false,
  discount: 0,
  bundleIds: []
};
function AdminProductsPage() {
  const [products, setProducts] = reactExports.useState(
    PRODUCTS_SEED_DATA.map((p) => ({ ...p }))
  );
  const [search, setSearch] = reactExports.useState("");
  const [categoryFilter, setCategoryFilter] = reactExports.useState("all");
  const [selected, setSelected] = reactExports.useState(/* @__PURE__ */ new Set());
  const [showModal, setShowModal] = reactExports.useState(false);
  const [editProduct, setEditProduct] = reactExports.useState(null);
  const [deleteTarget, setDeleteTarget] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState(EMPTY_FORM);
  const [seeding, setSeeding] = reactExports.useState(false);
  const filtered = products.filter((p) => {
    const q = search.toLowerCase();
    const matchSearch = !q || p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
    const matchCat = categoryFilter === "all" || p.category === categoryFilter;
    return matchSearch && matchCat;
  });
  function openAdd() {
    setEditProduct(null);
    setForm(EMPTY_FORM);
    setShowModal(true);
  }
  function openEdit(p) {
    setEditProduct(p);
    setForm({
      name: p.name,
      description: p.description,
      price: p.price,
      category: p.category,
      imageUrl: p.imageUrl,
      imageKey: p.imageKey,
      stock: p.stock,
      featured: p.featured,
      discount: p.discount,
      bundleIds: p.bundleIds
    });
    setShowModal(true);
  }
  function handleSave() {
    if (!form.name || !form.price) {
      ue.error("Name and price are required");
      return;
    }
    if (editProduct) {
      setProducts(
        (prev) => prev.map((p) => p.id === editProduct.id ? { ...p, ...form } : p)
      );
      ue.success("Product updated successfully");
    } else {
      const newId = Math.max(...products.map((p) => p.id)) + 1;
      setProducts((prev) => [
        ...prev,
        { id: newId, ratings: 0, reviewCount: 0, ...form }
      ]);
      ue.success("Product added successfully");
    }
    setShowModal(false);
  }
  function handleDelete(p) {
    setProducts((prev) => prev.filter((x) => x.id !== p.id));
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
  function toggleSelectAll() {
    if (selected.size === filtered.length) {
      setSelected(/* @__PURE__ */ new Set());
    } else {
      setSelected(new Set(filtered.map((p) => p.id)));
    }
  }
  function handleBulkDelete() {
    setProducts((prev) => prev.filter((p) => !selected.has(p.id)));
    ue.success(`${selected.size} products deleted`);
    setSelected(/* @__PURE__ */ new Set());
  }
  function handleToggleFeatured(id) {
    setProducts(
      (prev) => prev.map((p) => p.id === id ? { ...p, featured: !p.featured } : p)
    );
  }
  async function handleSeed() {
    setSeeding(true);
    await new Promise((r) => setTimeout(r, 1200));
    setProducts(PRODUCTS_SEED_DATA.map((p) => ({ ...p })));
    setSeeding(false);
    ue.success("20 Forestheals products seeded successfully!");
  }
  const allOnPageSelected = filtered.length > 0 && filtered.every((p) => selected.has(p.id));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AdminSidebar, { active: "/admin/products" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "flex-1 overflow-auto", "data-ocid": "admin.products.page", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border-b border-border px-8 py-5 flex items-center justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold text-foreground", children: "Products" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-0.5", children: [
            products.length,
            " products in catalog"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              variant: "outline",
              size: "sm",
              onClick: handleSeed,
              disabled: seeding,
              "data-ocid": "admin.products.seed_button",
              className: "gap-2",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Database, { className: "w-4 h-4" }),
                seeding ? "Seeding…" : "Seed Products"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              size: "sm",
              className: "gap-2",
              onClick: openAdd,
              "data-ocid": "admin.products.add_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
                " Add Product"
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-8 space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-wrap items-center gap-3",
            "data-ocid": "admin.products.filters",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 min-w-52", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    placeholder: "Search products…",
                    value: search,
                    onChange: (e) => setSearch(e.target.value),
                    className: "pl-9",
                    "data-ocid": "admin.products.search_input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: categoryFilter, onValueChange: setCategoryFilter, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SelectTrigger,
                  {
                    className: "w-48",
                    "data-ocid": "admin.products.category_select",
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
                  type: "button",
                  variant: "destructive",
                  size: "sm",
                  onClick: handleBulkDelete,
                  "data-ocid": "admin.products.bulk_delete_button",
                  className: "gap-2",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" }),
                    " Delete ",
                    selected.size,
                    " selected"
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card rounded-2xl border border-border shadow-soft overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", "data-ocid": "admin.products.table", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-muted/40 text-muted-foreground text-xs uppercase tracking-wide border-b border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-3 text-left w-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: toggleSelectAll,
                className: "text-muted-foreground hover:text-foreground transition-colors",
                children: allOnPageSelected ? /* @__PURE__ */ jsxRuntimeExports.jsx(SquareCheckBig, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Square, { className: "w-4 h-4" })
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
              motion.tr,
              {
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                transition: { delay: i * 0.02 },
                "data-ocid": `admin.products.item.${i + 1}`,
                className: `border-t border-border hover:bg-muted/20 transition-colors ${selected.has(p.id) ? "bg-primary/5" : ""}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => toggleSelect(p.id),
                      className: "text-muted-foreground hover:text-foreground transition-colors",
                      children: selected.has(p.id) ? /* @__PURE__ */ jsxRuntimeExports.jsx(SquareCheckBig, { className: "w-4 h-4 text-primary" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Square, { className: "w-4 h-4" })
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: p.imageUrl,
                        alt: p.name,
                        className: "w-9 h-9 rounded-lg object-cover flex-shrink-0 border border-border"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground truncate max-w-[160px]", children: p.name }),
                      p.discount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Badge,
                        {
                          variant: "secondary",
                          className: "text-xs mt-0.5",
                          children: [
                            p.discount,
                            "% off"
                          ]
                        }
                      )
                    ] })
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground hidden md:table-cell text-xs", children: p.category }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right font-semibold text-primary", children: formatPrice(p.price) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right text-muted-foreground hidden sm:table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: p.stock < 20 ? "text-destructive font-semibold" : "",
                      children: p.stock
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-center hidden lg:table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => handleToggleFeatured(p.id),
                      "data-ocid": `admin.products.item.${i + 1}.featured_toggle`,
                      className: `transition-colors ${p.featured ? "text-accent-foreground" : "text-muted-foreground hover:text-accent-foreground"}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Star,
                        {
                          className: `w-4 h-4 ${p.featured ? "fill-current" : ""}`
                        }
                      )
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        type: "button",
                        size: "icon",
                        variant: "ghost",
                        className: "h-7 w-7",
                        onClick: () => openEdit(p),
                        "data-ocid": `admin.products.item.${i + 1}.edit_button`,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "w-3.5 h-3.5" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        type: "button",
                        size: "icon",
                        variant: "ghost",
                        className: "h-7 w-7 hover:text-destructive",
                        onClick: () => setDeleteTarget(p),
                        "data-ocid": `admin.products.item.${i + 1}.delete_button`,
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
                className: "text-center py-12 text-muted-foreground",
                "data-ocid": "admin.products.empty_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Leaf, { className: "w-8 h-8 mx-auto mb-2 opacity-40" }),
                  "No products found"
                ]
              }
            ) })
          ] })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showModal, onOpenChange: setShowModal, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      DialogContent,
      {
        className: "max-w-lg max-h-[90vh] overflow-y-auto",
        "data-ocid": "admin.products.modal.dialog",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: editProduct ? "Edit Product" : "Add New Product" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 pt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "prod-name", children: "Product Name *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "prod-name",
                  value: form.name,
                  onChange: (e) => setForm((f) => ({ ...f, name: e.target.value })),
                  placeholder: "e.g. Organic Ashwagandha Powder",
                  "data-ocid": "admin.products.modal.name_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "prod-desc", children: "Description" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  id: "prod-desc",
                  rows: 3,
                  value: form.description,
                  onChange: (e) => setForm((f) => ({ ...f, description: e.target.value })),
                  placeholder: "Product description…",
                  "data-ocid": "admin.products.modal.textarea"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "prod-price", children: "Price (₹) *" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "prod-price",
                    type: "number",
                    min: 0,
                    value: form.price || "",
                    onChange: (e) => setForm((f) => ({ ...f, price: Number(e.target.value) })),
                    "data-ocid": "admin.products.modal.price_input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "prod-stock", children: "Stock" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "prod-stock",
                    type: "number",
                    min: 0,
                    value: form.stock || "",
                    onChange: (e) => setForm((f) => ({ ...f, stock: Number(e.target.value) })),
                    "data-ocid": "admin.products.modal.stock_input"
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
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "admin.products.modal.category_select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: CATEGORIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c, children: c }, c)) })
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "prod-discount", children: "Discount (%)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "prod-discount",
                    type: "number",
                    min: 0,
                    max: 100,
                    value: form.discount || "",
                    onChange: (e) => setForm((f) => ({ ...f, discount: Number(e.target.value) })),
                    "data-ocid": "admin.products.modal.discount_input"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "prod-image", children: "Image URL" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "prod-image",
                  value: form.imageUrl,
                  onChange: (e) => setForm((f) => ({
                    ...f,
                    imageUrl: e.target.value,
                    imageKey: e.target.value
                  })),
                  placeholder: "https://… or /assets/products/…",
                  "data-ocid": "admin.products.modal.image_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 py-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Switch,
                {
                  id: "prod-featured",
                  checked: form.featured,
                  onCheckedChange: (v) => setForm((f) => ({ ...f, featured: v })),
                  "data-ocid": "admin.products.modal.featured_switch"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "prod-featured", children: "Mark as Featured" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  className: "flex-1",
                  onClick: handleSave,
                  "data-ocid": "admin.products.modal.submit_button",
                  children: editProduct ? "Save Changes" : "Add Product"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  variant: "outline",
                  className: "flex-1",
                  onClick: () => setShowModal(false),
                  "data-ocid": "admin.products.modal.cancel_button",
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
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { "data-ocid": "admin.products.delete.dialog", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Delete Product" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
              "Are you sure you want to delete",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: deleteTarget == null ? void 0 : deleteTarget.name }),
              "? This action cannot be undone."
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { "data-ocid": "admin.products.delete.cancel_button", children: "Cancel" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              AlertDialogAction,
              {
                onClick: () => deleteTarget && handleDelete(deleteTarget),
                "data-ocid": "admin.products.delete.confirm_button",
                className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                children: "Delete"
              }
            )
          ] })
        ] })
      }
    )
  ] });
}
export {
  AdminProductsPage as default
};
