import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";
import { motion } from "motion/react";
import { createActor } from "../backend";
import type { BlogPost } from "../types";

function useBlogPost(slug: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<BlogPost | null>({
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
        createdAt: Number(found.createdAt) / 1_000_000,
        updatedAt: Number(found.updatedAt) / 1_000_000,
        publishDate: found.publishDate
          ? Number(found.publishDate) / 1_000_000
          : undefined,
      };
    },
    enabled: !!slug && !!actor && !isFetching,
    staleTime: 2 * 60 * 1000,
    retry: 2,
  });
}

export default function BlogPostPage() {
  const { slug } = useParams({ from: "/blog/$slug" });
  const { data: post, isLoading } = useBlogPost(slug);

  const date = post?.publishDate
    ? new Date(post.publishDate).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : post
      ? new Date(post.createdAt).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      : "";

  const readTime = post
    ? Math.max(1, Math.ceil(post.content.split(/\s+/).length / 200))
    : 0;

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        <Skeleton className="h-64 w-full rounded-2xl mb-8" />
        <Skeleton className="h-8 w-3/4 mb-3" />
        <Skeleton className="h-4 w-48 mb-8" />
        <div className="space-y-3">
          {Array.from({ length: 8 }, (_, i) => `skel-${i}`).map((k) => (
            <Skeleton key={k} className="h-4 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div
        className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center"
        data-ocid="blog_post.error_state"
      >
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">📄</span>
        </div>
        <h2 className="text-xl font-semibold text-foreground mb-2">
          Post not found
        </h2>
        <p className="text-sm text-muted-foreground mb-6 max-w-sm">
          This blog post may have been moved or unpublished.
        </p>
        <Button asChild variant="outline">
          <Link to="/blog">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background" data-ocid="blog_post.page">
      {/* Featured image */}
      {post.featuredImage && (
        <div className="w-full h-64 sm:h-80 md:h-96 overflow-hidden bg-muted">
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        </div>
      )}

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm text-muted-foreground mb-8">
          <Link to="/" className="hover:text-primary transition-smooth">
            Home
          </Link>
          <span>/</span>
          <Link to="/blog" className="hover:text-primary transition-smooth">
            Blog
          </Link>
          <span>/</span>
          <span className="text-foreground font-medium truncate max-w-[200px]">
            {post.title}
          </span>
        </nav>

        <motion.article
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          data-ocid="blog_post.article"
        >
          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <Badge
                  key={tag}
                  className="bg-primary/8 text-primary border-none text-xs font-medium"
                >
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground font-display mb-4 leading-tight">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8 pb-6 border-b border-border">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-primary" />
              {date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-primary" />
              {readTime} min read
            </span>
          </div>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-6 italic border-l-4 border-primary/40 pl-4">
              {post.excerpt}
            </p>
          )}

          {/* Content — rendered as plain text with paragraph breaks */}
          <div
            className="prose prose-sm sm:prose max-w-none text-foreground leading-relaxed space-y-4"
            data-ocid="blog_post.content"
          >
            {post.content.split(/\n\n+/).map((para) => (
              <p
                key={para.slice(0, 50)}
                className="text-sm sm:text-base text-foreground leading-relaxed"
              >
                {para.trim()}
              </p>
            ))}
          </div>

          {/* Back CTA */}
          <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <Button
              asChild
              variant="outline"
              className="gap-2"
              data-ocid="blog_post.back_button"
            >
              <Link to="/blog">
                <ArrowLeft className="w-4 h-4" />
                Back to Blog
              </Link>
            </Button>
            <Button asChild className="gap-2" data-ocid="blog_post.shop_button">
              <Link to="/products">Explore Our Products</Link>
            </Button>
          </div>
        </motion.article>
      </div>
    </div>
  );
}
