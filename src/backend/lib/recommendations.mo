import List "mo:core/List";
import ProductTypes "../types/products";

module {
  // Hardcoded condition-to-product-name mapping
  public func getRecommendedProductNames(condition : Text) : [Text] {
    switch (condition) {
      case "hair_fall" {
        ["Brahmi", "Organic Amla Powder", "Shatavari", "Sesame Seeds"];
      };
      case "stress" {
        ["Organic Ashwagandha", "Brahmi", "Tulsi Powder", "Shatavari"];
      };
      case "immunity" {
        ["Organic Amla Powder", "Tulsi Powder", "Cloves", "Organic Moringa", "Triphala Churan"];
      };
      case "digestion" {
        ["Triphala Churan", "Dry Ginger", "Cardamom", "Tej Patta (Bay Leaf)", "Mulethi"];
      };
      case "energy" {
        ["Organic Moringa", "Chia Seeds", "Pumpkin Seeds", "Organic Ashwagandha", "Sesame Seeds"];
      };
      case "skin_health" {
        ["Multani Mitti Powder", "Organic Neem Powder", "Organic Amla Powder", "Sunflower Seeds"];
      };
      case "sleep" {
        ["Organic Ashwagandha", "Brahmi", "Mulethi"];
      };
      case "womens_health" {
        ["Shatavari", "Organic Amla Powder", "Organic Ashwagandha", "Sesame Seeds"];
      };
      case "joint_health" {
        ["Dry Ginger", "Organic Ashwagandha", "Sesame Seeds", "Mulethi"];
      };
      case "weight_management" {
        ["Chia Seeds", "Organic Moringa", "Cinnamon", "Pumpkin Seeds"];
      };
      case _ { [] };
    };
  };

  public func getRecommendations(
    store : List.List<ProductTypes.Product>,
    condition : Text,
  ) : [ProductTypes.Product] {
    let names = getRecommendedProductNames(condition);
    if (names.size() == 0) { return [] };
    store.filter(func(p) {
      names.find(func(n) { n == p.name }) != null
    }).toArray();
  };
};
