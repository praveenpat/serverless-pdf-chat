import { Incident } from "../common/types";
import { getDateTime } from "../common/utilities";
import {
  DocumentIcon, // If you have a corresponding icon for incident, use that.
  ClockIcon,
  CheckCircleIcon,
  CloudIcon,
  CogIcon,
} from "@heroicons/react/24/outline";

const IncidentDetail: React.FC<Incident> = ({
    filename,
    created,
    docstatus,
  }) => {
  return (
    <>
      <h3 className="text-center mb-3 text-lg font-bold tracking-tight text-gray-900">
        {filename}
      </h3>
      <div className="flex flex-col space-y-2">
        <div className="inline-flex items-center">
          <DocumentIcon className="w-4 h-4 mr-2" /> {/* Replace this icon if you have another one for incidents */}
          {filename}
        </div>
        <div className="inline-flex items-center">
          <ClockIcon className="w-4 h-4 mr-2" />
          {getDateTime(created)}
        </div>
        {docstatus === "REPORTED" && (
          <div className="flex flex-row justify-center pt-4">
            <span className="inline-flex items-center self-start bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
              <CloudIcon className="w-4 h-4 mr-1" />
              Awaiting review
            </span>
          </div>
        )}
        {docstatus === "INVESTIGATING" && (
          <div className="flex flex-row justify-center pt-4">
            <span className="inline-flex items-center self-start bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
              <CogIcon className="w-4 h-4 mr-1 animate-spin" />
              Investigating incident
            </span>
          </div>
        )}
        {docstatus === "RESOLVED" && (
          <div className="flex flex-row justify-center pt-4">
            <span className="inline-flex items-center self-start bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
              <CheckCircleIcon className="w-4 h-4 mr-1" />
              Incident resolved
            </span>
          </div>
        )}
      </div>
    </>
  );
};

export default IncidentDetail;
