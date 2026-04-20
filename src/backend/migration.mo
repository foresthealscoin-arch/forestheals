import List "mo:core/List";
import Map "mo:core/Map";
import Set "mo:core/Set";
import Principal "mo:core/Principal";
import ProductTypes "types/products";

module {
  // ── Old types (copied from .old/src/backend/types/products.mo) ───────────

  type OldProduct = {
    id : Nat;
    name : Text;
    description : Text;
    price : Nat;
    category : Text;
    imageUrl : Text;
    imageKey : Text;
    stock : Nat;
    ratings : Float;
    reviewCount : Nat;
    featured : Bool;
    discount : Nat;
    bundleIds : [Nat];
  };

  // ── Old actor state shape ─────────────────────────────────────────────────

  type OldActor = {
    productStore : List.List<OldProduct>;
  };

  // ── New actor state shape ─────────────────────────────────────────────────

  type NewActor = {
    productStore : List.List<ProductTypes.Product>;
  };

  // ── Migration function ────────────────────────────────────────────────────

  public func run(old : OldActor) : NewActor {
    let newProducts = old.productStore.map<OldProduct, ProductTypes.Product>(
      func(p) {
        { p with bestseller = false }
      }
    );
    { productStore = newProducts };
  };
};
