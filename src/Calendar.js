import React, { Component } from "react";
import VIEWS from "./Views";
import transform from "lodash.transform";
// import ColumnWrapper from "./ColumnWrapper";

export default class Calendar extends Component {
  static defaultProps = {
    step: 30,
    getNow: () => new Date()
  };

  getViews = () => {
    const { views } = this.props;
    if (Array.isArray(views)) {
      transform(
        views,
        (result, n) => {
          result[n] = VIEWS[n];
        },
        {}
      );
    }
    return VIEWS;
  };

  getView = () => {
    const View = this.getViews();
    return View[this.props.view];
  };

  render() {
    let { date: current, getNow } = this.props;
    const View = this.getView();
    current = current || getNow();
    return (
      <div css={{ height: "100%" }}>
        <View {...this.props} date={current} />
      </div>
    );
  }
}
