import List "mo:core/List";
import FlashSaleTypes "../types/flashsales";

module {
  public type FlashSaleStore = List.List<FlashSaleTypes.FlashSale>;

  public func createFlashSale(
    store : FlashSaleStore,
    nextId : Nat,
    input : FlashSaleTypes.CreateFlashSaleInput,
  ) : FlashSaleTypes.FlashSale {
    let sale : FlashSaleTypes.FlashSale = {
      id = nextId;
      productId = input.productId;
      discountPercent = input.discountPercent;
      startTime = input.startTime;
      endTime = input.endTime;
      active = true;
    };
    store.add(sale);
    sale;
  };

  public func getActiveFlashSales(store : FlashSaleStore, now : Int) : [FlashSaleTypes.FlashSale] {
    store.filter(func(s) {
      s.active and s.startTime <= now and s.endTime >= now
    }).toArray();
  };

  public func endFlashSale(store : FlashSaleStore, id : Nat) : Bool {
    var found = false;
    store.mapInPlace(func(s) {
      if (s.id == id) {
        found := true;
        { s with active = false };
      } else { s };
    });
    found;
  };
};
