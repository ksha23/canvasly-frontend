import { takeEvery } from "redux-saga/effects";
import { UPDATE_ASSIGNMENT_REMINDER_ARRAY } from "../constant";

function* updateAssignmentReminderArrayWorker(action) {
  const id = action.id;
  const reminders = action.reminders;
  try {
    yield fetch(
      `${process.env.REACT_APP_API_URL}/api/v1/assignments/reminders/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reminders }),
      }
    );
  } catch (error) {
    console.error(error);
  }
}

function* updateAssignmentReminderArraySaga() {
  yield takeEvery(
    UPDATE_ASSIGNMENT_REMINDER_ARRAY,
    updateAssignmentReminderArrayWorker
  );
}

export default updateAssignmentReminderArraySaga;
