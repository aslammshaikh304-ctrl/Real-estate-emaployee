"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export async function updateStage(
  leadId: number,
  stage: string
) {
  // Update Lead Stage

  const { error } = await supabase
    .from("leads")
    .update({ stage })
    .eq("id", leadId);

  if (error) {
    throw new Error(error.message);
  }

  // Activity Log

  await supabase
    .from("activity_logs")
    .insert({
      lead_id: leadId,
      activity_type: "Stage Changed",
      activity_message: `Lead moved to ${stage}`,
    });

  // Follow Up Automation

  let followupMessage = "";
  let followupDate = new Date();

  if (stage === "Contacted") {
    followupMessage =
      "Follow up after first contact";
    followupDate.setDate(
      followupDate.getDate() + 1
    );
  }

  if (stage === "Site Visit Scheduled") {
    followupMessage =
      "Confirm site visit with client";
    followupDate.setDate(
      followupDate.getDate() + 1
    );
  }

  if (stage === "Negotiation") {
    followupMessage =
      "Discuss pricing and close deal";
    followupDate.setDate(
      followupDate.getDate() + 2
    );
  }

  if (
    stage === "Contacted" ||
    stage === "Site Visit Scheduled" ||
    stage === "Negotiation"
  ) {
    await supabase
      .from("followups")
      .insert({
        lead_id: leadId,
        followup_message: followupMessage,
        followup_date:
          followupDate.toISOString().split("T")[0],
        status: "Pending",
        priority: "Medium",
        completed: false,
      });
  }

  // Booked

  if (stage === "Booked") {
    await supabase
      .from("followups")
      .update({
        completed: true,
        status: "Completed",
      })
      .eq("lead_id", leadId);
  }

  // Lost

  if (stage === "Lost") {
    await supabase
      .from("followups")
      .update({
        completed: true,
        status: "Closed",
      })
      .eq("lead_id", leadId);
  }

  revalidatePath(`/leads/${leadId}`);
  revalidatePath("/leads");
  revalidatePath("/pipeline");
  revalidatePath("/followups");
  revalidatePath("/dashboard");
}