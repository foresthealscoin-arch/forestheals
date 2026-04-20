import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Map "mo:core/Map";
import Time "mo:core/Time";
import AccessControl "mo:caffeineai-authorization/access-control";
import OrderTypes "../types/orders";
import CouponTypes "../types/coupons";
import ProductTypes "../types/products";
import OrderLib "../lib/orders";
import CouponLib "../lib/coupons";
import ProductLib "../lib/products";

mixin (
  accessControlState : AccessControl.AccessControlState,
  orderStore : List.List<OrderTypes.Order>,
  nextOrderId : { var value : Nat },
  couponStore : Map.Map<Text, CouponTypes.Coupon>,
  productStore : List.List<ProductTypes.Product>,
) {
  // Helper: decrease stock for all order items
  func decreaseStockForItems(items : [OrderTypes.CartItem]) : () {
    for (item in items.values()) {
      ProductLib.decreaseStock(productStore, item.productId, item.quantity);
    };
  };

  // Helper: increase stock for all order items (cancellations/refunds)
  func increaseStockForItems(items : [OrderTypes.CartItem]) : () {
    for (item in items.values()) {
      ProductLib.increaseStock(productStore, item.productId, item.quantity);
    };
  };

  /// Create a new order (frontend checkout). Alias: placeOrder
  public shared ({ caller }) func createOrder(input : OrderTypes.CreateOrderInput) : async OrderTypes.Order {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to place orders");
    };
    let rawTotal = OrderLib.calcTotal(input.items);
    var discountAmount = 0;
    switch (input.couponCode) {
      case null {};
      case (?code) {
        let now = Time.now();
        let validation = CouponLib.validateCoupon(couponStore, code, now);
        if (validation.valid) {
          discountAmount := (rawTotal * validation.discountPercent) / 100;
          ignore CouponLib.redeemCoupon(couponStore, code, now);
        };
      };
    };
    let totalAmount = if (rawTotal > discountAmount) { rawTotal - discountAmount } else { 0 };
    let id = nextOrderId.value;
    nextOrderId.value += 1;
    let order = OrderLib.createOrder(orderStore, id, caller, input, discountAmount, totalAmount);
    decreaseStockForItems(input.items);
    order;
  };

  /// Alias for createOrder (matches contract name placeOrder)
  public shared ({ caller }) func placeOrder(input : OrderTypes.CreateOrderInput) : async OrderTypes.Order {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to place orders");
    };
    let rawTotal = OrderLib.calcTotal(input.items);
    var discountAmount = 0;
    switch (input.couponCode) {
      case null {};
      case (?code) {
        let now = Time.now();
        let validation = CouponLib.validateCoupon(couponStore, code, now);
        if (validation.valid) {
          discountAmount := (rawTotal * validation.discountPercent) / 100;
          ignore CouponLib.redeemCoupon(couponStore, code, now);
        };
      };
    };
    let totalAmount = if (rawTotal > discountAmount) { rawTotal - discountAmount } else { 0 };
    let id = nextOrderId.value;
    nextOrderId.value += 1;
    let order = OrderLib.createOrder(orderStore, id, caller, input, discountAmount, totalAmount);
    decreaseStockForItems(input.items);
    order;
  };

  public query ({ caller }) func getOrder(id : Nat) : async ?OrderTypes.Order {
    switch (OrderLib.getOrder(orderStore, id)) {
      case null { null };
      case (?order) {
        if (Principal.equal(order.userId, caller) or AccessControl.isAdmin(accessControlState, caller)) {
          ?order;
        } else {
          Runtime.trap("Unauthorized: Cannot view another user's order");
        };
      };
    };
  };

  public query ({ caller }) func listUserOrders() : async [OrderTypes.Order] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to view orders");
    };
    OrderLib.listUserOrders(orderStore, caller);
  };

  /// Alias for listUserOrders
  public query ({ caller }) func getUserOrders() : async [OrderTypes.Order] {
    OrderLib.listUserOrders(orderStore, caller);
  };

  public query ({ caller }) func listAllOrders() : async [OrderTypes.Order] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can list all orders");
    };
    OrderLib.listAllOrders(orderStore);
  };

  /// Alias for listAllOrders
  public query ({ caller }) func getAllOrders() : async [OrderTypes.Order] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can list all orders");
    };
    OrderLib.listAllOrders(orderStore);
  };

  public shared ({ caller }) func updateOrderStatus(id : Nat, status : OrderTypes.OrderStatus) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update order status");
    };
    OrderLib.updateOrderStatus(orderStore, id, status);
  };

  /// Cancel an order — user cancels own order or admin cancels any; restores stock
  public shared ({ caller }) func cancelOrder(id : Nat) : async Bool {
    switch (OrderLib.getOrder(orderStore, id)) {
      case null { false };
      case (?order) {
        let isOwner = Principal.equal(order.userId, caller);
        let isAdminCaller = AccessControl.isAdmin(accessControlState, caller);
        if (not isOwner and not isAdminCaller) {
          Runtime.trap("Unauthorized: Cannot cancel another user's order");
        };
        let result = OrderLib.updateOrderStatus(orderStore, id, #cancelled);
        if (result) {
          increaseStockForItems(order.items);
        };
        result;
      };
    };
  };
};
