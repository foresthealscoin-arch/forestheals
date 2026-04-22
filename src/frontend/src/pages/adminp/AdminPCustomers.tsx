import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertCircle,
  MapPin,
  RefreshCw,
  Search,
  User,
  Users,
} from "lucide-react";
import { useState } from "react";
import { useAdminCustomers } from "../../hooks/useAdminData";
import { APTag, AdminPLayout } from "./AdminPLayout";

export default function AdminPCustomers() {
  const {
    data: customers = [],
    isLoading,
    isError,
    refetch,
  } = useAdminCustomers();
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<(typeof customers)[0] | null>(null);

  const filtered = customers.filter(
    (c) =>
      !search ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search),
  );

  const statusColor: Record<string, "green" | "yellow" | "red"> = {
    Active: "green",
    VIP: "yellow",
    Blocked: "red",
  };

  const formatDate = (ns: bigint | number) =>
    new Date(Number(ns) / 1_000_000).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  if (isError) {
    return (
      <AdminPLayout title="Customers" subtitle="Manage customer accounts">
        <div
          className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center"
          data-ocid="adminp.customers.error_state"
        >
          <AlertCircle className="w-8 h-8 text-red-400 mx-auto mb-3" />
          <p className="text-red-700 font-medium">Failed to load customers</p>
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
      title="Customers"
      subtitle={`${customers.length} registered customers`}
    >
      <div className="relative max-w-sm mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          placeholder="Search by name, email, phone…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
          data-ocid="adminp.customers.search_input"
        />
      </div>

      {isLoading ? (
        <div className="space-y-2" data-ocid="adminp.customers.loading_state">
          {["a", "b", "c", "d"].map((k) => (
            <Skeleton key={k} className="h-14 w-full rounded-xl" />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table
              className="w-full text-sm"
              data-ocid="adminp.customers.table"
            >
              <thead>
                <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide border-b border-gray-100">
                  <th className="text-left px-5 py-3 font-medium">Customer</th>
                  <th className="text-left px-4 py-3 font-medium hidden md:table-cell">
                    Contact
                  </th>
                  <th className="text-left px-4 py-3 font-medium hidden lg:table-cell">
                    Location
                  </th>
                  <th className="text-right px-4 py-3 font-medium hidden sm:table-cell">
                    Total Spend
                  </th>
                  <th className="text-center px-4 py-3 font-medium hidden lg:table-cell">
                    Orders
                  </th>
                  <th className="text-left px-4 py-3 font-medium">Status</th>
                  <th className="text-right px-4 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c, i) => (
                  <tr
                    key={c.id.toText()}
                    data-ocid={`adminp.customers.item.${i + 1}`}
                    className="border-t border-gray-50 hover:bg-gray-50/60 transition-colors"
                  >
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                          <User className="w-4 h-4 text-green-700" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-gray-900 text-sm truncate">
                            {c.name || "—"}
                          </p>
                          <p className="text-xs text-gray-400">
                            {formatDate(c.createdAt)}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <p className="text-xs text-gray-700">{c.email || "—"}</p>
                      <p className="text-xs text-gray-400">{c.phone || "—"}</p>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      {c.city || c.state ? (
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <MapPin className="w-3 h-3 flex-shrink-0" />
                          <span>
                            {[c.city, c.state].filter(Boolean).join(", ")}
                          </span>
                        </div>
                      ) : (
                        <span className="text-xs text-gray-300">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right hidden sm:table-cell font-semibold text-[#004a38] text-sm">
                      ₹{Number(c.totalSpend).toLocaleString("en-IN")}
                    </td>
                    <td className="px-4 py-3 text-center hidden lg:table-cell text-gray-700 text-sm">
                      {Number(c.totalOrders)}
                    </td>
                    <td className="px-4 py-3">
                      <APTag
                        label={c.status}
                        color={statusColor[c.status] ?? "gray"}
                      />
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 text-xs"
                        onClick={() => setSelected(c)}
                        data-ocid={`adminp.customers.item.${i + 1}.view_button`}
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="py-12 text-center"
                      data-ocid="adminp.customers.empty_state"
                    >
                      <Users className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                      <p className="text-gray-400 text-sm">
                        {search
                          ? "No customers match your search"
                          : "No customers yet — they'll appear when users register"}
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Customer Detail */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent
          className="max-w-md"
          data-ocid="adminp.customers.modal.dialog"
        >
          <DialogHeader>
            <DialogTitle>Customer Details</DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-3 text-sm pt-2">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-gray-500 mb-1">Full Name</p>
                  <p className="font-medium text-gray-900">
                    {selected.name || "—"}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-gray-500 mb-1">Status</p>
                  <APTag
                    label={selected.status}
                    color={statusColor[selected.status] ?? "gray"}
                  />
                </div>
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-gray-500 mb-1">Email</p>
                  <p className="text-gray-700 text-xs break-all">
                    {selected.email || "—"}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-gray-500 mb-1">Phone</p>
                  <p className="text-gray-700 text-xs">
                    {selected.phone || "—"}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-gray-500 mb-1">Total Orders</p>
                  <p className="font-bold text-gray-900">
                    {Number(selected.totalOrders)}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-gray-500 mb-1">Total Spend</p>
                  <p className="font-bold text-[#004a38]">
                    ₹{Number(selected.totalSpend).toLocaleString("en-IN")}
                  </p>
                </div>
                {(selected.city || selected.state) && (
                  <div className="bg-gray-50 rounded-xl p-3 col-span-2">
                    <p className="text-xs text-gray-500 mb-1">Location</p>
                    <p className="text-gray-700 text-xs">
                      {[
                        selected.city,
                        selected.state,
                        selected.pincode,
                        selected.country,
                      ]
                        .filter(Boolean)
                        .join(", ")}
                    </p>
                  </div>
                )}
                {selected.addresses && selected.addresses.length > 0 && (
                  <div className="bg-gray-50 rounded-xl p-3 col-span-2">
                    <p className="text-xs text-gray-500 mb-1">
                      Saved Addresses ({selected.addresses.length})
                    </p>
                    {selected.addresses.slice(0, 2).map((addr) => (
                      <p
                        key={addr.id || addr.street}
                        className="text-gray-700 text-xs mt-1"
                      >
                        {addr.fullName} — {addr.street}, {addr.city},{" "}
                        {addr.state} {addr.pincode}
                        {addr.isDefault && (
                          <span className="ml-1 text-[#004a38] font-semibold">
                            (Default)
                          </span>
                        )}
                      </p>
                    ))}
                  </div>
                )}
              </div>
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-xs text-gray-500 mb-1">Principal ID</p>
                <p className="text-gray-700 text-xs font-mono break-all">
                  {selected.id.toText()}
                </p>
              </div>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setSelected(null)}
                data-ocid="adminp.customers.modal.close_button"
              >
                Close
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminPLayout>
  );
}
