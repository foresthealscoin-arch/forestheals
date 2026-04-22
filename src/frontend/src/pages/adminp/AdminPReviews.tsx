import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertCircle,
  CheckCircle2,
  RefreshCw,
  Star,
  ThumbsDown,
  ThumbsUp,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  useAdminReviews,
  useApproveReview,
  useRejectReview,
} from "../../hooks/useAdminData";
import type { ReviewView } from "../../services/reviewService";
import { APTag, AdminPLayout } from "./AdminPLayout";

export default function AdminPReviews() {
  const { data: reviews = [], isLoading, isError, refetch } = useAdminReviews();
  const approveMutation = useApproveReview();
  const rejectMutation = useRejectReview();
  const [filter, setFilter] = useState<
    "all" | "pending" | "approved" | "rejected"
  >("all");
  const [replyTarget, setReplyTarget] = useState<number | null>(null);
  const [replyText, setReplyText] = useState("");

  const filtered =
    filter === "all"
      ? reviews
      : filter === "pending"
        ? reviews.filter((r) => !r.approved)
        : filter === "approved"
          ? reviews.filter((r) => r.approved)
          : [];

  async function handleApprove(id: number) {
    try {
      await approveMutation.mutateAsync(id);
      toast.success("Review approved");
    } catch {
      toast.error("Failed to approve review");
    }
  }

  async function handleReject(id: number) {
    try {
      await rejectMutation.mutateAsync(id);
      toast.success("Review rejected");
    } catch {
      toast.error("Failed to reject review");
    }
  }

  const avgRating =
    reviews.length > 0
      ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
      : "0.0";

  const formatDate = (ms: number) =>
    new Date(ms).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  if (isError) {
    return (
      <AdminPLayout title="Reviews" subtitle="Moderate customer reviews">
        <div
          className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center"
          data-ocid="adminp.reviews.error_state"
        >
          <AlertCircle className="w-8 h-8 text-red-400 mx-auto mb-3" />
          <p className="text-red-700 font-medium">Failed to load reviews</p>
          <Button
            variant="outline"
            size="sm"
            className="mt-3"
            onClick={() => void refetch()}
          >
            <RefreshCw className="w-4 h-4 mr-1" /> Retry
          </Button>
        </div>
      </AdminPLayout>
    );
  }

  return (
    <AdminPLayout
      title="Reviews"
      subtitle="Moderate and manage customer reviews"
    >
      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          {
            label: "Avg Rating",
            value: `${avgRating} ★`,
            color: "text-yellow-600",
          },
          {
            label: "Total Reviews",
            value: reviews.length,
            color: "text-gray-900",
          },
          {
            label: "Pending",
            value: reviews.filter((r) => !r.approved).length,
            color: "text-yellow-600",
          },
          {
            label: "Approved",
            value: reviews.filter((r) => r.approved).length,
            color: "text-green-700",
          },
        ].map((card) => (
          <div
            key={card.label}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5"
          >
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
              {card.label}
            </p>
            <p className={`text-2xl font-bold mt-1 ${card.color}`}>
              {card.value}
            </p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-4" data-ocid="adminp.reviews.filters">
        {(["all", "pending", "approved", "rejected"] as const).map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            data-ocid={`adminp.reviews.filter.${f}.tab`}
            className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize transition-colors ${filter === f ? "bg-[#004a38] text-white" : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300"}`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Reviews */}
      {isLoading ? (
        <div className="space-y-3" data-ocid="adminp.reviews.loading_state">
          {["a", "b", "c"].map((k) => (
            <Skeleton key={k} className="h-24 w-full rounded-2xl" />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((review, i) => (
            <div
              key={review.id}
              data-ocid={`adminp.reviews.item.${i + 1}`}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap mb-2">
                    <span className="font-semibold text-gray-900 text-sm">
                      {review.userId.slice(0, 16)}…
                    </span>
                    <span className="text-xs text-gray-400">
                      Product #{review.productId}
                    </span>
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-3.5 h-3.5 ${star <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-200"}`}
                        />
                      ))}
                    </div>
                    <APTag
                      label={review.approved ? "Approved" : "Pending"}
                      color={review.approved ? "green" : "yellow"}
                    />
                    {review.verified && <APTag label="Verified" color="blue" />}
                    <span className="text-xs text-gray-400">
                      {formatDate(review.createdAt)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {review.text}
                  </p>
                  {replyTarget === review.id && (
                    <div className="mt-3 space-y-2">
                      <Textarea
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Write your reply…"
                        rows={2}
                        data-ocid={`adminp.reviews.item.${i + 1}.reply_input`}
                      />
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          className="bg-[#004a38] hover:bg-[#003a2c] h-7 text-xs"
                          onClick={() => {
                            setReplyTarget(null);
                            setReplyText("");
                            toast.success(
                              "Reply noted (backend reply not yet implemented)",
                            );
                          }}
                          data-ocid={`adminp.reviews.item.${i + 1}.reply_submit_button`}
                        >
                          Post Reply
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 text-xs"
                          onClick={() => {
                            setReplyTarget(null);
                            setReplyText("");
                          }}
                          data-ocid={`adminp.reviews.item.${i + 1}.reply_cancel_button`}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-1.5 flex-shrink-0">
                  {!review.approved && (
                    <>
                      <Button
                        size="sm"
                        className="h-7 text-xs gap-1 bg-green-600 hover:bg-green-700"
                        onClick={() => void handleApprove(review.id)}
                        disabled={approveMutation.isPending}
                        data-ocid={`adminp.reviews.item.${i + 1}.approve_button`}
                      >
                        <ThumbsUp className="w-3 h-3" /> Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-7 text-xs gap-1 hover:border-red-300 hover:text-red-600"
                        onClick={() => void handleReject(review.id)}
                        disabled={rejectMutation.isPending}
                        data-ocid={`adminp.reviews.item.${i + 1}.reject_button`}
                      >
                        <ThumbsDown className="w-3 h-3" /> Reject
                      </Button>
                    </>
                  )}
                  {review.approved && (
                    <>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-7 text-xs gap-1"
                        onClick={() => {
                          setReplyTarget(review.id);
                          setReplyText("");
                        }}
                        data-ocid={`adminp.reviews.item.${i + 1}.reply_button`}
                      >
                        Reply
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-7 text-xs gap-1 hover:border-red-300 hover:text-red-600"
                        onClick={() => void handleReject(review.id)}
                        disabled={rejectMutation.isPending}
                        data-ocid={`adminp.reviews.item.${i + 1}.reject_button`}
                      >
                        <XCircle className="w-3 h-3" /> Reject
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div
              className="bg-white rounded-2xl border border-gray-100 p-14 text-center"
              data-ocid="adminp.reviews.empty_state"
            >
              <Star className="w-10 h-10 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 text-sm">
                {filter === "all"
                  ? "No reviews yet — they'll appear when customers submit reviews"
                  : `No ${filter} reviews`}
              </p>
            </div>
          )}
        </div>
      )}
    </AdminPLayout>
  );
}
