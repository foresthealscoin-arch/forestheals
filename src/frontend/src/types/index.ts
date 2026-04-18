export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  imageKey: string;
  stock: number;
  ratings: number;
  reviewCount: number;
  featured: boolean;
  discount: number;
  bundleIds: number[];
}

export interface CartItem {
  productId: number;
  quantity: number;
  price: number;
}

export interface CartItemWithProduct extends CartItem {
  product?: Product;
}

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "shipped"
  | "delivered"
  | "cancelled";
export type PaymentMethod = "stripe" | "cod";

export interface Address {
  fullName: string;
  phone: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

export interface Order {
  id: number;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  address: Address;
  createdAt: number;
  stripePaymentId?: string;
  couponCode?: string;
  discountAmount: number;
}

export interface Review {
  id: number;
  productId: number;
  userId: string;
  rating: number;
  text: string;
  verified: boolean;
  createdAt: number;
  approved: boolean;
}

export interface FlashSale {
  id: number;
  productId: number;
  discountPercent: number;
  startTime: number;
  endTime: number;
  active: boolean;
}

export interface Coupon {
  code: string;
  discountPercent: number;
  maxUses: number;
  usedCount: number;
  expiresAt: number;
  active: boolean;
}

export interface CouponValidation {
  valid: boolean;
  discountPercent: number;
  message: string;
}

export interface B2BInquiry {
  id: number;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  productInterest: string;
  quantity: string;
  message: string;
  createdAt: number;
}

export interface AdminStats {
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  totalUsers: number;
  pendingOrders: number;
  activeFlashSales: number;
}

export type ProductCategory =
  | "Ayurvedic Powders"
  | "Essential Oils"
  | "Spiritual Products"
  | "Pure Cotton"
  | "Eco-Friendly"
  | "Handicrafts"
  | "Bio-Coal"
  | "Seeds & Spices"
  | "Bundles";

export type HealthCondition =
  | "hair-fall"
  | "stress"
  | "immunity"
  | "skin-care"
  | "digestion"
  | "joint-pain"
  | "diabetes"
  | "sleep"
  | "weight-loss"
  | "energy";

export interface ProductFilter {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  search?: string;
  sortBy?: "price-asc" | "price-desc" | "rating" | "newest" | "popular";
  featured?: boolean;
}

export interface CreateOrderInput {
  items: CartItem[];
  totalAmount: number;
  paymentMethod: PaymentMethod;
  address: Address;
  couponCode?: string;
  discountAmount: number;
  stripePaymentId?: string;
}

export interface CreateProductInput {
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  imageKey: string;
  stock: number;
  featured: boolean;
  discount: number;
  bundleIds: number[];
}

export interface AddReviewInput {
  productId: number;
  rating: number;
  text: string;
}

export interface User {
  principal: string;
  isAdmin: boolean;
  loginStatus: "logged-in" | "logged-out" | "initializing";
}
