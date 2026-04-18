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
import { Textarea } from "@/components/ui/textarea";
import { BarChart3, Edit2, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { APKpiCard, AdminPLayout } from "./AdminPLayout";
import type { APExpense } from "./adminpStore";
import { useAdminPStore } from "./adminpStore";

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

export default function AdminPAnalytics() {
  const orders = useAdminPStore((s) => s.orders);
  const expenses = useAdminPStore((s) => s.expenses);
  const addExpense = useAdminPStore((s) => s.addExpense);
  const updateExpense = useAdminPStore((s) => s.updateExpense);
  const deleteExpense = useAdminPStore((s) => s.deleteExpense);

  const [showModal, setShowModal] = useState(false);
  const [editTarget, setEditTarget] = useState<APExpense | null>(null);
  const [form, setForm] = useState<Partial<APExpense>>({});

  const totalRevenue = orders.reduce((s, o) => s + o.total, 0);
  const totalExpenses = expenses.reduce((s, e) => s + e.amount, 0);
  const netProfit = totalRevenue - totalExpenses;
  const adSpend = expenses
    .filter((e) => e.category === "Ad Spend")
    .reduce((s, e) => s + e.amount, 0);
  const packagingCost = expenses
    .filter((e) => e.category === "Packaging")
    .reduce((s, e) => s + e.amount, 0);
  const shippingCost = expenses
    .filter((e) => e.category === "Shipping")
    .reduce((s, e) => s + e.amount, 0);
  const grossMargin =
    totalRevenue > 0 ? Math.round((netProfit / totalRevenue) * 100) : 0;
  const avgOrder =
    orders.length > 0 ? Math.round(totalRevenue / orders.length) : 0;

  function openAdd() {
    setEditTarget(null);
    setForm({
      category: "Ad Spend",
      date: new Date().toISOString().split("T")[0],
    });
    setShowModal(true);
  }

  function openEdit(e: APExpense) {
    setEditTarget(e);
    setForm({ ...e });
    setShowModal(true);
  }

  function handleSave() {
    if (!form.amount || !form.description?.trim()) {
      toast.error("Amount and description are required");
      return;
    }
    if (editTarget) {
      updateExpense({ ...editTarget, ...form } as APExpense);
      toast.success("Expense updated");
    } else {
      addExpense({
        id: genId(),
        category: form.category ?? "Misc",
        amount: form.amount ?? 0,
        description: form.description ?? "",
        date: form.date ?? "",
      });
      toast.success("Expense added");
    }
    setShowModal(false);
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
      <div
        className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mb-6"
        data-ocid="adminp.analytics.kpi_row"
      >
        <APKpiCard
          label="Total Revenue (INR)"
          value={`₹${totalRevenue.toLocaleString("en-IN")}`}
          icon={BarChart3}
          color="green"
        />
        <APKpiCard
          label="Total Expenses"
          value={`₹${totalExpenses.toLocaleString("en-IN")}`}
          icon={BarChart3}
          color="red"
        />
        <APKpiCard
          label="Net Profit"
          value={`₹${netProfit.toLocaleString("en-IN")}`}
          icon={BarChart3}
          color={netProfit >= 0 ? "green" : "red"}
        />
        <APKpiCard
          label="Gross Margin"
          value={`${grossMargin}%`}
          icon={BarChart3}
          color="blue"
        />
        <APKpiCard
          label="Marketing Spend"
          value={`₹${adSpend.toLocaleString("en-IN")}`}
          icon={BarChart3}
          color="yellow"
        />
        <APKpiCard
          label="Packaging Cost"
          value={`₹${packagingCost.toLocaleString("en-IN")}`}
          icon={BarChart3}
          color="yellow"
        />
        <APKpiCard
          label="Shipping Cost"
          value={`₹${shippingCost.toLocaleString("en-IN")}`}
          icon={BarChart3}
          color="yellow"
        />
        <APKpiCard
          label="Avg Order Value"
          value={`₹${avgOrder.toLocaleString("en-IN")}`}
          icon={BarChart3}
          color="blue"
        />
      </div>

      {/* Expense Breakdown Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-6">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h3 className="font-semibold text-gray-900 mb-4 text-sm">
            Expense Breakdown
          </h3>
          <div className="space-y-3">
            {EXPENSE_CATS.map((cat) => {
              const amt = expenses
                .filter((e) => e.category === cat)
                .reduce((s, e) => s + e.amount, 0);
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
                value: totalRevenue,
                cls: "text-green-700",
              },
              {
                label: "Total Expenses",
                value: -totalExpenses,
                cls: "text-red-600",
              },
              {
                label: "Net Profit",
                value: netProfit,
                cls:
                  netProfit >= 0
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
        <div className="overflow-x-auto">
          <table
            className="w-full text-sm"
            data-ocid="adminp.analytics.expenses_table"
          >
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide border-b border-gray-100">
                <th className="text-left px-5 py-3 font-medium">Category</th>
                <th className="text-left px-4 py-3 font-medium">Description</th>
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
                    ₹{e.amount.toLocaleString("en-IN")}
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-xs hidden sm:table-cell">
                    {e.date}
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
                        onClick={() => {
                          deleteExpense(e.id);
                          toast.success("Expense deleted");
                        }}
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
                    No expenses recorded
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
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
                onValueChange={(v) =>
                  setForm((f) => ({
                    ...f,
                    category: v as APExpense["category"],
                  }))
                }
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
                value={form.amount ?? ""}
                onChange={(e) =>
                  setForm((f) => ({ ...f, amount: Number(e.target.value) }))
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
            <div className="space-y-1.5">
              <Label>Date</Label>
              <Input
                type="date"
                value={form.date ?? ""}
                onChange={(e) =>
                  setForm((f) => ({ ...f, date: e.target.value }))
                }
                data-ocid="adminp.analytics.expense.modal.date_input"
              />
            </div>
            <div className="flex gap-2 pt-1">
              <Button
                className="flex-1 bg-[#004a38] hover:bg-[#003a2c]"
                onClick={handleSave}
                data-ocid="adminp.analytics.expense.modal.submit_button"
              >
                {editTarget ? "Save" : "Add Expense"}
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
