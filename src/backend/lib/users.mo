import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import UserTypes "../types/users";
import OrderTypes "../types/orders";

module {
  public type UserStore = Map.Map<Principal, UserTypes.UserProfile>;
  public type ActivityStore = Map.Map<Nat, UserTypes.UserActivity>;
  public type OrderStore = List.List<OrderTypes.Order>;

  public func registerUser(
    store : UserStore,
    userId : Principal,
    input : UserTypes.RegisterUserInput,
  ) : UserTypes.UserProfile {
    let profile : UserTypes.UserProfile = {
      id = userId;
      name = input.name;
      email = input.email;
      phone = input.phone;
      phoneVerified = false;
      city = "";
      state = "";
      pincode = "";
      country = "India";
      createdAt = Time.now();
      addresses = [];
    };
    store.add(userId, profile);
    profile;
  };

  public func getProfile(store : UserStore, userId : Principal) : ?UserTypes.UserProfile {
    store.get(userId);
  };

  public func updateProfile(
    store : UserStore,
    userId : Principal,
    input : UserTypes.UpdateUserInput,
  ) : ?UserTypes.UserProfile {
    switch (store.get(userId)) {
      case null { null };
      case (?existing) {
        let updated : UserTypes.UserProfile = {
          existing with
          name = input.name;
          email = input.email;
          phone = input.phone;
          city = input.city;
          state = input.state;
          pincode = input.pincode;
          country = input.country;
          addresses = input.addresses;
        };
        store.add(userId, updated);
        ?updated;
      };
    };
  };

  public func listAllUsers(store : UserStore) : [UserTypes.UserProfile] {
    store.values().toArray();
  };

  /// Record an activity for a user.
  public func addActivity(
    activityStore : ActivityStore,
    nextId : { var value : Nat },
    userId : Principal,
    activityType : UserTypes.ActivityType,
    metadata : Text,
  ) : UserTypes.UserActivity {
    let id = nextId.value;
    nextId.value += 1;
    let activity : UserTypes.UserActivity = {
      id;
      userId;
      activityType;
      metadata;
      timestamp = Time.now();
    };
    activityStore.add(id, activity);
    activity;
  };

  /// Return activities for a specific user, sorted newest-first.
  public func getActivitiesForUser(
    activityStore : ActivityStore,
    userId : Principal,
  ) : [UserTypes.UserActivity] {
    let all = activityStore.values().toArray();
    let filtered = all.filter(func(a : UserTypes.UserActivity) : Bool {
      Principal.equal(a.userId, userId)
    });
    filtered.sort(func(a : UserTypes.UserActivity, b : UserTypes.UserActivity) : { #less; #equal; #greater } {
      if (a.timestamp > b.timestamp) { #less } else if (a.timestamp < b.timestamp) { #greater } else { #equal }
    });
  };

  /// Return all activities sorted newest-first.
  public func getAllActivities(activityStore : ActivityStore) : [UserTypes.UserActivity] {
    let all = activityStore.values().toArray();
    all.sort(func(a : UserTypes.UserActivity, b : UserTypes.UserActivity) : { #less; #equal; #greater } {
      if (a.timestamp > b.timestamp) { #less } else if (a.timestamp < b.timestamp) { #greater } else { #equal }
    });
  };

  /// Build an enriched profile for a single user by joining with orders + activities.
  public func enrichProfile(
    profile : UserTypes.UserProfile,
    orderStore : OrderStore,
    activityStore : ActivityStore,
  ) : UserTypes.EnrichedCustomerProfile {
    var totalOrders : Nat = 0;
    var totalSpend : Nat = 0;
    orderStore.forEach(func(o : OrderTypes.Order) {
      if (Principal.equal(o.userId, profile.id)) {
        totalOrders += 1;
        totalSpend += o.totalAmount;
      };
    });

    let activities = getAllActivities(activityStore);
    var lastLogin : ?Int = null;
    var activityCount : Nat = 0;
    for (a in activities.values()) {
      if (Principal.equal(a.userId, profile.id)) {
        activityCount += 1;
        switch (a.activityType) {
          case (#Login) {
            switch (lastLogin) {
              case null { lastLogin := ?a.timestamp };
              case (?existing) {
                if (a.timestamp > existing) { lastLogin := ?a.timestamp };
              };
            };
          };
          case (_) {};
        };
      };
    };

    let status = if (totalSpend >= 5000) { "VIP" } else if (totalOrders > 0) { "Active" } else { "New" };
    {
      id = profile.id;
      name = profile.name;
      email = profile.email;
      phone = profile.phone;
      city = profile.city;
      state = profile.state;
      pincode = profile.pincode;
      country = profile.country;
      addresses = profile.addresses;
      createdAt = profile.createdAt;
      totalOrders;
      totalSpend;
      lastLogin;
      activityCount;
      status;
    };
  };

  /// How many users registered in the last 24 hours.
  public func countNewUsersToday(store : UserStore) : Nat {
    let oneDayNs : Int = 86_400_000_000_000;
    let cutoff = Time.now() - oneDayNs;
    var count : Nat = 0;
    store.forEach(func(_ : Principal, p : UserTypes.UserProfile) {
      if (p.createdAt >= cutoff) { count += 1 };
    });
    count;
  };

  /// How many distinct users had any activity in the last 24 hours.
  public func countActiveUsersToday(activityStore : ActivityStore) : Nat {
    let oneDayNs : Int = 86_400_000_000_000;
    let cutoff = Time.now() - oneDayNs;
    let seen = Map.empty<Principal, Bool>();
    activityStore.forEach(func(_ : Nat, a : UserTypes.UserActivity) {
      if (a.timestamp >= cutoff) {
        seen.add(a.userId, true);
      };
    });
    seen.size();
  };
};
