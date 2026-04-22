import Map "mo:core/Map";
import List "mo:core/List";
import Array "mo:core/Array";
import Principal "mo:core/Principal";

import ProductTypes "types/products";
import OrderTypes "types/orders";
import UserTypes "types/users";
import AdminTypes "types/admin";

module {
  // --- Old inline types (from backend.most snapshot) ---

  type OldCartItem = {
    productId : Nat;
    quantity : Nat;
    price : Nat;
  };

  type OldAddress_Order = {
    fullName : Text;
    phone : Text;
    line1 : Text;
    line2 : ?Text;
    city : Text;
    state : Text;
    pincode : Text;
    country : Text;
    gstNumber : ?Text;
  };

  type OldOrderStatus = {
    #pending;
    #processing;
    #shipped;
    #delivered;
    #cancelled;
  };

  type OldOrder = {
    id : Nat;
    userId : Principal;
    items : [OldCartItem];
    totalAmount : Nat;
    status : OldOrderStatus;
    paymentMethod : { #stripe; #cod };
    address : OldAddress_Order;
    createdAt : Int;
    updatedAt : Int;
    stripePaymentId : ?Text;
    couponCode : ?Text;
    discountAmount : Nat;
  };

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
    bestseller : Bool;
    discount : Nat;
    bundleIds : [Nat];
  };

  type OldAddress_User = {
    city : Text;
    country : Text;
    isDefault : Bool;
    postalCode : Text;
    state : Text;
    street : Text;
    tag : Text;
  };

  type OldUserProfile = {
    id : Principal;
    name : Text;
    email : Text;
    phone : Text;
    createdAt : Int;
    addresses : [OldAddress_User];
  };

  type OldStoreSettings = {
    storeName : Text;
    contactEmail : Text;
    contactPhone : Text;
    currency : Text;
    timezone : Text;
    gstNumber : Text;
    gstRate : Nat;
    freeShippingThreshold : Nat;
    shippingDefault : Nat;
    whatsappNumber : Text;
    instagramUrl : Text;
    facebookUrl : Text;
    logoUrl : Text;
    faviconUrl : Text;
    seoTitle : Text;
    seoDescription : Text;
  };

  // --- Old actor state ---

  type OldActor = {
    cartStore : Map.Map<Principal, List.List<OldCartItem>>;
    orderStore : List.List<OldOrder>;
    productStore : List.List<OldProduct>;
    userStore : Map.Map<Principal, OldUserProfile>;
    storeSettingsState : { var settings : ?OldStoreSettings };
  };

  // --- New actor state ---

  type NewActor = {
    cartStore : Map.Map<Principal, List.List<OrderTypes.CartItem>>;
    orderStore : List.List<OrderTypes.Order>;
    productStore : List.List<ProductTypes.Product>;
    userStore : Map.Map<Principal, UserTypes.UserProfile>;
    var storeSettingsState : { var settings : ?AdminTypes.StoreSettings };
  };

  // --- Helpers ---

  func migrateCartItem(old : OldCartItem) : OrderTypes.CartItem {
    { old with productType = null };
  };

  func migrateOrderStatus(old : OldOrderStatus) : OrderTypes.OrderStatus {
    switch old {
      case (#pending) #pending;
      case (#processing) #processing;
      case (#shipped) #shipped;
      case (#delivered) #completed;
      case (#cancelled) #cancelled;
    };
  };

  func migrateOrder(old : OldOrder) : OrderTypes.Order {
    let newItems = old.items.map(migrateCartItem);
    {
      id = old.id;
      userId = old.userId;
      items = newItems;
      totalAmount = old.totalAmount;
      status = migrateOrderStatus(old.status);
      paymentMethod = old.paymentMethod;
      address = old.address;
      createdAt = old.createdAt;
      updatedAt = old.updatedAt;
      stripePaymentId = old.stripePaymentId;
      couponCode = old.couponCode;
      discountAmount = old.discountAmount;
      notes = null;
    };
  };

  func migrateProduct(old : OldProduct) : ProductTypes.Product {
    {
      old with
      comparePrice = null;
      images = [];
      status = #active;
    };
  };

  func migrateUserAddress(old : OldAddress_User) : UserTypes.Address {
    {
      id = old.postalCode # "-" # old.street;
      tag = old.tag;
      fullName = "";
      phone = "";
      street = old.street;
      city = old.city;
      state = old.state;
      pincode = old.postalCode;
      country = old.country;
      isDefault = old.isDefault;
    };
  };

  func migrateUserProfile(old : OldUserProfile) : UserTypes.UserProfile {
    let newAddresses = old.addresses.map(migrateUserAddress);
    {
      id = old.id;
      name = old.name;
      email = old.email;
      phone = old.phone;
      phoneVerified = false;
      city = "";
      state = "";
      pincode = "";
      country = "";
      createdAt = old.createdAt;
      addresses = newAddresses;
    };
  };

  func migrateStoreSettings(old : OldStoreSettings) : AdminTypes.StoreSettings {
    old;
  };

  // --- Migration entry point ---

  public func run(old : OldActor) : NewActor {
    // Migrate cartStore: Map<Principal, List<OldCartItem>> → Map<Principal, List<CartItem>>
    let newCartStore = Map.empty<Principal, List.List<OrderTypes.CartItem>>();
    for ((userId, oldCart) in old.cartStore.entries()) {
      let newCart = List.empty<OrderTypes.CartItem>();
      for (item in oldCart.values()) {
        newCart.add(migrateCartItem(item));
      };
      newCartStore.add(userId, newCart);
    };

    // Migrate orderStore: List<OldOrder> → List<Order>
    let newOrderStore = List.empty<OrderTypes.Order>();
    for (order in old.orderStore.values()) {
      newOrderStore.add(migrateOrder(order));
    };

    // Migrate productStore: List<OldProduct> → List<Product>
    let newProductStore = List.empty<ProductTypes.Product>();
    for (product in old.productStore.values()) {
      newProductStore.add(migrateProduct(product));
    };

    // Migrate userStore: Map<Principal, OldUserProfile> → Map<Principal, UserProfile>
    let newUserStore = Map.empty<Principal, UserTypes.UserProfile>();
    for ((principal, profile) in old.userStore.entries()) {
      newUserStore.add(principal, migrateUserProfile(profile));
    };

    // Migrate storeSettingsState
    let newSettings : ?AdminTypes.StoreSettings = switch (old.storeSettingsState.settings) {
      case null null;
      case (?s) ?migrateStoreSettings(s);
    };
    let newStoreSettingsState : { var settings : ?AdminTypes.StoreSettings } = { var settings = newSettings };

    {
      cartStore = newCartStore;
      orderStore = newOrderStore;
      productStore = newProductStore;
      userStore = newUserStore;
      var storeSettingsState = newStoreSettingsState;
    };
  };
};
