module {
  public type Category = Text; // "Ayurvedic Powders" | "Natural Spices" | "Super Seeds" | "Skincare" | "Eco-friendly"

  public type Product = {
    id : Nat;
    name : Text;
    description : Text;
    price : Nat; // in paise (smallest unit)
    category : Category;
    imageUrl : Text;
    imageKey : Text;
    stock : Nat;
    ratings : Float;
    reviewCount : Nat;
    featured : Bool;
    discount : Nat; // percentage 0-100
    bundleIds : [Nat];
  };

  public type ProductFilter = {
    category : ?Text;
    minPrice : ?Nat;
    maxPrice : ?Nat;
    minRating : ?Float;
    searchQuery : ?Text;
    sortBy : ?Text; // "price_asc" | "price_desc" | "rating" | "newest"
    featured : ?Bool;
  };

  public type CreateProductInput = {
    name : Text;
    description : Text;
    price : Nat;
    category : Category;
    imageUrl : Text;
    imageKey : Text;
    stock : Nat;
    featured : Bool;
    discount : Nat;
    bundleIds : [Nat];
  };
};
