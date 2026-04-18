import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Eye,
  LayoutDashboard,
  LogOut,
  Package,
  Plus,
  ShoppingCart,
  Star,
  TrendingUp,
  Truck,
  Users,
  XCircle,
} from "lucide-react";
import { motion } from "motion/react";
import { useAllOrders } from "../../hooks/useOrders";
import {
  formatDate,
  formatPrice,
  getOrderStatusColor,
} from "../../lib/formatters";
import { PRODUCTS_SEED_DATA } from "../../lib/seedData";
import { useAuthStore } from "../../stores/useAuthStore";
import type { OrderStatus } from "../../types";

export const ADMIN_NAV = [
  { icon: LayoutDashboard, label: "Dashboard", to: "/admin" },
  { icon: Package, label: "Products", to: "/admin/products" },
  { icon: ShoppingCart, label: "Orders", to: "/admin/orders" },
  { icon: Users, label: "Users", to: "/admin/users" },
  { icon: Star, label: "Reviews", to: "/admin/reviews" },
];

export function AdminSidebar({ active }: { active: string }) {
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const { clear } = useInternetIdentity();

  function handleLogout() {
    clear();
    logout();
    navigate({ to: "/" });
  }

  return (
    <aside className="w-64 min-h-screen bg-primary flex flex-col shadow-elevated flex-shrink-0">
      <div className="p-6 border-b border-primary-foreground/10">
        <div className="flex items-center gap-2.5">
          <img
            src="/assets/logo.png"
            alt="Forestheals"
            className="h-8 w-auto object-contain brightness-0 invert"
          />
        </div>
        <p className="text-primary-foreground/55 text-xs mt-1.5">Admin Panel</p>
      </div>

      <nav className="flex-1 p-4 space-y-0.5" data-ocid="admin.sidebar">
        {ADMIN_NAV.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.to;
          return (
            <Link
              key={item.to}
              to={item.to as "/admin"}
              data-ocid={`admin.nav.${item.label.toLowerCase()}`}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-smooth ${
                isActive
                  ? "bg-primary-foreground/15 text-primary-foreground"
                  : "text-primary-foreground/65 hover:bg-primary-foreground/10 hover:text-primary-foreground"
              }`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-primary-foreground/10">
        <button
          type="button"
          onClick={handleLogout}
          data-ocid="admin.logout_button"
          className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-sm font-medium text-primary-foreground/65 hover:bg-destructive/20 hover:text-primary-foreground transition-smooth"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </aside>
  );
}

const STATUS_ICONS: Record<OrderStatus, React.ElementType> = {
  pending: Clock,
  confirmed: CheckCircle2,
  shipped: Truck,
  delivered: CheckCircle2,
  cancelled: XCircle,
};

export default function AdminDashboardPage() {
  const { data: orders, isLoading } = useAllOrders();

  const totalRevenue = orders?.reduce((s, o) => s + o.totalAmount, 0) ?? 0;
  const pendingCount =
    orders?.filter((o) => o.status === "pending").length ?? 0;

  const statCards = [
    { label: "Total Orders", value: orders?.length ?? 0, icon: ShoppingCart },
    {
      label: "Total Revenue",
      value: formatPrice(totalRevenue),
      icon: TrendingUp,
    },
    {
      label: "Total Products",
      value: PRODUCTS_SEED_DATA.length,
      icon: Package,
    },
    { label: "Pending Orders", value: pendingCount, icon: Clock },
  ];

  const recentOrders = [...(orders ?? [])]
    .sort((a, b) => b.createdAt - a.createdAt)
    .slice(0, 5);

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar active="/admin" />

      <main className="flex-1 overflow-auto" data-ocid="admin.dashboard.page">
        <div className="bg-card border-b border-border px-8 py-5">
          <h1 className="text-xl font-bold text-foreground">
            Dashboard Overview
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Welcome back — here's what's happening with Forestheals
          </p>
        </div>

        <div className="p-8 space-y-8">
          {/* Stats Cards */}
          <div
            className="grid grid-cols-2 lg:grid-cols-4 gap-5"
            data-ocid="admin.stats.row"
          >
            {statCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  data-ocid={`admin.stats.item.${i + 1}`}
                  className="glass-card rounded-2xl p-5 shadow-soft"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                        {card.label}
                      </p>
                      <p className="text-2xl font-bold text-primary mt-1">
                        {isLoading ? (
                          <Skeleton className="h-7 w-16 mt-1" />
                        ) : (
                          card.value
                        )}
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Orders */}
            <div className="lg:col-span-2 bg-card rounded-2xl border border-border shadow-soft overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                <h2 className="font-semibold text-foreground">Recent Orders</h2>
                <Link to="/admin/orders" data-ocid="admin.view_all_orders_link">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-1 text-primary text-xs"
                  >
                    View all <ArrowRight className="w-3 h-3" />
                  </Button>
                </Link>
              </div>
              {isLoading ? (
                <div className="p-6 space-y-3">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-10 w-full" />
                  ))}
                </div>
              ) : recentOrders.length === 0 ? (
                <div
                  className="p-12 text-center"
                  data-ocid="admin.recent_orders.empty_state"
                >
                  <ShoppingCart className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground text-sm">No orders yet</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-muted/40 text-muted-foreground text-xs uppercase tracking-wide">
                        <th className="text-left px-6 py-3 font-medium">
                          Order ID
                        </th>
                        <th className="text-left px-4 py-3 font-medium">
                          Customer
                        </th>
                        <th className="text-left px-4 py-3 font-medium">
                          Date
                        </th>
                        <th className="text-right px-4 py-3 font-medium">
                          Amount
                        </th>
                        <th className="text-left px-4 py-3 font-medium">
                          Status
                        </th>
                        <th className="text-left px-4 py-3 font-medium">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.map((order, i) => {
                        const Icon = STATUS_ICONS[order.status];
                        return (
                          <tr
                            key={order.id}
                            data-ocid={`admin.recent_orders.item.${i + 1}`}
                            className="border-t border-border hover:bg-muted/20 transition-colors"
                          >
                            <td className="px-6 py-3 font-mono text-xs text-muted-foreground">
                              #{String(order.id).slice(-6)}
                            </td>
                            <td className="px-4 py-3 font-mono text-xs truncate max-w-[80px]">
                              {order.userId.slice(0, 10)}…
                            </td>
                            <td className="px-4 py-3 text-muted-foreground text-xs">
                              {formatDate(order.createdAt)}
                            </td>
                            <td className="px-4 py-3 text-right font-semibold text-sm">
                              {formatPrice(order.totalAmount)}
                            </td>
                            <td className="px-4 py-3">
                              <span
                                className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getOrderStatusColor(order.status)}`}
                              >
                                <Icon className="w-3 h-3" />
                                {order.status}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <Link
                                to="/admin/orders"
                                data-ocid={`admin.order_view.${i + 1}`}
                              >
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-7 text-xs gap-1"
                                >
                                  <Eye className="w-3 h-3" /> View
                                </Button>
                              </Link>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="bg-card rounded-2xl border border-border shadow-soft p-6">
              <h2 className="font-semibold text-foreground mb-5">
                Quick Actions
              </h2>
              <div className="space-y-2.5">
                <Link to="/admin/products" data-ocid="admin.quick_add_product">
                  <Button className="w-full justify-start gap-2">
                    <Plus className="w-4 h-4" /> Add Product
                  </Button>
                </Link>
                <Link to="/admin/orders" data-ocid="admin.quick_view_orders">
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2 mt-1"
                  >
                    <ShoppingCart className="w-4 h-4" /> View All Orders
                  </Button>
                </Link>
                <Link
                  to="/admin/reviews"
                  data-ocid="admin.quick_manage_reviews"
                >
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2 mt-1"
                  >
                    <Star className="w-4 h-4" /> Manage Reviews
                  </Button>
                </Link>
              </div>

              <div className="mt-6 pt-6 border-t border-border space-y-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                  Quick Stats
                </p>
                {[
                  { label: "Total Products", value: PRODUCTS_SEED_DATA.length },
                  { label: "Pending Orders", value: pendingCount },
                  { label: "Flash Sales Active", value: 0 },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex justify-between text-sm"
                  >
                    <span className="text-muted-foreground">{item.label}</span>
                    <span className="font-semibold text-foreground">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
