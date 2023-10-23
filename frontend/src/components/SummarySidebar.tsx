import React from "react";
import { Summary } from "../common/types";

interface SummarySidebarProps {
  incidentSummary: Summary | null;
}

const SummarySidebar: React.FC<SummarySidebarProps> = ({ incidentSummary }) => {

  const getSopFromFilename = (filename: string): string => {
    const parts = filename.split("BAC");
    if (parts.length > 0) {
      // Removing punctuations using regex and trimming spaces
      return parts[0].replace(/[^\w\s]/g, ' ').trim();
    }
    return ''; // Return empty string if no parts are found
  }



  return (
    <div className="col-span-3 bg-gray-100 p-4">
        <h2 className="text-xl font-bold">Incident Filename</h2>

        <p className="mt-4">File Name: {incidentSummary?.incident?.filename || "N/A"}</p>

        <p className="mt-4">SOP: {getSopFromFilename(incidentSummary.incident?.filename)}</p>

    </div>
  );
};

export default SummarySidebar;
