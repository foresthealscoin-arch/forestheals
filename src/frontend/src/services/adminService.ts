import type { backendInterface } from "../backend";
import type {
  AnalyticsSummary,
  DashboardKPIs,
  InventorySummaryItem,
  StoreSettings,
  UserActivity,
} from "../backend.d";
import { toNumber, unwrapResult } from "../utils/convert";

export interface DashboardKPIsView {
  todayRevenue: number;
  todayOrders: number;
  weekRevenue: number;
  weekOrders: number;
  monthRevenue: number;
  monthOrders: number;
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  totalProducts: number;
  lowStockCount: number;
  pendingOrderCount: number;
  pendingReviewCount: number;
}

export interface AnalyticsSummaryView {
  totalRevenue: number;
  orderCount: number;
  customerCount: number;
  avgOrderValue: number;
  netProfit: number;
  totalExpenses: number;
  topProducts: Array<{ productId: number; unitsSold: number; revenue: number }>;
  revenueByDay: Array<{ date: string; revenue: number; orders: number }>;
  revenueByMonth: Array<{ month: string; revenue: number; orders: number }>;
  paymentBreakdown: {
    codCount: number;
    codAmount: number;
    onlineCount: number;
    onlineAmount: number;
  };
}

export interface InventorySummaryView {
  productId: number;
  productName: string;
  reservedStock: number;
  availableStock: number;
  lowStockFlag: boolean;
  outOfStockFlag: boolean;
}

export function mapDashboardKPIs(raw: DashboardKPIs): DashboardKPIsView {
  return {
    todayRevenue: toNumber(raw.todayRevenue),
    todayOrders: toNumber(raw.todayOrders),
    weekRevenue: toNumber(raw.weekRevenue),
    weekOrders: toNumber(raw.weekOrders),
    monthRevenue: toNumber(raw.monthRevenue),
    monthOrders: toNumber(raw.monthOrders),
    totalRevenue: toNumber(raw.totalRevenue),
    totalOrders: toNumber(raw.totalOrders),
    totalCustomers: toNumber(raw.totalCustomers),
    totalProducts: toNumber(raw.totalProducts),
    lowStockCount: toNumber(raw.lowStockCount),
    pendingOrderCount: toNumber(raw.pendingOrderCount),
    pendingReviewCount: toNumber(raw.pendingReviewCount),
  };
}

export function mapAnalyticsSummary(
  raw: AnalyticsSummary,
): AnalyticsSummaryView {
  return {
    totalRevenue: toNumber(raw.totalRevenue),
    orderCount: toNumber(raw.orderCount),
    customerCount: toNumber(raw.customerCount),
    avgOrderValue: toNumber(raw.avgOrderValue),
    netProfit: toNumber(raw.netProfit),
    totalExpenses: toNumber(raw.totalExpenses),
    topProducts: raw.topProducts.map((p) => ({
      productId: toNumber(p.productId),
      unitsSold: toNumber(p.unitsSold),
      revenue: toNumber(p.revenue),
    })),
    revenueByDay: raw.revenueByDay.map((d) => ({
      date: d.date,
      revenue: toNumber(d.revenue),
      orders: toNumber(d.orders),
    })),
    revenueByMonth: raw.revenueByMonth.map((m) => ({
      month: m.month,
      revenue: toNumber(m.revenue),
      orders: toNumber(m.orders),
    })),
    paymentBreakdown: {
      codCount: toNumber(raw.paymentBreakdown.codCount),
      codAmount: toNumber(raw.paymentBreakdown.codAmount),
      onlineCount: toNumber(raw.paymentBreakdown.onlineCount),
      onlineAmount: toNumber(raw.paymentBreakdown.onlineAmount),
    },
  };
}

export function mapInventorySummary(
  raw: InventorySummaryItem,
): InventorySummaryView {
  return {
    productId: toNumber(raw.productId),
    productName: raw.productName,
    reservedStock: toNumber(raw.reservedStock),
    availableStock: toNumber(raw.availableStock),
    lowStockFlag: raw.lowStockFlag,
    outOfStockFlag: raw.outOfStockFlag,
  };
}

export async function verifyAdmin(
  actor: backendInterface,
  username: string,
  password: string,
): Promise<boolean> {
  const result = await actor.verifyAdminCredentials(username, password);
  return unwrapResult(result);
}

export async function getDashboardKPIs(
  actor: backendInterface,
): Promise<DashboardKPIsView> {
  const raw = await actor.getDashboardKPIs();
  return mapDashboardKPIs(raw);
}

export async function getAnalyticsSummary(
  actor: backendInterface,
): Promise<AnalyticsSummaryView> {
  const raw = await actor.getAnalyticsSummary();
  return mapAnalyticsSummary(raw);
}

export async function getInventorySummary(
  actor: backendInterface,
): Promise<InventorySummaryView[]> {
  const raw = await actor.getInventorySummary();
  return raw.map(mapInventorySummary);
}

export async function getRecentActivity(
  actor: backendInterface,
): Promise<UserActivity[]> {
  return actor.getRecentActivity();
}

export async function getStoreSettings(
  actor: backendInterface,
): Promise<StoreSettings> {
  return actor.getStoreSettings();
}

export async function saveStoreSettings(
  actor: backendInterface,
  settings: StoreSettings,
): Promise<StoreSettings> {
  return actor.saveStoreSettings(settings);
}
