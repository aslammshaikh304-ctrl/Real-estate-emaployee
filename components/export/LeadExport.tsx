"use client";

import ExportButtons from "./ExportButtons";
import { exportToCSV, exportToPDF } from "@/lib/export";

export default function LeadExport({
  leads,
}: {
  leads: any[];
}) {
  return (
    <ExportButtons
      onCSV={() => exportToCSV(leads, "Leads")}
      onPDF={() => exportToPDF(leads, "Leads")}
    />
  );
}