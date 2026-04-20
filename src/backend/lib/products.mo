import List "mo:core/List";
import Map "mo:core/Map";
import Types "../types/products";
import CommonTypes "../types/common";

module {
  public type ProductStore = List.List<Types.Product>;
  public type ProductMap = Map.Map<CommonTypes.ProductId, Types.Product>;

  public func createProduct(
    store : ProductStore,
    nextId : Nat,
    input : Types.CreateProductInput,
  ) : Types.Product {
    let product : Types.Product = {
      id = nextId;
      name = input.name;
      description = input.description;
      price = input.price;
      category = input.category;
      imageUrl = input.imageUrl;
      imageKey = input.imageKey;
      stock = input.stock;
      ratings = 0.0;
      reviewCount = 0;
      featured = input.featured;
      bestseller = input.bestseller;
      discount = input.discount;
      bundleIds = input.bundleIds;
    };
    store.add(product);
    product;
  };

  public func updateProduct(
    store : ProductStore,
    id : Nat,
    input : Types.CreateProductInput,
  ) : Bool {
    var found = false;
    store.mapInPlace(func(p) {
      if (p.id == id) {
        found := true;
        {
          p with
          name = input.name;
          description = input.description;
          price = input.price;
          category = input.category;
          imageUrl = input.imageUrl;
          imageKey = input.imageKey;
          stock = input.stock;
          featured = input.featured;
          bestseller = input.bestseller;
          discount = input.discount;
          bundleIds = input.bundleIds;
        };
      } else { p };
    });
    found;
  };

  public func deleteProduct(store : ProductStore, id : Nat) : Bool {
    let sizeBefore = store.size();
    let filtered = store.filter(func(p) { p.id != id });
    store.clear();
    store.append(filtered);
    store.size() < sizeBefore;
  };

  public func getProduct(store : ProductStore, id : Nat) : ?Types.Product {
    store.find(func(p) { p.id == id });
  };

  public func listProducts(
    store : ProductStore,
    filter : Types.ProductFilter,
  ) : [Types.Product] {
    var results = store.filter(func(p) {
      let catMatch = switch (filter.category) {
        case null { true };
        case (?c) { p.category == c };
      };
      let minPriceMatch = switch (filter.minPrice) {
        case null { true };
        case (?mp) { p.price >= mp };
      };
      let maxPriceMatch = switch (filter.maxPrice) {
        case null { true };
        case (?mp) { p.price <= mp };
      };
      let ratingMatch = switch (filter.minRating) {
        case null { true };
        case (?mr) { p.ratings >= mr };
      };
      let searchMatch = switch (filter.searchQuery) {
        case null { true };
        case (?q) {
          let lower = q.toLower();
          p.name.toLower().contains(#text lower) or p.description.toLower().contains(#text lower);
        };
      };
      let featuredMatch = switch (filter.featured) {
        case null { true };
        case (?f) { p.featured == f };
      };
      catMatch and minPriceMatch and maxPriceMatch and ratingMatch and searchMatch and featuredMatch;
    });

    let arr = results.toArray();

    switch (filter.sortBy) {
      case (?"price_asc") {
        arr.sort(func(a, b) {
          if (a.price < b.price) #less
          else if (a.price > b.price) #greater
          else #equal
        });
      };
      case (?"price_desc") {
        arr.sort(func(a, b) {
          if (a.price > b.price) #less
          else if (a.price < b.price) #greater
          else #equal
        });
      };
      case (?"rating") {
        arr.sort(func(a, b) {
          if (a.ratings > b.ratings) #less
          else if (a.ratings < b.ratings) #greater
          else #equal
        });
      };
      case (?"newest") {
        arr.sort(func(a, b) {
          if (a.id > b.id) #less
          else if (a.id < b.id) #greater
          else #equal
        });
      };
      case _ { arr };
    };
  };

  public func listFeaturedProducts(store : ProductStore) : [Types.Product] {
    store.filter(func(p) { p.featured }).toArray();
  };

  public func listBundles(store : ProductStore) : [Types.Product] {
    store.filter(func(p) { p.bundleIds.size() > 0 }).toArray();
  };

  public func toggleFeatured(store : ProductStore, id : Nat) : Bool {
    var found = false;
    store.mapInPlace(func(p) {
      if (p.id == id) {
        found := true;
        { p with featured = not p.featured };
      } else { p };
    });
    found;
  };

  public func toggleBestseller(store : ProductStore, id : Nat) : Bool {
    var found = false;
    store.mapInPlace(func(p) {
      if (p.id == id) {
        found := true;
        { p with bestseller = not p.bestseller };
      } else { p };
    });
    found;
  };

  public func updateRating(store : ProductStore, productId : Nat, newRating : Float, newCount : Nat) : () {
    store.mapInPlace(func(p) {
      if (p.id == productId) {
        { p with ratings = newRating; reviewCount = newCount };
      } else { p };
    });
  };

  public func decreaseStock(store : ProductStore, productId : Nat, qty : Nat) : () {
    store.mapInPlace(func(p) {
      if (p.id == productId) {
        let newStock = if (p.stock >= qty) { p.stock - qty } else { 0 };
        { p with stock = newStock };
      } else { p };
    });
  };

  public func increaseStock(store : ProductStore, productId : Nat, qty : Nat) : () {
    store.mapInPlace(func(p) {
      if (p.id == productId) {
        { p with stock = p.stock + qty };
      } else { p };
    });
  };

  public func seedProducts(store : ProductStore) : () {
    if (store.size() > 0) { return };

    let products : [(Text, Text, Nat, Text, Text, Bool, [Nat])] = [
      ("Brahmi", "For Memory & Focus. Premium Ayurvedic herb powder supports cognitive function, memory retention, and mental clarity.", 299, "Ayurvedic Powders", "/assets/products/brahmi_forestheals_1-019d9662-2c41-75bc-a5b8-eb510ab47ee9.jpg", true, [1, 6, 11]),
      ("Cinnamon", "For Metabolism & Blood Sugar Balance. Natural spice powder that supports healthy glucose metabolism and circulation.", 199, "Natural Spices", "/assets/products/cinnamon_1-019d9662-2c73-768d-b29f-7e504b14299c.jpg", false, []),
      ("Organic Moringa", "For Daily Nutrition & Energy. Premium leaf extract packed with vitamins, minerals, and antioxidants.", 349, "Ayurvedic Powders", "/assets/products/organic_moringa_forestheals_1-019d9662-2c82-721a-8a13-e9acf8587930.jpg", true, []),
      ("Organic Neem Powder", "For Skin & Detox Support. Pure neem leaf powder for natural skin purification and body detoxification.", 249, "Ayurvedic Powders", "/assets/products/organic_neem_powder_forestheals_1-019d9662-2c74-7308-abad-c167097c463a.jpg", false, [4, 7, 6]),
      ("Triphala Churan", "For Gut Health & Detox. Ancient Ayurvedic blend of three fruits for digestive wellness and cleansing.", 299, "Ayurvedic Powders", "/assets/products/triphala_churan_forestheals_1-019d9662-2c85-7188-a222-c19b81ea8ecd.jpg", true, []),
      ("Organic Amla Powder", "For Immunity & Vitality. Lab-tested Indian gooseberry powder rich in Vitamin C and antioxidants.", 279, "Ayurvedic Powders", "/assets/products/organic_amla_powder_forestheals_1-019d9662-2c78-73db-94e2-e64ae483c495.jpg", true, [4, 7, 6, 1, 6, 11]),
      ("Multani Mitti Powder", "Natural Clay Face Mask. Pure Fuller's Earth clay for deep skin cleansing, oil control, and natural glow.", 199, "Skincare", "/assets/products/multani_mitti_powder_forestheals_1-019d9662-2c84-7164-bf87-f59decd6634d.jpg", false, [4, 7, 6]),
      ("Garam Masala", "For Rich Flavor & Aroma. Premium blend of aromatic spices with warmth and depth.", 179, "Natural Spices", "/assets/products/garam_masala_forestheals-019d9662-2c51-704f-abcb-094263a014c6.jpg", false, []),
      ("Chia Seeds", "For Energy & Weight Management. Omega-3 rich super seeds for sustained energy and digestive health.", 399, "Super Seeds", "/assets/products/chia_seeds_forestheals_1-019d9662-2c56-71f6-b7e7-553e750172d8.jpg", true, []),
      ("Cloves", "For Immunity & Oral Health. Antioxidant-rich cloves for immune support, oral health, and natural pain relief.", 249, "Natural Spices", "/assets/products/cloves_forestheals_1-019d9662-2c47-771f-87f4-0c6fdde85069.jpg", false, []),
      ("Shatavari", "For Hormonal Balance & Strength. Revered Ayurvedic root for women's health, hormonal support, and vitality.", 449, "Ayurvedic Powders", "/assets/products/satavari_forestheals_1-019d9662-2c7c-7462-8db5-4fd3a37c660b.jpg", true, [1, 6, 11]),
      ("Cardamom", "For Digestion & Fresh Breath. Premium green cardamom powder for digestive health and natural breath freshening.", 599, "Natural Spices", "/assets/products/cardamom_forestheals_1-019d9662-2cdf-7169-8205-fa46e0f05b04.jpg", false, []),
      ("Mulethi", "For Throat & Respiratory Health. Pure licorice root powder for soothing throat, respiratory support, and immunity.", 299, "Ayurvedic Powders", "/assets/products/mulethi_forestheals_1-019d9662-2d26-7704-9f21-4f4a46faca96.jpg", false, []),
      ("Sunflower Seeds", "For Skin & Heart Health. Nutrient-dense seeds rich in Vitamin E for glowing skin and heart wellness.", 229, "Super Seeds", "/assets/products/sunflower_seeds_forestheals_1-019d9662-2d75-74be-b50e-feacf4e8d285.jpg", false, []),
      ("Dry Ginger", "For Digestion & Warmth. Premium dried ginger powder for digestive fire, circulation, and anti-inflammatory benefits.", 199, "Natural Spices", "/assets/products/dry_ginger_forestheals-019d9662-2d3d-77ce-8673-04553a7fe9be.jpg", false, []),
      ("Tulsi Powder", "For Stress Support. Organic holy basil leaf extract for stress relief, immunity, and respiratory health.", 279, "Ayurvedic Powders", "/assets/products/tulsi_powder_forestheals_1-019d9662-2d6f-72cb-8582-1341f99b1447.jpg", false, []),
      ("Sesame Seeds", "For Strength & Healthy Fats. Calcium and protein rich seeds for bone health, energy, and skin nourishment.", 189, "Super Seeds", "/assets/products/sesame_seeds_forestheals_1-019d9662-2d6a-7391-aa08-b9cc252e63a3.jpg", false, []),
      ("Tej Patta (Bay Leaf)", "For Digestion & Flavor. Aromatic bay leaves for digestive support, blood sugar regulation, and culinary use.", 149, "Natural Spices", "/assets/products/tej_patta_forestheals_1-019d9662-2fc8-7000-abd2-43f604694f2f.jpg", false, []),
      ("Organic Ashwagandha", "Calm. Restore. Sleep. Lab-tested 7% Withanolides for stress relief, energy restoration, and deep sleep.", 499, "Ayurvedic Powders", "/assets/products/organic_ashwagandha_forestheals_1-019d9662-2fc6-7459-b0c5-2c13876dc59e.jpg", true, []),
      ("Pumpkin Seeds", "For Protein & Muscle Recovery. High-protein super seeds with zinc and magnesium for muscle recovery and immunity.", 349, "Super Seeds", "/assets/products/pumpkin_seeds_forestheals_1-019d9662-2fda-7351-b12d-afe0f0816e26.jpg", true, []),
    ];

    var idx = 1;
    for ((name, desc, price, cat, img, featured, bundles) in products.values()) {
      let product : Types.Product = {
        id = idx;
        name = name;
        description = desc;
        price = price;
        category = cat;
        imageUrl = img;
        imageKey = "";
        stock = 100;
        ratings = 0.0;
        reviewCount = 0;
        featured = featured;
        bestseller = false;
        discount = 0;
        bundleIds = bundles;
      };
      store.add(product);
      idx += 1;
    };
  };
};
