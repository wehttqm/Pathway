import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import App from "./App.tsx";
import { CourseView } from "@/components/course-view.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/pathway" element={<App />} />
        <Route path="pathway/school/:schoolId" element={<CourseView />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
