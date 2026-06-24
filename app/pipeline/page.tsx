import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default async function PipelinePage() {
  const { data: leads } = await supabase
    .from("leads")
    .select("*");

  const stages = [
    "New",
    "Contacted",
    "Site Visit Scheduled",
    "Negotiation",
    "Booked",
    "Lost",
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        📊 Sales Pipeline
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4">

        {stages.map((stage) => {
          const stageLeads =
            leads?.filter(
              (lead) => lead.stage === stage
            ) || [];

          return (
            <div
              key={stage}
              className="border rounded-xl bg-white p-4"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold">
                  {stage}
                </h2>

                <span className="bg-gray-100 px-2 py-1 rounded text-sm">
                  {stageLeads.length}
                </span>
              </div>

              <div className="space-y-3">
                {stageLeads.map((lead) => (
                  <Link
                    key={lead.id}
                    href={`/leads/${lead.id}`}
                    className="block border rounded-lg p-3 hover:shadow-md transition"
                  >
                    <p className="font-semibold">
                      {lead.name}
                    </p>

                    <p className="text-sm text-gray-500">
                      {lead.phone}
                    </p>

                    <p className="text-sm">
                      💰 {lead.budget}
                    </p>

                    <p className="text-xs text-gray-400 mt-2">
                      {lead.ai_status}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}

      </div>
    </div>
  );
}