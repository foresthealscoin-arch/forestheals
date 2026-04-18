module {
  public type B2BInquiry = {
    id : Nat;
    companyName : Text;
    contactName : Text;
    email : Text;
    phone : Text;
    productInterest : Text;
    quantity : Text;
    message : Text;
    createdAt : Int;
  };

  public type B2BInquiryInput = {
    companyName : Text;
    contactName : Text;
    email : Text;
    phone : Text;
    productInterest : Text;
    quantity : Text;
    message : Text;
  };
};
