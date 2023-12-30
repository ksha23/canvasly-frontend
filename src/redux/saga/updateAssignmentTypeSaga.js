import { takeEvery } from "redux-saga/effects";
import { UPDATE_ASSIGNMENT_TYPE } from "../constant";

function* updateAssignmentTypeWorker(action) {
  yield fetch(
    `${process.env.REACT_APP_API_URL}/api/v1/assignments/type/${action.id}`,
    {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ id: action.id, type: action.assignmentType }),
    }
  );
}

function* updateAssignmentTypeSaga() {
  yield takeEvery(UPDATE_ASSIGNMENT_TYPE, updateAssignmentTypeWorker);
}

export default updateAssignmentTypeSaga;
