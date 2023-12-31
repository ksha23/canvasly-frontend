import { useState } from "react";

const NewAssignmentForm = () => {
  const [assignment, setAssignment] = useState({
    name: "",
    dueDate: "",
    time: "",
    type: "",
    difficulty: "",
    reminders: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAssignment({ ...assignment, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle form submission here, like sending data to an API or performing any other action
    console.log("New Assignment:", assignment);
    // Reset form fields after submission
    setAssignment({
      name: "",
      dueDate: "",
      time: "",
      type: "",
      difficulty: "",
      reminders: [],
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-8 p-6 bg-gray-100 rounded-lg shadow-md"
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
          className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
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
          value={`${assignment.dueDate}T${assignment.time}`}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
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
          className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        >
          <option value="">Select Type</option>
          <option value="Homework">Assignment</option>
          <option value="Quiz">Quiz</option>
          <option value="Project">Project</option>
          <option value="Exam">Exam</option>
          <option value="Other">Other</option>

          {/* Add other options as needed */}
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="difficulty" className="block mb-2">
          Difficulty:
        </label>
        <select
          id="difficulty"
          name="difficulty"
          value={assignment.difficulty}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        >
          <option value="">Select Difficulty</option>
          <option value="1">Difficulty 1</option>
          <option value="2">Difficulty 2</option>
          <option value="3">Difficulty 3</option>
          <option value="4">Difficulty 4</option>
          <option value="5">Difficulty 5</option>

          {/* Add other options as needed */}
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="reminders" className="block mb-2">
          Reminders:
        </label>
        <input
          type="text"
          id="reminders"
          name="reminders"
          value={assignment.reminders}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
      >
        Add Assignment
      </button>
    </form>
  );
};

export default NewAssignmentForm;
