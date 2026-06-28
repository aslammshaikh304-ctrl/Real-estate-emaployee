"use client";

import { useState } from "react";

export default function PipelineKanban({
  leads,
}: {
  leads: any[];
}) {
  const [items] = useState(leads);

  return (
    <>
      {/*
        We'll move your existing Kanban UI here
        in the next step.
      */}
    </>
  );
}