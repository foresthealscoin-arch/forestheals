import type { backendInterface } from "../backend";
import { OrderStatus, PaymentMethod } from "../backend";
import type { Order } from "../backend.d";
import { toNumber } from "../utils/convert";

export interface OrderView {
  id: number;
  userId: string;
  status: string;
  paymentMethod: string;
  totalAmount: number;
  discountAmount: number;
  couponCode?: string;
  stripePaymentId?: string;
  notes?: string;
  createdAt: number;
  address: {
    fullName: string;
    phone: string;
    line1: string;
    line2?: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
  items: Array<{
    productId: number;
    quantity: number;
    price: number;
    productType?: string;
  }>;
}

export function mapBackendStatus(status: OrderStatus): string {
  const map: Record<string, string> = {
    [OrderStatus.pending]: "pending",
    [OrderStatus.confirmed]: "confirmed",
    [OrderStatus.processing]: "processing",
    [OrderStatus.shipped]: "shipped",
    [OrderStatus.completed]: "completed",
    [OrderStatus.cancelled]: "cancelled",
  };
  return map[String(status)] ?? "pending";
}

export function mapOrder(raw: Order): OrderView {
  return {
    id: toNumber(raw.id),
    userId: raw.userId.toText(),
    status: mapBackendStatus(raw.status),
    paymentMethod:
      String(raw.paymentMethod) === PaymentMethod.stripe ? "stripe" : "cod",
    totalAmount: toNumber(raw.totalAmount),
    discountAmount: toNumber(raw.discountAmount),
    couponCode: raw.couponCode,
    stripePaymentId: raw.stripePaymentId,
    notes: raw.notes,
    createdAt: Number(raw.createdAt) / 1_000_000,
    address: {
      fullName: raw.address.fullName,
      phone: raw.address.phone,
      line1: raw.address.line1,
      line2: raw.address.line2 ?? undefined,
      city: raw.address.city,
      state: raw.address.state,
      pincode: raw.address.pincode,
      country: raw.address.country,
    },
    items: raw.items.map((i) => ({
      productId: toNumber(i.productId),
      quantity: toNumber(i.quantity),
      price: toNumber(i.price),
      productType: i.productType,
    })),
  };
}

export function mapToBackendStatus(status: string): OrderStatus {
  const map: Record<string, OrderStatus> = {
    pending: OrderStatus.pending,
    confirmed: OrderStatus.confirmed,
    processing: OrderStatus.processing,
    shipped: OrderStatus.shipped,
    completed: OrderStatus.completed,
    cancelled: OrderStatus.cancelled,
  };
  return map[status] ?? OrderStatus.pending;
}

export async function listAllOrders(
  actor: backendInterface,
): Promise<OrderView[]> {
  const raw = await actor.listAllOrders();
  return raw.map(mapOrder).sort((a, b) => b.createdAt - a.createdAt);
}

export async function updateOrderStatus(
  actor: backendInterface,
  id: number,
  status: string,
): Promise<boolean> {
  return actor.updateOrderStatus(BigInt(id), mapToBackendStatus(status));
}

export async function updateOrderNotes(
  actor: backendInterface,
  id: number,
  notes: string | null,
): Promise<boolean> {
  return actor.updateOrderNotes(BigInt(id), notes);
}
