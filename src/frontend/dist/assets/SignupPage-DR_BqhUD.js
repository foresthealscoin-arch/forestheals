import { t as useAuth, h as useNavigate, u as useActor, r as reactExports, e as ue, j as jsxRuntimeExports, m as motion, U as User, I as Input, b as Shield, a as Button, L as Link, f as createActor } from "./index-CfU2kVIJ.js";
import { L as Label } from "./label-BjUfKOjb.js";
import { P as Phone } from "./phone-DQnAzrc4.js";
import { S as Sparkles } from "./sparkles-PE4u-Ejq.js";
import { L as Lock } from "./lock-1IUDgA9h.js";
function SignupPage() {
  const { login, loginStatus, isAuthenticated, isInitializing, identity } = useAuth();
  const navigate = useNavigate();
  const { actor, isFetching } = useActor(createActor);
  const [name, setName] = reactExports.useState("");
  const [email, setEmail] = reactExports.useState("");
  const [phone, setPhone] = reactExports.useState("");
  const [profileSaved, setProfileSaved] = reactExports.useState(false);
  const isLoading = loginStatus === "logging-in" || isInitializing;
  reactExports.useEffect(() => {
    var _a;
    if (isAuthenticated && actor && !isFetching && !profileSaved) {
      const principalText = ((_a = identity == null ? void 0 : identity.getPrincipal()) == null ? void 0 : _a.toText()) ?? "";
      if (name.trim() || email.trim()) {
        setProfileSaved(true);
        actor.registerUser({
          name: name.trim() || principalText.slice(0, 8),
          email: email.trim(),
          phone: phone.trim()
        }).then(() => {
          ue.success("Account created! Welcome to Forestheals.");
        }).catch(() => {
        }).finally(() => {
          void navigate({ to: "/dashboard" });
        });
      } else {
        void navigate({ to: "/dashboard" });
      }
    }
  }, [
    isAuthenticated,
    actor,
    isFetching,
    name,
    email,
    phone,
    profileSaved,
    identity,
    navigate
  ]);
  const benefits = [
    { icon: Shield, text: "Secure Internet Identity authentication" },
    { icon: Sparkles, text: "Personalized product recommendations" },
    { icon: Lock, text: "Private & decentralized — no passwords" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden",
      style: {
        background: "linear-gradient(160deg, oklch(0.22 0.07 162) 0%, oklch(0.32 0.09 162) 50%, oklch(0.88 0.08 95) 100%)"
      },
      "data-ocid": "signup.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 overflow-hidden pointer-events-none", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute -top-24 -right-24 w-80 h-80 rounded-full opacity-20",
              style: { background: "oklch(0.9 0.1 95)" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute -bottom-24 -left-24 w-72 h-72 rounded-full opacity-15",
              style: { background: "oklch(0.28 0.09 162)" }
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
                    children: "Join Forestheals"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.p,
                  {
                    initial: { opacity: 0 },
                    animate: { opacity: 1 },
                    transition: { delay: 0.25 },
                    className: "text-muted-foreground text-sm mb-7 text-balance",
                    children: "Create your wellness account and begin your journey from forest to home."
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    initial: { opacity: 0, y: 8 },
                    animate: { opacity: 1, y: 0 },
                    transition: { delay: 0.3 },
                    className: "text-left space-y-4 mb-6",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "signup-name", className: "text-sm font-medium", children: [
                          "Full Name",
                          " ",
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-normal", children: "(recommended)" })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Input,
                            {
                              id: "signup-name",
                              type: "text",
                              placeholder: "e.g. Priya Sharma",
                              value: name,
                              onChange: (e) => setName(e.target.value),
                              className: "h-11 rounded-xl bg-background/50 pl-10",
                              "data-ocid": "signup.name.input"
                            }
                          )
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "signup-email", className: "text-sm font-medium", children: [
                          "Email Address",
                          " ",
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-normal", children: "(for order updates)" })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Input,
                          {
                            id: "signup-email",
                            type: "email",
                            placeholder: "you@example.com",
                            value: email,
                            onChange: (e) => setEmail(e.target.value),
                            className: "h-11 rounded-xl bg-background/50",
                            "data-ocid": "signup.email.input"
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "signup-phone", className: "text-sm font-medium", children: [
                          "Phone Number",
                          " ",
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-normal", children: "(optional)" })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Input,
                            {
                              id: "signup-phone",
                              type: "tel",
                              placeholder: "+91 98765 43210",
                              value: phone,
                              onChange: (e) => setPhone(e.target.value),
                              className: "h-11 rounded-xl bg-background/50 pl-10",
                              "data-ocid": "signup.phone.input"
                            }
                          )
                        ] })
                      ] })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    initial: { opacity: 0 },
                    animate: { opacity: 1 },
                    transition: { delay: 0.35 },
                    className: "bg-muted/50 rounded-2xl p-4 mb-6 text-left space-y-2",
                    children: benefits.map(({ icon: Icon, text }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 text-xs", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-3.5 h-3.5 text-primary shrink-0" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: text })
                    ] }, text))
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    initial: { opacity: 0, y: 8 },
                    animate: { opacity: 1, y: 0 },
                    transition: { delay: 0.4 },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        size: "lg",
                        className: "w-full gap-3 font-semibold text-base h-14 rounded-2xl shadow-green transition-smooth",
                        onClick: login,
                        disabled: isLoading,
                        type: "button",
                        "data-ocid": "signup.submit_button",
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
                          "Creating Account…"
                        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-5 h-5" }),
                          "Create Account with Internet Identity"
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
                    transition: { delay: 0.45 },
                    className: "text-xs text-muted-foreground mt-4 text-balance",
                    children: [
                      "By creating an account, you agree to our",
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Link,
                        {
                          to: "/legal/terms",
                          className: "text-primary hover:underline underline-offset-2",
                          children: "Terms"
                        }
                      ),
                      " ",
                      "and",
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Link,
                        {
                          to: "/legal/privacy",
                          className: "text-primary hover:underline underline-offset-2",
                          children: "Privacy Policy"
                        }
                      ),
                      "."
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 my-5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-px bg-border" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "or" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-px bg-border" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
                  "Already have an account?",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Link,
                    {
                      to: "/auth/login",
                      className: "text-primary font-semibold hover:underline underline-offset-2",
                      "data-ocid": "signup.login_link",
                      children: "Sign In"
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
  SignupPage as default
};
