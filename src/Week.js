import React, { Component } from "react";
import TimeGrid from "./TimeGrid";

export default class Week extends Component {
  render() {
    return (
      <div>
        <TimeGrid {...this.props} />
      </div>
    );
  }
}
