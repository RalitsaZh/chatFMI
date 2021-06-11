import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import TimeAgo from "javascript-time-ago";

import en from "javascript-time-ago/locale/en";

import { Provider } from "react-redux";

import store from "./redux/store";

TimeAgo.addDefaultLocale(en);


ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);
