import React, { Component } from "react";
import { getSlotMatrics } from "./utils/TimeSlots";
import TimeSlotGroup from "./TimeSlotGroup";

export default class TimeGutter extends Component {
  constructor(props) {
    super(props);
    const { min, max, step, timeslots } = this.props;
    this.slotMetrics = getSlotMatrics({ min, max, step, timeslots });
  }
  render() {
    return (
      <div>
        {this.slotMetrics.groups.map((item, idx) => {
          return <TimeSlotGroup key={idx} group={item} />;
        })}
      </div>
    );
  }
}
