import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import AccessControl "mo:caffeineai-authorization/access-control";
import CouponTypes "../types/coupons";
import CouponLib "../lib/coupons";

mixin (
  accessControlState : AccessControl.AccessControlState,
  couponStore : Map.Map<Text, CouponTypes.Coupon>,
) {
  public query func validateCoupon(code : Text) : async CouponTypes.CouponValidation {
    CouponLib.validateCoupon(couponStore, code, Time.now());
  };

  public shared ({ caller }) func redeemCoupon(code : Text) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to redeem coupons");
    };
    CouponLib.redeemCoupon(couponStore, code, Time.now());
  };

  public shared ({ caller }) func createCoupon(input : CouponTypes.CreateCouponInput) : async CouponTypes.Coupon {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can create coupons");
    };
    CouponLib.createCoupon(couponStore, input);
  };

  public shared ({ caller }) func deleteCoupon(code : Text) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete coupons");
    };
    let sizeBefore = couponStore.size();
    couponStore.remove(code);
    couponStore.size() < sizeBefore;
  };

  public query ({ caller }) func getCoupons() : async [CouponTypes.Coupon] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can list coupons");
    };
    CouponLib.listCoupons(couponStore);
  };
};
