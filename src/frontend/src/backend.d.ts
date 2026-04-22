import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface UserActivity {
    id: bigint;
    activityType: ActivityType;
    metadata: string;
    userId: Principal;
    timestamp: bigint;
}
export interface CartItem {
    productId: bigint;
    productType?: string;
    quantity: bigint;
    price: bigint;
}
export interface AnalyticsSummary {
    revenueByDay: Array<DayRevenue>;
    totalExpenses: bigint;
    orderCount: bigint;
    paymentBreakdown: PaymentBreakdown;
    revenueByMonth: Array<MonthRevenue>;
    topProducts: Array<TopProduct>;
    customerCount: bigint;
    totalRevenue: bigint;
    avgOrderValue: bigint;
    netProfit: bigint;
}
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
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
export interface AdminExpense {
    id: string;
    date: bigint;
    createdBy: string;
    description: string;
    category: string;
    amount: bigint;
}
export interface Address {
    id: string;
    tag: string;
    street: string;
    country: string;
    city: string;
    fullName: string;
    state: string;
    isDefault: boolean;
    phone: string;
    pincode: string;
}
export interface StoreSettings {
    timezone: string;
    seoTitle: string;
    gstNumber: string;
    freeShippingThreshold: bigint;
    instagramUrl: string;
    whatsappNumber: string;
    logoUrl: string;
    currency: string;
    storeName: string;
    contactEmail: string;
    shippingDefault: bigint;
    gstRate: bigint;
    seoDescription: string;
    faviconUrl: string;
    facebookUrl: string;
    contactPhone: string;
}
export interface AddReviewInput {
    text: string;
    productId: bigint;
    rating: bigint;
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
export interface Address__1 {
    country: string;
    gstNumber?: string;
    city: string;
    fullName: string;
    line1: string;
    line2?: string;
    state: string;
    phone: string;
    pincode: string;
}
export interface MonthRevenue {
    month: string;
    revenue: bigint;
    orders: bigint;
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
export interface TopProduct {
    revenue: bigint;
    productId: bigint;
    unitsSold: bigint;
}
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export interface PaymentBreakdown {
    onlineCount: bigint;
    onlineAmount: bigint;
    codAmount: bigint;
    codCount: bigint;
}
export interface DayRevenue {
    revenue: bigint;
    date: string;
    orders: bigint;
}
export interface InventorySummaryItem {
    outOfStockFlag: boolean;
    productId: bigint;
    productName: string;
    reservedStock: bigint;
    availableStock: bigint;
    lowStockFlag: boolean;
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
export interface CreateOrderInput {
    couponCode?: string;
    paymentMethod: PaymentMethod;
    userId?: string;
    addressId?: string;
    address: Address__1;
    notes?: string;
    stripePaymentId?: string;
    items: Array<CartItem>;
}
export interface CouponValidation {
    valid: boolean;
    discountPercent: bigint;
    message: string;
}
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
export type Category = string;
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
export interface B2BInquiryInput {
    contactName: string;
    email: string;
    message: string;
    productInterest: string;
    companyName: string;
    quantity: string;
    phone: string;
}
export interface UpdateUserInput {
    country: string;
    city: string;
    name: string;
    email: string;
    state: string;
    addresses: Array<Address>;
    phone: string;
    pincode: string;
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
    updatedAt: bigint;
    totalAmount: bigint;
    address: Address__1;
    notes?: string;
    stripePaymentId?: string;
    items: Array<CartItem>;
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
export interface ProductFilter {
    status?: ProductStatus;
    featured?: boolean;
    minRating?: number;
    sortBy?: string;
    maxPrice?: bigint;
    category?: string;
    minPrice?: bigint;
    searchQuery?: string;
}
export interface CreateProductInput {
    status: ProductStatus;
    featured: boolean;
    bundleIds: Array<bigint>;
    name: string;
    description: string;
    comparePrice?: bigint;
    stock: bigint;
    imageKey: string;
    imageUrl: string;
    discount: bigint;
    category: Category;
    price: bigint;
    bestseller: boolean;
    images: Array<string>;
}
export type AdminLoginResult = {
    __kind__: "ok";
    ok: boolean;
} | {
    __kind__: "err";
    err: string;
};
export interface ShoppingItem {
    productName: string;
    currency: string;
    quantity: bigint;
    priceInCents: bigint;
    productDescription: string;
}
export interface RegisterUserInput {
    name: string;
    email: string;
    phone: string;
}
export interface AdminStats {
    totalProducts: bigint;
    totalOrders: bigint;
    totalRevenue: bigint;
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
export interface AdminNotification {
    id: string;
    notificationType: string;
    createdAt: bigint;
    read: boolean;
    message: string;
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
export interface EnrichedCustomerProfile {
    id: Principal;
    status: string;
    totalOrders: bigint;
    country: string;
    city: string;
    name: string;
    createdAt: bigint;
    email: string;
    state: string;
    totalSpend: bigint;
    addresses: Array<Address>;
    phone: string;
    pincode: string;
    lastLogin?: bigint;
    activityCount: bigint;
}
export interface FlashSale {
    id: bigint;
    startTime: bigint;
    active: boolean;
    endTime: bigint;
    discountPercent: bigint;
    productId: bigint;
}
export interface DashboardKPIs {
    totalProducts: bigint;
    weekOrders: bigint;
    totalOrders: bigint;
    pendingOrderCount: bigint;
    monthOrders: bigint;
    monthRevenue: bigint;
    lowStockCount: bigint;
    pendingReviewCount: bigint;
    todayRevenue: bigint;
    totalRevenue: bigint;
    totalCustomers: bigint;
    weekRevenue: bigint;
    todayOrders: bigint;
}
export interface Product {
    id: bigint;
    status: ProductStatus;
    featured: boolean;
    bundleIds: Array<bigint>;
    name: string;
    ratings: number;
    description: string;
    comparePrice?: bigint;
    stock: bigint;
    imageKey: string;
    imageUrl: string;
    discount: bigint;
    category: Category;
    price: bigint;
    bestseller: boolean;
    reviewCount: bigint;
    images: Array<string>;
}
export interface UserProfile {
    id: Principal;
    country: string;
    city: string;
    name: string;
    createdAt: bigint;
    email: string;
    state: string;
    addresses: Array<Address>;
    phone: string;
    pincode: string;
    phoneVerified: boolean;
}
export enum ActivityType {
    Login = "Login",
    WishlistRemove = "WishlistRemove",
    CouponUsed = "CouponUsed",
    OrderPlaced = "OrderPlaced",
    ProductView = "ProductView",
    Logout = "Logout",
    NewsletterSignup = "NewsletterSignup",
    ProfileUpdated = "ProfileUpdated",
    CartAdd = "CartAdd",
    SearchQuery = "SearchQuery",
    ReviewSubmitted = "ReviewSubmitted",
    WishlistAdd = "WishlistAdd",
    B2BInquiry = "B2BInquiry",
    CartRemove = "CartRemove",
    AddressAdded = "AddressAdded"
}
export enum OrderStatus {
    shipped = "shipped",
    cancelled = "cancelled",
    pending = "pending",
    completed = "completed",
    confirmed = "confirmed",
    processing = "processing"
}
export enum PaymentMethod {
    cod = "cod",
    stripe = "stripe"
}
export enum ProductStatus {
    active = "active",
    inactive = "inactive",
    draft = "draft"
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
    adminListProducts(): Promise<Array<Product>>;
    approveReview(reviewId: bigint): Promise<boolean>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    cancelOrder(id: bigint): Promise<boolean>;
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
    createReview(input: AddReviewInput): Promise<Review>;
    createTask(task: AdminTask): Promise<AdminTask>;
    deactivateFlashSale(id: bigint): Promise<boolean>;
    deleteAdminCoupon(id: string): Promise<boolean>;
    deleteAdminTask(id: string): Promise<boolean>;
    deleteBlogPost(id: string): Promise<boolean>;
    deleteCoupon(code: string): Promise<boolean>;
    deleteExpense(id: string): Promise<boolean>;
    deleteProduct(id: bigint): Promise<boolean>;
    deleteTask(id: string): Promise<boolean>;
    deleteTeamMember(id: string): Promise<boolean>;
    endFlashSale(id: bigint): Promise<boolean>;
    getActiveFlashSales(): Promise<Array<FlashSale>>;
    getAdminCoupons(): Promise<Array<AdminCoupon>>;
    getAdminNotifications(): Promise<Array<AdminNotification>>;
    getAdminSession(): Promise<boolean>;
    getAdminStats(): Promise<AdminStats>;
    getAdminTasks(): Promise<Array<AdminTask>>;
    getAllActivities(): Promise<Array<UserActivity>>;
    getAllBlogPosts(): Promise<Array<BlogPost>>;
    getAllCustomers(): Promise<Array<UserProfile>>;
    getAllCustomersEnriched(): Promise<Array<EnrichedCustomerProfile>>;
    getAllOrders(): Promise<Array<Order>>;
    getAllReviews(): Promise<Array<Review>>;
    getAnalytics(): Promise<{
        totalOrders: bigint;
        totalActivities: bigint;
        newUsersToday: bigint;
        recentActivities: Array<UserActivity>;
        activeUsersToday: bigint;
        totalRegisteredUsers: bigint;
        totalExpenses: bigint;
        totalRevenue: bigint;
        totalCustomers: bigint;
        avgOrderValue: bigint;
        netProfit: bigint;
    }>;
    getAnalyticsSummary(): Promise<AnalyticsSummary>;
    getB2BInquiries(): Promise<Array<B2BInquiry>>;
    getBlogPosts(): Promise<Array<BlogPost>>;
    getCallerUserRole(): Promise<UserRole>;
    getCart(): Promise<Array<CartItem>>;
    getCoupons(): Promise<Array<Coupon>>;
    getCustomerProfile(userId: Principal): Promise<EnrichedCustomerProfile | null>;
    getDashboardKPIs(): Promise<DashboardKPIs>;
    getExpenses(): Promise<Array<AdminExpense>>;
    getExpensesByCategory(): Promise<Array<[string, bigint]>>;
    getInventoryItems(): Promise<Array<InventoryItem>>;
    getInventorySummary(): Promise<Array<InventorySummaryItem>>;
    getLowStockItems(): Promise<Array<InventoryItem>>;
    getNewsletterSubscribers(): Promise<Array<string>>;
    getOrder(id: bigint): Promise<Order | null>;
    getProduct(id: bigint): Promise<Product | null>;
    getProductReviews(productId: bigint): Promise<Array<Review>>;
    getProducts(filter: ProductFilter): Promise<Array<Product>>;
    getRecentActivity(): Promise<Array<UserActivity>>;
    getRecommendations(condition: string): Promise<Array<Product>>;
    getStoreSettings(): Promise<StoreSettings>;
    getStripeSessionStatus(sessionId: string): Promise<StripeSessionStatus>;
    getTasks(): Promise<Array<AdminTask>>;
    getTeamMembers(): Promise<Array<TeamMember>>;
    getUserActivities(userId: Principal | null): Promise<Array<UserActivity>>;
    getUserOrders(): Promise<Array<Order>>;
    getUserProfile(): Promise<UserProfile | null>;
    getWishlist(): Promise<Array<bigint>>;
    isAdmin(): Promise<boolean>;
    isCallerAdmin(): Promise<boolean>;
    isStripeConfigured(): Promise<boolean>;
    isWishlisted(productId: bigint): Promise<boolean>;
    listAllOrders(): Promise<Array<Order>>;
    listB2BInquiries(): Promise<Array<B2BInquiry>>;
    listBundles(): Promise<Array<Product>>;
    listEmails(): Promise<Array<string>>;
    listFeaturedProducts(): Promise<Array<Product>>;
    listOrders(): Promise<Array<Order>>;
    listProducts(filter: ProductFilter): Promise<Array<Product>>;
    listUserOrders(): Promise<Array<Order>>;
    logUserActivity(activityType: ActivityType, metadata: string): Promise<UserActivity>;
    markNotificationRead(id: string): Promise<boolean>;
    placeOrder(input: CreateOrderInput): Promise<Order>;
    publishBlogPost(id: string): Promise<boolean>;
    redeemCoupon(code: string): Promise<boolean>;
    registerUser(input: RegisterUserInput): Promise<UserProfile>;
    rejectReview(reviewId: bigint): Promise<boolean>;
    removeFromCart(productId: bigint): Promise<void>;
    removeFromWishlist(productId: bigint): Promise<void>;
    removeTeamMember(id: string): Promise<boolean>;
    saveStoreSettings(settings: StoreSettings): Promise<StoreSettings>;
    seedProducts(): Promise<void>;
    setAdminPassword(newPassword: string): Promise<AdminLoginResult>;
    setStripeConfiguration(config: StripeConfiguration): Promise<void>;
    setUserRole(user: Principal, role: UserRole): Promise<void>;
    submitB2BInquiry(input: B2BInquiryInput): Promise<B2BInquiry>;
    subscribeEmail(email: string): Promise<boolean>;
    subscribeNewsletter(email: string, _name: string): Promise<boolean>;
    toggleBestseller(id: bigint): Promise<boolean>;
    toggleCouponActive(id: string): Promise<boolean>;
    toggleFeatured(id: bigint): Promise<boolean>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
    updateAdminCoupon(id: string, coupon: AdminCoupon): Promise<AdminCoupon | null>;
    updateAdminTask(id: string, task: AdminTask): Promise<AdminTask | null>;
    updateBlogPost(id: string, post: BlogPost): Promise<BlogPost | null>;
    updateCartQuantity(productId: bigint, quantity: bigint): Promise<void>;
    updateExpense(id: string, expense: AdminExpense): Promise<AdminExpense | null>;
    updateInventory(productId: string, quantity: bigint, _type: string, _notes: string): Promise<InventoryItem | null>;
    updateInventoryStock(productId: string, delta: bigint, _reason: string): Promise<InventoryItem | null>;
    updateOrderNotes(id: bigint, notes: string | null): Promise<boolean>;
    updateOrderStatus(id: bigint, status: OrderStatus): Promise<boolean>;
    updateProduct(id: bigint, input: CreateProductInput): Promise<boolean>;
    updateStoreSettings(settings: StoreSettings): Promise<StoreSettings>;
    updateTask(id: string, task: AdminTask): Promise<AdminTask | null>;
    updateTeamMember(id: string, member: TeamMember): Promise<TeamMember | null>;
    updateUserProfile(input: UpdateUserInput): Promise<UserProfile | null>;
    upsertInventoryItem(item: InventoryItem): Promise<InventoryItem>;
    validateCoupon(code: string): Promise<CouponValidation>;
    verifyAdminCredentials(username: string, password: string): Promise<AdminLoginResult>;
}
