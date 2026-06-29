import { supabase } from "@/lib/supabase";
import CalendarClient from "@/components/calendar/CalendarClient";

export default async function CalendarPage() {
  const { data: visits } = await supabase
    .from("site_visits")
    .select("*");

  const { data: followups } = await supabase
    .from("followups")
    .select("*");

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        📅 Calendar
      </h1>

      <CalendarClient
        visits={visits || []}
        followups={followups || []}
      />

    </div>
  );
}