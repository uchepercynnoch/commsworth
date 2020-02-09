import React, { Component, Fragment } from "react";
import NavBar from "../components/NavBar";
import Title from "../components/Title";
export default class HomePage extends Component {
  render() {
    return (
      <Fragment>
        <NavBar />
        <div className="container">
          <div className="row">
            <div className="col-8 mx-auto col-md-6 col-sm-4 my-5">
              <Title text="Home" />
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
