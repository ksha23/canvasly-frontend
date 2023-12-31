// Keeps track of the assignments in the assignment list

import { GET_ASSIGNMENTS } from "../constant";
import { COMPLETE_ASSIGNMENT } from "../constant";
import { UPDATE_ASSIGNMENT_TYPE } from "../constant";
import { UPDATE_ASSIGNMENT_DIFFICULTY } from "../constant";
import { ADD_ASSIGNMENT_REMINDER } from "../constant";
import { UPDATE_ASSIGNMENT_REMINDER_ARRAY } from "../constant";
import { DELETE_ASSIGNMENT_REMINDER } from "../constant";

// get assignments from database and store in redux store
export const getAssignments = () => {
  return {
    type: GET_ASSIGNMENTS,
  };
};

// complete assignment
export const completeAssignment = (id) => {
  return {
    type: COMPLETE_ASSIGNMENT,
    id,
  };
};

// update assignment type
export const updateAssignmentType = (id, assignmentType) => {
  return {
    type: UPDATE_ASSIGNMENT_TYPE,
    id,
    assignmentType,
  };
};

// update assignment difficulty
export const updateAssignmentDifficulty = (id, difficulty) => {
  return {
    type: UPDATE_ASSIGNMENT_DIFFICULTY,
    id,
    difficulty,
  };
};

// add assignment reminder
export const addAssignmentReminderAction = (id, reminder) => {
  return {
    type: ADD_ASSIGNMENT_REMINDER,
    id,
    reminder,
  };
};

export const deleteAssignmentReminderAction = (id, reminderIndex) => {
  return {
    type: DELETE_ASSIGNMENT_REMINDER,
    id,
    reminderIndex,
  };
};

// update assignment reminder array
export const updateAssignmentReminderArray = (id, reminders) => {
  return {
    type: UPDATE_ASSIGNMENT_REMINDER_ARRAY,
    id,
    reminders,
  };
};
