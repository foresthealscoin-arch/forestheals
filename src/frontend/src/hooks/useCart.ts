import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createActor } from "../backend";
import { useAuthStore } from "../stores/useAuthStore";
import { useCartStore } from "../stores/useCartStore";
import type { CartItem } from "../types";

function useBackendActor() {
  return useActor(createActor);
}

export function useCart() {
  const cartStore = useCartStore();
  const { isLoggedIn } = useAuthStore();
  const { actor, isFetching } = useBackendActor();
  const qc = useQueryClient();

  // On mount for logged-in users: fetch backend cart and sync into local store
  useQuery({
    queryKey: ["cart", "backend"],
    queryFn: async () => {
      if (!actor || isFetching || !isLoggedIn) return null;
      const items = await actor.getCart();
      if (items.length === 0) return null;
      // Replace local cart with backend cart (backend is source of truth)
      cartStore.clearCart();
      for (const item of items) {
        cartStore.addItem({
          productId: Number(item.productId),
          quantity: Number(item.quantity),
          price: Number(item.price),
        });
      }
      return items;
    },
    enabled: !!actor && !isFetching && isLoggedIn,
    staleTime: 30 * 1000,
  });

  const addToCart = async (item: CartItem, productName: string) => {
    // Instant local update
    cartStore.addItem(item);
    toast.success(`${productName} added to cart`, {
      description: "Review your cart before checkout",
      duration: 2500,
    });
    // Sync to backend if logged in
    if (actor && !isFetching && isLoggedIn) {
      try {
        await actor.addToCart(
          BigInt(item.productId),
          BigInt(item.quantity),
          BigInt(item.price),
        );
        void qc.invalidateQueries({ queryKey: ["cart"] });
      } catch {
        // local cart already updated — non-critical
      }
    }
  };

  const removeFromCart = async (productId: number, productName: string) => {
    cartStore.removeItem(productId);
    toast.info(`${productName} removed from cart`);
    if (actor && !isFetching && isLoggedIn) {
      try {
        await actor.removeFromCart(BigInt(productId));
        void qc.invalidateQueries({ queryKey: ["cart"] });
      } catch {
        // non-critical
      }
    }
  };

  const updateQty = async (productId: number, quantity: number) => {
    cartStore.updateQuantity(productId, quantity);
    if (actor && !isFetching && isLoggedIn) {
      try {
        await actor.updateCartQuantity(BigInt(productId), BigInt(quantity));
        void qc.invalidateQueries({ queryKey: ["cart"] });
      } catch {
        // non-critical
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
        // non-critical
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
    removeCoupon: cartStore.removeCoupon,
  };
}

export function useValidateCoupon() {
  const { setCoupon } = useCartStore();
  const { actor, isFetching } = useBackendActor();

  return useMutation({
    mutationFn: async (code: string) => {
      if (!actor || isFetching) {
        throw new Error("Backend not connected");
      }
      const result = await actor.validateCoupon(code.toUpperCase());
      return {
        valid: result.valid,
        discountPercent: Number(result.discountPercent),
        message: result.message,
      };
    },
    onSuccess: (data, code) => {
      if (data.valid) {
        const { totalAmount } = useCartStore.getState();
        const discountAmount = Math.round(
          totalAmount() * (data.discountPercent / 100),
        );
        setCoupon(code.toUpperCase(), discountAmount);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    },
    onError: () => {
      toast.error("Failed to validate coupon. Please try again.");
    },
  });
}
