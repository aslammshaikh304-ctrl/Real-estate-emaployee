import Link from "next/link";
import { supabase } from "@/lib/supabase";
import StageActions from "@/components/leads/stage-actions";

export default async function LeadDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: lead } = await supabase
    .from("leads")
    .select("*")
    .eq("id", id)
    .single();

  if (!lead) {
    return (
      <div className="p-6">
        Lead not found
      </div>
    );
  }

  const { data: activities } = await supabase
    .from("activity_logs")
    .select("*")
    .eq("lead_id", id)
    .order("created_at", {
      ascending: false,
    });

  const { data: properties } = await supabase
    .from("properties")
    .select("*");

  const leadBudget =
    Number(
      String(lead.budget || "0").replace(
        /[^0-9]/g,
        ""
      )
    ) || 0;

  const recommendedProperties =
    properties
      ?.map((property) => {
        let score = 0;

        if (
          property.location
            ?.toLowerCase()
            .includes(
              lead.location?.toLowerCase() || ""
            )
        ) {
          score += 40;
        }

        if (
          lead.message
            ?.toLowerCase()
            .includes(
              property.bhk?.toLowerCase()
            )
        ) {
          score += 30;
        }

        if (
          leadBudget > 0 &&
          Number(property.price) <= leadBudget
        ) {
          score += 30;
        }

        return {
          ...property,
          score,
        };
      })
      .filter((property) => property.score > 0)
      .sort((a, b) => b.score - a.score);

  return (
    <div className="p-6 space-y-6">

      {/* Lead Details */}

      <div className="border rounded-xl p-6 bg-white shadow-sm">
        <h1 className="text-3xl font-bold mb-6">
          {lead.name}
        </h1>

        <div className="space-y-3">

          <p>📧 {lead.email}</p>

          <p>📞 {lead.phone}</p>

          <p>📍 {lead.location}</p>

          <p>
            💰 Budget: {lead.budget}
          </p>

          <p>
            🎯 AI Score: {lead.ai_score || 0}
          </p>

          <p>
            🔥 Status: {lead.ai_status || "Pending"}
          </p>

          <p>
            📋 Summary: {lead.ai_summary}
          </p>

          <p>
            📝 Requirement: {lead.message}
          </p>

          <p>
            📈 Pipeline:
            {" "}
            <span className="font-semibold text-blue-600">
              {lead.stage || "New"}
            </span>
          </p>

          <StageActions leadId={lead.id} />

        </div>
      </div>

      {/* Recommended Properties */}

      <div className="border rounded-xl p-6 bg-white shadow-sm">

        <h2 className="text-2xl font-bold mb-4">
          🎯 Recommended Properties
        </h2>

        {!recommendedProperties ||
        recommendedProperties.length === 0 ? (
          <div className="border rounded-lg p-6 text-center text-gray-500">
            No matching properties found
          </div>
        ) : (
          <div className="grid gap-4">

            {recommendedProperties.map(
              (property) => (
                <Link
                  key={property.id}
                  href={`/properties/${property.id}`}
                  className="border rounded-xl p-4 hover:shadow-lg transition"
                >
                  <h3 className="font-bold text-lg mb-2">
                    🏢 {property.name}
                  </h3>

                  <div className="space-y-1">
                    <p>
                      📍 {property.location}
                    </p>

                    <p>
                      🏠 {property.bhk}
                    </p>

                    <p>
                      💰 ₹
                      {Number(
                        property.price
                      ).toLocaleString()}
                    </p>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">

                    <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">
                      Match Score: {property.score}/100
                    </span>

                    {property.score >= 90 && (
                      <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm">
                        Excellent Match
                      </span>
                    )}

                    {property.score >= 70 &&
                      property.score < 90 && (
                        <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-sm">
                          Good Match
                        </span>
                      )}

                    {property.score >= 50 &&
                      property.score < 70 && (
                        <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-sm">
                          Possible Match
                        </span>
                      )}

                  </div>
                </Link>
              )
            )}

          </div>
        )}

      </div>

      {/* Activity Timeline */}

      <div className="border rounded-xl p-6 bg-white shadow-sm">

        <h2 className="text-2xl font-bold mb-4">
          📜 Activity Timeline
        </h2>

        <div className="space-y-4">

          {!activities ||
          activities.length === 0 ? (
            <p className="text-gray-500">
              No activities found
            </p>
          ) : (
            activities.map((activity) => (
              <div
                key={activity.id}
                className="border-l-4 border-blue-500 pl-4 py-2"
              >
                <p className="font-semibold">
                  {activity.activity_type}
                </p>

                <p className="text-gray-700">
                  {activity.activity_message}
                </p>

                <p className="text-sm text-gray-500">
                  {new Date(
                    activity.created_at
                  ).toLocaleString()}
                </p>
              </div>
            ))
          )}

        </div>

      </div>

    </div>
  );
}