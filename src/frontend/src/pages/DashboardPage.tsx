import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import {
  Bell,
  Heart,
  LogOut,
  MapPin,
  Package,
  Plus,
  Settings,
  ShoppingBag,
  Trash2,
  User,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { createActor } from "../backend";
import { useAuth } from "../hooks/useAuth";
import { useUserOrders } from "../hooks/useOrders";
import {
  formatDate,
  formatPrice,
  getOrderStatusColor,
} from "../lib/formatters";
import { useAuthStore } from "../stores/useAuthStore";
import type { Product } from "../types";

type DashTab = "orders" | "wishlist" | "profile" | "addresses" | "settings";

const TABS: { id: DashTab; label: string; icon: React.ElementType }[] = [
  { id: "orders", label: "My Orders", icon: Package },
  { id: "wishlist", label: "Wishlist", icon: Heart },
  { id: "profile", label: "My Profile", icon: User },
  { id: "addresses", label: "Addresses", icon: MapPin },
  { id: "settings", label: "Settings", icon: Settings },
];

const STATUS_COLORS: Record<string, string> = {
  pending:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  confirmed: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  processing:
    "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
  shipped:
    "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
  delivered:
    "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  completed:
    "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  cancelled: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
};

function getStatusColor(status: string): string {
  return (
    STATUS_COLORS[status.toLowerCase()] ?? "bg-muted text-muted-foreground"
  );
}

function OrdersTab() {
  const { data: orders, isLoading } = useUserOrders();
  const { actor, isFetching } = useActor(createActor);

  const { data: productMap } = useQuery<Record<number, Product>>({
    queryKey: ["products-map"],
    queryFn: async () => {
      if (!actor || isFetching) return {};
      const raw = await actor.listProducts({});
      const map: Record<number, Product> = {};
      for (const p of raw) {
        map[Number(p.id)] = {
          id: Number(p.id),
          name: p.name,
          description: p.description,
          price: Number(p.price),
          category: p.category,
          imageUrl: p.imageUrl,
          imageKey: p.imageKey,
          images: p.images ?? [],
          stock: Number(p.stock),
          ratings: p.ratings,
          reviewCount: Number(p.reviewCount),
          featured: p.featured,
          bestseller: p.bestseller,
          discount: Number(p.discount),
          bundleIds: p.bundleIds.map(Number),
          status: String(p.status ?? "active") as
            | "active"
            | "inactive"
            | "draft",
        };
      }
      return map;
    },
    enabled: !!actor && !isFetching,
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) {
    return (
      <div className="space-y-3" data-ocid="dashboard.orders.loading_state">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-24 w-full rounded-2xl" />
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
        const firstProduct = productMap?.[order.items[0]?.productId];
        const extraCount = order.items.length - 1;
        const statusColor = getStatusColor(order.status);
        return (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="glass-card rounded-2xl p-4 sm:p-5 shadow-soft"
            data-ocid={`dashboard.order.${i + 1}.row`}
          >
            {/* Status badge prominently at top */}
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <Badge
                className={`text-xs font-semibold capitalize px-2.5 py-1 ${statusColor}`}
              >
                {order.status}
              </Badge>
              <Badge variant="outline" className="text-xs capitalize">
                {order.paymentMethod === "cod" ? "COD" : "Online"}
              </Badge>
              <span className="text-xs text-muted-foreground ml-auto">
                {formatDate(order.createdAt)}
              </span>
            </div>

            <div className="flex items-start gap-4">
              {firstProduct?.imageUrl && (
                <img
                  src={firstProduct.imageUrl}
                  alt={firstProduct.name}
                  className="w-14 h-14 rounded-xl object-cover shrink-0"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              )}

              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-foreground mb-0.5">
                  Order #{order.id}
                </p>
                <p className="text-xs text-muted-foreground mb-1">
                  {order.items.length}{" "}
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
  const { actor, isFetching } = useActor(createActor);
  const { data: wishlistItems = [], isLoading } = useQuery<Product[]>({
    queryKey: ["wishlist"],
    queryFn: async () => {
      if (!actor || isFetching) return [];
      const ids = await actor.getWishlist();
      if (ids.length === 0) return [];
      const allProducts = await actor.listProducts({});
      const wishlistIdSet = new Set(ids.map((id) => Number(id)));
      return allProducts
        .filter((p) => wishlistIdSet.has(Number(p.id)))
        .map((p) => ({
          id: Number(p.id),
          name: p.name,
          description: p.description,
          price: Number(p.price),
          category: p.category,
          imageUrl: p.imageUrl,
          imageKey: p.imageKey,
          images: p.images ?? [],
          stock: Number(p.stock),
          ratings: p.ratings,
          reviewCount: Number(p.reviewCount),
          featured: p.featured,
          bestseller: p.bestseller,
          discount: Number(p.discount),
          bundleIds: p.bundleIds.map(Number),
          status: String(p.status ?? "active") as
            | "active"
            | "inactive"
            | "draft",
        }));
    },
    enabled: !!actor && !isFetching,
    staleTime: 60 * 1000,
  });
  const [removed, setRemoved] = useState<number[]>([]);
  const visible = wishlistItems.filter((p) => !removed.includes(p.id));

  if (isLoading) {
    return (
      <div
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        data-ocid="dashboard.wishlist.loading_state"
      >
        {[1, 2].map((i) => (
          <Skeleton key={i} className="h-56 w-full rounded-2xl" />
        ))}
      </div>
    );
  }

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
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-36 object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            ) : (
              <div className="w-full h-36 bg-primary/10 flex items-center justify-center">
                <Package className="w-8 h-8 text-primary/30" />
              </div>
            )}
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
  const { actor, isFetching } = useActor(createActor);
  const qc = useQueryClient();

  const { data: profile, isLoading } = useQuery({
    queryKey: ["user-profile"],
    queryFn: async () => {
      if (!actor || isFetching) return null;
      return actor.getUserProfile();
    },
    enabled: !!actor && !isFetching,
    staleTime: 60 * 1000,
  });

  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");

  // Sync form with profile when loaded
  useEffect(() => {
    if (profile) {
      setName(profile.name ?? "");
      setCity(profile.city ?? "");
      setState(profile.state ?? "");
      setPincode(profile.pincode ?? "");
    }
  }, [profile]);

  const updateProfile = useMutation({
    mutationFn: async () => {
      if (!actor || !profile) throw new Error("Not connected");
      return actor.updateUserProfile({
        name,
        email: profile.email ?? "",
        phone: profile.phone ?? "",
        city,
        state,
        pincode,
        country: profile.country ?? "India",
        addresses: profile.addresses ?? [],
      });
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["user-profile"] });
      toast.success("Profile updated successfully!");
    },
    onError: () => toast.error("Failed to update profile. Try again."),
  });

  if (isLoading) {
    return (
      <div className="space-y-4" data-ocid="dashboard.profile.loading_state">
        <Skeleton className="h-20 w-full rounded-2xl" />
        <Skeleton className="h-48 w-full rounded-2xl" />
      </div>
    );
  }

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
          <p className="font-semibold text-foreground text-base">
            {profile?.name || name || "—"}
          </p>
          <p className="text-xs text-muted-foreground truncate max-w-[220px] mt-0.5">
            {profile?.email || "No email saved"}
          </p>
          {profile?.phoneVerified && (
            <Badge className="text-xs mt-1 bg-primary/10 text-primary border-none">
              ✓ Phone Verified
            </Badge>
          )}
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="profile-name" className="text-sm">
            Full Name
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
          <Label className="text-sm">
            Email Address{" "}
            <span className="text-muted-foreground font-normal">
              (read-only)
            </span>
          </Label>
          <Input
            value={profile?.email ?? ""}
            readOnly
            className="h-10 rounded-xl bg-muted/50 text-muted-foreground cursor-not-allowed"
            data-ocid="dashboard.profile.email.input"
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-sm">
            Phone{" "}
            <span className="text-muted-foreground font-normal">
              (read-only)
            </span>
          </Label>
          <Input
            value={profile?.phone ?? ""}
            readOnly
            className="h-10 rounded-xl bg-muted/50 text-muted-foreground cursor-not-allowed"
            data-ocid="dashboard.profile.phone.input"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="profile-city" className="text-sm">
              City
            </Label>
            <Input
              id="profile-city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="h-10 rounded-xl"
              placeholder="Mumbai"
              data-ocid="dashboard.profile.city.input"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="profile-state" className="text-sm">
              State
            </Label>
            <Input
              id="profile-state"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="h-10 rounded-xl"
              placeholder="Maharashtra"
              data-ocid="dashboard.profile.state.input"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="profile-pincode" className="text-sm">
              PIN Code
            </Label>
            <Input
              id="profile-pincode"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              className="h-10 rounded-xl"
              placeholder="400001"
              data-ocid="dashboard.profile.pincode.input"
            />
          </div>
        </div>
      </div>

      <Button
        type="button"
        className="w-full"
        disabled={updateProfile.isPending}
        onClick={() => updateProfile.mutate()}
        data-ocid="dashboard.profile.save_button"
      >
        {updateProfile.isPending ? "Saving…" : "Save Profile"}
      </Button>
    </div>
  );
}

function AddressesTab() {
  const { actor, isFetching } = useActor(createActor);
  const qc = useQueryClient();

  const { data: profile, isLoading } = useQuery({
    queryKey: ["user-profile"],
    queryFn: async () => {
      if (!actor || isFetching) return null;
      return actor.getUserProfile();
    },
    enabled: !!actor && !isFetching,
    staleTime: 60 * 1000,
  });

  const removeAddress = useMutation({
    mutationFn: async (addrId: string) => {
      if (!actor || !profile) throw new Error("Not connected");
      const remaining = (profile.addresses ?? []).filter(
        (a) => a.id !== addrId,
      );
      return actor.updateUserProfile({
        name: profile.name,
        email: profile.email,
        phone: profile.phone,
        city: profile.city,
        state: profile.state,
        pincode: profile.pincode,
        country: profile.country ?? "India",
        addresses: remaining,
      });
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["user-profile"] });
      toast.success("Address removed.");
    },
    onError: () => toast.error("Failed to remove address."),
  });

  if (isLoading) {
    return (
      <div className="space-y-3" data-ocid="dashboard.addresses.loading_state">
        <Skeleton className="h-20 w-full rounded-2xl" />
        <Skeleton className="h-20 w-full rounded-2xl" />
      </div>
    );
  }

  const addresses = profile?.addresses ?? [];

  if (addresses.length === 0) {
    return (
      <div
        className="glass-card rounded-2xl p-14 text-center"
        data-ocid="dashboard.addresses.empty_state"
      >
        <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <p className="font-semibold text-foreground text-lg mb-2">
          No saved addresses
        </p>
        <p className="text-sm text-muted-foreground mb-6">
          Your addresses saved during checkout will appear here.
        </p>
        <Button asChild data-ocid="dashboard.addresses.shop_button">
          <Link to="/products">Place an Order</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {addresses.map((addr, i) => (
        <motion.div
          key={addr.id || i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.06 }}
          className="glass-card rounded-2xl p-5 shadow-soft flex items-start gap-4"
          data-ocid={`dashboard.address.${i + 1}.card`}
        >
          <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <MapPin className="w-4 h-4 text-primary" />
          </div>
          <div className="flex-1 min-w-0 space-y-0.5">
            <div className="flex items-center gap-2">
              <p className="font-semibold text-sm text-foreground">
                {addr.fullName}
              </p>
              {addr.isDefault && (
                <Badge className="text-xs bg-primary/10 text-primary border-none px-2">
                  Default
                </Badge>
              )}
              <Badge variant="outline" className="text-xs capitalize">
                {addr.tag}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">{addr.phone}</p>
            <p className="text-xs text-muted-foreground">
              {addr.street}, {addr.city}, {addr.state} — {addr.pincode}
            </p>
          </div>
          <button
            type="button"
            onClick={() => removeAddress.mutate(addr.id)}
            className="w-8 h-8 rounded-lg hover:bg-destructive/10 flex items-center justify-center transition-smooth shrink-0"
            aria-label="Remove address"
            data-ocid={`dashboard.address.${i + 1}.delete_button`}
          >
            <Trash2 className="w-3.5 h-3.5 text-destructive" />
          </button>
        </motion.div>
      ))}
      <div className="flex items-center gap-2 p-4 rounded-xl border border-dashed border-border text-muted-foreground text-sm">
        <Plus className="w-4 h-4 shrink-0" />
        <span>Addresses are auto-saved when you checkout</span>
      </div>
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
  const { actor, isFetching } = useActor(createActor);

  const { data: profile } = useQuery({
    queryKey: ["user-profile"],
    queryFn: async () => {
      if (!actor || isFetching) return null;
      return actor.getUserProfile();
    },
    enabled: !!actor && !isFetching,
    staleTime: 60 * 1000,
  });

  const tabContent: Record<DashTab, React.ReactNode> = {
    orders: <OrdersTab />,
    wishlist: <WishlistTab />,
    profile: <ProfileTab />,
    addresses: <AddressesTab />,
    settings: <SettingsTab />,
  };

  return (
    <div className="min-h-screen bg-background" data-ocid="dashboard.page">
      <div className="bg-card border-b border-border/50">
        <div className="container max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="font-display text-2xl font-bold text-foreground">
                My Dashboard
              </h1>
              <p className="text-xs text-muted-foreground mt-0.5 truncate max-w-xs">
                {profile?.name
                  ? `Welcome back, ${profile.name}`
                  : "Welcome to Forestheals"}
              </p>
            </div>
            <div className="hidden sm:flex gap-4 sm:gap-6">
              {[
                { icon: Package, label: "Orders", value: orders?.length ?? 0 },
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
          <aside className="lg:w-56 shrink-0">
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
