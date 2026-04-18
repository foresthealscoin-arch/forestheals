import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CheckCircle,
  CheckSquare,
  Filter,
  Square,
  Star,
  ThumbsUp,
  Trash2,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { PRODUCTS_SEED_DATA } from "../../lib/seedData";
import type { Review } from "../../types";
import { AdminSidebar } from "./AdminDashboardPage";

// Sample reviews seeded for demo
const SEED_REVIEWS: Review[] = [
  {
    id: 1,
    productId: 1,
    userId: "2vxsx-fae",
    rating: 5,
    text: "Absolutely love this Ashwagandha powder! My energy levels are so much better and stress has reduced significantly. Will definitely buy again.",
    verified: true,
    createdAt: Date.now() - 86400000 * 5,
    approved: true,
  },
  {
    id: 2,
    productId: 3,
    userId: "aaaaa-aa",
    rating: 4,
    text: "Moringa is great — I add it to my morning smoothie every day. Noticeable improvement in immunity this season.",
    verified: true,
    createdAt: Date.now() - 86400000 * 3,
    approved: false,
  },
  {
    id: 3,
    productId: 5,
    userId: "rkp4c-7iaaa",
    rating: 5,
    text: "Triphala Churan has completely transformed my digestion. I've been using it for 2 months and feel so much lighter.",
    verified: false,
    createdAt: Date.now() - 86400000 * 1,
    approved: false,
  },
  {
    id: 4,
    productId: 2,
    userId: "rdmx6-jaaaa",
    rating: 3,
    text: "Brahmi is decent but the taste is quite bitter. Might mix with honey next time.",
    verified: true,
    createdAt: Date.now() - 86400000 * 7,
    approved: true,
  },
  {
    id: 5,
    productId: 9,
    userId: "b77ix-aaaaa",
    rating: 5,
    text: "These chia seeds are so fresh and plump. Perfect for overnight oats. Great quality for the price!",
    verified: true,
    createdAt: Date.now() - 86400000 * 2,
    approved: false,
  },
];

function StarDisplay({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`w-3 h-3 ${s <= rating ? "fill-current text-accent-foreground" : "text-muted-foreground"}`}
        />
      ))}
    </div>
  );
}

function truncatePrincipal(p: string): string {
  return p.length > 14 ? `${p.slice(0, 10)}…` : p;
}

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>(SEED_REVIEWS);
  const [activeTab, setActiveTab] = useState<"all" | "pending" | "approved">(
    "all",
  );
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [deleteTarget, setDeleteTarget] = useState<Review | null>(null);

  const filtered = reviews.filter((r) => {
    if (activeTab === "pending") return !r.approved;
    if (activeTab === "approved") return r.approved;
    return true;
  });

  function getProductName(id: number): string {
    return (
      PRODUCTS_SEED_DATA.find((p) => p.id === id)?.name ?? `Product #${id}`
    );
  }

  function handleApprove(id: number) {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, approved: true } : r)),
    );
    toast.success("Review approved");
  }

  function handleDelete(r: Review) {
    setReviews((prev) => prev.filter((x) => x.id !== r.id));
    setSelected((prev) => {
      const s = new Set(prev);
      s.delete(r.id);
      return s;
    });
    setDeleteTarget(null);
    toast.success("Review deleted");
  }

  function toggleSelect(id: number) {
    setSelected((prev) => {
      const s = new Set(prev);
      s.has(id) ? s.delete(id) : s.add(id);
      return s;
    });
  }

  function toggleSelectAll() {
    if (selected.size === filtered.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(filtered.map((r) => r.id)));
    }
  }

  function handleBulkApprove() {
    setReviews((prev) =>
      prev.map((r) => (selected.has(r.id) ? { ...r, approved: true } : r)),
    );
    toast.success(`${selected.size} reviews approved`);
    setSelected(new Set());
  }

  const pendingCount = reviews.filter((r) => !r.approved).length;
  const approvedCount = reviews.filter((r) => r.approved).length;
  const allOnPageSelected =
    filtered.length > 0 && filtered.every((r) => selected.has(r.id));

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar active="/admin/reviews" />

      <main className="flex-1 overflow-auto" data-ocid="admin.reviews.page">
        {/* Header */}
        <div className="bg-card border-b border-border px-8 py-5 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-foreground">Reviews</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {reviews.length} total · {pendingCount} pending approval
            </p>
          </div>
          {selected.size > 0 && (
            <Button
              type="button"
              size="sm"
              className="gap-2 bg-primary"
              onClick={handleBulkApprove}
              data-ocid="admin.reviews.bulk_approve_button"
            >
              <ThumbsUp className="w-4 h-4" /> Approve {selected.size} selected
            </Button>
          )}
        </div>

        <div className="p-8 space-y-5">
          {/* Tabs */}
          <Tabs
            value={activeTab}
            onValueChange={(v) => {
              setActiveTab(v as typeof activeTab);
              setSelected(new Set());
            }}
          >
            <TabsList data-ocid="admin.reviews.filter.tab">
              <TabsTrigger value="all" data-ocid="admin.reviews.tab.all">
                All ({reviews.length})
              </TabsTrigger>
              <TabsTrigger
                value="pending"
                data-ocid="admin.reviews.tab.pending"
              >
                Pending ({pendingCount})
              </TabsTrigger>
              <TabsTrigger
                value="approved"
                data-ocid="admin.reviews.tab.approved"
              >
                Approved ({approvedCount})
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Table */}
          {filtered.length === 0 ? (
            <div
              className="bg-card rounded-2xl border border-border p-14 text-center"
              data-ocid="admin.reviews.empty_state"
            >
              <Star className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
              <p className="font-medium text-foreground mb-1">
                No reviews found
              </p>
              <p className="text-sm text-muted-foreground">
                Reviews from customers will appear here
              </p>
            </div>
          ) : (
            <div className="bg-card rounded-2xl border border-border shadow-soft overflow-hidden">
              <div className="overflow-x-auto">
                <table
                  className="w-full text-sm"
                  data-ocid="admin.reviews.table"
                >
                  <thead>
                    <tr className="bg-muted/40 text-muted-foreground text-xs uppercase tracking-wide border-b border-border">
                      <th className="px-5 py-3 text-left w-8">
                        <button
                          type="button"
                          onClick={toggleSelectAll}
                          className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {allOnPageSelected ? (
                            <CheckSquare className="w-4 h-4" />
                          ) : (
                            <Square className="w-4 h-4" />
                          )}
                        </button>
                      </th>
                      <th className="text-left px-4 py-3 font-medium">
                        Product
                      </th>
                      <th className="text-left px-4 py-3 font-medium hidden md:table-cell">
                        Reviewer
                      </th>
                      <th className="text-left px-4 py-3 font-medium">
                        Rating
                      </th>
                      <th className="text-left px-4 py-3 font-medium hidden lg:table-cell">
                        Review
                      </th>
                      <th className="text-center px-4 py-3 font-medium hidden sm:table-cell">
                        Verified
                      </th>
                      <th className="text-left px-4 py-3 font-medium">
                        Status
                      </th>
                      <th className="text-right px-4 py-3 font-medium">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((review, i) => (
                      <motion.tr
                        key={review.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.04 }}
                        data-ocid={`admin.reviews.item.${i + 1}`}
                        className={`border-t border-border hover:bg-muted/20 transition-colors ${selected.has(review.id) ? "bg-primary/5" : ""}`}
                      >
                        <td className="px-5 py-3">
                          <button
                            type="button"
                            onClick={() => toggleSelect(review.id)}
                            className="text-muted-foreground hover:text-foreground transition-colors"
                          >
                            {selected.has(review.id) ? (
                              <CheckSquare className="w-4 h-4 text-primary" />
                            ) : (
                              <Square className="w-4 h-4" />
                            )}
                          </button>
                        </td>
                        <td className="px-4 py-3">
                          <p className="font-medium text-foreground text-xs truncate max-w-[120px]">
                            {getProductName(review.productId)}
                          </p>
                        </td>
                        <td className="px-4 py-3 font-mono text-xs text-muted-foreground hidden md:table-cell">
                          {truncatePrincipal(review.userId)}
                        </td>
                        <td className="px-4 py-3">
                          <StarDisplay rating={review.rating} />
                        </td>
                        <td className="px-4 py-3 text-muted-foreground hidden lg:table-cell max-w-[200px]">
                          <p className="line-clamp-2 text-xs">{review.text}</p>
                        </td>
                        <td className="px-4 py-3 text-center hidden sm:table-cell">
                          {review.verified ? (
                            <Badge className="bg-primary/10 text-primary text-xs">
                              Verified
                            </Badge>
                          ) : (
                            <Badge variant="secondary" className="text-xs">
                              Unverified
                            </Badge>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          {review.approved ? (
                            <span className="inline-flex items-center gap-1 text-xs font-medium text-primary">
                              <CheckCircle className="w-3 h-3" /> Approved
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground">
                              <Filter className="w-3 h-3" /> Pending
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-1">
                            {!review.approved && (
                              <Button
                                type="button"
                                size="sm"
                                className="h-7 text-xs gap-1 bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground"
                                onClick={() => handleApprove(review.id)}
                                data-ocid={`admin.reviews.item.${i + 1}.approve_button`}
                              >
                                <ThumbsUp className="w-3 h-3" /> Approve
                              </Button>
                            )}
                            <Button
                              type="button"
                              size="icon"
                              variant="ghost"
                              className="h-7 w-7 hover:text-destructive"
                              onClick={() => setDeleteTarget(review)}
                              data-ocid={`admin.reviews.item.${i + 1}.delete_button`}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </Button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Delete Confirmation */}
      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={() => setDeleteTarget(null)}
      >
        <AlertDialogContent data-ocid="admin.reviews.delete.dialog">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Review</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this review? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-ocid="admin.reviews.delete.cancel_button">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteTarget && handleDelete(deleteTarget)}
              data-ocid="admin.reviews.delete.confirm_button"
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
