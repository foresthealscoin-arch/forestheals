import { t as useAuth, h as useNavigate, r as reactExports, j as jsxRuntimeExports, m as motion, a as Button, b as Shield, L as Link } from "./index-CfU2kVIJ.js";
import { L as Lock } from "./lock-1IUDgA9h.js";
import { Z as Zap } from "./zap-CIYgq85z.js";
import { S as Sparkles } from "./sparkles-PE4u-Ejq.js";
function LoginPage() {
  const { login, loginStatus, isAuthenticated, isInitializing } = useAuth();
  const navigate = useNavigate();
  reactExports.useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: "/dashboard" });
    }
  }, [isAuthenticated, navigate]);
  const isLoading = loginStatus === "logging-in" || isInitializing;
  const features = [
    { icon: Shield, label: "Secure & Private", desc: "No passwords stored" },
    { icon: Zap, label: "Instant Login", desc: "One-click authentication" },
    { icon: Lock, label: "Decentralized", desc: "You own your identity" },
    { icon: Sparkles, label: "No Tracking", desc: "Privacy by design" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden",
      style: {
        background: "linear-gradient(160deg, oklch(0.22 0.07 162) 0%, oklch(0.32 0.09 162) 50%, oklch(0.88 0.08 95) 100%)"
      },
      "data-ocid": "login.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 overflow-hidden pointer-events-none", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-20",
              style: { background: "oklch(0.9 0.1 95)" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute -bottom-32 -right-32 w-80 h-80 rounded-full opacity-15",
              style: { background: "oklch(0.28 0.09 162)" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute top-1/2 left-1/4 w-48 h-48 rounded-full opacity-10",
              style: { background: "oklch(0.72 0.14 75)" }
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 32, scale: 0.96 },
            animate: { opacity: 1, y: 0, scale: 1 },
            transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
            className: "relative z-10 w-full max-w-md",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card rounded-3xl p-8 sm:p-10 shadow-elevated text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    initial: { scale: 0.6, opacity: 0 },
                    animate: { scale: 1, opacity: 1 },
                    transition: { delay: 0.15, duration: 0.4 },
                    className: "flex flex-col items-center mb-7",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "img",
                        {
                          src: "/assets/logo.png",
                          alt: "Forestheals",
                          className: "h-16 w-auto object-contain mb-2"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "text-xs font-medium tracking-widest uppercase mt-0.5",
                          style: { color: "oklch(0.55 0.08 150)" },
                          children: "From forest to homes"
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.h1,
                  {
                    initial: { opacity: 0, y: 8 },
                    animate: { opacity: 1, y: 0 },
                    transition: { delay: 0.2 },
                    className: "font-display text-2xl sm:text-3xl font-bold text-foreground mb-2",
                    children: "Welcome Back"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.p,
                  {
                    initial: { opacity: 0 },
                    animate: { opacity: 1 },
                    transition: { delay: 0.25 },
                    className: "text-muted-foreground text-sm mb-8 text-balance",
                    children: "Sign in to your Forestheals account to access orders, wishlist, and your wellness journey."
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    initial: { opacity: 0, y: 8 },
                    animate: { opacity: 1, y: 0 },
                    transition: { delay: 0.3 },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        size: "lg",
                        className: "w-full gap-3 font-semibold text-base h-14 rounded-2xl shadow-green transition-smooth",
                        onClick: login,
                        disabled: isLoading,
                        type: "button",
                        "data-ocid": "login.submit_button",
                        children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            motion.div,
                            {
                              animate: { rotate: 360 },
                              transition: {
                                duration: 1,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "linear"
                              },
                              className: "w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                            }
                          ),
                          "Connecting…"
                        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-5 h-5" }),
                          "Login with Internet Identity"
                        ] })
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.p,
                  {
                    initial: { opacity: 0 },
                    animate: { opacity: 1 },
                    transition: { delay: 0.35 },
                    className: "text-xs text-muted-foreground mt-4 flex items-center justify-center gap-1.5",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-3 h-3" }),
                      "Secure, decentralized identity — no passwords needed"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    initial: { opacity: 0 },
                    animate: { opacity: 1 },
                    transition: { delay: 0.4 },
                    className: "grid grid-cols-2 gap-3 mt-7",
                    children: features.map(({ icon: Icon, label, desc }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "bg-muted/60 rounded-xl p-3 text-left flex items-start gap-2.5",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-3.5 h-3.5 text-primary mt-0.5 shrink-0" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground", children: label }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: desc })
                          ] })
                        ]
                      },
                      label
                    ))
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 my-6", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-px bg-border" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "or" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-px bg-border" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
                  "New to Forestheals?",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Link,
                    {
                      to: "/auth/signup",
                      className: "text-primary font-semibold hover:underline underline-offset-2",
                      "data-ocid": "login.signup_link",
                      children: "Create Account"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-xs mt-6 text-primary-foreground/50", children: [
                "© ",
                (/* @__PURE__ */ new Date()).getFullYear(),
                " Forestheals. All rights reserved."
              ] })
            ]
          }
        )
      ]
    }
  );
}
export {
  LoginPage as default
};
