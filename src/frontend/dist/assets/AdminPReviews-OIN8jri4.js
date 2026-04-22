import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, a as Button, e as ue } from "./index-CfU2kVIJ.js";
import { S as Skeleton } from "./skeleton-Dbe_tSkr.js";
import { T as Textarea } from "./textarea-CHqS0GCX.js";
import { J as useAdminReviews, K as useApproveReview, L as useRejectReview, A as AdminPLayout, l as APTag } from "./AdminPLayout-CIt5RHz_.js";
import { C as CircleAlert } from "./circle-alert-ucF-SypE.js";
import { R as RefreshCw } from "./refresh-cw-CczYOB5W.js";
import { S as Star } from "./star-D6nQNTvb.js";
import { C as CircleX } from "./circle-x-ByMEtOgM.js";
import "./useMutation-DVPdZiQH.js";
import "./convert-Cs1e6Uux.js";
import "./leaf-BdKoN6HX.js";
import "./chevron-right-DNGmMEAY.js";
import "./package-C5tkAuNr.js";
import "./users-BTrxV2BM.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M17 14V2", key: "8ymqnk" }],
  [
    "path",
    {
      d: "M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z",
      key: "m61m77"
    }
  ]
];
const ThumbsDown = createLucideIcon("thumbs-down", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M7 10v12", key: "1qc93n" }],
  [
    "path",
    {
      d: "M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z",
      key: "emmmcr"
    }
  ]
];
const ThumbsUp = createLucideIcon("thumbs-up", __iconNode);
function AdminPReviews() {
  const { data: reviews = [], isLoading, isError, refetch } = useAdminReviews();
  const approveMutation = useApproveReview();
  const rejectMutation = useRejectReview();
  const [filter, setFilter] = reactExports.useState("all");
  const [replyTarget, setReplyTarget] = reactExports.useState(null);
  const [replyText, setReplyText] = reactExports.useState("");
  const filtered = filter === "all" ? reviews : filter === "pending" ? reviews.filter((r) => !r.approved) : filter === "approved" ? reviews.filter((r) => r.approved) : [];
  async function handleApprove(id) {
    try {
      await approveMutation.mutateAsync(id);
      ue.success("Review approved");
    } catch {
      ue.error("Failed to approve review");
    }
  }
  async function handleReject(id) {
    try {
      await rejectMutation.mutateAsync(id);
      ue.success("Review rejected");
    } catch {
      ue.error("Failed to reject review");
    }
  }
  const avgRating = reviews.length > 0 ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1) : "0.0";
  const formatDate = (ms) => new Date(ms).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
  if (isError) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminPLayout, { title: "Reviews", subtitle: "Moderate customer reviews", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-red-50 border border-red-200 rounded-2xl p-8 text-center",
        "data-ocid": "adminp.reviews.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-8 h-8 text-red-400 mx-auto mb-3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-red-700 font-medium", children: "Failed to load reviews" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              className: "mt-3",
              onClick: () => void refetch(),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4 mr-1" }),
                " Retry"
              ]
            }
          )
        ]
      }
    ) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    AdminPLayout,
    {
      title: "Reviews",
      subtitle: "Moderate and manage customer reviews",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4 mb-6", children: [
          {
            label: "Avg Rating",
            value: `${avgRating} ★`,
            color: "text-yellow-600"
          },
          {
            label: "Total Reviews",
            value: reviews.length,
            color: "text-gray-900"
          },
          {
            label: "Pending",
            value: reviews.filter((r) => !r.approved).length,
            color: "text-yellow-600"
          },
          {
            label: "Approved",
            value: reviews.filter((r) => r.approved).length,
            color: "text-green-700"
          }
        ].map((card) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-white rounded-2xl border border-gray-100 shadow-sm p-5",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 font-medium uppercase tracking-wide", children: card.label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-2xl font-bold mt-1 ${card.color}`, children: card.value })
            ]
          },
          card.label
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 mb-4", "data-ocid": "adminp.reviews.filters", children: ["all", "pending", "approved", "rejected"].map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setFilter(f),
            "data-ocid": `adminp.reviews.filter.${f}.tab`,
            className: `px-4 py-1.5 rounded-full text-sm font-medium capitalize transition-colors ${filter === f ? "bg-[#004a38] text-white" : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300"}`,
            children: f
          },
          f
        )) }),
        isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "adminp.reviews.loading_state", children: ["a", "b", "c"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 w-full rounded-2xl" }, k)) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          filtered.map((review, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              "data-ocid": `adminp.reviews.item.${i + 1}`,
              className: "bg-white rounded-2xl border border-gray-100 shadow-sm p-5",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 flex-wrap mb-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-gray-900 text-sm", children: [
                      review.userId.slice(0, 16),
                      "…"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-gray-400", children: [
                      "Product #",
                      review.productId
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-0.5", children: [1, 2, 3, 4, 5].map((star) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Star,
                      {
                        className: `w-3.5 h-3.5 ${star <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-200"}`
                      },
                      star
                    )) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      APTag,
                      {
                        label: review.approved ? "Approved" : "Pending",
                        color: review.approved ? "green" : "yellow"
                      }
                    ),
                    review.verified && /* @__PURE__ */ jsxRuntimeExports.jsx(APTag, { label: "Verified", color: "blue" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-gray-400", children: formatDate(review.createdAt) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-700 leading-relaxed", children: review.text }),
                  replyTarget === review.id && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 space-y-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Textarea,
                      {
                        value: replyText,
                        onChange: (e) => setReplyText(e.target.value),
                        placeholder: "Write your reply…",
                        rows: 2,
                        "data-ocid": `adminp.reviews.item.${i + 1}.reply_input`
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Button,
                        {
                          size: "sm",
                          className: "bg-[#004a38] hover:bg-[#003a2c] h-7 text-xs",
                          onClick: () => {
                            setReplyTarget(null);
                            setReplyText("");
                            ue.success(
                              "Reply noted (backend reply not yet implemented)"
                            );
                          },
                          "data-ocid": `adminp.reviews.item.${i + 1}.reply_submit_button`,
                          children: "Post Reply"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Button,
                        {
                          size: "sm",
                          variant: "outline",
                          className: "h-7 text-xs",
                          onClick: () => {
                            setReplyTarget(null);
                            setReplyText("");
                          },
                          "data-ocid": `adminp.reviews.item.${i + 1}.reply_cancel_button`,
                          children: "Cancel"
                        }
                      )
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5 flex-shrink-0", children: [
                  !review.approved && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        size: "sm",
                        className: "h-7 text-xs gap-1 bg-green-600 hover:bg-green-700",
                        onClick: () => void handleApprove(review.id),
                        disabled: approveMutation.isPending,
                        "data-ocid": `adminp.reviews.item.${i + 1}.approve_button`,
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(ThumbsUp, { className: "w-3 h-3" }),
                          " Approve"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        size: "sm",
                        variant: "outline",
                        className: "h-7 text-xs gap-1 hover:border-red-300 hover:text-red-600",
                        onClick: () => void handleReject(review.id),
                        disabled: rejectMutation.isPending,
                        "data-ocid": `adminp.reviews.item.${i + 1}.reject_button`,
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(ThumbsDown, { className: "w-3 h-3" }),
                          " Reject"
                        ]
                      }
                    )
                  ] }),
                  review.approved && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        size: "sm",
                        variant: "outline",
                        className: "h-7 text-xs gap-1",
                        onClick: () => {
                          setReplyTarget(review.id);
                          setReplyText("");
                        },
                        "data-ocid": `adminp.reviews.item.${i + 1}.reply_button`,
                        children: "Reply"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        size: "sm",
                        variant: "outline",
                        className: "h-7 text-xs gap-1 hover:border-red-300 hover:text-red-600",
                        onClick: () => void handleReject(review.id),
                        disabled: rejectMutation.isPending,
                        "data-ocid": `adminp.reviews.item.${i + 1}.reject_button`,
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-3 h-3" }),
                          " Reject"
                        ]
                      }
                    )
                  ] })
                ] })
              ] })
            },
            review.id
          )),
          filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "bg-white rounded-2xl border border-gray-100 p-14 text-center",
              "data-ocid": "adminp.reviews.empty_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-10 h-10 text-gray-300 mx-auto mb-3" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 text-sm", children: filter === "all" ? "No reviews yet — they'll appear when customers submit reviews" : `No ${filter} reviews` })
              ]
            }
          )
        ] })
      ]
    }
  );
}
export {
  AdminPReviews as default
};
