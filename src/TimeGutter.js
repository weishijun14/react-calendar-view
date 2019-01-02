import React, { Component } from "react";
import { getSlotMatrics } from "./utils/TimeSlots";
import TimeSlotGroup from "./TimeSlotGroup";
import styled from "@emotion/styled";
import NP from "number-precision";

const TimeSlotGroupWrapper = styled.div(props => {
  return {
    position: "relative",
    height: `${NP.times(props.groupsLength, props.timeslots) * 30}px`,
    width: "60px"
  };
});

export default class TimeGutter extends Component {
  constructor(props) {
    super(props);
    const { min, max, step, timeslots } = this.props;
    this.slotMetrics = getSlotMatrics({ min, max, step, timeslots });
  }
  render() {
    const { timeslots } = this.props;
    const groupsLength = this.slotMetrics.groups.length;
    return (
      <TimeSlotGroupWrapper groupsLength={groupsLength} timeslots={timeslots}>
        {this.slotMetrics.groups.map((item, idx) => {
          return (
            <TimeSlotGroup
              key={idx}
              group={item}
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
