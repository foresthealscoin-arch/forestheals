import List "mo:core/List";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import ReviewTypes "../types/reviews";

module {
  public type ReviewStore = List.List<ReviewTypes.Review>;

  public func addReview(
    store : ReviewStore,
    nextId : Nat,
    userId : Principal,
    input : ReviewTypes.AddReviewInput,
  ) : ReviewTypes.Review {
    let review : ReviewTypes.Review = {
      id = nextId;
      productId = input.productId;
      userId = userId;
      rating = input.rating;
      text = input.text;
      verified = false;
      createdAt = Time.now();
      approved = false;
    };
    store.add(review);
    review;
  };

  public func getProductReviews(store : ReviewStore, productId : Nat) : [ReviewTypes.Review] {
    store.filter(func(r) { r.productId == productId and r.approved }).toArray();
  };

  public func approveReview(store : ReviewStore, reviewId : Nat) : Bool {
    var found = false;
    store.mapInPlace(func(r) {
      if (r.id == reviewId) {
        found := true;
        { r with approved = true };
      } else { r };
    });
    found;
  };

  public func deleteReview(store : ReviewStore, reviewId : Nat) : Bool {
    let sizeBefore = store.size();
    let filtered = store.filter(func(r) { r.id != reviewId });
    store.clear();
    store.append(filtered);
    store.size() < sizeBefore;
  };

  public func hasUserReviewedProduct(
    store : ReviewStore,
    userId : Principal,
    productId : Nat,
  ) : Bool {
    store.find(func(r) {
      r.productId == productId and Principal.equal(r.userId, userId)
    }) != null;
  };

  public func calcAverageRating(store : ReviewStore, productId : Nat) : (Float, Nat) {
    let productReviews = store.filter(func(r) { r.productId == productId and r.approved });
    let count = productReviews.size();
    if (count == 0) { return (0.0, 0) };
    let total = productReviews.foldLeft(0, func(acc, r) { acc + r.rating });
    let avg : Float = total.toFloat() / count.toFloat();
    (avg, count);
  };
};
