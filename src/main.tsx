import React from "react";
import ReactDOM from "react-dom/client";

import "./styles.css";
import { TodoApp } from "./TodoApp";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

const clientId =
  "304531247476-58f940f3b0dgrupg95cdo8b51fspupdv.apps.googleusercontent.com";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <BrowserRouter>
        <TodoApp />
      </BrowserRouter>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
