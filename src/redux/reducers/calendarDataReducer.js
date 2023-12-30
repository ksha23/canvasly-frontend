import { SET_CALENDAR_DATA } from "../constant";

export const calendarDataReducer = (state = [], action) => {
  switch (action.type) {
    case SET_CALENDAR_DATA:
      return action.payload;
    default:
      return state;
  }
};
