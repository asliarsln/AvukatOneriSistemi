import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Authentication from "./Authentication.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Authentication />
  </StrictMode>
);
