import { useEffect, useState } from "react";

import EventComponent from "../components/Event";
import Navbar from "../components/Navbar";

import { useSelector, useDispatch } from "react-redux";
import { getAssignments } from "../redux/actions/assignmentListActions";
import { getSortedAssignments } from "../redux/selectors/assignmentListSelector";
import NewAssignmentForm from "../components/NewAssignmentForm";
import applyTheme from "../utils/colorThemeHandler";

function AssignmentsPage() {
  const dispatch = useDispatch();
  const [updatedEvents, setUpdatedEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (event) => {
      applyTheme(); // Update the theme when the preference changes
    });

  // Get user data from redux store
  let userData = useSelector((state) => state.userDataReducer);
  if (!userData)
    userData = { dueDateWeight: 0, typeWeight: 0, difficultyWeight: 0 };

  // Get assignments from redux store using selector that sorts by user preferences
  let events = useSelector((state) =>
    getSortedAssignments(
      state,
      userData.dueDateWeight,
      userData.typeWeight,
      userData.difficultyWeight
    )
  );

  // ------------------ Page Load ----------------------

  // Fetch user data and assignments on page load and every minute
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(getAssignments());
    }, 60000);
    return () => clearInterval(interval);
  }, [dispatch]);

  // ------------------ Event Editing ----------------------

  // Update difficulty for an event by ID
  const onUpdateDifficultyAndType = (edited, id, difficulty, type) => {
    if (!edited) {
      // remove event from updatedEvents
      const updatedEventsCopy = [...updatedEvents];
      const existingIndex = updatedEventsCopy.findIndex(
        (event) => event.id === id
      );
      if (existingIndex !== -1) {
        updatedEventsCopy.splice(existingIndex, 1);
      }
      setUpdatedEvents(updatedEventsCopy);
      return;
    }
    const updatedEvent = { id, difficulty, type };
    const updatedEventsCopy = [...updatedEvents];
    const existingIndex = updatedEventsCopy.findIndex(
      (event) => event.id === id
    );
    if (existingIndex !== -1) {
      updatedEventsCopy[existingIndex] = updatedEvent;
    } else {
      updatedEventsCopy.push(updatedEvent);
    }
    setUpdatedEvents(updatedEventsCopy);
  };

  // Update all events with updated values
  const updateAllEvents = async () => {
    if (updatedEvents.length === 0) {
      return;
    }
    await Promise.all(
      updatedEvents.map(async (updatedEvent) => {
        const { id, difficulty, type } = updatedEvent;
        await updateAssignment(id, difficulty, type);
      })
    );
    window.location.reload(); // Refresh the page after updates
  };

  // Update an assignment by ID with new difficulty and type
  const updateAssignment = async (id, difficulty, type) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/v1/assignments/typeAndDifficulty/${id}`,
      {
        method: "put",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ type, difficulty }),
      }
    );
    const data = await response.json();
    return data;
  };

  //------------------ Event Handler ----------------------

  const handleFormClose = () => {
    setShowForm(false);
  };

  // ------------------ Render ----------------------

  return (
    <div className="dark:bg-black dark:text-white">
      <Navbar />
      {showForm ? (
        <div className="flex justify-center items-center">
          <NewAssignmentForm onFormSubmit={handleFormClose} />
        </div>
      ) : (
        <div className="p-10">
          <main className="max-w-4xl mx-auto">
            <section>
              <h2 className="text-2xl font-bold">Canvas Assignments:</h2>
              <button
                onClick={() => {
                  setShowForm(true);
                }}
              >
                + Assignment
              </button>
            </section>

            <section className="mb-4 flex justify-between items-center">
              {updatedEvents.length > 0 && (
                <button
                  className="bg-green-600 text-white text-sm px-4 py-2 rounded-md mt-2"
                  onClick={updateAllEvents}
                >
                  Update All
                </button>
              )}
              {updatedEvents.length > 0 && (
                <p className="dark:text-white">
                  {updatedEvents.length} assignments edited
                </p>
              )}
            </section>

            <div>
              {events &&
                events.length > 0 &&
                events.map((event) =>
                  !event.completed ? (
                    <EventComponent
                      key={event._id}
                      id={event._id}
                      name={event.name}
                      dateTime={event.dueDate}
                      difficulty={event.difficulty}
                      type={event.type}
                      reminders={event.reminders}
                      onUpdateDifficultyAndType={onUpdateDifficultyAndType}
                    />
                  ) : null
                )}
              {!events ||
                (events.length === 0 && (
                  <p className="text-center">No assignments found</p>
                ))}
            </div>

            {/* <section>
            <h2 className="text-2xl font-bold">Completed Assignments:</h2>
          </section> */}
          </main>
        </div>
      )}
    </div>
  );
}

export default AssignmentsPage;
