import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { isLoggedIn } from "../services/user.service";
export default class HomePage extends Component {
  render() {
    return isLoggedIn() ? (
      <Redirect to="/home" />
    ) : (
      <div className="jumbotron jumbotron-fluid text-center">
        <div className="container">
          <h3 className="display-4">Welcome!</h3>
          <p className="lead">You are not logged in.</p>
          <Link className="btn btn-primary btn-md" role="button" to="/login">
            Please Login
          </Link>
        </div>
      </div>
    );
  }
}
