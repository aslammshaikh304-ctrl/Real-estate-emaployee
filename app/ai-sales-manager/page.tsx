import { supabase } from "@/lib/supabase";

export default async function AISalesManager() {

  const { data: dashboard } = await supabase
    .from("dashboard_ai")
    .select("*")
    .eq("id", 1)
    .single();

  if (!dashboard) {
    return (
      <div className="p-8">
        No AI Dashboard Generated Yet
      </div>
    );
  }

  return (

    <div className="p-8 space-y-8">

      <div>

        <h1 className="text-4xl font-bold">
          🤖 AI Sales Manager
        </h1>

        <p className="text-gray-500 mt-2">
          Last Generated:
          {" "}
          {new Date(
            dashboard.generated_at
          ).toLocaleString()}
        </p>

      </div>
      {/* KPI Cards */}

<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

  <div className="rounded-xl border bg-white p-6 shadow-sm">
    <p className="text-gray-500 text-sm">
      🔥 Priority Leads
    </p>

    <h2 className="text-4xl font-bold mt-2">
      {dashboard.priority_leads?.length || 0}
    </h2>
  </div>

  <div className="rounded-xl border bg-white p-6 shadow-sm">
    <p className="text-gray-500 text-sm">
      📋 Today's Tasks
    </p>

    <h2 className="text-4xl font-bold mt-2">
      {dashboard.today_tasks?.length || 0}
    </h2>
  </div>

  <div className="rounded-xl border bg-white p-6 shadow-sm">
    <p className="text-gray-500 text-sm">
      ⚠️ Overdue Tasks
    </p>

    <h2 className="text-4xl font-bold mt-2">
      {dashboard.overdue_tasks?.length || 0}
    </h2>
  </div>

  <div className="rounded-xl border bg-white p-6 shadow-sm">
    <p className="text-gray-500 text-sm">
      🏠 Upcoming Visits
    </p>

    <h2 className="text-4xl font-bold mt-2">
      {dashboard.upcoming_site_visits?.length || 0}
    </h2>
  </div>

</div>
{/* Main AI Section */}

<div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

  {/* Priority Leads */}

  <div className="rounded-xl border bg-white p-6 shadow-sm">

    <h2 className="text-2xl font-bold mb-6">
      🔥 Priority Leads
    </h2>

    <div className="space-y-4">

      {dashboard.priority_leads?.map((lead: any, index: number) => (

        <div
          key={index}
          className="border rounded-lg p-4 hover:bg-gray-50 transition"
        >

          <div className="flex justify-between">

            <h3 className="font-semibold text-lg">
              {lead.name}
            </h3>

            <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm">
              {lead.score}/100
            </span>

          </div>

          <p className="text-gray-600 mt-3">
            {lead.reason}
          </p>

        </div>

      ))}

    </div>

  </div>

  {/* Today's Tasks */}

  <div className="rounded-xl border bg-white p-6 shadow-sm">

    <h2 className="text-2xl font-bold mb-6">
      📋 Today's Tasks
    </h2>

    <div className="space-y-3">

      {dashboard.today_tasks?.map((task: string, index: number) => (

        <div
          key={index}
          className="flex items-start gap-3 border rounded-lg p-4"
        >

          <div className="text-green-600 text-xl">
            ✓
          </div>

          <p>
            {task}
          </p>

        </div>

      ))}

    </div>

  </div>

</div>
<div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

  {/* AI Recommendations */}

  <div className="rounded-xl border bg-white p-6 shadow-sm">

    <h2 className="text-2xl font-bold mb-6">
      💡 AI Recommendations
    </h2>

    <div className="space-y-3">

      {dashboard.ai_recommendations?.map((item: string, index: number) => (

        <div
          key={index}
          className="border rounded-lg p-4 bg-blue-50"
        >
          {item}
        </div>

      ))}

    </div>

  </div>

  {/* Sales Forecast */}

  <div className="rounded-xl border bg-white p-6 shadow-sm">

    <h2 className="text-2xl font-bold mb-6">
      📈 Sales Forecast
    </h2>

    <div className="space-y-5">

      <div className="flex justify-between">
        <span>🔥 Hot Leads</span>
        <strong>{dashboard.sales_forecast?.hot_leads}</strong>
      </div>

      <div className="flex justify-between">
        <span>🟡 Warm Leads</span>
        <strong>{dashboard.sales_forecast?.warm_leads}</strong>
      </div>

      <div className="flex justify-between">
        <span>🔵 Cold Leads</span>
        <strong>{dashboard.sales_forecast?.cold_leads}</strong>
      </div>

      <hr />

      <div className="flex justify-between text-xl font-bold">
        <span>Expected Revenue</span>
        <span>
          $ {dashboard.sales_forecast?.expected_revenue}
        </span>
      </div>

    </div>

  </div>

</div>
<div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

  {/* Upcoming Site Visits */}

  <div className="rounded-xl border bg-white p-6 shadow-sm">

    <h2 className="text-2xl font-bold mb-6">
      🏠 Upcoming Site Visits
    </h2>

    <div className="space-y-3">

      {dashboard.upcoming_site_visits?.map((visit: any, index: number) => (

        <div
          key={index}
          className="border rounded-lg p-4"
        >

          <div className="font-semibold">
            {visit.property_name}
          </div>

          <div className="text-gray-500">
            {visit.date}
          </div>

        </div>

      ))}

    </div>

  </div>

  {/* Overdue Tasks */}

  <div className="rounded-xl border bg-white p-6 shadow-sm">

    <h2 className="text-2xl font-bold mb-6">
      ⚠️ Overdue Tasks
    </h2>

    <div className="space-y-3">

      {dashboard.overdue_tasks?.map((task: string, index: number) => (

        <div
          key={index}
          className="border rounded-lg p-4 bg-red-50"
        >
          {task}
        </div>

      ))}

    </div>

  </div>

</div>

    </div>

  );

}