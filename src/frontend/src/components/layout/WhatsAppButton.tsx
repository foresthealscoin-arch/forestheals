import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { SiWhatsapp } from "react-icons/si";

const WA_URL =
  "https://wa.me/919929059240?text=Hi%20Forestheals!%20I%20have%20a%20question%20about%20your%20products.";

export function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2"
      data-ocid="whatsapp.button"
    >
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 8 }}
            className="glass-card rounded-xl px-4 py-3 shadow-elevated max-w-xs"
          >
            <div className="flex items-start gap-2">
              <p className="text-sm text-foreground leading-snug">
                Need help? Chat with us on WhatsApp!
              </p>
              <button
                type="button"
                onClick={() => setShowTooltip(false)}
                className="shrink-0 text-muted-foreground hover:text-foreground transition-smooth"
                aria-label="Close"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.a
        href={WA_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        onHoverStart={() => setShowTooltip(true)}
        onHoverEnd={() => setShowTooltip(false)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{ y: [0, -6, 0] }}
        transition={{
          y: {
            repeat: Number.POSITIVE_INFINITY,
            duration: 2.5,
            ease: "easeInOut",
          },
        }}
        className="w-14 h-14 rounded-full flex items-center justify-center shadow-green text-white"
        style={{ background: "#25D366" }}
      >
        <SiWhatsapp className="w-7 h-7" />
      </motion.a>
    </div>
  );
}
