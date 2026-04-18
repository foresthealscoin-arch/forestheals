import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface AdminTask {
    id: string;
    title: string;
    assignedTo?: string;
    createdAt: bigint;
    completed: boolean;
    dueDate?: bigint;
    description: string;
    notes: string;
    category: string;
    priority: string;
}
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface AdminExpense {
    id: string;
    date: bigint;
    createdBy: string;
    description: string;
    category: string;
    amount: bigint;
}
export interface AddReviewInput {
    text: string;
    productId: bigint;
    rating: bigint;
}
export interface StoreSettings {
    timezone: string;
    gstNumber: string;
    freeShippingThreshold: bigint;
    instagramUrl: string;
    whatsappNumber: string;
    currency: string;
    storeName: string;
    contactEmail: string;
    facebookUrl: string;
    contactPhone: string;
}
export interface B2BInquiry {
    id: bigint;
    contactName: string;
    createdAt: bigint;
    email: string;
    message: string;
    productInterest: string;
    companyName: string;
    quantity: string;
    phone: string;
}
export interface InventoryItem {
    supplierContact: string;
    lowStockThreshold: bigint;
    purchaseCost: bigint;
    expiryDate?: bigint;
    supplierName: string;
    lastUpdated: bigint;
    productId: string;
    incomingStock: bigint;
    reservedStock: bigint;
    batchNumber: string;
    currentStock: bigint;
    damagedStock: bigint;
}
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export interface CouponValidation {
    valid: boolean;
    discountPercent: bigint;
    message: string;
}
export interface CreateOrderInput {
    couponCode?: string;
    paymentMethod: PaymentMethod;
    address: Address;
    stripePaymentId?: string;
    items: Array<CartItem>;
}
export interface B2BInquiryInput {
    contactName: string;
    email: string;
    message: string;
    productInterest: string;
    companyName: string;
    quantity: string;
    phone: string;
}
export type StripeSessionStatus = {
    __kind__: "completed";
    completed: {
        userPrincipal?: string;
        response: string;
    };
} | {
    __kind__: "failed";
    failed: {
        error: string;
    };
};
export interface StripeConfiguration {
    allowedCountries: Array<string>;
    secretKey: string;
}
export type Category = string;
export interface Review {
    id: bigint;
    verified: boolean;
    userId: Principal;
    createdAt: bigint;
    text: string;
    productId: bigint;
    approved: boolean;
    rating: bigint;
}
export interface BlogPost {
    id: string;
    metaDescription: string;
    status: string;
    title: string;
    content: string;
    publishDate?: bigint;
    featuredImage: string;
    createdAt: bigint;
    slug: string;
    tags: Array<string>;
    updatedAt: bigint;
    metaTitle: string;
    excerpt: string;
}
export interface Coupon {
    active: boolean;
    expiryDate: bigint;
    code: string;
    usedCount: bigint;
    discountPercent: bigint;
    maxUses: bigint;
}
export interface Order {
    id: bigint;
    status: OrderStatus;
    couponCode?: string;
    paymentMethod: PaymentMethod;
    userId: Principal;
    discountAmount: bigint;
    createdAt: bigint;
    totalAmount: bigint;
    address: Address;
    stripePaymentId?: string;
    items: Array<CartItem>;
}
export interface ProductFilter {
    featured?: boolean;
    minRating?: number;
    sortBy?: string;
    maxPrice?: bigint;
    category?: string;
    minPrice?: bigint;
    searchQuery?: string;
}
export interface http_header {
    value: string;
    name: string;
}
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface CreateProductInput {
    featured: boolean;
    bundleIds: Array<bigint>;
    name: string;
    description: string;
    stock: bigint;
    imageKey: string;
    imageUrl: string;
    discount: bigint;
    category: Category;
    price: bigint;
}
export interface ShoppingItem {
    productName: string;
    currency: string;
    quantity: bigint;
    priceInCents: bigint;
    productDescription: string;
}
export interface AdminStats {
    totalProducts: bigint;
    totalOrders: bigint;
    totalRevenue: bigint;
}
export interface AdminNotification {
    id: string;
    notificationType: string;
    createdAt: bigint;
    read: boolean;
    message: string;
}
export interface CreateFlashSaleInput {
    startTime: bigint;
    endTime: bigint;
    discountPercent: bigint;
    productId: bigint;
}
export interface CreateCouponInput {
    expiryDate: bigint;
    code: string;
    discountPercent: bigint;
    maxUses: bigint;
}
export interface AdminCoupon {
    id: string;
    minCartValue: bigint;
    active: boolean;
    discountValue: bigint;
    expiresAt?: bigint;
    code: string;
    createdAt: bigint;
    discountType: string;
    usedCount: bigint;
    description: string;
    maxUses: bigint;
}
export interface TeamMember {
    id: string;
    permissions: Array<string>;
    active: boolean;
    name: string;
    createdAt: bigint;
    role: string;
    email: string;
}
export interface CartItem {
    productId: bigint;
    quantity: bigint;
    price: bigint;
}
export interface FlashSale {
    id: bigint;
    startTime: bigint;
    active: boolean;
    endTime: bigint;
    discountPercent: bigint;
    productId: bigint;
}
export interface Product {
    id: bigint;
    featured: boolean;
    bundleIds: Array<bigint>;
    name: string;
    ratings: number;
    description: string;
    stock: bigint;
    imageKey: string;
    imageUrl: string;
    discount: bigint;
    category: Category;
    price: bigint;
    reviewCount: bigint;
}
export interface Address {
    street: string;
    country: string;
    gstNumber?: string;
    city: string;
    postalCode: string;
    state: string;
}
export enum OrderStatus {
    shipped = "shipped",
    cancelled = "cancelled",
    pending = "pending",
    delivered = "delivered",
    processing = "processing"
}
export enum PaymentMethod {
    cod = "cod",
    stripe = "stripe"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addExpense(expense: AdminExpense): Promise<AdminExpense>;
    addReview(input: AddReviewInput): Promise<Review>;
    addTeamMember(member: TeamMember): Promise<TeamMember>;
    addToCart(productId: bigint, quantity: bigint, price: bigint): Promise<void>;
    addToWishlist(productId: bigint): Promise<void>;
    approveReview(reviewId: bigint): Promise<boolean>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    clearAllNotifications(): Promise<void>;
    clearCart(): Promise<void>;
    completeAdminTask(id: string): Promise<boolean>;
    createAdminCoupon(coupon: AdminCoupon): Promise<AdminCoupon>;
    createAdminTask(task: AdminTask): Promise<AdminTask>;
    createBlogPost(post: BlogPost): Promise<BlogPost>;
    createCheckoutSession(items: Array<ShoppingItem>, successUrl: string, cancelUrl: string): Promise<string>;
    createCoupon(input: CreateCouponInput): Promise<Coupon>;
    createFlashSale(input: CreateFlashSaleInput): Promise<FlashSale>;
    createOrder(input: CreateOrderInput): Promise<Order>;
    createProduct(input: CreateProductInput): Promise<Product>;
    deleteAdminCoupon(id: string): Promise<boolean>;
    deleteAdminTask(id: string): Promise<boolean>;
    deleteBlogPost(id: string): Promise<boolean>;
    deleteExpense(id: string): Promise<boolean>;
    deleteProduct(id: bigint): Promise<boolean>;
    deleteReview(reviewId: bigint): Promise<boolean>;
    deleteTeamMember(id: string): Promise<boolean>;
    endFlashSale(id: bigint): Promise<boolean>;
    getActiveFlashSales(): Promise<Array<FlashSale>>;
    getAdminCoupons(): Promise<Array<AdminCoupon>>;
    getAdminNotifications(): Promise<Array<AdminNotification>>;
    getAdminStats(): Promise<AdminStats>;
    getAdminTasks(): Promise<Array<AdminTask>>;
    getAnalyticsSummary(): Promise<{
        totalOrders: bigint;
        totalExpenses: bigint;
        totalRevenue: bigint;
        totalCustomers: bigint;
        avgOrderValue: bigint;
        netProfit: bigint;
    }>;
    getBlogPosts(): Promise<Array<BlogPost>>;
    getCallerUserRole(): Promise<UserRole>;
    getCart(): Promise<Array<CartItem>>;
    getExpenses(): Promise<Array<AdminExpense>>;
    getExpensesByCategory(): Promise<Array<[string, bigint]>>;
    getInventoryItems(): Promise<Array<InventoryItem>>;
    getLowStockItems(): Promise<Array<InventoryItem>>;
    getOrder(id: bigint): Promise<Order | null>;
    getOutOfStockItems(): Promise<Array<InventoryItem>>;
    getProduct(id: bigint): Promise<Product | null>;
    getProductReviews(productId: bigint): Promise<Array<Review>>;
    getRecommendations(condition: string): Promise<Array<Product>>;
    getStoreSettings(): Promise<StoreSettings | null>;
    getStripeSessionStatus(sessionId: string): Promise<StripeSessionStatus>;
    getTeamMembers(): Promise<Array<TeamMember>>;
    getWishlist(): Promise<Array<bigint>>;
    isAdmin(): Promise<boolean>;
    isCallerAdmin(): Promise<boolean>;
    isStripeConfigured(): Promise<boolean>;
    listAllOrders(): Promise<Array<Order>>;
    listB2BInquiries(): Promise<Array<B2BInquiry>>;
    listBundles(): Promise<Array<Product>>;
    listCoupons(): Promise<Array<Coupon>>;
    listEmails(): Promise<Array<string>>;
    listFeaturedProducts(): Promise<Array<Product>>;
    listProducts(filter: ProductFilter): Promise<Array<Product>>;
    listUserOrders(): Promise<Array<Order>>;
    markNotificationRead(id: string): Promise<boolean>;
    publishBlogPost(id: string): Promise<boolean>;
    redeemCoupon(code: string): Promise<boolean>;
    removeFromCart(productId: bigint): Promise<void>;
    removeFromWishlist(productId: bigint): Promise<void>;
    saveStoreSettings(settings: StoreSettings): Promise<StoreSettings>;
    seedProducts(): Promise<void>;
    setStripeConfiguration(config: StripeConfiguration): Promise<void>;
    setUserRole(user: Principal, role: UserRole): Promise<void>;
    submitB2BInquiry(input: B2BInquiryInput): Promise<B2BInquiry>;
    subscribeEmail(email: string): Promise<boolean>;
    toggleCouponActive(id: string): Promise<boolean>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
    updateAdminCoupon(id: string, coupon: AdminCoupon): Promise<AdminCoupon | null>;
    updateAdminTask(id: string, task: AdminTask): Promise<AdminTask | null>;
    updateBlogPost(id: string, post: BlogPost): Promise<BlogPost | null>;
    updateCartQuantity(productId: bigint, quantity: bigint): Promise<void>;
    updateExpense(id: string, expense: AdminExpense): Promise<AdminExpense | null>;
    updateInventoryStock(productId: string, delta: bigint, _reason: string): Promise<InventoryItem | null>;
    updateOrderStatus(id: bigint, status: OrderStatus): Promise<boolean>;
    updateProduct(id: bigint, input: CreateProductInput): Promise<boolean>;
    updateTeamMember(id: string, member: TeamMember): Promise<TeamMember | null>;
    upsertInventoryItem(item: InventoryItem): Promise<InventoryItem>;
    validateCoupon(code: string): Promise<CouponValidation>;
    verifyAdminCredentials(username: string, password: string): Promise<boolean>;
}
