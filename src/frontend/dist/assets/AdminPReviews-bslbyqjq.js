import { c as createLucideIcon, Z as useAdminPStore, r as reactExports, j as jsxRuntimeExports, a as Button, u as ue } from "./index-BTLW_NIC.js";
import { T as Textarea } from "./textarea-CjhYoXk_.js";
import { A as AdminPLayout, b as APTag } from "./AdminPLayout-DuXyq7Yf.js";
import { S as Star } from "./star-B8b4SvdS.js";
import { T as ThumbsUp } from "./thumbs-up-Bg-bpth8.js";
import { C as CircleCheck } from "./circle-check-BBKQs0Vb.js";
import "./leaf-CzbpTTMi.js";
import "./chevron-right-CYy9z0A9.js";
import "./chevron-left-V7RNY0PU.js";
import "./package-CJHu-mD6.js";
import "./shopping-cart-D31XYOt2.js";
import "./users-CPUsLN16.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M17 14V2", key: "8ymqnk" }],
  [
    "path",
    {
      d: "M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z",
      key: "m61m77"
    }
  ]
];
const ThumbsDown = createLucideIcon("thumbs-down", __iconNode);
function AdminPReviews() {
  const reviews = useAdminPStore((s) => s.reviews);
  const updateReview = useAdminPStore((s) => s.updateReview);
  const [filter, setFilter] = reactExports.useState("all");
  const [replyTarget, setReplyTarget] = reactExports.useState(null);
  const [replyText, setReplyText] = reactExports.useState("");
  const filtered = filter === "all" ? reviews : reviews.filter((r) => r.status === filter);
  const statusColor = {
    Pending: "yellow",
    Approved: "green",
    Rejected: "red"
  };
  function handleApprove(id) {
    const r = reviews.find((x) => x.id === id);
    if (r) {
      updateReview({ ...r, status: "Approved" });
      ue.success("Review approved");
    }
  }
  function handleReject(id) {
    const r = reviews.find((x) => x.id === id);
    if (r) {
      updateReview({ ...r, status: "Rejected" });
      ue.success("Review rejected");
    }
  }
  function handleReply(id) {
    const r = reviews.find((x) => x.id === id);
    if (r) {
      updateReview({ ...r, reply: replyText });
      setReplyTarget(null);
      setReplyText("");
      ue.success("Reply saved");
    }
  }
  const avgRating = reviews.length > 0 ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1) : "0.0";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    AdminPLayout,
    {
      title: "Reviews",
      subtitle: "Moderate and reply to customer reviews",
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
            value: reviews.filter((r) => r.status === "Pending").length,
            color: "text-yellow-600"
          },
          {
            label: "Approved",
            value: reviews.filter((r) => r.status === "Approved").length,
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
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 mb-4", "data-ocid": "adminp.reviews.filters", children: ["all", "Pending", "Approved", "Rejected"].map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setFilter(f),
            "data-ocid": `adminp.reviews.filter.${f.toLowerCase()}.tab`,
            className: `px-4 py-1.5 rounded-full text-sm font-medium capitalize transition-colors ${filter === f ? "bg-[#004a38] text-white" : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300"}`,
            children: f
          },
          f
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          filtered.map((review, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              "data-ocid": `adminp.reviews.item.${i + 1}`,
              className: "bg-white rounded-2xl border border-gray-100 shadow-sm p-5",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 flex-wrap mb-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-gray-900 text-sm", children: review.customerName }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-gray-400", children: [
                      "on ",
                      review.productName
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
                        label: review.status,
                        color: statusColor[review.status]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-gray-400", children: review.createdAt })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-700 leading-relaxed", children: review.comment }),
                  review.reply && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 pl-4 border-l-2 border-green-200", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 mb-1 font-medium", children: "Admin Reply" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-700", children: review.reply })
                  ] }),
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
                          onClick: () => handleReply(review.id),
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
                  review.status === "Pending" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        size: "sm",
                        className: "h-7 text-xs gap-1 bg-green-600 hover:bg-green-700",
                        onClick: () => handleApprove(review.id),
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
                        onClick: () => handleReject(review.id),
                        "data-ocid": `adminp.reviews.item.${i + 1}.reject_button`,
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(ThumbsDown, { className: "w-3 h-3" }),
                          " Reject"
                        ]
                      }
                    )
                  ] }),
                  review.status === "Approved" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      size: "sm",
                      variant: "outline",
                      className: "h-7 text-xs gap-1",
                      onClick: () => {
                        setReplyTarget(review.id);
                        setReplyText(review.reply);
                      },
                      "data-ocid": `adminp.reviews.item.${i + 1}.reply_button`,
                      children: "Reply"
                    }
                  ),
                  review.status === "Rejected" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      size: "sm",
                      variant: "outline",
                      className: "h-7 text-xs gap-1 hover:border-green-300",
                      onClick: () => handleApprove(review.id),
                      "data-ocid": `adminp.reviews.item.${i + 1}.restore_button`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3" }),
                        " Restore"
                      ]
                    }
                  )
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
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 text-sm", children: "No reviews found" })
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
