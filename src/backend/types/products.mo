module {
  public type Category = Text; // "Ayurvedic Powders" | "Natural Spices" | "Super Seeds" | "Skincare" | "Eco-friendly"

  public type ProductStatus = {
    #active;
    #inactive;
    #draft;
  };

  public type Product = {
    id : Nat;
    name : Text;
    description : Text;
    price : Nat; // in paise (smallest unit)
    comparePrice : ?Nat; // original price before discount, in paise
    category : Category;
    imageUrl : Text;
    imageKey : Text;
    images : [Text]; // additional image URLs
    stock : Nat;
    ratings : Float;
    reviewCount : Nat;
    featured : Bool;
    bestseller : Bool;
    discount : Nat; // percentage 0-100
    bundleIds : [Nat];
    status : ProductStatus;
  };

  public type ProductFilter = {
    category : ?Text;
    minPrice : ?Nat;
    maxPrice : ?Nat;
    minRating : ?Float;
    searchQuery : ?Text;
    sortBy : ?Text; // "price_asc" | "price_desc" | "rating" | "newest"
    featured : ?Bool;
    status : ?ProductStatus;
  };

  public type CreateProductInput = {
    name : Text;
    description : Text;
    price : Nat;
    comparePrice : ?Nat;
    category : Category;
    imageUrl : Text;
    imageKey : Text;
    images : [Text];
    stock : Nat;
    featured : Bool;
    bestseller : Bool;
    discount : Nat;
    bundleIds : [Nat];
    status : ProductStatus;
  };
};
