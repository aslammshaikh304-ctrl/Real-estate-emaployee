import { supabase } from "@/lib/supabase";

export default async function FollowupsPage() {
  const { data: followups } = await supabase
    .from("followups")
    .select("*")
    .order("followup_date", {
      ascending: true,
    });

  const { data: leads } = await supabase
    .from("leads")
    .select("*");

  const today = new Date();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Follow Ups
      </h1>

      <div className="grid gap-4">

        {followups?.map((item) => {
          const lead = leads?.find(
            (l) => l.id === item.lead_id
          );

          const overdue =
            !item.completed &&
            new Date(item.followup_date) <
              today;

          return (
            <div
              key={item.id}
              className={`border rounded-xl p-5 ${
                overdue
                  ? "border-red-500 bg-red-50"
                  : ""
              }`}
            >
              <div className="flex justify-between items-start">

                <div>
                  <h2 className="font-bold text-lg">
                    📞 Follow Up
                  </h2>

                  <p className="mt-2">
                    👤 {lead?.name}
                  </p>

                  <p>
                    📧 {lead?.email}
                  </p>

                  <p>
                    📱 {lead?.phone}
                  </p>

                  <p className="mt-3">
                    💬 {item.followup_message}
                  </p>

                  <p>
                    📅 {item.followup_date}
                  </p>
                </div>

                <div className="flex flex-col gap-2 items-end">

                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      item.priority ===
                      "High"
                        ? "bg-red-100 text-red-700"
                        : item.priority ===
                          "Medium"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {item.priority ||
                      "Medium"}
                  </span>

                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      item.completed
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {item.completed
                      ? "Completed"
                      : "Pending"}
                  </span>

                  {overdue && (
                    <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-sm">
                      Overdue
                    </span>
                  )}
                </div>

              </div>
            </div>
          );
        })}

      </div>
    </div>
  );
}