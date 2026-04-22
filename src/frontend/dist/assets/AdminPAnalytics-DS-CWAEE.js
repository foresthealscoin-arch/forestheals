import { r as reactExports, j as jsxRuntimeExports, a as Button, I as Input, e as ue } from "./index-CfU2kVIJ.js";
import { d as Dialog, e as DialogContent, f as DialogHeader, g as DialogTitle } from "./dialog-BmCSuf7q.js";
import { L as Label } from "./label-BjUfKOjb.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-DWPZIEKW.js";
import { S as Skeleton } from "./skeleton-Dbe_tSkr.js";
import { T as Textarea } from "./textarea-CHqS0GCX.js";
import { m as useAdminAnalytics, n as useAdminExpenses, o as useAddExpense, p as useUpdateExpense, q as useDeleteExpense, A as AdminPLayout, d as APKpiCard, C as ChartColumn } from "./AdminPLayout-CIt5RHz_.js";
import { t as toPrice } from "./convert-Cs1e6Uux.js";
import { C as CircleAlert } from "./circle-alert-ucF-SypE.js";
import { R as RefreshCw } from "./refresh-cw-CczYOB5W.js";
import { P as Pen } from "./pen-C8l-9AD8.js";
import { T as Trash2 } from "./trash-2-CLRUW9XH.js";
import { P as Plus } from "./plus-Dgb9NiV8.js";
import "./index-l7_3JU5-.js";
import "./index-D_sIzci6.js";
import "./index-Cv8ba7Pb.js";
import "./index-Dzwq3ONP.js";
import "./check-DSd0zFnf.js";
import "./useMutation-DVPdZiQH.js";
import "./leaf-BdKoN6HX.js";
import "./chevron-right-DNGmMEAY.js";
import "./package-C5tkAuNr.js";
import "./users-BTrxV2BM.js";
import "./star-D6nQNTvb.js";
const EXPENSE_CATS = [
  "Ad Spend",
  "Packaging",
  "Shipping",
  "Warehouse",
  "Salary",
  "Misc"
];
function genId() {
  return `EXP-${Date.now().toString(36).toUpperCase()}`;
}
function formatExpenseDate(ns) {
  return new Date(Number(ns) / 1e6).toLocaleDateString("en-IN");
}
function AdminPAnalytics() {
  const {
    data: analytics,
    isLoading: analyticsLoading,
    isError,
    refetch
  } = useAdminAnalytics();
  const { data: expenses = [], isLoading: expLoading } = useAdminExpenses();
  const addExpenseMutation = useAddExpense();
  const updateExpenseMutation = useUpdateExpense();
  const deleteExpenseMutation = useDeleteExpense();
  const [showModal, setShowModal] = reactExports.useState(false);
  const [editTarget, setEditTarget] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState({});
  function openAdd() {
    setEditTarget(null);
    setForm({ category: "Ad Spend", date: BigInt(Date.now() * 1e6) });
    setShowModal(true);
  }
  function openEdit(e) {
    setEditTarget(e);
    setForm({ ...e });
    setShowModal(true);
  }
  async function handleSave() {
    var _a;
    if (!form.amount || !((_a = form.description) == null ? void 0 : _a.trim())) {
      ue.error("Amount and description are required");
      return;
    }
    try {
      const expense = {
        id: (editTarget == null ? void 0 : editTarget.id) ?? genId(),
        category: form.category ?? "Misc",
        amount: BigInt(Number(form.amount)),
        description: form.description ?? "",
        date: form.date ?? BigInt(Date.now() * 1e6),
        createdBy: (editTarget == null ? void 0 : editTarget.createdBy) ?? "admin"
      };
      if (editTarget) {
        await updateExpenseMutation.mutateAsync({ id: editTarget.id, expense });
        ue.success("Expense updated");
      } else {
        await addExpenseMutation.mutateAsync(expense);
        ue.success("Expense added");
      }
      setShowModal(false);
    } catch {
      ue.error("Failed to save expense");
    }
  }
  async function handleDelete(id) {
    try {
      await deleteExpenseMutation.mutateAsync(id);
      ue.success("Expense deleted");
    } catch {
      ue.error("Failed to delete expense");
    }
  }
  const totalExpenses = expenses.reduce((s, e) => s + Number(e.amount), 0);
  if (isError) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      AdminPLayout,
      {
        title: "Analytics & Financials",
        subtitle: "Track revenue, expenses, and profitability",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-red-50 border border-red-200 rounded-2xl p-8 text-center",
            "data-ocid": "adminp.analytics.error_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-8 h-8 text-red-400 mx-auto mb-3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-red-700 font-medium", children: "Failed to load analytics" }),
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
        )
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    AdminPLayout,
    {
      title: "Analytics & Financials",
      subtitle: "Track revenue, expenses, and profitability",
      actions: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          size: "sm",
          className: "gap-1 bg-[#004a38] hover:bg-[#003a2c]",
          onClick: openAdd,
          "data-ocid": "adminp.analytics.add_expense_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
            " Add Expense"
          ]
        }
      ),
      children: [
        analyticsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4 mb-6", children: ["a", "b", "c", "d", "e", "f", "g", "h"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 w-full rounded-2xl" }, k)) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mb-6",
            "data-ocid": "adminp.analytics.kpi_row",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                APKpiCard,
                {
                  label: "Total Revenue",
                  value: toPrice((analytics == null ? void 0 : analytics.totalRevenue) ?? 0),
                  icon: ChartColumn,
                  color: "green"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                APKpiCard,
                {
                  label: "Total Expenses",
                  value: toPrice(totalExpenses),
                  icon: ChartColumn,
                  color: "red"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                APKpiCard,
                {
                  label: "Net Profit",
                  value: toPrice((analytics == null ? void 0 : analytics.netProfit) ?? 0),
                  icon: ChartColumn,
                  color: ((analytics == null ? void 0 : analytics.netProfit) ?? 0) >= 0 ? "green" : "red"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                APKpiCard,
                {
                  label: "Avg Order Value",
                  value: toPrice((analytics == null ? void 0 : analytics.avgOrderValue) ?? 0),
                  icon: ChartColumn,
                  color: "blue"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                APKpiCard,
                {
                  label: "Total Orders",
                  value: (analytics == null ? void 0 : analytics.orderCount) ?? 0,
                  icon: ChartColumn,
                  color: "blue"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                APKpiCard,
                {
                  label: "Total Customers",
                  value: (analytics == null ? void 0 : analytics.customerCount) ?? 0,
                  icon: ChartColumn,
                  color: "green"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                APKpiCard,
                {
                  label: "COD Amount",
                  value: toPrice((analytics == null ? void 0 : analytics.paymentBreakdown.codAmount) ?? 0),
                  icon: ChartColumn,
                  color: "yellow"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                APKpiCard,
                {
                  label: "Online Amount",
                  value: toPrice((analytics == null ? void 0 : analytics.paymentBreakdown.onlineAmount) ?? 0),
                  icon: ChartColumn,
                  color: "blue"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-5 mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border border-gray-100 shadow-sm p-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-gray-900 mb-4 text-sm", children: "Expense Breakdown" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: EXPENSE_CATS.map((cat) => {
              const amt = expenses.filter((e) => e.category === cat).reduce((s, e) => s + Number(e.amount), 0);
              const pct = totalExpenses > 0 ? Math.round(amt / totalExpenses * 100) : 0;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm text-gray-600 mb-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: cat }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium", children: [
                    "₹",
                    amt.toLocaleString("en-IN"),
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-gray-400", children: [
                      "(",
                      pct,
                      "%)"
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 bg-gray-100 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "h-full bg-[#004a38] rounded-full transition-all duration-500",
                    style: { width: `${pct}%` }
                  }
                ) })
              ] }, cat);
            }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border border-gray-100 shadow-sm p-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-gray-900 mb-4 text-sm", children: "P&L Summary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [
              {
                label: "Gross Revenue",
                value: (analytics == null ? void 0 : analytics.totalRevenue) ?? 0,
                cls: "text-green-700"
              },
              {
                label: "Total Expenses",
                value: -totalExpenses,
                cls: "text-red-600",
                neg: true
              },
              {
                label: "Net Profit",
                value: (analytics == null ? void 0 : analytics.netProfit) ?? 0,
                cls: ((analytics == null ? void 0 : analytics.netProfit) ?? 0) >= 0 ? "text-green-700 font-bold text-base" : "text-red-600 font-bold text-base",
                divider: true
              }
            ].map((row) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              row.divider && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-gray-100 my-2" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-600", children: row.label }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: row.cls, children: [
                  "₹",
                  Math.abs(row.value).toLocaleString("en-IN")
                ] })
              ] })
            ] }, row.label)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-4 border-b border-gray-100 flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-gray-900 text-sm", children: "All Expenses" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-gray-400", children: [
              expenses.length,
              " entries"
            ] })
          ] }),
          expLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 space-y-2", children: ["a", "b", "c"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full rounded" }, k)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "table",
            {
              className: "w-full text-sm",
              "data-ocid": "adminp.analytics.expenses_table",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-gray-50 text-gray-500 text-xs uppercase tracking-wide border-b border-gray-100", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-5 py-3 font-medium", children: "Category" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-medium", children: "Description" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-medium", children: "Amount" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-medium hidden sm:table-cell", children: "Date" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-medium", children: "Actions" })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
                  expenses.map((e, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "tr",
                    {
                      "data-ocid": `adminp.analytics.expense.item.${i + 1}`,
                      className: "border-t border-gray-50 hover:bg-gray-50/60 transition-colors",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs px-2 py-0.5 rounded-full font-medium bg-green-50 text-green-700", children: e.category }) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-gray-700 text-xs", children: e.description }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-right font-semibold text-red-600", children: [
                          "₹",
                          Number(e.amount).toLocaleString("en-IN")
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-gray-500 text-xs hidden sm:table-cell", children: formatExpenseDate(e.date) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-1", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Button,
                            {
                              size: "icon",
                              variant: "ghost",
                              className: "h-7 w-7",
                              onClick: () => openEdit(e),
                              "data-ocid": `adminp.analytics.expense.item.${i + 1}.edit_button`,
                              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "w-3.5 h-3.5" })
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Button,
                            {
                              size: "icon",
                              variant: "ghost",
                              className: "h-7 w-7 hover:bg-red-50 hover:text-red-600",
                              onClick: () => void handleDelete(e.id),
                              "data-ocid": `adminp.analytics.expense.item.${i + 1}.delete_button`,
                              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
                            }
                          )
                        ] }) })
                      ]
                    },
                    e.id
                  )),
                  expenses.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "td",
                    {
                      colSpan: 5,
                      className: "py-10 text-center text-gray-400 text-sm",
                      "data-ocid": "adminp.analytics.expenses.empty_state",
                      children: "No expenses recorded. Add your first expense."
                    }
                  ) })
                ] })
              ]
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showModal, onOpenChange: setShowModal, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          DialogContent,
          {
            className: "max-w-md",
            "data-ocid": "adminp.analytics.expense.modal.dialog",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: editTarget ? "Edit Expense" : "Add Expense" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 pt-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Category" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Select,
                    {
                      value: form.category ?? "Ad Spend",
                      onValueChange: (v) => setForm((f) => ({ ...f, category: v })),
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "adminp.analytics.expense.modal.category_select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: EXPENSE_CATS.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c, children: c }, c)) })
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Amount (₹) *" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      type: "number",
                      min: 0,
                      value: form.amount ? Number(form.amount) : "",
                      onChange: (e) => setForm((f) => ({
                        ...f,
                        amount: BigInt(Number(e.target.value))
                      })),
                      "data-ocid": "adminp.analytics.expense.modal.amount_input"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Description *" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Textarea,
                    {
                      rows: 2,
                      value: form.description ?? "",
                      onChange: (e) => setForm((f) => ({ ...f, description: e.target.value })),
                      placeholder: "e.g. Instagram Ads - April",
                      "data-ocid": "adminp.analytics.expense.modal.description_input"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      className: "flex-1 bg-[#004a38] hover:bg-[#003a2c]",
                      onClick: () => void handleSave(),
                      disabled: addExpenseMutation.isPending || updateExpenseMutation.isPending,
                      "data-ocid": "adminp.analytics.expense.modal.submit_button",
                      children: addExpenseMutation.isPending || updateExpenseMutation.isPending ? "Saving…" : editTarget ? "Save" : "Add Expense"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      variant: "outline",
                      className: "flex-1",
                      onClick: () => setShowModal(false),
                      "data-ocid": "adminp.analytics.expense.modal.cancel_button",
                      children: "Cancel"
                    }
                  )
                ] })
              ] })
            ]
          }
        ) })
      ]
    }
  );
}
export {
  AdminPAnalytics as default
};
