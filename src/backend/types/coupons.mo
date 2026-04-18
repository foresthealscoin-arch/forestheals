module {
  public type Coupon = {
    code : Text;
    discountPercent : Nat; // 0-100
    maxUses : Nat;
    usedCount : Nat;
    active : Bool;
    expiryDate : Int; // Timestamp
  };

  public type CouponValidation = {
    valid : Bool;
    discountPercent : Nat;
    message : Text;
  };

  public type CreateCouponInput = {
    code : Text;
    discountPercent : Nat;
    maxUses : Nat;
    expiryDate : Int;
  };
};
