import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import AssignmentPage from "./pages/Assignments";
import SettingsPage from "./pages/Settings";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  function applyTheme() {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }

  applyTheme();

  return (
    <div>
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
    </div>
  );
}

export default App;
