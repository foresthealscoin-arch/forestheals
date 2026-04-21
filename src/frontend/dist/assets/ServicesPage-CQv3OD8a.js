import { r as reactExports, j as jsxRuntimeExports, m as motion, B as Badge, A as AnimatePresence, I as Input, a as Button, d as ue } from "./index-Oxc-_oxi.js";
import { C as Clock } from "./clock-CgG0A1UB.js";
import { M as Mail } from "./mail-BeWiBLQB.js";
const SERVICES = [
  {
    emoji: "🌿",
    title: "Wellness Consultation",
    desc: "Personalised 1-on-1 session with a certified Ayurvedic practitioner to assess your prakriti and create a custom wellness plan.",
    duration: "60 min"
  },
  {
    emoji: "💆",
    title: "Stress Management Program",
    desc: "6-week guided programme combining adaptogens, breathwork, and dietary recommendations to restore balance.",
    duration: "6 weeks"
  },
  {
    emoji: "🧘",
    title: "Personalized Nutrition Plan",
    desc: "Dosha-specific meal plan crafted by our nutritionist with seasonal Ayurvedic superfoods tailored to your constitution.",
    duration: "Ongoing"
  },
  {
    emoji: "🌙",
    title: "Sleep Optimization",
    desc: "Science-backed Ayurvedic sleep protocol — herbs, evening rituals, and circadian rhythm coaching for deep, restorative rest.",
    duration: "4 weeks"
  }
];
function useCountdown(targetDate) {
  const calc = () => {
    const diff = targetDate.getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, mins: 0, secs: 0 };
    return {
      days: Math.floor(diff / 864e5),
      hours: Math.floor(diff % 864e5 / 36e5),
      mins: Math.floor(diff % 36e5 / 6e4),
      secs: Math.floor(diff % 6e4 / 1e3)
    };
  };
  const [timeLeft, setTimeLeft] = reactExports.useState(calc);
  reactExports.useEffect(() => {
    const id = setInterval(() => {
      const diff = targetDate.getTime() - Date.now();
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, mins: 0, secs: 0 });
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / 864e5),
        hours: Math.floor(diff % 864e5 / 36e5),
        mins: Math.floor(diff % 36e5 / 6e4),
        secs: Math.floor(diff % 6e4 / 1e3)
      });
    }, 1e3);
    return () => clearInterval(id);
  }, [targetDate]);
  return timeLeft;
}
function FloatingLeaf({
  delay,
  x,
  size
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      className: "absolute pointer-events-none select-none",
      style: { left: `${x}%`, top: "-5%" },
      animate: {
        y: ["0px", "110vh"],
        rotate: [0, 360],
        opacity: [0, 0.5, 0.5, 0]
      },
      transition: {
        duration: 9 + size * 0.5,
        delay,
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear"
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: size + 14 }, className: "text-primary/20", children: "🍃" })
    }
  );
}
const LEAVES = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  delay: i * 1.4,
  x: (i * 10 + 3) % 95,
  size: i % 4 * 4
}));
function ServicesPage() {
  const [email, setEmail] = reactExports.useState("");
  const [notified, setNotified] = reactExports.useState(false);
  const launchDate = /* @__PURE__ */ new Date("2025-12-31T00:00:00");
  const { days, hours, mins, secs } = useCountdown(launchDate);
  const handleNotify = (e) => {
    e.preventDefault();
    if (!email.includes("@")) {
      ue.error("Please enter a valid email");
      return;
    }
    setNotified(true);
    ue.success("You're on the list! We'll notify you at launch.");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-screen bg-background relative overflow-hidden",
      "data-ocid": "services.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "fixed inset-0 pointer-events-none overflow-hidden",
            "aria-hidden": "true",
            children: LEAVES.map((leaf) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              FloatingLeaf,
              {
                delay: leaf.delay,
                x: leaf.x,
                size: leaf.size
              },
              leaf.id
            ))
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "gradient-hero min-h-[68vh] flex flex-col items-center justify-center px-4 py-20 relative z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.65 },
            className: "text-center max-w-3xl mx-auto",
            "data-ocid": "services.hero.section",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-secondary/20 text-secondary border-secondary/30 mb-5 text-sm px-4 py-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3.5 h-3.5 mr-1.5" }),
                "Coming Soon"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-5xl md:text-7xl font-bold text-primary-foreground font-display mb-5 leading-tight", children: [
                "Personalized",
                /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-secondary", children: "Wellness" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                "Consultations"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl text-primary-foreground/70 leading-relaxed max-w-xl mx-auto", children: "1-on-1 Ayurvedic consultations with certified practitioners — tailored to your unique prakriti and health goals." })
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "section",
          {
            className: "bg-card border-y border-border py-10 px-4 relative z-10",
            "data-ocid": "services.countdown.section",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-muted-foreground text-sm mb-6 uppercase tracking-widest", children: "Launching in" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center gap-4 md:gap-8", children: [
                { val: days, label: "Days" },
                { val: hours, label: "Hours" },
                { val: mins, label: "Minutes" },
                { val: secs, label: "Seconds" }
              ].map(({ val, label }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass-card rounded-2xl w-16 h-16 md:w-20 md:h-20 flex items-center justify-center shadow-soft mx-auto mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.span,
                  {
                    initial: { opacity: 0, y: -8 },
                    animate: { opacity: 1, y: 0 },
                    exit: { opacity: 0, y: 8 },
                    transition: { duration: 0.2 },
                    className: "text-2xl md:text-3xl font-bold text-primary font-display tabular-nums",
                    children: String(val).padStart(2, "0")
                  },
                  val
                ) }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground uppercase tracking-wider", children: label })
              ] }, label)) })
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "section",
          {
            className: "bg-background py-16 px-4 relative z-10",
            "data-ocid": "services.preview.section",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-foreground text-center mb-10", children: "What's Coming" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 md:grid-cols-4 gap-5", children: SERVICES.map(({ emoji, title, desc, duration }, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 20 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  transition: { delay: i * 0.1, duration: 0.4 },
                  className: "glass-card rounded-2xl p-5 shadow-soft relative overflow-hidden",
                  "data-ocid": `services.card.${i + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 w-20 h-20 rounded-bl-3xl bg-primary/5" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl block mb-3", children: emoji }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-foreground mb-2 text-sm", children: title }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed mb-3", children: desc }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-primary/10 text-primary border-0 text-xs", children: duration })
                  ]
                },
                title
              )) })
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "section",
          {
            className: "bg-muted/30 py-14 px-4 relative z-10",
            "data-ocid": "services.notify.section",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-md mx-auto text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 20 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true },
                transition: { duration: 0.45 },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-7 h-7 text-primary" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-foreground mb-2", children: "Get Early Access" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-6 text-sm", children: "Be the first to know when we launch. Early subscribers get a free 15-minute consultation." }),
                  notified ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    motion.div,
                    {
                      initial: { scale: 0.9, opacity: 0 },
                      animate: { scale: 1, opacity: 1 },
                      className: "glass-card rounded-2xl p-6 shadow-soft",
                      "data-ocid": "services.notify.success_state",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary font-semibold text-lg mb-1", children: "🎉 You're on the list!" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm", children: [
                          "We'll notify you at ",
                          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: email }),
                          " when we launch."
                        ] })
                      ]
                    }
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "form",
                    {
                      onSubmit: handleNotify,
                      className: "flex gap-2",
                      "data-ocid": "services.notify.form",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Input,
                          {
                            type: "email",
                            value: email,
                            onChange: (e) => setEmail(e.target.value),
                            placeholder: "your@email.com",
                            className: "flex-1",
                            "data-ocid": "services.notify.email_input",
                            required: true
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", "data-ocid": "services.notify.submit_button", children: "Notify Me" })
                      ]
                    }
                  )
                ]
              }
            ) })
          }
        )
      ]
    }
  );
}
export {
  ServicesPage as default
};
