import React, { Component } from "react";
import VIEWS from "./Views";
import transform from "lodash.transform";
// import ColumnWrapper from "./ColumnWrapper";

export default class Calendar extends Component {
  static defaultProps = {
    step: 30
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
    const View = this.getView();
    return (
      <div>
        <View {...this.props} />
      </div>
    );
  }
}
