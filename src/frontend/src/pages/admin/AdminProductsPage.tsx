import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  CheckSquare,
  Database,
  Edit2,
  Leaf,
  Plus,
  Search,
  Square,
  Star,
  Trash2,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { formatPrice } from "../../lib/formatters";
import { PRODUCTS_SEED_DATA } from "../../lib/seedData";
import type { CreateProductInput, Product, ProductCategory } from "../../types";
import { AdminSidebar } from "./AdminDashboardPage";

const CATEGORIES: ProductCategory[] = [
  "Ayurvedic Powders",
  "Essential Oils",
  "Spiritual Products",
  "Pure Cotton",
  "Eco-Friendly",
  "Handicrafts",
  "Bio-Coal",
  "Seeds & Spices",
  "Bundles",
];

const EMPTY_FORM: CreateProductInput = {
  name: "",
  description: "",
  price: 0,
  category: "Ayurvedic Powders",
  imageUrl: "",
  imageKey: "",
  images: [],
  stock: 0,
  featured: false,
  bestseller: false,
  discount: 0,
  bundleIds: [],
  status: "active",
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>(
    PRODUCTS_SEED_DATA.map((p) => ({ ...p })),
  );
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);
  const [form, setForm] = useState<CreateProductInput>(EMPTY_FORM);
  const [seeding, setSeeding] = useState(false);

  const filtered = products.filter((p) => {
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q);
    const matchCat = categoryFilter === "all" || p.category === categoryFilter;
    return matchSearch && matchCat;
  });

  function openAdd() {
    setEditProduct(null);
    setForm(EMPTY_FORM);
    setShowModal(true);
  }

  function openEdit(p: Product) {
    setEditProduct(p);
    setForm({
      name: p.name,
      description: p.description,
      price: p.price,
      category: p.category,
      imageUrl: p.imageUrl,
      imageKey: p.imageKey,
      images: p.images ?? [],
      stock: p.stock,
      featured: p.featured,
      bestseller: p.bestseller,
      discount: p.discount,
      bundleIds: p.bundleIds,
      status: p.status ?? "active",
    });
    setShowModal(true);
  }

  function handleSave() {
    if (!form.name || !form.price) {
      toast.error("Name and price are required");
      return;
    }
    if (editProduct) {
      setProducts((prev) =>
        prev.map((p) => (p.id === editProduct.id ? { ...p, ...form } : p)),
      );
      toast.success("Product updated successfully");
    } else {
      const newId = Math.max(...products.map((p) => p.id)) + 1;
      setProducts((prev) => [
        ...prev,
        { id: newId, ratings: 0, reviewCount: 0, ...form },
      ]);
      toast.success("Product added successfully");
    }
    setShowModal(false);
  }

  function handleDelete(p: Product) {
    setProducts((prev) => prev.filter((x) => x.id !== p.id));
    setSelected((prev) => {
      const s = new Set(prev);
      s.delete(p.id);
      return s;
    });
    setDeleteTarget(null);
    toast.success("Product deleted");
  }

  function toggleSelect(id: number) {
    setSelected((prev) => {
      const s = new Set(prev);
      s.has(id) ? s.delete(id) : s.add(id);
      return s;
    });
  }

  function toggleSelectAll() {
    if (selected.size === filtered.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(filtered.map((p) => p.id)));
    }
  }

  function handleBulkDelete() {
    setProducts((prev) => prev.filter((p) => !selected.has(p.id)));
    toast.success(`${selected.size} products deleted`);
    setSelected(new Set());
  }

  function handleToggleFeatured(id: number) {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, featured: !p.featured } : p)),
    );
  }

  async function handleSeed() {
    setSeeding(true);
    await new Promise((r) => setTimeout(r, 1200));
    setProducts(PRODUCTS_SEED_DATA.map((p) => ({ ...p })));
    setSeeding(false);
    toast.success("20 Forestheals products seeded successfully!");
  }

  const allOnPageSelected =
    filtered.length > 0 && filtered.every((p) => selected.has(p.id));

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar active="/admin/products" />

      <main className="flex-1 overflow-auto" data-ocid="admin.products.page">
        {/* Header */}
        <div className="bg-card border-b border-border px-8 py-5 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-foreground">Products</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {products.length} products in catalog
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleSeed}
              disabled={seeding}
              data-ocid="admin.products.seed_button"
              className="gap-2"
            >
              <Database className="w-4 h-4" />
              {seeding ? "Seeding…" : "Seed Products"}
            </Button>
            <Button
              type="button"
              size="sm"
              className="gap-2"
              onClick={openAdd}
              data-ocid="admin.products.add_button"
            >
              <Plus className="w-4 h-4" /> Add Product
            </Button>
          </div>
        </div>

        <div className="p-8 space-y-5">
          {/* Filters */}
          <div
            className="flex flex-wrap items-center gap-3"
            data-ocid="admin.products.filters"
          >
            <div className="relative flex-1 min-w-52">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search products…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
                data-ocid="admin.products.search_input"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger
                className="w-48"
                data-ocid="admin.products.category_select"
              >
                <SelectValue placeholder="All categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All categories</SelectItem>
                {CATEGORIES.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selected.size > 0 && (
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={handleBulkDelete}
                data-ocid="admin.products.bulk_delete_button"
                className="gap-2"
              >
                <Trash2 className="w-4 h-4" /> Delete {selected.size} selected
              </Button>
            )}
          </div>

          {/* Table */}
          <div className="bg-card rounded-2xl border border-border shadow-soft overflow-hidden">
            <table className="w-full text-sm" data-ocid="admin.products.table">
              <thead>
                <tr className="bg-muted/40 text-muted-foreground text-xs uppercase tracking-wide border-b border-border">
                  <th className="px-5 py-3 text-left w-8">
                    <button
                      type="button"
                      onClick={toggleSelectAll}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {allOnPageSelected ? (
                        <CheckSquare className="w-4 h-4" />
                      ) : (
                        <Square className="w-4 h-4" />
                      )}
                    </button>
                  </th>
                  <th className="text-left px-4 py-3 font-medium">Product</th>
                  <th className="text-left px-4 py-3 font-medium hidden md:table-cell">
                    Category
                  </th>
                  <th className="text-right px-4 py-3 font-medium">Price</th>
                  <th className="text-right px-4 py-3 font-medium hidden sm:table-cell">
                    Stock
                  </th>
                  <th className="text-center px-4 py-3 font-medium hidden lg:table-cell">
                    Featured
                  </th>
                  <th className="text-right px-4 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p, i) => (
                  <motion.tr
                    key={p.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.02 }}
                    data-ocid={`admin.products.item.${i + 1}`}
                    className={`border-t border-border hover:bg-muted/20 transition-colors ${selected.has(p.id) ? "bg-primary/5" : ""}`}
                  >
                    <td className="px-5 py-3">
                      <button
                        type="button"
                        onClick={() => toggleSelect(p.id)}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {selected.has(p.id) ? (
                          <CheckSquare className="w-4 h-4 text-primary" />
                        ) : (
                          <Square className="w-4 h-4" />
                        )}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={p.imageUrl}
                          alt={p.name}
                          className="w-9 h-9 rounded-lg object-cover flex-shrink-0 border border-border"
                        />
                        <div className="min-w-0">
                          <p className="font-medium text-foreground truncate max-w-[160px]">
                            {p.name}
                          </p>
                          {p.discount > 0 && (
                            <Badge
                              variant="secondary"
                              className="text-xs mt-0.5"
                            >
                              {p.discount}% off
                            </Badge>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground hidden md:table-cell text-xs">
                      {p.category}
                    </td>
                    <td className="px-4 py-3 text-right font-semibold text-primary">
                      {formatPrice(p.price)}
                    </td>
                    <td className="px-4 py-3 text-right text-muted-foreground hidden sm:table-cell">
                      <span
                        className={
                          p.stock < 20 ? "text-destructive font-semibold" : ""
                        }
                      >
                        {p.stock}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center hidden lg:table-cell">
                      <button
                        type="button"
                        onClick={() => handleToggleFeatured(p.id)}
                        data-ocid={`admin.products.item.${i + 1}.featured_toggle`}
                        className={`transition-colors ${p.featured ? "text-accent-foreground" : "text-muted-foreground hover:text-accent-foreground"}`}
                      >
                        <Star
                          className={`w-4 h-4 ${p.featured ? "fill-current" : ""}`}
                        />
                      </button>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          type="button"
                          size="icon"
                          variant="ghost"
                          className="h-7 w-7"
                          onClick={() => openEdit(p)}
                          data-ocid={`admin.products.item.${i + 1}.edit_button`}
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </Button>
                        <Button
                          type="button"
                          size="icon"
                          variant="ghost"
                          className="h-7 w-7 hover:text-destructive"
                          onClick={() => setDeleteTarget(p)}
                          data-ocid={`admin.products.item.${i + 1}.delete_button`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="text-center py-12 text-muted-foreground"
                      data-ocid="admin.products.empty_state"
                    >
                      <Leaf className="w-8 h-8 mx-auto mb-2 opacity-40" />
                      No products found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Add/Edit Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent
          className="max-w-lg max-h-[90vh] overflow-y-auto"
          data-ocid="admin.products.modal.dialog"
        >
          <DialogHeader>
            <DialogTitle>
              {editProduct ? "Edit Product" : "Add New Product"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <Label htmlFor="prod-name">Product Name *</Label>
              <Input
                id="prod-name"
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
                placeholder="e.g. Organic Ashwagandha Powder"
                data-ocid="admin.products.modal.name_input"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="prod-desc">Description</Label>
              <Textarea
                id="prod-desc"
                rows={3}
                value={form.description}
                onChange={(e) =>
                  setForm((f) => ({ ...f, description: e.target.value }))
                }
                placeholder="Product description…"
                data-ocid="admin.products.modal.textarea"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="prod-price">Price (₹) *</Label>
                <Input
                  id="prod-price"
                  type="number"
                  min={0}
                  value={form.price || ""}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, price: Number(e.target.value) }))
                  }
                  data-ocid="admin.products.modal.price_input"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="prod-stock">Stock</Label>
                <Input
                  id="prod-stock"
                  type="number"
                  min={0}
                  value={form.stock || ""}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, stock: Number(e.target.value) }))
                  }
                  data-ocid="admin.products.modal.stock_input"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Category</Label>
                <Select
                  value={form.category}
                  onValueChange={(v) => setForm((f) => ({ ...f, category: v }))}
                >
                  <SelectTrigger data-ocid="admin.products.modal.category_select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="prod-discount">Discount (%)</Label>
                <Input
                  id="prod-discount"
                  type="number"
                  min={0}
                  max={100}
                  value={form.discount || ""}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, discount: Number(e.target.value) }))
                  }
                  data-ocid="admin.products.modal.discount_input"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="prod-image">Image URL</Label>
              <Input
                id="prod-image"
                value={form.imageUrl}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    imageUrl: e.target.value,
                    imageKey: e.target.value,
                  }))
                }
                placeholder="https://… or /assets/products/…"
                data-ocid="admin.products.modal.image_input"
              />
            </div>
            <div className="flex items-center gap-3 py-1">
              <Switch
                id="prod-featured"
                checked={form.featured}
                onCheckedChange={(v) => setForm((f) => ({ ...f, featured: v }))}
                data-ocid="admin.products.modal.featured_switch"
              />
              <Label htmlFor="prod-featured">Mark as Featured</Label>
            </div>
            <div className="flex gap-2 pt-2">
              <Button
                type="button"
                className="flex-1"
                onClick={handleSave}
                data-ocid="admin.products.modal.submit_button"
              >
                {editProduct ? "Save Changes" : "Add Product"}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => setShowModal(false)}
                data-ocid="admin.products.modal.cancel_button"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={() => setDeleteTarget(null)}
      >
        <AlertDialogContent data-ocid="admin.products.delete.dialog">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Product</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete{" "}
              <strong>{deleteTarget?.name}</strong>? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-ocid="admin.products.delete.cancel_button">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteTarget && handleDelete(deleteTarget)}
              data-ocid="admin.products.delete.confirm_button"
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
