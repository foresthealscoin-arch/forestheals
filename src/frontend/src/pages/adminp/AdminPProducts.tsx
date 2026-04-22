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
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertCircle,
  Edit2,
  Package,
  Plus,
  RefreshCw,
  Search,
  Star,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  useAdminProducts,
  useCreateAdminProduct,
  useDeleteAdminProduct,
  useUpdateAdminProduct,
} from "../../hooks/useAdminData";
import type { ProductView } from "../../services/productService";
import { AdminPLayout } from "./AdminPLayout";

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

const STATUS_OPTIONS = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "draft", label: "Draft" },
] as const;

const STATUS_COLOR: Record<string, string> = {
  active: "bg-green-100 text-green-700",
  inactive: "bg-gray-100 text-gray-500",
  draft: "bg-yellow-100 text-yellow-700",
};

const EMPTY: Omit<ProductView, "id" | "ratings" | "reviewCount"> = {
  name: "",
  description: "",
  price: 0,
  comparePrice: undefined,
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

const IMG_FALLBACK =
  "https://images.unsplash.com/photo-1616391182219-e080b4d1043a?w=400&q=80";

export default function AdminPProducts() {
  const {
    data: products = [],
    isLoading,
    isError,
    refetch,
  } = useAdminProducts();
  const createMutation = useCreateAdminProduct();
  const updateMutation = useUpdateAdminProduct();
  const deleteMutation = useDeleteAdminProduct();

  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [editTarget, setEditTarget] = useState<ProductView | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ProductView | null>(null);
  const [form, setForm] = useState<typeof EMPTY>({ ...EMPTY });
  const [imagesInput, setImagesInput] = useState("");

  const filtered = products.filter((p) => {
    const q = search.toLowerCase();
    return (
      (!q || p.name.toLowerCase().includes(q)) &&
      (catFilter === "all" || p.category === catFilter) &&
      (statusFilter === "all" || p.status === statusFilter)
    );
  });

  function openAdd() {
    setEditTarget(null);
    setForm({ ...EMPTY });
    setImagesInput("");
    setShowModal(true);
  }

  function openEdit(p: ProductView) {
    setEditTarget(p);
    setForm({
      name: p.name,
      description: p.description,
      price: p.price,
      comparePrice: p.comparePrice,
      category: p.category,
      imageUrl: p.imageUrl,
      imageKey: p.imageKey,
      images: p.images ?? [],
      stock: p.stock,
      featured: p.featured,
      bestseller: p.bestseller,
      discount: p.discount,
      bundleIds: p.bundleIds,
      status: p.status,
    });
    setImagesInput((p.images ?? []).join("\n"));
    setShowModal(true);
  }

  async function handleSave() {
    if (!form.name.trim() || !form.price) {
      toast.error("Name and price are required");
      return;
    }
    const parsedImages = imagesInput
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
    const finalForm = { ...form, images: parsedImages };
    try {
      if (editTarget) {
        await updateMutation.mutateAsync({
          id: editTarget.id,
          input: finalForm,
        });
        toast.success("Product updated!");
      } else {
        await createMutation.mutateAsync(finalForm);
        toast.success("Product added to catalog!");
      }
      setShowModal(false);
    } catch {
      toast.error("Failed to save product. Please try again.");
    }
  }

  async function handleDelete(p: ProductView) {
    try {
      await deleteMutation.mutateAsync(p.id);
      toast.success("Product deleted");
    } catch {
      toast.error("Failed to delete product.");
    }
    setDeleteTarget(null);
  }

  if (isError) {
    return (
      <AdminPLayout title="Products" subtitle="Manage your product catalog">
        <div
          className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center"
          data-ocid="adminp.products.error_state"
        >
          <AlertCircle className="w-8 h-8 text-red-400 mx-auto mb-3" />
          <p className="text-red-700 font-medium">Failed to load products</p>
          <Button
            variant="outline"
            size="sm"
            className="mt-3"
            onClick={() => void refetch()}
          >
            <RefreshCw className="w-4 h-4 mr-1" /> Retry
          </Button>
        </div>
      </AdminPLayout>
    );
  }

  return (
    <AdminPLayout
      title="Products"
      subtitle={`${products.length} products in catalog`}
      actions={
        <Button
          size="sm"
          onClick={openAdd}
          className="gap-1 bg-[#004a38] hover:bg-[#003a2c]"
          data-ocid="adminp.products.add_button"
        >
          <Plus className="w-4 h-4" /> Add Product
        </Button>
      }
    >
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
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger
            className="w-36"
            data-ocid="adminp.products.status_filter_select"
          >
            <SelectValue placeholder="All statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            {STATUS_OPTIONS.map((s) => (
              <SelectItem key={s.value} value={s.value}>
                {s.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <div className="space-y-2" data-ocid="adminp.products.loading_state">
          {["a", "b", "c", "d", "e"].map((k) => (
            <Skeleton key={k} className="h-14 w-full rounded-xl" />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm" data-ocid="adminp.products.table">
              <thead>
                <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide border-b border-gray-100">
                  <th className="text-left px-4 py-3 font-medium">Product</th>
                  <th className="text-left px-4 py-3 font-medium hidden md:table-cell">
                    Category
                  </th>
                  <th className="text-right px-4 py-3 font-medium">Price</th>
                  <th className="text-right px-4 py-3 font-medium hidden sm:table-cell">
                    Stock
                  </th>
                  <th className="text-center px-4 py-3 font-medium hidden lg:table-cell">
                    Status
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
                    className="border-t border-gray-50 hover:bg-gray-50/60 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.images?.[0] || p.imageUrl || IMG_FALLBACK}
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
                    <td className="px-4 py-3 text-right">
                      <p className="font-semibold text-[#004a38]">₹{p.price}</p>
                      {p.comparePrice && p.comparePrice > p.price && (
                        <p className="text-xs text-gray-400 line-through">
                          ₹{p.comparePrice}
                        </p>
                      )}
                    </td>
                    <td
                      className={`px-4 py-3 text-right hidden sm:table-cell text-xs ${p.stock < 20 ? "text-red-600 font-semibold" : "text-gray-500"}`}
                    >
                      {p.stock}
                    </td>
                    <td className="px-4 py-3 text-center hidden lg:table-cell">
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_COLOR[p.status] ?? "bg-gray-100 text-gray-500"}`}
                      >
                        {p.status.charAt(0).toUpperCase() + p.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center hidden lg:table-cell">
                      <Star
                        className={`w-4 h-4 mx-auto ${p.featured ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                      />
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
                      <Button
                        size="sm"
                        variant="outline"
                        className="mt-3"
                        onClick={openAdd}
                      >
                        Add your first product
                      </Button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent
          className="max-w-lg max-h-[92vh] overflow-y-auto"
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
                <Label>Compare Price (₹)</Label>
                <Input
                  type="number"
                  min={0}
                  value={form.comparePrice ?? ""}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      comparePrice: e.target.value
                        ? Number(e.target.value)
                        : undefined,
                    }))
                  }
                  placeholder="Original / MRP"
                  data-ocid="adminp.products.modal.compare_price_input"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
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
              <div className="space-y-1.5">
                <Label>Discount (%)</Label>
                <Input
                  type="number"
                  min={0}
                  max={100}
                  value={form.discount || ""}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      discount: Number(e.target.value),
                    }))
                  }
                  data-ocid="adminp.products.modal.discount_input"
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
                <Label>Status</Label>
                <Select
                  value={form.status}
                  onValueChange={(v) =>
                    setForm((f) => ({
                      ...f,
                      status: v as "active" | "inactive" | "draft",
                    }))
                  }
                >
                  <SelectTrigger data-ocid="adminp.products.modal.status_select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {STATUS_OPTIONS.map((s) => (
                      <SelectItem key={s.value} value={s.value}>
                        {s.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Main Image URL</Label>
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
            <div className="space-y-1.5">
              <Label>Additional Images (one URL per line)</Label>
              <Textarea
                rows={3}
                value={imagesInput}
                onChange={(e) => setImagesInput(e.target.value)}
                placeholder={
                  "https://cdn.example.com/img1.jpg\nhttps://cdn.example.com/img2.jpg"
                }
                data-ocid="adminp.products.modal.images_textarea"
              />
              <p className="text-xs text-gray-400">
                These images appear in the product gallery.
              </p>
            </div>
            <div className="flex items-center gap-6 py-1">
              <div className="flex items-center gap-2">
                <Switch
                  id="ap-featured"
                  checked={form.featured}
                  onCheckedChange={(v) =>
                    setForm((f) => ({ ...f, featured: v }))
                  }
                  data-ocid="adminp.products.modal.featured_switch"
                />
                <Label htmlFor="ap-featured">Featured</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  id="ap-bestseller"
                  checked={form.bestseller}
                  onCheckedChange={(v) =>
                    setForm((f) => ({ ...f, bestseller: v }))
                  }
                  data-ocid="adminp.products.modal.bestseller_switch"
                />
                <Label htmlFor="ap-bestseller">Bestseller</Label>
              </div>
            </div>
            <div className="flex gap-2 pt-1">
              <Button
                className="flex-1 bg-[#004a38] hover:bg-[#003a2c]"
                onClick={() => void handleSave()}
                disabled={createMutation.isPending || updateMutation.isPending}
                data-ocid="adminp.products.modal.submit_button"
              >
                {createMutation.isPending || updateMutation.isPending
                  ? "Saving…"
                  : editTarget
                    ? "Save Changes"
                    : "Add Product"}
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
              onClick={() => deleteTarget && void handleDelete(deleteTarget)}
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
