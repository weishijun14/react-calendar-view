import React from "react";
import { render, findDOMNode } from "react-dom";
import MyComponent from "../index";
import Calendar from "react-calendar-view";
import DragTest from "./DragTest";

const App = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "700px"
      }}
    >
      <div
        style={{
          width: "90%",
          height: "650px",
          backgroundColor: "#40a9ff"
        }}
      >
        <Calendar
          views={["week", "day"]}
          view="week"
          min={new Date(2018, 12, 12, 8, 0, 0)}
          max={new Date(2018, 12, 12, 18, 0, 0)}
        />
      </div>
    </div>
  );
};

render(<App />, document.getElementById("root"));
