module {
  public type AdminCredentials = {
    username : Text;
    passwordHash : Text;
  };

  public type TeamMember = {
    id : Text;
    name : Text;
    email : Text;
    role : Text;
    permissions : [Text];
    createdAt : Int;
    active : Bool;
  };

  public type AdminTask = {
    id : Text;
    title : Text;
    description : Text;
    priority : Text;
    dueDate : ?Int;
    assignedTo : ?Text;
    completed : Bool;
    createdAt : Int;
    notes : Text;
    category : Text;
  };

  public type AdminExpense = {
    id : Text;
    category : Text;
    amount : Nat;
    description : Text;
    date : Int;
    createdBy : Text;
  };

  public type BlogPost = {
    id : Text;
    title : Text;
    slug : Text;
    content : Text;
    excerpt : Text;
    featuredImage : Text;
    metaTitle : Text;
    metaDescription : Text;
    tags : [Text];
    status : Text;
    publishDate : ?Int;
    createdAt : Int;
    updatedAt : Int;
  };

  public type AdminNotification = {
    id : Text;
    message : Text;
    notificationType : Text;
    read : Bool;
    createdAt : Int;
  };

  public type StoreSettings = {
    storeName : Text;
    contactEmail : Text;
    contactPhone : Text;
    gstNumber : Text;
    currency : Text;
    timezone : Text;
    freeShippingThreshold : Nat;
    instagramUrl : Text;
    facebookUrl : Text;
    whatsappNumber : Text;
  };

  public type AdminCoupon = {
    id : Text;
    code : Text;
    discountType : Text;
    discountValue : Nat;
    minCartValue : Nat;
    maxUses : Nat;
    usedCount : Nat;
    expiresAt : ?Int;
    active : Bool;
    createdAt : Int;
    description : Text;
  };

  public type InventoryItem = {
    productId : Text;
    currentStock : Nat;
    reservedStock : Nat;
    incomingStock : Nat;
    damagedStock : Nat;
    lowStockThreshold : Nat;
    supplierName : Text;
    supplierContact : Text;
    purchaseCost : Nat;
    batchNumber : Text;
    expiryDate : ?Int;
    lastUpdated : Int;
  };
};
