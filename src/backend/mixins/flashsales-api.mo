import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import AccessControl "mo:caffeineai-authorization/access-control";
import FlashSaleTypes "../types/flashsales";
import FlashSaleLib "../lib/flashsales";

mixin (
  accessControlState : AccessControl.AccessControlState,
  flashSaleStore : List.List<FlashSaleTypes.FlashSale>,
  nextFlashSaleId : { var value : Nat },
) {
  public shared ({ caller }) func createFlashSale(input : FlashSaleTypes.CreateFlashSaleInput) : async FlashSaleTypes.FlashSale {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can create flash sales");
    };
    let id = nextFlashSaleId.value;
    nextFlashSaleId.value += 1;
    FlashSaleLib.createFlashSale(flashSaleStore, id, input);
  };

  public query func getActiveFlashSales() : async [FlashSaleTypes.FlashSale] {
    FlashSaleLib.getActiveFlashSales(flashSaleStore, Time.now());
  };

  public shared ({ caller }) func endFlashSale(id : Nat) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can end flash sales");
    };
    FlashSaleLib.endFlashSale(flashSaleStore, id);
  };
};
