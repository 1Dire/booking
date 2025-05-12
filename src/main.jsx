import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeConfig } from "flowbite-react";
import { LoadingProvider } from "./context/LoadingContext";

import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <>
    <ThemeConfig dark={false} />
    <Router>
      <LoadingProvider>
        <App />
      </LoadingProvider>
    </Router>
  </>
);
