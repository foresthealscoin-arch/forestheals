import Array "mo:core/Array";
import List "mo:core/List";
import Map "mo:core/Map";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import AdminTypes "../types/admin";
import OrderTypes "../types/orders";
import UserTypes "../types/users";
import UserLib "../lib/users";

mixin (
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
) {

  // ── Admin Authentication ──────────────────────────────────────────────────

  public func verifyAdminCredentials(username : Text, password : Text) : async Bool {
    username == "forestheals" and password == "domex@1000";
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

  // ── Tasks ─────────────────────────────────────────────────────────────────

  public query func getAdminTasks() : async [AdminTypes.AdminTask] {
    taskStore.toArray();
  };

  public func createAdminTask(task : AdminTypes.AdminTask) : async AdminTypes.AdminTask {
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

  public func deleteAdminTask(id : Text) : async Bool {
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

  // ── Store Settings ────────────────────────────────────────────────────────

  public query func getStoreSettings() : async ?AdminTypes.StoreSettings {
    storeSettingsState.settings;
  };

  public func saveStoreSettings(settings : AdminTypes.StoreSettings) : async AdminTypes.StoreSettings {
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

  public query func getLowStockItems() : async [AdminTypes.InventoryItem] {
    let pairs = inventoryStore.toArray();
    let all = pairs.map(func((_, v) : (Text, AdminTypes.InventoryItem)) : AdminTypes.InventoryItem { v });
    all.filter(func(item : AdminTypes.InventoryItem) : Bool {
      item.currentStock <= item.lowStockThreshold and item.currentStock > 0
    });
  };

  /// Alias: getAnalytics (matches contract name)
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
    let totalExpenses = expenseStore.foldLeft(0, func(acc, e) { acc + e.amount });
    let netProfit : Int = totalRevenue.toInt() - totalExpenses.toInt();
    let avgOrderValue : Nat = if (totalOrders == 0) { 0 } else { totalRevenue / totalOrders };

    // User / activity stats
    let totalRegisteredUsers = userStore.size();
    let newUsersToday = UserLib.countNewUsersToday(userStore);
    let activeUsersToday = UserLib.countActiveUsersToday(activityStore);
    let totalActivities = activityStore.size();
    let allActivities = UserLib.getAllActivities(activityStore);
    let recentActivities = if (allActivities.size() <= 10) {
      allActivities;
    } else {
      allActivities.sliceToArray(0, 10);
    };

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

  /// Alias: updateStoreSettings (matches contract name)
  public func updateStoreSettings(settings : AdminTypes.StoreSettings) : async AdminTypes.StoreSettings {
    storeSettingsState.settings := ?settings;
    settings;
  };

  /// Alias: updateInventory (matches contract name)
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

  /// getTasks alias
  public query func getTasks() : async [AdminTypes.AdminTask] {
    taskStore.toArray();
  };

  /// createTask alias
  public func createTask(task : AdminTypes.AdminTask) : async AdminTypes.AdminTask {
    taskStore.add(task);
    task;
  };

  /// updateTask alias
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

  /// deleteTask alias
  public func deleteTask(id : Text) : async Bool {
    let sizeBefore = taskStore.size();
    let kept = taskStore.filter(func(t) { t.id != id });
    taskStore.clear();
    taskStore.append(kept);
    taskStore.size() < sizeBefore;
  };

  /// getAllBlogPosts alias (includes drafts)
  public query func getAllBlogPosts() : async [AdminTypes.BlogPost] {
    blogPostStore.toArray();
  };

  /// removeTeamMember alias
  public func removeTeamMember(id : Text) : async Bool {
    let sizeBefore = teamMemberStore.size();
    let kept = teamMemberStore.filter(func(m) { m.id != id });
    teamMemberStore.clear();
    teamMemberStore.append(kept);
    teamMemberStore.size() < sizeBefore;
  };
};
