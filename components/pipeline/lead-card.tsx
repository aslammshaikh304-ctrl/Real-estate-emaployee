"use client";

import Link from "next/link";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function LeadCard({
  lead,
}: {
  lead: any;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: lead.id.toString(),
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <Link
        href={`/leads/${lead.id}`}
        className="block rounded-xl bg-white border shadow-sm hover:shadow-xl transition-all duration-200"
      >
        <div className="p-4">

          <div className="flex justify-between">

            <div>

              <h3 className="font-semibold">
                {lead.name}
              </h3>

              <p className="text-xs text-gray-500 mt-1">
                📍 {lead.location}
              </p>

            </div>

            <span
              className={`text-xs px-2 py-1 rounded-full ${
                lead.ai_status === "Hot"
                  ? "bg-red-100 text-red-600"
                  : lead.ai_status === "Warm"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-blue-100 text-blue-700"
              }`}
            >
              {lead.ai_status}
            </span>

          </div>

          <div className="mt-4 space-y-2 text-sm">

            <p>📞 {lead.phone}</p>

            <p>💰 {lead.budget}</p>

            <p>🎯 AI Score: {lead.ai_score || 0}/100</p>

          </div>

        </div>
      </Link>
    </div>
  );
}