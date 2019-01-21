import React, { Component } from "react";
import TimeSlotGroup from "./TimeSlotGroup";
import styled from "@emotion/styled";
import NP from "number-precision";

const TimeSlotGroupWrapper = styled.div(props => {
  return {
    position: "relative",
    height: `${NP.times(props.groupsLength, props.timeslots) * 30}px`,
    width: "60px",
    backgroundColor: "#4db6ac"
  };
});

export default class TimeGutter extends Component {
  render() {
    const { timeslots, slotMetrics } = this.props;
    const groupsLength = slotMetrics.groups.length;
    return (
      <TimeSlotGroupWrapper groupsLength={groupsLength} timeslots={timeslots}>
        {slotMetrics.groups.map((item, idx) => {
          const i = slotMetrics.groups.length - 1 !== idx ? item : [item[0]];
          return (
            <TimeSlotGroup
              key={idx}
              group={i}
              groupsLength={groupsLength}
              heightPercent={NP.times(
                NP.plus(idx, 1),
                NP.divide(100, groupsLength)
              )}
            />
          );
        })}
      </TimeSlotGroupWrapper>
    );
  }
}
