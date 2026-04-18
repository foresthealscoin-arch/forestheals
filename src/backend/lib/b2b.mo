import List "mo:core/List";
import B2BTypes "../types/b2b";

module {
  public type InquiryStore = List.List<B2BTypes.B2BInquiry>;

  public func submitInquiry(
    store : InquiryStore,
    nextId : Nat,
    input : B2BTypes.B2BInquiryInput,
    now : Int,
  ) : B2BTypes.B2BInquiry {
    let inquiry : B2BTypes.B2BInquiry = {
      id = nextId;
      companyName = input.companyName;
      contactName = input.contactName;
      email = input.email;
      phone = input.phone;
      productInterest = input.productInterest;
      quantity = input.quantity;
      message = input.message;
      createdAt = now;
    };
    store.add(inquiry);
    inquiry;
  };

  public func listInquiries(store : InquiryStore) : [B2BTypes.B2BInquiry] {
    store.toArray();
  };
};
