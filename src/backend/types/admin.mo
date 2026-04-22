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
    gstRate : Nat;
    currency : Text;
    timezone : Text;
    freeShippingThreshold : Nat;
    instagramUrl : Text;
    facebookUrl : Text;
    whatsappNumber : Text;
    seoTitle : Text;
    seoDescription : Text;
    logoUrl : Text;
    faviconUrl : Text;
    shippingDefault : Nat;
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

  // ── Analytics aggregation types ───────────────────────────────────────────

  public type DayRevenue = {
    date : Text; // "YYYY-MM-DD"
    revenue : Nat;
    orders : Nat;
  };

  public type MonthRevenue = {
    month : Text; // "YYYY-MM"
    revenue : Nat;
    orders : Nat;
  };

  public type TopProduct = {
    productId : Nat;
    revenue : Nat;
    unitsSold : Nat;
  };

  public type PaymentBreakdown = {
    codCount : Nat;
    codAmount : Nat;
    onlineCount : Nat;
    onlineAmount : Nat;
  };

  public type AnalyticsSummary = {
    totalRevenue : Nat;
    orderCount : Nat;
    customerCount : Nat;
    avgOrderValue : Nat;
    topProducts : [TopProduct];
    revenueByDay : [DayRevenue];
    revenueByMonth : [MonthRevenue];
    paymentBreakdown : PaymentBreakdown;
    totalExpenses : Nat;
    netProfit : Int;
  };

  public type InventorySummaryItem = {
    productId : Nat;
    productName : Text;
    availableStock : Nat;
    reservedStock : Nat;
    lowStockFlag : Bool;
    outOfStockFlag : Bool;
  };

  public type DashboardKPIs = {
    todayRevenue : Nat;
    todayOrders : Nat;
    weekRevenue : Nat;
    weekOrders : Nat;
    monthRevenue : Nat;
    monthOrders : Nat;
    totalRevenue : Nat;
    totalOrders : Nat;
    totalCustomers : Nat;
    totalProducts : Nat;
    lowStockCount : Nat;
    pendingOrderCount : Nat;
    pendingReviewCount : Nat;
  };

  // Shared admin session result (Bool is simpler for Candid interop)
  public type AdminLoginResult = {
    #ok : Bool;
    #err : Text;
  };
};
