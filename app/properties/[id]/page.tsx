import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";

export default async function PropertyDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: property } = await supabase
    .from("properties")
    .select("*")
    .eq("id", id)
    .single();

  if (!property) {
    notFound();
  }

  const { data: matchingLeads } = await supabase
    .from("leads")
    .select("*")
    .ilike("location", `%${property.location}%`);

  return (
    <div className="p-6 space-y-6">
      {/* Property Card */}
      <div className="border rounded-xl p-6 bg-white shadow-sm">
        <h1 className="text-3xl font-bold">
          🏢 {property.name}
        </h1>

        <div className="mt-4 space-y-2">
          <p>📍 {property.location}</p>
          <p>🏠 {property.bhk} BHK</p>

          <p>
            💰 ₹
            {Number(property.price || 0).toLocaleString()}
          </p>

          <p>📝 {property.description}</p>
        </div>
      </div>

      {/* Matching Leads */}
      <div className="border rounded-xl p-6 bg-white shadow-sm">
        <h2 className="text-xl font-bold mb-4">
          🎯 Matching Leads
        </h2>

        {matchingLeads?.length === 0 ? (
          <div className="border rounded-lg p-4 text-gray-500">
            No matching leads found
          </div>
        ) : (
          <div className="space-y-3">
            {matchingLeads?.map((lead) => (
              <div
                key={lead.id}
                className="border rounded-lg p-4 hover:shadow-md transition"
              >
                <p className="font-semibold text-lg">
                  {lead.name}
                </p>

                <p>📞 {lead.phone}</p>
                <p>📍 {lead.location}</p>
                <p>💰 Budget: {lead.budget}</p>

                <span className="inline-block mt-3 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm">
                  Potential Match
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}