import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, RefreshCw, Save, Store } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { StoreSettings } from "../../backend.d";
import {
  useAdminSettings,
  useSaveAdminSettings,
} from "../../hooks/useAdminData";
import { toNumber } from "../../utils/convert";
import { AdminPLayout } from "./AdminPLayout";

const DEFAULT_SETTINGS: StoreSettings = {
  storeName: "Forestheals",
  contactEmail: "hello@forestheals.in",
  contactPhone: "+91 9929059240",
  gstNumber: "",
  gstRate: BigInt(18),
  currency: "INR",
  timezone: "Asia/Kolkata",
  seoTitle: "Forestheals — From Forest to Homes",
  seoDescription: "Premium eco-Ayurvedic products sourced from nature's heart.",
  logoUrl: "/assets/logo.png",
  faviconUrl: "/favicon.ico",
  facebookUrl: "",
  instagramUrl: "",
  whatsappNumber: "9929059240",
  shippingDefault: BigInt(50),
  freeShippingThreshold: BigInt(499),
};

interface FormState {
  storeName: string;
  contactEmail: string;
  contactPhone: string;
  gstNumber: string;
  gstRate: number;
  currency: string;
  timezone: string;
  seoTitle: string;
  seoDescription: string;
  logoUrl: string;
  faviconUrl: string;
  facebookUrl: string;
  instagramUrl: string;
  whatsappNumber: string;
  shippingDefault: number;
  freeShippingThreshold: number;
}

function settingsToForm(s: StoreSettings): FormState {
  return {
    storeName: s.storeName,
    contactEmail: s.contactEmail,
    contactPhone: s.contactPhone,
    gstNumber: s.gstNumber,
    gstRate: toNumber(s.gstRate),
    currency: s.currency,
    timezone: s.timezone,
    seoTitle: s.seoTitle,
    seoDescription: s.seoDescription,
    logoUrl: s.logoUrl,
    faviconUrl: s.faviconUrl,
    facebookUrl: s.facebookUrl,
    instagramUrl: s.instagramUrl,
    whatsappNumber: s.whatsappNumber,
    shippingDefault: toNumber(s.shippingDefault),
    freeShippingThreshold: toNumber(s.freeShippingThreshold),
  };
}

function formToSettings(f: FormState): StoreSettings {
  return {
    storeName: f.storeName,
    contactEmail: f.contactEmail,
    contactPhone: f.contactPhone,
    gstNumber: f.gstNumber,
    gstRate: BigInt(f.gstRate),
    currency: f.currency,
    timezone: f.timezone,
    seoTitle: f.seoTitle,
    seoDescription: f.seoDescription,
    logoUrl: f.logoUrl,
    faviconUrl: f.faviconUrl,
    facebookUrl: f.facebookUrl,
    instagramUrl: f.instagramUrl,
    whatsappNumber: f.whatsappNumber,
    shippingDefault: BigInt(f.shippingDefault),
    freeShippingThreshold: BigInt(f.freeShippingThreshold),
  };
}

export default function AdminPSettings() {
  const { data: settings, isLoading, isError, refetch } = useAdminSettings();
  const saveMutation = useSaveAdminSettings();
  const [form, setForm] = useState<FormState>(settingsToForm(DEFAULT_SETTINGS));

  useEffect(() => {
    if (settings) setForm(settingsToForm(settings));
  }, [settings]);

  async function handleSave() {
    try {
      await saveMutation.mutateAsync(formToSettings(form));
      toast.success("Settings saved successfully!");
    } catch {
      toast.error("Failed to save settings. Please try again.");
    }
  }

  if (isError) {
    return (
      <AdminPLayout
        title="Store Settings"
        subtitle="Configure your store preferences"
      >
        <div
          className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center"
          data-ocid="adminp.settings.error_state"
        >
          <AlertCircle className="w-8 h-8 text-red-400 mx-auto mb-3" />
          <p className="text-red-700 font-medium">Failed to load settings</p>
          <Button
            variant="outline"
            size="sm"
            className="mt-3"
            onClick={() => void refetch()}
          >
            <RefreshCw className="w-4 h-4 mr-1" /> Retry
          </Button>
        </div>
      </AdminPLayout>
    );
  }

  return (
    <AdminPLayout
      title="Store Settings"
      subtitle="Configure your store preferences and details"
      actions={
        <Button
          size="sm"
          className="gap-1 bg-[#004a38] hover:bg-[#003a2c]"
          onClick={() => void handleSave()}
          disabled={saveMutation.isPending}
          data-ocid="adminp.settings.save_button"
        >
          <Save className="w-4 h-4" />{" "}
          {saveMutation.isPending ? "Saving…" : "Save Settings"}
        </Button>
      }
    >
      {isLoading ? (
        <div
          className="max-w-2xl space-y-4"
          data-ocid="adminp.settings.loading_state"
        >
          {["a", "b", "c"].map((k) => (
            <Skeleton key={k} className="h-40 w-full rounded-2xl" />
          ))}
        </div>
      ) : (
        <div className="max-w-2xl space-y-6">
          {/* Store Info */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-5">
              <Store className="w-5 h-5 text-[#004a38]" />
              <h2 className="font-semibold text-gray-900">Store Information</h2>
            </div>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label>Store Name</Label>
                <Input
                  value={form.storeName}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, storeName: e.target.value }))
                  }
                  data-ocid="adminp.settings.store_name_input"
                />
              </div>
              <div className="space-y-1.5">
                <Label>Contact Email</Label>
                <Input
                  type="email"
                  value={form.contactEmail}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, contactEmail: e.target.value }))
                  }
                  data-ocid="adminp.settings.contact_email_input"
                />
              </div>
              <div className="space-y-1.5">
                <Label>Contact Phone</Label>
                <Input
                  value={form.contactPhone}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, contactPhone: e.target.value }))
                  }
                  data-ocid="adminp.settings.contact_phone_input"
                />
              </div>
              <div className="space-y-1.5">
                <Label>WhatsApp Number</Label>
                <Input
                  value={form.whatsappNumber}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, whatsappNumber: e.target.value }))
                  }
                  data-ocid="adminp.settings.whatsapp_input"
                />
              </div>
              <div className="space-y-1.5">
                <Label>GST Number</Label>
                <Input
                  value={form.gstNumber}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, gstNumber: e.target.value }))
                  }
                  data-ocid="adminp.settings.gst_input"
                />
              </div>
              <div className="space-y-1.5">
                <Label>GST Rate (%)</Label>
                <Input
                  type="number"
                  min={0}
                  max={28}
                  value={form.gstRate}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, gstRate: Number(e.target.value) }))
                  }
                />
              </div>
            </div>
          </div>

          {/* Shipping */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-semibold text-gray-900 mb-5">Shipping</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Default Shipping (₹)</Label>
                <Input
                  type="number"
                  min={0}
                  value={form.shippingDefault}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      shippingDefault: Number(e.target.value),
                    }))
                  }
                />
              </div>
              <div className="space-y-1.5">
                <Label>Free Shipping From (₹)</Label>
                <Input
                  type="number"
                  min={0}
                  value={form.freeShippingThreshold}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      freeShippingThreshold: Number(e.target.value),
                    }))
                  }
                />
              </div>
            </div>
          </div>

          {/* Social & SEO */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-semibold text-gray-900 mb-5">
              Social Links & SEO
            </h2>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label>Facebook URL</Label>
                <Input
                  value={form.facebookUrl}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, facebookUrl: e.target.value }))
                  }
                  placeholder="https://facebook.com/forestheals"
                />
              </div>
              <div className="space-y-1.5">
                <Label>Instagram URL</Label>
                <Input
                  value={form.instagramUrl}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, instagramUrl: e.target.value }))
                  }
                  placeholder="https://instagram.com/forestheals"
                />
              </div>
              <div className="space-y-1.5">
                <Label>SEO Title</Label>
                <Input
                  value={form.seoTitle}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, seoTitle: e.target.value }))
                  }
                  data-ocid="adminp.settings.seo_title_input"
                />
              </div>
              <div className="space-y-1.5">
                <Label>SEO Description</Label>
                <Input
                  value={form.seoDescription}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, seoDescription: e.target.value }))
                  }
                  data-ocid="adminp.settings.seo_desc_input"
                />
              </div>
            </div>
          </div>

          {/* Localization */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-semibold text-gray-900 mb-5">Localization</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Currency</Label>
                <Input
                  value={form.currency}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, currency: e.target.value }))
                  }
                  data-ocid="adminp.settings.currency_input"
                />
              </div>
              <div className="space-y-1.5">
                <Label>Timezone</Label>
                <Input
                  value={form.timezone}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, timezone: e.target.value }))
                  }
                  data-ocid="adminp.settings.timezone_input"
                />
              </div>
            </div>
          </div>

          <Button
            className="bg-[#004a38] hover:bg-[#003a2c] w-full gap-2"
            onClick={() => void handleSave()}
            disabled={saveMutation.isPending}
            data-ocid="adminp.settings.submit_button"
          >
            <Save className="w-4 h-4" />{" "}
            {saveMutation.isPending ? "Saving…" : "Save All Settings"}
          </Button>
        </div>
      )}
    </AdminPLayout>
  );
}
