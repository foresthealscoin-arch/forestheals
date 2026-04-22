import { j as jsxRuntimeExports, m as motion, u as useActor, q as useQuery, L as Link, B as Badge, f as createActor } from "./index-CfU2kVIJ.js";
import { S as Skeleton } from "./skeleton-Dbe_tSkr.js";
import { T as Tag } from "./tag-RoRywvnF.js";
import { C as Calendar } from "./calendar-DFAbWjKt.js";
import { C as Clock } from "./clock-DXcQvN8f.js";
function useBlogPosts() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["blog-posts"],
    queryFn: async () => {
      if (!actor || isFetching) return [];
      const raw = await actor.getBlogPosts();
      return raw.map((p) => ({
        id: p.id,
        title: p.title,
        slug: p.slug,
        excerpt: p.excerpt,
        content: p.content,
        featuredImage: p.featuredImage,
        tags: p.tags,
        metaTitle: p.metaTitle,
        metaDescription: p.metaDescription,
        status: p.status,
        createdAt: Number(p.createdAt) / 1e6,
        updatedAt: Number(p.updatedAt) / 1e6,
        publishDate: p.publishDate ? Number(p.publishDate) / 1e6 : void 0
      }));
    },
    enabled: !!actor && !isFetching,
    staleTime: 2 * 60 * 1e3,
    retry: 2
  });
}
function BlogCard({ post, index }) {
  const date = post.publishDate ? new Date(post.publishDate).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }) : new Date(post.createdAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
  const readTime = Math.max(
    1,
    Math.ceil(post.content.split(/\s+/).length / 200)
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.article,
    {
      initial: { opacity: 0, y: 20 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 0.4, delay: index * 0.08 },
      className: "group glass-card rounded-2xl overflow-hidden shadow-soft hover:shadow-elevated transition-smooth hover:-translate-y-1",
      "data-ocid": `blog.post.${index + 1}.card`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/blog/$slug", params: { slug: post.slug }, children: [
        post.featuredImage && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden h-48", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: post.featuredImage,
            alt: post.title,
            loading: "lazy",
            className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500",
            onError: (e) => {
              e.currentTarget.style.display = "none";
            }
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5", children: [
          post.tags.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5 mb-3", children: post.tags.slice(0, 3).map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Badge,
            {
              className: "bg-primary/8 text-primary border-none text-xs font-medium px-2 py-0.5",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "w-2.5 h-2.5 mr-1" }),
                tag
              ]
            },
            tag
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors leading-snug", children: post.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4", children: post.excerpt || post.content.slice(0, 150) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-xs text-muted-foreground pt-3 border-t border-border/60", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3 h-3" }),
              date
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
              readTime,
              " min read"
            ] })
          ] })
        ] })
      ] })
    }
  );
}
function BlogPage() {
  const { data: posts = [], isLoading } = useBlogPosts();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", "data-ocid": "blog.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border/50 py-12 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-4xl mx-auto text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: -12 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary text-sm font-semibold tracking-widest uppercase mb-3", children: "Wellness Wisdom" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl sm:text-4xl md:text-5xl font-bold text-foreground font-display mb-4", children: "Ayurvedic Insights & Stories" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-1 bg-primary rounded-full mx-auto mb-5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-xl mx-auto text-sm sm:text-base leading-relaxed", children: "Ancient wisdom meets modern wellness. Explore our guides on Ayurvedic herbs, natural remedies, and holistic living." })
        ]
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-6xl mx-auto px-4 py-12", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6", children: Array.from({ length: 6 }, (_, i) => `skel-${i}`).map((k) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card rounded-2xl overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-48 w-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-20" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-3/4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" })
      ] })
    ] }, k)) }) : posts.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "text-center py-24 text-muted-foreground",
        "data-ocid": "blog.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: "📝" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-foreground mb-2", children: "No blog posts yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm max-w-sm mx-auto", children: "Check back soon — our wellness team is crafting valuable Ayurvedic content for you." })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",
        "data-ocid": "blog.list",
        children: posts.map((post, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(BlogCard, { post, index: i }, post.id))
      }
    ) })
  ] });
}
export {
  BlogPage as default
};
