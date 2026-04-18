import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save, Store } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { AdminPLayout } from "./AdminPLayout";
import { useAdminPStore } from "./adminpStore";

export default function AdminPSettings() {
  const settings = useAdminPStore((s) => s.settings);
  const updateSettings = useAdminPStore((s) => s.updateSettings);
  const [form, setForm] = useState({ ...settings });

  function handleSave() {
    updateSettings(form);
    toast.success("Settings saved successfully!");
  }

  return (
    <AdminPLayout
      title="Store Settings"
      subtitle="Configure your store preferences and details"
      actions={
        <Button
          size="sm"
          className="gap-1 bg-[#004a38] hover:bg-[#003a2c]"
          onClick={handleSave}
          data-ocid="adminp.settings.save_button"
        >
          <Save className="w-4 h-4" /> Save Settings
        </Button>
      }
    >
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
              <Label>GST Number</Label>
              <Input
                value={form.gstNumber}
                onChange={(e) =>
                  setForm((f) => ({ ...f, gstNumber: e.target.value }))
                }
                data-ocid="adminp.settings.gst_input"
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

        {/* Admin Credentials Info */}
        <div className="bg-green-50 border border-green-200 rounded-2xl p-5">
          <h3 className="font-semibold text-green-900 text-sm mb-2">
            Admin Panel Credentials
          </h3>
          <div className="space-y-1 text-sm text-green-800">
            <p>
              <strong>Username:</strong> forestheals
            </p>
            <p>
              <strong>Password:</strong> domex@1000
            </p>
            <p>
              <strong>Access URL:</strong> /admin-p
            </p>
          </div>
          <p className="text-xs text-green-600 mt-3">
            To change credentials, update the values in AdminPLoginPage.tsx and
            adminpStore.ts.
          </p>
        </div>

        <Button
          className="bg-[#004a38] hover:bg-[#003a2c] w-full gap-2"
          onClick={handleSave}
          data-ocid="adminp.settings.submit_button"
        >
          <Save className="w-4 h-4" /> Save All Settings
        </Button>
      </div>
    </AdminPLayout>
  );
}
