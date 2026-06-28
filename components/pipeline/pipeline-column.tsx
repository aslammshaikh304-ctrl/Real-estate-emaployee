"use client";

import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { useDroppable } from "@dnd-kit/core";

import LeadCard from "./lead-card";

export default function PipelineColumn({
  title,
  leads,
}: {
  title: string;
  leads: any[];
}) {
  const { setNodeRef } = useDroppable({
    id: title,
  });

  return (
    <div
      ref={setNodeRef}
      className="w-80 flex-shrink-0 rounded-2xl border bg-slate-50 shadow-sm"
    >

      {/* Header */}

      <div className="sticky top-0 bg-white rounded-t-2xl border-b p-4 flex justify-between items-center">

        <h2 className="font-bold text-lg">
          {title}
        </h2>

        <span className="bg-gray-900 text-white text-sm px-3 py-1 rounded-full">
          {leads.length}
        </span>

      </div>

      {/* Cards */}

      <SortableContext
        items={leads.map((lead) => lead.id.toString())}
        strategy={verticalListSortingStrategy}
      >
        <div className="p-4 space-y-4 min-h-[650px]">

          {leads.length === 0 ? (

            <div className="border-2 border-dashed rounded-xl p-10 text-center text-gray-400">
              No Leads
            </div>

          ) : (

            leads.map((lead) => (
              <LeadCard
                key={lead.id}
                lead={lead}
              />
            ))

          )}

        </div>
      </SortableContext>

    </div>
  );
}