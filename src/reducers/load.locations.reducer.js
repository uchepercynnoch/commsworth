import {
  LOADED_LOCATIONS,
  LOADING_LOCATIONS,
  ERROR_LOADING_LOCATIONS,
  REQUEST_ERROR
} from "../constants";

const initialState = {
  loadingLocations: false,
  loadedLocations: false,
  errorLoadingLocations: false,
  requestError: false,
  locations: [],
  error: ""
};

const loadLocationsReducer = (state = initialState, { type, payload }) => {
  if (type === LOADING_LOCATIONS) {
    return { ...state, loadingLocations: true };
  }
  if (type === LOADED_LOCATIONS) {
    return {
      ...state,
      loadingLocations: false,
      loadedLocations: true,
      locations: payload
    };
  }
  if (type === ERROR_LOADING_LOCATIONS) {
    return {
      ...state,
      loadingLocations: false,
      loadedLocations: false,
      errorLoadingLocations: true,
      error: payload
    };
  }
  if (type === REQUEST_ERROR) {
    return {
      ...state,
      loadingLocations: false,
      loadedLocations: false,
      errorLoadingLocations: false,
      requestError: true,
      error: payload
    };
  }
  return state;
};

export default loadLocationsReducer;
