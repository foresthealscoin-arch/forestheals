import { c as createLucideIcon, r as reactExports, u as useActor, q as useQuery, j as jsxRuntimeExports, S as ShoppingBag, H as Heart, U as User, m as motion, t as useAuth, a as Button, v as LogOut, p as useQueryClient, e as ue, L as Link, B as Badge, I as Input, f as createActor } from "./index-CfU2kVIJ.js";
import { L as Label } from "./label-BjUfKOjb.js";
import { S as Separator } from "./separator-CmNF3NW2.js";
import { S as Skeleton } from "./skeleton-Dbe_tSkr.js";
import { S as Switch } from "./switch-BPNoaHft.js";
import { u as useMutation } from "./useMutation-DVPdZiQH.js";
import { a as useUserOrders } from "./useOrders-2Z68O22a.js";
import { f as formatPrice, a as formatDate } from "./formatters-CN9TrYCS.js";
import { P as Package } from "./package-C5tkAuNr.js";
import { M as MapPin } from "./map-pin-DbcUiQCi.js";
import { T as Trash2 } from "./trash-2-CLRUW9XH.js";
import { P as Plus } from "./plus-Dgb9NiV8.js";
import "./index-l7_3JU5-.js";
import "./index-Dzwq3ONP.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M10.268 21a2 2 0 0 0 3.464 0", key: "vwvbt9" }],
  [
    "path",
    {
      d: "M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",
      key: "11g9vi"
    }
  ]
];
const Bell = createLucideIcon("bell", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",
      key: "1qme2f"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
];
const Settings = createLucideIcon("settings", __iconNode);
const TABS = [
  { id: "orders", label: "My Orders", icon: Package },
  { id: "wishlist", label: "Wishlist", icon: Heart },
  { id: "profile", label: "My Profile", icon: User },
  { id: "addresses", label: "Addresses", icon: MapPin },
  { id: "settings", label: "Settings", icon: Settings }
];
const STATUS_COLORS = {
  pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  confirmed: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  processing: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
  shipped: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
  delivered: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  completed: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  cancelled: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
};
function getStatusColor(status) {
  return STATUS_COLORS[status.toLowerCase()] ?? "bg-muted text-muted-foreground";
}
function OrdersTab() {
  const { data: orders, isLoading } = useUserOrders();
  const { actor, isFetching } = useActor(createActor);
  const { data: productMap } = useQuery({
    queryKey: ["products-map"],
    queryFn: async () => {
      if (!actor || isFetching) return {};
      const raw = await actor.listProducts({});
      const map = {};
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
          status: String(p.status ?? "active")
        };
      }
      return map;
    },
    enabled: !!actor && !isFetching,
    staleTime: 5 * 60 * 1e3
  });
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "dashboard.orders.loading_state", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 w-full rounded-2xl" }, i)) });
  }
  if (!orders || orders.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "glass-card rounded-2xl p-14 text-center",
        "data-ocid": "dashboard.orders.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-12 h-12 text-muted-foreground mx-auto mb-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-lg mb-2", children: "No orders yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-6", children: "Start your wellness journey — your orders will appear here." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, "data-ocid": "dashboard.shop.button", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", children: "Browse Products" }) })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: orders.map((order, i) => {
    var _a, _b;
    const firstProduct = productMap == null ? void 0 : productMap[(_a = order.items[0]) == null ? void 0 : _a.productId];
    const extraCount = order.items.length - 1;
    const statusColor = getStatusColor(order.status);
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: i * 0.06 },
        className: "glass-card rounded-2xl p-4 sm:p-5 shadow-soft",
        "data-ocid": `dashboard.order.${i + 1}.row`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                className: `text-xs font-semibold capitalize px-2.5 py-1 ${statusColor}`,
                children: order.status
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs capitalize", children: order.paymentMethod === "cod" ? "COD" : "Online" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground ml-auto", children: formatDate(order.createdAt) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
            (firstProduct == null ? void 0 : firstProduct.imageUrl) && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: firstProduct.imageUrl,
                alt: firstProduct.name,
                className: "w-14 h-14 rounded-xl object-cover shrink-0",
                onError: (e) => {
                  e.currentTarget.style.display = "none";
                }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-semibold text-sm text-foreground mb-0.5", children: [
                "Order #",
                order.id
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mb-1", children: [
                order.items.length,
                " ",
                order.items.length === 1 ? "item" : "items"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground line-clamp-1", children: [
                (firstProduct == null ? void 0 : firstProduct.name) ?? `Product #${(_b = order.items[0]) == null ? void 0 : _b.productId}`,
                extraCount > 0 && ` +${extraCount} more`
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-primary text-base", children: formatPrice(order.totalAmount) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "sm",
                  variant: "outline",
                  asChild: true,
                  className: "mt-2",
                  "data-ocid": `dashboard.order.${i + 1}.view_button`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Link,
                    {
                      to: "/dashboard/orders/$id",
                      params: { id: String(order.id) },
                      children: "View Details"
                    }
                  )
                }
              )
            ] })
          ] })
        ]
      },
      order.id
    );
  }) });
}
function WishlistTab() {
  const { actor, isFetching } = useActor(createActor);
  const { data: wishlistItems = [], isLoading } = useQuery({
    queryKey: ["wishlist"],
    queryFn: async () => {
      if (!actor || isFetching) return [];
      const ids = await actor.getWishlist();
      if (ids.length === 0) return [];
      const allProducts = await actor.listProducts({});
      const wishlistIdSet = new Set(ids.map((id) => Number(id)));
      return allProducts.filter((p) => wishlistIdSet.has(Number(p.id))).map((p) => ({
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
        status: String(p.status ?? "active")
      }));
    },
    enabled: !!actor && !isFetching,
    staleTime: 60 * 1e3
  });
  const [removed, setRemoved] = reactExports.useState([]);
  const visible = wishlistItems.filter((p) => !removed.includes(p.id));
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
        "data-ocid": "dashboard.wishlist.loading_state",
        children: [1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-56 w-full rounded-2xl" }, i))
      }
    );
  }
  if (visible.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "glass-card rounded-2xl p-14 text-center",
        "data-ocid": "dashboard.wishlist.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-12 h-12 text-muted-foreground mx-auto mb-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-lg mb-2", children: "Your wishlist is empty" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-6", children: "Save products you love to buy them later." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, "data-ocid": "dashboard.wishlist.browse.button", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", children: "Explore Products" }) })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: visible.map((product, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 12 },
      animate: { opacity: 1, y: 0 },
      transition: { delay: i * 0.08 },
      className: "glass-card rounded-2xl overflow-hidden shadow-soft",
      "data-ocid": `dashboard.wishlist.item.${i + 1}.card`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          product.imageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: product.imageUrl,
              alt: product.name,
              className: "w-full h-36 object-cover",
              onError: (e) => {
                e.currentTarget.style.display = "none";
              }
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-36 bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-8 h-8 text-primary/30" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setRemoved((prev) => [...prev, product.id]),
              className: "absolute top-2 right-2 w-7 h-7 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center hover:bg-destructive/10 transition-smooth",
              "aria-label": "Remove from wishlist",
              "data-ocid": `dashboard.wishlist.remove.${i + 1}.button`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5 text-destructive" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-sm text-foreground line-clamp-2 mb-1", children: product.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-primary text-sm mb-3", children: formatPrice(product.price) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "sm",
              className: "w-full",
              asChild: true,
              "data-ocid": `dashboard.wishlist.view.${i + 1}.button`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products/$id", params: { id: String(product.id) }, children: "View Product" })
            }
          )
        ] })
      ]
    },
    product.id
  )) });
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
    staleTime: 60 * 1e3
  });
  const [name, setName] = reactExports.useState("");
  const [city, setCity] = reactExports.useState("");
  const [state, setState] = reactExports.useState("");
  const [pincode, setPincode] = reactExports.useState("");
  reactExports.useEffect(() => {
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
        addresses: profile.addresses ?? []
      });
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["user-profile"] });
      ue.success("Profile updated successfully!");
    },
    onError: () => ue.error("Failed to update profile. Try again.")
  });
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", "data-ocid": "dashboard.profile.loading_state", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 w-full rounded-2xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-48 w-full rounded-2xl" })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card rounded-2xl p-6 shadow-soft space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "w-16 h-16 rounded-2xl flex items-center justify-center shrink-0",
          style: { background: "oklch(0.28 0.09 162)" },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-8 h-8 text-primary-foreground" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-base", children: (profile == null ? void 0 : profile.name) || name || "—" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate max-w-[220px] mt-0.5", children: (profile == null ? void 0 : profile.email) || "No email saved" }),
        (profile == null ? void 0 : profile.phoneVerified) && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "text-xs mt-1 bg-primary/10 text-primary border-none", children: "✓ Phone Verified" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "profile-name", className: "text-sm", children: "Full Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "profile-name",
            value: name,
            onChange: (e) => setName(e.target.value),
            className: "h-10 rounded-xl",
            "data-ocid": "dashboard.profile.name.input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-sm", children: [
          "Email Address",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-normal", children: "(read-only)" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            value: (profile == null ? void 0 : profile.email) ?? "",
            readOnly: true,
            className: "h-10 rounded-xl bg-muted/50 text-muted-foreground cursor-not-allowed",
            "data-ocid": "dashboard.profile.email.input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-sm", children: [
          "Phone",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-normal", children: "(read-only)" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            value: (profile == null ? void 0 : profile.phone) ?? "",
            readOnly: true,
            className: "h-10 rounded-xl bg-muted/50 text-muted-foreground cursor-not-allowed",
            "data-ocid": "dashboard.profile.phone.input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "profile-city", className: "text-sm", children: "City" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "profile-city",
              value: city,
              onChange: (e) => setCity(e.target.value),
              className: "h-10 rounded-xl",
              placeholder: "Mumbai",
              "data-ocid": "dashboard.profile.city.input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "profile-state", className: "text-sm", children: "State" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "profile-state",
              value: state,
              onChange: (e) => setState(e.target.value),
              className: "h-10 rounded-xl",
              placeholder: "Maharashtra",
              "data-ocid": "dashboard.profile.state.input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "profile-pincode", className: "text-sm", children: "PIN Code" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "profile-pincode",
              value: pincode,
              onChange: (e) => setPincode(e.target.value),
              className: "h-10 rounded-xl",
              placeholder: "400001",
              "data-ocid": "dashboard.profile.pincode.input"
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        type: "button",
        className: "w-full",
        disabled: updateProfile.isPending,
        onClick: () => updateProfile.mutate(),
        "data-ocid": "dashboard.profile.save_button",
        children: updateProfile.isPending ? "Saving…" : "Save Profile"
      }
    )
  ] });
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
    staleTime: 60 * 1e3
  });
  const removeAddress = useMutation({
    mutationFn: async (addrId) => {
      if (!actor || !profile) throw new Error("Not connected");
      const remaining = (profile.addresses ?? []).filter(
        (a) => a.id !== addrId
      );
      return actor.updateUserProfile({
        name: profile.name,
        email: profile.email,
        phone: profile.phone,
        city: profile.city,
        state: profile.state,
        pincode: profile.pincode,
        country: profile.country ?? "India",
        addresses: remaining
      });
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["user-profile"] });
      ue.success("Address removed.");
    },
    onError: () => ue.error("Failed to remove address.")
  });
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", "data-ocid": "dashboard.addresses.loading_state", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 w-full rounded-2xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 w-full rounded-2xl" })
    ] });
  }
  const addresses = (profile == null ? void 0 : profile.addresses) ?? [];
  if (addresses.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "glass-card rounded-2xl p-14 text-center",
        "data-ocid": "dashboard.addresses.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-12 h-12 text-muted-foreground mx-auto mb-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-lg mb-2", children: "No saved addresses" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-6", children: "Your addresses saved during checkout will appear here." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, "data-ocid": "dashboard.addresses.shop_button", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", children: "Place an Order" }) })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
    addresses.map((addr, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: i * 0.06 },
        className: "glass-card rounded-2xl p-5 shadow-soft flex items-start gap-4",
        "data-ocid": `dashboard.address.${i + 1}.card`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-4 h-4 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 space-y-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground", children: addr.fullName }),
              addr.isDefault && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "text-xs bg-primary/10 text-primary border-none px-2", children: "Default" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs capitalize", children: addr.tag })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: addr.phone }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              addr.street,
              ", ",
              addr.city,
              ", ",
              addr.state,
              " — ",
              addr.pincode
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => removeAddress.mutate(addr.id),
              className: "w-8 h-8 rounded-lg hover:bg-destructive/10 flex items-center justify-center transition-smooth shrink-0",
              "aria-label": "Remove address",
              "data-ocid": `dashboard.address.${i + 1}.delete_button`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5 text-destructive" })
            }
          )
        ]
      },
      addr.id || i
    )),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 p-4 rounded-xl border border-dashed border-border text-muted-foreground text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Addresses are auto-saved when you checkout" })
    ] })
  ] });
}
function SettingsTab() {
  const { logout } = useAuth();
  const [notifOrders, setNotifOrders] = reactExports.useState(true);
  const [notifPromo, setNotifPromo] = reactExports.useState(false);
  const [notifHealth, setNotifHealth] = reactExports.useState(true);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card rounded-2xl p-6 shadow-soft", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-4 h-4 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground text-sm", children: "Notification Preferences" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: [
        {
          id: "notif-orders",
          label: "Order Updates",
          desc: "Shipping & delivery notifications",
          checked: notifOrders,
          onChange: setNotifOrders,
          ocid: "dashboard.settings.notif_orders.switch"
        },
        {
          id: "notif-promo",
          label: "Promotions & Offers",
          desc: "Flash sales and discount alerts",
          checked: notifPromo,
          onChange: setNotifPromo,
          ocid: "dashboard.settings.notif_promo.switch"
        },
        {
          id: "notif-health",
          label: "Wellness Tips",
          desc: "Ayurvedic tips and product guides",
          checked: notifHealth,
          onChange: setNotifHealth,
          ocid: "dashboard.settings.notif_health.switch"
        }
      ].map(({ id, label, desc, checked, onChange, ocid }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: desc })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Switch,
          {
            id,
            checked,
            onCheckedChange: onChange,
            "data-ocid": ocid
          }
        )
      ] }, id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card rounded-2xl p-6 shadow-soft", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground text-sm mb-4", children: "Account" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          className: "w-full gap-2 border-destructive/30 text-destructive hover:bg-destructive/5 transition-smooth",
          onClick: logout,
          type: "button",
          "data-ocid": "dashboard.settings.logout.button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-4 h-4" }),
            "Log Out"
          ]
        }
      )
    ] })
  ] });
}
function DashboardPage() {
  var _a;
  const [activeTab, setActiveTab] = reactExports.useState("orders");
  const { data: orders } = useUserOrders();
  const { actor, isFetching } = useActor(createActor);
  const { data: profile } = useQuery({
    queryKey: ["user-profile"],
    queryFn: async () => {
      if (!actor || isFetching) return null;
      return actor.getUserProfile();
    },
    enabled: !!actor && !isFetching,
    staleTime: 60 * 1e3
  });
  const tabContent = {
    orders: /* @__PURE__ */ jsxRuntimeExports.jsx(OrdersTab, {}),
    wishlist: /* @__PURE__ */ jsxRuntimeExports.jsx(WishlistTab, {}),
    profile: /* @__PURE__ */ jsxRuntimeExports.jsx(ProfileTab, {}),
    addresses: /* @__PURE__ */ jsxRuntimeExports.jsx(AddressesTab, {}),
    settings: /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsTab, {})
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", "data-ocid": "dashboard.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border/50", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container max-w-6xl mx-auto px-4 py-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: "My Dashboard" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5 truncate max-w-xs", children: (profile == null ? void 0 : profile.name) ? `Welcome back, ${profile.name}` : "Welcome to Forestheals" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden sm:flex gap-4 sm:gap-6", children: [
        { icon: Package, label: "Orders", value: (orders == null ? void 0 : orders.length) ?? 0 },
        {
          icon: ShoppingBag,
          label: "Spent",
          value: formatPrice(
            (orders == null ? void 0 : orders.reduce((s, o) => s + o.totalAmount, 0)) ?? 0
          )
        }
      ].map(({ icon: Icon, label, value }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 justify-center mb-0.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-3.5 h-3.5 text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: label })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-foreground text-sm", children: value })
      ] }, label)) })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container max-w-6xl mx-auto px-4 py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col lg:flex-row gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "lg:w-56 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "nav",
        {
          className: "flex lg:flex-col gap-1 overflow-x-auto scrollbar-hide pb-2 lg:pb-0",
          "aria-label": "Dashboard navigation",
          children: TABS.map(({ id, label, icon: Icon }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setActiveTab(id),
              className: `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-smooth whitespace-nowrap w-full text-left
                    ${activeTab === id ? "bg-primary text-primary-foreground shadow-green" : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"}`,
              "data-ocid": `dashboard.${id}.tab`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-4 h-4 shrink-0" }),
                label
              ]
            },
            id
          ))
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 min-w-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 8 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.25 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold text-foreground mb-5", children: (_a = TABS.find((t) => t.id === activeTab)) == null ? void 0 : _a.label }),
            tabContent[activeTab]
          ]
        },
        activeTab
      ) })
    ] }) })
  ] });
}
export {
  DashboardPage as default
};
