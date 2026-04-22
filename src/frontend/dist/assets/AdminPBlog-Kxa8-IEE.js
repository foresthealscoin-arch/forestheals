import { r as reactExports, j as jsxRuntimeExports, a as Button, I as Input, e as ue } from "./index-CfU2kVIJ.js";
import { d as Dialog, e as DialogContent, f as DialogHeader, g as DialogTitle } from "./dialog-BmCSuf7q.js";
import { L as Label } from "./label-BjUfKOjb.js";
import { S as Skeleton } from "./skeleton-Dbe_tSkr.js";
import { S as Switch } from "./switch-BPNoaHft.js";
import { T as Textarea } from "./textarea-CHqS0GCX.js";
import { N as useAdminBlog, O as useCreateBlogPost, P as useUpdateBlogPost, Q as useDeleteBlogPost, R as usePublishBlogPost, A as AdminPLayout, l as APTag, T as BookOpen } from "./AdminPLayout-CIt5RHz_.js";
import { C as CircleAlert } from "./circle-alert-ucF-SypE.js";
import { R as RefreshCw } from "./refresh-cw-CczYOB5W.js";
import { P as Pen } from "./pen-C8l-9AD8.js";
import { T as Trash2 } from "./trash-2-CLRUW9XH.js";
import { P as Plus } from "./plus-Dgb9NiV8.js";
import "./index-l7_3JU5-.js";
import "./index-D_sIzci6.js";
import "./index-Dzwq3ONP.js";
import "./useMutation-DVPdZiQH.js";
import "./convert-Cs1e6Uux.js";
import "./leaf-BdKoN6HX.js";
import "./chevron-right-DNGmMEAY.js";
import "./package-C5tkAuNr.js";
import "./users-BTrxV2BM.js";
import "./star-D6nQNTvb.js";
const IMG_FALLBACK = "https://images.unsplash.com/photo-1542848284-8afa78a08ccb?w=600&q=80";
function genId() {
  return `BLG-${Date.now().toString(36).toUpperCase()}`;
}
const EMPTY_POST = {
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
  updatedAt: Date.now()
};
function AdminPBlog() {
  const { data: blogPosts = [], isLoading, isError, refetch } = useAdminBlog();
  const createMutation = useCreateBlogPost();
  const updateMutation = useUpdateBlogPost();
  const deleteMutation = useDeleteBlogPost();
  const publishMutation = usePublishBlogPost();
  const [showModal, setShowModal] = reactExports.useState(false);
  const [editTarget, setEditTarget] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState(EMPTY_POST);
  function openAdd() {
    setEditTarget(null);
    setForm({
      ...EMPTY_POST,
      id: genId(),
      createdAt: Date.now(),
      updatedAt: Date.now()
    });
    setShowModal(true);
  }
  function openEdit(p) {
    setEditTarget(p);
    setForm({ ...p });
    setShowModal(true);
  }
  async function handleSave() {
    if (!form.title.trim()) {
      ue.error("Title is required");
      return;
    }
    const slug = form.slug || form.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    const post = { ...form, slug, updatedAt: Date.now() };
    try {
      if (editTarget) {
        await updateMutation.mutateAsync({ id: editTarget.id, post });
        ue.success("Blog post updated");
      } else {
        await createMutation.mutateAsync(post);
        ue.success("Blog post created");
      }
      setShowModal(false);
    } catch {
      ue.error("Failed to save blog post");
    }
  }
  async function handleDelete(id) {
    try {
      await deleteMutation.mutateAsync(id);
      ue.success("Post deleted");
    } catch {
      ue.error("Failed to delete post");
    }
  }
  async function handlePublish(id) {
    try {
      await publishMutation.mutateAsync(id);
      ue.success("Post published!");
    } catch {
      ue.error("Failed to publish post");
    }
  }
  if (isError) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      AdminPLayout,
      {
        title: "Blog Management",
        subtitle: "Manage Forestheals blog content",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-red-50 border border-red-200 rounded-2xl p-8 text-center",
            "data-ocid": "adminp.blog.error_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-8 h-8 text-red-400 mx-auto mb-3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-red-700 font-medium", children: "Failed to load blog posts" }),
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
        )
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    AdminPLayout,
    {
      title: "Blog Management",
      subtitle: "Create and manage Forestheals blog content",
      actions: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          size: "sm",
          className: "gap-1 bg-[#004a38] hover:bg-[#003a2c]",
          onClick: openAdd,
          "data-ocid": "adminp.blog.add_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
            " New Post"
          ]
        }
      ),
      children: [
        isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5",
            "data-ocid": "adminp.blog.loading_state",
            children: ["a", "b", "c"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-64 w-full rounded-2xl" }, k))
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5", children: [
          blogPosts.map((post, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              "data-ocid": `adminp.blog.item.${i + 1}`,
              className: "bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: post.featuredImage || IMG_FALLBACK,
                    alt: post.title,
                    className: "w-full h-40 object-cover",
                    onError: (e) => {
                      e.currentTarget.src = IMG_FALLBACK;
                    }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      APTag,
                      {
                        label: post.status,
                        color: post.status === "published" ? "green" : "gray"
                      }
                    ),
                    post.publishDate && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-gray-400", children: new Date(post.publishDate).toLocaleDateString("en-IN") })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-gray-900 text-sm line-clamp-2 mb-1", children: post.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-gray-500 font-mono", children: [
                    "/blog/",
                    post.slug
                  ] }),
                  post.tags.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1 mt-2", children: post.tags.slice(0, 3).map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "text-xs px-2 py-0.5 rounded bg-green-50 text-green-700",
                      children: tag
                    },
                    tag
                  )) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between gap-1 mt-3", children: [
                    post.status !== "published" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        size: "sm",
                        variant: "outline",
                        className: "text-xs h-7 gap-1 border-green-200 text-green-700 hover:bg-green-50",
                        onClick: () => void handlePublish(post.id),
                        disabled: publishMutation.isPending,
                        "data-ocid": `adminp.blog.item.${i + 1}.publish_button`,
                        children: "Publish"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1 ml-auto", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Button,
                        {
                          size: "icon",
                          variant: "ghost",
                          className: "h-7 w-7",
                          onClick: () => openEdit(post),
                          "data-ocid": `adminp.blog.item.${i + 1}.edit_button`,
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "w-3.5 h-3.5" })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Button,
                        {
                          size: "icon",
                          variant: "ghost",
                          className: "h-7 w-7 hover:bg-red-50 hover:text-red-600",
                          onClick: () => void handleDelete(post.id),
                          "data-ocid": `adminp.blog.item.${i + 1}.delete_button`,
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
                        }
                      )
                    ] })
                  ] })
                ] })
              ]
            },
            post.id
          )),
          blogPosts.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "col-span-3 bg-white rounded-2xl border border-gray-100 p-14 text-center",
              "data-ocid": "adminp.blog.empty_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-10 h-10 text-gray-300 mx-auto mb-3" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 text-sm", children: "No blog posts yet — create your first post to start blogging!" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    size: "sm",
                    variant: "outline",
                    className: "mt-3",
                    onClick: openAdd,
                    children: "Create first post"
                  }
                )
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showModal, onOpenChange: setShowModal, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          DialogContent,
          {
            className: "max-w-lg max-h-[90vh] overflow-y-auto",
            "data-ocid": "adminp.blog.modal.dialog",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: editTarget ? "Edit Blog Post" : "Create Blog Post" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 pt-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Title *" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      value: form.title,
                      onChange: (e) => setForm((f) => ({ ...f, title: e.target.value })),
                      placeholder: "10 Benefits of Ashwagandha…",
                      "data-ocid": "adminp.blog.modal.title_input"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Slug (auto-generated if empty)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      value: form.slug,
                      onChange: (e) => setForm((f) => ({ ...f, slug: e.target.value })),
                      placeholder: "ashwagandha-benefits",
                      "data-ocid": "adminp.blog.modal.slug_input"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Excerpt" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Textarea,
                    {
                      rows: 2,
                      value: form.excerpt,
                      onChange: (e) => setForm((f) => ({ ...f, excerpt: e.target.value })),
                      placeholder: "Brief summary of the post…"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Content" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Textarea,
                    {
                      rows: 5,
                      value: form.content,
                      onChange: (e) => setForm((f) => ({ ...f, content: e.target.value })),
                      placeholder: "Write your blog content here…",
                      "data-ocid": "adminp.blog.modal.content_input"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Featured Image URL" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      value: form.featuredImage,
                      onChange: (e) => setForm((f) => ({ ...f, featuredImage: e.target.value })),
                      placeholder: "https://…",
                      "data-ocid": "adminp.blog.modal.image_input"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Meta Title" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      value: form.metaTitle,
                      onChange: (e) => setForm((f) => ({ ...f, metaTitle: e.target.value })),
                      placeholder: "SEO title…",
                      "data-ocid": "adminp.blog.modal.meta_title_input"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Meta Description" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Textarea,
                    {
                      rows: 2,
                      value: form.metaDescription,
                      onChange: (e) => setForm((f) => ({ ...f, metaDescription: e.target.value })),
                      placeholder: "SEO description…",
                      "data-ocid": "adminp.blog.modal.meta_desc_input"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Tags (comma-separated)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      value: form.tags.join(", "),
                      onChange: (e) => setForm((f) => ({
                        ...f,
                        tags: e.target.value.split(",").map((t) => t.trim()).filter(Boolean)
                      })),
                      placeholder: "Ayurveda, Health, Wellness",
                      "data-ocid": "adminp.blog.modal.tags_input"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 py-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Switch,
                    {
                      id: "blog-published",
                      checked: form.status === "published",
                      onCheckedChange: (v) => setForm((f) => ({ ...f, status: v ? "published" : "draft" })),
                      "data-ocid": "adminp.blog.modal.published_switch"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "blog-published", children: "Publish immediately" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      className: "flex-1 bg-[#004a38] hover:bg-[#003a2c]",
                      onClick: () => void handleSave(),
                      disabled: createMutation.isPending || updateMutation.isPending,
                      "data-ocid": "adminp.blog.modal.submit_button",
                      children: createMutation.isPending || updateMutation.isPending ? "Saving…" : editTarget ? "Save Changes" : "Create Post"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      variant: "outline",
                      className: "flex-1",
                      onClick: () => setShowModal(false),
                      "data-ocid": "adminp.blog.modal.cancel_button",
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
  AdminPBlog as default
};
