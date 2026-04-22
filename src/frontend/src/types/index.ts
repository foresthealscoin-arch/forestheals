export type ProductStatus = "active" | "inactive" | "draft";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  comparePrice?: number;
  category: string;
  imageUrl: string;
  imageKey: string;
  images: string[];
  stock: number;
  ratings: number;
  reviewCount: number;
  featured: boolean;
  bestseller: boolean;
  discount: number;
  bundleIds: number[];
  status: ProductStatus;
}

export interface CartItem {
  productId: number;
  quantity: number;
  price: number;
  productType?: string;
}

export interface CartItemWithProduct extends CartItem {
  product?: Product;
}

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "completed"
  | "cancelled";

export type PaymentMethod = "stripe" | "cod";

export interface Address {
  id?: string;
  fullName: string;
  phone: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  gstNumber?: string;
  isDefault?: boolean;
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
  updatedAt?: number;
  stripePaymentId?: string;
  couponCode?: string;
  discountAmount: number;
  notes?: string;
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
  status?: ProductStatus;
}

export interface CreateOrderInput {
  items: CartItem[];
  totalAmount: number;
  paymentMethod: PaymentMethod;
  address: Address;
  couponCode?: string;
  discountAmount: number;
  stripePaymentId?: string;
  notes?: string;
}

export interface CreateProductInput {
  name: string;
  description: string;
  price: number;
  comparePrice?: number;
  category: string;
  imageUrl: string;
  imageKey: string;
  images: string[];
  stock: number;
  featured: boolean;
  bestseller: boolean;
  discount: number;
  bundleIds: number[];
  status: ProductStatus;
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

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  phoneVerified: boolean;
  city: string;
  state: string;
  pincode: string;
  country: string;
  addresses: Address[];
  createdAt: number;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  tags: string[];
  metaTitle: string;
  metaDescription: string;
  status: string;
  createdAt: number;
  updatedAt: number;
  publishDate?: number;
}
