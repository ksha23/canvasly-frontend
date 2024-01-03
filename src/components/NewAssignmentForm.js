import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ADD_ASSIGNMENT } from "../redux/constant";
import TextAreaAutosize from "react-textarea-autosize";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import applyTheme from "../utils/colorThemeHandler";

const NewAssignmentForm = ({ onFormSubmit }) => {
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
  const [utcDateTime, setUtcDateTime] = useState("");
  const [theColorTheme, setColorTheme] = useState(localStorage.theme);

  const [assignment, setAssignment] = useState({
    name: "",
    dueDate: null,
    type: "Other",
    difficulty: "1",
  });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAssignment({ ...assignment, [name]: value });
  };

  const handleDateChange = (data) => {
    if (!data) return;
    const date = data.$d;
    setUtcDateTime(date.toISOString());
    setAssignment({ ...assignment, ["dueDate"]: date });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      assignment: {
        name: assignment.name,
        dueDate: utcDateTime,
        type: assignment.type,
        difficulty: assignment.difficulty,
      },
      calendarId: userData.calendarId,
    };

    dispatch({ type: ADD_ASSIGNMENT, payload: { data } });

    setAssignment({
      name: "",
      dueDate: null,
      type: "Other",
      difficulty: "1",
    });

    setUtcDateTime("");

    onFormSubmit();
  };

  useEffect(() => {
    if (!localStorage.theme || localStorage.theme === "") {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setColorTheme(prefersDark ? "dark" : "light");
    }
    setAssignment({
      name: "",
      dueDate: null,
      type: "Other",
      difficulty: "1",
    });
    setUtcDateTime("");
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg m-10 p-5 bg-gray-100 rounded-lg shadow-md dark:bg-zinc-800"
      >
        <h2 className="text-xl font-bold mb-4">Add New Assignment</h2>
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2">
            Name:
          </label>
          <TextAreaAutosize
            type="text"
            id="name"
            name="name"
            value={assignment.name}
            onChange={handleChange}
            placeholder="Assignment Name"
            className="w-full rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 dark:text-white dark:bg-zinc-600"
          />
        </div>
        {/* <div className="mb-4">
        <label htmlFor="dueDate" className="block mb-2">
          Due Date:
        </label>
        <input
          type="datetime-local"
          id="dueDate"
          name="dueDate"
          value={assignment.dueDate}
          onChange={handleChange}
          className="duedate-input w-full rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 dark:text-white dark:bg-zinc-600"
        />
      </div> */}
        <div className="mb-4">
          <label htmlFor="dueDate" className="block mb-2">
            Due Date:
          </label>
          <DateTimePicker
            slotProps={{
              textField: {
                size: "small",
              },
            }}
            className="w-full bg-white dark:bg-zinc-600 rounded-md"
            sx={{
              ".MuiOutlinedInput-root": {
                color: theColorTheme === "dark" ? "white" : "black",
                borderRadius: "5px",
              },
              ".MuiSvgIcon-root": {
                color: theColorTheme === "dark" ? "lightgray" : "gray",
              },
            }}
            textField={(props) => <TextField {...props} variant="standard" />}
            value={assignment.dueDate}
            onChange={(value) => handleDateChange(value)}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="type" className="block mb-2">
            Type:
          </label>
          <select
            id="type"
            name="type"
            value={assignment.type}
            onChange={handleChange}
            className="w-full rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 dark:text-white dark:bg-zinc-600"
          >
            <option value="Other">Other</option>
            <option value="Assignment">Assignment</option>
            <option value="Quiz">Quiz</option>
            <option value="Project">Project</option>
            <option value="Exam">Exam</option>
            {/* Add other options as needed */}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="difficulty" className="block mb-2">
            Difficulty:
          </label>
          <select
            id="difficulty"
            required
            name="difficulty"
            value={assignment.difficulty}
            onChange={handleChange}
            className="w-full rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 dark:text-white dark:bg-zinc-600"
          >
            <option value="1">Difficulty 1</option>
            <option value="2">Difficulty 2</option>
            <option value="3">Difficulty 3</option>
            <option value="4">Difficulty 4</option>
            <option value="5">Difficulty 5</option>

            {/* Add other options as needed */}
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Add Assignment
        </button>
        <button
          onClick={onFormSubmit}
          className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 ml-2"
        >
          Cancel
        </button>
      </form>
    </LocalizationProvider>
  );
};

export default NewAssignmentForm;
