import { supabase } from "@/lib/supabase";

export default async function SettingsPage() {
  const { data: settings } = await supabase
    .from("settings")
    .select("*")
    .single();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Settings
      </h1>

      <div className="grid gap-6">

        <div className="border rounded-xl p-6 bg-white">
          <h2 className="text-xl font-semibold mb-4">
            Company Information
          </h2>

          <div className="space-y-3">
            <p>
              <strong>Company:</strong>{" "}
              {settings?.company_name}
            </p>

            <p>
              <strong>Email:</strong>{" "}
              {settings?.company_email}
            </p>

            <p>
              <strong>WhatsApp:</strong>{" "}
              {settings?.whatsapp_number}
            </p>
          </div>
        </div>

        <div className="border rounded-xl p-6 bg-white">
          <h2 className="text-xl font-semibold mb-4">
            AI Scoring Rules
          </h2>

          <div className="space-y-3">
            <p>
              🔥 Hot Lead Score:{" "}
              {settings?.hot_score}
            </p>

            <p>
              🟡 Warm Lead Score:{" "}
              {settings?.warm_score}
            </p>

            <p>
              🔵 Cold Lead Score: Below{" "}
              {settings?.warm_score}
            </p>
          </div>
        </div>

        <div className="border rounded-xl p-6 bg-white">
          <h2 className="text-xl font-semibold mb-4">
            Notifications
          </h2>

          <div className="space-y-3">

            <p>
              {settings?.email_followups
                ? "✅"
                : "❌"}{" "}
              Email Follow Ups
            </p>

            <p>
              {settings?.visit_reminders
                ? "✅"
                : "❌"}{" "}
              Site Visit Reminders
            </p>

            <p>
              {settings?.new_lead_alerts
                ? "✅"
                : "❌"}{" "}
              New Lead Alerts
            </p>

          </div>
        </div>

      </div>
    </div>
  );
}