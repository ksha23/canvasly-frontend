import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ADD_ASSIGNMENT } from "../redux/constant";

const NewAssignmentForm = ({ onFormSubmit }) => {
  let userData = useSelector((state) => state.userDataReducer);
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
      setAssignment({ ...assignment, [name]: value });
    } else {
      setAssignment({ ...assignment, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let calendarId = userData.calendarId;
    let data = { assignment, calendarId };
    dispatch({ type: ADD_ASSIGNMENT, payload: { data } });

    setAssignment({
      name: "",
      dueDate: "",
      type: "Other",
      difficulty: "1",
    });

    onFormSubmit();
  };

  useEffect(() => {
    setAssignment({
      name: "",
      dueDate: "",
      type: "Other",
      difficulty: "1",
    });
  }, []);

  return (
    <form
      onSubmit={handleSubmit}
      className="m-8 p-6 bg-gray-100 rounded-lg shadow-md dark:bg-zinc-800"
    >
      <h2 className="text-xl font-bold mb-4">Add New Assignment</h2>
      <div className="mb-4">
        <label htmlFor="name" className="block mb-2">
          Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={assignment.name}
          onChange={handleChange}
          placeholder="Assignment Name"
          className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 dark:text-black"
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
          className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 dark:text-black"
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
          className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 dark:text-black"
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
          className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 dark:text-black"
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
