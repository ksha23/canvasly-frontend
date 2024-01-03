import { takeEvery, put } from "redux-saga/effects";
import { GET_ASSIGNMENTS, SET_CALENDAR_ID } from "../constant";

// worker saga
function* setCalendarIdWorker(action) {
  const calendarId = action.calendarId;
  const response = yield fetch(
    `${process.env.REACT_APP_API_URL}/api/v1/users/setCalendarId`,
    {
      method: "put",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ calendarId }),
    }
  );
  const data = yield response.json();
  yield put({ type: GET_ASSIGNMENTS });
}

// watcher saga
function* setCalendarIdSaga() {
  yield takeEvery(SET_CALENDAR_ID, setCalendarIdWorker);
}

export default setCalendarIdSaga;
