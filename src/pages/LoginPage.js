import React, { Component } from "react";
import * as Yup from "yup";
import LoginForm from "../components/LoginForm";
import { connect } from "react-redux";
import { login, clearLoginSuccess } from "../actions/auth.action";
import { Redirect } from "react-router-dom";
import Title from "../components/Title";
const loginSchema = Yup.object().shape({
  email: Yup.string()
    .max(55, "Too long!")
    .email("Invalid email!")
    .required("Email required!"),
  password: Yup.string()
    .min(4, "Password is too short!")
    .required("Password is required!")
});
class LoginPage extends Component {
  state = {
    initialValues: {
      email: "",
      password: ""
    },
    loggingInUser: false,
    isUserLoggedIn: false,
    loginHasError: false,
    requestHasError: false,
    user: {},
    error: {},
    requestError: {}
  };

  //Get state from store and update component state
  static getDerivedStateFromProps(props, state) {
    if (
      props.loggingInUser !== state.loggingInUser ||
      props.isUserLoggedIn !== state.isUserLoggedIn ||
      props.loginHasError !== state.loginHasError ||
      props.requestHasError !== state.requestHasError ||
      props.user !== state.user ||
      props.requestError !== state.requestError
    ) {
      return {
        loggingInUser: props.loggingInUser,
        isUserLoggedIn: props.isUserLoggedIn,
        loginHasError: props.loginHasError,
        requestHasError: props.requestHasError,
        user: props.user,
        error: props.error,
        requestError: props.requestError
      };
    }
    return null;
  }

  componentWillUnmount() {
    const { isUserLoggedIn } = this.state;
    if (isUserLoggedIn) {
      this.props.clearLoginSuccess(); //reset isUserLoggedIn to false in store
    }
  }

  login = credentials => {
    this.props.login(credentials);
  };

  render() {
    const { initialValues, loggingInUser, isUserLoggedIn } = this.state;
    if (isUserLoggedIn) {
      return <Redirect to="/home" />;
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col-8 mx-auto col-md-6 col-sm-4 my-5">
            <Title text="Login" />
          </div>
        </div>
        <div className="row">
          <div className="col-8 mx-auto col-md-6 col-sm-4 mb-1">
            {loggingInUser && <strong>Logging in....</strong>}
            <LoginForm
              loginSchema={loginSchema}
              initialValues={initialValues}
              handleLogin={this.login}
            />
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  loggingInUser: state.authReducer.loggingInUser,
  isUserLoggedIn: state.authReducer.isUserLoggedIn,
  loginHasError: state.authReducer.loginHasError,
  requestHasError: state.authReducer.requestHasError,
  user: state.authReducer.user,
  error: state.authReducer.error,
  requestError: state.authReducer.requestError
});
export default connect(mapStateToProps, { login, clearLoginSuccess })(
  LoginPage
);
