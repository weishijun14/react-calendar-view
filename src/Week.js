import React, { Component } from "react";
import TimeGrid from "./TimeGrid";
import moment from "moment";

export default class Week extends Component {
  render() {
    const { date } = this.props;
    const range = Week.range(date);
    return <TimeGrid {...this.props} range={range} />;
  }
}

Week.range = date => {
  const start = moment(date).startOf("isoWeek");
  const end = moment(date).endOf("isoWeek");
  let current = start;
  let days = [];
  while (current.isBefore(end)) {
    days.push(current);
    current = moment(current).add(1, "days");
  }
  return days;
};
