"use server";

import { supabase } from "@/lib/supabase";

export async function logActivity(
  leadId: number,
  type: string,
  message: string
) {
  const { error } = await supabase
    .from("activity_logs")
    .insert({
      lead_id: leadId,
      activity_type: type,
      activity_message: message,
    });

  if (error) {
    console.error(error);
  }
}