import {
  CREATING_PROJECT,
  CREATED_PROJECT,
  ERROR_CREATING_PROJECT,
  REQUEST_ERROR
} from "../constants";

const initialState = {
  creatingProjects: false,
  createdProjects: false,
  errorCreatingProjects: false,
  fetchError: false,
  message: "",
  status: "",
  error: ""
};

const createProjectReducer = (state = initialState, { type, payload }) => {
  if (type === CREATING_PROJECT) {
    return { ...state, creatingProjects: true };
  }
  if (type === CREATED_PROJECT) {
    return {
      ...state,
      creatingProjects: false,
      createdProjects: true,
      message: payload.message,
      status: payload.status
    };
  }
  if (type === ERROR_CREATING_PROJECT) {
    return {
      ...state,
      creatingProjects: false,
      createdProjects: false,
      errorCreatingProjects: true,
      error: payload
    };
  }
  if (type === REQUEST_ERROR) {
    return {
      ...state,
      creatingProjects: false,
      createdProjects: false,
      errorCreatingProjects: false,
      fetchError: true,
      error: payload
    };
  }
  return state;
};

export default createProjectReducer;
