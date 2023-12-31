import { SET_USER_DATA } from "../constant";
import { RESET } from "../constant";
import { SET_USER_WEIGHTS } from "../constant";
import { SET_CALENDAR_ID } from "../constant";

export const userDataReducer = (state = {}, action) => {
  switch (action.type) {
    case RESET:
      return {};
    case SET_USER_DATA:
      return action.userData.user;
    case SET_USER_WEIGHTS:
      const typeWeight = action.payload.typeWeight;
      const difficultyWeight = action.payload.difficultyWeight;
      const dueDateWeight = action.payload.dueDateWeight;
      return {
        // change the weights individually and keep the rest the same
        ...state,
        typeWeight: typeWeight,
        difficultyWeight: difficultyWeight,
        dueDateWeight: dueDateWeight,
      };
    case SET_CALENDAR_ID:
      return {
        ...state,
        calendarId: action.calendarId,
      };
    default:
      return state;
  }
};
