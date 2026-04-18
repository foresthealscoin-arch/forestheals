import Map "mo:core/Map";
import Set "mo:core/Set";
import Principal "mo:core/Principal";

module {
  public type WishlistStore = Map.Map<Principal, Set.Set<Nat>>;

  public func addToWishlist(store : WishlistStore, userId : Principal, productId : Nat) : () {
    let wishlist = switch (store.get(userId)) {
      case null {
        let newSet = Set.empty<Nat>();
        store.add(userId, newSet);
        newSet;
      };
      case (?s) s;
    };
    wishlist.add(productId);
  };

  public func removeFromWishlist(store : WishlistStore, userId : Principal, productId : Nat) : () {
    switch (store.get(userId)) {
      case null {};
      case (?wishlist) { wishlist.remove(productId) };
    };
  };

  public func getWishlist(store : WishlistStore, userId : Principal) : [Nat] {
    switch (store.get(userId)) {
      case null { [] };
      case (?wishlist) { wishlist.toArray() };
    };
  };
};
