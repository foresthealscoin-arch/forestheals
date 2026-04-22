import { Skeleton } from "@/components/ui/skeleton";
import {
  BarChart3,
  CheckCircle2,
  Clock,
  DollarSign,
  Package,
  RefreshCw,
  ShoppingCart,
  Tag,
  TrendingUp,
  Users,
  Warehouse,
  XCircle,
} from "lucide-react";
import {
  useAdminDashboard,
  useAdminInventory,
  useAdminOrders,
  useAdminRecentActivity,
  useAdminTasks,
} from "../../hooks/useAdminData";
import { formatPrice } from "../../lib/formatters";
import { APKpiCard, AdminPLayout } from "./AdminPLayout";

const STATUS_COLOR: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  shipped: "bg-cyan-100 text-cyan-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

const STATUS_LABEL: Record<string, string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

export default function AdminPDashboard() {
  const { data: kpis, isLoading: kpisLoading, refetch } = useAdminDashboard();
  const { data: orders = [], isLoading: ordersLoading } = useAdminOrders();
  const { data: tasks = [] } = useAdminTasks();
  const { data: inventory = [] } = useAdminInventory();

  const recentOrders = [...orders].slice(0, 6);
  const pendingTasks = tasks.filter((t) => !t.completed);
  const lowStockItems = inventory.filter((i) => i.lowStockFlag);

  return (
    <AdminPLayout
      title="Dashboard Overview"
      subtitle="Welcome back — here's your Forestheals business at a glance"
    >
      {/* Live indicator */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-1.5 text-xs text-green-700 bg-green-50 border border-green-100 rounded-full px-3 py-1 w-fit">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          Live data — auto-refreshes every 30s
          <RefreshCw className="w-3 h-3" />
        </div>
        <button
          type="button"
          onClick={() => void refetch()}
          className="text-xs text-gray-500 hover:text-gray-800 flex items-center gap-1 transition-colors"
          data-ocid="adminp.dashboard.refresh_button"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Refresh
        </button>
      </div>

      {/* KPI Grid */}
      {kpisLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
          {["a", "b", "c", "d", "e", "f", "g", "h"].map((k) => (
            <Skeleton key={k} className="h-24 w-full rounded-2xl" />
          ))}
        </div>
      ) : (
        <div
          className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mb-6"
          data-ocid="adminp.dashboard.kpi_row"
        >
          <APKpiCard
            label="Total Revenue"
            value={formatPrice(kpis?.totalRevenue ?? 0)}
            icon={TrendingUp}
            color="green"
          />
          <APKpiCard
            label="Total Orders"
            value={kpis?.totalOrders ?? 0}
            icon={ShoppingCart}
            color="blue"
          />
          <APKpiCard
            label="Pending Orders"
            value={kpis?.pendingOrderCount ?? 0}
            icon={Clock}
            color="yellow"
          />
          <APKpiCard
            label="Today's Revenue"
            value={formatPrice(kpis?.todayRevenue ?? 0)}
            icon={DollarSign}
            color="green"
          />
          <APKpiCard
            label="Total Products"
            value={kpis?.totalProducts ?? 0}
            sub={`${kpis?.lowStockCount ?? 0} low stock`}
            icon={Package}
            color="blue"
          />
          <APKpiCard
            label="Total Customers"
            value={kpis?.totalCustomers ?? 0}
            icon={Users}
            color="green"
          />
          <APKpiCard
            label="Month Revenue"
            value={formatPrice(kpis?.monthRevenue ?? 0)}
            sub={`${kpis?.monthOrders ?? 0} orders`}
            icon={BarChart3}
            color="blue"
          />
          <APKpiCard
            label="Pending Reviews"
            value={kpis?.pendingReviewCount ?? 0}
            icon={Tag}
            color="yellow"
          />
          <APKpiCard
            label="Week Revenue"
            value={formatPrice(kpis?.weekRevenue ?? 0)}
            sub={`${kpis?.weekOrders ?? 0} orders`}
            icon={TrendingUp}
            color="green"
          />
          <APKpiCard
            label="Today's Orders"
            value={kpis?.todayOrders ?? 0}
            icon={ShoppingCart}
            color="blue"
          />
          <APKpiCard
            label="Low Stock Items"
            value={kpis?.lowStockCount ?? 0}
            icon={Warehouse}
            color="red"
          />
          <APKpiCard
            label="Pending Tasks"
            value={pendingTasks.length}
            icon={CheckCircle2}
            color="yellow"
          />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Recent Orders */}
        <div
          className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
          data-ocid="adminp.dashboard.recent_orders"
        >
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900 text-sm">
              Recent Orders
            </h2>
            <a
              href="/admin-p/orders"
              className="text-xs text-[#004a38] hover:underline font-medium"
            >
              View all →
            </a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide border-b border-gray-100">
                  <th className="text-left px-5 py-2.5 font-medium">Order</th>
                  <th className="text-left px-4 py-2.5 font-medium hidden sm:table-cell">
                    Customer
                  </th>
                  <th className="text-right px-4 py-2.5 font-medium">Amount</th>
                  <th className="text-left px-4 py-2.5 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {ordersLoading
                  ? ["a", "b", "c", "d"].map((k) => (
                      <tr key={k} className="border-t border-gray-50">
                        <td colSpan={4} className="px-5 py-3">
                          <Skeleton className="h-4 w-full rounded" />
                        </td>
                      </tr>
                    ))
                  : recentOrders.map((order, i) => (
                      <tr
                        key={order.id}
                        data-ocid={`adminp.dashboard.order.item.${i + 1}`}
                        className="border-t border-gray-50 hover:bg-gray-50/60 transition-colors"
                      >
                        <td className="px-5 py-3 font-mono text-xs text-gray-500">
                          #{order.id}
                        </td>
                        <td className="px-4 py-3 hidden sm:table-cell text-gray-700 font-medium text-xs">
                          {order.address.fullName ||
                            `${order.userId.slice(0, 12)}…`}
                        </td>
                        <td className="px-4 py-3 text-right font-semibold text-gray-900 text-xs">
                          {formatPrice(order.totalAmount)}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_COLOR[order.status] ?? "bg-gray-100 text-gray-700"}`}
                          >
                            {STATUS_LABEL[order.status] ?? order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                {!ordersLoading && recentOrders.length === 0 && (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-5 py-10 text-center text-gray-400 text-sm"
                    >
                      No orders yet — orders placed by customers will appear
                      here.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Panel */}
        <div className="space-y-4">
          {/* Low Stock Alerts */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-semibold text-gray-900 text-sm mb-3 flex items-center gap-2">
              <Package className="w-4 h-4 text-orange-500" /> Low Stock Alerts
            </h3>
            {lowStockItems.length === 0 ? (
              <p className="text-sm text-gray-500">
                All stock levels are good!
              </p>
            ) : (
              <div className="space-y-2">
                {lowStockItems.slice(0, 5).map((item) => (
                  <div
                    key={item.productId}
                    className="flex items-center justify-between text-xs"
                    data-ocid={`adminp.dashboard.lowstock.${item.productId}`}
                  >
                    <span className="text-gray-700 truncate max-w-[140px]">
                      {item.productName}
                    </span>
                    <span
                      className={`font-semibold ${item.outOfStockFlag ? "text-red-600" : "text-orange-600"}`}
                    >
                      {item.outOfStockFlag
                        ? "Out"
                        : `${item.availableStock} left`}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Pending Tasks */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-semibold text-gray-900 text-sm mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#004a38]" /> Pending Tasks
            </h3>
            {pendingTasks.length === 0 ? (
              <p className="text-sm text-gray-500">All tasks done! 🎉</p>
            ) : (
              <div className="space-y-2">
                {pendingTasks.slice(0, 4).map((t, i) => (
                  <div key={t.id} className="flex items-start gap-2 text-xs">
                    <span
                      className={`px-1.5 py-0.5 rounded text-xs font-medium flex-shrink-0 ${
                        t.priority === "High"
                          ? "bg-red-100 text-red-700"
                          : t.priority === "Medium"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {t.priority}
                    </span>
                    <span
                      className="text-gray-700 line-clamp-1"
                      data-ocid={`adminp.dashboard.task.${i + 1}`}
                    >
                      {t.title}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-semibold text-gray-900 text-sm mb-3 flex items-center gap-2">
              <XCircle className="w-4 h-4 text-blue-500" /> Order Summary
            </h3>
            <div className="space-y-2">
              {[
                {
                  label: "Delivered",
                  status: "delivered",
                  cls: "text-green-600",
                },
                { label: "Shipped", status: "shipped", cls: "text-cyan-600" },
                {
                  label: "Cancelled",
                  status: "cancelled",
                  cls: "text-red-600",
                },
              ].map((row) => {
                const count = orders.filter(
                  (o) => o.status === row.status,
                ).length;
                return (
                  <div
                    key={row.label}
                    className="flex justify-between text-xs text-gray-600"
                  >
                    <span>{row.label}</span>
                    <span className={`font-semibold ${row.cls}`}>{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </AdminPLayout>
  );
}
