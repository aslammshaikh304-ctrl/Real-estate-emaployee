"use client";

import { supabase } from "@/lib/supabase";

export default function StageSelector({
  leadId,
  currentStage,
}: {
  leadId: number;
  currentStage: string;
}) {
  const updateStage = async (
    stage: string
  ) => {
    await supabase
      .from("leads")
      .update({ stage })
      .eq("id", leadId);

    window.location.reload();
  };

  return (
    <select
      value={currentStage || "New"}
      onChange={(e) =>
        updateStage(e.target.value)
      }
      className="border rounded p-2 mt-2 w-full"
    >
      <option value="New">New</option>
      <option value="Contacted">
        Contacted
      </option>
      <option value="Qualified">
        Qualified
      </option>
      <option value="Visit Scheduled">
        Visit Scheduled
      </option>
      <option value="Negotiation">
        Negotiation
      </option>
      <option value="Won">Won</option>
      <option value="Lost">Lost</option>
    </select>
  );
}