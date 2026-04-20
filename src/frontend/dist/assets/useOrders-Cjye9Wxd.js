import { n as useQueryClient, k as useAuthStore, d as ue } from "./index-C77TdgT2.js";
import { u as useQuery, a as useActor, c as createActor } from "./backend-CD8IXjU0.js";
import { u as useMutation } from "./useMutation-DqmtgTe2.js";
function useBackendActor() {
  return useActor(createActor);
}
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
  useBackendActor();
  const { isLoggedIn } = useAuthStore();
  return useQuery({
    queryKey: ["user-orders"],
    queryFn: async () => {
      return getLocalOrders();
    },
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
  const { actor, isFetching } = useBackendActor();
  const { isLoggedIn } = useAuthStore();
  return useMutation({
    mutationFn: async (input) => {
      if (actor && !isFetching && isLoggedIn) {
        try {
          const raw = await actor.createOrder({
            items: input.items.map((i) => ({
              productId: BigInt(i.productId),
              quantity: BigInt(i.quantity),
              price: BigInt(i.price)
            })),
            paymentMethod: input.paymentMethod === "cod" ? { cod: null } : { stripe: null },
            address: {
              street: input.address.line1,
              city: input.address.city,
              state: input.address.state,
              postalCode: input.address.pincode,
              country: input.address.country ?? "India",
              gstNumber: void 0
            },
            couponCode: input.couponCode,
            stripePaymentId: input.stripePaymentId
          });
          const order = {
            id: Number(raw.id),
            userId: raw.userId.toText(),
            items: raw.items.map((i) => ({
              productId: Number(i.productId),
              quantity: Number(i.quantity),
              price: Number(i.price)
            })),
            totalAmount: Number(raw.totalAmount),
            status: String(raw.status),
            paymentMethod: String(raw.paymentMethod),
            address: input.address,
            createdAt: Number(raw.createdAt),
            stripePaymentId: raw.stripePaymentId,
            couponCode: raw.couponCode,
            discountAmount: Number(raw.discountAmount)
          };
          const orders2 = getLocalOrders();
          saveLocalOrders([...orders2, order]);
          return order;
        } catch {
        }
      }
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
      void qc.invalidateQueries({ queryKey: ["user-orders"] });
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
