import React from "react";
import IncidentUploader from "../components/IncidentUploader";
import IncidentList from "../components/IncidentList";

const Incidents: React.FC = () => {
  return (
    <>
      <IncidentUploader />
      <IncidentList />
    </>
  );
};

export default Incidents;