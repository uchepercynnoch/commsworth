import React from "react";
import { Redirect, Route } from "react-router-dom";
import { isLoggedIn } from "../services/user.service";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: `${process.env.PUBLIC_URL}/login`,
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
