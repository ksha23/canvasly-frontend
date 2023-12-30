import { SET_IS_LOGGED_IN } from "../constant";
import { RESET } from "../constant";

export const loginStateReducer = (state = false, action) => {
  switch (action.type) {
    case RESET:
      return false;
    case SET_IS_LOGGED_IN:
      return action.isLoggedIn;
    default:
      return state;
  }
};
