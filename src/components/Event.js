import React, { Component } from "react";
import styled from "@emotion/styled";
import { jsx, css } from "@emotion/core";
import NP from "number-precision";

import "rc-tooltip/assets/bootstrap_white.css";

import ToolTip from "./ToolTip";

const EventBox = React.forwardRef((props, ref) => {
  return (
    <div
      onMouseDown={props.onMouseDown}
      css={css({
        position: "absolute",
        cursor: "pointer",
        zIndex: 2,
        minWidth: "6px",
        top: `${props.top}%`,
        bottom: `${props.bottom}%`,
        left: 0,
        right: 0,
        userSelect: "none"
      })}
      ref={ref}
    >
      {props.children}
    </div>
  );
});

const ButtonBox = styled.div`
  padding-left: 6px;
  border-radius: 2px;
  height: 100%;
  position: absolute;
  box-sizing: border-box;
  width: 100%;
`;

const LeftStick = styled.div`
  background-color: rgb(0, 120, 215);
  border-color: rgb(0, 120, 215);
  border-style: solid;
  border-width: 1px;
  left: 0px;
  right: 0px;
  border-radius: 2px 0 0 2px;
  top: 0px;
  bottom: 0px;
  width: 6px;
  min-width: 6px;
  position: absolute;
  height: auto;
  min-height: 4px;
}`;

const RightContent = styled.div`
  background-color: rgba(0, 120, 215, 0.24);
  color: rgb(0, 67, 120);
  fill: rgb(0, 67, 120);
  border-color: rgba(0, 120, 215, 0.24);
  border-width: 0px;
  border-style: solid;
  height: 100%;
`;

export default class Event extends Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  _onMouseDown = e => {
    e.stopPropagation();
    this.startGenePoint = e.offsetY;
    this.startRelativePoint = e.clientY;
    window.document.addEventListener("mousemove", this._onMouseMove);
    window.document.addEventListener("mouseup", this._onMouseUp);
  };

  _onMouseMove = e => {
    e.stopPropagation();
    // TODO:
    // 当位移超过5px时，生成一个外部的方块，同时，原背景虚化。
    // 当上下位移值超过一个step时，方块步进（暂时只有上下移动）。
    console.log(NP.minus(e.clientY, this.startRelativePoint), "_onMouseMove");
  };

  _onMouseUp = e => {
    e.stopPropagation();
    window.document.removeEventListener("mousemove", this._onMouseMove);
    window.document.removeEventListener("mouseup", this._onMouseUp);
  };

  handleAdd = () => {
    this.props.addEvent();
  };

  render() {
    // console.log(this.props, "ooo");
    /* 拿到列宽，分配给有重叠的events。 events的左右顺序按照时间的开始时间(最早的排最左，同开始时间看持续时间) 。 */
    return (
      <ToolTip
        childrenRef={this.ref}
        handleAdd={this.handleAdd}
        {...this.props}
      >
        <EventBox
          {...this.props}
          ref={this.ref}
          onMouseDown={this._onMouseDown}
        >
          <ButtonBox draggable={false}>
            <LeftStick />
            <RightContent>111</RightContent>
          </ButtonBox>
        </EventBox>
      </ToolTip>
    );
  }
}
