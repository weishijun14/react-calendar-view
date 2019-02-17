import React, { Component } from "react";
import Tooltip from "rc-tooltip";
import { jsx } from "@emotion/core";
import "rc-tooltip/assets/bootstrap_white.css";

const ToolTipWrapper = props => {
  return (
    <div>
      <div
        css={{
          backgroundColor: "rgb(0, 120, 215)",
          color: "rgb(255, 255, 255)",
          padding: "5px 12px 2px"
        }}
      >
        My calendar
      </div>
      <div css={{ padding: "17px 20px 12px 12px" }}>
        <p>My calendar content...</p>
        <p>My calendar content...</p>
        <p>My calendar content...</p>
      </div>
      <div css={{ backgroundColor: "rgb(243, 249, 253)", display: "flex" }}>
        <button>Save</button>
        <button>Cancel</button>
      </div>
    </div>
  );
};

export default class ToolTip extends Component {
  // 判断是左还是右 tooltip
  componentDidMount = () => {
    // console.log(document.body.clientWidth, "window.innerWidth");
    // console.log(
    //   getComputedStyle(this.props.childrenRef.current).height,
    //   "childrenRef"
    // );
  };

  handleConfirm = () => {
    this.props.handleAdd();
  };

  render() {
    const { data } = this.props;
    const { unconfirmed = false } = data;

    return (
      <Tooltip
        placement="right"
        defaultVisible
        trigger={["click"]}
        overlay={<ToolTipWrapper />}
        overlayClassName="overlay"
        destroyTooltipOnHide
        visible={unconfirmed}
      >
        {this.props.children}
      </Tooltip>
    );
  }
}
