import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Link } from "@tanstack/react-router";
import {
  Bell,
  Heart,
  LogOut,
  Package,
  Settings,
  ShoppingBag,
  Trash2,
  User,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useUserOrders } from "../hooks/useOrders";
import {
  formatDate,
  formatPrice,
  getOrderStatusColor,
} from "../lib/formatters";
import { PRODUCTS_SEED_DATA } from "../lib/seedData";
import { useAuthStore } from "../stores/useAuthStore";

type DashTab = "orders" | "wishlist" | "profile" | "settings";

const TABS: { id: DashTab; label: string; icon: React.ElementType }[] = [
  { id: "orders", label: "My Orders", icon: Package },
  { id: "wishlist", label: "Wishlist", icon: Heart },
  { id: "profile", label: "My Profile", icon: User },
  { id: "settings", label: "Settings", icon: Settings },
];

function OrdersTab() {
  const { data: orders, isLoading } = useUserOrders();

  if (isLoading) {
    return (
      <div className="space-y-3" data-ocid="dashboard.orders.loading_state">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-20 w-full rounded-2xl" />
        ))}
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div
        className="glass-card rounded-2xl p-14 text-center"
        data-ocid="dashboard.orders.empty_state"
      >
        <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <p className="font-semibold text-foreground text-lg mb-2">
          No orders yet
        </p>
        <p className="text-sm text-muted-foreground mb-6">
          Start your wellness journey — your orders will appear here.
        </p>
        <Button asChild data-ocid="dashboard.shop.button">
          <Link to="/products">Browse Products</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {orders.map((order, i) => {
        const firstProduct = PRODUCTS_SEED_DATA.find(
          (p) => p.id === order.items[0]?.productId,
        );
        const extraCount = order.items.length - 1;
        return (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="glass-card rounded-2xl p-4 sm:p-5 shadow-soft"
            data-ocid={`dashboard.order.${i + 1}.row`}
          >
            <div className="flex items-start gap-4">
              {/* Product thumbnail */}
              {firstProduct && (
                <img
                  src={firstProduct.imageUrl}
                  alt={firstProduct.name}
                  className="w-14 h-14 rounded-xl object-cover shrink-0"
                />
              )}

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <p className="font-semibold text-sm text-foreground">
                    Order #{order.id}
                  </p>
                  <Badge
                    className={`text-xs ${getOrderStatusColor(order.status)} capitalize`}
                  >
                    {order.status}
                  </Badge>
                  <Badge variant="outline" className="text-xs capitalize">
                    {order.paymentMethod === "cod" ? "COD" : "Stripe"}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-1.5">
                  {formatDate(order.createdAt)} · {order.items.length}{" "}
                  {order.items.length === 1 ? "item" : "items"}
                </p>
                <p className="text-xs text-muted-foreground line-clamp-1">
                  {firstProduct?.name ??
                    `Product #${order.items[0]?.productId}`}
                  {extraCount > 0 && ` +${extraCount} more`}
                </p>
              </div>

              <div className="text-right shrink-0">
                <p className="font-bold text-primary text-base">
                  {formatPrice(order.totalAmount)}
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  asChild
                  className="mt-2"
                  data-ocid={`dashboard.order.${i + 1}.view_button`}
                >
                  <Link
                    to="/dashboard/orders/$id"
                    params={{ id: String(order.id) }}
                  >
                    View Details
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

function WishlistTab() {
  const wishlistProducts = PRODUCTS_SEED_DATA.slice(0, 3);
  const [removed, setRemoved] = useState<number[]>([]);
  const visible = wishlistProducts.filter((p) => !removed.includes(p.id));

  if (visible.length === 0) {
    return (
      <div
        className="glass-card rounded-2xl p-14 text-center"
        data-ocid="dashboard.wishlist.empty_state"
      >
        <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <p className="font-semibold text-foreground text-lg mb-2">
          Your wishlist is empty
        </p>
        <p className="text-sm text-muted-foreground mb-6">
          Save products you love to buy them later.
        </p>
        <Button asChild data-ocid="dashboard.wishlist.browse.button">
          <Link to="/products">Explore Products</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {visible.map((product, i) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08 }}
          className="glass-card rounded-2xl overflow-hidden shadow-soft"
          data-ocid={`dashboard.wishlist.item.${i + 1}.card`}
        >
          <div className="relative">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-36 object-cover"
            />
            <button
              type="button"
              onClick={() => setRemoved((prev) => [...prev, product.id])}
              className="absolute top-2 right-2 w-7 h-7 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center hover:bg-destructive/10 transition-smooth"
              aria-label="Remove from wishlist"
              data-ocid={`dashboard.wishlist.remove.${i + 1}.button`}
            >
              <Trash2 className="w-3.5 h-3.5 text-destructive" />
            </button>
          </div>
          <div className="p-4">
            <p className="font-medium text-sm text-foreground line-clamp-2 mb-1">
              {product.name}
            </p>
            <p className="font-bold text-primary text-sm mb-3">
              {formatPrice(product.price)}
            </p>
            <Button
              size="sm"
              className="w-full"
              asChild
              data-ocid={`dashboard.wishlist.view.${i + 1}.button`}
            >
              <Link to="/products/$id" params={{ id: String(product.id) }}>
                View Product
              </Link>
            </Button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function ProfileTab() {
  const { principal } = useAuthStore();
  const [name, setName] = useState("Wellness Seeker");
  const [email, setEmail] = useState("");

  return (
    <div className="glass-card rounded-2xl p-6 shadow-soft space-y-5">
      <div className="flex items-center gap-4">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0"
          style={{ background: "oklch(0.28 0.09 162)" }}
        >
          <User className="w-8 h-8 text-primary-foreground" />
        </div>
        <div className="min-w-0">
          <p className="font-semibold text-foreground text-base">{name}</p>
          <p className="text-xs text-muted-foreground font-mono truncate max-w-[220px] mt-0.5">
            {principal ?? "Not connected"}
          </p>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="profile-name" className="text-sm">
            Display Name
          </Label>
          <Input
            id="profile-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-10 rounded-xl"
            data-ocid="dashboard.profile.name.input"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="profile-email" className="text-sm">
            Email Address{" "}
            <span className="text-muted-foreground font-normal">
              (optional)
            </span>
          </Label>
          <Input
            id="profile-email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-10 rounded-xl"
            data-ocid="dashboard.profile.email.input"
          />
        </div>
        <div className="space-y-1 pt-1">
          <Label className="text-xs text-muted-foreground">
            Principal ID (read-only)
          </Label>
          <div className="bg-muted/60 rounded-xl px-3 py-2.5 font-mono text-xs text-muted-foreground break-all">
            {principal ?? "—"}
          </div>
        </div>
      </div>

      <Button
        type="button"
        className="w-full"
        data-ocid="dashboard.profile.save_button"
      >
        Save Profile
      </Button>
    </div>
  );
}

function SettingsTab() {
  const { logout } = useAuth();
  const [notifOrders, setNotifOrders] = useState(true);
  const [notifPromo, setNotifPromo] = useState(false);
  const [notifHealth, setNotifHealth] = useState(true);

  return (
    <div className="space-y-4">
      <div className="glass-card rounded-2xl p-6 shadow-soft">
        <div className="flex items-center gap-2 mb-5">
          <Bell className="w-4 h-4 text-primary" />
          <h3 className="font-semibold text-foreground text-sm">
            Notification Preferences
          </h3>
        </div>
        <div className="space-y-4">
          {[
            {
              id: "notif-orders",
              label: "Order Updates",
              desc: "Shipping & delivery notifications",
              checked: notifOrders,
              onChange: setNotifOrders,
              ocid: "dashboard.settings.notif_orders.switch",
            },
            {
              id: "notif-promo",
              label: "Promotions & Offers",
              desc: "Flash sales and discount alerts",
              checked: notifPromo,
              onChange: setNotifPromo,
              ocid: "dashboard.settings.notif_promo.switch",
            },
            {
              id: "notif-health",
              label: "Wellness Tips",
              desc: "Ayurvedic tips and product guides",
              checked: notifHealth,
              onChange: setNotifHealth,
              ocid: "dashboard.settings.notif_health.switch",
            },
          ].map(({ id, label, desc, checked, onChange, ocid }) => (
            <div key={id} className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-foreground">{label}</p>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
              <Switch
                id={id}
                checked={checked}
                onCheckedChange={onChange}
                data-ocid={ocid}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="glass-card rounded-2xl p-6 shadow-soft">
        <h3 className="font-semibold text-foreground text-sm mb-4">Account</h3>
        <Button
          variant="outline"
          className="w-full gap-2 border-destructive/30 text-destructive hover:bg-destructive/5 transition-smooth"
          onClick={logout}
          type="button"
          data-ocid="dashboard.settings.logout.button"
        >
          <LogOut className="w-4 h-4" />
          Log Out
        </Button>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<DashTab>("orders");
  const { data: orders } = useUserOrders();
  const { principal } = useAuthStore();

  const tabContent: Record<DashTab, React.ReactNode> = {
    orders: <OrdersTab />,
    wishlist: <WishlistTab />,
    profile: <ProfileTab />,
    settings: <SettingsTab />,
  };

  return (
    <div className="min-h-screen bg-background" data-ocid="dashboard.page">
      {/* Page header */}
      <div className="bg-card border-b border-border/50">
        <div className="container max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="font-display text-2xl font-bold text-foreground">
                My Dashboard
              </h1>
              <p className="text-xs text-muted-foreground font-mono truncate max-w-xs mt-0.5">
                {principal ? `${principal.slice(0, 20)}…` : "Not connected"}
              </p>
            </div>
            {/* Stats strip */}
            <div className="hidden sm:flex gap-6">
              {[
                { icon: Package, label: "Orders", value: orders?.length ?? 0 },
                { icon: Heart, label: "Wishlist", value: 3 },
                {
                  icon: ShoppingBag,
                  label: "Spent",
                  value: formatPrice(
                    orders?.reduce((s, o) => s + o.totalAmount, 0) ?? 0,
                  ),
                },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="text-center">
                  <div className="flex items-center gap-1.5 justify-center mb-0.5">
                    <Icon className="w-3.5 h-3.5 text-primary" />
                    <p className="text-xs text-muted-foreground">{label}</p>
                  </div>
                  <p className="font-bold text-foreground text-sm">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-56 shrink-0">
            {/* Mobile: horizontal scroll tabs */}
            <nav
              className="flex lg:flex-col gap-1 overflow-x-auto scrollbar-hide pb-2 lg:pb-0"
              aria-label="Dashboard navigation"
            >
              {TABS.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setActiveTab(id)}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-smooth whitespace-nowrap w-full text-left
                    ${
                      activeTab === id
                        ? "bg-primary text-primary-foreground shadow-green"
                        : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                    }`}
                  data-ocid={`dashboard.${id}.tab`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  {label}
                </button>
              ))}
            </nav>
          </aside>

          {/* Main content */}
          <main className="flex-1 min-w-0">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
            >
              <h2 className="font-display text-lg font-semibold text-foreground mb-5">
                {TABS.find((t) => t.id === activeTab)?.label}
              </h2>
              {tabContent[activeTab]}
            </motion.div>
          </main>
        </div>
      </div>
    </div>
  );
}
