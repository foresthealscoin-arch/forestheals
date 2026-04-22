import { d as useCartStore, o as useAuthStore, p as useQueryClient, q as useQuery, u as useActor, e as ue, f as createActor } from "./index-CfU2kVIJ.js";
import { u as useMutation } from "./useMutation-DVPdZiQH.js";
function useBackendActor() {
  return useActor(createActor);
}
function useCart() {
  const cartStore = useCartStore();
  const { isLoggedIn } = useAuthStore();
  const { actor, isFetching } = useBackendActor();
  const qc = useQueryClient();
  useQuery({
    queryKey: ["cart", "backend"],
    queryFn: async () => {
      if (!actor || isFetching || !isLoggedIn) return null;
      const items = await actor.getCart();
      if (items.length === 0) return null;
      cartStore.clearCart();
      for (const item of items) {
        cartStore.addItem({
          productId: Number(item.productId),
          quantity: Number(item.quantity),
          price: Number(item.price)
        });
      }
      return items;
    },
    enabled: !!actor && !isFetching && isLoggedIn,
    staleTime: 30 * 1e3
  });
  const addToCart = async (item, productName) => {
    cartStore.addItem(item);
    ue.success(`${productName} added to cart`, {
      description: "Review your cart before checkout",
      duration: 2500
    });
    if (actor && !isFetching && isLoggedIn) {
      try {
        await actor.addToCart(
          BigInt(item.productId),
          BigInt(item.quantity),
          BigInt(item.price)
        );
        void qc.invalidateQueries({ queryKey: ["cart"] });
      } catch {
      }
    }
  };
  const removeFromCart = async (productId, productName) => {
    cartStore.removeItem(productId);
    ue.info(`${productName} removed from cart`);
    if (actor && !isFetching && isLoggedIn) {
      try {
        await actor.removeFromCart(BigInt(productId));
        void qc.invalidateQueries({ queryKey: ["cart"] });
      } catch {
      }
    }
  };
  const updateQty = async (productId, quantity) => {
    cartStore.updateQuantity(productId, quantity);
    if (actor && !isFetching && isLoggedIn) {
      try {
        await actor.updateCartQuantity(BigInt(productId), BigInt(quantity));
        void qc.invalidateQueries({ queryKey: ["cart"] });
      } catch {
      }
    }
  };
  const clearAllCart = async () => {
    cartStore.clearCart();
    if (actor && !isFetching && isLoggedIn) {
      try {
        await actor.clearCart();
        void qc.invalidateQueries({ queryKey: ["cart"] });
      } catch {
      }
    }
  };
  return {
    items: cartStore.items,
    couponCode: cartStore.couponCode,
    discount: cartStore.discount,
    totalAmount: cartStore.totalAmount(),
    itemCount: cartStore.itemCount(),
    addToCart,
    removeFromCart,
    updateQty,
    clearAllCart,
    setCoupon: cartStore.setCoupon,
    removeCoupon: cartStore.removeCoupon
  };
}
function useValidateCoupon() {
  const { setCoupon } = useCartStore();
  const { actor, isFetching } = useBackendActor();
  return useMutation({
    mutationFn: async (code) => {
      if (!actor || isFetching) {
        throw new Error("Backend not connected");
      }
      const result = await actor.validateCoupon(code.toUpperCase());
      return {
        valid: result.valid,
        discountPercent: Number(result.discountPercent),
        message: result.message
      };
    },
    onSuccess: (data, code) => {
      if (data.valid) {
        const { totalAmount } = useCartStore.getState();
        const discountAmount = Math.round(
          totalAmount() * (data.discountPercent / 100)
        );
        setCoupon(code.toUpperCase(), discountAmount);
        ue.success(data.message);
      } else {
        ue.error(data.message);
      }
    },
    onError: () => {
      ue.error("Failed to validate coupon. Please try again.");
    }
  });
}
export {
  useValidateCoupon as a,
  useCart as u
};
