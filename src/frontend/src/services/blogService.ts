import type { backendInterface } from "../backend";
import type { BlogPost } from "../backend.d";
import { toNumber } from "../utils/convert";

export interface BlogPostView {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage: string;
  metaTitle: string;
  metaDescription: string;
  tags: string[];
  status: string;
  createdAt: number;
  updatedAt: number;
  publishDate?: number;
}

export function mapBlogPost(raw: BlogPost): BlogPostView {
  return {
    id: raw.id,
    title: raw.title,
    slug: raw.slug,
    content: raw.content,
    excerpt: raw.excerpt,
    featuredImage: raw.featuredImage,
    metaTitle: raw.metaTitle,
    metaDescription: raw.metaDescription,
    tags: raw.tags,
    status: raw.status,
    createdAt: toNumber(raw.createdAt) / 1_000_000,
    updatedAt: toNumber(raw.updatedAt) / 1_000_000,
    publishDate: raw.publishDate
      ? toNumber(raw.publishDate) / 1_000_000
      : undefined,
  };
}

export function mapToBackendPost(view: BlogPostView): BlogPost {
  return {
    id: view.id,
    title: view.title,
    slug: view.slug,
    content: view.content,
    excerpt: view.excerpt,
    featuredImage: view.featuredImage,
    metaTitle: view.metaTitle,
    metaDescription: view.metaDescription,
    tags: view.tags,
    status: view.status,
    createdAt: BigInt(Math.round(view.createdAt * 1_000_000)),
    updatedAt: BigInt(Math.round(view.updatedAt * 1_000_000)),
    publishDate: view.publishDate
      ? BigInt(Math.round(view.publishDate * 1_000_000))
      : undefined,
  };
}

export async function getBlogPosts(
  actor: backendInterface,
): Promise<BlogPostView[]> {
  const raw = await actor.getAllBlogPosts();
  return raw.map(mapBlogPost).sort((a, b) => b.createdAt - a.createdAt);
}

export async function createBlogPost(
  actor: backendInterface,
  post: BlogPostView,
): Promise<BlogPostView> {
  const raw = await actor.createBlogPost(mapToBackendPost(post));
  return mapBlogPost(raw);
}

export async function updateBlogPost(
  actor: backendInterface,
  id: string,
  post: BlogPostView,
): Promise<BlogPostView | null> {
  const raw = await actor.updateBlogPost(id, mapToBackendPost(post));
  return raw ? mapBlogPost(raw) : null;
}

export async function deleteBlogPost(
  actor: backendInterface,
  id: string,
): Promise<boolean> {
  return actor.deleteBlogPost(id);
}

export async function publishBlogPost(
  actor: backendInterface,
  id: string,
): Promise<boolean> {
  return actor.publishBlogPost(id);
}
