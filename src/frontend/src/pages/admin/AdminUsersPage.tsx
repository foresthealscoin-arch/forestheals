import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Info, ShieldCheck, ShieldOff, User, Users } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useAuthStore } from "../../stores/useAuthStore";
import { AdminSidebar } from "./AdminDashboardPage";

interface UserEntry {
  principal: string;
  role: "admin" | "customer";
  joinedAt: number;
}

function truncatePrincipal(p: string): string {
  if (p.length <= 20) return p;
  return `${p.slice(0, 10)}…${p.slice(-6)}`;
}

export default function AdminUsersPage() {
  const { principal } = useAuthStore();

  const [users, setUsers] = useState<UserEntry[]>(() => {
    const entries: UserEntry[] = [
      {
        principal: "2vxsx-fae",
        role: "customer",
        joinedAt: Date.now() - 86400000 * 90,
      },
      {
        principal: "aaaaa-aa",
        role: "customer",
        joinedAt: Date.now() - 86400000 * 45,
      },
      {
        principal: "rkp4c-7iaaa-aaaaa-aaaca-cai",
        role: "customer",
        joinedAt: Date.now() - 86400000 * 14,
      },
    ];
    if (principal) {
      entries.unshift({
        principal,
        role: "admin",
        joinedAt: Date.now() - 86400000 * 180,
      });
    }
    return entries;
  });

  function handleRoleChange(p: string, role: "admin" | "customer") {
    setUsers((prev) =>
      prev.map((u) => (u.principal === p ? { ...u, role } : u)),
    );
    toast.success(`Role updated to ${role}`);
  }

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar active="/admin/users" />

      <main className="flex-1 overflow-auto" data-ocid="admin.users.page">
        {/* Header */}
        <div className="bg-card border-b border-border px-8 py-5">
          <h1 className="text-xl font-bold text-foreground">Users</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {users.length} registered identities
          </p>
        </div>

        <div className="p-8 space-y-5">
          {/* Info Banner */}
          <div
            className="flex items-start gap-3 bg-secondary/30 border border-secondary rounded-2xl px-5 py-4"
            data-ocid="admin.users.info_banner"
          >
            <Info className="w-4 h-4 text-accent-foreground mt-0.5 flex-shrink-0" />
            <p className="text-sm text-foreground/80">
              On the Internet Computer, users authenticate via Internet Identity
              — a privacy-preserving system that does not expose names or
              emails. Only principal IDs are available. The list below shows
              principals that have interacted with Forestheals.
            </p>
          </div>

          {/* Table */}
          <div className="bg-card rounded-2xl border border-border shadow-soft overflow-hidden">
            <table className="w-full text-sm" data-ocid="admin.users.table">
              <thead>
                <tr className="bg-muted/40 text-muted-foreground text-xs uppercase tracking-wide border-b border-border">
                  <th className="text-left px-6 py-3 font-medium">
                    Principal ID
                  </th>
                  <th className="text-left px-4 py-3 font-medium hidden md:table-cell">
                    Joined
                  </th>
                  <th className="text-left px-4 py-3 font-medium">Role</th>
                  <th className="text-right px-4 py-3 font-medium">
                    Change Role
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, i) => (
                  <motion.tr
                    key={user.principal}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    data-ocid={`admin.users.item.${i + 1}`}
                    className="border-t border-border hover:bg-muted/20 transition-colors"
                  >
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          {user.role === "admin" ? (
                            <ShieldCheck className="w-4 h-4 text-primary" />
                          ) : (
                            <User className="w-4 h-4 text-muted-foreground" />
                          )}
                        </div>
                        <span className="font-mono text-xs text-muted-foreground">
                          {truncatePrincipal(user.principal)}
                        </span>
                        {user.principal === principal && (
                          <Badge variant="secondary" className="text-xs">
                            You
                          </Badge>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground text-xs hidden md:table-cell">
                      {new Intl.DateTimeFormat("en-IN", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      }).format(new Date(user.joinedAt))}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                          user.role === "admin"
                            ? "bg-primary/10 text-primary"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {user.role === "admin" ? (
                          <ShieldCheck className="w-3 h-3" />
                        ) : (
                          <ShieldOff className="w-3 h-3" />
                        )}
                        {user.role === "admin" ? "Admin" : "Customer"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Select
                        value={user.role}
                        onValueChange={(v) =>
                          handleRoleChange(
                            user.principal,
                            v as "admin" | "customer",
                          )
                        }
                        disabled={user.principal === principal}
                      >
                        <SelectTrigger
                          className="w-32 h-7 text-xs ml-auto"
                          data-ocid={`admin.users.item.${i + 1}.role_select`}
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="customer">Customer</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="text-xs text-muted-foreground text-center pt-2">
            Role changes are saved locally. Connect backend{" "}
            <code className="bg-muted px-1 py-0.5 rounded">setUserRole()</code>{" "}
            to persist across sessions.
          </div>
        </div>
      </main>
    </div>
  );
}
