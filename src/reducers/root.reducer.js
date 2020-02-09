import { combineReducers } from "redux";
import authReducer from "./auth.reducer";
import createProjectReducer from "./create.project.reducer";
import loadLocationsReducer from "./load.locations.reducer";
import loadProjectsReducer from "./load.projects.reducer";

const rootReducer = combineReducers({
  authReducer,
  createProjectReducer,
  loadLocationsReducer,
  loadProjectsReducer
});
export default rootReducer;
