import { cn } from "@/lib/utils";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import {
  BarChart3,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Gift,
  LayoutDashboard,
  Leaf,
  LogOut,
  Megaphone,
  Package,
  ShoppingCart,
  Star,
  Store,
  Tag,
  Users,
  Warehouse,
} from "lucide-react";
import { useState } from "react";
import { useAdminPStore } from "./adminpStore";

export const AP_NAV = [
  { icon: LayoutDashboard, label: "Dashboard", to: "/admin-p/dashboard" },
  { icon: Package, label: "Products", to: "/admin-p/products" },
  { icon: ShoppingCart, label: "Orders", to: "/admin-p/orders" },
  { icon: Users, label: "Customers", to: "/admin-p/customers" },
  { icon: BarChart3, label: "Analytics", to: "/admin-p/analytics" },
  { icon: Megaphone, label: "Marketing", to: "/admin-p/marketing" },
  { icon: Users, label: "Team", to: "/admin-p/team" },
  { icon: ClipboardList, label: "Tasks & Notes", to: "/admin-p/tasks" },
  { icon: Warehouse, label: "Inventory", to: "/admin-p/inventory" },
  { icon: Gift, label: "Coupons", to: "/admin-p/coupons" },
  { icon: Star, label: "Reviews", to: "/admin-p/reviews" },
  { icon: BookOpen, label: "Blog", to: "/admin-p/blog" },
  { icon: Store, label: "Settings", to: "/admin-p/settings" },
];

export function AdminPSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const logout = useAdminPStore((s) => s.logout);
  const [collapsed, setCollapsed] = useState(false);

  function handleLogout() {
    logout();
    navigate({ to: "/admin-p" });
  }

  return (
    <aside
      className={cn(
        "min-h-screen bg-[#004a38] flex flex-col shadow-2xl transition-all duration-300 flex-shrink-0",
        collapsed ? "w-16" : "w-60",
      )}
      data-ocid="adminp.sidebar"
    >
      {/* Logo + Collapse */}
      <div className="p-4 border-b border-white/10 flex items-center justify-between min-h-[72px]">
        {!collapsed && (
          <div className="flex items-center gap-2 min-w-0">
            <Leaf className="w-5 h-5 text-[#f1e0a9] flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-white font-bold text-sm truncate">
                Forestheals
              </p>
              <p className="text-white/50 text-xs">Admin Panel</p>
            </div>
          </div>
        )}
        {collapsed && <Leaf className="w-5 h-5 text-[#f1e0a9] mx-auto" />}
        <button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto text-white/50 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
          aria-label="Toggle sidebar"
          data-ocid="adminp.sidebar.toggle"
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-2 space-y-0.5 overflow-y-auto">
        {AP_NAV.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.to === "/admin-p/dashboard"
              ? location.pathname === item.to
              : location.pathname.startsWith(item.to);
          return (
            <Link
              key={item.to}
              to={item.to as "/admin-p/dashboard"}
              data-ocid={`adminp.nav.${item.label.toLowerCase().replace(/\s+&?\s*/g, "_")}`}
              title={collapsed ? item.label : undefined}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                collapsed ? "justify-center" : "",
                isActive
                  ? "bg-white/15 text-white"
                  : "text-white/60 hover:bg-white/10 hover:text-white",
              )}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-2 border-t border-white/10">
        <button
          type="button"
          onClick={handleLogout}
          data-ocid="adminp.sidebar.logout_button"
          title={collapsed ? "Logout" : undefined}
          className={cn(
            "flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-white/60 hover:bg-red-500/20 hover:text-white transition-all",
            collapsed ? "justify-center" : "",
          )}
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          {!collapsed && "Logout"}
        </button>
      </div>
    </aside>
  );
}

interface AdminPLayoutProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
}

export function AdminPLayout({
  title,
  subtitle,
  actions,
  children,
}: AdminPLayoutProps) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminPSidebar />
      <main className="flex-1 overflow-auto min-w-0">
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between gap-4 sticky top-0 z-10">
          <div>
            <h1 className="text-lg font-bold text-gray-900">{title}</h1>
            {subtitle && (
              <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>
            )}
          </div>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}

export function APTag({
  label,
  color = "green",
}: {
  label: string;
  color?: "green" | "yellow" | "red" | "blue" | "gray";
}) {
  const colors = {
    green: "bg-green-100 text-green-800",
    yellow: "bg-yellow-100 text-yellow-800",
    red: "bg-red-100 text-red-800",
    blue: "bg-blue-100 text-blue-800",
    gray: "bg-gray-100 text-gray-700",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium",
        colors[color],
      )}
    >
      {label}
    </span>
  );
}

export function APKpiCard({
  label,
  value,
  sub,
  icon: Icon,
  color = "green",
}: {
  label: string;
  value: string | number;
  sub?: string;
  icon: React.ElementType;
  color?: "green" | "yellow" | "blue" | "red";
}) {
  const colors = {
    green: "bg-green-50 text-green-700",
    yellow: "bg-yellow-50 text-yellow-700",
    blue: "bg-blue-50 text-blue-700",
    red: "bg-red-50 text-red-700",
  };
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <div className="flex items-start justify-between">
        <div className="min-w-0">
          <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
            {label}
          </p>
          <p className="text-2xl font-bold text-gray-900 mt-1 truncate">
            {value}
          </p>
          {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
        </div>
        <div
          className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0",
            colors[color],
          )}
        >
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}
