import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  CheckCircle2,
  Star,
  ThumbsDown,
  ThumbsUp,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { APTag, AdminPLayout } from "./AdminPLayout";
import { useAdminPStore } from "./adminpStore";

export default function AdminPReviews() {
  const reviews = useAdminPStore((s) => s.reviews);
  const updateReview = useAdminPStore((s) => s.updateReview);
  const [filter, setFilter] = useState<
    "all" | "Pending" | "Approved" | "Rejected"
  >("all");
  const [replyTarget, setReplyTarget] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");

  const filtered =
    filter === "all" ? reviews : reviews.filter((r) => r.status === filter);

  const statusColor: Record<string, "yellow" | "green" | "red"> = {
    Pending: "yellow",
    Approved: "green",
    Rejected: "red",
  };

  function handleApprove(id: string) {
    const r = reviews.find((x) => x.id === id);
    if (r) {
      updateReview({ ...r, status: "Approved" });
      toast.success("Review approved");
    }
  }

  function handleReject(id: string) {
    const r = reviews.find((x) => x.id === id);
    if (r) {
      updateReview({ ...r, status: "Rejected" });
      toast.success("Review rejected");
    }
  }

  function handleReply(id: string) {
    const r = reviews.find((x) => x.id === id);
    if (r) {
      updateReview({ ...r, reply: replyText });
      setReplyTarget(null);
      setReplyText("");
      toast.success("Reply saved");
    }
  }

  const avgRating =
    reviews.length > 0
      ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
      : "0.0";

  return (
    <AdminPLayout
      title="Reviews"
      subtitle="Moderate and reply to customer reviews"
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
            value: reviews.filter((r) => r.status === "Pending").length,
            color: "text-yellow-600",
          },
          {
            label: "Approved",
            value: reviews.filter((r) => r.status === "Approved").length,
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
        {(["all", "Pending", "Approved", "Rejected"] as const).map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            data-ocid={`adminp.reviews.filter.${f.toLowerCase()}.tab`}
            className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize transition-colors ${filter === f ? "bg-[#004a38] text-white" : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300"}`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Reviews */}
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
                    {review.customerName}
                  </span>
                  <span className="text-xs text-gray-400">
                    on {review.productName}
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
                    label={review.status}
                    color={statusColor[review.status]}
                  />
                  <span className="text-xs text-gray-400">
                    {review.createdAt}
                  </span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {review.comment}
                </p>
                {review.reply && (
                  <div className="mt-3 pl-4 border-l-2 border-green-200">
                    <p className="text-xs text-gray-500 mb-1 font-medium">
                      Admin Reply
                    </p>
                    <p className="text-sm text-gray-700">{review.reply}</p>
                  </div>
                )}
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
                        onClick={() => handleReply(review.id)}
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
                {review.status === "Pending" && (
                  <>
                    <Button
                      size="sm"
                      className="h-7 text-xs gap-1 bg-green-600 hover:bg-green-700"
                      onClick={() => handleApprove(review.id)}
                      data-ocid={`adminp.reviews.item.${i + 1}.approve_button`}
                    >
                      <ThumbsUp className="w-3 h-3" /> Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 text-xs gap-1 hover:border-red-300 hover:text-red-600"
                      onClick={() => handleReject(review.id)}
                      data-ocid={`adminp.reviews.item.${i + 1}.reject_button`}
                    >
                      <ThumbsDown className="w-3 h-3" /> Reject
                    </Button>
                  </>
                )}
                {review.status === "Approved" && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 text-xs gap-1"
                    onClick={() => {
                      setReplyTarget(review.id);
                      setReplyText(review.reply);
                    }}
                    data-ocid={`adminp.reviews.item.${i + 1}.reply_button`}
                  >
                    Reply
                  </Button>
                )}
                {review.status === "Rejected" && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 text-xs gap-1 hover:border-green-300"
                    onClick={() => handleApprove(review.id)}
                    data-ocid={`adminp.reviews.item.${i + 1}.restore_button`}
                  >
                    <CheckCircle2 className="w-3 h-3" /> Restore
                  </Button>
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
            <p className="text-gray-500 text-sm">No reviews found</p>
          </div>
        )}
      </div>
    </AdminPLayout>
  );
}
