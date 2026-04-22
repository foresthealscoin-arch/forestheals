module {
  public type OrderStatus = {
    #pending;
    #confirmed;
    #processing;
    #shipped;
    #completed;
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
    productType : ?Text; // "edible" | "non-edible" | null — used for return eligibility
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
    notes : ?Text;
  };

  public type CreateOrderInput = {
    items : [CartItem];
    paymentMethod : PaymentMethod;
    address : Address;
    couponCode : ?Text;
    stripePaymentId : ?Text;
    notes : ?Text;
    userId : ?Text; // optional explicit userId override (ignored server-side; caller principal is used)
    addressId : ?Text; // optional saved address ID reference
  };
};
