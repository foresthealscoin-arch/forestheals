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

  // For logged-in users, try to sync with backend cart
  useQuery({
    queryKey: ["cart", "backend"],
    queryFn: async () => {
      if (!actor || isFetching || !isLoggedIn) return null;
      try {
        const items = await actor.getCart();
        // Sync backend cart items into local store
        for (const item of items) {
          cartStore.addItem({
            productId: Number(item.productId),
            quantity: Number(item.quantity),
            price: Number(item.price),
          });
        }
        return items;
      } catch {
        return null;
      }
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
        // local cart already updated, ignore backend error
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
        // ignore
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
        // ignore
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
        // ignore
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
      if (actor && !isFetching) {
        try {
          const result = await actor.validateCoupon(code.toUpperCase());
          return {
            valid: result.valid,
            discountPercent: Number(result.discountPercent),
            message: result.message,
          };
        } catch {
          // fallback
        }
      }
      // Static fallback coupons
      const coupons: Record<string, number> = {
        FOREST10: 10,
        HEAL20: 20,
        NATURE15: 15,
        WELCOME5: 5,
        FIRST10: 10,
      };
      const discount = coupons[code.toUpperCase()];
      if (discount) {
        return {
          valid: true,
          discountPercent: discount,
          message: `${discount}% discount applied!`,
        };
      }
      return {
        valid: false,
        discountPercent: 0,
        message: "Invalid coupon code",
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
  });
}
