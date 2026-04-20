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
};
