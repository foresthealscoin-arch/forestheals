import type { backendInterface } from "../backend";
import type { Review } from "../backend.d";
import { toNumber } from "../utils/convert";

export interface ReviewView {
  id: number;
  productId: number;
  userId: string;
  rating: number;
  text: string;
  approved: boolean;
  verified: boolean;
  createdAt: number;
}

export function mapReview(raw: Review): ReviewView {
  return {
    id: toNumber(raw.id),
    productId: toNumber(raw.productId),
    userId: raw.userId.toText(),
    rating: toNumber(raw.rating),
    text: raw.text,
    approved: raw.approved,
    verified: raw.verified,
    createdAt: Number(raw.createdAt) / 1_000_000,
  };
}

export async function listAllReviews(
  actor: backendInterface,
): Promise<ReviewView[]> {
  const raw = await actor.getAllReviews();
  return raw.map(mapReview).sort((a, b) => b.createdAt - a.createdAt);
}

export async function approveReview(
  actor: backendInterface,
  id: number,
): Promise<boolean> {
  return actor.approveReview(BigInt(id));
}

export async function rejectReview(
  actor: backendInterface,
  id: number,
): Promise<boolean> {
  return actor.rejectReview(BigInt(id));
}
