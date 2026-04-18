import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff, Leaf, Lock, User } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useAdminPStore } from "./adminpStore";

export default function AdminPLoginPage() {
  const login = useAdminPStore((s) => s.login);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    if (username === "forestheals" && password === "domex@1000") {
      login();
      toast.success("Welcome back, Forestheals Admin!");
      navigate({ to: "/admin-p/dashboard" });
    } else {
      setError("Invalid username or password. Please try again.");
    }
    setLoading(false);
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#004a38] via-[#006b52] to-[#003a2c] px-4"
      data-ocid="adminp.login.page"
    >
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-sm mb-4">
            <Leaf className="w-8 h-8 text-[#f1e0a9]" />
          </div>
          <img
            src="/assets/logo.png"
            alt="Forestheals"
            className="h-14 w-auto object-contain mx-auto mb-3"
            style={{ filter: "brightness(0) invert(1)" }}
          />
          <p className="text-white/60 text-sm">Admin Panel — Secure Access</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h1 className="text-xl font-bold text-gray-900 mb-1">Sign In</h1>
          <p className="text-sm text-gray-500 mb-6">
            Enter your admin credentials to continue
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="ap-username" className="text-gray-700">
                Username
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="ap-username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="forestheals"
                  className="pl-9"
                  autoComplete="username"
                  data-ocid="adminp.login.username_input"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="ap-password" className="text-gray-700">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="ap-password"
                  type={showPwd ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••"
                  className="pl-9 pr-10"
                  autoComplete="current-password"
                  data-ocid="adminp.login.password_input"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  tabIndex={-1}
                >
                  {showPwd ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <p
                className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2"
                data-ocid="adminp.login.error_state"
              >
                {error}
              </p>
            )}

            <Button
              type="submit"
              className="w-full bg-[#004a38] hover:bg-[#003a2c] text-white mt-2"
              disabled={loading}
              data-ocid="adminp.login.submit_button"
            >
              {loading ? "Signing in…" : "Sign In to Admin"}
            </Button>
          </form>

          <p className="text-xs text-gray-400 text-center mt-5">
            This panel is restricted to authorized Forestheals team only.
          </p>
        </div>
      </div>
    </div>
  );
}
