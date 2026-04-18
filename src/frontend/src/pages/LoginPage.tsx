import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "@tanstack/react-router";
import { Lock, Shield, Sparkles, Zap } from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";

export default function LoginPage() {
  const { login, loginStatus, isAuthenticated, isInitializing } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: "/dashboard" });
    }
  }, [isAuthenticated, navigate]);

  const isLoading = loginStatus === "logging-in" || isInitializing;

  const features = [
    { icon: Shield, label: "Secure & Private", desc: "No passwords stored" },
    { icon: Zap, label: "Instant Login", desc: "One-click authentication" },
    { icon: Lock, label: "Decentralized", desc: "You own your identity" },
    { icon: Sparkles, label: "No Tracking", desc: "Privacy by design" },
  ];

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, oklch(0.22 0.07 162) 0%, oklch(0.32 0.09 162) 50%, oklch(0.88 0.08 95) 100%)",
      }}
      data-ocid="login.page"
    >
      {/* Decorative blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-20"
          style={{ background: "oklch(0.9 0.1 95)" }}
        />
        <div
          className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full opacity-15"
          style={{ background: "oklch(0.28 0.09 162)" }}
        />
        <div
          className="absolute top-1/2 left-1/4 w-48 h-48 rounded-full opacity-10"
          style={{ background: "oklch(0.72 0.14 75)" }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Card */}
        <div className="glass-card rounded-3xl p-8 sm:p-10 shadow-elevated text-center">
          {/* Logo */}
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="flex flex-col items-center mb-7"
          >
            <img
              src="/assets/logo.png"
              alt="Forestheals"
              className="h-16 w-auto object-contain mb-2"
            />
            <span
              className="text-xs font-medium tracking-widest uppercase mt-0.5"
              style={{ color: "oklch(0.55 0.08 150)" }}
            >
              From forest to homes
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-2"
          >
            Welcome Back
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="text-muted-foreground text-sm mb-8 text-balance"
          >
            Sign in to your Forestheals account to access orders, wishlist, and
            your wellness journey.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Button
              size="lg"
              className="w-full gap-3 font-semibold text-base h-14 rounded-2xl shadow-green transition-smooth"
              onClick={login}
              disabled={isLoading}
              type="button"
              data-ocid="login.submit_button"
            >
              {isLoading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                    className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                  />
                  Connecting…
                </>
              ) : (
                <>
                  <Shield className="w-5 h-5" />
                  Login with Internet Identity
                </>
              )}
            </Button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="text-xs text-muted-foreground mt-4 flex items-center justify-center gap-1.5"
          >
            <Lock className="w-3 h-3" />
            Secure, decentralized identity — no passwords needed
          </motion.p>

          {/* Feature badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-2 gap-3 mt-7"
          >
            {features.map(({ icon: Icon, label, desc }) => (
              <div
                key={label}
                className="bg-muted/60 rounded-xl p-3 text-left flex items-start gap-2.5"
              >
                <Icon className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-foreground">
                    {label}
                  </p>
                  <p className="text-xs text-muted-foreground">{desc}</p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground">or</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <p className="text-sm text-muted-foreground">
            New to Forestheals?{" "}
            <Link
              to="/auth/signup"
              className="text-primary font-semibold hover:underline underline-offset-2"
              data-ocid="login.signup_link"
            >
              Create Account
            </Link>
          </p>
        </div>

        <p className="text-center text-xs mt-6 text-primary-foreground/50">
          © {new Date().getFullYear()} Forestheals. All rights reserved.
        </p>
      </motion.div>
    </div>
  );
}
