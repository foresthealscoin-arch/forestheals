import { Z as useAdminPStore, r as reactExports, j as jsxRuntimeExports, a as Button, u as ue, I as Input } from "./index-BTLW_NIC.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-DiMklLnQ.js";
import { L as Label } from "./label-BUCCGSyY.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-BX7DqIsr.js";
import { T as Textarea } from "./textarea-CjhYoXk_.js";
import { A as AdminPLayout, a as APKpiCard, C as ChartColumn } from "./AdminPLayout-DuXyq7Yf.js";
import { P as Pen } from "./pen-Bt1CYM1O.js";
import { T as Trash2 } from "./trash-2-BSOfqa-y.js";
import { P as Plus } from "./plus-BR3-oajm.js";
import "./index-n-hXPyKH.js";
import "./index-CdALTCxJ.js";
import "./index-B4_ux9p8.js";
import "./index-CnBxW9r1.js";
import "./index-BWWxSKzl.js";
import "./index-DJIIwdg5.js";
import "./index-DzxR8ZBH.js";
import "./check-Dzh62hXf.js";
import "./leaf-CzbpTTMi.js";
import "./chevron-right-CYy9z0A9.js";
import "./chevron-left-V7RNY0PU.js";
import "./package-CJHu-mD6.js";
import "./shopping-cart-D31XYOt2.js";
import "./users-CPUsLN16.js";
import "./star-B8b4SvdS.js";
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
function AdminPAnalytics() {
  const orders = useAdminPStore((s) => s.orders);
  const expenses = useAdminPStore((s) => s.expenses);
  const addExpense = useAdminPStore((s) => s.addExpense);
  const updateExpense = useAdminPStore((s) => s.updateExpense);
  const deleteExpense = useAdminPStore((s) => s.deleteExpense);
  const [showModal, setShowModal] = reactExports.useState(false);
  const [editTarget, setEditTarget] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState({});
  const totalRevenue = orders.reduce((s, o) => s + o.total, 0);
  const totalExpenses = expenses.reduce((s, e) => s + e.amount, 0);
  const netProfit = totalRevenue - totalExpenses;
  const adSpend = expenses.filter((e) => e.category === "Ad Spend").reduce((s, e) => s + e.amount, 0);
  const packagingCost = expenses.filter((e) => e.category === "Packaging").reduce((s, e) => s + e.amount, 0);
  const shippingCost = expenses.filter((e) => e.category === "Shipping").reduce((s, e) => s + e.amount, 0);
  const grossMargin = totalRevenue > 0 ? Math.round(netProfit / totalRevenue * 100) : 0;
  const avgOrder = orders.length > 0 ? Math.round(totalRevenue / orders.length) : 0;
  function openAdd() {
    setEditTarget(null);
    setForm({
      category: "Ad Spend",
      date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
    });
    setShowModal(true);
  }
  function openEdit(e) {
    setEditTarget(e);
    setForm({ ...e });
    setShowModal(true);
  }
  function handleSave() {
    var _a;
    if (!form.amount || !((_a = form.description) == null ? void 0 : _a.trim())) {
      ue.error("Amount and description are required");
      return;
    }
    if (editTarget) {
      updateExpense({ ...editTarget, ...form });
      ue.success("Expense updated");
    } else {
      addExpense({
        id: genId(),
        category: form.category ?? "Misc",
        amount: form.amount ?? 0,
        description: form.description ?? "",
        date: form.date ?? ""
      });
      ue.success("Expense added");
    }
    setShowModal(false);
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
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mb-6",
            "data-ocid": "adminp.analytics.kpi_row",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                APKpiCard,
                {
                  label: "Total Revenue (INR)",
                  value: `₹${totalRevenue.toLocaleString("en-IN")}`,
                  icon: ChartColumn,
                  color: "green"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                APKpiCard,
                {
                  label: "Total Expenses",
                  value: `₹${totalExpenses.toLocaleString("en-IN")}`,
                  icon: ChartColumn,
                  color: "red"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                APKpiCard,
                {
                  label: "Net Profit",
                  value: `₹${netProfit.toLocaleString("en-IN")}`,
                  icon: ChartColumn,
                  color: netProfit >= 0 ? "green" : "red"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                APKpiCard,
                {
                  label: "Gross Margin",
                  value: `${grossMargin}%`,
                  icon: ChartColumn,
                  color: "blue"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                APKpiCard,
                {
                  label: "Marketing Spend",
                  value: `₹${adSpend.toLocaleString("en-IN")}`,
                  icon: ChartColumn,
                  color: "yellow"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                APKpiCard,
                {
                  label: "Packaging Cost",
                  value: `₹${packagingCost.toLocaleString("en-IN")}`,
                  icon: ChartColumn,
                  color: "yellow"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                APKpiCard,
                {
                  label: "Shipping Cost",
                  value: `₹${shippingCost.toLocaleString("en-IN")}`,
                  icon: ChartColumn,
                  color: "yellow"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                APKpiCard,
                {
                  label: "Avg Order Value",
                  value: `₹${avgOrder.toLocaleString("en-IN")}`,
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
              const amt = expenses.filter((e) => e.category === cat).reduce((s, e) => s + e.amount, 0);
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
                value: totalRevenue,
                cls: "text-green-700"
              },
              {
                label: "Total Expenses",
                value: -totalExpenses,
                cls: "text-red-600"
              },
              {
                label: "Net Profit",
                value: netProfit,
                cls: netProfit >= 0 ? "text-green-700 font-bold text-base" : "text-red-600 font-bold text-base",
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
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
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
                          e.amount.toLocaleString("en-IN")
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-gray-500 text-xs hidden sm:table-cell", children: e.date }),
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
                              onClick: () => {
                                deleteExpense(e.id);
                                ue.success("Expense deleted");
                              },
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
                      children: "No expenses recorded"
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
                      onValueChange: (v) => setForm((f) => ({
                        ...f,
                        category: v
                      })),
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
                      value: form.amount ?? "",
                      onChange: (e) => setForm((f) => ({ ...f, amount: Number(e.target.value) })),
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
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Date" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      type: "date",
                      value: form.date ?? "",
                      onChange: (e) => setForm((f) => ({ ...f, date: e.target.value })),
                      "data-ocid": "adminp.analytics.expense.modal.date_input"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      className: "flex-1 bg-[#004a38] hover:bg-[#003a2c]",
                      onClick: handleSave,
                      "data-ocid": "adminp.analytics.expense.modal.submit_button",
                      children: editTarget ? "Save" : "Add Expense"
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
