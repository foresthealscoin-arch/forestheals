import Map "mo:core/Map";
import List "mo:core/List";
import Principal "mo:core/Principal";
import OrderTypes "../types/orders";

module {
  public type CartStore = Map.Map<Principal, List.List<OrderTypes.CartItem>>;

  public func addToCart(
    store : CartStore,
    userId : Principal,
    productId : Nat,
    quantity : Nat,
    price : Nat,
  ) : () {
    let cart = switch (store.get(userId)) {
      case null {
        let newCart = List.empty<OrderTypes.CartItem>();
        store.add(userId, newCart);
        newCart;
      };
      case (?c) c;
    };
    // Check if item already exists, update quantity if so
    var found = false;
    cart.mapInPlace(func(item) {
      if (item.productId == productId) {
        found := true;
        { item with quantity = item.quantity + quantity };
      } else { item };
    });
    if (not found) {
      cart.add({ productId; quantity; price });
    };
  };

  public func removeFromCart(store : CartStore, userId : Principal, productId : Nat) : () {
    switch (store.get(userId)) {
      case null {};
      case (?cart) {
        let filtered = cart.filter(func(item) { item.productId != productId });
        cart.clear();
        cart.append(filtered);
      };
    };
  };

  public func updateCartQuantity(
    store : CartStore,
    userId : Principal,
    productId : Nat,
    quantity : Nat,
  ) : () {
    switch (store.get(userId)) {
      case null {};
      case (?cart) {
        if (quantity == 0) {
          let filtered = cart.filter(func(item) { item.productId != productId });
          cart.clear();
          cart.append(filtered);
        } else {
          cart.mapInPlace(func(item) {
            if (item.productId == productId) { { item with quantity } } else { item };
          });
        };
      };
    };
  };

  public func getCart(store : CartStore, userId : Principal) : [OrderTypes.CartItem] {
    switch (store.get(userId)) {
      case null { [] };
      case (?cart) { cart.toArray() };
    };
  };

  public func clearCart(store : CartStore, userId : Principal) : () {
    switch (store.get(userId)) {
      case null {};
      case (?cart) { cart.clear() };
    };
  };
};
