import Map "mo:core/Map";
import Time "mo:core/Time";
import CouponTypes "../types/coupons";

module {
  public type CouponStore = Map.Map<Text, CouponTypes.Coupon>;

  public func createCoupon(store : CouponStore, input : CouponTypes.CreateCouponInput) : CouponTypes.Coupon {
    let coupon : CouponTypes.Coupon = {
      code = input.code;
      discountPercent = input.discountPercent;
      maxUses = input.maxUses;
      usedCount = 0;
      active = true;
      expiryDate = input.expiryDate;
    };
    store.add(input.code, coupon);
    coupon;
  };

  public func validateCoupon(store : CouponStore, code : Text, now : Int) : CouponTypes.CouponValidation {
    switch (store.get(code)) {
      case null {
        { valid = false; discountPercent = 0; message = "Coupon not found" };
      };
      case (?coupon) {
        if (not coupon.active) {
          { valid = false; discountPercent = 0; message = "Coupon is inactive" };
        } else if (coupon.expiryDate < now) {
          { valid = false; discountPercent = 0; message = "Coupon has expired" };
        } else if (coupon.usedCount >= coupon.maxUses) {
          { valid = false; discountPercent = 0; message = "Coupon usage limit reached" };
        } else {
          { valid = true; discountPercent = coupon.discountPercent; message = "Coupon applied successfully" };
        };
      };
    };
  };

  public func redeemCoupon(store : CouponStore, code : Text, now : Int) : Bool {
    let validation = validateCoupon(store, code, now);
    if (not validation.valid) { return false };
    switch (store.get(code)) {
      case null { false };
      case (?coupon) {
        store.add(code, { coupon with usedCount = coupon.usedCount + 1 });
        true;
      };
    };
  };

  public func listCoupons(store : CouponStore) : [CouponTypes.Coupon] {
    store.values().toArray();
  };
};
