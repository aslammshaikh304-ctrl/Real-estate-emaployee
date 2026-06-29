import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function exportToCSV(data: any[], filename: string) {
  if (!data.length) return;

  const headers = Object.keys(data[0]);

  const csv = [
    headers.join(","),

    ...data.map((row) =>
      headers
        .map((header) => {
          const value = row[header];

          if (value === null || value === undefined) return "";

          return `"${String(value).replace(/"/g, '""')}"`;
        })
        .join(",")
    ),
  ].join("\n");

  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;

  link.download = `${filename}.csv`;

  link.click();

  URL.revokeObjectURL(url);
}

export function exportToPDF(data: any[], filename: string) {
  if (!data.length) return;

  const doc = new jsPDF();

  const headers = [Object.keys(data[0])];

  const rows = data.map((item) =>
    Object.values(item).map((value) =>
      value === null ? "" : String(value)
    )
  );

  doc.setFontSize(18);

  doc.text(filename, 14, 20);

  autoTable(doc, {
    head: headers,
    body: rows,
    startY: 30,
    styles: {
      fontSize: 8,
    },
  });

  doc.save(`${filename}.pdf`);
}