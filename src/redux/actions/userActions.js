// Keeps track of the user's data

import { FETCH_USER_DATA } from "../constant";
import { SET_USER_DATA } from "../constant";
import { SET_CALENDAR_ID } from "../constant";

export const fetchUserData = () => {
  return {
    type: FETCH_USER_DATA,
  };
};

export const setUserData = (userData) => {
  return {
    type: SET_USER_DATA,
    userData: userData,
  };
};

export const setCalendarId = (calendarId) => {
  return {
    type: SET_CALENDAR_ID,
    calendarId: calendarId,
  };
};
