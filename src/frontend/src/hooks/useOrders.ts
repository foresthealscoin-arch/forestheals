import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { OrderStatus, PaymentMethod, createActor } from "../backend";
import { useAuthStore } from "../stores/useAuthStore";
import type { CreateOrderInput, Order } from "../types";

function useBackendActor() {
  return useActor(createActor);
}

const ORDERS_KEY = "forestheals-orders";

function getLocalOrders(): Order[] {
  try {
    const stored = localStorage.getItem(ORDERS_KEY);
    return stored ? (JSON.parse(stored) as Order[]) : [];
  } catch {
    return [];
  }
}

function saveLocalOrders(orders: Order[]) {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}

function mapBackendStatus(status: OrderStatus): Order["status"] {
  const map: Record<string, Order["status"]> = {
    [OrderStatus.pending]: "pending",
    [OrderStatus.processing]: "confirmed",
    [OrderStatus.shipped]: "shipped",
    [OrderStatus.delivered]: "delivered",
    [OrderStatus.cancelled]: "cancelled",
  };
  return map[String(status)] ?? "pending";
}

export function useUserOrders() {
  const { actor, isFetching } = useBackendActor();
  const { isLoggedIn } = useAuthStore();

  return useQuery<Order[]>({
    queryKey: ["user-orders"],
    queryFn: async () => {
      // Try backend first for logged-in users
      if (actor && !isFetching && isLoggedIn) {
        try {
          const raw = await actor.listUserOrders();
          if (raw.length > 0) {
            const orders: Order[] = raw.map((o) => ({
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
                String(o.paymentMethod) === PaymentMethod.stripe
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
                country: o.address.country,
              },
              createdAt: Number(o.createdAt) / 1_000_000,
              stripePaymentId: o.stripePaymentId,
              couponCode: o.couponCode,
              discountAmount: Number(o.discountAmount),
            }));
            // Merge with local (local has richer address data)
            const local = getLocalOrders();
            const backendIds = new Set(orders.map((o) => o.id));
            const localOnly = local.filter((o) => !backendIds.has(o.id));
            return [...orders, ...localOnly].sort(
              (a, b) => b.createdAt - a.createdAt,
            );
          }
        } catch {
          // fall through to local
        }
      }
      return getLocalOrders().sort((a, b) => b.createdAt - a.createdAt);
    },
    staleTime: 30 * 1000,
  });
}

export function useOrder(id: number) {
  const { actor, isFetching } = useBackendActor();

  return useQuery<Order | null>({
    queryKey: ["order", id],
    queryFn: async () => {
      // Check local first (has richest address data)
      const local = getLocalOrders().find((o) => o.id === id);
      if (local) return local;

      // Try backend
      if (actor && !isFetching) {
        try {
          const raw = await actor.getOrder(BigInt(id));
          if (!raw) return null;
          return {
            id: Number(raw.id),
            userId: raw.userId.toText(),
            items: raw.items.map((i) => ({
              productId: Number(i.productId),
              quantity: Number(i.quantity),
              price: Number(i.price),
            })),
            totalAmount: Number(raw.totalAmount),
            status: mapBackendStatus(raw.status),
            paymentMethod:
              String(raw.paymentMethod) === PaymentMethod.stripe
                ? "stripe"
                : "cod",
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
            createdAt: Number(raw.createdAt) / 1_000_000,
            stripePaymentId: raw.stripePaymentId,
            couponCode: raw.couponCode,
            discountAmount: Number(raw.discountAmount),
          };
        } catch {
          return null;
        }
      }
      return null;
    },
    enabled: id > 0,
  });
}

export function useCreateOrder() {
  const qc = useQueryClient();
  const { actor, isFetching } = useBackendActor();
  const { isLoggedIn } = useAuthStore();

  return useMutation({
    mutationFn: async (input: CreateOrderInput): Promise<Order> => {
      if (actor && !isFetching && isLoggedIn) {
        try {
          const raw = await actor.createOrder({
            items: input.items.map((i) => ({
              productId: BigInt(i.productId),
              quantity: BigInt(i.quantity),
              price: BigInt(i.price),
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
          });
          const order: Order = {
            id: Number(raw.id),
            userId: raw.userId.toText(),
            items: raw.items.map((i) => ({
              productId: Number(i.productId),
              quantity: Number(i.quantity),
              price: Number(i.price),
            })),
            totalAmount: Number(raw.totalAmount),
            status: mapBackendStatus(raw.status),
            paymentMethod: input.paymentMethod,
            address: input.address, // keep original rich address data locally
            createdAt: Number(raw.createdAt) / 1_000_000,
            stripePaymentId: raw.stripePaymentId,
            couponCode: raw.couponCode,
            discountAmount: Number(raw.discountAmount),
          };
          // Save locally with full address for order detail page
          const orders = getLocalOrders();
          saveLocalOrders([order, ...orders]);
          return order;
        } catch (err) {
          // Log the error for debugging, then fall back to local
          console.error("Backend order creation failed:", err);
        }
      }

      // Local fallback — still works without backend
      const orders = getLocalOrders();
      const newOrder: Order = {
        id: Date.now(),
        userId: "local",
        items: input.items,
        totalAmount: input.totalAmount,
        status: "pending",
        paymentMethod: input.paymentMethod,
        address: input.address,
        createdAt: Date.now(),
        stripePaymentId: input.stripePaymentId,
        couponCode: input.couponCode,
        discountAmount: input.discountAmount,
      };
      saveLocalOrders([newOrder, ...orders]);
      return newOrder;
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["user-orders"] });
      void qc.invalidateQueries({ queryKey: ["all-orders"] });
    },
    onError: (err) => {
      console.error("Order mutation error:", err);
      toast.error("Failed to place order. Please try again.");
    },
  });
}

export function useAllOrders() {
  const { actor, isFetching } = useBackendActor();

  return useQuery<Order[]>({
    queryKey: ["all-orders"],
    queryFn: async () => {
      if (actor && !isFetching) {
        try {
          const raw = await actor.listAllOrders();
          const backendOrders: Order[] = raw.map((o) => ({
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
              String(o.paymentMethod) === PaymentMethod.stripe
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
              country: o.address.country,
            },
            createdAt: Number(o.createdAt) / 1_000_000,
            stripePaymentId: o.stripePaymentId,
            couponCode: o.couponCode,
            discountAmount: Number(o.discountAmount),
          }));

          // Merge with local orders (local has richer address data)
          const local = getLocalOrders();
          const backendIds = new Set(backendOrders.map((o) => o.id));
          // For orders that exist in both, prefer local (has full address)
          const merged = [
            ...local,
            ...backendOrders.filter(
              (o) => !backendIds.has(o.id) || !local.find((l) => l.id === o.id),
            ),
          ];
          // De-duplicate by id, prefer local
          const seen = new Set<number>();
          const deduped: Order[] = [];
          for (const o of merged) {
            if (!seen.has(o.id)) {
              seen.add(o.id);
              deduped.push(o);
            }
          }
          return deduped.sort((a, b) => b.createdAt - a.createdAt);
        } catch (err) {
          console.error("Failed to fetch all orders from backend:", err);
        }
      }
      return getLocalOrders().sort((a, b) => b.createdAt - a.createdAt);
    },
    staleTime: 15 * 1000,
    refetchInterval: 30 * 1000,
  });
}
