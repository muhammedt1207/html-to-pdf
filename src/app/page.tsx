"use client";

import React from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";

const App: React.FC = () => {
  const generatePDF = async () => {
    const element = document.getElementById("pdf-content");
    if (!element) return;

    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth(); // 210mm
    const pageHeight = pdf.internal.pageSize.getHeight(); // 297mm

    const margin = 20; // 20mm margin
    const availableWidth = pageWidth - margin * 2;
    const availableHeight = pageHeight - margin * 2;

    const canvasRatio = canvas.width / canvas.height;
    const pdfRatio = availableWidth / availableHeight;

    let imgWidth = availableWidth;
    let imgHeight = availableHeight;

    // Scale image proportionally within margins
    if (canvasRatio > pdfRatio) {
      imgHeight = availableWidth / canvasRatio;
    } else {
      imgWidth = availableHeight * canvasRatio;
    }

    pdf.addImage(imgData, "PNG", margin, margin, imgWidth, imgHeight);
    pdf.save("student-report.pdf");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div
        id="pdf-content"
        className="bg-white p-6 rounded-xl border w-full max-w-md text-gray-800"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">Student Report</h1>
        <p className="mb-2">
          <strong>Name:</strong> John Doe
        </p>
        <p className="mb-2">
          <strong>Class:</strong> 10th Grade
        </p>
        <p className="font-semibold mt-4 mb-2">Subject Marks:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Math: 90</li>
          <li>Science: 85</li>
          <li>English: 88</li>
        </ul>
      </div>

      <button
        onClick={generatePDF}
        className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-700 transition-all duration-200"
      >
        Download PDF
      </button>
    </div>
  );
};

export default App;
