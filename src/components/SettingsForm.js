import { useEffect, useState } from "react";

import Modal from "./SuccessPopup";

import { useDispatch, useSelector } from "react-redux";
import { setWeights } from "../redux/actions/weightsActions";
import { setCalendarId } from "../redux/actions/userActions";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material/styles";
import applyTheme from "../utils/colorThemeHandler";
import { set } from "lodash";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

const SettingsForm = () => {
  // ------------------ Form State ----------------------
  const [theColorTheme, setColorTheme] = useState(localStorage.theme);
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (event) => {
      if (
        localStorage.theme === "dark" ||
        (!("theme" in localStorage) &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
      ) {
        setColorTheme("dark");
      } else {
        setColorTheme("light");
      }
      applyTheme();
    });

  let userData = useSelector((state) => state.userDataReducer);
  let calendarData = useSelector((state) => state.calendarDataReducer);
  const [calendarId, setTheCalendarId] = useState(userData?.calendarId || "");
  const [dueDateWeight, setDueDateWeight] = useState(
    userData?.dueDateWeight || ""
  );
  const [typeWeight, setTypeWeight] = useState(userData?.typeWeight || "");
  const [difficultyWeight, setDifficultyWeight] = useState(
    userData?.difficultyWeight || ""
  );
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();

  // ------------------ Color Theme ----------------------

  function handleThemeChange(theme) {
    if (theme === "light") {
      localStorage.theme = "light";
      setColorTheme("light");
    } else if (theme === "dark") {
      localStorage.theme = "dark";
      setColorTheme("dark");
    } else {
      localStorage.removeItem("theme");
      setColorTheme("");
    }
    applyTheme(); // Apply the theme after changing it
  }

  // ------------------ Form ----------------------

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tempDueDateWeight = parseInt(dueDateWeight);
    const tempTypeWeight = parseInt(typeWeight);
    const tempDifficultyWeight = parseInt(difficultyWeight);

    const totalWeights =
      tempDueDateWeight + tempTypeWeight + tempDifficultyWeight;
    if (totalWeights !== 10) {
      setError("ERROR: Weights must add up to 10");
    } else {
      setError("");
      // Process the weights, possibly send them to the server
      dispatch(setWeights(dueDateWeight, difficultyWeight, typeWeight));
      dispatch(setCalendarId(calendarId));

      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
      }, 3000);
    }
  };

  // ------------------ Render ----------------------

  useEffect(() => {
    if (!localStorage.theme || localStorage.theme === "") {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setColorTheme(prefersDark ? "dark" : "light");
    }
    applyTheme();
    if (!userData) return;
    setTheCalendarId(userData.calendarId || "");
    setDueDateWeight(userData.dueDateWeight || "");
    setTypeWeight(userData.typeWeight || "");
    setDifficultyWeight(userData.difficultyWeight || "");
  }, [userData]);

  return (
    <div>
      {userData && calendarData && (
        <div className="rounded-md">
          <form onSubmit={handleSubmit}>
            <p className="mb-2 font-semibold">
              Choose a calendar to display events from:
            </p>

            <ThemeProvider
              theme={theColorTheme === "dark" ? darkTheme : lightTheme}
            >
              {" "}
              {calendarData && (
                <Select
                  id="calendars"
                  name="calendars"
                  value={calendarId}
                  onChange={(e) => setTheCalendarId(e.target.value)}
                  className="w-full bg-white rounded-md dark:text-white dark:bg-zinc-600"
                >
                  <MenuItem value="">Choose a Calendar</MenuItem>
                  {calendarData.map((calendar) => (
                    <MenuItem key={calendar.id} value={calendar.id}>
                      {calendar.summary}
                    </MenuItem>
                  ))}
                </Select>
              )}
            </ThemeProvider>
            <p className="mt-4 font-semibold">Choose weights for sorting:</p>
            <div className="grid grid-cols-3 gap-4 mt-2">
              <div>
                <label htmlFor="dueDateWeight">Due date:</label>
                <input
                  id="dueDateWeight"
                  type="number"
                  value={dueDateWeight}
                  onChange={(e) => setDueDateWeight(e.target.value)}
                  className="block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-2 py-2 mt-2 text-center dark:bg-zinc-600"
                />
              </div>

              <div>
                <label htmlFor="typeWeight">Type</label>
                <input
                  id="typeWeight"
                  type="number"
                  value={typeWeight}
                  onChange={(e) => setTypeWeight(e.target.value)}
                  className="block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-2 py-2 mt-2 text-center dark:bg-zinc-600"
                />
              </div>

              <div>
                <label htmlFor="difficultyWeight">Difficulty:</label>
                <input
                  id="difficultyWeight"
                  type="number"
                  value={difficultyWeight}
                  onChange={(e) => setDifficultyWeight(e.target.value)}
                  className="block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-2 py-2 mt-2 text-center dark:bg-zinc-600"
                />
              </div>
            </div>
            <p className="mt-4 font-semibold">Choose a color theme:</p>
            <div className="grid grid-cols-1 md:grid-cols-3 mt-2 gap-4">
              <button
                type="button"
                className="bg-zinc-200 hover:bg-zinc-300 text-black py-2 px-4 rounded"
                onClick={() => handleThemeChange("light")}
              >
                Light
              </button>
              <button
                type="button"
                className="bg-zinc-600 hover:bg-zinc-700 text-white py-2 px-4 rounded"
                onClick={() => handleThemeChange("dark")}
              >
                Dark
              </button>
              <button
                type="button"
                className="bg-violet-600 hover:bg-violet-700 text-white py-2 px-4 rounded"
                onClick={() => handleThemeChange("system")}
              >
                System
              </button>
            </div>

            {error && <div className="text-red-500">{error}</div>}
            <button className="mt-4 bg-violet-600 hover:bg-violet-700 text-white py-2 px-4 rounded">
              Save Settings
            </button>
          </form>
          {showModal && <Modal show={showModal} message="Settings saved!" />}
        </div>
      )}
    </div>
  );
};

export default SettingsForm;
