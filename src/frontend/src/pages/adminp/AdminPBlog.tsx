import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { BookOpen, Edit2, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { APTag, AdminPLayout } from "./AdminPLayout";
import type { APBlogPost } from "./adminpStore";
import { useAdminPStore } from "./adminpStore";

function genId() {
  return `BLG-${Date.now().toString(36).toUpperCase()}`;
}

const IMG_FALLBACK =
  "https://images.unsplash.com/photo-1542848284-8afa78a08ccb?w=600&q=80";

export default function AdminPBlog() {
  const blogPosts = useAdminPStore((s) => s.blogPosts);
  const addBlogPost = useAdminPStore((s) => s.addBlogPost);
  const updateBlogPost = useAdminPStore((s) => s.updateBlogPost);
  const deleteBlogPost = useAdminPStore((s) => s.deleteBlogPost);

  const [showModal, setShowModal] = useState(false);
  const [editTarget, setEditTarget] = useState<APBlogPost | null>(null);
  const [form, setForm] = useState<Partial<APBlogPost>>({});

  function openAdd() {
    setEditTarget(null);
    setForm({
      status: "Draft",
      tags: [],
      publishDate: new Date().toISOString().split("T")[0],
    });
    setShowModal(true);
  }

  function openEdit(p: APBlogPost) {
    setEditTarget(p);
    setForm({ ...p });
    setShowModal(true);
  }

  function handleSave() {
    if (!form.title?.trim()) {
      toast.error("Title is required");
      return;
    }
    const slug =
      form.slug ??
      form.title
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");
    if (editTarget) {
      updateBlogPost({ ...editTarget, ...form, slug } as APBlogPost);
      toast.success("Blog post updated");
    } else {
      addBlogPost({
        id: genId(),
        title: form.title ?? "",
        slug,
        content: form.content ?? "",
        featuredImage: form.featuredImage ?? "",
        metaTitle: form.metaTitle ?? form.title ?? "",
        metaDesc: form.metaDesc ?? "",
        tags: form.tags ?? [],
        status: form.status ?? "Draft",
        publishDate: form.publishDate ?? "",
      });
      toast.success("Blog post created");
    }
    setShowModal(false);
  }

  return (
    <AdminPLayout
      title="Blog Management"
      subtitle="Create and manage Forestheals blog content"
      actions={
        <Button
          size="sm"
          className="gap-1 bg-[#004a38] hover:bg-[#003a2c]"
          onClick={openAdd}
          data-ocid="adminp.blog.add_button"
        >
          <Plus className="w-4 h-4" /> New Post
        </Button>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {blogPosts.map((post, i) => (
          <div
            key={post.id}
            data-ocid={`adminp.blog.item.${i + 1}`}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
          >
            <img
              src={post.featuredImage || IMG_FALLBACK}
              alt={post.title}
              className="w-full h-40 object-cover"
              onError={(e) => {
                e.currentTarget.src = IMG_FALLBACK;
              }}
            />
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <APTag
                  label={post.status}
                  color={post.status === "Published" ? "green" : "gray"}
                />
                {post.publishDate && (
                  <span className="text-xs text-gray-400">
                    {post.publishDate}
                  </span>
                )}
              </div>
              <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 mb-1">
                {post.title}
              </h3>
              <p className="text-xs text-gray-500 font-mono">
                /blog/{post.slug}
              </p>
              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-0.5 rounded bg-green-50 text-green-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <div className="flex justify-end gap-1 mt-3">
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-7 w-7"
                  onClick={() => openEdit(post)}
                  data-ocid={`adminp.blog.item.${i + 1}.edit_button`}
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-7 w-7 hover:bg-red-50 hover:text-red-600"
                  onClick={() => {
                    deleteBlogPost(post.id);
                    toast.success("Post deleted");
                  }}
                  data-ocid={`adminp.blog.item.${i + 1}.delete_button`}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          </div>
        ))}
        {blogPosts.length === 0 && (
          <div
            className="col-span-3 bg-white rounded-2xl border border-gray-100 p-14 text-center"
            data-ocid="adminp.blog.empty_state"
          >
            <BookOpen className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">No blog posts yet</p>
          </div>
        )}
      </div>

      {/* Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent
          className="max-w-lg max-h-[90vh] overflow-y-auto"
          data-ocid="adminp.blog.modal.dialog"
        >
          <DialogHeader>
            <DialogTitle>
              {editTarget ? "Edit Blog Post" : "Create Blog Post"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3 pt-2">
            <div className="space-y-1.5">
              <Label>Title *</Label>
              <Input
                value={form.title ?? ""}
                onChange={(e) =>
                  setForm((f) => ({ ...f, title: e.target.value }))
                }
                placeholder="10 Benefits of Ashwagandha…"
                data-ocid="adminp.blog.modal.title_input"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Slug (auto-generated if empty)</Label>
              <Input
                value={form.slug ?? ""}
                onChange={(e) =>
                  setForm((f) => ({ ...f, slug: e.target.value }))
                }
                placeholder="ashwagandha-benefits"
                data-ocid="adminp.blog.modal.slug_input"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Content</Label>
              <Textarea
                rows={5}
                value={form.content ?? ""}
                onChange={(e) =>
                  setForm((f) => ({ ...f, content: e.target.value }))
                }
                placeholder="Write your blog content here…"
                data-ocid="adminp.blog.modal.content_input"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Featured Image URL</Label>
              <Input
                value={form.featuredImage ?? ""}
                onChange={(e) =>
                  setForm((f) => ({ ...f, featuredImage: e.target.value }))
                }
                placeholder="https://…"
                data-ocid="adminp.blog.modal.image_input"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Meta Title</Label>
              <Input
                value={form.metaTitle ?? ""}
                onChange={(e) =>
                  setForm((f) => ({ ...f, metaTitle: e.target.value }))
                }
                placeholder="SEO title…"
                data-ocid="adminp.blog.modal.meta_title_input"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Meta Description</Label>
              <Textarea
                rows={2}
                value={form.metaDesc ?? ""}
                onChange={(e) =>
                  setForm((f) => ({ ...f, metaDesc: e.target.value }))
                }
                placeholder="SEO description…"
                data-ocid="adminp.blog.modal.meta_desc_input"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Tags (comma-separated)</Label>
              <Input
                value={(form.tags ?? []).join(", ")}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    tags: e.target.value
                      .split(",")
                      .map((t) => t.trim())
                      .filter(Boolean),
                  }))
                }
                placeholder="Ayurveda, Health, Wellness"
                data-ocid="adminp.blog.modal.tags_input"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Publish Date</Label>
                <Input
                  type="date"
                  value={form.publishDate ?? ""}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, publishDate: e.target.value }))
                  }
                  data-ocid="adminp.blog.modal.date_input"
                />
              </div>
              <div className="flex items-end gap-3 pb-1">
                <Switch
                  id="blog-published"
                  checked={form.status === "Published"}
                  onCheckedChange={(v) =>
                    setForm((f) => ({
                      ...f,
                      status: v ? "Published" : "Draft",
                    }))
                  }
                  data-ocid="adminp.blog.modal.published_switch"
                />
                <Label htmlFor="blog-published">Publish</Label>
              </div>
            </div>
            <div className="flex gap-2 pt-1">
              <Button
                className="flex-1 bg-[#004a38] hover:bg-[#003a2c]"
                onClick={handleSave}
                data-ocid="adminp.blog.modal.submit_button"
              >
                {editTarget ? "Save Changes" : "Create Post"}
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowModal(false)}
                data-ocid="adminp.blog.modal.cancel_button"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </AdminPLayout>
  );
}
