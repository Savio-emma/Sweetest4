import React from "react";
import ReactDOM from "react-dom/client";
import AppWrapper from "./App"; // Use AppWrapper, not App
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AppWrapper />
  </BrowserRouter>
);
