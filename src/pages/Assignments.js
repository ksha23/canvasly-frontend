import { useEffect, useState } from "react";
import EventComponent from "../components/Event";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import { getAssignments } from "../redux/actions/assignmentListAction";
import { useDispatch } from "react-redux";
import Confetti from "react-confetti";
import { fetchUserData } from "../redux/actions/userActions";
import { getSortedAssignments } from "../redux/selectors/assignmentListSelector";
import NewAssignmentForm from "../components/NewAssignmentForm";

function AssignmentsPage() {
  let userData = useSelector((state) => state.userDataReducer).user;
  const [showConfetti, setShowConfetti] = useState(false);
  const dispatch = useDispatch();
  if (!userData)
    userData = { dueDateWeight: 0, typeWeight: 0, difficultyWeight: 0 };

  let events = useSelector((state) =>
    getSortedAssignments(
      state,
      userData.dueDateWeight,
      userData.typeWeight,
      userData.difficultyWeight
    )
  );

  useEffect(() => {
    dispatch(fetchUserData());

    dispatch(getAssignments());
    const interval = setInterval(() => {
      dispatch(getAssignments()); // automatically refresh data every minute
    }, 60000);

    return () => clearInterval(interval); // Cleanup function to clear interval on component unmount
  }, [dispatch]);

  const [updatedEvents, setUpdatedEvents] = useState([]);

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

  const completedAnEvent = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000); // Change 3000 to the desired duration of the confetti
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

  return (
    <div className="dark:bg-black dark:text-white">
      <Navbar />
      <div className="p-10">
        {showConfetti && <Confetti />}
        <main className="max-w-4xl mx-auto">
          <section>
            <h2 className="text-2xl font-bold">Canvas Assignments:</h2>
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
                    completedAnEvent={completedAnEvent}
                    className="event"
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
          </section>

          <div>
            <NewAssignmentForm />
          </div> */}
        </main>
      </div>
    </div>
  );
}

export default AssignmentsPage;
