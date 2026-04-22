import type { backendInterface } from "../backend";
import type { AdminCoupon } from "../backend.d";
import { toNumber } from "../utils/convert";

export interface AdminCouponView {
  id: string;
  code: string;
  discountType: string;
  discountValue: number;
  minCartValue: number;
  maxUses: number;
  usedCount: number;
  active: boolean;
  description: string;
  createdAt: number;
  expiresAt?: number;
}

export function mapAdminCoupon(raw: AdminCoupon): AdminCouponView {
  return {
    id: raw.id,
    code: raw.code,
    discountType: raw.discountType,
    discountValue: toNumber(raw.discountValue),
    minCartValue: toNumber(raw.minCartValue),
    maxUses: toNumber(raw.maxUses),
    usedCount: toNumber(raw.usedCount),
    active: raw.active,
    description: raw.description,
    createdAt: Number(raw.createdAt) / 1_000_000,
    expiresAt: raw.expiresAt ? Number(raw.expiresAt) / 1_000_000 : undefined,
  };
}

export function mapToBackendCoupon(view: AdminCouponView): AdminCoupon {
  return {
    id: view.id,
    code: view.code,
    discountType: view.discountType,
    discountValue: BigInt(view.discountValue),
    minCartValue: BigInt(view.minCartValue),
    maxUses: BigInt(view.maxUses),
    usedCount: BigInt(view.usedCount),
    active: view.active,
    description: view.description,
    createdAt: BigInt(Math.round(view.createdAt * 1_000_000)),
    expiresAt: view.expiresAt
      ? BigInt(Math.round(view.expiresAt * 1_000_000))
      : undefined,
  };
}

export async function getAdminCoupons(
  actor: backendInterface,
): Promise<AdminCouponView[]> {
  const raw = await actor.getAdminCoupons();
  return raw.map(mapAdminCoupon);
}

export async function createAdminCoupon(
  actor: backendInterface,
  coupon: AdminCouponView,
): Promise<AdminCouponView> {
  const raw = await actor.createAdminCoupon(mapToBackendCoupon(coupon));
  return mapAdminCoupon(raw);
}

export async function updateAdminCoupon(
  actor: backendInterface,
  id: string,
  coupon: AdminCouponView,
): Promise<AdminCouponView | null> {
  const raw = await actor.updateAdminCoupon(id, mapToBackendCoupon(coupon));
  return raw ? mapAdminCoupon(raw) : null;
}

export async function deleteAdminCoupon(
  actor: backendInterface,
  id: string,
): Promise<boolean> {
  return actor.deleteAdminCoupon(id);
}

export async function toggleCouponActive(
  actor: backendInterface,
  id: string,
): Promise<boolean> {
  return actor.toggleCouponActive(id);
}
