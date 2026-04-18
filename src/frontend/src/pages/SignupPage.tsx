import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "@tanstack/react-router";
import { Lock, Shield, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";

export default function SignupPage() {
  const { login, loginStatus, isAuthenticated, isInitializing } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: "/dashboard" });
    }
  }, [isAuthenticated, navigate]);

  const isLoading = loginStatus === "logging-in" || isInitializing;

  const benefits = [
    { icon: Shield, text: "Secure Internet Identity authentication" },
    { icon: Sparkles, text: "Personalized product recommendations" },
    { icon: Lock, text: "Private & decentralized — no passwords" },
  ];

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, oklch(0.22 0.07 162) 0%, oklch(0.32 0.09 162) 50%, oklch(0.88 0.08 95) 100%)",
      }}
      data-ocid="signup.page"
    >
      {/* Decorative blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-24 -right-24 w-80 h-80 rounded-full opacity-20"
          style={{ background: "oklch(0.9 0.1 95)" }}
        />
        <div
          className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full opacity-15"
          style={{ background: "oklch(0.28 0.09 162)" }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-md"
      >
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
            Join Forestheals
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="text-muted-foreground text-sm mb-7 text-balance"
          >
            Create your wellness account and begin your journey from forest to
            home.
          </motion.p>

          {/* Optional profile fields */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-left space-y-4 mb-6"
          >
            <div className="space-y-1.5">
              <Label htmlFor="signup-name" className="text-sm font-medium">
                Display Name{" "}
                <span className="text-muted-foreground font-normal">
                  (optional)
                </span>
              </Label>
              <Input
                id="signup-name"
                type="text"
                placeholder="e.g. Priya Sharma"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-11 rounded-xl bg-background/50"
                data-ocid="signup.name.input"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="signup-email" className="text-sm font-medium">
                Email Address{" "}
                <span className="text-muted-foreground font-normal">
                  (optional, for notifications)
                </span>
              </Label>
              <Input
                id="signup-email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 rounded-xl bg-background/50"
                data-ocid="signup.email.input"
              />
            </div>
          </motion.div>

          {/* Benefits list */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="bg-muted/50 rounded-2xl p-4 mb-6 text-left space-y-2"
          >
            {benefits.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2.5 text-xs">
                <Icon className="w-3.5 h-3.5 text-primary shrink-0" />
                <span className="text-muted-foreground">{text}</span>
              </div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Button
              size="lg"
              className="w-full gap-3 font-semibold text-base h-14 rounded-2xl shadow-green transition-smooth"
              onClick={login}
              disabled={isLoading}
              type="button"
              data-ocid="signup.submit_button"
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
                  Creating Account…
                </>
              ) : (
                <>
                  <Shield className="w-5 h-5" />
                  Create Account with Internet Identity
                </>
              )}
            </Button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="text-xs text-muted-foreground mt-4 text-balance"
          >
            By creating an account, you agree to our{" "}
            <Link
              to="/legal/terms"
              className="text-primary hover:underline underline-offset-2"
            >
              Terms
            </Link>{" "}
            and{" "}
            <Link
              to="/legal/privacy"
              className="text-primary hover:underline underline-offset-2"
            >
              Privacy Policy
            </Link>
            .
          </motion.p>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground">or</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              to="/auth/login"
              className="text-primary font-semibold hover:underline underline-offset-2"
              data-ocid="signup.login_link"
            >
              Sign In
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
