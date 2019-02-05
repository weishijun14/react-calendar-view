import React, { Component } from "react";
import Tooltip from "rc-tooltip";
import "rc-tooltip/assets/bootstrap_white.css";

export default class ToolTip extends Component {
  render() {
    return (
      <Tooltip
        placement="right"
        visible
        trigger={["click"]}
        overlay={<span>tooltip</span>}
        overlayClassName="overlay"
      >
        {this.props.children}
      </Tooltip>
    );
  }
}
