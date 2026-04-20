module {
  public type UserProfile = {
    id : Principal;
    name : Text;
    email : Text;
    phone : Text;
    createdAt : Int;
    addresses : [Address];
  };

  public type Address = {
    tag : Text; // "home" | "work" | "other"
    street : Text;
    city : Text;
    state : Text;
    postalCode : Text;
    country : Text;
    isDefault : Bool;
  };

  public type RegisterUserInput = {
    name : Text;
    email : Text;
    phone : Text;
  };

  public type UpdateUserInput = {
    name : Text;
    email : Text;
    phone : Text;
    addresses : [Address];
  };

  public type ActivityType = {
    #Login;
    #Logout;
    #ProductView;
    #CartAdd;
    #CartRemove;
    #WishlistAdd;
    #WishlistRemove;
    #SearchQuery;
    #OrderPlaced;
    #ReviewSubmitted;
    #ProfileUpdated;
    #AddressAdded;
    #NewsletterSignup;
    #CouponUsed;
    #B2BInquiry;
  };

  public type UserActivity = {
    id : Nat;
    userId : Principal;
    activityType : ActivityType;
    metadata : Text; // JSON string: product ID, search query, etc.
    timestamp : Int;
  };

  public type EnrichedCustomerProfile = {
    id : Principal;
    name : Text;
    email : Text;
    phone : Text;
    createdAt : Int;
    totalOrders : Nat;
    totalSpend : Nat;
    lastLogin : ?Int;
    activityCount : Nat;
    status : Text; // "New" | "Active" | "VIP"
  };
};
