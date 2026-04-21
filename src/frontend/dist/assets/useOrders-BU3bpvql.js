import { n as useQueryClient, k as useAuthStore, d as ue } from "./index-Oxc-_oxi.js";
import { u as useQuery, a as useActor, P as PaymentMethod, O as OrderStatus, c as createActor } from "./backend-BS-t6_G-.js";
import { u as useMutation } from "./useMutation-C8tWLAXr.js";
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
function mapBackendStatus(status) {
  const map = {
    [OrderStatus.pending]: "pending",
    [OrderStatus.processing]: "confirmed",
    [OrderStatus.shipped]: "shipped",
    [OrderStatus.delivered]: "delivered",
    [OrderStatus.cancelled]: "cancelled"
  };
  return map[String(status)] ?? "pending";
}
function useUserOrders() {
  const { actor, isFetching } = useBackendActor();
  const { isLoggedIn } = useAuthStore();
  return useQuery({
    queryKey: ["user-orders"],
    queryFn: async () => {
      if (actor && !isFetching && isLoggedIn) {
        try {
          const raw = await actor.listUserOrders();
          if (raw.length > 0) {
            const orders = raw.map((o) => ({
              id: Number(o.id),
              userId: o.userId.toText(),
              items: o.items.map((i) => ({
                productId: Number(i.productId),
                quantity: Number(i.quantity),
                price: Number(i.price)
              })),
              totalAmount: Number(o.totalAmount),
              status: mapBackendStatus(o.status),
              paymentMethod: String(o.paymentMethod) === PaymentMethod.stripe ? "stripe" : "cod",
              address: {
                fullName: o.address.fullName,
                phone: o.address.phone,
                line1: o.address.line1,
                line2: o.address.line2 ?? void 0,
                city: o.address.city,
                state: o.address.state,
                pincode: o.address.pincode,
                country: o.address.country
              },
              createdAt: Number(o.createdAt) / 1e6,
              stripePaymentId: o.stripePaymentId,
              couponCode: o.couponCode,
              discountAmount: Number(o.discountAmount)
            }));
            const local = getLocalOrders();
            const backendIds = new Set(orders.map((o) => o.id));
            const localOnly = local.filter((o) => !backendIds.has(o.id));
            return [...orders, ...localOnly].sort(
              (a, b) => b.createdAt - a.createdAt
            );
          }
        } catch {
        }
      }
      return getLocalOrders().sort((a, b) => b.createdAt - a.createdAt);
    },
    staleTime: 30 * 1e3
  });
}
function useOrder(id) {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["order", id],
    queryFn: async () => {
      const local = getLocalOrders().find((o) => o.id === id);
      if (local) return local;
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
              price: Number(i.price)
            })),
            totalAmount: Number(raw.totalAmount),
            status: mapBackendStatus(raw.status),
            paymentMethod: String(raw.paymentMethod) === PaymentMethod.stripe ? "stripe" : "cod",
            address: {
              fullName: raw.address.fullName,
              phone: raw.address.phone,
              line1: raw.address.line1,
              line2: raw.address.line2 ?? void 0,
              city: raw.address.city,
              state: raw.address.state,
              pincode: raw.address.pincode,
              country: raw.address.country
            },
            createdAt: Number(raw.createdAt) / 1e6,
            stripePaymentId: raw.stripePaymentId,
            couponCode: raw.couponCode,
            discountAmount: Number(raw.discountAmount)
          };
        } catch {
          return null;
        }
      }
      return null;
    },
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
            paymentMethod: input.paymentMethod === "stripe" ? PaymentMethod.stripe : PaymentMethod.cod,
            address: {
              fullName: input.address.fullName,
              phone: input.address.phone,
              line1: input.address.line1,
              line2: input.address.line2,
              city: input.address.city,
              state: input.address.state,
              pincode: input.address.pincode,
              country: input.address.country ?? "India",
              gstNumber: input.address.gstNumber
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
            status: mapBackendStatus(raw.status),
            paymentMethod: input.paymentMethod,
            address: input.address,
            // keep original rich address data locally
            createdAt: Number(raw.createdAt) / 1e6,
            stripePaymentId: raw.stripePaymentId,
            couponCode: raw.couponCode,
            discountAmount: Number(raw.discountAmount)
          };
          const orders2 = getLocalOrders();
          saveLocalOrders([order, ...orders2]);
          return order;
        } catch (err) {
          console.error("Backend order creation failed:", err);
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
      saveLocalOrders([newOrder, ...orders]);
      return newOrder;
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["user-orders"] });
      void qc.invalidateQueries({ queryKey: ["all-orders"] });
    },
    onError: (err) => {
      console.error("Order mutation error:", err);
      ue.error("Failed to place order. Please try again.");
    }
  });
}
function useAllOrders() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["all-orders"],
    queryFn: async () => {
      if (actor && !isFetching) {
        try {
          const raw = await actor.listAllOrders();
          const backendOrders = raw.map((o) => ({
            id: Number(o.id),
            userId: o.userId.toText(),
            items: o.items.map((i) => ({
              productId: Number(i.productId),
              quantity: Number(i.quantity),
              price: Number(i.price)
            })),
            totalAmount: Number(o.totalAmount),
            status: mapBackendStatus(o.status),
            paymentMethod: String(o.paymentMethod) === PaymentMethod.stripe ? "stripe" : "cod",
            address: {
              fullName: o.address.fullName,
              phone: o.address.phone,
              line1: o.address.line1,
              line2: o.address.line2 ?? void 0,
              city: o.address.city,
              state: o.address.state,
              pincode: o.address.pincode,
              country: o.address.country
            },
            createdAt: Number(o.createdAt) / 1e6,
            stripePaymentId: o.stripePaymentId,
            couponCode: o.couponCode,
            discountAmount: Number(o.discountAmount)
          }));
          const local = getLocalOrders();
          const backendIds = new Set(backendOrders.map((o) => o.id));
          const merged = [
            ...local,
            ...backendOrders.filter(
              (o) => !backendIds.has(o.id) || !local.find((l) => l.id === o.id)
            )
          ];
          const seen = /* @__PURE__ */ new Set();
          const deduped = [];
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
    staleTime: 15 * 1e3,
    refetchInterval: 30 * 1e3
  });
}
export {
  useUserOrders as a,
  useOrder as b,
  useAllOrders as c,
  useCreateOrder as u
};
