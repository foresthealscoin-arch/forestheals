import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { OrderStatus, PaymentMethod, createActor } from "../backend";
import { useAuthStore } from "../stores/useAuthStore";
import type { CreateOrderInput, Order } from "../types";

function useBackendActor() {
  return useActor(createActor);
}

function mapBackendStatus(status: OrderStatus): Order["status"] {
  const map: Record<string, Order["status"]> = {
    [OrderStatus.pending]: "pending",
    [OrderStatus.confirmed]: "confirmed",
    [OrderStatus.processing]: "processing",
    [OrderStatus.shipped]: "shipped",
    [OrderStatus.completed]: "completed",
    [OrderStatus.cancelled]: "cancelled",
  };
  return map[String(status)] ?? "pending";
}

// Map the raw backend status string for detailed display (order detail page)
export function mapOrderStatusLabel(status: string): string {
  const map: Record<string, string> = {
    pending: "Pending",
    confirmed: "Confirmed",
    processing: "Processing",
    shipped: "Shipped",
    completed: "Completed",
    cancelled: "Cancelled",
    delivered: "Delivered",
  };
  return map[status.toLowerCase()] ?? status;
}

function mapBackendOrder(o: {
  id: bigint;
  userId: { toText: () => string };
  items: Array<{
    productId: bigint;
    quantity: bigint;
    price: bigint;
    productType?: string;
  }>;
  totalAmount: bigint;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  address: {
    fullName: string;
    phone: string;
    line1: string;
    line2?: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
    gstNumber?: string;
  };
  createdAt: bigint;
  stripePaymentId?: string;
  couponCode?: string;
  discountAmount: bigint;
}): Order {
  return {
    id: Number(o.id),
    userId: o.userId.toText(),
    items: o.items.map((i) => ({
      productId: Number(i.productId),
      quantity: Number(i.quantity),
      price: Number(i.price),
    })),
    totalAmount: Number(o.totalAmount),
    status: mapBackendStatus(o.status),
    paymentMethod:
      String(o.paymentMethod) === String(PaymentMethod.stripe)
        ? "stripe"
        : "cod",
    address: {
      fullName: o.address.fullName,
      phone: o.address.phone,
      line1: o.address.line1,
      line2: o.address.line2 ?? undefined,
      city: o.address.city,
      state: o.address.state,
      pincode: o.address.pincode,
      country: o.address.country ?? "India",
      gstNumber: o.address.gstNumber ?? undefined,
    },
    createdAt: Number(o.createdAt) / 1_000_000,
    stripePaymentId: o.stripePaymentId,
    couponCode: o.couponCode,
    discountAmount: Number(o.discountAmount),
  };
}

export function useUserOrders() {
  const { actor, isFetching } = useBackendActor();
  const { isLoggedIn } = useAuthStore();

  return useQuery<Order[]>({
    queryKey: ["user-orders"],
    queryFn: async () => {
      if (!actor || isFetching || !isLoggedIn) return [];
      // Use listUserOrders (the correct backend endpoint)
      const raw = await actor.listUserOrders();
      return raw.map(mapBackendOrder).sort((a, b) => b.createdAt - a.createdAt);
    },
    staleTime: 30 * 1000,
    refetchOnWindowFocus: true,
    retry: 2,
    enabled: !!actor && !isFetching && isLoggedIn,
  });
}

// Alias for dispatch contract compatibility
export { useUserOrders as useListUserOrders };

export function useOrder(id: number) {
  const { actor, isFetching } = useBackendActor();

  return useQuery<Order | null>({
    queryKey: ["order", id],
    queryFn: async () => {
      if (!actor || !id) return null;
      try {
        const raw = await actor.getOrder(BigInt(id));
        if (!raw) return null;
        return mapBackendOrder(raw);
      } catch {
        return null;
      }
    },
    enabled: id > 0 && !!actor && !isFetching,
    retry: 2,
    staleTime: 30 * 1000,
  });
}

// Alias for dispatch contract compatibility
export { useOrder as useGetOrder };

export function useCreateOrder() {
  const qc = useQueryClient();
  const { actor, isFetching } = useBackendActor();
  const { isLoggedIn } = useAuthStore();

  return useMutation({
    mutationFn: async (input: CreateOrderInput): Promise<Order> => {
      if (!actor || isFetching) {
        throw new Error("Backend is not available. Please try again.");
      }
      if (!isLoggedIn) {
        throw new Error("You must be signed in to place an order.");
      }
      if (!input.address.fullName?.trim()) {
        throw new Error("Delivery address is required.");
      }
      if (input.items.length === 0) {
        throw new Error("Your cart is empty.");
      }

      // Use placeOrder (the correct backend endpoint per learnings)
      const raw = await actor.placeOrder({
        items: input.items.map((i) => ({
          productId: BigInt(i.productId),
          quantity: BigInt(i.quantity),
          price: BigInt(i.price),
          productType: undefined,
        })),
        paymentMethod:
          input.paymentMethod === "stripe"
            ? PaymentMethod.stripe
            : PaymentMethod.cod,
        address: {
          fullName: input.address.fullName,
          phone: input.address.phone,
          line1: input.address.line1,
          line2: input.address.line2,
          city: input.address.city,
          state: input.address.state,
          pincode: input.address.pincode,
          country: input.address.country ?? "India",
          gstNumber: input.address.gstNumber,
        },
        couponCode: input.couponCode,
        stripePaymentId: input.stripePaymentId,
        userId: undefined,
        addressId: undefined,
        notes: undefined,
      });

      return mapBackendOrder(raw);
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["user-orders"] });
      void qc.invalidateQueries({ queryKey: ["all-orders"] });
      void qc.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (err: Error) => {
      console.error("Order mutation error:", err);
      const msg = err?.message ?? "Failed to place order. Please try again.";
      toast.error(msg);
    },
  });
}

export function useAllOrders() {
  const { actor, isFetching } = useBackendActor();

  return useQuery<Order[]>({
    queryKey: ["all-orders"],
    queryFn: async () => {
      if (!actor || isFetching) return [];
      const raw = await actor.listAllOrders();
      return raw.map(mapBackendOrder).sort((a, b) => b.createdAt - a.createdAt);
    },
    staleTime: 15 * 1000,
    refetchInterval: 30 * 1000,
    retry: 2,
  });
}
