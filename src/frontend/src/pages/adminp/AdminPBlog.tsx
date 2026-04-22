import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertCircle,
  BookOpen,
  Edit2,
  Plus,
  RefreshCw,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  useAdminBlog,
  useCreateBlogPost,
  useDeleteBlogPost,
  usePublishBlogPost,
  useUpdateBlogPost,
} from "../../hooks/useAdminData";
import type { BlogPostView } from "../../services/blogService";
import { APTag, AdminPLayout } from "./AdminPLayout";

const IMG_FALLBACK =
  "https://images.unsplash.com/photo-1542848284-8afa78a08ccb?w=600&q=80";

function genId() {
  return `BLG-${Date.now().toString(36).toUpperCase()}`;
}

const EMPTY_POST: BlogPostView = {
  id: "",
  title: "",
  slug: "",
  content: "",
  excerpt: "",
  featuredImage: "",
  metaTitle: "",
  metaDescription: "",
  tags: [],
  status: "draft",
  createdAt: Date.now(),
  updatedAt: Date.now(),
};

export default function AdminPBlog() {
  const { data: blogPosts = [], isLoading, isError, refetch } = useAdminBlog();
  const createMutation = useCreateBlogPost();
  const updateMutation = useUpdateBlogPost();
  const deleteMutation = useDeleteBlogPost();
  const publishMutation = usePublishBlogPost();

  const [showModal, setShowModal] = useState(false);
  const [editTarget, setEditTarget] = useState<BlogPostView | null>(null);
  const [form, setForm] = useState<BlogPostView>(EMPTY_POST);

  function openAdd() {
    setEditTarget(null);
    setForm({
      ...EMPTY_POST,
      id: genId(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    setShowModal(true);
  }

  function openEdit(p: BlogPostView) {
    setEditTarget(p);
    setForm({ ...p });
    setShowModal(true);
  }

  async function handleSave() {
    if (!form.title.trim()) {
      toast.error("Title is required");
      return;
    }
    const slug =
      form.slug ||
      form.title
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");
    const post = { ...form, slug, updatedAt: Date.now() };
    try {
      if (editTarget) {
        await updateMutation.mutateAsync({ id: editTarget.id, post });
        toast.success("Blog post updated");
      } else {
        await createMutation.mutateAsync(post);
        toast.success("Blog post created");
      }
      setShowModal(false);
    } catch {
      toast.error("Failed to save blog post");
    }
  }

  async function handleDelete(id: string) {
    try {
      await deleteMutation.mutateAsync(id);
      toast.success("Post deleted");
    } catch {
      toast.error("Failed to delete post");
    }
  }

  async function handlePublish(id: string) {
    try {
      await publishMutation.mutateAsync(id);
      toast.success("Post published!");
    } catch {
      toast.error("Failed to publish post");
    }
  }

  if (isError) {
    return (
      <AdminPLayout
        title="Blog Management"
        subtitle="Manage Forestheals blog content"
      >
        <div
          className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center"
          data-ocid="adminp.blog.error_state"
        >
          <AlertCircle className="w-8 h-8 text-red-400 mx-auto mb-3" />
          <p className="text-red-700 font-medium">Failed to load blog posts</p>
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
      {isLoading ? (
        <div
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5"
          data-ocid="adminp.blog.loading_state"
        >
          {["a", "b", "c"].map((k) => (
            <Skeleton key={k} className="h-64 w-full rounded-2xl" />
          ))}
        </div>
      ) : (
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
                    color={post.status === "published" ? "green" : "gray"}
                  />
                  {post.publishDate && (
                    <span className="text-xs text-gray-400">
                      {new Date(post.publishDate).toLocaleDateString("en-IN")}
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
                <div className="flex justify-between gap-1 mt-3">
                  {post.status !== "published" && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs h-7 gap-1 border-green-200 text-green-700 hover:bg-green-50"
                      onClick={() => void handlePublish(post.id)}
                      disabled={publishMutation.isPending}
                      data-ocid={`adminp.blog.item.${i + 1}.publish_button`}
                    >
                      Publish
                    </Button>
                  )}
                  <div className="flex gap-1 ml-auto">
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
                      onClick={() => void handleDelete(post.id)}
                      data-ocid={`adminp.blog.item.${i + 1}.delete_button`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
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
              <p className="text-gray-500 text-sm">
                No blog posts yet — create your first post to start blogging!
              </p>
              <Button
                size="sm"
                variant="outline"
                className="mt-3"
                onClick={openAdd}
              >
                Create first post
              </Button>
            </div>
          )}
        </div>
      )}

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
                value={form.title}
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
                value={form.slug}
                onChange={(e) =>
                  setForm((f) => ({ ...f, slug: e.target.value }))
                }
                placeholder="ashwagandha-benefits"
                data-ocid="adminp.blog.modal.slug_input"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Excerpt</Label>
              <Textarea
                rows={2}
                value={form.excerpt}
                onChange={(e) =>
                  setForm((f) => ({ ...f, excerpt: e.target.value }))
                }
                placeholder="Brief summary of the post…"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Content</Label>
              <Textarea
                rows={5}
                value={form.content}
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
                value={form.featuredImage}
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
                value={form.metaTitle}
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
                value={form.metaDescription}
                onChange={(e) =>
                  setForm((f) => ({ ...f, metaDescription: e.target.value }))
                }
                placeholder="SEO description…"
                data-ocid="adminp.blog.modal.meta_desc_input"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Tags (comma-separated)</Label>
              <Input
                value={form.tags.join(", ")}
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
            <div className="flex items-center gap-3 py-1">
              <Switch
                id="blog-published"
                checked={form.status === "published"}
                onCheckedChange={(v) =>
                  setForm((f) => ({ ...f, status: v ? "published" : "draft" }))
                }
                data-ocid="adminp.blog.modal.published_switch"
              />
              <Label htmlFor="blog-published">Publish immediately</Label>
            </div>
            <div className="flex gap-2 pt-1">
              <Button
                className="flex-1 bg-[#004a38] hover:bg-[#003a2c]"
                onClick={() => void handleSave()}
                disabled={createMutation.isPending || updateMutation.isPending}
                data-ocid="adminp.blog.modal.submit_button"
              >
                {createMutation.isPending || updateMutation.isPending
                  ? "Saving…"
                  : editTarget
                    ? "Save Changes"
                    : "Create Post"}
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
