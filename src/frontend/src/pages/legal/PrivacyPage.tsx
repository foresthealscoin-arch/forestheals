import { Link } from "@tanstack/react-router";
import { Leaf } from "lucide-react";

const LAST_UPDATED = "January 1, 2025";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="text-lg font-bold text-foreground mb-3">{title}</h2>
      <div className="text-muted-foreground leading-relaxed">{children}</div>
    </div>
  );
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Legal Header */}
      <div className="bg-card border-b border-border py-10 px-4">
        <div className="max-w-3xl mx-auto">
          <Link to="/" className="flex items-center gap-2 mb-5 w-fit">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Leaf className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-foreground">Forestheals</span>
          </Link>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground text-sm">
            Last updated: {LAST_UPDATED}
          </p>
        </div>
      </div>

      {/* Content */}
      <div
        className="max-w-3xl mx-auto px-4 py-12"
        data-ocid="privacy.content.section"
      >
        <div className="space-y-8">
          <Section title="1. Introduction">
            Forestheals ("we", "our", "us") is committed to protecting your
            privacy. This Privacy Policy explains how we collect, use, disclose,
            and safeguard your information when you visit our website or make a
            purchase. Please read this policy carefully.
          </Section>

          <Section title="2. Information We Collect">
            <p className="mb-3">
              We may collect the following categories of personal information:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>
                <strong className="text-foreground">Identity data:</strong>{" "}
                Name, username, or similar identifiers
              </li>
              <li>
                <strong className="text-foreground">Contact data:</strong> Email
                address, phone number, delivery address
              </li>
              <li>
                <strong className="text-foreground">Transaction data:</strong>{" "}
                Details about purchases and payments
              </li>
              <li>
                <strong className="text-foreground">Technical data:</strong> IP
                address, browser type, device information, and usage data
                collected automatically
              </li>
              <li>
                <strong className="text-foreground">
                  Marketing preferences:
                </strong>{" "}
                Preferences for receiving communications from us
              </li>
            </ul>
            <p className="mt-3">
              <strong className="text-foreground">Blockchain Note:</strong> Our
              platform runs on the Internet Computer, a public blockchain. Your
              principal ID (a cryptographic identifier) may be stored in
              canister state, which is inherently decentralized and cannot be
              deleted. We do not link your principal ID to personally
              identifiable information without your consent.
            </p>
          </Section>

          <Section title="3. How We Use Your Information">
            <p className="mb-3">We use the information we collect to:</p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>
                Process and fulfil your orders, including sending delivery
                notifications
              </li>
              <li>Manage your account and provide customer support</li>
              <li>Improve and personalise your experience on our platform</li>
              <li>
                Send transactional emails related to orders (not marketing,
                unless consented)
              </li>
              <li>Comply with our legal obligations</li>
              <li>Detect and prevent fraudulent activity</li>
            </ul>
          </Section>

          <Section title="4. Cookies & Tracking">
            We use essential cookies to maintain session state and shopping cart
            functionality. We may use analytics tools (such as anonymised usage
            statistics) to understand how visitors interact with our website.
            You can control cookie preferences through your browser settings;
            however, disabling essential cookies may affect platform
            functionality.
          </Section>

          <Section title="5. Sharing of Information">
            <p className="mb-2">
              We do not sell, trade, or rent your personal information to third
              parties. We may share data with:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>
                Payment processors (Stripe) — solely for transaction processing
              </li>
              <li>
                Logistics and shipping partners — solely for order delivery
              </li>
              <li>Legal authorities — when required by law or court order</li>
            </ul>
          </Section>

          <Section title="6. Data Retention">
            We retain personal data only as long as necessary to provide our
            services or comply with legal obligations. Transaction records are
            kept for 7 years as required by Indian tax law. You may request
            deletion of your account data at any time, subject to our legal
            retention obligations.
          </Section>

          <Section title="7. Your Rights">
            <p className="mb-3">
              Under applicable Indian data protection laws, you have the right
              to:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Access the personal data we hold about you</li>
              <li>Correct inaccurate or incomplete data</li>
              <li>
                Request deletion of your personal data (subject to legal
                retention requirements)
              </li>
              <li>Withdraw consent for marketing communications at any time</li>
              <li>
                Lodge a complaint with the relevant data protection authority
              </li>
            </ul>
          </Section>

          <Section title="8. Data Security">
            We implement appropriate technical and organisational measures to
            protect your personal data against unauthorised access, alteration,
            disclosure, or destruction. All payment processing is handled by
            Stripe, which is PCI-DSS Level 1 certified.
          </Section>

          <Section title="9. Third-Party Links">
            Our website may contain links to third-party websites. This Privacy
            Policy does not apply to those sites. We encourage you to review the
            privacy policies of any third-party sites you visit.
          </Section>

          <Section title="10. Contact Us">
            If you have questions about this Privacy Policy or wish to exercise
            your rights, contact our Data Protection Officer at{" "}
            <a
              href="mailto:privacy@forestheals.in"
              className="text-primary hover:underline"
            >
              privacy@forestheals.in
            </a>{" "}
            or write to: Forestheals, Jaipur, Rajasthan 302001, India.
          </Section>

          <div className="pt-4 border-t border-border">
            <div className="flex gap-4 text-sm">
              <Link
                to="/legal/terms"
                className="text-primary hover:underline"
                data-ocid="privacy.terms_link"
              >
                Terms & Conditions
              </Link>
              <Link
                to="/legal/refund"
                className="text-primary hover:underline"
                data-ocid="privacy.refund_link"
              >
                Refund Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
