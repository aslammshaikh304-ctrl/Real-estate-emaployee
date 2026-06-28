import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default async function DashboardPage() {
  // KPI Cards

  const { count: totalLeads } = await supabase
    .from("leads")
    .select("*", { count: "exact", head: true });

  const { count: hotLeads } = await supabase
    .from("leads")
    .select("*", { count: "exact", head: true })
    .eq("ai_status", "Hot");

  const { count: scheduledVisits } = await supabase
    .from("site_visits")
    .select("*", { count: "exact", head: true })
    .eq("status", "Scheduled");

  const { count: totalFollowups } = await supabase
    .from("followups")
    .select("*", { count: "exact", head: true });

  const { count: pendingFollowups } = await supabase
    .from("followups")
    .select("*", { count: "exact", head: true })
    .eq("status", "Pending");

  const { count: completedFollowups } = await supabase
    .from("followups")
    .select("*", { count: "exact", head: true })
    .eq("status", "Completed");

  const { count: dealsWon } = await supabase
    .from("leads")
    .select("*", { count: "exact", head: true })
    .eq("stage", "Booked");

  const { count: lostDeals } = await supabase
    .from("leads")
    .select("*", { count: "exact", head: true })
    .eq("stage", "Lost");

  // Dashboard Data

  const { data: recentLeads } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(6);

  const { data: recentVisits } = await supabase
    .from("site_visits")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(4);

  const { data: hotLeadList } = await supabase
    .from("leads")
    .select("*")
    .eq("ai_status", "Hot")
    .order("ai_score", { ascending: false })
    .limit(4);

  const { data: followups } = await supabase
    .from("followups")
    .select("*")
    .eq("status", "Pending")
    .order("followup_date", { ascending: true })
    .limit(4);

  const { data: activities } = await supabase
    .from("activity_logs")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5);
// AI Sales Manager

const { data: aiManager } = await supabase
  .from("dashboard_ai")
  .select("*")
  .eq("id", 1)
  .single();

  return (
<div className="p-6">


      <div className="flex items-center justify-between mb-8">

        <div>
          <h1 className="text-3xl font-bold">
            Dashboard
          </h1>

          <p className="text-gray-500">
            Welcome back 👋
          </p>
        </div>

        <Link
          href="/leads"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl"
        >
          + Add Lead
        </Link>

      </div>

      {/* KPI Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-5 mb-8">

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-gray-500 text-sm">
            Total Leads
          </p>

          <h2 className="text-4xl font-bold mt-2">
            {totalLeads || 0}
          </h2>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-gray-500 text-sm">
            🔥 Hot Leads
          </p>

          <h2 className="text-4xl font-bold text-red-600 mt-2">
            {hotLeads || 0}
          </h2>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-gray-500 text-sm">
            📅 Site Visits
          </p>

          <h2 className="text-4xl font-bold text-blue-600 mt-2">
            {scheduledVisits || 0}
          </h2>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-gray-500 text-sm">
            📞 Total Follow Ups
          </p>

          <h2 className="text-4xl font-bold text-yellow-600 mt-2">
            {totalFollowups || 0}
          </h2>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-gray-500 text-sm">
            🏆 Deals Won
          </p>

          <h2 className="text-4xl font-bold text-green-600 mt-2">
            {dealsWon || 0}
          </h2>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-gray-500 text-sm">
            ❌ Lost Deals
          </p>

          <h2 className="text-4xl font-bold text-red-500 mt-2">
            {lostDeals || 0}
          </h2>
        </div>

      </div>

      {/* Main Content */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {/* Recent Leads */}

        <div className="border rounded-xl bg-white p-6 shadow-sm">

          <h2 className="text-xl font-bold mb-4">
            👥 Recent Leads
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

            {recentLeads?.map((lead) => (

              <Link
                key={lead.id}
                href={`/leads/${lead.id}`}
                className="border rounded-lg p-4 hover:bg-gray-50 transition"
              >

                <p className="font-semibold">
                  {lead.name}
                </p>

                <p className="text-sm text-gray-500">
                  📞 {lead.phone}
                </p>

                <p className="text-sm">
                  💰 {lead.budget}
                </p>

                <p className="text-xs text-blue-600 mt-2">
                  {lead.stage || "New"}
                </p>

              </Link>

            ))}

          </div>

        </div>

        {/* AI Insights */}

        <div className="border rounded-xl bg-white p-6 shadow-sm">

          <h2 className="text-xl font-bold mb-4">
            🤖 AI Insights
          </h2>

          <div className="space-y-4">

            <div className="border rounded-lg p-4">
              🔥 {hotLeads || 0} Hot Leads require attention
            </div>

            <div className="border rounded-lg p-4">
              📅 {scheduledVisits || 0} Site Visits scheduled
            </div>

            <div className="border rounded-lg p-4">
              📞 {pendingFollowups || 0} Pending Follow Ups
            </div>

            <div className="border rounded-lg p-4">
              ✅ {completedFollowups || 0} Completed Follow Ups
            </div>

            <div className="border rounded-lg p-4">
              🏆 {dealsWon || 0} Deals closed successfully
            </div>

          </div>

        </div>
      {/* Recent Site Visits */}

      <div className="border rounded-xl bg-white p-6 shadow-sm">

        <h2 className="text-xl font-bold mb-4">
          🏠 Recent Site Visits
        </h2>

        <div className="space-y-3">

          {recentVisits?.map((visit) => (

            <div
              key={visit.id}
              className="border rounded-lg p-4"
            >

              <p className="font-semibold">
                {visit.property_name}
              </p>

              <p className="text-sm text-gray-500">
                📅 {visit.visit_date}
              </p>

              <p className="text-sm">
                {visit.status}
              </p>

            </div>

          ))}

        </div>

      </div>

      {/* Pending Follow Ups */}

      <div className="border rounded-xl bg-white p-6 shadow-sm">

        <div className="flex items-center justify-between mb-4">

          <h2 className="text-xl font-bold">
            📞 Pending Follow Ups
          </h2>

          <span className="text-sm bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
            {pendingFollowups || 0}
          </span>

        </div>

        {followups && followups.length > 0 ? (

          <div className="space-y-3">

            {followups.map((item) => (

              <div
                key={item.id}
                className="border rounded-lg p-4 hover:bg-gray-50 transition"
              >

                <p className="font-medium">
                  {item.followup_message}
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  📅 {item.followup_date}
                </p>

                <span className="inline-block mt-3 px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs">
                  {item.status}
                </span>

              </div>

            ))}

          </div>

        ) : (

          <div className="border rounded-lg p-6 text-center text-gray-500">
            🎉 No Pending Follow Ups
          </div>

        )}

      </div>

    </div>

    {/* Bottom Grid */}

    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">

      {/* Hot Leads */}

      <div className="border rounded-xl bg-white p-6 shadow-sm">

        <div className="flex items-center justify-between mb-4">

          <h2 className="text-xl font-bold text-red-600">
            🔥 Top Hot Leads
          </h2>

          <span className="text-sm bg-red-100 text-red-600 px-3 py-1 rounded-full">
            {hotLeads || 0}
          </span>

        </div>

        <div className="space-y-3">

          {hotLeadList?.map((lead) => (

            <Link
              key={lead.id}
              href={`/leads/${lead.id}`}
              className="block border rounded-lg p-4 hover:bg-red-50 transition"
            >

              <div className="flex justify-between">

                <p className="font-semibold">
                  {lead.name}
                </p>

                <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">
                  {lead.ai_score}/100
                </span>

              </div>

              <p className="text-sm text-gray-500 mt-2">
                {lead.location}
              </p>

            </Link>

          ))}

        </div>

      </div>

      {/* Recent Activity */}

      <div className="border rounded-xl bg-white p-6 shadow-sm">

        <div className="flex items-center justify-between mb-4">

          <h2 className="text-xl font-bold">
            📜 Recent Activity
          </h2>

          <span className="text-sm text-gray-500">
            {activities?.length || 0} Events
          </span>

        </div>

        <div className="space-y-4">

          {activities?.map((activity) => (

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

          ))}

        </div>

      </div>

    </div>

  </div>
);
}