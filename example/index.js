import React from "react";
import { render } from "react-dom";
import MyComponent from "../index";

const App = () => {
  return <MyComponent />;
};

render(<App />, document.getElementById("root"));
