import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./view/app";
import { MemoryRouter as Router } from "react-router-dom";
import "./common/i18n";
import { ROUTE } from "./common/routes";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router initialEntries={[`${ROUTE.LISTS}/0`]} initialIndex={0}>
      <App />
    </Router>
  </React.StrictMode>
);
