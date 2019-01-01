import React, { Component } from "react";
import TimeGutter from "./TimeGutter";
import styled from "@emotion/styled";
import moment from "moment";
import dates from "./utils/dates";
import { times } from "number-precision";

const RvcTimeContent = styled.div({});

export default class TimeGrid extends Component {
  static defaultProps = {
    step: 30,
    timeslots: 2,
    min: moment().startOf("day"),
    max: moment().endOf("day")
  };

  render() {
    const { start, min, max, step, timeslots } = this.props;
    const { merge } = dates;
    return (
      <div>
        <div>TimeGridHeader</div>
        <div>
          <TimeGutter
            step={step}
            timeslots={timeslots}
            min={merge(start, min)}
            max={merge(start, max)}
          />
        </div>
      </div>
    );
  }
}
