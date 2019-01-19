import React, { Component } from "react";
import styled from "@emotion/styled";
import moment from "moment";
import NP from "number-precision";

const TimeSlotGroupWrapper = styled.div(props => {
  return {
    position: "absolute",
    top: `${props.heightPercent}%`,
    width: "100%",
    textAlign: "center",
    "& div": {
      position: "relative",
      bottom: "8px"
    }
  };
});

export default class TimeSlotGroup extends Component {
  render() {
    const { group, heightPercent } = this.props;
    return (
      <TimeSlotGroupWrapper heightPercent={heightPercent}>
        {group.map((item, idx) => {
          if (moment(item).minute() !== 0) return null;
          return <div key={idx}>{moment(item).format("H")}</div>;
        })}
      </TimeSlotGroupWrapper>
    );
  }
}
