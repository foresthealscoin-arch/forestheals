import Map "mo:core/Map";
import Set "mo:core/Set";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import AccessControl "mo:caffeineai-authorization/access-control";
import WishlistLib "../lib/wishlist";

mixin (
  accessControlState : AccessControl.AccessControlState,
  wishlistStore : Map.Map<Principal, Set.Set<Nat>>,
) {
  public shared ({ caller }) func addToWishlist(productId : Nat) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to use wishlist");
    };
    WishlistLib.addToWishlist(wishlistStore, caller, productId);
  };

  public shared ({ caller }) func removeFromWishlist(productId : Nat) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to use wishlist");
    };
    WishlistLib.removeFromWishlist(wishlistStore, caller, productId);
  };

  public query ({ caller }) func getWishlist() : async [Nat] {
    WishlistLib.getWishlist(wishlistStore, caller);
  };

  public query ({ caller }) func isWishlisted(productId : Nat) : async Bool {
    let wishlist = WishlistLib.getWishlist(wishlistStore, caller);
    wishlist.find(func(id) { id == productId }) != null;
  };
};
