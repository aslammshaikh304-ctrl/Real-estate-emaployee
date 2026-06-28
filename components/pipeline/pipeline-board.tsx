"use client";

import { useState } from "react";

import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
  DragEndEvent,
} from "@dnd-kit/core";

import PipelineColumn from "./pipeline-column";
import { updateStage } from "@/app/actions/update-stage";

export default function PipelineBoard({
  leads,
}: {
  leads: any[];
}) {
  const [items, setItems] = useState(leads);

  const sensors = useSensors(
    useSensor(PointerSensor)
  );

  const stages = [
    "New",
    "Contacted",
    "Site Visit Scheduled",
    "Negotiation",
    "Booked",
    "Lost",
  ];

async function handleDragEnd(
  event: DragEndEvent
) {
  const { active, over } = event;

  if (!over) return;

  const leadId = Number(active.id);
  const newStage = String(over.id);

  console.log("Lead:", leadId);
  console.log("Stage:", newStage);

  await updateStage(
    leadId,
    newStage
  );
  setItems((current) =>
  current.map((lead) =>
    lead.id === leadId
      ? {
          ...lead,
          stage: newStage,
        }
      : lead
  )
);
}

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-6 overflow-x-auto pb-6">

        {stages.map((stage) => {
          const stageLeads = items.filter(
            (lead) => lead.stage === stage
          );

          return (
            <PipelineColumn
              key={stage}
              title={stage}
              leads={stageLeads}
            />
          );
        })}

      </div>
    </DndContext>
  );
}