import { takeEvery } from "redux-saga/effects";
import { ADD_ASSIGNMENT_REMINDER } from "../constant";

function* addAssginmentReminderWorker(action) {
  yield fetch(
    `${process.env.REACT_APP_API_URL}/api/v1/assignments/reminder/${action.id}`,
    {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ id: action.id, reminder: action.reminder }),
    }
  );
}

function* addAssginmentReminderSaga() {
  yield takeEvery(ADD_ASSIGNMENT_REMINDER, addAssginmentReminderWorker);
}

export default addAssginmentReminderSaga;
