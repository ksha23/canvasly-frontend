import { takeEvery } from "redux-saga/effects";
import { DELETE_ASSIGNMENT_REMINDER } from "../constant";

function* deleteAssignmentReminderWorker(action) {
  const id = action.id;
  const reminderIndex = action.reminderIndex;
  try {
    yield fetch(
      `${process.env.REACT_APP_API_URL}/api/v1/assignments/reminder/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reminderIndex }),
      }
    );
  } catch (error) {
    console.error(error);
  }
}

function* deleteAssignmentReminderSaga() {
  yield takeEvery(DELETE_ASSIGNMENT_REMINDER, deleteAssignmentReminderWorker);
}

export default deleteAssignmentReminderSaga;
