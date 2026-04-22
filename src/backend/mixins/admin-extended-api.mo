import Array "mo:core/Array";
import List "mo:core/List";
import Map "mo:core/Map";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Char "mo:core/Char";
import Nat32 "mo:core/Nat32";
import Order "mo:core/Order";
import AccessControl "mo:caffeineai-authorization/access-control";
import AdminTypes "../types/admin";
import OrderTypes "../types/orders";
import UserTypes "../types/users";
import ProductTypes "../types/products";
import UserLib "../lib/users";

mixin (
  accessControlState : AccessControl.AccessControlState,
  teamMemberStore : List.List<AdminTypes.TeamMember>,
  taskStore : List.List<AdminTypes.AdminTask>,
  expenseStore : List.List<AdminTypes.AdminExpense>,
  blogPostStore : List.List<AdminTypes.BlogPost>,
  notificationStore : List.List<AdminTypes.AdminNotification>,
  storeSettingsState : { var settings : ?AdminTypes.StoreSettings },
  adminCouponStore : List.List<AdminTypes.AdminCoupon>,
  inventoryStore : Map.Map<Text, AdminTypes.InventoryItem>,
  orderStore : List.List<OrderTypes.Order>,
  userStore : Map.Map<Principal, UserTypes.UserProfile>,
  activityStore : Map.Map<Nat, UserTypes.UserActivity>,
  productStore : List.List<ProductTypes.Product>,
  adminCredState : { var passwordHash : Text },
) {

  // ── Admin Authentication ──────────────────────────────────────────────────

  /// Simple hash: sum of char codes (not cryptographic, but avoids storing
  /// plain-text passwords in the canister state).
  func simpleHash(s : Text) : Text {
    var h : Nat = 5381;
    for (c in s.toIter()) {
      h := ((h * 33) + (c.toNat32().toNat() % 256)) % 4_294_967_296;
    };
    h.toText();
  };

  /// Verify admin credentials. Returns #ok(true) on success, #err on failure.
  public shared func verifyAdminCredentials(username : Text, password : Text) : async AdminTypes.AdminLoginResult {
    let storedHash = adminCredState.passwordHash;
    let isDefault = username == "forestheals" and storedHash == "" and password == "domex@1000";
    let isHashed = storedHash != "" and simpleHash(password) == storedHash and username == "forestheals";
    if (isDefault or isHashed) { #ok true } else { #err "Invalid credentials" };
  };

  /// Check if the caller principal has admin privileges via AccessControl.
  public query ({ caller }) func getAdminSession() : async Bool {
    AccessControl.isAdmin(accessControlState, caller);
  };

  /// Rotate the admin password. Only callable by an existing admin principal.
  public shared ({ caller }) func setAdminPassword(newPassword : Text) : async AdminTypes.AdminLoginResult {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      return #err "Unauthorized: admin principal required";
    };
    adminCredState.passwordHash := simpleHash(newPassword);
    #ok true;
  };

  // ── Team Members ──────────────────────────────────────────────────────────

  public query func getTeamMembers() : async [AdminTypes.TeamMember] {
    teamMemberStore.toArray();
  };

  public func addTeamMember(member : AdminTypes.TeamMember) : async AdminTypes.TeamMember {
    teamMemberStore.add(member);
    member;
  };

  public func updateTeamMember(id : Text, member : AdminTypes.TeamMember) : async ?AdminTypes.TeamMember {
    var updated : ?AdminTypes.TeamMember = null;
    teamMemberStore.mapInPlace(func(m) {
      if (m.id == id) {
        let next = { member with id = id };
        updated := ?next;
        next;
      } else { m };
    });
    updated;
  };

  public func deleteTeamMember(id : Text) : async Bool {
    let sizeBefore = teamMemberStore.size();
    let kept = teamMemberStore.filter(func(m) { m.id != id });
    teamMemberStore.clear();
    teamMemberStore.append(kept);
    teamMemberStore.size() < sizeBefore;
  };

  public func removeTeamMember(id : Text) : async Bool {
    let sizeBefore = teamMemberStore.size();
    let kept = teamMemberStore.filter(func(m) { m.id != id });
    teamMemberStore.clear();
    teamMemberStore.append(kept);
    teamMemberStore.size() < sizeBefore;
  };

  // ── Tasks ─────────────────────────────────────────────────────────────────

  public query func getAdminTasks() : async [AdminTypes.AdminTask] {
    taskStore.toArray();
  };

  public query func getTasks() : async [AdminTypes.AdminTask] {
    taskStore.toArray();
  };

  public func createAdminTask(task : AdminTypes.AdminTask) : async AdminTypes.AdminTask {
    taskStore.add(task);
    task;
  };

  public func createTask(task : AdminTypes.AdminTask) : async AdminTypes.AdminTask {
    taskStore.add(task);
    task;
  };

  public func updateAdminTask(id : Text, task : AdminTypes.AdminTask) : async ?AdminTypes.AdminTask {
    var updated : ?AdminTypes.AdminTask = null;
    taskStore.mapInPlace(func(t) {
      if (t.id == id) {
        let next = { task with id = id };
        updated := ?next;
        next;
      } else { t };
    });
    updated;
  };

  public func updateTask(id : Text, task : AdminTypes.AdminTask) : async ?AdminTypes.AdminTask {
    var updated : ?AdminTypes.AdminTask = null;
    taskStore.mapInPlace(func(t) {
      if (t.id == id) {
        let next = { task with id = id };
        updated := ?next;
        next;
      } else { t };
    });
    updated;
  };

  public func deleteAdminTask(id : Text) : async Bool {
    let sizeBefore = taskStore.size();
    let kept = taskStore.filter(func(t) { t.id != id });
    taskStore.clear();
    taskStore.append(kept);
    taskStore.size() < sizeBefore;
  };

  public func deleteTask(id : Text) : async Bool {
    let sizeBefore = taskStore.size();
    let kept = taskStore.filter(func(t) { t.id != id });
    taskStore.clear();
    taskStore.append(kept);
    taskStore.size() < sizeBefore;
  };

  public func completeAdminTask(id : Text) : async Bool {
    var found = false;
    taskStore.mapInPlace(func(t) {
      if (t.id == id) {
        found := true;
        { t with completed = true };
      } else { t };
    });
    found;
  };

  // ── Expenses ──────────────────────────────────────────────────────────────

  public query func getExpenses() : async [AdminTypes.AdminExpense] {
    expenseStore.toArray();
  };

  public func addExpense(expense : AdminTypes.AdminExpense) : async AdminTypes.AdminExpense {
    expenseStore.add(expense);
    expense;
  };

  public func updateExpense(id : Text, expense : AdminTypes.AdminExpense) : async ?AdminTypes.AdminExpense {
    var updated : ?AdminTypes.AdminExpense = null;
    expenseStore.mapInPlace(func(e) {
      if (e.id == id) {
        let next = { expense with id = id };
        updated := ?next;
        next;
      } else { e };
    });
    updated;
  };

  public func deleteExpense(id : Text) : async Bool {
    let sizeBefore = expenseStore.size();
    let kept = expenseStore.filter(func(e) { e.id != id });
    expenseStore.clear();
    expenseStore.append(kept);
    expenseStore.size() < sizeBefore;
  };

  public query func getExpensesByCategory() : async [(Text, Nat)] {
    let categoryMap = Map.empty<Text, Nat>();
    expenseStore.forEach(func(e) {
      let prev = switch (categoryMap.get(e.category)) {
        case null { 0 };
        case (?v) { v };
      };
      categoryMap.add(e.category, prev + e.amount);
    });
    categoryMap.toArray();
  };

  // ── Blog Posts ────────────────────────────────────────────────────────────

  public query func getBlogPosts() : async [AdminTypes.BlogPost] {
    blogPostStore.toArray();
  };

  public query func getAllBlogPosts() : async [AdminTypes.BlogPost] {
    blogPostStore.toArray();
  };

  public func createBlogPost(post : AdminTypes.BlogPost) : async AdminTypes.BlogPost {
    blogPostStore.add(post);
    post;
  };

  public func updateBlogPost(id : Text, post : AdminTypes.BlogPost) : async ?AdminTypes.BlogPost {
    var updated : ?AdminTypes.BlogPost = null;
    blogPostStore.mapInPlace(func(p) {
      if (p.id == id) {
        let next = { post with id = id };
        updated := ?next;
        next;
      } else { p };
    });
    updated;
  };

  public func deleteBlogPost(id : Text) : async Bool {
    let sizeBefore = blogPostStore.size();
    let kept = blogPostStore.filter(func(p) { p.id != id });
    blogPostStore.clear();
    blogPostStore.append(kept);
    blogPostStore.size() < sizeBefore;
  };

  public func publishBlogPost(id : Text) : async Bool {
    var found = false;
    let now = Time.now();
    blogPostStore.mapInPlace(func(p) {
      if (p.id == id) {
        found := true;
        { p with status = "published"; publishDate = ?now; updatedAt = now };
      } else { p };
    });
    found;
  };

  // ── Notifications ─────────────────────────────────────────────────────────

  public query func getAdminNotifications() : async [AdminTypes.AdminNotification] {
    notificationStore.toArray();
  };

  public func markNotificationRead(id : Text) : async Bool {
    var found = false;
    notificationStore.mapInPlace(func(n) {
      if (n.id == id) {
        found := true;
        { n with read = true };
      } else { n };
    });
    found;
  };

  public func clearAllNotifications() : async () {
    notificationStore.clear();
  };

  // Helper to push a new notification (used internally by analytics/order mutations)
  func pushNotification(msg : Text, ntype : Text) {
    let now = Time.now();
    let notif : AdminTypes.AdminNotification = {
      id = now.toText();
      message = msg;
      notificationType = ntype;
      read = false;
      createdAt = now;
    };
    notificationStore.add(notif);
  };

  // ── Store Settings ────────────────────────────────────────────────────────

  func defaultSettings() : AdminTypes.StoreSettings {
    {
      storeName = "Forestheals";
      contactEmail = "support@forestheals.com";
      contactPhone = "+919929059240";
      gstNumber = "";
      gstRate = 18;
      currency = "INR";
      timezone = "Asia/Kolkata";
      freeShippingThreshold = 999;
      instagramUrl = "https://instagram.com/forestheals";
      facebookUrl = "https://facebook.com/forestheals";
      whatsappNumber = "9929059240";
      seoTitle = "Forestheals — From Forest to Homes";
      seoDescription = "Premium eco-Ayurvedic products. Natural healing rooted in ancient wisdom.";
      logoUrl = "";
      faviconUrl = "";
      shippingDefault = 99;
    };
  };

  public query func getStoreSettings() : async AdminTypes.StoreSettings {
    switch (storeSettingsState.settings) {
      case null { defaultSettings() };
      case (?s) { s };
    };
  };

  public func saveStoreSettings(settings : AdminTypes.StoreSettings) : async AdminTypes.StoreSettings {
    storeSettingsState.settings := ?settings;
    settings;
  };

  public func updateStoreSettings(settings : AdminTypes.StoreSettings) : async AdminTypes.StoreSettings {
    storeSettingsState.settings := ?settings;
    settings;
  };

  // ── Admin Coupons ─────────────────────────────────────────────────────────

  public query func getAdminCoupons() : async [AdminTypes.AdminCoupon] {
    adminCouponStore.toArray();
  };

  public func createAdminCoupon(coupon : AdminTypes.AdminCoupon) : async AdminTypes.AdminCoupon {
    adminCouponStore.add(coupon);
    coupon;
  };

  public func updateAdminCoupon(id : Text, coupon : AdminTypes.AdminCoupon) : async ?AdminTypes.AdminCoupon {
    var updated : ?AdminTypes.AdminCoupon = null;
    adminCouponStore.mapInPlace(func(c) {
      if (c.id == id) {
        let next = { coupon with id = id };
        updated := ?next;
        next;
      } else { c };
    });
    updated;
  };

  public func deleteAdminCoupon(id : Text) : async Bool {
    let sizeBefore = adminCouponStore.size();
    let kept = adminCouponStore.filter(func(c) { c.id != id });
    adminCouponStore.clear();
    adminCouponStore.append(kept);
    adminCouponStore.size() < sizeBefore;
  };

  public func toggleCouponActive(id : Text) : async Bool {
    var found = false;
    adminCouponStore.mapInPlace(func(c) {
      if (c.id == id) {
        found := true;
        { c with active = not c.active };
      } else { c };
    });
    found;
  };

  // ── Inventory ─────────────────────────────────────────────────────────────

  public query func getInventoryItems() : async [AdminTypes.InventoryItem] {
    let pairs = inventoryStore.toArray();
    pairs.map(func((_, v) : (Text, AdminTypes.InventoryItem)) : AdminTypes.InventoryItem { v });
  };

  public func upsertInventoryItem(item : AdminTypes.InventoryItem) : async AdminTypes.InventoryItem {
    let updated = { item with lastUpdated = Time.now() };
    inventoryStore.add(item.productId, updated);
    updated;
  };

  public func updateInventoryStock(productId : Text, delta : Int, _reason : Text) : async ?AdminTypes.InventoryItem {
    switch (inventoryStore.get(productId)) {
      case null { null };
      case (?existing) {
        let currentInt : Int = existing.currentStock.toInt();
        let newStockInt = currentInt + delta;
        let newStock : Nat = if (newStockInt > 0) { newStockInt.toNat() } else { 0 };
        let updated = { existing with currentStock = newStock; lastUpdated = Time.now() };
        inventoryStore.add(productId, updated);
        ?updated;
      };
    };
  };

  public func updateInventory(productId : Text, quantity : Int, _type : Text, _notes : Text) : async ?AdminTypes.InventoryItem {
    switch (inventoryStore.get(productId)) {
      case null { null };
      case (?existing) {
        let currentInt : Int = existing.currentStock.toInt();
        let newStockInt = currentInt + quantity;
        let newStock : Nat = if (newStockInt > 0) { newStockInt.toNat() } else { 0 };
        let updated = { existing with currentStock = newStock; lastUpdated = Time.now() };
        inventoryStore.add(productId, updated);
        ?updated;
      };
    };
  };

  public query func getLowStockItems() : async [AdminTypes.InventoryItem] {
    let pairs = inventoryStore.toArray();
    let all = pairs.map(func((_, v) : (Text, AdminTypes.InventoryItem)) : AdminTypes.InventoryItem { v });
    all.filter(func(item : AdminTypes.InventoryItem) : Bool {
      item.currentStock <= item.lowStockThreshold and item.currentStock > 0
    });
  };

  // ── Inventory Summary (from product store) ────────────────────────────────

  public query func getInventorySummary() : async [AdminTypes.InventorySummaryItem] {
    let LOW_STOCK_THRESHOLD : Nat = 10;
    productStore.map<ProductTypes.Product, AdminTypes.InventorySummaryItem>(func(p) {
      // Check if we have an explicit inventory record for reserved stock
      let reserved : Nat = switch (inventoryStore.get(p.id.toText())) {
        case null { 0 };
        case (?inv) { inv.reservedStock };
      };
      let available : Nat = if (p.stock >= reserved) { p.stock - reserved } else { 0 };
      {
        productId = p.id;
        productName = p.name;
        availableStock = available;
        reservedStock = reserved;
        lowStockFlag = p.stock > 0 and p.stock <= LOW_STOCK_THRESHOLD;
        outOfStockFlag = p.stock == 0;
      };
    }).toArray();
  };

  // ── Analytics ─────────────────────────────────────────────────────────────

  // Convert nanosecond timestamp to "YYYY-MM-DD" text (UTC approximation)
  func tsToDate(ns : Int) : Text {
    let seconds : Int = ns / 1_000_000_000;
    let days : Int = seconds / 86400;
    // Days since Unix epoch → approximate date arithmetic
    let year400 : Int = 146097; // days per 400-year cycle
    var n = days + 719468; // shift epoch to Mar 1, 0000
    let era : Int = (if (n >= 0) { n } else { n - year400 + 1 }) / year400;
    let doe : Int = n - era * year400;
    let yoe : Int = (doe - doe / 1460 + doe / 36524 - doe / 146096) / 365;
    let y : Int = yoe + era * 400;
    let doy : Int = doe - (365 * yoe + yoe / 4 - yoe / 100);
    let mp : Int = (5 * doy + 2) / 153;
    let d : Int = doy - (153 * mp + 2) / 5 + 1;
    let m : Int = if (mp < 10) { mp + 3 } else { mp - 9 };
    let yr : Int = if (m <= 2) { y + 1 } else { y };
    // Zero-pad month and day
    let ms = if (m < 10) { "0" # m.toText() } else { m.toText() };
    let ds = if (d < 10) { "0" # d.toText() } else { d.toText() };
    yr.toText() # "-" # ms # "-" # ds;
  };

  func tsToMonth(ns : Int) : Text {
    let date = tsToDate(ns);
    // "YYYY-MM-DD" → "YYYY-MM"  (just take first 7 chars)
    var result = "";
    var idx = 0;
    for (c in date.toIter()) {
      if (idx < 7) { result #= c.toText() };
      idx += 1;
    };
    result;
  };

  public query func getAnalyticsSummary() : async AdminTypes.AnalyticsSummary {
    let orders = orderStore.toArray();
    let totalOrders = orders.size();
    var totalRevenue : Nat = 0;
    let customerSet = Map.empty<Text, Bool>();

    // Revenue by day (last 30 days) and month (last 12 months)
    let dayMap = Map.empty<Text, { var rev : Nat; var cnt : Nat }>();
    let monthMap = Map.empty<Text, { var rev : Nat; var cnt : Nat }>();
    let productRevMap = Map.empty<Nat, { var rev : Nat; var units : Nat }>();

    var codCount : Nat = 0;
    var codAmount : Nat = 0;
    var onlineCount : Nat = 0;
    var onlineAmount : Nat = 0;

    for (order in orders.values()) {
      totalRevenue += order.totalAmount;
      customerSet.add(order.userId.toText(), true);

      // day bucket
      let dateKey = tsToDate(order.createdAt);
      switch (dayMap.get(dateKey)) {
        case null { dayMap.add(dateKey, { var rev = order.totalAmount; var cnt = 1 }) };
        case (?bucket) { bucket.rev += order.totalAmount; bucket.cnt += 1 };
      };

      // month bucket
      let monthKey = tsToMonth(order.createdAt);
      switch (monthMap.get(monthKey)) {
        case null { monthMap.add(monthKey, { var rev = order.totalAmount; var cnt = 1 }) };
        case (?bucket) { bucket.rev += order.totalAmount; bucket.cnt += 1 };
      };

      // product revenue
      for (item in order.items.values()) {
        let itemRev = item.price * item.quantity;
        switch (productRevMap.get(item.productId)) {
          case null { productRevMap.add(item.productId, { var rev = itemRev; var units = item.quantity }) };
          case (?pr) { pr.rev += itemRev; pr.units += item.quantity };
        };
      };

      // payment breakdown
      switch (order.paymentMethod) {
        case (#cod) { codCount += 1; codAmount += order.totalAmount };
        case (#stripe) { onlineCount += 1; onlineAmount += order.totalAmount };
      };
    };

    let avgOrderValue : Nat = if (totalOrders == 0) { 0 } else { totalRevenue / totalOrders };
    let totalExpenses = expenseStore.foldLeft(0, func(acc : Nat, e : AdminTypes.AdminExpense) : Nat { acc + e.amount });
    let netProfit : Int = totalRevenue.toInt() - totalExpenses.toInt();

    // Top 5 products by revenue
    let productPairs = productRevMap.toArray();
    let sortedProducts = productPairs.sort(func((_, a) : (Nat, { var rev : Nat; var units : Nat }), (_, b) : (Nat, { var rev : Nat; var units : Nat })) : Order.Order {
      if (a.rev > b.rev) #less else if (a.rev < b.rev) #greater else #equal
    });
    let top5 = sortedProducts.sliceToArray(0, if (sortedProducts.size() < 5) { sortedProducts.size() } else { 5 });
    let topProducts = top5.map(
      func((pid, pr) : (Nat, { var rev : Nat; var units : Nat })) : AdminTypes.TopProduct {
        { productId = pid; revenue = pr.rev; unitsSold = pr.units };
      }
    );

    // revenueByDay sorted ascending
    let dayPairs = dayMap.toArray();
    let sortedDays = dayPairs.sort(func((a, _) : (Text, { var rev : Nat; var cnt : Nat }), (b, _) : (Text, { var rev : Nat; var cnt : Nat })) : Order.Order {
      if (a < b) #less else if (a > b) #greater else #equal
    });
    let revenueByDay = sortedDays.map(
      func((date, bucket) : (Text, { var rev : Nat; var cnt : Nat })) : AdminTypes.DayRevenue {
        { date; revenue = bucket.rev; orders = bucket.cnt };
      }
    );

    // revenueByMonth sorted ascending
    let monthPairs = monthMap.toArray();
    let sortedMonths = monthPairs.sort(func((a, _) : (Text, { var rev : Nat; var cnt : Nat }), (b, _) : (Text, { var rev : Nat; var cnt : Nat })) : Order.Order {
      if (a < b) #less else if (a > b) #greater else #equal
    });
    let revenueByMonth = sortedMonths.map(
      func((month, bucket) : (Text, { var rev : Nat; var cnt : Nat })) : AdminTypes.MonthRevenue {
        { month; revenue = bucket.rev; orders = bucket.cnt };
      }
    );

    {
      totalRevenue;
      orderCount = totalOrders;
      customerCount = customerSet.size();
      avgOrderValue;
      topProducts;
      revenueByDay;
      revenueByMonth;
      paymentBreakdown = {
        codCount;
        codAmount;
        onlineCount;
        onlineAmount;
      };
      totalExpenses;
      netProfit;
    };
  };

  /// Legacy analytics alias used by existing frontend
  public query func getAnalytics() : async {
    totalRevenue : Nat;
    totalOrders : Nat;
    totalExpenses : Nat;
    netProfit : Int;
    avgOrderValue : Nat;
    totalCustomers : Nat;
    totalRegisteredUsers : Nat;
    newUsersToday : Nat;
    activeUsersToday : Nat;
    totalActivities : Nat;
    recentActivities : [UserTypes.UserActivity];
  } {
    let orders = orderStore.toArray();
    let totalOrders = orders.size();
    var totalRevenue : Nat = 0;
    let customerSet = Map.empty<Text, Bool>();
    for (order in orders.values()) {
      totalRevenue += order.totalAmount;
      customerSet.add(order.userId.toText(), true);
    };
    let totalExpenses = expenseStore.foldLeft(0, func(acc : Nat, e : AdminTypes.AdminExpense) : Nat { acc + e.amount });
    let netProfit : Int = totalRevenue.toInt() - totalExpenses.toInt();
    let avgOrderValue : Nat = if (totalOrders == 0) { 0 } else { totalRevenue / totalOrders };

    let totalRegisteredUsers = userStore.size();
    let newUsersToday = UserLib.countNewUsersToday(userStore);
    let activeUsersToday = UserLib.countActiveUsersToday(activityStore);
    let totalActivities = activityStore.size();
    let allActivities = UserLib.getAllActivities(activityStore);
    let recentActivities = allActivities.sliceToArray(0, if (allActivities.size() <= 10) { allActivities.size() } else { 10 });

    {
      totalRevenue;
      totalOrders;
      totalExpenses;
      netProfit;
      avgOrderValue;
      totalCustomers = customerSet.size();
      totalRegisteredUsers;
      newUsersToday;
      activeUsersToday;
      totalActivities;
      recentActivities;
    };
  };

  // ── Dashboard KPIs ────────────────────────────────────────────────────────

  public query func getDashboardKPIs() : async AdminTypes.DashboardKPIs {
    let oneDayNs : Int = 86_400_000_000_000;
    let oneWeekNs : Int = oneDayNs * 7;
    let oneMonthNs : Int = oneDayNs * 30;
    let now = Time.now();
    let dayStart = now - oneDayNs;
    let weekStart = now - oneWeekNs;
    let monthStart = now - oneMonthNs;

    var todayRevenue : Nat = 0;
    var todayOrders : Nat = 0;
    var weekRevenue : Nat = 0;
    var weekOrders : Nat = 0;
    var monthRevenue : Nat = 0;
    var monthOrders : Nat = 0;
    var totalRevenue : Nat = 0;
    var totalOrders : Nat = 0;
    var pendingOrderCount : Nat = 0;

    orderStore.forEach(func(o : OrderTypes.Order) {
      totalRevenue += o.totalAmount;
      totalOrders += 1;
      if (o.createdAt >= dayStart) { todayRevenue += o.totalAmount; todayOrders += 1 };
      if (o.createdAt >= weekStart) { weekRevenue += o.totalAmount; weekOrders += 1 };
      if (o.createdAt >= monthStart) { monthRevenue += o.totalAmount; monthOrders += 1 };
      switch (o.status) {
        case (#pending) { pendingOrderCount += 1 };
        case (_) {};
      };
    });

    let customerSet = Map.empty<Text, Bool>();
    orderStore.forEach(func(o : OrderTypes.Order) {
      customerSet.add(o.userId.toText(), true);
    });

    let LOW_STOCK_THRESHOLD : Nat = 10;
    var lowStockCount : Nat = 0;
    productStore.forEach(func(p : ProductTypes.Product) {
      if (p.stock > 0 and p.stock <= LOW_STOCK_THRESHOLD) { lowStockCount += 1 };
    });

    {
      todayRevenue;
      todayOrders;
      weekRevenue;
      weekOrders;
      monthRevenue;
      monthOrders;
      totalRevenue;
      totalOrders;
      totalCustomers = customerSet.size();
      totalProducts = productStore.size();
      lowStockCount;
      pendingOrderCount;
      pendingReviewCount = 0; // reviews don't carry pending status in current schema
    };
  };

  // ── Recent Activity ───────────────────────────────────────────────────────

  public query func getRecentActivity() : async [UserTypes.UserActivity] {
    let all = UserLib.getAllActivities(activityStore);
    all.sliceToArray(0, if (all.size() <= 50) { all.size() } else { 50 });
  };
};
