import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "@tanstack/react-router";
import {
  Facebook,
  Instagram,
  MessageCircle,
  Send,
  Twitter,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const QUICK_LINKS = [
  { label: "About Us", to: "/about" },
  { label: "Products", to: "/products" },
  { label: "Bundles", to: "/bundles" },
  { label: "B2B / Export", to: "/b2b" },
  { label: "Services", to: "/services" },
  { label: "Recommend", to: "/recommend" },
];

const LEGAL_LINKS = [
  { label: "Terms & Conditions", to: "/legal/terms" },
  { label: "Privacy Policy", to: "/legal/privacy" },
  { label: "Refund Policy", to: "/legal/refund" },
];

const SOCIAL_LINKS = [
  {
    icon: Instagram,
    label: "Instagram",
    href: "https://instagram.com/forestheals",
  },
  {
    icon: Facebook,
    label: "Facebook",
    href: "https://facebook.com/forestheals",
  },
  { icon: Twitter, label: "Twitter", href: "https://twitter.com/forestheals" },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribing, setSubscribing] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }
    setSubscribing(true);
    await new Promise((r) => setTimeout(r, 600));
    setSubscribing(false);
    setEmail("");
    toast.success("You're subscribed!", {
      description: "Welcome to the Forestheals community.",
    });
  };

  return (
    <footer
      className="bg-card border-t border-border"
      data-ocid="footer.section"
    >
      {/* Main footer */}
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand — logo large, borderless, no box */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-flex items-center mb-5">
              <img
                src="/assets/logo.png"
                alt="Forestheals"
                className="h-20 sm:h-24 w-auto object-contain drop-shadow"
                style={{ maxWidth: "200px" }}
              />
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              From forest to homes. Premium Ayurvedic wellness products crafted
              with ancient wisdom and modern science.
            </p>
            <div className="flex gap-3">
              {SOCIAL_LINKS.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-smooth"
                  data-ocid={`footer.social.${label.toLowerCase()}.link`}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">
              Explore
            </h3>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-muted-foreground hover:text-primary transition-smooth"
                    data-ocid={`footer.nav.${link.label.toLowerCase().replace(/\s+/g, "_")}.link`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">
              Legal
            </h3>
            <ul className="space-y-2.5">
              {LEGAL_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-muted-foreground hover:text-primary transition-smooth"
                    data-ocid={`footer.legal.${link.label.toLowerCase().replace(/\s+/g, "_")}.link`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            {/* WhatsApp */}
            <div className="mt-6">
              <h3 className="font-semibold text-foreground mb-3 text-sm uppercase tracking-wider">
                Contact Us
              </h3>
              <a
                href="https://wa.me/919929059240?text=Hi%20Forestheals!%20I%20have%20a%20question%20about%20your%20products."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-smooth"
                data-ocid="footer.whatsapp.link"
              >
                <MessageCircle className="w-4 h-4 text-green-600" />
                WhatsApp Us
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-foreground mb-2 text-sm uppercase tracking-wider">
              Join the Community
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Get Ayurvedic tips, exclusive offers, and new product updates.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-sm flex-1"
                data-ocid="footer.newsletter.input"
              />
              <Button
                type="submit"
                size="icon"
                disabled={subscribing}
                className="shrink-0"
                data-ocid="footer.newsletter.submit_button"
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>
            <p className="text-xs text-muted-foreground mt-2">
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Forestheals. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-smooth"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
