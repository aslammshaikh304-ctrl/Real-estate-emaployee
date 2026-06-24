"use client";

import { useTransition } from "react";
import { updateStage } from "@/app/actions/update-stage";

export default function StageActions({
  leadId,
}: {
  leadId: number;
}) {
  const [pending, startTransition] =
    useTransition();

  const handleUpdate = (stage: string) => {
    startTransition(async () => {
      await updateStage(leadId, stage);
    });
  };

  return (
    <div className="flex flex-wrap gap-2 mt-4">
      <button
        onClick={() => handleUpdate("Contacted")}
        className="px-3 py-2 rounded bg-blue-600 text-white"
      >
        Contacted
      </button>

      <button
        onClick={() =>
          handleUpdate("Site Visit Scheduled")
        }
        className="px-3 py-2 rounded bg-purple-600 text-white"
      >
        Schedule Visit
      </button>

      <button
        onClick={() =>
          handleUpdate("Negotiation")
        }
        className="px-3 py-2 rounded bg-orange-600 text-white"
      >
        Negotiation
      </button>

      <button
        onClick={() => handleUpdate("Booked")}
        className="px-3 py-2 rounded bg-green-600 text-white"
      >
        Booked
      </button>

      <button
        onClick={() => handleUpdate("Lost")}
        className="px-3 py-2 rounded bg-red-600 text-white"
      >
        Lost
      </button>
    </div>
  );
}