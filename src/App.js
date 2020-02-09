import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import LoadProjectPage from "./pages/ProjectsPage";
import CreateProjectPage from "./pages/CreateProjectPage";
import Locations from "./pages/LocationsPage";
import WelcomePage from "./pages/WelcomePage";
import PrivateRoute from "./components/PrivateRoute";
import { history } from "./helpers";
import PageNotFound from "./pages/PageNotFound";

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={WelcomePage} />
          <PrivateRoute path="/home" component={HomePage} />
          <Route path="/login" component={LoginPage} />
          <PrivateRoute path="/create-project" component={CreateProjectPage} />
          <PrivateRoute path="/load-projects" component={LoadProjectPage} />
          <PrivateRoute path="/load-locations" component={Locations} />
          <Route path="/404" component={PageNotFound} />{" "}
          {/** Redirect to error page */}
          <Redirect from="*" to="/404" />
        </Switch>
      </Router>
    );
  }
}
export default App;
