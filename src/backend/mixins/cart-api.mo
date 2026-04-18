import Map "mo:core/Map";
import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import AccessControl "mo:caffeineai-authorization/access-control";
import OrderTypes "../types/orders";
import CartLib "../lib/cart";

mixin (
  accessControlState : AccessControl.AccessControlState,
  cartStore : Map.Map<Principal, List.List<OrderTypes.CartItem>>,
) {
  public shared ({ caller }) func addToCart(productId : Nat, quantity : Nat, price : Nat) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to use cart");
    };
    CartLib.addToCart(cartStore, caller, productId, quantity, price);
  };

  public shared ({ caller }) func removeFromCart(productId : Nat) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to use cart");
    };
    CartLib.removeFromCart(cartStore, caller, productId);
  };

  public shared ({ caller }) func updateCartQuantity(productId : Nat, quantity : Nat) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to use cart");
    };
    CartLib.updateCartQuantity(cartStore, caller, productId, quantity);
  };

  public query ({ caller }) func getCart() : async [OrderTypes.CartItem] {
    CartLib.getCart(cartStore, caller);
  };

  public shared ({ caller }) func clearCart() : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to use cart");
    };
    CartLib.clearCart(cartStore, caller);
  };
};
