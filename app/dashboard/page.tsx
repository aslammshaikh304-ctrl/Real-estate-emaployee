import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default async function DashboardPage() {
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

  const { count: pendingFollowups } = await supabase
    .from("followups")
    .select("*", { count: "exact", head: true })
    .eq("status", "Pending");

  const { data: recentLeads } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5);

  const { data: recentVisits } = await supabase
    .from("site_visits")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5);

  const { data: hotLeadList } = await supabase
    .from("leads")
    .select("*")
    .eq("ai_status", "Hot")
    .order("ai_score", { ascending: false })
    .limit(5);

  const { data: followups } = await supabase
    .from("followups")
    .select("*")
    .eq("status", "Pending")
    .order("followup_date", { ascending: true })
    .limit(5);

    const { data: activities } = await supabase
  .from("activity_logs")
  .select("*")
  .order("created_at", {
    ascending: false,
  })
  .limit(5);

  return (
    <div className="p-6">

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <Link
          href="/leads"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          + Add Lead
        </Link>
      </div>

      {/* Stats */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

        <div className="border rounded-xl p-6 bg-white">
          <p className="text-gray-500">
            Total Leads
          </p>

          <h2 className="text-4xl font-bold">
            {totalLeads || 0}
          </h2>
        </div>

        <div className="border rounded-xl p-6 bg-white">
          <p className="text-gray-500">
            Hot Leads
          </p>

          <h2 className="text-4xl font-bold text-red-600">
            {hotLeads || 0}
          </h2>
        </div>

        <div className="border rounded-xl p-6 bg-white">
          <p className="text-gray-500">
            Scheduled Visits
          </p>

          <h2 className="text-4xl font-bold text-blue-600">
            {scheduledVisits || 0}
          </h2>
        </div>

        <div className="border rounded-xl p-6 bg-white">
          <p className="text-gray-500">
            Pending Follow Ups
          </p>

          <h2 className="text-4xl font-bold text-yellow-600">
            {pendingFollowups || 0}
          </h2>
        </div>

      </div>

      {/* Main Grid */}

      <div className="grid lg:grid-cols-2 gap-6">

        {/* Recent Leads */}

        <div className="border rounded-xl p-6 bg-white">
          <h2 className="text-xl font-bold mb-4">
            Recent Leads
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

            {recentLeads?.map((lead) => (
              <Link
                key={lead.id}
                href={`/leads/${lead.id}`}
                className="block border rounded-lg p-3 hover:bg-gray-50"
              >
                <p className="font-semibold">
                  {lead.name}
                </p>

                <p className="text-sm text-gray-500">
                  📞 {lead.phone}
                </p>

                <p className="text-sm">
                  💰 Budget: {lead.budget}
                </p>
              </Link>
            ))}

          </div>
        </div>

        {/* Site Visits */}

        <div className="border rounded-xl p-6 bg-white">
          <h2 className="text-xl font-bold mb-4">
            Recent Site Visits
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

            {recentVisits?.map((visit) => (
              <div
                key={visit.id}
                className="border rounded-lg p-4"
              >
                <p className="font-semibold">
                  🏢 {visit.property_name}
                </p>

                <p className="text-sm">
                  📅 {visit.visit_date}
                </p>

                <p className="text-sm">
                  📌 {visit.status}
                </p>
              </div>
            ))}

          </div>
        </div>

        {/* Hot Leads */}

        <div className="border rounded-xl p-6 bg-white">
          <h2 className="text-xl font-bold mb-4 text-red-600">
            🔥 Hot Leads
          </h2>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

            {hotLeadList?.map((lead) => (
              <Link
                key={lead.id}
                href={`/leads/${lead.id}`}
                className="block border rounded-lg p-4 hover:bg-red-50"
              >
                <p className="font-semibold">
                  {lead.name}
                </p>

                <p>
                  Score: {lead.ai_score || 0}/100
                </p>
              </Link>
            ))}

          </div>
        </div>

        {/* Pending Followups */}

        <div className="border rounded-xl p-6 bg-white">
          <h2 className="text-xl font-bold mb-4 text-yellow-600">
            📞 Pending Follow Ups
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

            {followups?.map((item) => (
              <div
                key={item.id}
                className="border rounded-lg p-4"
              >
                <p className="font-medium">
                  {item.followup_message}
                </p>

                <p className="text-sm text-gray-500">
                  {item.followup_date}
                </p>
              </div>
            ))}

          </div>
        </div>

      </div>
      {/* Main Grid */}

      <div className="grid lg:grid-cols-2 gap-6">

        {/* Recent Leads */}

        <div className="border rounded-xl p-6 bg-white">
          <h2 className="text-xl font-bold mb-4">
            Recent Leads
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

            {recentLeads?.map((lead) => (
              <Link
                key={lead.id}
                href={`/leads/${lead.id}`}
                className="block border rounded-lg p-3 hover:bg-gray-50"
              >
                <p className="font-semibold">
                  {lead.name}
                </p>

                <p className="text-sm text-gray-500">
                  📞 {lead.phone}
                </p>

                <p className="text-sm">
                  💰 Budget: {lead.budget}
                </p>
              </Link>
            ))}

          </div>
        </div>

        {/* Site Visits */}

        <div className="border rounded-xl p-6 bg-white">
          <h2 className="text-xl font-bold mb-4">
            Recent Site Visits
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

            {recentVisits?.map((visit) => (
              <div
                key={visit.id}
                className="border rounded-lg p-4"
              >
                <p className="font-semibold">
                  🏢 {visit.property_name}
                </p>

                <p className="text-sm">
                  📅 {visit.visit_date}
                </p>

                <p className="text-sm">
                  📌 {visit.status}
                </p>
              </div>
            ))}

          </div>
        </div>

        {/* Hot Leads */}

        <div className="border rounded-xl p-6 bg-white">
          <h2 className="text-xl font-bold mb-4 text-red-600">
            🔥 Hot Leads
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

            {hotLeadList?.map((lead) => (
              <Link
                key={lead.id}
                href={`/leads/${lead.id}`}
                className="block border rounded-lg p-4 hover:bg-red-50"
              >
                <p className="font-semibold">
                  {lead.name}
                </p>

                <p>
                  Score: {lead.ai_score || 0}/100
                </p>
              </Link>
            ))}

          </div>
        </div>

        {/* Pending Followups */}

        <div className="border rounded-xl p-6 bg-white">
          <h2 className="text-xl font-bold mb-4 text-yellow-600">
            📞 Pending Follow Ups
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

            {followups?.map((item) => (
              <div
                key={item.id}
                className="border rounded-lg p-4"
              >
                <p className="font-medium">
                  {item.followup_message}
                </p>

                <p className="text-sm text-gray-500">
                  {item.followup_date}
                </p>
              </div>
            ))}

          </div>
        </div>

      </div>

      {/* Recent Activity */}

      <div className="border rounded-xl p-6 bg-white shadow-sm mt-6">

        <h2 className="text-xl font-bold mb-4">
          📜 Recent Activity
        </h2>

        {!activities ||
        activities.length === 0 ? (
          <p className="text-gray-500">
            No activity found
          </p>
        ) : (
          <div className="space-y-4">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="border-l-4 border-blue-500 pl-4 py-2"
              >
                <p className="font-semibold">
                  {activity.activity_type}
                </p>

                <p>
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
        )}

      </div>
    </div>
  );
}