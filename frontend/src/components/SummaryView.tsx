import React from "react";
import { Summary } from "../common/types";

interface SummaryViewProps {
  incidentSummary: Summary | null;
  // Add any other props you might find necessary.
}



const SummaryView: React.FC<SummaryViewProps> = ({ incidentSummary }) => {

  const getSopEvaluationList = (sop_evaluation: string): string[] => {
    const lines = sop_evaluation.split('\n');
    const firstLine = lines[0].trim();
    const lastLine = lines[lines.length - 1].trim();
    const remainingLines = lines.slice(1).filter(item => /^\d+./.test(item.trim()));
    return [firstLine, ...remainingLines, lastLine];
  }

  return (
    <div className="col-span-9 p-4">
      {/* <div className="mt-4">
        <h2 className="text-2xl font-semibold">Subject:</h2>
        <h2 className="text-2xl font-bold">{incidentSummary?.content.Subject}</h2>
      </div>
      <hr className="my-3 border-gray-200" /> */}

      {incidentSummary?.content?.Subject && (
        <div className="mt-4">
          <h2 className="text-2xl font-semibold">Subject:</h2>
          <h2 className="text-2xl font-bold">{incidentSummary?.content.Subject}</h2>
          <hr className="my-3 border-gray-200" />
        </div>
      )}
      {incidentSummary?.content?.Summary && (
        <div className="mt-4">
          <h1 className="text-xl font-semibold">Summary:</h1>
          <p className="mt-2">{incidentSummary?.content.Summary}</p>
          <hr className="my-6 border-gray-300" />
        </div>
      )}
      {incidentSummary?.content?.sop_evaluation && (
        <div className="mt-4">
          <h3 className="text-xl font-semibold">SOP Evaluation:</h3>
          <ul>
            {getSopEvaluationList(incidentSummary.content.sop_evaluation).map((info, index) => (
              <li key={index} className="mt-2">{info}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SummaryView;
