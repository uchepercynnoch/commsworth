import {
  LOADING_PROJECT,
  LOADED_PROJECT,
  ERROR_LOADING_PROJECT,
  REQUEST_ERROR
} from "../constants";

import { loadProjectService } from "../services/user.service";

export const loadProjects = () => dispatch => {
  dispatch({ type: LOADING_PROJECT });
  try {
    loadProjectService()
      .then(data => {
        const { loadProject } = data;
        dispatch({ type: LOADED_PROJECT, payload: loadProject });
      })
      .catch(error =>
        dispatch({ type: ERROR_LOADING_PROJECT, payload: error })
      );
  } catch (error) {
    dispatch({ type: REQUEST_ERROR, payload: error });
  }
};
