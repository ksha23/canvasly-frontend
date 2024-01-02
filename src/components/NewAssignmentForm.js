import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ADD_ASSIGNMENT } from "../redux/constant";
import TextAreaAutosize from "react-textarea-autosize";

const NewAssignmentForm = ({ onFormSubmit }) => {
  let userData = useSelector((state) => state.userDataReducer);
  const [utcDateTime, setUtcDateTime] = useState("");

  const [assignment, setAssignment] = useState({
    name: "",
    dueDate: "",
    type: "Other",
    difficulty: "1",
  });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "dueDate") {
      const localDate = new Date(value);
      const utcDate = localDate.toISOString();
      setAssignment({ ...assignment, [name]: value });
      setUtcDateTime(utcDate);
      return;
    }

    setAssignment({ ...assignment, [name]: value });
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
      dueDate: "",
      type: "Other",
      difficulty: "1",
    });

    setUtcDateTime("");

    onFormSubmit();
  };

  useEffect(() => {
    setAssignment({
      name: "",
      dueDate: "",
      type: "Other",
      difficulty: "1",
    });
    setUtcDateTime("");
  }, []);

  return (
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
      <div className="mb-4">
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
  );
};

export default NewAssignmentForm;
