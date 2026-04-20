import Map "mo:core/Map";
import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import AccessControl "mo:caffeineai-authorization/access-control";
import UserTypes "../types/users";
import OrderTypes "../types/orders";
import UserLib "../lib/users";

mixin (
  accessControlState : AccessControl.AccessControlState,
  userStore : Map.Map<Principal, UserTypes.UserProfile>,
  orderStore : List.List<OrderTypes.Order>,
) {
  /// Register or update a user profile after authentication
  public shared ({ caller }) func registerUser(input : UserTypes.RegisterUserInput) : async UserTypes.UserProfile {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: Must be authenticated to register");
    };
    UserLib.registerUser(userStore, caller, input);
  };

  public query ({ caller }) func getUserProfile() : async ?UserTypes.UserProfile {
    if (caller.isAnonymous()) {
      return null;
    };
    UserLib.getProfile(userStore, caller);
  };

  public shared ({ caller }) func updateUserProfile(input : UserTypes.UpdateUserInput) : async ?UserTypes.UserProfile {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: Must be authenticated to update profile");
    };
    UserLib.updateProfile(userStore, caller, input);
  };

  /// Returns all customers as basic profiles (admin-only).
  /// For enriched profiles with order stats, use getAllCustomersEnriched from activity-api.
  public query ({ caller }) func getAllCustomers() : async [UserTypes.UserProfile] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can list all customers");
    };
    UserLib.listAllUsers(userStore);
  };
};
