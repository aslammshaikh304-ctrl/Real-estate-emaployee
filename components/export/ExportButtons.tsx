"use client";

import { Download } from "lucide-react";

export default function ExportButtons({
  onCSV,
  onPDF,
}: {
  onCSV: () => void;
  onPDF: () => void;
}) {
  return (
    <div className="flex gap-3">

      <button
        onClick={onCSV}
        className="flex items-center gap-2 rounded-xl bg-green-600 px-4 py-2 text-white hover:bg-green-700"
      >
        <Download size={16} />
        CSV
      </button>

      <button
        onClick={onPDF}
        className="flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-white hover:bg-red-700"
      >
        <Download size={16} />
        PDF
      </button>

    </div>
  );
}