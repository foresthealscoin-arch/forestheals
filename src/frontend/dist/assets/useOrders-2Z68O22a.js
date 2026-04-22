import { p as useQueryClient, o as useAuthStore, q as useQuery, u as useActor, e as ue, w as PaymentMethod, O as OrderStatus, f as createActor } from "./index-CfU2kVIJ.js";
import { u as useMutation } from "./useMutation-DVPdZiQH.js";
function useBackendActor() {
  return useActor(createActor);
}
function mapBackendStatus(status) {
  const map = {
    [OrderStatus.pending]: "pending",
    [OrderStatus.confirmed]: "confirmed",
    [OrderStatus.processing]: "processing",
    [OrderStatus.shipped]: "shipped",
    [OrderStatus.completed]: "completed",
    [OrderStatus.cancelled]: "cancelled"
  };
  return map[String(status)] ?? "pending";
}
function mapBackendOrder(o) {
  return {
    id: Number(o.id),
    userId: o.userId.toText(),
    items: o.items.map((i) => ({
      productId: Number(i.productId),
      quantity: Number(i.quantity),
      price: Number(i.price)
    })),
    totalAmount: Number(o.totalAmount),
    status: mapBackendStatus(o.status),
    paymentMethod: String(o.paymentMethod) === String(PaymentMethod.stripe) ? "stripe" : "cod",
    address: {
      fullName: o.address.fullName,
      phone: o.address.phone,
      line1: o.address.line1,
      line2: o.address.line2 ?? void 0,
      city: o.address.city,
      state: o.address.state,
      pincode: o.address.pincode,
      country: o.address.country ?? "India",
      gstNumber: o.address.gstNumber ?? void 0
    },
    createdAt: Number(o.createdAt) / 1e6,
    stripePaymentId: o.stripePaymentId,
    couponCode: o.couponCode,
    discountAmount: Number(o.discountAmount)
  };
}
function useUserOrders() {
  const { actor, isFetching } = useBackendActor();
  const { isLoggedIn } = useAuthStore();
  return useQuery({
    queryKey: ["user-orders"],
    queryFn: async () => {
      if (!actor || isFetching || !isLoggedIn) return [];
      const raw = await actor.listUserOrders();
      return raw.map(mapBackendOrder).sort((a, b) => b.createdAt - a.createdAt);
    },
    staleTime: 30 * 1e3,
    refetchOnWindowFocus: true,
    retry: 2,
    enabled: !!actor && !isFetching && isLoggedIn
  });
}
function useOrder(id) {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
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
    staleTime: 30 * 1e3
  });
}
function useCreateOrder() {
  const qc = useQueryClient();
  const { actor, isFetching } = useBackendActor();
  const { isLoggedIn } = useAuthStore();
  return useMutation({
    mutationFn: async (input) => {
      var _a;
      if (!actor || isFetching) {
        throw new Error("Backend is not available. Please try again.");
      }
      if (!isLoggedIn) {
        throw new Error("You must be signed in to place an order.");
      }
      if (!((_a = input.address.fullName) == null ? void 0 : _a.trim())) {
        throw new Error("Delivery address is required.");
      }
      if (input.items.length === 0) {
        throw new Error("Your cart is empty.");
      }
      const raw = await actor.placeOrder({
        items: input.items.map((i) => ({
          productId: BigInt(i.productId),
          quantity: BigInt(i.quantity),
          price: BigInt(i.price),
          productType: void 0
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
        stripePaymentId: input.stripePaymentId,
        userId: void 0,
        addressId: void 0,
        notes: void 0
      });
      return mapBackendOrder(raw);
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["user-orders"] });
      void qc.invalidateQueries({ queryKey: ["all-orders"] });
      void qc.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (err) => {
      console.error("Order mutation error:", err);
      const msg = (err == null ? void 0 : err.message) ?? "Failed to place order. Please try again.";
      ue.error(msg);
    }
  });
}
export {
  useUserOrders as a,
  useOrder as b,
  useCreateOrder as u
};
