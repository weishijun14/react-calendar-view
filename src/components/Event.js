import React, { Component } from "react";
import styled from "@emotion/styled";

import "rc-tooltip/assets/bootstrap_white.css";

import ToolTip from "./ToolTip";

const EventBox = styled.div(props => {
  return {
    position: "absolute",
    cursor: "pointer",
    zIndex: 2,
    minWidth: "6px",
    top: `${props.top}%`,
    bottom: `${props.bottom}%`,
    left: 0,
    right: 0
  };
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
  render() {
    /* 拿到列宽，分配给有重叠的events。 events的左右顺序按照时间的开始时间(最早的排最左，同开始时间看持续时间) 。 */
    return (
      <ToolTip>
        <EventBox {...this.props}>
          <ButtonBox>
            <LeftStick />
            <RightContent />
          </ButtonBox>
        </EventBox>
      </ToolTip>
    );
  }
}
