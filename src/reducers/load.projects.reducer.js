import {
  LOADING_PROJECT,
  LOADED_PROJECT,
  ERROR_LOADING_PROJECT,
  REQUEST_ERROR
} from "../constants";

const initialState = {
  loadingProjects: false,
  loadedProjects: false,
  errorLoadingProjects: false,
  requestError: false,
  projects: [],
  error: ""
};

const loadProjectsReducer = (state = initialState, { type, payload }) => {
  if (type === LOADING_PROJECT) {
    return { ...state, loadingProjects: true };
  }
  if (type === LOADED_PROJECT) {
    return {
      ...state,
      loadingProjects: false,
      loadedProjects: true,
      projects: payload
    };
  }
  if (type === ERROR_LOADING_PROJECT) {
    return {
      ...state,
      loadingProjects: false,
      loadedProjects: false,
      errorLoadingProjects: true,
      error: payload
    };
  }
  if (type === REQUEST_ERROR) {
    return {
      ...state,
      loadingProjects: false,
      loadedProjects: false,
      errorLoadingProjects: false,
      requestError: true,
      error: payload
    };
  }
  return state;
};

export default loadProjectsReducer;
