import React from "react";
import { getToken, logout, isLoggedIn } from "../services/user.service";
import jwt from "jsonwebtoken";
import { Link, useHistory } from "react-router-dom";

const NavBar = () => {
  const decodeToken = jwt.decode(getToken());
  const history = useHistory();
  const handleLogout = () => {
    logout();
    history.replace("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand" to="/">
        Commsworth
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Home <span className="sr-only">(current)</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="create-project">
              Create project
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="load-projects">
              Load projects
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="load-locations">
              Load locations
            </Link>
          </li>
        </ul>
        <span className="mr-sm-2 text-white">
          {decodeToken !== null ? decodeToken.unique_name : ""}
        </span>
        <button
          onClick={handleLogout}
          className={
            isLoggedIn
              ? "btn btn-outline-success my-2 my-sm-0"
              : "btn btn-outline-danger my-2 my-sm-0"
          }
        >
          {isLoggedIn ? "Logout" : "LoggedOut"}
        </button>
      </div>
    </nav>
  );
};
export default NavBar;
