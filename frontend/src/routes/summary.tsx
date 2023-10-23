import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API } from "aws-amplify";
import { Incident, Summary } from "../common/types";
import SummarySidebar from "../components/SummarySidebar";
import SummaryView from "../components/SummaryView";
import LoadingGrid from "../../public/loading-grid.svg";

const SummaryPage: React.FC = () => {
  const params = useParams();
  const [incidentSummary, setIncidentSummary] = useState<Summary | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingSummary, setLoadingSummary] = useState<boolean>(false);


  const generateSummary = async () => {
    if (!incidentSummary) return;

    setLoadingSummary(true);
    try {
        const body = {
          fileName: incidentSummary.incident.filename,  // Using filename dynamically
          prompt: "text-txt-prompt",   // Adjust this if needed
        };

        const result: Summary = await API.post(
          "summary-api",
          `/summary/${params.documentid}/${params.conversationid}`,
          { body: body }
        );

        setIncidentSummary(prevState => {
          if (!prevState) return null;
          
          return {
            ...prevState,
            content: result
          };
        });
        

    } catch (error) {
        console.error("Error generating summary: ", error);
    } finally {
      setLoadingSummary(false);
    }
  };

  const fetchData = async (conversationid = params.conversationid) => {
      setLoading(true);
      const result = await API.get(
      "serverless-pdf-chat",
      `/doc/${params.documentid}/${conversationid}`,
      {}
      );

      const incident: Incident = {
        documentid: result.document.documentid,
        userid: result.document.userid,
        filename: result.document.filename,
        docstatus: result.document.docstatus,
        created: result.document.created
      };
      const content = {
        Subject: "",
        Summary: "",
        sop_evaluation: ""
      }

      const summary: Summary = {
        conversationid: result.conversationid,
        incident: incident,
        content: content
    };
      setIncidentSummary(summary);
      setLoading(false);
  };

  useEffect(() => {
      fetchData();
  }, []);

  return (
    <div className="">
      {loading ? (
        <div className="flex flex-col items-center mt-6">
          <img src={LoadingGrid} width={40} />
        </div>
      ) : incidentSummary ? (
        <div>
          {/* Generate Summary Button */}
          <button
            onClick={() => generateSummary()}
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 active:bg-blue-800 mb-4"
          >
            Generate Summary
          </button>

          {/* Grid for Sidebar and Summary View */}
          <div className="grid grid-cols-12 border border-gray-200 rounded-lg">
            <SummarySidebar incidentSummary={incidentSummary} />
            {loadingSummary ? (
              <div className="col-span-9 flex justify-center items-center">
                <img src={LoadingGrid} width={40} />
              </div>
            ) : (
              <SummaryView incidentSummary={incidentSummary} />
            )}
            {/* <SummaryView incidentSummary={incidentSummary} /> */}
          </div>
        </div>
      ) : (
        <div>test</div>
      )}
    </div>
  );
};

export default SummaryPage;
