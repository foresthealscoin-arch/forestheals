import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  Award,
  Globe,
  Heart,
  Leaf,
  Mail,
  MapPin,
  Phone,
  Recycle,
  ShieldCheck,
  Sprout,
} from "lucide-react";
import { motion } from "motion/react";

const VALUES = [
  {
    icon: Leaf,
    title: "Natural Healing",
    desc: "Every product is rooted in centuries-old Ayurvedic knowledge, harvested from nature without compromise.",
  },
  {
    icon: Recycle,
    title: "Sustainability",
    desc: "We source ethically, use biodegradable packaging, and actively offset our carbon footprint.",
  },
  {
    icon: Globe,
    title: "Cultural Preservation",
    desc: "By supporting traditional farmers and artisans, we keep India's healing heritage alive.",
  },
  {
    icon: Heart,
    title: "Affordable Luxury",
    desc: "Premium quality shouldn't be a privilege. We make Ayurvedic wellness accessible to every household.",
  },
];

const ECO_PRACTICES = [
  "Direct farm partnerships — no middlemen",
  "Organic & wildcraft-certified sourcing",
  "Kraft paper and compostable packaging",
  "Zero-waste manufacturing facility",
  "Solar-powered warehousing",
  "Community reforestation — 1 tree per order",
];

const TEAM = [
  {
    name: "Prateek Raj Kumawat",
    role: "Founder & CEO",
    bio: "Visionary entrepreneur who built Forestheals from the Aravalli foothills — driven by a belief that India's forests hold the world's finest remedies.",
    initials: "PRK",
    quote: '"The forest doesn\'t need us. We need the forest."',
  },
  {
    name: "Anya",
    role: "Co-Founder — Marketing & CRM",
    bio: "Brand strategist and customer relationship architect. Anya shapes every touchpoint of the Forestheals experience — from first discovery to loyal community.",
    initials: "AY",
    quote: null,
  },
  {
    name: "Arjun",
    role: "CFO — Financial Operations & AI",
    bio: "AI-powered financial intelligence driving sustainable growth. Arjun manages forecasting, treasury, and intelligent cost optimization across all business verticals.",
    initials: "AI",
    quote: null,
  },
];

// ─── Mission Flowchart ────────────────────────────────────────────────────────
const FLOW_STEPS = [
  {
    step: 1,
    icon: "🌿",
    title: "Source from Forests",
    desc: "Pure ingredients sourced directly from sustainable Indian forests and organic farm networks.",
  },
  {
    step: 2,
    icon: "⚗️",
    title: "Scientific Formulation",
    desc: "Ancient recipes modernized by certified Vaidyas, botanists, and food scientists.",
  },
  {
    step: 3,
    icon: "🛒",
    title: "Direct-to-Consumer",
    desc: "Cutting out middlemen — delivered fresh from our facility straight to your home.",
  },
  {
    step: 4,
    icon: "✈️",
    title: "Export Globally",
    desc: "Bringing Indian Ayurvedic wellness to 50+ countries via B2B and export partnerships.",
  },
  {
    step: 5,
    icon: "🤝",
    title: "Build Community",
    desc: "10M+ loyal customers through results-backed products, education, and radical transparency.",
  },
  {
    step: 6,
    icon: "🏆",
    title: "₹10,000 Cr Impact",
    desc: "India's first ₹10,000 Crore natural wellness brand — built on forests, trust, and purpose.",
    isFinal: true,
  },
];

function MissionFlowchart() {
  return (
    <div className="mt-8 sm:mt-10">
      {/* Desktop: horizontal flow */}
      <div className="hidden lg:flex items-start gap-0 overflow-x-auto pb-2">
        {FLOW_STEPS.map((s, i) => (
          <div key={s.step} className="flex items-start flex-1 min-w-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className={`flex flex-col items-center text-center rounded-2xl p-4 w-full border-2 shadow-soft transition-smooth hover:-translate-y-1 ${
                s.isFinal
                  ? "bg-primary border-primary text-primary-foreground"
                  : "bg-card border-border"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-lg mb-2 font-bold ${
                  s.isFinal
                    ? "bg-secondary/20 text-secondary"
                    : "bg-primary/10 text-primary"
                }`}
              >
                {s.icon}
              </div>
              <div
                className={`text-xs font-bold mb-0.5 px-2 py-0.5 rounded-full ${
                  s.isFinal
                    ? "bg-secondary/20 text-secondary"
                    : "bg-primary/10 text-primary"
                }`}
              >
                Step {s.step}
              </div>
              <h4
                className={`font-bold text-sm mt-2 mb-1 leading-snug ${
                  s.isFinal ? "text-secondary" : "text-foreground"
                }`}
              >
                {s.title}
              </h4>
              <p
                className={`text-xs leading-relaxed ${
                  s.isFinal
                    ? "text-primary-foreground/80"
                    : "text-muted-foreground"
                }`}
              >
                {s.desc}
              </p>
            </motion.div>

            {/* Arrow connector */}
            {i < FLOW_STEPS.length - 1 && (
              <div className="flex items-center justify-center self-center mx-1 mt-[-20px] shrink-0">
                <motion.span
                  initial={{ opacity: 0, x: -5 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.2 }}
                  className="text-primary text-xl font-bold"
                >
                  →
                </motion.span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Mobile/Tablet: vertical flow */}
      <div className="lg:hidden space-y-0">
        {FLOW_STEPS.map((s, i) => (
          <div key={s.step}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className={`flex items-start gap-4 rounded-2xl p-4 border-2 shadow-soft ${
                s.isFinal
                  ? "bg-primary border-primary text-primary-foreground"
                  : "bg-card border-border"
              }`}
            >
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0 ${
                  s.isFinal ? "bg-secondary/20" : "bg-primary/10"
                }`}
              >
                {s.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                      s.isFinal
                        ? "bg-secondary/20 text-secondary"
                        : "bg-primary/10 text-primary"
                    }`}
                  >
                    Step {s.step}
                  </span>
                  <h4
                    className={`font-bold text-sm ${
                      s.isFinal ? "text-secondary" : "text-foreground"
                    }`}
                  >
                    {s.title}
                  </h4>
                </div>
                <p
                  className={`text-xs leading-relaxed ${
                    s.isFinal
                      ? "text-primary-foreground/80"
                      : "text-muted-foreground"
                  }`}
                >
                  {s.desc}
                </p>
              </div>
            </motion.div>

            {/* Downward arrow */}
            {i < FLOW_STEPS.length - 1 && (
              <div className="flex justify-center my-1">
                <motion.span
                  initial={{ opacity: 0, y: -4 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.2 }}
                  className="text-primary text-lg font-bold"
                >
                  ↓
                </motion.span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background" data-ocid="about.page">
      {/* Hero */}
      <div
        className="relative py-20 sm:py-28 px-4 overflow-hidden"
        style={{
          background:
            "linear-gradient(160deg, oklch(0.18 0.07 162) 0%, oklch(0.28 0.09 162) 55%, oklch(0.38 0.1 148) 100%)",
        }}
        data-ocid="about.hero.section"
      >
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-secondary blur-3xl" />
          <div className="absolute bottom-0 left-10 w-72 h-72 rounded-full bg-accent blur-3xl" />
        </div>
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="bg-secondary/20 text-secondary border-secondary/30 mb-4">
              Our Story
            </Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary-foreground font-display mb-5">
              From Forest to Homes
            </h1>
            <p className="text-base sm:text-xl text-primary-foreground/75 leading-relaxed px-2">
              We believe the forest holds every remedy the modern world seeks —
              delivered with love, science, and reverence for nature.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Brand Story */}
      <section
        className="bg-muted/30 py-14 sm:py-16 px-4"
        data-ocid="about.story.section"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6 sm:mb-8 text-center">
              The Forestheals Story
            </h2>
            <div className="space-y-4 sm:space-y-5 text-muted-foreground leading-relaxed text-base sm:text-lg">
              <p>
                Forestheals was born in the ancient city of Beawar, nestled at
                the gateway to the Aravalli hills — where traditional healers
                have sourced medicinal plants for centuries. Our founder Prateek
                Raj Kumawat grew up watching the wisdom of Ayurveda being
                diluted by mass-market shortcuts. He set out to build a brand
                that would restore purity, transparency, and reverence.
              </p>
              <p>
                We work directly with over 200 organic farmers across Rajasthan,
                Kerala, Uttarakhand, and Himachal Pradesh. Every herb is tested
                for heavy metals, microbial contamination, and active compound
                concentration before it leaves the farm.
              </p>
              <p>
                Our mission goes beyond commerce. For every order shipped, we
                plant one tree in drought-prone regions through our "Root of
                Giving" programme. To date, we have planted over 45,000 trees
                and supported the livelihoods of 800+ rural families who depend
                on sustainable forest cultivation.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── VISION SECTION (cause only — no money goals) ─── */}
      <section
        className="bg-background py-14 sm:py-16 px-4"
        data-ocid="about.vision.section"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Leaf className="w-7 h-7 text-primary" />
              </div>
            </div>
            <Badge className="bg-primary/10 text-primary border-primary/20 mb-4">
              Our Vision
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">
              Our Vision
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.18 0.07 162), oklch(0.32 0.1 152))",
            }}
          >
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-secondary/10 blur-3xl pointer-events-none" />
            <div className="relative z-10 p-8 sm:p-12 text-center">
              <div className="text-4xl sm:text-5xl mb-6">🌿</div>
              <blockquote className="text-xl sm:text-2xl md:text-3xl font-bold text-secondary leading-relaxed mb-6">
                "To be the world's most trusted natural healing brand — where
                every product carries the healing power of forests, and every
                purchase plants a seed of sustainable change."
              </blockquote>
              <div className="flex flex-wrap justify-center gap-3 mt-6">
                {[
                  "Healing Communities Naturally",
                  "Preserving Ayurvedic Wisdom",
                  "Sustainable Forest Ecosystems",
                  "Zero Harm to Nature",
                ].map((pillar) => (
                  <span
                    key={pillar}
                    className="px-4 py-1.5 rounded-full text-sm font-medium bg-secondary/15 text-secondary border border-secondary/25"
                  >
                    {pillar}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── MISSION SECTION (₹10,000 Cr goal + flowchart) ─── */}
      <section
        className="bg-muted/30 py-14 sm:py-16 px-4"
        data-ocid="about.mission.section"
      >
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center">
                <Award className="w-7 h-7" />
              </div>
            </div>
            <Badge className="bg-primary/10 text-primary border-primary/20 mb-4">
              Our Mission
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              Our Mission
            </h2>
            <p className="text-muted-foreground leading-relaxed max-w-3xl mx-auto text-base sm:text-lg">
              To build India's first{" "}
              <strong className="text-primary">₹10,000 Crore</strong> natural
              wellness brand by making Ayurvedic healing accessible, affordable,
              and authentically pure for every household.
            </p>
          </motion.div>

          {/* How we'll get there — flowchart */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className="text-center text-sm font-semibold uppercase tracking-widest text-primary mb-6">
              How We'll Achieve ₹10,000 Crore
            </p>
            <MissionFlowchart />
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section
        className="bg-background py-14 sm:py-16 px-4"
        data-ocid="about.values.section"
      >
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-8 sm:mb-10 text-center">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
            {VALUES.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="glass-card rounded-2xl p-5 shadow-soft text-center"
                data-ocid={`about.value.${i + 1}.card`}
              >
                <div className="w-11 h-11 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-bold text-foreground mb-2 text-sm sm:text-base">
                  {title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Eco Practices */}
      <section
        className="bg-muted/30 py-14 sm:py-16 px-4"
        data-ocid="about.eco.section"
      >
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 sm:gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              Sustainable by Design
            </h2>
            <p className="text-muted-foreground mb-5 sm:mb-6 leading-relaxed text-sm sm:text-base">
              Every decision — from sourcing to packaging — is made with the
              planet in mind. Sustainability isn't a feature; it's our
              foundation.
            </p>
            <ul className="space-y-3">
              {ECO_PRACTICES.map((practice) => (
                <li key={practice} className="flex items-center gap-3">
                  <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-primary shrink-0" />
                  <span className="text-muted-foreground text-sm">
                    {practice}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="gradient-eco rounded-3xl p-7 sm:p-8 text-primary-foreground shadow-green"
          >
            <div className="text-center space-y-4">
              <div>
                <div className="text-5xl sm:text-6xl font-bold">45K+</div>
                <div className="text-primary-foreground/80 text-base sm:text-lg">
                  Trees Planted
                </div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-bold">800+</div>
                <div className="text-primary-foreground/80 text-sm sm:text-base">
                  Farmer Families Supported
                </div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-bold">Zero</div>
                <div className="text-primary-foreground/80 text-sm sm:text-base">
                  Synthetic Additives
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team */}
      <section
        className="bg-background py-14 sm:py-16 px-4"
        data-ocid="about.team.section"
      >
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8 sm:mb-10"
          >
            <Badge className="bg-primary/10 text-primary border-primary/20 mb-4">
              The Team
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
              The People Behind Forestheals
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
            {TEAM.map(({ name, role, bio, initials, quote }, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.4 }}
                className="glass-card rounded-2xl p-5 sm:p-6 shadow-soft text-center flex flex-col"
                data-ocid={`about.team.${i + 1}.card`}
              >
                <div
                  className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl flex items-center justify-center mx-auto mb-4 text-primary-foreground font-bold text-base sm:text-lg"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.28 0.09 162), oklch(0.40 0.11 155))",
                  }}
                >
                  {initials}
                </div>
                <h3 className="font-bold text-foreground text-sm sm:text-base leading-tight">
                  {name}
                </h3>
                <p className="text-xs sm:text-sm text-primary font-semibold mb-3 mt-0.5">
                  {role}
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed flex-1">
                  {bio}
                </p>
                {quote && (
                  <p className="mt-4 text-xs italic text-primary/70 border-t border-border pt-3">
                    {quote}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HQ Location */}
      <section
        className="bg-muted/30 py-14 sm:py-16 px-4"
        data-ocid="about.hq.section"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                <MapPin className="w-7 h-7 text-primary" />
              </div>
            </div>
            <Badge className="bg-primary/10 text-primary border-primary/20 mb-4">
              Our Headquarters
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
              Rooted in Beawar
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-card rounded-3xl p-7 sm:p-10 shadow-soft grid md:grid-cols-2 gap-8 items-center"
          >
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3">
                Beawar, Rajasthan
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base mb-5">
                Beawar sits at the eastern gateway to the Aravalli mountain
                range — one of India's oldest forest ecosystems and a rich
                corridor for medicinal herbs like ashwagandha, shatavari, and
                neem. Our roots here are not just geographic; they are the
                source of everything we make.
              </p>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-foreground font-medium">
                  Forestheals HQ, Beawar, Rajasthan 305 901, India
                </span>
              </div>
            </div>
            <div
              className="rounded-2xl p-6 sm:p-8 text-primary-foreground text-center space-y-4"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.22 0.08 162), oklch(0.35 0.1 150))",
              }}
            >
              <div className="text-4xl mb-2">🏔️</div>
              <h4 className="font-bold text-lg text-secondary">
                Gateway to the Aravalli
              </h4>
              <p className="text-primary-foreground/80 text-sm leading-relaxed">
                One of India's oldest mountain ecosystems — home to over 400
                species of medicinal plants used in classical Ayurvedic texts.
              </p>
              <div className="grid grid-cols-2 gap-3 mt-4">
                {[
                  { label: "Medicinal Species", value: "400+" },
                  { label: "Forest Coverage", value: "23,000 ha" },
                  { label: "Farm Partners", value: "200+" },
                  { label: "States Sourced", value: "6" },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="bg-primary-foreground/10 rounded-xl p-2"
                  >
                    <div className="text-secondary font-bold text-lg leading-tight">
                      {value}
                    </div>
                    <div className="text-primary-foreground/70 text-xs">
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Charity */}
      <section
        className="bg-background py-14 sm:py-16 px-4"
        data-ocid="about.charity.section"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
              <Heart className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              Giving Back to Nature
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-7 sm:mb-8 text-sm sm:text-base">
              Through our "Root of Giving" initiative, we partner with
              reforestation NGOs to plant native species in deforested tribal
              lands. We also fund Ayurvedic education programmes in rural
              schools and provide free wellness consultations to elderly
              communities every quarter.
            </p>
            <Link to="/b2b">
              <Button
                type="button"
                size="lg"
                className="h-12 px-8"
                data-ocid="about.charity.cta_button"
              >
                Partner With Us
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Contact */}
      <section
        className="bg-muted/30 py-12 sm:py-14 px-4"
        data-ocid="about.contact.section"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-6 sm:mb-8 text-center">
            Get in Touch
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {[
              { icon: Mail, label: "Email", value: "hello@forestheals.in" },
              { icon: Phone, label: "Phone", value: "+91 99290 59240" },
              {
                icon: MapPin,
                label: "Address",
                value: "Forestheals HQ, Beawar, Rajasthan 305 901, India",
              },
            ].map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="glass-card rounded-2xl p-4 sm:p-5 shadow-soft text-center"
                data-ocid={`about.contact.${label.toLowerCase()}.card`}
              >
                <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary mx-auto mb-3" />
                <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">
                  {label}
                </p>
                <p className="text-xs sm:text-sm text-foreground font-medium break-words">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
