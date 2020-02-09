import {
  LOGGING_IN_USER,
  REQUEST_ERROR,
  LOGGED_IN_USER,
  ERROR_LOGGING_IN_USER,
  CLEAR_LOGIN_SUCCESS
} from "../constants";
import { loginService, saveToken } from "../services/user.service";

export const login = data => dispatch => {
  dispatch({ type: LOGGING_IN_USER });
  try {
    loginService(data)
      .then(({ message, token }) => {
        saveToken(token);
        dispatch({ type: LOGGED_IN_USER, payload: message });
      })
      .catch(error =>
        dispatch({ type: ERROR_LOGGING_IN_USER, payload: error })
      );
  } catch (e) {
    dispatch({ type: REQUEST_ERROR, payload: e });
  }
};

export const clearLoginSuccess = () => dispatch => {
  dispatch({ type: CLEAR_LOGIN_SUCCESS });
};
