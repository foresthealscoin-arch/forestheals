import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { Calendar, Clock, Tag } from "lucide-react";
import { motion } from "motion/react";
import { createActor } from "../backend";
import type { BlogPost } from "../types";

function useBlogPosts() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<BlogPost[]>({
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
        createdAt: Number(p.createdAt) / 1_000_000,
        updatedAt: Number(p.updatedAt) / 1_000_000,
        publishDate: p.publishDate
          ? Number(p.publishDate) / 1_000_000
          : undefined,
      }));
    },
    enabled: !!actor && !isFetching,
    staleTime: 2 * 60 * 1000,
    retry: 2,
  });
}

function BlogCard({ post, index }: { post: BlogPost; index: number }) {
  const date = post.publishDate
    ? new Date(post.publishDate).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : new Date(post.createdAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });

  const readTime = Math.max(
    1,
    Math.ceil(post.content.split(/\s+/).length / 200),
  );

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="group glass-card rounded-2xl overflow-hidden shadow-soft hover:shadow-elevated transition-smooth hover:-translate-y-1"
      data-ocid={`blog.post.${index + 1}.card`}
    >
      <Link to="/blog/$slug" params={{ slug: post.slug }}>
        {/* Featured image */}
        {post.featuredImage && (
          <div className="overflow-hidden h-48">
            <img
              src={post.featuredImage}
              alt={post.title}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>
        )}

        <div className="p-5">
          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {post.tags.slice(0, 3).map((tag) => (
                <Badge
                  key={tag}
                  className="bg-primary/8 text-primary border-none text-xs font-medium px-2 py-0.5"
                >
                  <Tag className="w-2.5 h-2.5 mr-1" />
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          <h2 className="text-base font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors leading-snug">
            {post.title}
          </h2>

          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4">
            {post.excerpt || post.content.slice(0, 150)}
          </p>

          <div className="flex items-center gap-3 text-xs text-muted-foreground pt-3 border-t border-border/60">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {readTime} min read
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export default function BlogPage() {
  const { data: posts = [], isLoading } = useBlogPosts();

  return (
    <div className="min-h-screen bg-background" data-ocid="blog.page">
      {/* Hero */}
      <div className="bg-card border-b border-border/50 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">
              Wellness Wisdom
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground font-display mb-4">
              Ayurvedic Insights & Stories
            </h1>
            <div className="w-16 h-1 bg-primary rounded-full mx-auto mb-5" />
            <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
              Ancient wisdom meets modern wellness. Explore our guides on
              Ayurvedic herbs, natural remedies, and holistic living.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }, (_, i) => `skel-${i}`).map((k) => (
              <div key={k} className="glass-card rounded-2xl overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <div className="p-5 space-y-3">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div
            className="text-center py-24 text-muted-foreground"
            data-ocid="blog.empty_state"
          >
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📝</span>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No blog posts yet
            </h3>
            <p className="text-sm max-w-sm mx-auto">
              Check back soon — our wellness team is crafting valuable Ayurvedic
              content for you.
            </p>
          </div>
        ) : (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            data-ocid="blog.list"
          >
            {posts.map((post, i) => (
              <BlogCard key={post.id} post={post} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
