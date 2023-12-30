import { SET_WEIGHTS } from "../constant";

export const setWeights = (dueDateWeight, difficultyWeight, typeWeight) => {
  return {
    type: SET_WEIGHTS,
    payload: { dueDateWeight, difficultyWeight, typeWeight },
  };
};
