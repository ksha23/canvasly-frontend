import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { completeAssignment } from "../redux/actions/assignmentListActions";
import { updateAssignmentDifficulty } from "../redux/actions/assignmentListActions";
import { updateAssignmentType } from "../redux/actions/assignmentListActions";

import { deleteAssignmentReminderAction } from "../redux/actions/assignmentListActions";
import { addAssignmentReminderAction } from "../redux/actions/assignmentListActions";
import { updateAssignmentReminderArray } from "../redux/actions/assignmentListActions";

const EventComponent = ({
  id,
  name,
  dateTime,
  difficulty,
  type,
  reminders,
  onUpdateDifficultyAndType,
}) => {
  const dispatch = useDispatch();
  const formattedDateTime = new Date(dateTime);

  // ----------------------- State Variables ---------------------------

  // used to determine if the event is edited (add border if edited)
  const [edited, setEdited] = useState(false);
  // used to determine if we should show the add reminder input
  const [showAddReminder, setShowAddReminder] = useState(false);

  // used to keep track of the difficulty and type of the event that is not necessarily in redux or db (for undoing changes)
  const [theType, setType] = useState(type);
  const [theDifficulty, setDifficulty] = useState(difficulty);

  // used to keep track of reminders that are not in redux or db (for ongoing changes)
  const [editedReminderIndex, setEditedIndex] = useState(null);
  const [newReminderText, setNewReminderText] = useState("");
  const [editedReminders, setEditedReminders] = useState([...reminders]);

  // ----------------------- Updating Difficulty and Type ---------------------------

  // update assignment difficulty in redux and db
  const changeAssignmentDifficultyDB = async (id, difficulty) => {
    await dispatch(updateAssignmentDifficulty(id, difficulty));
    await handleEdited(id, assignment.difficulty, type);
  };
  // update assignment type in redux and db
  const changeAssignmentTypeDB = async (id, type) => {
    await dispatch(updateAssignmentType(id, type));
    await handleEdited(id, assignment.difficulty, type);
  };
  // update assignment difficulty and type in redux and db
  const changeAssignmentDifficultyAndTypeDB = async (id, difficulty, type) => {
    await dispatch(updateAssignmentDifficulty(id, difficulty));
    await dispatch(updateAssignmentType(id, type));
    await handleEdited(id, difficulty, type);
  };

  // ----------------------- Completing an Assignment ---------------------------

  // complete an assignment in redux and db
  const completeDB = (id) => {
    dispatch(completeAssignment(id));
  };

  // ------------------------ Updating, Removing, Adding Reminders in REDUX AND DB --------------------------

  const updateReminder = (index) => {
    const updatedReminders = [...reminders];
    updatedReminders[index] = editedReminders[index];
    setEditedIndex(null);

    dispatch(updateAssignmentReminderArray(id, updatedReminders));
  };
  const removeReminder = async (reminderIndex) => {
    const updatedReminders = [...editedReminders];
    updatedReminders.splice(reminderIndex, 1);
    setEditedReminders(updatedReminders);

    dispatch(deleteAssignmentReminderAction(id, reminderIndex));
  };
  const addReminder = async () => {
    const updatedReminders = [...editedReminders];
    updatedReminders.push(newReminderText);
    setEditedReminders(updatedReminders);
    setNewReminderText("");
    setShowAddReminder(false);

    dispatch(addAssignmentReminderAction(id, newReminderText));
  };

  // ------------------------ Helper Functions --------------------------

  const extractContentInBrackets = (str) => {
    const matches = str.match(/\[(.*?)\]/);
    return matches ? matches[1] : "";
  };
  const formatDate = (date) => {
    if (
      Object.prototype.toString.call(date) === "[object Date]" &&
      !isNaN(date)
    ) {
      return date.toDateString();
    } else {
      return "Invalid Date";
    }
  };

  // ------------------------- Event Handlers -------------------------

  const handleUpdateButtonClick = async (id, difficulty, type) => {
    if (assignment.difficulty != difficulty && assignment.type != type) {
      await changeAssignmentDifficultyAndTypeDB(id, difficulty, type);
    } else if (assignment.difficulty != difficulty) {
      await changeAssignmentDifficultyDB(id, difficulty);
    } else if (assignment.assignmentType != type) {
      await changeAssignmentTypeDB(id, type);
    }
  };
  const handleEdited = async (id, difficulty, type) => {
    if (assignment.type == type && assignment.difficulty == difficulty) {
      await setEdited(false);
      onUpdateDifficultyAndType(false, id, difficulty, type);
    } else {
      await setEdited(true);
      onUpdateDifficultyAndType(true, id, difficulty, type);
    }
    setType(type);
    setDifficulty(difficulty);
  };
  const handleEditReminder = (index, value) => {
    const updatedReminders = [...editedReminders];
    updatedReminders[index] = value;
    setEditedReminders(updatedReminders);
  };

  // ------------------------ Undoing Changes --------------------------

  const undoAllChanges = async () => {
    await setEdited(false);
    await setType(assignment.type);
    await setDifficulty(assignment.difficulty);
    onUpdateDifficultyAndType(
      false,
      id,
      assignment.difficulty,
      assignment.type
    );
  };

  // ------------------------- Page Load -------------------------

  let assignments = useSelector((state) => state.assignmentsListReducer);
  let assignment = assignments.find((assignment) => assignment._id === id);
  const extractedContent = extractContentInBrackets(name);
  const displayName = extractedContent ? `${extractedContent}: ` : "";

  // ------------------------- Render -------------------------

  return (
    <div
      /* Determines if we need edited border or not */
      className={`mb-5 ${edited ? "border-2 border-red-500 rounded-lg" : ""}`}
    >
      <div
        className={
          formattedDateTime < new Date()
            ? "bg-red-500 rounded-tl-md rounded-tr-md"
            : formattedDateTime.toDateString() === new Date().toDateString()
            ? "bg-yellow-500 rounded-tl-md rounded-tr-md"
            : "bg-blue-500 rounded-tl-md rounded-tr-md"
        }
      >
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-white py-2 px-4">
            {displayName}
            <span className="text-white">{name.replace(/\[.*?\]/, "")}</span>
          </h3>
          {/* Complete Button */}
          <button
            className="bg-green-600 text-white px-3 py-1 rounded-md m-2 mr-4 text-sm"
            onClick={() => completeDB(id)}
          >
            Done
          </button>
        </div>
      </div>

      {/* Assignment Details */}
      <div className="p-4 bg-slate-100 rounded-bl-md rounded-br-md dark:bg-zinc-800">
        {/* Due Date */}
        <p className="text-md">
          <span className="font-semibold">Due: </span>
          {formatDate(formattedDateTime)}{" "}
          {`(${Math.floor(
            (formattedDateTime - new Date()) / (1000 * 60 * 60 * 24)
          )} days)`}
        </p>

        {/* Difficulty and Type */}
        <div className="md:flex">
          <div className="flex justify-between md:justify-normal">
            <select
              className="mr-2 px-2 py-2 rounded border border-gray-300 text-sm mt-2 w-1/2 md:w-auto dark:bg-zinc-600"
              onChange={(e) => {
                handleEdited(id, e.target.value, theType);
              }}
              value={theDifficulty}
            >
              <option value="1">Difficulty 1</option>
              <option value="2">Difficulty 2</option>
              <option value="3">Difficulty 3</option>
              <option value="4">Difficulty 4</option>
              <option value="5">Difficulty 5</option>
            </select>
            <select
              className="mr-2 px-2 py-2 rounded border border-gray-300 text-sm mt-2 w-1/2 md:w-auto dark:bg-zinc-600"
              onChange={(e) => {
                handleEdited(id, theDifficulty, e.target.value);
              }}
              value={theType}
            >
              <option value="Assignment">Assignment</option>
              <option value="Quiz">Quiz</option>
              <option value="Exam">Exam</option>
              <option value="Project">Project</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Update and Undo Buttons */}
          <div className="">
            {edited && (
              <button
                className="bg-green-600 text-white px-4 py-2 rounded-md text-sm sm: mt-2"
                onClick={() =>
                  handleUpdateButtonClick(id, theDifficulty, theType)
                }
              >
                Update
              </button>
            )}
            {edited && (
              <button
                className="mr-2 bg-red-500 text-white px-4 py-2 rounded-md ml-2 text-sm sm: mt-2"
                onClick={() => undoAllChanges()}
              >
                Undo
              </button>
            )}
          </div>
        </div>

        {/*Reminders*/}
        {reminders && reminders.length > 0 && (
          <div className="mt-4">
            <p className="font-semibold">Reminders:</p>
            <ul className="list-disc ml-6">
              {reminders.map((reminder, index) => (
                <div key={index} className="flex items-center w-full">
                  {editedReminderIndex === index ? (
                    <textarea
                      className="w-full px-2 text-base dark:bg-zinc-600 m-1"
                      value={editedReminders[index]}
                      onChange={(e) =>
                        handleEditReminder(index, e.target.value)
                      }
                      autoFocus
                      onBlur={() => updateReminder(index)}
                    />
                  ) : (
                    <li onClick={() => setEditedIndex(index)}>{reminder}</li>
                  )}
                  <button
                    className="text-slate-600 ml-4 text-default dark:text-slate-400"
                    onClick={() => removeReminder(index)}
                  >
                    ⓧ
                  </button>
                </div>
              ))}
            </ul>
          </div>
        )}

        {/* Add Reminder Input */}
        {showAddReminder ? (
          <div className="mt-4 w-full flex">
            <input
              type="text"
              value={newReminderText}
              onChange={(e) => setNewReminderText(e.target.value)}
              placeholder="Add a reminder..."
              className="border border-gray-300 text-sm px-2 py-2 rounded mr-2 w-full flex-grow dark:text-white dark:bg-zinc-600"
            />
            <button
              className="text-sm bg-blue-500 text-white px-3 py-1 rounded"
              onClick={addReminder}
            >
              Add
            </button>
          </div>
        ) : (
          <button
            className="text-sm text-slate-400 px-2 py-2 rounded underline"
            onClick={() => setShowAddReminder(true)}
          >
            Add Reminder
          </button>
        )}
      </div>
    </div>
  );
};

export default EventComponent;
