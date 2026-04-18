import { u as useMutation } from "./useMutation-Cg-O1UYS.js";
import { l as useCartStore, u as ue } from "./index-BTLW_NIC.js";
function useCart() {
  const cartStore = useCartStore();
  const addToCart = (item, productName) => {
    cartStore.addItem(item);
    ue.success(`${productName} added to cart`, {
      description: "Review your cart before checkout",
      duration: 3e3
    });
  };
  const removeFromCart = (productId, productName) => {
    cartStore.removeItem(productId);
    ue.info(`${productName} removed from cart`);
  };
  const updateQty = (productId, quantity) => {
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
    removeCoupon: cartStore.removeCoupon
  };
}
function useValidateCoupon() {
  const { setCoupon } = useCartStore();
  return useMutation({
    mutationFn: async (code) => {
      const coupons = {
        FOREST10: 10,
        HEAL20: 20,
        NATURE15: 15,
        WELCOME5: 5
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
