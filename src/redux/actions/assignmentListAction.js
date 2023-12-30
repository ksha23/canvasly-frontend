import { GET_ASSIGNMENTS } from "../constant";
import { COMPLETE_ASSIGNMENT } from "../constant";
import { UPDATE_ASSIGNMENT_TYPE } from "../constant";
import { UPDATE_ASSIGNMENT_DIFFICULTY } from "../constant";
import { ADD_ASSIGNMENT_REMINDER } from "../constant";
import { UPDATE_ASSIGNMENT_REMINDER_ARRAY } from "../constant";

export const getAssignments = () => {
  return {
    type: GET_ASSIGNMENTS,
  };
};

export const completeAssignment = (id) => {
  return {
    type: COMPLETE_ASSIGNMENT,
    id,
  };
};

export const updateAssignmentType = (id, assignmentType) => {
  return {
    type: UPDATE_ASSIGNMENT_TYPE,
    id,
    assignmentType,
  };
};

export const updateAssignmentDifficulty = (id, difficulty) => {
  return {
    type: UPDATE_ASSIGNMENT_DIFFICULTY,
    id,
    difficulty,
  };
};

export const addAssignmentReminderAction = (id, reminder) => {
  return {
    type: ADD_ASSIGNMENT_REMINDER,
    id,
    reminder,
  };
};

export const updateAssignmentReminderArray = (id, reminders) => {
  return {
    type: UPDATE_ASSIGNMENT_REMINDER_ARRAY,
    id,
    reminders,
  };
};
