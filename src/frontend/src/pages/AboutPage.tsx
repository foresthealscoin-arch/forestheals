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
  Target,
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
    name: "Arjun Sharma",
    role: "Founder & CEO",
    bio: "Ayurvedic practitioner with 12 years of experience in herbal farming and natural product development.",
    initials: "AS",
  },
  {
    name: "Priya Nair",
    role: "Chief Product Officer",
    bio: "Botanist and formulation specialist dedicated to preserving potency in every batch.",
    initials: "PN",
  },
  {
    name: "Vikram Patel",
    role: "Head of Sustainability",
    bio: "Environmental engineer ensuring every step of our supply chain meets ecological standards.",
    initials: "VP",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background" data-ocid="about.page">
      {/* Hero */}
      <div
        className="relative py-28 px-4 overflow-hidden"
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
            <h1 className="text-5xl md:text-6xl font-bold text-primary-foreground font-display mb-5">
              From Forest to Homes
            </h1>
            <p className="text-xl text-primary-foreground/75 leading-relaxed">
              We believe the forest holds every remedy the modern world seeks —
              delivered with love, science, and reverence for nature.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Brand Story */}
      <section
        className="bg-muted/30 py-16 px-4"
        data-ocid="about.story.section"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              The Forestheals Story
            </h2>
            <div className="space-y-5 text-muted-foreground leading-relaxed text-lg">
              <p>
                Forestheals was born in 2021 in the foothills of Rajasthan,
                where our founder Arjun Sharma grew up watching his grandmother
                prepare herbal remedies for the entire village. Witnessing how
                modern commerce stripped away the purity and integrity of
                Ayurvedic products, he set out to build a brand that would
                restore that trust.
              </p>
              <p>
                We work directly with over 200 organic farmers across Rajasthan,
                Kerala, Uttarakhand, and Himachal Pradesh. Every herb is tested
                for heavy metals, microbial contamination, and active compound
                concentration before it leaves the farm. Our cold-processing
                facilities preserve volatile phytonutrients that conventional
                heat-drying destroys.
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

      {/* Mission & Vision */}
      <section
        className="bg-background py-16 px-4"
        data-ocid="about.mission.section"
      >
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-10 text-center">
            Mission & Vision
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: Sprout,
                title: "Our Mission",
                text: "To make authentic, potent Ayurvedic wellness accessible to every home — without compromise on quality, sustainability, or affordability. We bridge ancient wisdom and modern science, one product at a time.",
                accent: "bg-primary/8 border-primary/20",
                iconBg: "bg-primary text-primary-foreground",
              },
              {
                icon: Award,
                title: "Our Vision",
                text: "To be the world's most trusted natural wellness brand — a ₹1,000 Cr global enterprise that proves luxury and sustainability are inseparable. We envision a world where every household has access to nature's pharmacy.",
                accent: "bg-secondary/20 border-secondary/30",
                iconBg: "bg-secondary text-secondary-foreground",
              },
            ].map(({ icon: Icon, title, text, accent, iconBg }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, x: i === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`rounded-2xl p-8 border-2 shadow-soft ${accent}`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${iconBg}`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">{text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section
        className="bg-muted/30 py-16 px-4"
        data-ocid="about.values.section"
      >
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-10 text-center">
            Our Core Values
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
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
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-foreground mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Eco Practices */}
      <section
        className="bg-background py-16 px-4"
        data-ocid="about.eco.section"
      >
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Sustainable by Design
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Every decision — from sourcing to packaging — is made with the
              planet in mind. Sustainability isn't a feature; it's our
              foundation.
            </p>
            <ul className="space-y-3">
              {ECO_PRACTICES.map((practice) => (
                <li key={practice} className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-primary shrink-0" />
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
            className="gradient-eco rounded-3xl p-8 text-primary-foreground shadow-green"
          >
            <div className="text-center space-y-4">
              <div>
                <div className="text-6xl font-bold">45K+</div>
                <div className="text-primary-foreground/80 text-lg">
                  Trees Planted
                </div>
              </div>
              <div>
                <div className="text-4xl font-bold">800+</div>
                <div className="text-primary-foreground/80">
                  Farmer Families Supported
                </div>
              </div>
              <div>
                <div className="text-4xl font-bold">Zero</div>
                <div className="text-primary-foreground/80">
                  Synthetic Additives
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team */}
      <section
        className="bg-muted/30 py-16 px-4"
        data-ocid="about.team.section"
      >
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-10 text-center">
            The Team
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {TEAM.map(({ name, role, bio, initials }, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.4 }}
                className="glass-card rounded-2xl p-6 shadow-soft text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-primary">
                    {initials}
                  </span>
                </div>
                <h3 className="font-bold text-foreground">{name}</h3>
                <p className="text-sm text-primary font-medium mb-3">{role}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Charity */}
      <section
        className="bg-background py-16 px-4"
        data-ocid="about.charity.section"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
              <Heart className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Giving Back to Nature
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8">
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
        className="bg-muted/30 py-14 px-4"
        data-ocid="about.contact.section"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
            Get in Touch
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { icon: Mail, label: "Email", value: "hello@forestheals.in" },
              { icon: Phone, label: "Phone", value: "+91 99290 59240" },
              {
                icon: MapPin,
                label: "Address",
                value: "Forestheals HQ, Jaipur, Rajasthan 302001",
              },
            ].map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="glass-card rounded-2xl p-5 shadow-soft text-center"
              >
                <Icon className="w-6 h-6 text-primary mx-auto mb-3" />
                <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">
                  {label}
                </p>
                <p className="text-sm text-foreground font-medium">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
