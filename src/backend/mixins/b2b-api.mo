import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import AccessControl "mo:caffeineai-authorization/access-control";
import B2BTypes "../types/b2b";
import B2BLib "../lib/b2b";

mixin (
  accessControlState : AccessControl.AccessControlState,
  inquiryStore : List.List<B2BTypes.B2BInquiry>,
  nextInquiryId : { var value : Nat },
) {
  public shared func submitB2BInquiry(input : B2BTypes.B2BInquiryInput) : async B2BTypes.B2BInquiry {
    let id = nextInquiryId.value;
    nextInquiryId.value += 1;
    B2BLib.submitInquiry(inquiryStore, id, input, Time.now());
  };

  public query ({ caller }) func listB2BInquiries() : async [B2BTypes.B2BInquiry] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view B2B inquiries");
    };
    B2BLib.listInquiries(inquiryStore);
  };

  /// Alias: getB2BInquiries
  public query ({ caller }) func getB2BInquiries() : async [B2BTypes.B2BInquiry] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view B2B inquiries");
    };
    B2BLib.listInquiries(inquiryStore);
  };
};
