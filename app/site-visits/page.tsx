import { supabase } from "@/lib/supabase";
import AddSiteVisitForm from "@/components/site-visits/add-site-visit-form";

export default async function SiteVisitsPage() {
  const { data: visits } = await supabase
    .from("site_visits")
    .select("*")
    .order("visit_date", { ascending: true });

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Site Visits
      </h1>

      <AddSiteVisitForm />

      <div className="grid gap-4 mt-6">
        {visits?.map((visit) => (
          <div
            key={visit.id}
            className="border rounded-lg p-4"
          >
            <h2 className="text-lg font-semibold">
              🏢 {visit.property_name}
            </h2>

            <p>📅 Date: {visit.visit_date}</p>
            <p>⏰ Time: {visit.visit_time}</p>

            <div className="mt-3">
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                  visit.status === "Completed"
                    ? "bg-green-100 text-green-700"
                    : visit.status === "Scheduled"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {visit.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}