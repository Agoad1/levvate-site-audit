"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface PDFExportProps {
  targetId: string;
  filename: string;
}

export default function PDFExport({ targetId, filename }: PDFExportProps) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const element = document.getElementById(targetId);
      if (!element) throw new Error("Target element not found");

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();
      const imgH = (canvas.height * pageW) / canvas.width;

      let remainingH = imgH;
      let yOffset = 0;

      while (remainingH > 0) {
        pdf.addImage(imgData, "PNG", 0, -yOffset, pageW, imgH);
        remainingH -= pageH;
        yOffset += pageH;
        if (remainingH > 0) pdf.addPage();
      }

      pdf.save(filename);
    } catch (error) {
      console.error("PDF Export failed:", error);
      alert("Failed to export PDF. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <button
      onClick={handleExport}
      disabled={isExporting}
      className="flex items-center gap-2 px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition disabled:opacity-50 text-sm font-medium"
    >
      <Download className="w-4 h-4" />
      {isExporting ? "Exporting..." : "Download PDF"}
    </button>
  );
}
