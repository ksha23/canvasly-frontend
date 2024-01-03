import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import AssignmentPage from "./pages/Assignments";
import SettingsPage from "./pages/Settings";
import ErrorBoundary from "./components/ErrorBoundary";
import applyTheme from "./utils/colorThemeHandler";

function App() {
  applyTheme();

  return (
    <>
      <BrowserRouter>
        <ErrorBoundary>
          <div>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/assignments" element={<AssignmentPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
          </div>
        </ErrorBoundary>
      </BrowserRouter>
    </>
  );
}

export default App;
