import React from "react";
import { render } from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import configStore from "./store/config.store";
import registerServiceWorker from "./registerServiceWorker";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";

render(
  <Provider store={configStore}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
