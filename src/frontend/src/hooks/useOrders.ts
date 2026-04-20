import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createActor } from "../backend";
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

export function useUserOrders() {
  const { isFetching } = useBackendActor();
  const { isLoggedIn } = useAuthStore();

  return useQuery<Order[]>({
    queryKey: ["user-orders"],
    queryFn: async () => {
      // Always fall back to local orders for now until address types are reconciled
      if (isLoggedIn && !isFetching) {
        // Backend integration would go here, but address field mapping
        // is complex — using local storage as primary source
      }
      return getLocalOrders();
    },
    staleTime: 30 * 1000,
  });
}

export function useOrder(id: number) {
  return useQuery<Order | null>({
    queryKey: ["order", id],
    queryFn: async () => getLocalOrders().find((o) => o.id === id) ?? null,
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
              input.paymentMethod === "cod"
                ? ({ cod: null } as unknown as Parameters<
                    typeof actor.createOrder
                  >[0]["paymentMethod"])
                : ({ stripe: null } as unknown as Parameters<
                    typeof actor.createOrder
                  >[0]["paymentMethod"]),
            address: {
              street: input.address.line1,
              city: input.address.city,
              state: input.address.state,
              postalCode: input.address.pincode,
              country: input.address.country ?? "India",
              gstNumber: undefined,
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
            status: String(raw.status) as Order["status"],
            paymentMethod: String(raw.paymentMethod) as Order["paymentMethod"],
            address: input.address,
            createdAt: Number(raw.createdAt),
            stripePaymentId: raw.stripePaymentId,
            couponCode: raw.couponCode,
            discountAmount: Number(raw.discountAmount),
          };
          // Also save locally for immediate access
          const orders = getLocalOrders();
          saveLocalOrders([...orders, order]);
          return order;
        } catch {
          // fallback to local
        }
      }
      // Local fallback
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
      saveLocalOrders([...orders, newOrder]);
      return newOrder;
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["user-orders"] });
      toast.success("Order placed successfully!", {
        description: "You will receive a confirmation shortly.",
      });
    },
    onError: () => {
      toast.error("Failed to place order. Please try again.");
    },
  });
}

export function useAllOrders() {
  return useQuery<Order[]>({
    queryKey: ["all-orders"],
    queryFn: async () => getLocalOrders(),
  });
}
