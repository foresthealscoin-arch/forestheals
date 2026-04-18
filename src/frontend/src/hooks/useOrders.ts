import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { CreateOrderInput, Order } from "../types";

// Placeholder orders store since backend is not yet integrated
const ORDERS_KEY = "forestheals-orders";

function getLocalOrders(): Order[] {
  try {
    const stored = localStorage.getItem(ORDERS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveLocalOrders(orders: Order[]) {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}

export function useUserOrders() {
  return useQuery<Order[]>({
    queryKey: ["user-orders"],
    queryFn: async () => getLocalOrders(),
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
  return useMutation({
    mutationFn: async (input: CreateOrderInput): Promise<Order> => {
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
      qc.invalidateQueries({ queryKey: ["user-orders"] });
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
