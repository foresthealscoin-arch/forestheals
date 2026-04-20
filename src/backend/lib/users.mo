import Map "mo:core/Map";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import UserTypes "../types/users";

module {
  public type UserStore = Map.Map<Principal, UserTypes.UserProfile>;

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
};
