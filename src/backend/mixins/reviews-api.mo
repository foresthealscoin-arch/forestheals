import List "mo:core/List";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import ReviewTypes "../types/reviews";
import ProductTypes "../types/products";
import ReviewLib "../lib/reviews";
import ProductLib "../lib/products";

mixin (
  accessControlState : AccessControl.AccessControlState,
  reviewStore : List.List<ReviewTypes.Review>,
  nextReviewId : { var value : Nat },
  productStore : List.List<ProductTypes.Product>,
) {
  public shared ({ caller }) func addReview(input : ReviewTypes.AddReviewInput) : async ReviewTypes.Review {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to leave a review");
    };
    if (ReviewLib.hasUserReviewedProduct(reviewStore, caller, input.productId)) {
      Runtime.trap("You have already reviewed this product");
    };
    if (input.rating < 1 or input.rating > 5) {
      Runtime.trap("Rating must be between 1 and 5");
    };
    let id = nextReviewId.value;
    nextReviewId.value += 1;
    let review = ReviewLib.addReview(reviewStore, id, caller, input);
    // Recalculate and update product rating
    let (avg, count) = ReviewLib.calcAverageRating(reviewStore, input.productId);
    ProductLib.updateRating(productStore, input.productId, avg, count);
    review;
  };

  public query func getProductReviews(productId : Nat) : async [ReviewTypes.Review] {
    ReviewLib.getProductReviews(reviewStore, productId);
  };

  public shared ({ caller }) func approveReview(reviewId : Nat) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can approve reviews");
    };
    let result = ReviewLib.approveReview(reviewStore, reviewId);
    // Recalculate rating for the affected product after approval
    switch (reviewStore.find(func(r) { r.id == reviewId })) {
      case null {};
      case (?review) {
        let (avg, count) = ReviewLib.calcAverageRating(reviewStore, review.productId);
        ProductLib.updateRating(productStore, review.productId, avg, count);
      };
    };
    result;
  };

  public shared ({ caller }) func deleteReview(reviewId : Nat) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete reviews");
    };
    ReviewLib.deleteReview(reviewStore, reviewId);
  };
};
