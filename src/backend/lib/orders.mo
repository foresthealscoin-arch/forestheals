import List "mo:core/List";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import OrderTypes "../types/orders";

module {
  public type OrderStore = List.List<OrderTypes.Order>;

  public func createOrder(
    store : OrderStore,
    nextId : Nat,
    userId : Principal,
    input : OrderTypes.CreateOrderInput,
    discountAmount : Nat,
    totalAmount : Nat,
  ) : OrderTypes.Order {
    let order : OrderTypes.Order = {
      id = nextId;
      userId = userId;
      items = input.items;
      totalAmount = totalAmount;
      status = #pending;
      paymentMethod = input.paymentMethod;
      address = input.address;
      createdAt = Time.now();
      stripePaymentId = input.stripePaymentId;
      couponCode = input.couponCode;
      discountAmount = discountAmount;
    };
    store.add(order);
    order;
  };

  public func getOrder(store : OrderStore, id : Nat) : ?OrderTypes.Order {
    store.find(func(o) { o.id == id });
  };

  public func listUserOrders(store : OrderStore, userId : Principal) : [OrderTypes.Order] {
    store.filter(func(o) { Principal.equal(o.userId, userId) }).toArray();
  };

  public func listAllOrders(store : OrderStore) : [OrderTypes.Order] {
    store.toArray();
  };

  public func updateOrderStatus(
    store : OrderStore,
    id : Nat,
    status : OrderTypes.OrderStatus,
  ) : Bool {
    var found = false;
    store.mapInPlace(func(o) {
      if (o.id == id) {
        found := true;
        { o with status };
      } else { o };
    });
    found;
  };

  public func calcTotal(items : [OrderTypes.CartItem]) : Nat {
    var total = 0;
    for (item in items.values()) {
      total += item.price * item.quantity;
    };
    total;
  };
};
