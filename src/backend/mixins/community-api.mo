import Set "mo:core/Set";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import CommunityLib "../lib/community";

mixin (
  accessControlState : AccessControl.AccessControlState,
  emailStore : Set.Set<Text>,
) {
  public shared func subscribeEmail(email : Text) : async Bool {
    if (email.size() == 0) {
      Runtime.trap("Email cannot be empty");
    };
    CommunityLib.subscribeEmail(emailStore, email);
  };

  public query ({ caller }) func listEmails() : async [Text] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can list emails");
    };
    CommunityLib.listEmails(emailStore);
  };
};
