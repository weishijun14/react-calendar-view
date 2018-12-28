import React from "react";
import { render, findDOMNode } from "react-dom";
import MyComponent from "../index";
import Calendar from "react-calendar-view";
import DragTest from "./DragTest";

const App = () => {
  return (
    <div>
      <DragTest />
    </div>
  );
};

render(<App />, document.getElementById("root"));
