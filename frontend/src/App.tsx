import { Amplify, Auth } from "aws-amplify";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Layout from "./routes/layout";
import Documents from "./routes/documents";
import Incidents from "./routes/incidents";
import Chat from "./routes/chat";
import SummaryPage from "./routes/summary";

Amplify.configure({
  Auth: {
    userPoolId: import.meta.env.VITE_USER_POOL_ID,
    userPoolWebClientId: import.meta.env.VITE_USER_POOL_CLIENT_ID,
    region: import.meta.env.VITE_API_REGION,
  },
  API: {
    endpoints: [
      {
        name: "serverless-pdf-chat",
        endpoint: import.meta.env.VITE_API_ENDPOINT,
        region: import.meta.env.VITE_API_REGION,
        custom_header: async () => {
          return {
            Authorization: `Bearer ${(await Auth.currentSession())
              .getIdToken()
              .getJwtToken()}`,
          };
        },
      },
      {
        name: "summary-api",
        endpoint: "https://ohepqq555a.execute-api.us-east-1.amazonaws.com/Stage",
        region: import.meta.env.VITE_API_REGION,
        custom_header: async () => {
          return {
            Authorization: `Bearer ${(await Auth.currentSession())
              .getIdToken()
              .getJwtToken()}`,
          };
        },
      },
    ],
  },
});

let router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        Component: Documents,
      },
      {
        path: "/doc/:documentid/:conversationid",
        Component: Chat,
      },
    ],
  },
  {
    path: "/summary",
    element: <Layout />,
    children: [
      {
        index: true,
        Component: Incidents,
      },
      {
        path: "incident/:documentid/:conversationid",
        Component: SummaryPage,
      },
    ],
  },
  
]);

function App() {
  return <RouterProvider router={router} />;
}

export default withAuthenticator(App, { hideSignUp: true });
