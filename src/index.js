import React from "react";
import ReactDOM from "react-dom";

import "./index.scss";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import { DemoContainer } from "./components/demo-container";

import "./utility/fontawesome";

function App() {
  return (
    <div className="container">
      <h1>React Delayed Action Button</h1>
      <p>Basic demo for a delayed/cancelable action button</p>
      <DemoContainer />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
