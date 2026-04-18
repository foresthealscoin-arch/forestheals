import Set "mo:core/Set";

module {
  public type EmailStore = Set.Set<Text>;

  public func subscribeEmail(store : EmailStore, email : Text) : Bool {
    if (store.contains(email)) {
      false; // Already subscribed
    } else {
      store.add(email);
      true;
    };
  };

  public func listEmails(store : EmailStore) : [Text] {
    store.toArray();
  };
};
