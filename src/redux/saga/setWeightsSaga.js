import { takeEvery } from "redux-saga/effects";
import { SET_WEIGHTS } from "../constant";

// worker saga
function* setWeightsWorker(action) {
  const { dueDateWeight, difficultyWeight, typeWeight } = action.payload;
  const response = yield fetch(
    `${process.env.REACT_APP_API_URL}/api/v1/users/weights`,
    {
      method: "put",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ dueDateWeight, difficultyWeight, typeWeight }),
    }
  );
  const data = yield response.json();
}

// watcher saga
function* setWeightsSaga() {
  yield takeEvery(SET_WEIGHTS, setWeightsWorker);
}

export default setWeightsSaga;
