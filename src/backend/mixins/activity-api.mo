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
  activityStore : Map.Map<Nat, UserTypes.UserActivity>,
  nextActivityId : { var value : Nat },
  orderStore : List.List<OrderTypes.Order>,
) {
  /// Log an activity for the authenticated caller.
  /// Available to any authenticated (non-anonymous) user.
  public shared ({ caller }) func logUserActivity(
    activityType : UserTypes.ActivityType,
    metadata : Text,
  ) : async UserTypes.UserActivity {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: Must be authenticated to log activity");
    };
    UserLib.addActivity(activityStore, nextActivityId, caller, activityType, metadata);
  };

  /// Get activities for a user.
  /// - Authenticated users can query their own activities (pass null).
  /// - Admins may pass a specific userId to see any user's activities.
  public query ({ caller }) func getUserActivities(userId : ?Principal) : async [UserTypes.UserActivity] {
    switch (userId) {
      case null {
        // Caller fetches their own activities
        if (caller.isAnonymous()) { return [] };
        UserLib.getActivitiesForUser(activityStore, caller);
      };
      case (?uid) {
        // Admin-only: fetch another user's activities
        if (not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Only admins can view other users' activities");
        };
        UserLib.getActivitiesForUser(activityStore, uid);
      };
    };
  };

  /// Get all activities across all users (admin-only).
  public query ({ caller }) func getAllActivities() : async [UserTypes.UserActivity] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view all activities");
    };
    UserLib.getAllActivities(activityStore);
  };

  /// Get an enriched customer profile including order stats and activity info (admin-only).
  public query ({ caller }) func getCustomerProfile(userId : Principal) : async ?UserTypes.EnrichedCustomerProfile {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view enriched customer profiles");
    };
    switch (UserLib.getProfile(userStore, userId)) {
      case null { null };
      case (?profile) {
        ?UserLib.enrichProfile(profile, orderStore, activityStore);
      };
    };
  };

  /// Get all customers as enriched profiles (admin-only).
  public query ({ caller }) func getAllCustomersEnriched() : async [UserTypes.EnrichedCustomerProfile] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can list enriched customers");
    };
    let profiles = UserLib.listAllUsers(userStore);
    profiles.map<UserTypes.UserProfile, UserTypes.EnrichedCustomerProfile>(func(p) {
      UserLib.enrichProfile(p, orderStore, activityStore);
    });
  };
};
