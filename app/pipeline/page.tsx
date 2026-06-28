import { supabase } from "@/lib/supabase";
import PipelineBoard from "@/components/pipeline/pipeline-board";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
  DragEndEvent,
} from "@dnd-kit/core";

export default async function PipelinePage() {
  const { data: leads } = await supabase
    .from("leads")
    .select("*");

  return (
    <div className="p-6">

      <div className="flex items-center justify-between mb-8">

        <div>
          <h1 className="text-3xl font-bold">
            📊 Sales Pipeline
          </h1>

          <p className="text-gray-500 mt-1">
            Drag leads through your sales journey
          </p>
        </div>

        <div className="text-sm text-gray-500">
          Total Leads:{" "}
          <span className="font-semibold text-black">
            {leads?.length || 0}
          </span>
        </div>

      </div>

      <PipelineBoard leads={leads || []} />

    </div>
  );
}