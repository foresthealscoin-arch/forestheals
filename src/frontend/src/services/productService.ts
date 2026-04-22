import type { backendInterface } from "../backend";
import { ProductStatus as BackendProductStatus } from "../backend";
import type { Product as BackendProduct } from "../backend.d";
import { toNumber } from "../utils/convert";

export interface ProductView {
  id: number;
  name: string;
  description: string;
  price: number;
  comparePrice?: number;
  category: string;
  imageUrl: string;
  imageKey: string;
  images: string[];
  stock: number;
  ratings: number;
  reviewCount: number;
  featured: boolean;
  bestseller: boolean;
  discount: number;
  bundleIds: number[];
  status: "active" | "inactive" | "draft";
}

function parseStatus(
  raw: BackendProduct["status"],
): "active" | "inactive" | "draft" {
  const s = String(raw ?? "active");
  if (s === "inactive") return "inactive";
  if (s === "draft") return "draft";
  return "active";
}

function toBackendStatus(status: string): BackendProductStatus {
  const map: Record<string, BackendProductStatus> = {
    active: BackendProductStatus.active,
    inactive: BackendProductStatus.inactive,
    draft: BackendProductStatus.draft,
  };
  return map[status] ?? BackendProductStatus.active;
}

export function mapProduct(raw: BackendProduct): ProductView {
  return {
    id: toNumber(raw.id),
    name: raw.name,
    description: raw.description,
    price: toNumber(raw.price),
    comparePrice:
      raw.comparePrice != null ? toNumber(raw.comparePrice) : undefined,
    category: raw.category,
    imageUrl: raw.imageUrl,
    imageKey: raw.imageKey,
    images: raw.images ?? [],
    stock: toNumber(raw.stock),
    ratings: raw.ratings,
    reviewCount: toNumber(raw.reviewCount),
    featured: raw.featured,
    bestseller: raw.bestseller,
    discount: toNumber(raw.discount),
    bundleIds: raw.bundleIds.map(toNumber),
    status: parseStatus(raw.status),
  };
}

export async function listProducts(
  actor: backendInterface,
): Promise<ProductView[]> {
  const raw = await actor.adminListProducts();
  return raw.map(mapProduct);
}

export async function listPublicProducts(
  actor: backendInterface,
  filter?: { category?: string; featured?: boolean },
): Promise<ProductView[]> {
  const raw = await actor.listProducts({
    category: filter?.category,
    featured: filter?.featured,
  });
  return raw.map(mapProduct);
}

export async function createProduct(
  actor: backendInterface,
  input: Omit<ProductView, "id" | "ratings" | "reviewCount">,
): Promise<ProductView> {
  const raw = await actor.createProduct({
    name: input.name,
    description: input.description,
    price: BigInt(input.price),
    comparePrice:
      input.comparePrice != null ? BigInt(input.comparePrice) : undefined,
    category: input.category,
    imageUrl: input.imageUrl,
    imageKey: input.imageKey,
    images: input.images ?? [],
    stock: BigInt(input.stock),
    featured: input.featured,
    bestseller: input.bestseller,
    discount: BigInt(input.discount),
    bundleIds: input.bundleIds.map(BigInt),
    status: toBackendStatus(input.status),
  });
  return mapProduct(raw);
}

export async function updateProduct(
  actor: backendInterface,
  id: number,
  input: Omit<ProductView, "id" | "ratings" | "reviewCount">,
): Promise<boolean> {
  return actor.updateProduct(BigInt(id), {
    name: input.name,
    description: input.description,
    price: BigInt(input.price),
    comparePrice:
      input.comparePrice != null ? BigInt(input.comparePrice) : undefined,
    category: input.category,
    imageUrl: input.imageUrl,
    imageKey: input.imageKey,
    images: input.images ?? [],
    stock: BigInt(input.stock),
    featured: input.featured,
    bestseller: input.bestseller,
    discount: BigInt(input.discount),
    bundleIds: input.bundleIds.map(BigInt),
    status: toBackendStatus(input.status),
  });
}

export async function deleteProduct(
  actor: backendInterface,
  id: number,
): Promise<boolean> {
  return actor.deleteProduct(BigInt(id));
}
