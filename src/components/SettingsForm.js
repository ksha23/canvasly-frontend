import { useEffect, useState } from "react";

import Modal from "./SuccessPopup";

import { useDispatch, useSelector } from "react-redux";
import { setWeights } from "../redux/actions/weightsActions";
import { setCalendarId } from "../redux/actions/userActions";

const SettingsForm = () => {
  // ------------------ Form State ----------------------
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
  function handleThemeChange(theme) {
    if (theme === "light") {
      localStorage.theme = "light";
    } else if (theme === "dark") {
      localStorage.theme = "dark";
    } else {
      localStorage.removeItem("theme");
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

            {calendarData && (
              <select
                className="block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 mb-4 px-2 py-2 dark:dark:bg-zinc-600"
                name="calendars"
                id="calendars"
                value={calendarId}
                onChange={(e) => setTheCalendarId(e.target.value)}
              >
                <option value="">Choose a Calendar</option>
                {calendarData.map((calendar) => (
                  <option key={calendar.id} value={calendar.id}>
                    {calendar.summary}
                  </option>
                ))}
              </select>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="font-semibold" htmlFor="dueDateWeight">
                  Weight for due date:
                </label>
                <input
                  id="dueDateWeight"
                  type="number"
                  value={dueDateWeight}
                  onChange={(e) => setDueDateWeight(e.target.value)}
                  className="block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-2 py-2 mt-2 dark:bg-zinc-600"
                />
              </div>

              <div>
                <label className="font-semibold" htmlFor="typeWeight">
                  Weight for type:
                </label>
                <input
                  id="typeWeight"
                  type="number"
                  value={typeWeight}
                  onChange={(e) => setTypeWeight(e.target.value)}
                  className="block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-2 py-2 mt-2 dark:bg-zinc-600"
                />
              </div>

              <div>
                <label className="font-semibold" htmlFor="difficultyWeight">
                  Weight for difficulty:
                </label>
                <input
                  id="difficultyWeight"
                  type="number"
                  value={difficultyWeight}
                  onChange={(e) => setDifficultyWeight(e.target.value)}
                  className="block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-2 py-2 mt-2 dark:bg-zinc-600"
                />
              </div>
              <button
                type="button"
                className="bg-indigo-300 hover:bg-indigo-400 text-black py-2 px-4 rounded"
                onClick={() => handleThemeChange("light")}
              >
                Light Mode
              </button>
              <button
                type="button"
                className="bg-indigo-800 hover:bg-indigo-900 text-white py-2 px-4 rounded"
                onClick={() => handleThemeChange("dark")}
              >
                Dark Mode
              </button>
              <button
                type="button"
                className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded"
                onClick={() => handleThemeChange("system")}
              >
                System Color
              </button>
            </div>

            {error && <div className="text-red-500">{error}</div>}
            <button className="mt-4 bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded">
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
