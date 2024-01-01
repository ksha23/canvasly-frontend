import assignmnentListSaga from "./saga/assignmentListSaga";
import completeAssignmentSaga from "./saga/completeAssignmentSaga";
import updateAssignmentDifficultySaga from "./saga/updateAssignmentDifficultySaga";
import updateAssignmentTypeSaga from "./saga/updateAssignmentTypeSaga";
import addAssginmentReminderSaga from "./saga/addAssignmentReminderSaga";
import fetchUserDataSaga from "./saga/fetchUserDataSaga";
import getCalendarDataSaga from "./saga/getCalendarDataSaga";
import setWeightsSaga from "./saga/setWeightsSaga";
import setCalendarIdSaga from "./saga/setCalendarIdSaga";
import updateAssignmentReminderArraySaga from "./saga/updateAssignmentReminderArraySaga";
import deleteAssignmentReminderSaga from "./saga/deleteAssignmentReminderSaga";
import addAssignmentSaga from "./saga/addAssignmentSaga";

import { all } from "redux-saga/effects";

export default function* rootSaga() {
  yield all([
    assignmnentListSaga(),
    completeAssignmentSaga(),
    updateAssignmentDifficultySaga(),
    updateAssignmentTypeSaga(),
    addAssginmentReminderSaga(),
    fetchUserDataSaga(),
    getCalendarDataSaga(),
    setWeightsSaga(),
    setCalendarIdSaga(),
    updateAssignmentReminderArraySaga(),
    deleteAssignmentReminderSaga(),
    addAssignmentSaga(),
  ]);
}
