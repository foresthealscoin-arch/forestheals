import List "mo:core/List";
import Map "mo:core/Map";
import Set "mo:core/Set";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import OutCall "mo:caffeineai-http-outcalls/outcall";
import Stripe "mo:caffeineai-stripe/stripe";
import ProductLib "lib/products";
import Migration "migration";

import ProductTypes "types/products";
import OrderTypes "types/orders";
import ReviewTypes "types/reviews";
import CouponTypes "types/coupons";
import B2BTypes "types/b2b";
import FlashSaleTypes "types/flashsales";
import AdminTypes "types/admin";
import UserTypes "types/users";

import ProductsApi "mixins/products-api";
import CartApi "mixins/cart-api";
import OrdersApi "mixins/orders-api";
import ReviewsApi "mixins/reviews-api";
import WishlistApi "mixins/wishlist-api";
import CouponsApi "mixins/coupons-api";
import CommunityApi "mixins/community-api";
import B2BApi "mixins/b2b-api";
import RecommendationsApi "mixins/recommendations-api";
import FlashSalesApi "mixins/flashsales-api";
import AdminApi "mixins/admin-api";
import AdminExtendedApi "mixins/admin-extended-api";
import UsersApi "mixins/users-api";
import ActivityApi "mixins/activity-api";


(with migration = Migration.run)
actor {
  // --- Authorization ---
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // --- Stripe config ---
  var stripeConfiguration : ?Stripe.StripeConfiguration = null;

  // --- Counter state ---
  var nextProductId : { var value : Nat } = { var value = 1 };
  var nextOrderId : { var value : Nat } = { var value = 1 };
  var nextReviewId : { var value : Nat } = { var value = 1 };
  var nextInquiryId : { var value : Nat } = { var value = 1 };
  var nextFlashSaleId : { var value : Nat } = { var value = 1 };
  var nextActivityId : { var value : Nat } = { var value = 1 };

  // --- Domain state ---
  let productStore = List.empty<ProductTypes.Product>();
  let cartStore = Map.empty<Principal, List.List<OrderTypes.CartItem>>();
  let orderStore = List.empty<OrderTypes.Order>();
  let reviewStore = List.empty<ReviewTypes.Review>();
  let wishlistStore = Map.empty<Principal, Set.Set<Nat>>();
  let couponStore = Map.empty<Text, CouponTypes.Coupon>();
  let emailStore = Set.empty<Text>();
  let inquiryStore = List.empty<B2BTypes.B2BInquiry>();
  let flashSaleStore = List.empty<FlashSaleTypes.FlashSale>();
  let userStore = Map.empty<Principal, UserTypes.UserProfile>();
  let activityStore = Map.empty<Nat, UserTypes.UserActivity>();

  // --- Admin extended state ---
  let teamMemberStore = List.empty<AdminTypes.TeamMember>();
  let taskStore = List.empty<AdminTypes.AdminTask>();
  let expenseStore = List.empty<AdminTypes.AdminExpense>();
  let blogPostStore = List.empty<AdminTypes.BlogPost>();
  let notificationStore = List.empty<AdminTypes.AdminNotification>();
  var storeSettingsState : { var settings : ?AdminTypes.StoreSettings } = { var settings = null };
  let adminCouponStore = List.empty<AdminTypes.AdminCoupon>();
  let inventoryStore = Map.empty<Text, AdminTypes.InventoryItem>();

  // --- Auto-seed products on first initialization ---
  ProductLib.seedProducts(productStore);
  if (productStore.size() > 0 and nextProductId.value == 1) {
    nextProductId.value := productStore.size() + 1;
  };

  // --- Domain API Mixins ---
  include ProductsApi(accessControlState, productStore, nextProductId);
  include CartApi(accessControlState, cartStore);
  include OrdersApi(accessControlState, orderStore, nextOrderId, couponStore, productStore);
  include ReviewsApi(accessControlState, reviewStore, nextReviewId, productStore);
  include WishlistApi(accessControlState, wishlistStore);
  include CouponsApi(accessControlState, couponStore);
  include CommunityApi(accessControlState, emailStore);
  include B2BApi(accessControlState, inquiryStore, nextInquiryId);
  include RecommendationsApi(productStore);
  include FlashSalesApi(accessControlState, flashSaleStore, nextFlashSaleId);
  include AdminApi(accessControlState, productStore, orderStore);
  include AdminExtendedApi(teamMemberStore, taskStore, expenseStore, blogPostStore, notificationStore, storeSettingsState, adminCouponStore, inventoryStore, orderStore, userStore, activityStore);
  include UsersApi(accessControlState, userStore, orderStore);
  include ActivityApi(accessControlState, userStore, activityStore, nextActivityId, orderStore);

  // --- Stripe endpoints ---
  public query func isStripeConfigured() : async Bool {
    stripeConfiguration != null;
  };

  public shared ({ caller }) func setStripeConfiguration(config : Stripe.StripeConfiguration) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can configure Stripe");
    };
    stripeConfiguration := ?config;
  };

  public shared ({ caller }) func createCheckoutSession(
    items : [Stripe.ShoppingItem],
    successUrl : Text,
    cancelUrl : Text,
  ) : async Text {
    let config = switch (stripeConfiguration) {
      case null {
        Runtime.trap("Stripe not configured");
      };
      case (?c) c;
    };
    await Stripe.createCheckoutSession(config, caller, items, successUrl, cancelUrl, transform);
  };

  public func getStripeSessionStatus(sessionId : Text) : async Stripe.StripeSessionStatus {
    let config = switch (stripeConfiguration) {
      case null {
        Runtime.trap("Stripe not configured");
      };
      case (?c) c;
    };
    await Stripe.getSessionStatus(config, sessionId, transform);
  };

  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };
};
