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

export default function TermsPage() {
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
            Terms & Conditions
          </h1>
          <p className="text-muted-foreground text-sm">
            Last updated: {LAST_UPDATED}
          </p>
        </div>
      </div>

      {/* Content */}
      <div
        className="max-w-3xl mx-auto px-4 py-12"
        data-ocid="terms.content.section"
      >
        <div className="space-y-8">
          <Section title="1. Acceptance of Terms">
            By accessing or using the Forestheals website (forestheals.in) or
            purchasing our products, you agree to be bound by these Terms and
            Conditions. If you do not agree with any part of these terms, please
            do not use our service.
          </Section>

          <Section title="2. Use of Our Services">
            <p className="mb-3">
              You agree to use our services only for lawful purposes and in
              accordance with these Terms. You must not:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>
                Use the service in any manner that could disable, overburden, or
                impair the platform
              </li>
              <li>
                Attempt to gain unauthorized access to any portion of our
                systems
              </li>
              <li>
                Use automated tools to scrape, crawl, or extract data without
                written permission
              </li>
              <li>
                Impersonate any person or entity, or falsely state your
                affiliation
              </li>
              <li>
                Transmit any material that is unlawful, harmful, or offensive
              </li>
              <li>
                Engage in any conduct that restricts or inhibits other users'
                enjoyment of the service
              </li>
            </ul>
          </Section>

          <Section title="3. User Accounts & Eligibility">
            You must be at least 18 years of age to create an account and place
            orders on Forestheals. By creating an account, you represent that
            all information you provide is accurate and that you will maintain
            the accuracy of such information. You are responsible for
            maintaining the confidentiality of your account credentials.
          </Section>

          <Section title="4. Products & Pricing">
            All product descriptions, images, and prices are provided in good
            faith and are subject to change without notice. We reserve the right
            to modify or discontinue any product at any time. Prices are listed
            in Indian Rupees (INR) inclusive of all applicable taxes unless
            stated otherwise.
          </Section>

          <Section title="5. Orders & Payment">
            By placing an order, you make an offer to purchase. We reserve the
            right to accept or decline any order. Payment must be made at the
            time of purchase via the methods offered (Stripe card payments or
            Cash on Delivery). For COD orders, payment is due at the time of
            delivery.
          </Section>

          <Section title="6. Intellectual Property">
            All content on this website — including text, graphics, logos,
            images, audio clips, and software — is the property of Forestheals
            and is protected under applicable Indian and international
            intellectual property laws. You may not reproduce, distribute,
            modify, or create derivative works without our prior written
            consent.
          </Section>

          <Section title="7. Health Disclaimer">
            The information provided on this website is for educational purposes
            only and is not a substitute for professional medical advice,
            diagnosis, or treatment. Always consult a qualified healthcare
            provider before beginning any new health regimen. Forestheals
            products are not intended to diagnose, treat, cure, or prevent any
            disease.
          </Section>

          <Section title="8. Limitation of Liability">
            To the fullest extent permitted by law, Forestheals shall not be
            liable for any indirect, incidental, special, consequential, or
            punitive damages arising from your use of our services or products.
            Our total liability to you shall not exceed the amount you paid for
            the specific product giving rise to the claim.
          </Section>

          <Section title="9. Governing Law & Dispute Resolution">
            These Terms shall be governed by the laws of India. Any disputes
            arising from these Terms or your use of Forestheals shall first be
            attempted to be resolved through mutual negotiation. If unresolved
            within 30 days, disputes shall be submitted to binding arbitration
            under the Arbitration and Conciliation Act, 1996, in Jaipur,
            Rajasthan.
          </Section>

          <Section title="10. Modifications">
            We reserve the right to modify these Terms at any time. Changes will
            be effective immediately upon posting to the website. Your continued
            use of our services after any changes constitutes your acceptance of
            the new Terms.
          </Section>

          <Section title="11. Contact Us">
            For questions about these Terms, please contact us at{" "}
            <a
              href="mailto:legal@forestheals.in"
              className="text-primary hover:underline"
            >
              legal@forestheals.in
            </a>{" "}
            or write to: Forestheals, Jaipur, Rajasthan 302001, India.
          </Section>

          <div className="pt-4 border-t border-border">
            <div className="flex gap-4 text-sm">
              <Link
                to="/legal/privacy"
                className="text-primary hover:underline"
                data-ocid="terms.privacy_link"
              >
                Privacy Policy
              </Link>
              <Link
                to="/legal/refund"
                className="text-primary hover:underline"
                data-ocid="terms.refund_link"
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
