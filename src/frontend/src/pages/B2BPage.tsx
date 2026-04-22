import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useActor } from "@caffeineai/core-infrastructure";
import {
  CheckCircle,
  Download,
  Globe,
  Package,
  TrendingUp,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { createActor } from "../backend";

const CATEGORIES = [
  "Ayurvedic Powders",
  "Essential Oils",
  "Spiritual Products",
  "Pure Cotton",
  "Eco-Friendly",
  "Handicrafts",
  "Bio-Coal",
];

const STATS = [
  { icon: Package, label: "Products", value: "50+" },
  { icon: Users, label: "B2B Partners", value: "500+" },
  { icon: Globe, label: "Countries", value: "12" },
  { icon: TrendingUp, label: "Revenue", value: "₹10Cr+" },
];

const EXPORT_COUNTRIES = [
  { flag: "🇮🇳", name: "India" },
  { flag: "🇦🇪", name: "UAE" },
  { flag: "🇬🇧", name: "UK" },
  { flag: "🇺🇸", name: "USA" },
  { flag: "🇸🇬", name: "Singapore" },
  { flag: "🇩🇪", name: "Germany" },
];

const BULK_TIERS = [
  { qty: "1 – 10 kg", discount: "—" },
  { qty: "11 – 50 kg", discount: "10% off" },
  { qty: "51 – 200 kg", discount: "20% off" },
  { qty: "200 kg +", discount: "Contact us" },
];

interface FormState {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  productInterest: string[];
  quantity: string;
  message: string;
}

export default function B2BPage() {
  const [form, setForm] = useState<FormState>({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    productInterest: [],
    quantity: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { actor } = useActor(createActor);

  const toggleCategory = (cat: string) => {
    setForm((prev) => ({
      ...prev,
      productInterest: prev.productInterest.includes(cat)
        ? prev.productInterest.filter((c) => c !== cat)
        : [...prev.productInterest, cat],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.companyName || !form.contactName || !form.email || !form.phone) {
      toast.error("Please fill in all required fields");
      return;
    }
    setLoading(true);
    try {
      if (actor) {
        await actor.submitB2BInquiry({
          companyName: form.companyName,
          contactName: form.contactName,
          email: form.email,
          phone: form.phone,
          productInterest: form.productInterest.join(", "),
          quantity: form.quantity,
          message: form.message,
        });
      }
      setSubmitted(true);
      toast.success("Inquiry submitted! We'll contact you within 24 hours.");
    } catch {
      toast.error("Failed to submit inquiry. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="gradient-hero py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-10 right-20 w-64 h-64 rounded-full bg-secondary blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-48 rounded-full bg-accent blur-3xl" />
        </div>
        <div
          className="max-w-5xl mx-auto relative z-10"
          data-ocid="b2b.hero.section"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="text-center"
          >
            <Badge className="bg-secondary/20 text-secondary border-secondary/30 mb-5">
              B2B & Export
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6 font-display leading-tight">
              Grow Together with Forestheals
            </h1>
            <p className="text-xl text-primary-foreground/75 max-w-2xl mx-auto mb-12">
              Premium natural products for bulk orders, retail partnerships, and
              global export
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
            data-ocid="b2b.stats.section"
          >
            {STATS.map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="glass-card rounded-2xl p-5 text-center"
              >
                <Icon className="w-6 h-6 text-secondary mx-auto mb-2" />
                <div className="text-3xl font-bold text-primary-foreground">
                  {value}
                </div>
                <div className="text-sm text-primary-foreground/60 mt-1">
                  {label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-4 py-14 grid md:grid-cols-5 gap-10">
        {/* Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="md:col-span-3"
          data-ocid="b2b.inquiry.section"
        >
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Submit a Bulk Inquiry
          </h2>
          <p className="text-muted-foreground mb-6">
            Fill in the form and our partnership team will respond within 24
            hours.
          </p>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card rounded-2xl p-10 text-center shadow-soft"
              data-ocid="b2b.inquiry.success_state"
            >
              <CheckCircle className="w-14 h-14 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">
                Inquiry Received!
              </h3>
              <p className="text-muted-foreground">
                Thank you, {form.contactName}. Our B2B team will reach out to{" "}
                <strong>{form.email}</strong> within 24 hours.
              </p>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="glass-card rounded-2xl p-6 shadow-soft space-y-5"
              data-ocid="b2b.inquiry.form"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="companyName">Company Name *</Label>
                  <Input
                    id="companyName"
                    value={form.companyName}
                    onChange={(e) =>
                      setForm({ ...form, companyName: e.target.value })
                    }
                    placeholder="Acme Wellness Pvt Ltd"
                    data-ocid="b2b.company_name.input"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="contactName">Contact Name *</Label>
                  <Input
                    id="contactName"
                    value={form.contactName}
                    onChange={(e) =>
                      setForm({ ...form, contactName: e.target.value })
                    }
                    placeholder="Rajesh Kumar"
                    data-ocid="b2b.contact_name.input"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="b2bEmail">Email *</Label>
                  <Input
                    id="b2bEmail"
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    placeholder="rajesh@acme.com"
                    data-ocid="b2b.email.input"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="b2bPhone">Phone *</Label>
                  <Input
                    id="b2bPhone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                    placeholder="+91 98765 43210"
                    data-ocid="b2b.phone.input"
                    required
                  />
                </div>
              </div>

              {/* Product Interest */}
              <div className="space-y-2">
                <Label>Product Interest</Label>
                <div
                  className="flex flex-wrap gap-2"
                  data-ocid="b2b.categories.list"
                >
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => toggleCategory(cat)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-smooth
                        ${
                          form.productInterest.includes(cat)
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-card text-foreground border-border hover:border-primary/50"
                        }`}
                      data-ocid="b2b.category.toggle"
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="space-y-1.5">
                <Label htmlFor="quantity">Quantity Needed</Label>
                <select
                  id="quantity"
                  value={form.quantity}
                  onChange={(e) =>
                    setForm({ ...form, quantity: e.target.value })
                  }
                  className="w-full h-10 px-3 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  data-ocid="b2b.quantity.select"
                >
                  <option value="">Select quantity range</option>
                  <option value="10-50kg">10 – 50 kg</option>
                  <option value="50-100kg">50 – 100 kg</option>
                  <option value="100-500kg">100 – 500 kg</option>
                  <option value="500kg+">500 kg +</option>
                </select>
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <Label htmlFor="b2bMessage">
                  Message / Special Requirements
                </Label>
                <Textarea
                  id="b2bMessage"
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  placeholder="Tell us about your business and requirements..."
                  rows={4}
                  data-ocid="b2b.message.textarea"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={loading}
                data-ocid="b2b.inquiry.submit_button"
              >
                {loading ? "Submitting…" : "Submit Inquiry"}
              </Button>
            </form>
          )}
        </motion.div>

        {/* Sidebar */}
        <div className="md:col-span-2 space-y-6">
          {/* Bio-Coal */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="gradient-eco rounded-2xl p-6 shadow-green text-primary-foreground"
            data-ocid="b2b.biocoal.section"
          >
            <h3 className="text-xl font-bold mb-1">🌿 Bio-Coal</h3>
            <p className="text-sm text-primary-foreground/80 mb-1 font-semibold">
              Sustainable Fuel for Industry
            </p>
            <p className="text-sm text-primary-foreground/70 mb-4 leading-relaxed">
              Biomass fuel crafted from agricultural waste — carbon-neutral,
              export-ready, and certified for international markets.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {["ISO 9001", "MSDS Compliant", "Export Ready"].map((cert) => (
                <Badge
                  key={cert}
                  className="bg-primary-foreground/15 text-primary-foreground border-primary-foreground/20 text-xs"
                >
                  {cert}
                </Badge>
              ))}
            </div>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              className="w-full"
              data-ocid="b2b.biocoal.download_button"
              onClick={() => toast.info("Product spec PDF coming soon")}
            >
              <Download className="w-4 h-4 mr-2" />
              Download Product Spec
            </Button>
          </motion.div>

          {/* Export Countries */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.45 }}
            className="glass-card rounded-2xl p-5 shadow-soft"
            data-ocid="b2b.export.section"
          >
            <h3 className="text-base font-bold text-foreground mb-1">
              🌍 Global Shipping
            </h3>
            <p className="text-xs text-muted-foreground mb-4">
              Shipping globally with compliance documentation
            </p>
            <div className="grid grid-cols-3 gap-2">
              {EXPORT_COUNTRIES.map(({ flag, name }) => (
                <div
                  key={name}
                  className="flex flex-col items-center gap-1 p-2 bg-muted/50 rounded-xl"
                >
                  <span className="text-2xl">{flag}</span>
                  <span className="text-xs text-muted-foreground">{name}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Bulk Pricing */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.45 }}
            className="glass-card rounded-2xl p-5 shadow-soft"
            data-ocid="b2b.pricing.section"
          >
            <h3 className="text-base font-bold text-foreground mb-4">
              💰 Bulk Pricing
            </h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left text-muted-foreground font-medium pb-2 text-xs">
                    Quantity
                  </th>
                  <th className="text-right text-muted-foreground font-medium pb-2 text-xs">
                    Discount
                  </th>
                </tr>
              </thead>
              <tbody>
                {BULK_TIERS.map((tier) => (
                  <tr
                    key={tier.qty}
                    className="border-b border-border/50 last:border-0"
                  >
                    <td className="py-2.5 text-foreground">{tier.qty}</td>
                    <td
                      className={`py-2.5 text-right font-semibold ${
                        tier.discount === "—"
                          ? "text-muted-foreground"
                          : "text-primary"
                      }`}
                    >
                      {tier.discount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
