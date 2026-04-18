import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Map "mo:core/Map";
import Time "mo:core/Time";
import AccessControl "mo:caffeineai-authorization/access-control";
import OrderTypes "../types/orders";
import CouponTypes "../types/coupons";
import OrderLib "../lib/orders";
import CouponLib "../lib/coupons";

mixin (
  accessControlState : AccessControl.AccessControlState,
  orderStore : List.List<OrderTypes.Order>,
  nextOrderId : { var value : Nat },
  couponStore : Map.Map<Text, CouponTypes.Coupon>,
) {
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
    OrderLib.createOrder(orderStore, id, caller, input, discountAmount, totalAmount);
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

  public query ({ caller }) func listAllOrders() : async [OrderTypes.Order] {
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
};
