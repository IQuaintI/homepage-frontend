import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

if (import.meta.env.DEV && import.meta.env.VITE_USE_MOCK === "true") {
  console.log("🧪 Booting MSW...");
  import("./mocks/browser")
    .then(({ worker }) => {
      return worker.start({
        onUnhandledRequest: "warn", // Log unhandled requests
      });
    })
    .then(() => {
      console.log("✅ MSW started");
    })
    .catch((err) => {
      console.error("❌ Failed to start MSW:", err);
    });
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);