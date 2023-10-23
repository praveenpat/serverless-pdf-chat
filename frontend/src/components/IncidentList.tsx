import { useState, useEffect } from "react";
import { API } from "aws-amplify";
import { Link } from "react-router-dom";
import IncidentDetail from "./IncidentDetail";  // Make sure you rename the adapted DocumentDetail to IncidentDetail
import { ArrowPathRoundedSquareIcon } from "@heroicons/react/24/outline";
import { Incident } from "../../common/types";  // Import the Incident type
import Loading from "../../public/loading-grid.svg";

const IncidentList: React.FC = () => {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [listStatus, setListStatus] = useState<string>("idle");

  const fetchData = async () => {
    setListStatus("loading");
    const incidents = await API.get("serverless-pdf-chat", "/doc", {});  // Assuming your API endpoint for incidents is '/incident'

    const bacIncidents = incidents.filter((incident: any) => incident.filename.includes('BAC'));
    setListStatus("idle");
    setIncidents(bacIncidents);
    console.log("from lists",incidents);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="flex justify-between pt-6 pb-4">
        <h2 className="text-2xl font-bold">My incidents</h2>
        <button
          onClick={fetchData}
          type="button"
          className="text-gray-700 border border-gray-700 hover:bg-gray-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2 text-center inline-flex items-center"
        >
          <ArrowPathRoundedSquareIcon
            className={`w-5 h-5 ${
              listStatus === "loading" ? "animate-spin" : ""
            }`}
          />
        </button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {incidents &&
          incidents.length > 0 &&
          incidents.map((incident: Incident) => (
            <Link
              to={`/summary/incident/${incident.documentid}/${incident.conversations[0].conversationid}/`}  // Updated route to accommodate the incidents
              key={incident.documentid}
              className="block p-6 bg-white border border-gray-200 rounded hover:bg-gray-100"
            >
              <IncidentDetail {...incident} />
            </Link>
          ))}
      </div>
      {listStatus === "idle" && incidents.length === 0 && (
        <div className="flex flex-col items-center mt-4">
          <p className="font-bold text-lg">There's nothing here yet...</p>
          <p className="mt-1">Log your first incident to get started!</p>
        </div>
      )}
      {listStatus === "loading" && incidents.length === 0 && (
        <div className="flex flex-col items-center mt-4">
          <img src={Loading} width={40} />
        </div>
      )}
    </div>
  );
};

export default IncidentList;
