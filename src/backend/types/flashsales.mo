module {
  public type FlashSale = {
    id : Nat;
    productId : Nat;
    discountPercent : Nat;
    startTime : Int;
    endTime : Int;
    active : Bool;
  };

  public type CreateFlashSaleInput = {
    productId : Nat;
    discountPercent : Nat;
    startTime : Int;
    endTime : Int;
  };
};
