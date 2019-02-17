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
          height: "650px"
        }}
      >
        <Calendar
          views={["week", "day"]}
          view="week"
          min={new Date(2018, 12, 12, 8, 0, 0)}
          max={new Date(2018, 12, 12, 18, 0, 0)}
          events={[
            {
              id: 1,
              start: new Date(2019, 1, 15, 10, 30),
              end: new Date(2019, 1, 15, 11, 30),
              title: 1
            },
            {
              id: 2,
              start: new Date(2019, 1, 14, 15, 0),
              end: new Date(2019, 1, 14, 16, 0),
              title: 2
            },
            {
              id: 3,
              start: new Date(2019, 1, 14, 12, 0),
              end: new Date(2019, 1, 14, 13, 0),
              title: 2
            }
          ]}
        />
      </div>
    </div>
  );
};

render(<App />, document.getElementById("root"));
