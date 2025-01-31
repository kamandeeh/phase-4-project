import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { UserProvider } from "./Context/UserContext";
import { CourseProvider } from "./Context/CourseContext";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <CourseProvider>
          <App />
        </CourseProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
