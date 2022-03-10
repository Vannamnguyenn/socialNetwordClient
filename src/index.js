import React from "react";
import ReactDOM from "react-dom";
import App from "./pages/App";
import DataProvider from "./redux/store";
import "react-loading-skeleton/dist/skeleton.css";
import "./style/index.css";

ReactDOM.render(
  <React.StrictMode>
    <DataProvider>
      <App />
    </DataProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
