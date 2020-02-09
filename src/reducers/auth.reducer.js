import {
  ERROR_LOGGING_IN_USER,
  LOGGED_IN_USER,
  LOGGING_IN_USER,
  REQUEST_ERROR,
  CLEAR_LOGIN_SUCCESS
} from "../constants";

const initialState = {
  loggingInUser: false,
  isUserLoggedIn: false,
  loginHasError: false,
  requestHasError: false,
  user: {},
  error: {},
  requestError: {}
};

const authReducer = (state = initialState, { type, payload }) => {
  if (type === LOGGING_IN_USER) {
    return { ...state, loggingInUser: true };
  }
  if (type === LOGGED_IN_USER) {
    return {
      ...state,
      loggingInUser: false,
      isUserLoggedIn: true,
      user: payload
    };
  }
  if (type === ERROR_LOGGING_IN_USER) {
    return {
      ...state,
      loggingInUser: false,
      loginHasError: true,
      error: payload
    };
  }
  if (type === REQUEST_ERROR) {
    return {
      ...state,
      loggingInUser: false,
      loginHasError: false,
      requestHasError: true,
      requestError: payload
    };
  }
  if (type === CLEAR_LOGIN_SUCCESS) {
    return {
      ...state,
      loggingInUser: false,
      isUserLoggedIn: false,
      loginHasError: false
    };
  }
  return state;
};

export default authReducer;
