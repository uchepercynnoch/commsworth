import {
  CREATING_PROJECT,
  CREATED_PROJECT,
  ERROR_CREATING_PROJECT,
  REQUEST_ERROR
} from "../constants";
import { createProjectService } from "../services/user.service";

export const createProject = data => dispatch => {
  dispatch({ type: CREATING_PROJECT });
  try {
    createProjectService(data)
      .then(data => {
        dispatch({ type: CREATED_PROJECT, payload: data });
      })
      .catch(error =>
        dispatch({ type: ERROR_CREATING_PROJECT, payload: error })
      );
  } catch (error) {
    dispatch({ type: REQUEST_ERROR, payload: error });
  }
};
