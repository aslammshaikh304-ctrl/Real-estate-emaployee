import Link from "next/link";
import AddLeadForm from "@/components/leads/add-lead-form";
import { supabase } from "@/lib/supabase";

export default async function LeadsPage() {
  const { data: leads } = await supabase
    .from("leads")
    .select("*")
    .order("id", { ascending: false });

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Leads
      </h1>
      <AddLeadForm />
      <div className="grid gap-4 mt-6">
        {leads?.map((lead) => (
          <div
            key={lead.id}
            className="border rounded-lg p-4 bg-white shadow-sm"
          >
            <Link
              href={`/leads/${lead.id}`}
              className="font-semibold text-lg text-blue-600 hover:underline"
            >
              {lead.name}
            </Link>

            {lead.email && (
              <p className="mt-2">
                📧 {lead.email}
              </p>
            )}

            <p>📞 {lead.phone}</p>

            <p>📍 {lead.location}</p>

            <p>💰 {lead.budget}</p>

            {lead.followup_message && (
              <div className="mt-3 pt-3 border-t">
                <p className="font-medium">
                  💬 Follow Up Message
                </p>

                <p className="text-sm text-gray-600 mt-1">
                  {lead.followup_message}
                </p>
              </div>
            )}

            {lead.message && (
              <p className="mt-2">
                📝 {lead.message}
              </p>
            )}

            <div className="mt-3 border-t pt-3">
              <p className="font-medium">
                🤖 AI Score: {lead.ai_score || 0}/100
              </p>

              <div className="mt-2">
                {lead.ai_status === "Hot" && (
                  <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-sm font-medium">
                    🔥 Hot
                  </span>
                )}

                {lead.ai_status === "Warm" && (
                  <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-sm font-medium">
                    🟡 Warm
                  </span>
                )}

                {lead.ai_status === "Cold" && (
                  <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
                    🔵 Cold
                  </span>
                )}

                {!lead.ai_status && (
                  <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm font-medium">
                    ⏳ Pending
                  </span>
                )}
              </div>

              <p className="mt-2">
                📋 Summary:{" "}
                {lead.ai_summary ??
                  "Waiting for AI analysis"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}