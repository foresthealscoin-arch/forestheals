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
import { Edit2, Package, Plus, Search, Star, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { PRODUCTS_SEED_DATA } from "../../lib/seedData";
import type { Product } from "../../types";
import { AdminPLayout } from "./AdminPLayout";
import { useAdminPStore } from "./adminpStore";

const CATEGORIES = [
  "Ayurvedic Powders",
  "Essential Oils",
  "Spiritual Products",
  "Pure Cotton",
  "Eco-Friendly",
  "Handicrafts",
  "Bio-Coal",
  "Seeds & Spices",
  "Bundles",
] as const;

const EMPTY: Omit<Product, "id" | "ratings" | "reviewCount"> = {
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
  bundleIds: [],
};

const IMG_FALLBACK =
  "https://images.unsplash.com/photo-1616391182219-e080b4d1043a?w=400&q=80";

export default function AdminPProducts() {
  const products = useAdminPStore((s) => s.products);
  const addProduct = useAdminPStore((s) => s.addProduct);
  const updateProduct = useAdminPStore((s) => s.updateProduct);
  const deleteProduct = useAdminPStore((s) => s.deleteProduct);
  const setProducts = useAdminPStore((s) => s.setProducts);

  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [editTarget, setEditTarget] = useState<Product | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);
  const [form, setForm] = useState<typeof EMPTY>(EMPTY);
  const [selected, setSelected] = useState<Set<number>>(new Set());

  const filtered = products.filter((p) => {
    const q = search.toLowerCase();
    return (
      (!q || p.name.toLowerCase().includes(q)) &&
      (catFilter === "all" || p.category === catFilter)
    );
  });

  function openAdd() {
    setEditTarget(null);
    setForm({ ...EMPTY });
    setShowModal(true);
  }

  function openEdit(p: Product) {
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
      bundleIds: p.bundleIds,
    });
    setShowModal(true);
  }

  function handleSave() {
    if (!form.name.trim() || !form.price) {
      toast.error("Name and price are required");
      return;
    }
    if (editTarget) {
      updateProduct({ ...editTarget, ...form });
      toast.success("Product updated!");
    } else {
      const newId =
        products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;
      addProduct({ id: newId, ratings: 0, reviewCount: 0, ...form });
      toast.success("Product added and saved to catalog!");
    }
    setShowModal(false);
  }

  function handleDelete(p: Product) {
    deleteProduct(p.id);
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

  function handleBulkDelete() {
    setProducts(products.filter((p) => !selected.has(p.id)));
    toast.success(`${selected.size} products deleted`);
    setSelected(new Set());
  }

  function handleSeed() {
    setProducts(PRODUCTS_SEED_DATA.map((p) => ({ ...p })));
    toast.success("20 Forestheals products seeded!");
  }

  return (
    <AdminPLayout
      title="Products"
      subtitle={`${products.length} products in catalog`}
      actions={
        <>
          <Button
            variant="outline"
            size="sm"
            onClick={handleSeed}
            data-ocid="adminp.products.seed_button"
          >
            Reset Seed
          </Button>
          <Button
            size="sm"
            onClick={openAdd}
            className="gap-1 bg-[#004a38] hover:bg-[#003a2c]"
            data-ocid="adminp.products.add_button"
          >
            <Plus className="w-4 h-4" /> Add Product
          </Button>
        </>
      }
    >
      {/* Filters */}
      <div
        className="flex flex-wrap gap-3 mb-4"
        data-ocid="adminp.products.filters"
      >
        <div className="relative flex-1 min-w-44">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search products…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
            data-ocid="adminp.products.search_input"
          />
        </div>
        <Select value={catFilter} onValueChange={setCatFilter}>
          <SelectTrigger
            className="w-44"
            data-ocid="adminp.products.category_select"
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
            variant="destructive"
            size="sm"
            onClick={handleBulkDelete}
            data-ocid="adminp.products.bulk_delete_button"
          >
            <Trash2 className="w-4 h-4 mr-1" /> Delete {selected.size}
          </Button>
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm" data-ocid="adminp.products.table">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide border-b border-gray-100">
                <th className="px-4 py-3 text-left w-8">
                  <input
                    type="checkbox"
                    checked={
                      filtered.length > 0 &&
                      filtered.every((p) => selected.has(p.id))
                    }
                    onChange={() => {
                      if (filtered.every((p) => selected.has(p.id))) {
                        setSelected(new Set());
                      } else {
                        setSelected(new Set(filtered.map((p) => p.id)));
                      }
                    }}
                    className="rounded"
                  />
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
                <tr
                  key={p.id}
                  data-ocid={`adminp.products.item.${i + 1}`}
                  className={`border-t border-gray-50 hover:bg-gray-50/60 transition-colors ${selected.has(p.id) ? "bg-green-50/40" : ""}`}
                >
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selected.has(p.id)}
                      onChange={() => toggleSelect(p.id)}
                      className="rounded"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={p.imageUrl}
                        alt={p.name}
                        className="w-10 h-10 rounded-lg object-cover border border-gray-100 flex-shrink-0"
                        onError={(e) => {
                          e.currentTarget.src = IMG_FALLBACK;
                        }}
                      />
                      <div className="min-w-0">
                        <p className="font-medium text-gray-900 truncate max-w-[140px]">
                          {p.name}
                        </p>
                        {p.discount > 0 && (
                          <span className="text-xs text-green-700 font-medium">
                            {p.discount}% off
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-500 hidden md:table-cell text-xs">
                    {p.category}
                  </td>
                  <td className="px-4 py-3 text-right font-semibold text-[#004a38]">
                    ₹{p.price}
                  </td>
                  <td
                    className={`px-4 py-3 text-right hidden sm:table-cell text-xs ${p.stock < 20 ? "text-red-600 font-semibold" : "text-gray-500"}`}
                  >
                    {p.stock}
                  </td>
                  <td className="px-4 py-3 text-center hidden lg:table-cell">
                    <button
                      type="button"
                      onClick={() =>
                        updateProduct({ ...p, featured: !p.featured })
                      }
                      data-ocid={`adminp.products.item.${i + 1}.featured_toggle`}
                    >
                      <Star
                        className={`w-4 h-4 ${p.featured ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                      />
                    </button>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-7 w-7 hover:bg-gray-100"
                        onClick={() => openEdit(p)}
                        data-ocid={`adminp.products.item.${i + 1}.edit_button`}
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-7 w-7 hover:bg-red-50 hover:text-red-600"
                        onClick={() => setDeleteTarget(p)}
                        data-ocid={`adminp.products.item.${i + 1}.delete_button`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="text-center py-12"
                    data-ocid="adminp.products.empty_state"
                  >
                    <Package className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                    <p className="text-gray-400 text-sm">No products found</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent
          className="max-w-lg max-h-[90vh] overflow-y-auto"
          data-ocid="adminp.products.modal.dialog"
        >
          <DialogHeader>
            <DialogTitle>
              {editTarget ? "Edit Product" : "Add New Product"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <Label>Product Name *</Label>
              <Input
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
                placeholder="e.g. Organic Ashwagandha Powder"
                data-ocid="adminp.products.modal.name_input"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Description</Label>
              <Textarea
                rows={3}
                value={form.description}
                onChange={(e) =>
                  setForm((f) => ({ ...f, description: e.target.value }))
                }
                placeholder="Product description…"
                data-ocid="adminp.products.modal.textarea"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Price (₹) *</Label>
                <Input
                  type="number"
                  min={0}
                  value={form.price || ""}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, price: Number(e.target.value) }))
                  }
                  data-ocid="adminp.products.modal.price_input"
                />
              </div>
              <div className="space-y-1.5">
                <Label>Stock Qty</Label>
                <Input
                  type="number"
                  min={0}
                  value={form.stock || ""}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, stock: Number(e.target.value) }))
                  }
                  data-ocid="adminp.products.modal.stock_input"
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
                  <SelectTrigger data-ocid="adminp.products.modal.category_select">
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
                <Label>Discount (%)</Label>
                <Input
                  type="number"
                  min={0}
                  max={100}
                  value={form.discount || ""}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, discount: Number(e.target.value) }))
                  }
                  data-ocid="adminp.products.modal.discount_input"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Image URL</Label>
              <Input
                value={form.imageUrl}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    imageUrl: e.target.value,
                    imageKey: e.target.value,
                  }))
                }
                placeholder="https://… or /assets/products/…"
                data-ocid="adminp.products.modal.image_input"
              />
              {form.imageUrl && (
                <img
                  src={form.imageUrl}
                  alt="Preview"
                  className="h-20 w-20 object-cover rounded-lg border mt-1"
                  onError={(e) => {
                    e.currentTarget.src = IMG_FALLBACK;
                  }}
                />
              )}
            </div>
            <div className="flex items-center gap-3 py-1">
              <Switch
                id="ap-featured"
                checked={form.featured}
                onCheckedChange={(v) => setForm((f) => ({ ...f, featured: v }))}
                data-ocid="adminp.products.modal.featured_switch"
              />
              <Label htmlFor="ap-featured">Mark as Featured</Label>
            </div>
            <div className="flex gap-2 pt-1">
              <Button
                className="flex-1 bg-[#004a38] hover:bg-[#003a2c]"
                onClick={handleSave}
                data-ocid="adminp.products.modal.submit_button"
              >
                {editTarget ? "Save Changes" : "Add Product"}
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowModal(false)}
                data-ocid="adminp.products.modal.cancel_button"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirm */}
      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={() => setDeleteTarget(null)}
      >
        <AlertDialogContent data-ocid="adminp.products.delete.dialog">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Product</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete{" "}
              <strong>{deleteTarget?.name}</strong>? This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-ocid="adminp.products.delete.cancel_button">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteTarget && handleDelete(deleteTarget)}
              className="bg-red-600 hover:bg-red-700"
              data-ocid="adminp.products.delete.confirm_button"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminPLayout>
  );
}
