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
import { useAllOrders } from "../../hooks/useOrders";
import { formatPrice } from "../../lib/formatters";
import { APKpiCard, AdminPLayout } from "./AdminPLayout";
import { useAdminPStore } from "./adminpStore";

export default function AdminPDashboard() {
  const products = useAdminPStore((s) => s.products);
  const customers = useAdminPStore((s) => s.customers);
  const expenses = useAdminPStore((s) => s.expenses);
  const tasks = useAdminPStore((s) => s.tasks);

  const { data: orders = [], isLoading, refetch } = useAllOrders();

  // KPI calculations from real order data
  const totalRevenue = orders.reduce((s, o) => s + o.totalAmount, 0);
  const totalExpenses = expenses.reduce((s, e) => s + e.amount, 0);
  const netProfit = totalRevenue - totalExpenses;
  const pending = orders.filter((o) => o.status === "pending").length;
  const completed = orders.filter((o) => o.status === "delivered").length;
  const cancelled = orders.filter((o) => o.status === "cancelled").length;
  const adSpend = expenses
    .filter((e) => e.category === "Ad Spend")
    .reduce((s, e) => s + e.amount, 0);
  const lowStock = products.filter((p) => p.stock < 30).length;
  const pendingTasks = tasks.filter((t) => !t.completed).length;
  const avgOrder =
    orders.length > 0 ? Math.round(totalRevenue / orders.length) : 0;
  const recentOrders = [...orders].slice(0, 6);

  const statusColor: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    confirmed: "bg-blue-100 text-blue-800",
    shipped: "bg-cyan-100 text-cyan-800",
    delivered: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };

  const statusLabel: Record<string, string> = {
    pending: "Pending",
    confirmed: "Confirmed",
    shipped: "Shipped",
    delivered: "Delivered",
    cancelled: "Cancelled",
  };

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
      <div
        className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mb-6"
        data-ocid="adminp.dashboard.kpi_row"
      >
        <APKpiCard
          label="Total Revenue"
          value={formatPrice(totalRevenue)}
          icon={TrendingUp}
          color="green"
          data-ocid="adminp.kpi.revenue"
        />
        <APKpiCard
          label="Total Orders"
          value={isLoading ? "…" : orders.length}
          sub={`${completed} delivered`}
          icon={ShoppingCart}
          color="blue"
        />
        <APKpiCard
          label="Pending Orders"
          value={isLoading ? "…" : pending}
          icon={Clock}
          color="yellow"
        />
        <APKpiCard
          label="Net Profit"
          value={formatPrice(netProfit)}
          icon={DollarSign}
          color={netProfit >= 0 ? "green" : "red"}
        />
        <APKpiCard
          label="Total Products"
          value={products.length}
          sub={`${lowStock} low stock`}
          icon={Package}
          color="blue"
        />
        <APKpiCard
          label="Total Customers"
          value={customers.length}
          icon={Users}
          color="green"
        />
        <APKpiCard
          label="Avg Order Value"
          value={formatPrice(avgOrder)}
          icon={BarChart3}
          color="blue"
        />
        <APKpiCard
          label="Marketing Spend"
          value={formatPrice(adSpend)}
          icon={Tag}
          color="yellow"
        />
        <APKpiCard
          label="Completed Orders"
          value={isLoading ? "…" : completed}
          icon={CheckCircle2}
          color="green"
        />
        <APKpiCard
          label="Cancelled Orders"
          value={isLoading ? "…" : cancelled}
          icon={XCircle}
          color="red"
        />
        <APKpiCard
          label="Total Expenses"
          value={formatPrice(totalExpenses)}
          icon={Warehouse}
          color="red"
        />
        <APKpiCard
          label="Pending Tasks"
          value={pendingTasks}
          icon={CheckCircle2}
          color="yellow"
        />
      </div>

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
                {recentOrders.map((order, i) => (
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
                        className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColor[order.status] ?? "bg-gray-100 text-gray-700"}`}
                      >
                        {statusLabel[order.status] ?? order.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {recentOrders.length === 0 && (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-5 py-10 text-center text-gray-400 text-sm"
                    >
                      {isLoading
                        ? "Loading orders…"
                        : "No orders yet — orders placed by customers will appear here."}
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
            {products.filter((p) => p.stock < 30).length === 0 ? (
              <p className="text-sm text-gray-500">
                All stock levels are good!
              </p>
            ) : (
              <div className="space-y-2">
                {products
                  .filter((p) => p.stock < 30)
                  .slice(0, 5)
                  .map((p) => (
                    <div
                      key={p.id}
                      className="flex items-center justify-between text-xs"
                      data-ocid={`adminp.dashboard.lowstock.${p.id}`}
                    >
                      <span className="text-gray-700 truncate max-w-[140px]">
                        {p.name}
                      </span>
                      <span className="font-semibold text-orange-600">
                        {p.stock} left
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
            {tasks.filter((t) => !t.completed).length === 0 ? (
              <p className="text-sm text-gray-500">All tasks done! 🎉</p>
            ) : (
              <div className="space-y-2">
                {tasks
                  .filter((t) => !t.completed)
                  .slice(0, 4)
                  .map((t, i) => (
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

          {/* Expense Breakdown */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-semibold text-gray-900 text-sm mb-3 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-blue-500" /> Expense Breakdown
            </h3>
            <div className="space-y-2">
              {["Ad Spend", "Packaging", "Shipping", "Salary", "Misc"].map(
                (cat) => {
                  const amt = expenses
                    .filter((e) => e.category === cat)
                    .reduce((s, e) => s + e.amount, 0);
                  const pct =
                    totalExpenses > 0
                      ? Math.round((amt / totalExpenses) * 100)
                      : 0;
                  return (
                    <div key={cat}>
                      <div className="flex justify-between text-xs text-gray-600 mb-1">
                        <span>{cat}</span>
                        <span className="font-medium">
                          {formatPrice(amt)} ({pct}%)
                        </span>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#004a38] rounded-full transition-all duration-500"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                },
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminPLayout>
  );
}
