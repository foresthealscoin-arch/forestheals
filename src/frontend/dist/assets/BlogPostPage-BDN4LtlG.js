import { n as useParams, j as jsxRuntimeExports, a as Button, L as Link, m as motion, B as Badge, u as useActor, q as useQuery, f as createActor } from "./index-CfU2kVIJ.js";
import { S as Skeleton } from "./skeleton-Dbe_tSkr.js";
import { A as ArrowLeft } from "./arrow-left-BC-g7eMh.js";
import { T as Tag } from "./tag-RoRywvnF.js";
import { C as Calendar } from "./calendar-DFAbWjKt.js";
import { C as Clock } from "./clock-DXcQvN8f.js";
function useBlogPost(slug) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["blog-post", slug],
    queryFn: async () => {
      if (!actor || isFetching || !slug) return null;
      const raw = await actor.getBlogPosts();
      const found = raw.find((p) => p.slug === slug);
      if (!found) return null;
      return {
        id: found.id,
        title: found.title,
        slug: found.slug,
        excerpt: found.excerpt,
        content: found.content,
        featuredImage: found.featuredImage,
        tags: found.tags,
        metaTitle: found.metaTitle,
        metaDescription: found.metaDescription,
        status: found.status,
        createdAt: Number(found.createdAt) / 1e6,
        updatedAt: Number(found.updatedAt) / 1e6,
        publishDate: found.publishDate ? Number(found.publishDate) / 1e6 : void 0
      };
    },
    enabled: !!slug && !!actor && !isFetching,
    staleTime: 2 * 60 * 1e3,
    retry: 2
  });
}
function BlogPostPage() {
  const { slug } = useParams({ from: "/blog/$slug" });
  const { data: post, isLoading } = useBlogPost(slug);
  const date = (post == null ? void 0 : post.publishDate) ? new Date(post.publishDate).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }) : post ? new Date(post.createdAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }) : "";
  const readTime = post ? Math.max(1, Math.ceil(post.content.split(/\s+/).length / 200)) : 0;
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-4 py-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-64 w-full rounded-2xl mb-8" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-3/4 mb-3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-48 mb-8" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: Array.from({ length: 8 }, (_, i) => `skel-${i}`).map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }, k)) })
    ] });
  }
  if (!post) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "min-h-[70vh] flex flex-col items-center justify-center px-4 text-center",
        "data-ocid": "blog_post.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: "📄" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold text-foreground mb-2", children: "Post not found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-6 max-w-sm", children: "This blog post may have been moved or unpublished." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/blog", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4 mr-2" }),
            "Back to Blog"
          ] }) })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", "data-ocid": "blog_post.page", children: [
    post.featuredImage && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-64 sm:h-80 md:h-96 overflow-hidden bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src: post.featuredImage,
        alt: post.title,
        className: "w-full h-full object-cover",
        onError: (e) => {
          e.currentTarget.style.display = "none";
        }
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-4 sm:px-6 py-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "flex items-center gap-1.5 text-sm text-muted-foreground mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "hover:text-primary transition-smooth", children: "Home" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "/" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/blog", className: "hover:text-primary transition-smooth", children: "Blog" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "/" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium truncate max-w-[200px]", children: post.title })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.article,
        {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5 },
          "data-ocid": "blog_post.article",
          children: [
            post.tags.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 mb-4", children: post.tags.map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Badge,
              {
                className: "bg-primary/8 text-primary border-none text-xs font-medium",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "w-3 h-3 mr-1" }),
                  tag
                ]
              },
              tag
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl sm:text-3xl md:text-4xl font-bold text-foreground font-display mb-4 leading-tight", children: post.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 text-sm text-muted-foreground mb-8 pb-6 border-b border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-4 h-4 text-primary" }),
                date
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4 text-primary" }),
                readTime,
                " min read"
              ] })
            ] }),
            post.excerpt && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base sm:text-lg text-muted-foreground leading-relaxed mb-6 italic border-l-4 border-primary/40 pl-4", children: post.excerpt }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "prose prose-sm sm:prose max-w-none text-foreground leading-relaxed space-y-4",
                "data-ocid": "blog_post.content",
                children: post.content.split(/\n\n+/).map((para) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-sm sm:text-base text-foreground leading-relaxed",
                    children: para.trim()
                  },
                  para.slice(0, 50)
                ))
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  asChild: true,
                  variant: "outline",
                  className: "gap-2",
                  "data-ocid": "blog_post.back_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/blog", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
                    "Back to Blog"
                  ] })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, className: "gap-2", "data-ocid": "blog_post.shop_button", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", children: "Explore Our Products" }) })
            ] })
          ]
        }
      )
    ] })
  ] });
}
export {
  BlogPostPage as default
};
