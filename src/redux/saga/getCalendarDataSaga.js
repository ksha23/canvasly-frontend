import { takeEvery, put } from "redux-saga/effects";
import { GET_CALENDAR_DATA } from "../constant";
import { SET_CALENDAR_DATA } from "../constant";

// worker saga
function* getCalendarDataWorker() {
  const response = yield fetch(
    `${process.env.REACT_APP_API_URL}/api/v1/calendar/calendarData`,
    {
      method: "get",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = yield response.json();
  yield put({ type: SET_CALENDAR_DATA, payload: data });
}

// watcher saga
function* getCalendarDataSaga() {
  yield takeEvery(GET_CALENDAR_DATA, getCalendarDataWorker);
}

export default getCalendarDataSaga;
