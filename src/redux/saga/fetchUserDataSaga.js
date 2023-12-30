import { takeEvery, put } from "redux-saga/effects";
import { FETCH_USER_DATA, SET_IS_LOGGED_IN } from "../constant";
import { SET_USER_DATA } from "../constant";

function* fetchUserDataWorker() {
  let data = yield fetch(
    `${process.env.REACT_APP_API_URL}/api/v1/users/userSimple`,
    {
      method: "get",
      credentials: "include",
    }
  );
  data = yield data.json();
  yield put({ type: SET_USER_DATA, userData: data });
  if (data.user !== null) {
    yield put({ type: SET_IS_LOGGED_IN, isLoggedIn: true });
  }
}

function* fetchUserDataSaga() {
  yield takeEvery(FETCH_USER_DATA, fetchUserDataWorker);
}

export default fetchUserDataSaga;
