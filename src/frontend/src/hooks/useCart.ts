import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useCartStore } from "../stores/useCartStore";
import type { CartItem } from "../types";

export function useCart() {
  const cartStore = useCartStore();

  const addToCart = (item: CartItem, productName: string) => {
    cartStore.addItem(item);
    toast.success(`${productName} added to cart`, {
      description: "Review your cart before checkout",
      duration: 3000,
    });
  };

  const removeFromCart = (productId: number, productName: string) => {
    cartStore.removeItem(productId);
    toast.info(`${productName} removed from cart`);
  };

  const updateQty = (productId: number, quantity: number) => {
    cartStore.updateQuantity(productId, quantity);
  };

  const clearAllCart = () => {
    cartStore.clearCart();
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
  return useMutation({
    mutationFn: async (code: string) => {
      // Static coupon validation until backend is ready
      const coupons: Record<string, number> = {
        FOREST10: 10,
        HEAL20: 20,
        NATURE15: 15,
        WELCOME5: 5,
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
