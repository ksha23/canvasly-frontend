import { takeEvery } from "redux-saga/effects";
import { ADD_ASSIGNMENT } from "../constant";

// worker Saga: will be fired on ADD_ASSIGNMENT actions
function* addAssignmentWorker(action) {
  const { data } = action.payload;
  console.log(data);
  const assignment = {
    name: data.assignment.name,
    dueDate: data.assignment.dueDate,
    type: data.assignment.type,
    difficulty: data.assignment.difficulty,
  };
  const calendarId = data.calendarId;
  try {
    // do api call
    yield fetch(
      `${process.env.REACT_APP_API_URL}/api/v1/assignments/add/${calendarId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(assignment),
      }
    );
  } catch (e) {
    console.error("Failed to add new assignment: ", e);
  }
}

/*
  Starts addAssignment on each dispatched `ADD_ASSIGNMENT` action.
  Allows concurrent addAssignment.
*/
function* addAssignmentSaga() {
  yield takeEvery(ADD_ASSIGNMENT, addAssignmentWorker);
}

export default addAssignmentSaga;
