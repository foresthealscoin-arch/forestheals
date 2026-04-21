module {
  public type OrderStatus = {
    #pending;
    #processing;
    #shipped;
    #delivered;
    #cancelled;
  };

  public type PaymentMethod = {
    #stripe;
    #cod;
  };

  public type Address = {
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

  public type CartItem = {
    productId : Nat;
    quantity : Nat;
    price : Nat; // snapshot price at time of add
  };

  public type Order = {
    id : Nat;
    userId : Principal;
    items : [CartItem];
    totalAmount : Nat;
    status : OrderStatus;
    paymentMethod : PaymentMethod;
    address : Address;
    createdAt : Int;
    updatedAt : Int;
    stripePaymentId : ?Text;
    couponCode : ?Text;
    discountAmount : Nat;
  };

  public type CreateOrderInput = {
    items : [CartItem];
    paymentMethod : PaymentMethod;
    address : Address;
    couponCode : ?Text;
    stripePaymentId : ?Text;
  };
};
