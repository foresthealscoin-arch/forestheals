import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type { AdminExpense, StoreSettings } from "../backend.d";
import {
  type AnalyticsSummaryView,
  type DashboardKPIsView,
  type InventorySummaryView,
  getAnalyticsSummary,
  getDashboardKPIs,
  getInventorySummary,
  getRecentActivity,
  getStoreSettings,
  saveStoreSettings,
} from "../services/adminService";
import {
  type BlogPostView,
  createBlogPost,
  deleteBlogPost,
  getBlogPosts,
  publishBlogPost,
  updateBlogPost,
} from "../services/blogService";
import {
  type AdminCouponView,
  createAdminCoupon,
  deleteAdminCoupon,
  getAdminCoupons,
  toggleCouponActive,
  updateAdminCoupon,
} from "../services/couponService";
import {
  type OrderView,
  listAllOrders,
  updateOrderNotes,
  updateOrderStatus,
} from "../services/orderService";
import {
  type ProductView,
  createProduct,
  deleteProduct,
  listProducts,
  updateProduct,
} from "../services/productService";
import {
  type ReviewView,
  approveReview,
  listAllReviews,
  rejectReview,
} from "../services/reviewService";
import {
  type AdminTaskView,
  completeAdminTask,
  createAdminTask,
  deleteAdminTask,
  getTasks,
  updateAdminTask,
} from "../services/taskService";
import {
  type TeamMemberView,
  addTeamMember,
  deleteTeamMember,
  getTeamMembers,
  updateTeamMember,
} from "../services/teamService";

function useBackendActor() {
  return useActor(createActor);
}

// ── Dashboard ─────────────────────────────────────────────────────────────────
export function useAdminDashboard() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<DashboardKPIsView>({
    queryKey: ["admin", "dashboard-kpis"],
    queryFn: async () => {
      if (!actor || isFetching) throw new Error("Actor not ready");
      return getDashboardKPIs(actor);
    },
    enabled: !!actor && !isFetching,
    staleTime: 30 * 1000,
    refetchInterval: 30 * 1000,
  });
}

export function useAdminRecentActivity() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["admin", "recent-activity"],
    queryFn: async () => {
      if (!actor || isFetching) throw new Error("Actor not ready");
      return getRecentActivity(actor);
    },
    enabled: !!actor && !isFetching,
    staleTime: 30 * 1000,
    refetchInterval: 30 * 1000,
  });
}

// ── Products ──────────────────────────────────────────────────────────────────
export function useAdminProducts() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<ProductView[]>({
    queryKey: ["admin", "products"],
    queryFn: async () => {
      if (!actor || isFetching) throw new Error("Actor not ready");
      return listProducts(actor);
    },
    enabled: !!actor && !isFetching,
    staleTime: 60 * 1000,
  });
}

export function useCreateAdminProduct() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (
      input: Omit<ProductView, "id" | "ratings" | "reviewCount">,
    ) => {
      if (!actor) throw new Error("Backend not connected");
      return createProduct(actor, input);
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["admin", "products"] });
      void qc.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

export function useUpdateAdminProduct() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      input,
    }: {
      id: number;
      input: Omit<ProductView, "id" | "ratings" | "reviewCount">;
    }) => {
      if (!actor) throw new Error("Backend not connected");
      return updateProduct(actor, id, input);
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["admin", "products"] });
      void qc.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

export function useDeleteAdminProduct() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      if (!actor) throw new Error("Backend not connected");
      return deleteProduct(actor, id);
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["admin", "products"] });
      void qc.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

// ── Orders ────────────────────────────────────────────────────────────────────
export function useAdminOrders() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<OrderView[]>({
    queryKey: ["admin", "orders"],
    queryFn: async () => {
      if (!actor || isFetching) throw new Error("Actor not ready");
      return listAllOrders(actor);
    },
    enabled: !!actor && !isFetching,
    staleTime: 15 * 1000,
    refetchInterval: 30 * 1000,
  });
}

export function useUpdateOrderStatus() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      if (!actor) throw new Error("Backend not connected");
      return updateOrderStatus(actor, id, status);
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["admin", "orders"] });
      void qc.invalidateQueries({ queryKey: ["orders"] });
      void qc.invalidateQueries({ queryKey: ["admin", "dashboard-kpis"] });
    },
  });
}

export function useUpdateOrderNotes() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, notes }: { id: number; notes: string | null }) => {
      if (!actor) throw new Error("Backend not connected");
      return updateOrderNotes(actor, id, notes);
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["admin", "orders"] });
    },
  });
}

// ── Customers ─────────────────────────────────────────────────────────────────
export function useAdminCustomers() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["admin", "customers"],
    queryFn: async () => {
      if (!actor || isFetching) throw new Error("Actor not ready");
      return actor.getAllCustomersEnriched();
    },
    enabled: !!actor && !isFetching,
    staleTime: 60 * 1000,
  });
}

// ── Analytics ─────────────────────────────────────────────────────────────────
export function useAdminAnalytics() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<AnalyticsSummaryView>({
    queryKey: ["admin", "analytics"],
    queryFn: async () => {
      if (!actor || isFetching) throw new Error("Actor not ready");
      return getAnalyticsSummary(actor);
    },
    enabled: !!actor && !isFetching,
    staleTime: 2 * 60 * 1000,
  });
}

export function useAdminExpenses() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<AdminExpense[]>({
    queryKey: ["admin", "expenses"],
    queryFn: async () => {
      if (!actor || isFetching) throw new Error("Actor not ready");
      return actor.getExpenses();
    },
    enabled: !!actor && !isFetching,
    staleTime: 60 * 1000,
  });
}

export function useAddExpense() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (expense: AdminExpense) => {
      if (!actor) throw new Error("Backend not connected");
      return actor.addExpense(expense);
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["admin", "expenses"] });
      void qc.invalidateQueries({ queryKey: ["admin", "analytics"] });
    },
  });
}

export function useUpdateExpense() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      expense,
    }: { id: string; expense: AdminExpense }) => {
      if (!actor) throw new Error("Backend not connected");
      return actor.updateExpense(id, expense);
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["admin", "expenses"] });
      void qc.invalidateQueries({ queryKey: ["admin", "analytics"] });
    },
  });
}

export function useDeleteExpense() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Backend not connected");
      return actor.deleteExpense(id);
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["admin", "expenses"] });
      void qc.invalidateQueries({ queryKey: ["admin", "analytics"] });
    },
  });
}

// ── Inventory ─────────────────────────────────────────────────────────────────
export function useAdminInventory() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<InventorySummaryView[]>({
    queryKey: ["admin", "inventory"],
    queryFn: async () => {
      if (!actor || isFetching) throw new Error("Actor not ready");
      return getInventorySummary(actor);
    },
    enabled: !!actor && !isFetching,
    staleTime: 60 * 1000,
  });
}

export function useUpdateInventory() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      productId,
      quantity,
      type,
      notes,
    }: {
      productId: string;
      quantity: number;
      type: string;
      notes: string;
    }) => {
      if (!actor) throw new Error("Backend not connected");
      return actor.updateInventory(productId, BigInt(quantity), type, notes);
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["admin", "inventory"] });
      void qc.invalidateQueries({ queryKey: ["admin", "products"] });
    },
  });
}

// ── Reviews ───────────────────────────────────────────────────────────────────
export function useAdminReviews() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<ReviewView[]>({
    queryKey: ["admin", "reviews"],
    queryFn: async () => {
      if (!actor || isFetching) throw new Error("Actor not ready");
      return listAllReviews(actor);
    },
    enabled: !!actor && !isFetching,
    staleTime: 30 * 1000,
  });
}

export function useApproveReview() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      if (!actor) throw new Error("Backend not connected");
      return approveReview(actor, id);
    },
    onSuccess: () =>
      void qc.invalidateQueries({ queryKey: ["admin", "reviews"] }),
  });
}

export function useRejectReview() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      if (!actor) throw new Error("Backend not connected");
      return rejectReview(actor, id);
    },
    onSuccess: () =>
      void qc.invalidateQueries({ queryKey: ["admin", "reviews"] }),
  });
}

// ── Blog ─────────────────────────────────────────────────────────────────────
export function useAdminBlog() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<BlogPostView[]>({
    queryKey: ["admin", "blog"],
    queryFn: async () => {
      if (!actor || isFetching) throw new Error("Actor not ready");
      return getBlogPosts(actor);
    },
    enabled: !!actor && !isFetching,
    staleTime: 60 * 1000,
  });
}

export function useCreateBlogPost() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (post: BlogPostView) => {
      if (!actor) throw new Error("Backend not connected");
      return createBlogPost(actor, post);
    },
    onSuccess: () => void qc.invalidateQueries({ queryKey: ["admin", "blog"] }),
  });
}

export function useUpdateBlogPost() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, post }: { id: string; post: BlogPostView }) => {
      if (!actor) throw new Error("Backend not connected");
      return updateBlogPost(actor, id, post);
    },
    onSuccess: () => void qc.invalidateQueries({ queryKey: ["admin", "blog"] }),
  });
}

export function useDeleteBlogPost() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Backend not connected");
      return deleteBlogPost(actor, id);
    },
    onSuccess: () => void qc.invalidateQueries({ queryKey: ["admin", "blog"] }),
  });
}

export function usePublishBlogPost() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Backend not connected");
      return publishBlogPost(actor, id);
    },
    onSuccess: () => void qc.invalidateQueries({ queryKey: ["admin", "blog"] }),
  });
}

// ── Team ─────────────────────────────────────────────────────────────────────
export function useAdminTeam() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<TeamMemberView[]>({
    queryKey: ["admin", "team"],
    queryFn: async () => {
      if (!actor || isFetching) throw new Error("Actor not ready");
      return getTeamMembers(actor);
    },
    enabled: !!actor && !isFetching,
    staleTime: 2 * 60 * 1000,
  });
}

export function useAddTeamMember() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (member: TeamMemberView) => {
      if (!actor) throw new Error("Backend not connected");
      return addTeamMember(actor, member);
    },
    onSuccess: () => void qc.invalidateQueries({ queryKey: ["admin", "team"] }),
  });
}

export function useUpdateTeamMember() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      member,
    }: { id: string; member: TeamMemberView }) => {
      if (!actor) throw new Error("Backend not connected");
      return updateTeamMember(actor, id, member);
    },
    onSuccess: () => void qc.invalidateQueries({ queryKey: ["admin", "team"] }),
  });
}

export function useDeleteTeamMember() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Backend not connected");
      return deleteTeamMember(actor, id);
    },
    onSuccess: () => void qc.invalidateQueries({ queryKey: ["admin", "team"] }),
  });
}

// ── Tasks ─────────────────────────────────────────────────────────────────────
export function useAdminTasks() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<AdminTaskView[]>({
    queryKey: ["admin", "tasks"],
    queryFn: async () => {
      if (!actor || isFetching) throw new Error("Actor not ready");
      return getTasks(actor);
    },
    enabled: !!actor && !isFetching,
    staleTime: 30 * 1000,
  });
}

export function useCreateAdminTask() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (task: AdminTaskView) => {
      if (!actor) throw new Error("Backend not connected");
      return createAdminTask(actor, task);
    },
    onSuccess: () =>
      void qc.invalidateQueries({ queryKey: ["admin", "tasks"] }),
  });
}

export function useUpdateAdminTask() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, task }: { id: string; task: AdminTaskView }) => {
      if (!actor) throw new Error("Backend not connected");
      return updateAdminTask(actor, id, task);
    },
    onSuccess: () =>
      void qc.invalidateQueries({ queryKey: ["admin", "tasks"] }),
  });
}

export function useDeleteAdminTask() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Backend not connected");
      return deleteAdminTask(actor, id);
    },
    onSuccess: () =>
      void qc.invalidateQueries({ queryKey: ["admin", "tasks"] }),
  });
}

export function useCompleteAdminTask() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Backend not connected");
      return completeAdminTask(actor, id);
    },
    onSuccess: () =>
      void qc.invalidateQueries({ queryKey: ["admin", "tasks"] }),
  });
}

// ── Coupons ───────────────────────────────────────────────────────────────────
export function useAdminCoupons() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<AdminCouponView[]>({
    queryKey: ["admin", "coupons"],
    queryFn: async () => {
      if (!actor || isFetching) throw new Error("Actor not ready");
      return getAdminCoupons(actor);
    },
    enabled: !!actor && !isFetching,
    staleTime: 60 * 1000,
  });
}

export function useCreateAdminCoupon() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (coupon: AdminCouponView) => {
      if (!actor) throw new Error("Backend not connected");
      return createAdminCoupon(actor, coupon);
    },
    onSuccess: () =>
      void qc.invalidateQueries({ queryKey: ["admin", "coupons"] }),
  });
}

export function useUpdateAdminCoupon() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      coupon,
    }: { id: string; coupon: AdminCouponView }) => {
      if (!actor) throw new Error("Backend not connected");
      return updateAdminCoupon(actor, id, coupon);
    },
    onSuccess: () =>
      void qc.invalidateQueries({ queryKey: ["admin", "coupons"] }),
  });
}

export function useDeleteAdminCoupon() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Backend not connected");
      return deleteAdminCoupon(actor, id);
    },
    onSuccess: () =>
      void qc.invalidateQueries({ queryKey: ["admin", "coupons"] }),
  });
}

export function useToggleCouponActive() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Backend not connected");
      return toggleCouponActive(actor, id);
    },
    onSuccess: () =>
      void qc.invalidateQueries({ queryKey: ["admin", "coupons"] }),
  });
}

// ── Settings ──────────────────────────────────────────────────────────────────
export function useAdminSettings() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<StoreSettings>({
    queryKey: ["admin", "settings"],
    queryFn: async () => {
      if (!actor || isFetching) throw new Error("Actor not ready");
      return getStoreSettings(actor);
    },
    enabled: !!actor && !isFetching,
    staleTime: 5 * 60 * 1000,
  });
}

export function useSaveAdminSettings() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (settings: StoreSettings) => {
      if (!actor) throw new Error("Backend not connected");
      return saveStoreSettings(actor, settings);
    },
    onSuccess: () =>
      void qc.invalidateQueries({ queryKey: ["admin", "settings"] }),
  });
}
