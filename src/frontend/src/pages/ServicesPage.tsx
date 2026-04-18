import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Clock, Mail } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const SERVICES = [
  {
    emoji: "🌿",
    title: "Wellness Consultation",
    desc: "Personalised 1-on-1 session with a certified Ayurvedic practitioner to assess your prakriti and create a custom wellness plan.",
    duration: "60 min",
  },
  {
    emoji: "💆",
    title: "Stress Management Program",
    desc: "6-week guided programme combining adaptogens, breathwork, and dietary recommendations to restore balance.",
    duration: "6 weeks",
  },
  {
    emoji: "🧘",
    title: "Personalized Nutrition Plan",
    desc: "Dosha-specific meal plan crafted by our nutritionist with seasonal Ayurvedic superfoods tailored to your constitution.",
    duration: "Ongoing",
  },
  {
    emoji: "🌙",
    title: "Sleep Optimization",
    desc: "Science-backed Ayurvedic sleep protocol — herbs, evening rituals, and circadian rhythm coaching for deep, restorative rest.",
    duration: "4 weeks",
  },
];

function useCountdown(targetDate: Date) {
  const calc = () => {
    const diff = targetDate.getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, mins: 0, secs: 0 };
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      mins: Math.floor((diff % 3600000) / 60000),
      secs: Math.floor((diff % 60000) / 1000),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calc);

  useEffect(() => {
    const id = setInterval(() => {
      const diff = targetDate.getTime() - Date.now();
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, mins: 0, secs: 0 });
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        mins: Math.floor((diff % 3600000) / 60000),
        secs: Math.floor((diff % 60000) / 1000),
      });
    }, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return timeLeft;
}

function FloatingLeaf({
  delay,
  x,
  size,
}: {
  delay: number;
  x: number;
  size: number;
}) {
  return (
    <motion.div
      className="absolute pointer-events-none select-none"
      style={{ left: `${x}%`, top: "-5%" }}
      animate={{
        y: ["0px", "110vh"],
        rotate: [0, 360],
        opacity: [0, 0.5, 0.5, 0],
      }}
      transition={{
        duration: 9 + size * 0.5,
        delay,
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear",
      }}
    >
      <span style={{ fontSize: size + 14 }} className="text-primary/20">
        🍃
      </span>
    </motion.div>
  );
}

const LEAVES = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  delay: i * 1.4,
  x: (i * 10 + 3) % 95,
  size: (i % 4) * 4,
}));

export default function ServicesPage() {
  const [email, setEmail] = useState("");
  const [notified, setNotified] = useState(false);
  const launchDate = new Date("2025-12-31T00:00:00");
  const { days, hours, mins, secs } = useCountdown(launchDate);

  const handleNotify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) {
      toast.error("Please enter a valid email");
      return;
    }
    setNotified(true);
    toast.success("You're on the list! We'll notify you at launch.");
  };

  return (
    <div
      className="min-h-screen bg-background relative overflow-hidden"
      data-ocid="services.page"
    >
      {/* Animated leaves */}
      <div
        className="fixed inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        {LEAVES.map((leaf) => (
          <FloatingLeaf
            key={leaf.id}
            delay={leaf.delay}
            x={leaf.x}
            size={leaf.size}
          />
        ))}
      </div>

      {/* Hero */}
      <div className="gradient-hero min-h-[68vh] flex flex-col items-center justify-center px-4 py-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          className="text-center max-w-3xl mx-auto"
          data-ocid="services.hero.section"
        >
          <Badge className="bg-secondary/20 text-secondary border-secondary/30 mb-5 text-sm px-4 py-1.5">
            <Clock className="w-3.5 h-3.5 mr-1.5" />
            Coming Soon
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground font-display mb-5 leading-tight">
            Personalized
            <br />
            <span className="text-secondary">Wellness</span>
            <br />
            Consultations
          </h1>
          <p className="text-xl text-primary-foreground/70 leading-relaxed max-w-xl mx-auto">
            1-on-1 Ayurvedic consultations with certified practitioners —
            tailored to your unique prakriti and health goals.
          </p>
        </motion.div>
      </div>

      {/* Countdown */}
      <section
        className="bg-card border-y border-border py-10 px-4 relative z-10"
        data-ocid="services.countdown.section"
      >
        <div className="max-w-2xl mx-auto">
          <p className="text-center text-muted-foreground text-sm mb-6 uppercase tracking-widest">
            Launching in
          </p>
          <div className="flex items-center justify-center gap-4 md:gap-8">
            {[
              { val: days, label: "Days" },
              { val: hours, label: "Hours" },
              { val: mins, label: "Minutes" },
              { val: secs, label: "Seconds" },
            ].map(({ val, label }) => (
              <div key={label} className="text-center">
                <div className="glass-card rounded-2xl w-16 h-16 md:w-20 md:h-20 flex items-center justify-center shadow-soft mx-auto mb-2">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={val}
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.2 }}
                      className="text-2xl md:text-3xl font-bold text-primary font-display tabular-nums"
                    >
                      {String(val).padStart(2, "0")}
                    </motion.span>
                  </AnimatePresence>
                </div>
                <span className="text-xs text-muted-foreground uppercase tracking-wider">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section
        className="bg-background py-16 px-4 relative z-10"
        data-ocid="services.preview.section"
      >
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground text-center mb-10">
            What's Coming
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
            {SERVICES.map(({ emoji, title, desc, duration }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="glass-card rounded-2xl p-5 shadow-soft relative overflow-hidden"
                data-ocid={`services.card.${i + 1}`}
              >
                <div className="absolute top-0 right-0 w-20 h-20 rounded-bl-3xl bg-primary/5" />
                <span className="text-3xl block mb-3">{emoji}</span>
                <h3 className="font-bold text-foreground mb-2 text-sm">
                  {title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                  {desc}
                </p>
                <Badge className="bg-primary/10 text-primary border-0 text-xs">
                  {duration}
                </Badge>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Email Capture */}
      <section
        className="bg-muted/30 py-14 px-4 relative z-10"
        data-ocid="services.notify.section"
      >
        <div className="max-w-md mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
          >
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Mail className="w-7 h-7 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Get Early Access
            </h2>
            <p className="text-muted-foreground mb-6 text-sm">
              Be the first to know when we launch. Early subscribers get a free
              15-minute consultation.
            </p>

            {notified ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="glass-card rounded-2xl p-6 shadow-soft"
                data-ocid="services.notify.success_state"
              >
                <p className="text-primary font-semibold text-lg mb-1">
                  🎉 You're on the list!
                </p>
                <p className="text-muted-foreground text-sm">
                  We'll notify you at <strong>{email}</strong> when we launch.
                </p>
              </motion.div>
            ) : (
              <form
                onSubmit={handleNotify}
                className="flex gap-2"
                data-ocid="services.notify.form"
              >
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1"
                  data-ocid="services.notify.email_input"
                  required
                />
                <Button type="submit" data-ocid="services.notify.submit_button">
                  Notify Me
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
