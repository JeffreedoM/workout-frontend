import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { WorkoutsContextProvider } from "./contexts/WorkoutContext.jsx";
import { SnackbarProvider } from "notistack";
import { AuthContextProvider } from "./contexts/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <BrowserRouter>
        <WorkoutsContextProvider>
          <SnackbarProvider>
            <App />
          </SnackbarProvider>
        </WorkoutsContextProvider>
      </BrowserRouter>
    </AuthContextProvider>
  </React.StrictMode>,
);
