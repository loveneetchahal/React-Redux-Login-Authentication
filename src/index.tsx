import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import {Provider} from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ReduxStore } from "./store/ReduxStore";

ReactDOM.render(
  <React.StrictMode> 
    <BrowserRouter>
      <Provider store={ReduxStore}>         
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);