export type CartItem = {
  productId: string;
  variantId: string;
  name: string;
  variantName: string;
  priceCents: number;
  quantity: number;
  image: string | null;
};

export function addCartItem(
  cart: CartItem[],
  item: CartItem,
): CartItem[] {
  const existing = cart.find(
    (x) => x.variantId === item.variantId,
  );

  if (existing) {
    return cart.map((x) =>
      x.variantId === item.variantId
        ? { ...x, quantity: x.quantity + item.quantity }
        : x,
    );
  }

  return [...cart, item];
}

export function removeCartItem(
  cart: CartItem[],
  variantId: string,
): CartItem[] {
  return cart.filter((x) => x.variantId !== variantId);
}

export function updateCartQuantity(
  cart: CartItem[],
  variantId: string,
  quantity: number,
): CartItem[] {
  if (quantity <= 0) {
    return removeCartItem(cart, variantId);
  }

  return cart.map((x) =>
    x.variantId === variantId
      ? { ...x, quantity }
      : x,
  );
}
