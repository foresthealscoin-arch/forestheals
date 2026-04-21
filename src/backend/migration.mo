import List "mo:core/List";
import Iter "mo:core/Iter";
import Text "mo:core/Text";
import OrderTypes "types/orders";

module {
  // ── Old types (inline from .old/src/backend/types/orders.mo) ──────────────
  type OldAddress = {
    street : Text;
    city : Text;
    state : Text;
    postalCode : Text;
    country : Text;
    gstNumber : ?Text;
  };

  type OldCartItem = {
    productId : Nat;
    quantity : Nat;
    price : Nat;
  };

  type OldOrderStatus = {
    #pending;
    #processing;
    #shipped;
    #delivered;
    #cancelled;
  };

  type OldPaymentMethod = {
    #stripe;
    #cod;
  };

  type OldOrder = {
    id : Nat;
    userId : Principal;
    items : [OldCartItem];
    totalAmount : Nat;
    status : OldOrderStatus;
    paymentMethod : OldPaymentMethod;
    address : OldAddress;
    createdAt : Int;
    stripePaymentId : ?Text;
    couponCode : ?Text;
    discountAmount : Nat;
  };

  // ── Migration helpers ──────────────────────────────────────────────────────

  // Migrate an old Address to the new Address.
  // The backend packed fullName|phone|line1|line2 into the `street` field
  // using pipe separators. Parse that back out; fall back gracefully for
  // plain old addresses that were not pipe-encoded.
  func migrateAddress(old : OldAddress) : OrderTypes.Address {
    let parts = old.street.split(#char '|').toArray();
    let fullName = if (parts.size() > 0) { parts[0] } else { "" };
    let phone    = if (parts.size() > 1) { parts[1] } else { "" };
    let line1    = if (parts.size() > 2) { parts[2] } else { old.street };
    let line2    = if (parts.size() > 3 and parts[3] != "") { ?parts[3] } else { null };
    {
      fullName;
      phone;
      line1;
      line2;
      city      = old.city;
      state     = old.state;
      pincode   = old.postalCode;
      country   = old.country;
      gstNumber = old.gstNumber;
    };
  };

  // Migrate an old Order to the new Order.
  // Adds `updatedAt` (set to `createdAt`) and migrates the Address shape.
  func migrateOrder(old : OldOrder) : OrderTypes.Order {
    {
      id             = old.id;
      userId         = old.userId;
      items          = old.items;
      totalAmount    = old.totalAmount;
      status         = old.status;
      paymentMethod  = old.paymentMethod;
      address        = migrateAddress(old.address);
      createdAt      = old.createdAt;
      updatedAt      = old.createdAt; // initialise updatedAt = createdAt
      stripePaymentId = old.stripePaymentId;
      couponCode     = old.couponCode;
      discountAmount = old.discountAmount;
    };
  };

  // ── Actor state shapes ─────────────────────────────────────────────────────

  type OldActor = {
    orderStore : List.List<OldOrder>;
  };

  type NewActor = {
    orderStore : List.List<OrderTypes.Order>;
  };

  // ── Public migration entry point ───────────────────────────────────────────

  public func run(old : OldActor) : NewActor {
    let newOrders = List.empty<OrderTypes.Order>();
    for (o in old.orderStore.values()) {
      newOrders.add(migrateOrder(o));
    };
    { orderStore = newOrders };
  };
};
