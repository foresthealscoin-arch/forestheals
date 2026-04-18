import List "mo:core/List";
import ProductTypes "../types/products";
import RecommendLib "../lib/recommendations";

mixin (
  productStore : List.List<ProductTypes.Product>,
) {
  public query func getRecommendations(condition : Text) : async [ProductTypes.Product] {
    RecommendLib.getRecommendations(productStore, condition);
  };
};
