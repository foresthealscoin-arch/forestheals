module {
  public type Review = {
    id : Nat;
    productId : Nat;
    userId : Principal;
    rating : Nat; // 1-5
    text : Text;
    verified : Bool;
    createdAt : Int;
    approved : Bool;
  };

  public type AddReviewInput = {
    productId : Nat;
    rating : Nat;
    text : Text;
  };
};
