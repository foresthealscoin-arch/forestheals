import { J as useAdminPStore, r as reactExports, j as jsxRuntimeExports, a as Button, d as ue, I as Input } from "./index-C77TdgT2.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-CLZ4CVsS.js";
import { L as Label } from "./label-Bdg5wNUV.js";
import { S as Switch } from "./switch-DYSjHade.js";
import { T as Textarea } from "./textarea-CO2BYHNX.js";
import { A as AdminPLayout, b as APTag, B as BookOpen } from "./AdminPLayout-DXQoX6aZ.js";
import { P as Pen } from "./pen-_taNolNe.js";
import { T as Trash2 } from "./trash-2-BT7W5K0q.js";
import { P as Plus } from "./plus-B9luQg0g.js";
import "./index-CdCJTNlH.js";
import "./index-CO47XDRv.js";
import "./index-DR1O-5dL.js";
import "./index-BJEZxP4l.js";
import "./index-CfvA_s5j.js";
import "./index-DWnu7L6s.js";
import "./leaf-BotUdxvq.js";
import "./chevron-right-ZsOnTFmP.js";
import "./package-B8cYcbks.js";
import "./shopping-cart-DPqgd3XG.js";
import "./users-YYSJrKmY.js";
import "./star-DR91Bj0n.js";
function genId() {
  return `BLG-${Date.now().toString(36).toUpperCase()}`;
}
const IMG_FALLBACK = "https://images.unsplash.com/photo-1542848284-8afa78a08ccb?w=600&q=80";
function AdminPBlog() {
  const blogPosts = useAdminPStore((s) => s.blogPosts);
  const addBlogPost = useAdminPStore((s) => s.addBlogPost);
  const updateBlogPost = useAdminPStore((s) => s.updateBlogPost);
  const deleteBlogPost = useAdminPStore((s) => s.deleteBlogPost);
  const [showModal, setShowModal] = reactExports.useState(false);
  const [editTarget, setEditTarget] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState({});
  function openAdd() {
    setEditTarget(null);
    setForm({
      status: "Draft",
      tags: [],
      publishDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
    });
    setShowModal(true);
  }
  function openEdit(p) {
    setEditTarget(p);
    setForm({ ...p });
    setShowModal(true);
  }
  function handleSave() {
    var _a;
    if (!((_a = form.title) == null ? void 0 : _a.trim())) {
      ue.error("Title is required");
      return;
    }
    const slug = form.slug ?? form.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    if (editTarget) {
      updateBlogPost({ ...editTarget, ...form, slug });
      ue.success("Blog post updated");
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
        publishDate: form.publishDate ?? ""
      });
      ue.success("Blog post created");
    }
    setShowModal(false);
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
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5", children: [
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
                        color: post.status === "Published" ? "green" : "gray"
                      }
                    ),
                    post.publishDate && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-gray-400", children: post.publishDate })
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
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-1 mt-3", children: [
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
                        onClick: () => {
                          deleteBlogPost(post.id);
                          ue.success("Post deleted");
                        },
                        "data-ocid": `adminp.blog.item.${i + 1}.delete_button`,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
                      }
                    )
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
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 text-sm", children: "No blog posts yet" })
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
                      value: form.title ?? "",
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
                      value: form.slug ?? "",
                      onChange: (e) => setForm((f) => ({ ...f, slug: e.target.value })),
                      placeholder: "ashwagandha-benefits",
                      "data-ocid": "adminp.blog.modal.slug_input"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Content" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Textarea,
                    {
                      rows: 5,
                      value: form.content ?? "",
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
                      value: form.featuredImage ?? "",
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
                      value: form.metaTitle ?? "",
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
                      value: form.metaDesc ?? "",
                      onChange: (e) => setForm((f) => ({ ...f, metaDesc: e.target.value })),
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
                      value: (form.tags ?? []).join(", "),
                      onChange: (e) => setForm((f) => ({
                        ...f,
                        tags: e.target.value.split(",").map((t) => t.trim()).filter(Boolean)
                      })),
                      placeholder: "Ayurveda, Health, Wellness",
                      "data-ocid": "adminp.blog.modal.tags_input"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Publish Date" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        type: "date",
                        value: form.publishDate ?? "",
                        onChange: (e) => setForm((f) => ({ ...f, publishDate: e.target.value })),
                        "data-ocid": "adminp.blog.modal.date_input"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end gap-3 pb-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Switch,
                      {
                        id: "blog-published",
                        checked: form.status === "Published",
                        onCheckedChange: (v) => setForm((f) => ({
                          ...f,
                          status: v ? "Published" : "Draft"
                        })),
                        "data-ocid": "adminp.blog.modal.published_switch"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "blog-published", children: "Publish" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      className: "flex-1 bg-[#004a38] hover:bg-[#003a2c]",
                      onClick: handleSave,
                      "data-ocid": "adminp.blog.modal.submit_button",
                      children: editTarget ? "Save Changes" : "Create Post"
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
