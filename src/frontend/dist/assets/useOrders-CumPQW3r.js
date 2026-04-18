import { u as useQuery } from "./useQuery-BNvAOOwo.js";
import { v as useQueryClient, u as ue } from "./index-BTLW_NIC.js";
import { u as useMutation } from "./useMutation-Cg-O1UYS.js";
const ORDERS_KEY = "forestheals-orders";
function getLocalOrders() {
  try {
    const stored = localStorage.getItem(ORDERS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}
function saveLocalOrders(orders) {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}
function useUserOrders() {
  return useQuery({
    queryKey: ["user-orders"],
    queryFn: async () => getLocalOrders(),
    staleTime: 30 * 1e3
  });
}
function useOrder(id) {
  return useQuery({
    queryKey: ["order", id],
    queryFn: async () => getLocalOrders().find((o) => o.id === id) ?? null,
    enabled: id > 0
  });
}
function useCreateOrder() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input) => {
      const orders = getLocalOrders();
      const newOrder = {
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
        discountAmount: input.discountAmount
      };
      saveLocalOrders([...orders, newOrder]);
      return newOrder;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["user-orders"] });
      ue.success("Order placed successfully!", {
        description: "You will receive a confirmation shortly."
      });
    },
    onError: () => {
      ue.error("Failed to place order. Please try again.");
    }
  });
}
function useAllOrders() {
  return useQuery({
    queryKey: ["all-orders"],
    queryFn: async () => getLocalOrders()
  });
}
export {
  useUserOrders as a,
  useOrder as b,
  useAllOrders as c,
  useCreateOrder as u
};
