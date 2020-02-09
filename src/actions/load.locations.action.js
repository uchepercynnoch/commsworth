import {
  LOADED_LOCATIONS,
  LOADING_LOCATIONS,
  ERROR_LOADING_LOCATIONS,
  REQUEST_ERROR
} from "../constants";
import { loadLocationsService } from "../services/user.service";

export const loadLocations = () => dispatch => {
  dispatch({ type: LOADING_LOCATIONS });
  try {
    loadLocationsService()
      .then(data => {
        const { loadLocations } = data;
        dispatch({ type: LOADED_LOCATIONS, payload: loadLocations });
      })
      .catch(error =>
        dispatch({ type: ERROR_LOADING_LOCATIONS, payload: error })
      );
  } catch (error) {
    dispatch({ type: REQUEST_ERROR, payload: error });
  }
};
