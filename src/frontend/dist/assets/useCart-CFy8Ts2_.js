import { u as useCartStore, k as useAuthStore, n as useQueryClient, d as ue } from "./index-Oxc-_oxi.js";
import { u as useQuery, a as useActor, c as createActor } from "./backend-BS-t6_G-.js";
import { u as useMutation } from "./useMutation-C8tWLAXr.js";
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
      try {
        const items = await actor.getCart();
        for (const item of items) {
          cartStore.addItem({
            productId: Number(item.productId),
            quantity: Number(item.quantity),
            price: Number(item.price)
          });
        }
        return items;
      } catch {
        return null;
      }
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
      if (actor && !isFetching) {
        try {
          const result = await actor.validateCoupon(code.toUpperCase());
          return {
            valid: result.valid,
            discountPercent: Number(result.discountPercent),
            message: result.message
          };
        } catch {
        }
      }
      const coupons = {
        FOREST10: 10,
        HEAL20: 20,
        NATURE15: 15,
        WELCOME5: 5,
        FIRST10: 10
      };
      const discount = coupons[code.toUpperCase()];
      if (discount) {
        return {
          valid: true,
          discountPercent: discount,
          message: `${discount}% discount applied!`
        };
      }
      return {
        valid: false,
        discountPercent: 0,
        message: "Invalid coupon code"
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
    }
  });
}
export {
  useValidateCoupon as a,
  useCart as u
};
