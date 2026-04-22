import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertCircle,
  BarChart3,
  Edit2,
  Plus,
  RefreshCw,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { AdminExpense } from "../../backend.d";
import {
  useAddExpense,
  useAdminAnalytics,
  useAdminExpenses,
  useDeleteExpense,
  useUpdateExpense,
} from "../../hooks/useAdminData";
import { toPrice } from "../../utils/convert";
import { APKpiCard, AdminPLayout } from "./AdminPLayout";

const EXPENSE_CATS = [
  "Ad Spend",
  "Packaging",
  "Shipping",
  "Warehouse",
  "Salary",
  "Misc",
] as const;

function genId() {
  return `EXP-${Date.now().toString(36).toUpperCase()}`;
}

function formatExpenseDate(ns: bigint | number): string {
  return new Date(Number(ns) / 1_000_000).toLocaleDateString("en-IN");
}

export default function AdminPAnalytics() {
  const {
    data: analytics,
    isLoading: analyticsLoading,
    isError,
    refetch,
  } = useAdminAnalytics();
  const { data: expenses = [], isLoading: expLoading } = useAdminExpenses();
  const addExpenseMutation = useAddExpense();
  const updateExpenseMutation = useUpdateExpense();
  const deleteExpenseMutation = useDeleteExpense();

  const [showModal, setShowModal] = useState(false);
  const [editTarget, setEditTarget] = useState<AdminExpense | null>(null);
  const [form, setForm] = useState<Partial<AdminExpense>>({});

  function openAdd() {
    setEditTarget(null);
    setForm({ category: "Ad Spend", date: BigInt(Date.now() * 1_000_000) });
    setShowModal(true);
  }

  function openEdit(e: AdminExpense) {
    setEditTarget(e);
    setForm({ ...e });
    setShowModal(true);
  }

  async function handleSave() {
    if (!form.amount || !form.description?.trim()) {
      toast.error("Amount and description are required");
      return;
    }
    try {
      const expense: AdminExpense = {
        id: editTarget?.id ?? genId(),
        category: form.category ?? "Misc",
        amount: BigInt(Number(form.amount)),
        description: form.description ?? "",
        date: form.date ?? BigInt(Date.now() * 1_000_000),
        createdBy: editTarget?.createdBy ?? "admin",
      };
      if (editTarget) {
        await updateExpenseMutation.mutateAsync({ id: editTarget.id, expense });
        toast.success("Expense updated");
      } else {
        await addExpenseMutation.mutateAsync(expense);
        toast.success("Expense added");
      }
      setShowModal(false);
    } catch {
      toast.error("Failed to save expense");
    }
  }

  async function handleDelete(id: string) {
    try {
      await deleteExpenseMutation.mutateAsync(id);
      toast.success("Expense deleted");
    } catch {
      toast.error("Failed to delete expense");
    }
  }

  const totalExpenses = expenses.reduce((s, e) => s + Number(e.amount), 0);

  if (isError) {
    return (
      <AdminPLayout
        title="Analytics & Financials"
        subtitle="Track revenue, expenses, and profitability"
      >
        <div
          className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center"
          data-ocid="adminp.analytics.error_state"
        >
          <AlertCircle className="w-8 h-8 text-red-400 mx-auto mb-3" />
          <p className="text-red-700 font-medium">Failed to load analytics</p>
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
      title="Analytics & Financials"
      subtitle="Track revenue, expenses, and profitability"
      actions={
        <Button
          size="sm"
          className="gap-1 bg-[#004a38] hover:bg-[#003a2c]"
          onClick={openAdd}
          data-ocid="adminp.analytics.add_expense_button"
        >
          <Plus className="w-4 h-4" /> Add Expense
        </Button>
      }
    >
      {/* KPIs */}
      {analyticsLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {["a", "b", "c", "d", "e", "f", "g", "h"].map((k) => (
            <Skeleton key={k} className="h-24 w-full rounded-2xl" />
          ))}
        </div>
      ) : (
        <div
          className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mb-6"
          data-ocid="adminp.analytics.kpi_row"
        >
          <APKpiCard
            label="Total Revenue"
            value={toPrice(analytics?.totalRevenue ?? 0)}
            icon={BarChart3}
            color="green"
          />
          <APKpiCard
            label="Total Expenses"
            value={toPrice(totalExpenses)}
            icon={BarChart3}
            color="red"
          />
          <APKpiCard
            label="Net Profit"
            value={toPrice(analytics?.netProfit ?? 0)}
            icon={BarChart3}
            color={(analytics?.netProfit ?? 0) >= 0 ? "green" : "red"}
          />
          <APKpiCard
            label="Avg Order Value"
            value={toPrice(analytics?.avgOrderValue ?? 0)}
            icon={BarChart3}
            color="blue"
          />
          <APKpiCard
            label="Total Orders"
            value={analytics?.orderCount ?? 0}
            icon={BarChart3}
            color="blue"
          />
          <APKpiCard
            label="Total Customers"
            value={analytics?.customerCount ?? 0}
            icon={BarChart3}
            color="green"
          />
          <APKpiCard
            label="COD Amount"
            value={toPrice(analytics?.paymentBreakdown.codAmount ?? 0)}
            icon={BarChart3}
            color="yellow"
          />
          <APKpiCard
            label="Online Amount"
            value={toPrice(analytics?.paymentBreakdown.onlineAmount ?? 0)}
            icon={BarChart3}
            color="blue"
          />
        </div>
      )}

      {/* Expense Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-6">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h3 className="font-semibold text-gray-900 mb-4 text-sm">
            Expense Breakdown
          </h3>
          <div className="space-y-3">
            {EXPENSE_CATS.map((cat) => {
              const amt = expenses
                .filter((e) => e.category === cat)
                .reduce((s, e) => s + Number(e.amount), 0);
              const pct =
                totalExpenses > 0 ? Math.round((amt / totalExpenses) * 100) : 0;
              return (
                <div key={cat}>
                  <div className="flex justify-between text-sm text-gray-600 mb-1.5">
                    <span>{cat}</span>
                    <span className="font-medium">
                      ₹{amt.toLocaleString("en-IN")}{" "}
                      <span className="text-gray-400">({pct}%)</span>
                    </span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#004a38] rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h3 className="font-semibold text-gray-900 mb-4 text-sm">
            P&L Summary
          </h3>
          <div className="space-y-3">
            {[
              {
                label: "Gross Revenue",
                value: analytics?.totalRevenue ?? 0,
                cls: "text-green-700",
              },
              {
                label: "Total Expenses",
                value: -totalExpenses,
                cls: "text-red-600",
                neg: true,
              },
              {
                label: "Net Profit",
                value: analytics?.netProfit ?? 0,
                cls:
                  (analytics?.netProfit ?? 0) >= 0
                    ? "text-green-700 font-bold text-base"
                    : "text-red-600 font-bold text-base",
                divider: true,
              },
            ].map((row) => (
              <div key={row.label}>
                {row.divider && (
                  <div className="border-t border-gray-100 my-2" />
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{row.label}</span>
                  <span className={row.cls}>
                    ₹{Math.abs(row.value).toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Expenses Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-semibold text-gray-900 text-sm">All Expenses</h2>
          <span className="text-xs text-gray-400">
            {expenses.length} entries
          </span>
        </div>
        {expLoading ? (
          <div className="p-4 space-y-2">
            {["a", "b", "c"].map((k) => (
              <Skeleton key={k} className="h-10 w-full rounded" />
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table
              className="w-full text-sm"
              data-ocid="adminp.analytics.expenses_table"
            >
              <thead>
                <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide border-b border-gray-100">
                  <th className="text-left px-5 py-3 font-medium">Category</th>
                  <th className="text-left px-4 py-3 font-medium">
                    Description
                  </th>
                  <th className="text-right px-4 py-3 font-medium">Amount</th>
                  <th className="text-left px-4 py-3 font-medium hidden sm:table-cell">
                    Date
                  </th>
                  <th className="text-right px-4 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((e, i) => (
                  <tr
                    key={e.id}
                    data-ocid={`adminp.analytics.expense.item.${i + 1}`}
                    className="border-t border-gray-50 hover:bg-gray-50/60 transition-colors"
                  >
                    <td className="px-5 py-3">
                      <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-green-50 text-green-700">
                        {e.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-700 text-xs">
                      {e.description}
                    </td>
                    <td className="px-4 py-3 text-right font-semibold text-red-600">
                      ₹{Number(e.amount).toLocaleString("en-IN")}
                    </td>
                    <td className="px-4 py-3 text-gray-500 text-xs hidden sm:table-cell">
                      {formatExpenseDate(e.date)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-7 w-7"
                          onClick={() => openEdit(e)}
                          data-ocid={`adminp.analytics.expense.item.${i + 1}.edit_button`}
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-7 w-7 hover:bg-red-50 hover:text-red-600"
                          onClick={() => void handleDelete(e.id)}
                          data-ocid={`adminp.analytics.expense.item.${i + 1}.delete_button`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
                {expenses.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="py-10 text-center text-gray-400 text-sm"
                      data-ocid="adminp.analytics.expenses.empty_state"
                    >
                      No expenses recorded. Add your first expense.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add/Edit Expense Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent
          className="max-w-md"
          data-ocid="adminp.analytics.expense.modal.dialog"
        >
          <DialogHeader>
            <DialogTitle>
              {editTarget ? "Edit Expense" : "Add Expense"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3 pt-2">
            <div className="space-y-1.5">
              <Label>Category</Label>
              <Select
                value={form.category ?? "Ad Spend"}
                onValueChange={(v) => setForm((f) => ({ ...f, category: v }))}
              >
                <SelectTrigger data-ocid="adminp.analytics.expense.modal.category_select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {EXPENSE_CATS.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Amount (₹) *</Label>
              <Input
                type="number"
                min={0}
                value={form.amount ? Number(form.amount) : ""}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    amount: BigInt(Number(e.target.value)),
                  }))
                }
                data-ocid="adminp.analytics.expense.modal.amount_input"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Description *</Label>
              <Textarea
                rows={2}
                value={form.description ?? ""}
                onChange={(e) =>
                  setForm((f) => ({ ...f, description: e.target.value }))
                }
                placeholder="e.g. Instagram Ads - April"
                data-ocid="adminp.analytics.expense.modal.description_input"
              />
            </div>
            <div className="flex gap-2 pt-1">
              <Button
                className="flex-1 bg-[#004a38] hover:bg-[#003a2c]"
                onClick={() => void handleSave()}
                disabled={
                  addExpenseMutation.isPending ||
                  updateExpenseMutation.isPending
                }
                data-ocid="adminp.analytics.expense.modal.submit_button"
              >
                {addExpenseMutation.isPending || updateExpenseMutation.isPending
                  ? "Saving…"
                  : editTarget
                    ? "Save"
                    : "Add Expense"}
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowModal(false)}
                data-ocid="adminp.analytics.expense.modal.cancel_button"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </AdminPLayout>
  );
}
