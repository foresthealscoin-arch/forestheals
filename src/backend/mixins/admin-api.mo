import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import AccessControl "mo:caffeineai-authorization/access-control";
import ProductTypes "../types/products";
import OrderTypes "../types/orders";
import OrderLib "../lib/orders";

mixin (
  accessControlState : AccessControl.AccessControlState,
  productStore : List.List<ProductTypes.Product>,
  orderStore : List.List<OrderTypes.Order>,
) {
  public type AdminStats = {
    totalOrders : Nat;
    totalRevenue : Nat;
    totalProducts : Nat;
  };

  public query ({ caller }) func isAdmin() : async Bool {
    AccessControl.isAdmin(accessControlState, caller);
  };

  public shared ({ caller }) func setUserRole(user : Principal, role : AccessControl.UserRole) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can change user roles");
    };
    AccessControl.assignRole(accessControlState, caller, user, role);
  };

  public query ({ caller }) func getAdminStats() : async AdminStats {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view admin stats");
    };
    let orders = OrderLib.listAllOrders(orderStore);
    var totalRevenue = 0;
    for (order in orders.values()) {
      totalRevenue += order.totalAmount;
    };
    {
      totalOrders = orders.size();
      totalRevenue = totalRevenue;
      totalProducts = productStore.size();
    };
  };
};
