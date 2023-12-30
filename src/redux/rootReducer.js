import { combineReducers } from "redux";
import { assignmentsListReducer } from "./reducers/assignmentListReducer";
import { loginStateReducer } from "./reducers/loginStateReducer";
import { userDataReducer } from "./reducers/userDataReducer";
import { calendarDataReducer } from "./reducers/calendarDataReducer";

export default combineReducers({
  assignmentsListReducer,
  loginStateReducer,
  userDataReducer,
  calendarDataReducer,
});
