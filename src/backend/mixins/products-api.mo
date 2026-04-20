import List "mo:core/List";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import ProductTypes "../types/products";
import ProductLib "../lib/products";

mixin (
  accessControlState : AccessControl.AccessControlState,
  productStore : List.List<ProductTypes.Product>,
  nextProductId : { var value : Nat },
) {
  public shared ({ caller }) func createProduct(input : ProductTypes.CreateProductInput) : async ProductTypes.Product {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can create products");
    };
    let id = nextProductId.value;
    nextProductId.value += 1;
    ProductLib.createProduct(productStore, id, input);
  };

  public shared ({ caller }) func updateProduct(id : Nat, input : ProductTypes.CreateProductInput) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can update products");
    };
    ProductLib.updateProduct(productStore, id, input);
  };

  public shared ({ caller }) func deleteProduct(id : Nat) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can delete products");
    };
    ProductLib.deleteProduct(productStore, id);
  };

  public query func getProduct(id : Nat) : async ?ProductTypes.Product {
    ProductLib.getProduct(productStore, id);
  };

  public query func listProducts(filter : ProductTypes.ProductFilter) : async [ProductTypes.Product] {
    ProductLib.listProducts(productStore, filter);
  };

  public query func listFeaturedProducts() : async [ProductTypes.Product] {
    ProductLib.listFeaturedProducts(productStore);
  };

  public query func listBundles() : async [ProductTypes.Product] {
    ProductLib.listBundles(productStore);
  };

  public shared ({ caller }) func toggleFeatured(id : Nat) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can toggle featured");
    };
    ProductLib.toggleFeatured(productStore, id);
  };

  public shared ({ caller }) func toggleBestseller(id : Nat) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can toggle bestseller");
    };
    ProductLib.toggleBestseller(productStore, id);
  };

  public query func getProducts(filter : ProductTypes.ProductFilter) : async [ProductTypes.Product] {
    ProductLib.listProducts(productStore, filter);
  };

  public shared ({ caller }) func seedProducts() : async () {
    ProductLib.seedProducts(productStore);
    nextProductId.value := productStore.size() + 1;
  };
};
