import { SET_IS_LOGGED_IN } from "../constant";

export const setIsLoggedIn = (isLoggedIn) => {
  return {
    type: SET_IS_LOGGED_IN,
    isLoggedIn: isLoggedIn,
  };
};
