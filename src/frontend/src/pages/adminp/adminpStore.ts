import { create } from "zustand";
import { persist } from "zustand/middleware";
import { PRODUCTS_SEED_DATA } from "../../lib/seedData";
import type { Product } from "../../types";

export interface APOrder {
  id: string;
  customer: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  products: { name: string; qty: number; price: number }[];
  total: number;
  paymentMethod: "COD" | "Online";
  paymentStatus: "Paid" | "Pending" | "Failed";
  status:
    | "Pending"
    | "Confirmed"
    | "Processing"
    | "Packed"
    | "Shipped"
    | "Delivered"
    | "Cancelled"
    | "Returned"
    | "Refunded";
  trackingId: string;
  notes: string;
  createdAt: string;
}

export interface APCustomer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  totalSpend: number;
  orderCount: number;
  lastOrder: string;
  status: "Active" | "VIP" | "Blocked";
  tags: string[];
  notes: string;
  joinedAt: string;
}

export interface APExpense {
  id: string;
  category:
    | "Ad Spend"
    | "Packaging"
    | "Shipping"
    | "Warehouse"
    | "Salary"
    | "Misc";
  amount: number;
  description: string;
  date: string;
}

export interface APCoupon {
  id: string;
  code: string;
  type: "Percentage" | "Flat" | "Free Shipping";
  value: number;
  minCart: number;
  maxUses: number;
  usedCount: number;
  active: boolean;
  expiry: string;
}

export interface APTask {
  id: string;
  title: string;
  priority: "High" | "Medium" | "Low";
  dueDate: string;
  assignedTo: string;
  completed: boolean;
  notes: string;
  createdAt: string;
}

export interface APTeamMember {
  id: string;
  name: string;
  email: string;
  role: "Super Admin" | "Admin" | "Manager" | "Staff" | "Customer Support";
  status: "Active" | "Inactive";
  joinedAt: string;
  lastLogin: string;
}

export interface APReview {
  id: string;
  productName: string;
  customerName: string;
  rating: number;
  comment: string;
  status: "Pending" | "Approved" | "Rejected";
  createdAt: string;
  reply: string;
}

export interface APBlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  featuredImage: string;
  metaTitle: string;
  metaDesc: string;
  tags: string[];
  status: "Draft" | "Published";
  publishDate: string;
}

export interface APInventoryItem {
  id: string;
  productName: string;
  sku: string;
  current: number;
  reserved: number;
  incoming: number;
  damaged: number;
  lowStockThreshold: number;
  supplier: string;
  purchaseCost: number;
  batchNo: string;
  expiryDate: string;
}

export interface APAnalytics {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  averageOrderValue: number;
  netProfit: number;
  totalExpenses: number;
}

interface AdminPStore {
  isLoggedIn: boolean;
  products: Product[];
  orders: APOrder[];
  customers: APCustomer[];
  expenses: APExpense[];
  coupons: APCoupon[];
  tasks: APTask[];
  team: APTeamMember[];
  reviews: APReview[];
  blogPosts: APBlogPost[];
  inventory: APInventoryItem[];
  analytics: APAnalytics | null;
  settings: {
    storeName: string;
    contactEmail: string;
    contactPhone: string;
    gstNumber: string;
    currency: string;
    timezone: string;
  };
  login: () => void;
  logout: () => void;
  setProducts: (products: Product[]) => void;
  addProduct: (p: Product) => void;
  updateProduct: (p: Product) => void;
  deleteProduct: (id: number) => void;
  addOrder: (o: APOrder) => void;
  updateOrder: (o: APOrder) => void;
  addCustomer: (c: APCustomer) => void;
  updateCustomer: (c: APCustomer) => void;
  deleteCustomer: (id: string) => void;
  addExpense: (e: APExpense) => void;
  updateExpense: (e: APExpense) => void;
  deleteExpense: (id: string) => void;
  addCoupon: (c: APCoupon) => void;
  updateCoupon: (c: APCoupon) => void;
  deleteCoupon: (id: string) => void;
  addTask: (t: APTask) => void;
  updateTask: (t: APTask) => void;
  deleteTask: (id: string) => void;
  addTeamMember: (m: APTeamMember) => void;
  updateTeamMember: (m: APTeamMember) => void;
  deleteTeamMember: (id: string) => void;
  addReview: (r: APReview) => void;
  updateReview: (r: APReview) => void;
  addBlogPost: (p: APBlogPost) => void;
  updateBlogPost: (p: APBlogPost) => void;
  deleteBlogPost: (id: string) => void;
  updateInventoryItem: (item: APInventoryItem) => void;
  setInventory: (items: APInventoryItem[]) => void;
  updateSettings: (s: Partial<AdminPStore["settings"]>) => void;
  setAnalytics: (a: APAnalytics) => void;
  setOrders: (orders: APOrder[]) => void;
  setCustomers: (customers: APCustomer[]) => void;
  setReviews: (reviews: APReview[]) => void;
  setBlogPosts: (posts: APBlogPost[]) => void;
  setTeam: (members: APTeamMember[]) => void;
  setTasks: (tasks: APTask[]) => void;
  setCoupons: (coupons: APCoupon[]) => void;
  setExpenses: (expenses: APExpense[]) => void;
}

const SEED_ORDERS: APOrder[] = [
  {
    id: "ORD-001",
    customer: "Priya Sharma",
    email: "priya@example.com",
    phone: "9876543210",
    address: "12 Green Park",
    city: "Delhi",
    state: "Delhi",
    pincode: "110016",
    products: [
      { name: "Brahmi Powder", qty: 2, price: 249 },
      { name: "Organic Amla Powder", qty: 1, price: 219 },
    ],
    total: 717,
    paymentMethod: "Online",
    paymentStatus: "Paid",
    status: "Delivered",
    trackingId: "DTDC123456789",
    notes: "",
    createdAt: "2026-04-10",
  },
  {
    id: "ORD-002",
    customer: "Rahul Verma",
    email: "rahul@example.com",
    phone: "9123456780",
    address: "45 Lake View",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400001",
    products: [{ name: "Organic Ashwagandha Powder", qty: 1, price: 299 }],
    total: 299,
    paymentMethod: "COD",
    paymentStatus: "Pending",
    status: "Shipped",
    trackingId: "BLUE987654321",
    notes: "Call before delivery",
    createdAt: "2026-04-14",
  },
  {
    id: "ORD-003",
    customer: "Anita Joshi",
    email: "anita@example.com",
    phone: "9988776655",
    address: "7 Rose Garden",
    city: "Jaipur",
    state: "Rajasthan",
    pincode: "302001",
    products: [
      { name: "Triphala Churan", qty: 2, price: 229 },
      { name: "Cardamom", qty: 1, price: 299 },
    ],
    total: 757,
    paymentMethod: "Online",
    paymentStatus: "Paid",
    status: "Confirmed",
    trackingId: "",
    notes: "",
    createdAt: "2026-04-16",
  },
  {
    id: "ORD-004",
    customer: "Vikram Singh",
    email: "vikram@example.com",
    phone: "9001122334",
    address: "89 Hill Station Road",
    city: "Shimla",
    state: "Himachal Pradesh",
    pincode: "171001",
    products: [{ name: "Shatavari Powder", qty: 1, price: 349 }],
    total: 349,
    paymentMethod: "COD",
    paymentStatus: "Pending",
    status: "Pending",
    trackingId: "",
    notes: "",
    createdAt: "2026-04-17",
  },
  {
    id: "ORD-005",
    customer: "Meera Nair",
    email: "meera@example.com",
    phone: "9876001234",
    address: "34 Coconut Grove",
    city: "Kochi",
    state: "Kerala",
    pincode: "682001",
    products: [
      { name: "Cloves", qty: 2, price: 189 },
      { name: "Cinnamon Powder", qty: 1, price: 249 },
    ],
    total: 627,
    paymentMethod: "Online",
    paymentStatus: "Paid",
    status: "Processing",
    trackingId: "",
    notes: "Gift wrap requested",
    createdAt: "2026-04-17",
  },
];

const SEED_CUSTOMERS: APCustomer[] = [
  {
    id: "CUST-001",
    name: "Priya Sharma",
    email: "priya@example.com",
    phone: "9876543210",
    address: "12 Green Park, Delhi",
    totalSpend: 2140,
    orderCount: 3,
    lastOrder: "2026-04-10",
    status: "VIP",
    tags: ["Repeat", "Loyal"],
    notes: "Prefers herbal powders",
    joinedAt: "2025-11-20",
  },
  {
    id: "CUST-002",
    name: "Rahul Verma",
    email: "rahul@example.com",
    phone: "9123456780",
    address: "45 Lake View, Mumbai",
    totalSpend: 598,
    orderCount: 2,
    lastOrder: "2026-04-14",
    status: "Active",
    tags: ["New"],
    notes: "",
    joinedAt: "2026-02-15",
  },
  {
    id: "CUST-003",
    name: "Anita Joshi",
    email: "anita@example.com",
    phone: "9988776655",
    address: "7 Rose Garden, Jaipur",
    totalSpend: 1514,
    orderCount: 2,
    lastOrder: "2026-04-16",
    status: "Active",
    tags: ["Spices", "Repeat"],
    notes: "",
    joinedAt: "2026-01-08",
  },
];

const SEED_EXPENSES: APExpense[] = [
  {
    id: "EXP-001",
    category: "Ad Spend",
    amount: 12000,
    description: "Instagram & Google Ads - April",
    date: "2026-04-01",
  },
  {
    id: "EXP-002",
    category: "Packaging",
    amount: 4500,
    description: "Eco-friendly pouches batch",
    date: "2026-04-03",
  },
  {
    id: "EXP-003",
    category: "Shipping",
    amount: 3200,
    description: "Courier charges - March",
    date: "2026-04-05",
  },
  {
    id: "EXP-004",
    category: "Salary",
    amount: 35000,
    description: "April payroll",
    date: "2026-04-01",
  },
  {
    id: "EXP-005",
    category: "Misc",
    amount: 1800,
    description: "Office supplies",
    date: "2026-04-10",
  },
];

const SEED_COUPONS: APCoupon[] = [
  {
    id: "CPN-001",
    code: "FIRST10",
    type: "Percentage",
    value: 10,
    minCart: 299,
    maxUses: 500,
    usedCount: 87,
    active: true,
    expiry: "2026-12-31",
  },
  {
    id: "CPN-002",
    code: "FREESHIP",
    type: "Free Shipping",
    value: 0,
    minCart: 499,
    maxUses: 200,
    usedCount: 34,
    active: true,
    expiry: "2026-06-30",
  },
  {
    id: "CPN-003",
    code: "FLAT50",
    type: "Flat",
    value: 50,
    minCart: 599,
    maxUses: 100,
    usedCount: 12,
    active: false,
    expiry: "2026-03-31",
  },
];

const SEED_TASKS: APTask[] = [
  {
    id: "TASK-001",
    title: "Restock Ashwagandha Powder",
    priority: "High",
    dueDate: "2026-04-20",
    assignedTo: "Raj",
    completed: false,
    notes: "Contact Rajasthan supplier",
    createdAt: "2026-04-15",
  },
  {
    id: "TASK-002",
    title: "Launch May Summer Sale",
    priority: "Medium",
    dueDate: "2026-04-30",
    assignedTo: "Team",
    completed: false,
    notes: "Prepare banners and coupon codes",
    createdAt: "2026-04-16",
  },
  {
    id: "TASK-003",
    title: "Reply to pending reviews",
    priority: "Low",
    dueDate: "2026-04-21",
    assignedTo: "Support",
    completed: true,
    notes: "",
    createdAt: "2026-04-17",
  },
];

const SEED_TEAM: APTeamMember[] = [
  {
    id: "TM-001",
    name: "Arjun Patel",
    email: "arjun@forestheals.in",
    role: "Super Admin",
    status: "Active",
    joinedAt: "2025-06-01",
    lastLogin: "2026-04-18",
  },
  {
    id: "TM-002",
    name: "Sunita Mehra",
    email: "sunita@forestheals.in",
    role: "Manager",
    status: "Active",
    joinedAt: "2025-09-15",
    lastLogin: "2026-04-17",
  },
  {
    id: "TM-003",
    name: "Deepak Kumar",
    email: "deepak@forestheals.in",
    role: "Staff",
    status: "Active",
    joinedAt: "2026-01-10",
    lastLogin: "2026-04-16",
  },
];

const SEED_REVIEWS: APReview[] = [
  {
    id: "REV-001",
    productName: "Brahmi Powder",
    customerName: "Priya S.",
    rating: 5,
    comment: "Excellent quality! My memory has improved noticeably.",
    status: "Approved",
    createdAt: "2026-04-11",
    reply: "",
  },
  {
    id: "REV-002",
    productName: "Organic Ashwagandha",
    customerName: "Rahul V.",
    rating: 4,
    comment: "Good product, packaging could be better.",
    status: "Pending",
    createdAt: "2026-04-15",
    reply: "",
  },
  {
    id: "REV-003",
    productName: "Triphala Churan",
    customerName: "Anita J.",
    rating: 5,
    comment: "Best digestive supplement I've ever used!",
    status: "Approved",
    createdAt: "2026-04-17",
    reply: "Thank you Anita! 🌿",
  },
];

const SEED_BLOG: APBlogPost[] = [
  {
    id: "BLG-001",
    title: "10 Benefits of Ashwagandha for Modern Stress",
    slug: "ashwagandha-benefits-stress",
    content:
      "Ashwagandha (Withania somnifera) is one of Ayurveda's most revered herbs...",
    featuredImage:
      "https://images.unsplash.com/photo-1611485988300-b7ef6f928b24?w=800&q=80",
    metaTitle: "Ashwagandha Benefits for Stress Relief | Forestheals",
    metaDesc:
      "Discover 10 science-backed benefits of Ashwagandha for managing modern stress.",
    tags: ["Ayurveda", "Stress", "Wellness"],
    status: "Published",
    publishDate: "2026-04-05",
  },
  {
    id: "BLG-002",
    title: "Moringa: The Miracle Tree You Should Know About",
    slug: "moringa-miracle-tree-benefits",
    content: "Moringa oleifera is packed with nutrients and antioxidants...",
    featuredImage:
      "https://images.unsplash.com/photo-1542848284-8afa78a08ccb?w=800&q=80",
    metaTitle: "Moringa Benefits | Forestheals",
    metaDesc:
      "Learn why Moringa is called the miracle tree and how it can transform your health.",
    tags: ["Moringa", "Superfood", "Nutrition"],
    status: "Draft",
    publishDate: "",
  },
];

const SEED_INVENTORY: APInventoryItem[] = PRODUCTS_SEED_DATA.slice(0, 8).map(
  (p, i) => ({
    id: `INV-${String(i + 1).padStart(3, "0")}`,
    productName: p.name,
    sku: `FH-${p.imageKey?.toUpperCase() ?? i + 1}-001`,
    current: p.stock,
    reserved: Math.floor(p.stock * 0.1),
    incoming: i % 3 === 0 ? 50 : 0,
    damaged: i % 7 === 0 ? 2 : 0,
    lowStockThreshold: 20,
    supplier: "Forest Herbs Co.",
    purchaseCost: Math.floor(p.price * 0.4),
    batchNo: `B2026-04-${String(i + 1).padStart(2, "0")}`,
    expiryDate: "2027-12-31",
  }),
);

export const useAdminPStore = create<AdminPStore>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      products: PRODUCTS_SEED_DATA.map((p) => ({ ...p })),
      orders: SEED_ORDERS,
      customers: SEED_CUSTOMERS,
      expenses: SEED_EXPENSES,
      coupons: SEED_COUPONS,
      tasks: SEED_TASKS,
      team: SEED_TEAM,
      reviews: SEED_REVIEWS,
      blogPosts: SEED_BLOG,
      inventory: SEED_INVENTORY,
      analytics: null,
      settings: {
        storeName: "Forestheals",
        contactEmail: "hello@forestheals.in",
        contactPhone: "+91 9929059240",
        gstNumber: "27AAPFF1234F1Z2",
        currency: "INR",
        timezone: "Asia/Kolkata",
      },
      login: () => set({ isLoggedIn: true }),
      logout: () => set({ isLoggedIn: false }),
      setProducts: (products) => set({ products }),
      addProduct: (p) => set((s) => ({ products: [...s.products, p] })),
      updateProduct: (p) =>
        set((s) => ({
          products: s.products.map((x) => (x.id === p.id ? p : x)),
        })),
      deleteProduct: (id) =>
        set((s) => ({ products: s.products.filter((x) => x.id !== id) })),
      addOrder: (o) => set((s) => ({ orders: [o, ...s.orders] })),
      updateOrder: (o) =>
        set((s) => ({ orders: s.orders.map((x) => (x.id === o.id ? o : x)) })),
      setOrders: (orders) => set({ orders }),
      addCustomer: (c) => set((s) => ({ customers: [...s.customers, c] })),
      updateCustomer: (c) =>
        set((s) => ({
          customers: s.customers.map((x) => (x.id === c.id ? c : x)),
        })),
      deleteCustomer: (id) =>
        set((s) => ({ customers: s.customers.filter((x) => x.id !== id) })),
      setCustomers: (customers) => set({ customers }),
      addExpense: (e) => set((s) => ({ expenses: [...s.expenses, e] })),
      updateExpense: (e) =>
        set((s) => ({
          expenses: s.expenses.map((x) => (x.id === e.id ? e : x)),
        })),
      deleteExpense: (id) =>
        set((s) => ({ expenses: s.expenses.filter((x) => x.id !== id) })),
      setExpenses: (expenses) => set({ expenses }),
      addCoupon: (c) => set((s) => ({ coupons: [...s.coupons, c] })),
      updateCoupon: (c) =>
        set((s) => ({
          coupons: s.coupons.map((x) => (x.id === c.id ? c : x)),
        })),
      deleteCoupon: (id) =>
        set((s) => ({ coupons: s.coupons.filter((x) => x.id !== id) })),
      setCoupons: (coupons) => set({ coupons }),
      addTask: (t) => set((s) => ({ tasks: [...s.tasks, t] })),
      updateTask: (t) =>
        set((s) => ({ tasks: s.tasks.map((x) => (x.id === t.id ? t : x)) })),
      deleteTask: (id) =>
        set((s) => ({ tasks: s.tasks.filter((x) => x.id !== id) })),
      setTasks: (tasks) => set({ tasks }),
      addTeamMember: (m) => set((s) => ({ team: [...s.team, m] })),
      updateTeamMember: (m) =>
        set((s) => ({ team: s.team.map((x) => (x.id === m.id ? m : x)) })),
      deleteTeamMember: (id) =>
        set((s) => ({ team: s.team.filter((x) => x.id !== id) })),
      setTeam: (team) => set({ team }),
      addReview: (r) => set((s) => ({ reviews: [...s.reviews, r] })),
      updateReview: (r) =>
        set((s) => ({
          reviews: s.reviews.map((x) => (x.id === r.id ? r : x)),
        })),
      setReviews: (reviews) => set({ reviews }),
      addBlogPost: (p) => set((s) => ({ blogPosts: [...s.blogPosts, p] })),
      updateBlogPost: (p) =>
        set((s) => ({
          blogPosts: s.blogPosts.map((x) => (x.id === p.id ? p : x)),
        })),
      deleteBlogPost: (id) =>
        set((s) => ({ blogPosts: s.blogPosts.filter((x) => x.id !== id) })),
      setBlogPosts: (blogPosts) => set({ blogPosts }),
      updateInventoryItem: (item) =>
        set((s) => ({
          inventory: s.inventory.map((x) => (x.id === item.id ? item : x)),
        })),
      setInventory: (inventory) => set({ inventory }),
      updateSettings: (s) =>
        set((prev) => ({ settings: { ...prev.settings, ...s } })),
      setAnalytics: (analytics) => set({ analytics }),
    }),
    { name: "forestheals-adminp" },
  ),
);
