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

export default function RefundPage() {
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
            Refund & Return Policy
          </h1>
          <p className="text-muted-foreground text-sm">
            Last updated: {LAST_UPDATED}
          </p>
        </div>
      </div>

      {/* Content */}
      <div
        className="max-w-3xl mx-auto px-4 py-12"
        data-ocid="refund.content.section"
      >
        <div className="space-y-8">
          {/* Summary card */}
          <div className="bg-primary/5 border border-primary/15 rounded-2xl p-5">
            <h2 className="text-base font-bold text-foreground mb-2">
              Our Commitment to You
            </h2>
            <p className="text-sm text-muted-foreground">
              We stand by the quality of every Forestheals product. If you're
              not satisfied for any reason, we offer a{" "}
              <strong className="text-primary">
                30-day hassle-free return
              </strong>{" "}
              policy. Your satisfaction is our promise.
            </p>
          </div>

          <Section title="1. Return Eligibility">
            <p className="mb-3">
              You may request a return or refund within 30 days of the delivery
              date, provided:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>
                The product is unused and in its original sealed packaging
              </li>
              <li>
                The product has not been tampered with or opened (unless
                defective)
              </li>
              <li>You have the original order confirmation or invoice</li>
              <li>
                The product was not purchased as part of a flash sale marked
                "non-refundable"
              </li>
            </ul>
          </Section>

          <Section title="2. Non-Returnable Items">
            <p className="mb-3">
              The following items are not eligible for return or refund:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>
                Opened or partially consumed products (except defective items)
              </li>
              <li>Products with broken seals due to customer handling</li>
              <li>Perishable items beyond their best-before date</li>
              <li>Gift cards or promotional vouchers</li>
              <li>Items marked "Final Sale" at the time of purchase</li>
            </ul>
          </Section>

          <Section title="3. Return Process">
            <p className="mb-3">To initiate a return, follow these steps:</p>
            <ol className="list-decimal list-inside space-y-3 ml-2">
              <li>
                <strong className="text-foreground">Contact us</strong> within
                30 days of delivery at{" "}
                <a
                  href="mailto:returns@forestheals.in"
                  className="text-primary hover:underline"
                >
                  returns@forestheals.in
                </a>{" "}
                or WhatsApp us at +91 99290 59240 with your order ID and reason
                for return.
              </li>
              <li>
                <strong className="text-foreground">Receive approval</strong> —
                our support team will review your request within 2 business days
                and send you a return authorisation code.
              </li>
              <li>
                <strong className="text-foreground">Ship the item</strong> —
                pack the item securely and ship it to our returns centre in
                Jaipur using your preferred courier. Include the return
                authorisation code inside the package.
              </li>
              <li>
                <strong className="text-foreground">Receive refund</strong> —
                once we receive and inspect the returned item, we will process
                your refund within 5-7 business days.
              </li>
            </ol>
          </Section>

          <Section title="4. Refund Methods">
            <p className="mb-3">
              Refunds are issued using the original payment method:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>
                <strong className="text-foreground">
                  Credit/Debit Card (Stripe):
                </strong>{" "}
                Refund to original card within 5-7 business days
              </li>
              <li>
                <strong className="text-foreground">Cash on Delivery:</strong>{" "}
                Bank transfer (NEFT/IMPS) within 7-10 business days
              </li>
              <li>
                <strong className="text-foreground">Store Credit:</strong>{" "}
                Available immediately as an alternative, valid for 12 months
              </li>
            </ul>
            <p className="mt-3">
              Original shipping charges are non-refundable unless the return is
              due to our error or a defective product.
            </p>
          </Section>

          <Section title="5. Damaged or Defective Products">
            If you receive a damaged, defective, or incorrect product, please
            notify us within 48 hours of delivery with photographic evidence. We
            will arrange a free return pickup and issue a full refund or
            replacement at no additional cost to you.
          </Section>

          <Section title="6. Exchanges">
            We currently do not process direct exchanges. If you wish to
            exchange a product, please initiate a return for the original item
            and place a new order for the desired product. This ensures faster
            processing and availability confirmation.
          </Section>

          <Section title="7. Late or Missing Refunds">
            <p className="mb-2">
              If you haven't received your refund after the stated timeline,
              please:
            </p>
            <ol className="list-decimal list-inside space-y-2 ml-2">
              <li>Check your bank account or card statement</li>
              <li>Contact your bank or card issuer — processing times vary</li>
              <li>
                If still unresolved, email us at returns@forestheals.in with
                your return reference number
              </li>
            </ol>
          </Section>

          <Section title="8. Cancellations">
            Orders may be cancelled free of charge within 2 hours of placement.
            After this window, cancellation may not be possible if the order has
            been processed for dispatch. For COD orders, you may refuse delivery
            — however, repeated refusals may affect your account standing.
          </Section>

          <Section title="9. Returns Support">
            <div className="space-y-1">
              <p>
                📧 Email:{" "}
                <a
                  href="mailto:returns@forestheals.in"
                  className="text-primary hover:underline"
                >
                  returns@forestheals.in
                </a>
              </p>
              <p>📱 WhatsApp: +91 99290 59240 (Mon–Sat, 10am–6pm IST)</p>
              <p>
                📍 Returns Address: Forestheals Returns Centre, Jaipur,
                Rajasthan 302001
              </p>
            </div>
          </Section>

          <div className="pt-4 border-t border-border">
            <div className="flex gap-4 text-sm">
              <Link
                to="/legal/terms"
                className="text-primary hover:underline"
                data-ocid="refund.terms_link"
              >
                Terms & Conditions
              </Link>
              <Link
                to="/legal/privacy"
                className="text-primary hover:underline"
                data-ocid="refund.privacy_link"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
