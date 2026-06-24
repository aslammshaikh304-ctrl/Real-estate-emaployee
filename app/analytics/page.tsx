import { supabase } from "@/lib/supabase";

export default async function AnalyticsPage() {
  const { count: totalLeads } = await supabase
    .from("leads")
    .select("*", { count: "exact", head: true });

  const { count: hotLeads } = await supabase
    .from("leads")
    .select("*", { count: "exact", head: true })
    .eq("ai_status", "Hot");

  const { count: warmLeads } = await supabase
    .from("leads")
    .select("*", { count: "exact", head: true })
    .eq("ai_status", "Warm");

  const { count: coldLeads } = await supabase
    .from("leads")
    .select("*", { count: "exact", head: true })
    .eq("ai_status", "Cold");

  const { count: siteVisits } = await supabase
    .from("site_visits")
    .select("*", { count: "exact", head: true });

  const { count: followups } = await supabase
    .from("followups")
    .select("*", { count: "exact", head: true })
    .eq("status", "Pending");

  const hotPercent = totalLeads
    ? Math.round(((hotLeads || 0) / totalLeads) * 100)
    : 0;

  const visitPercent = totalLeads
    ? Math.round(((siteVisits || 0) / totalLeads) * 100)
    : 0;

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        Analytics
      </h1>

      {/* KPI Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">

        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <p className="text-gray-500 text-sm">
            Total Leads
          </p>

          <h2 className="text-4xl font-bold mt-2">
            {totalLeads || 0}
          </h2>
        </div>

        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <p className="text-gray-500 text-sm">
            Hot Lead Ratio
          </p>

          <h2 className="text-4xl font-bold text-red-600 mt-2">
            {hotPercent}%
          </h2>
        </div>

        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <p className="text-gray-500 text-sm">
            Visit Conversion
          </p>

          <h2 className="text-4xl font-bold text-blue-600 mt-2">
            {visitPercent}%
          </h2>
        </div>

      </div>

      {/* Conversion Pipeline */}

      <div className="bg-white border rounded-xl p-6 mb-8">

        <h2 className="text-xl font-bold mb-6">
          Sales Pipeline
        </h2>

        <div className="space-y-6">

          <div>
            <div className="flex justify-between mb-2">
              <span>Total Leads</span>
              <span>{totalLeads || 0}</span>
            </div>

            <div className="w-full h-4 bg-gray-200 rounded-full">
              <div
                className="h-4 bg-black rounded-full"
                style={{ width: "100%" }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span>🔥 Hot Leads</span>
              <span>{hotLeads || 0}</span>
            </div>

            <div className="w-full h-4 bg-gray-200 rounded-full">
              <div
                className="h-4 bg-red-500 rounded-full"
                style={{
                  width: `${hotPercent}%`,
                }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span>🏢 Site Visits</span>
              <span>{siteVisits || 0}</span>
            </div>

            <div className="w-full h-4 bg-gray-200 rounded-full">
              <div
                className="h-4 bg-blue-500 rounded-full"
                style={{
                  width: `${visitPercent}%`,
                }}
              />
            </div>
          </div>

        </div>

      </div>

      {/* Lead Breakdown */}

      <div className="grid md:grid-cols-2 gap-6">

        <div className="bg-white border rounded-xl p-6">

          <h2 className="text-xl font-bold mb-4">
            Lead Quality
          </h2>

          <div className="space-y-4">

            <div className="flex justify-between p-4 border rounded-lg">
              <span>🔥 Hot Leads</span>
              <span>{hotLeads || 0}</span>
            </div>

            <div className="flex justify-between p-4 border rounded-lg">
              <span>🟡 Warm Leads</span>
              <span>{warmLeads || 0}</span>
            </div>

            <div className="flex justify-between p-4 border rounded-lg">
              <span>🔵 Cold Leads</span>
              <span>{coldLeads || 0}</span>
            </div>

          </div>

        </div>

        <div className="bg-white border rounded-xl p-6">

          <h2 className="text-xl font-bold mb-4">
            Activity Overview
          </h2>

          <div className="space-y-4">

            <div className="flex justify-between p-4 border rounded-lg">
              <span>🏢 Site Visits</span>
              <span>{siteVisits || 0}</span>
            </div>

            <div className="flex justify-between p-4 border rounded-lg">
              <span>📞 Pending Follow Ups</span>
              <span>{followups || 0}</span>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}