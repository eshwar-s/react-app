import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./view/app";
import { MemoryRouter as Router } from "react-router-dom";
import { InitialRouteIndex, RoutesEntries } from "./common/routes";
import "./common/i18n";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router initialEntries={RoutesEntries} initialIndex={InitialRouteIndex}>
      <App />
    </Router>
  </React.StrictMode>
);
