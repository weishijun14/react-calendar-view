import React, { Component } from "react";
import TimeGutter from "./TimeGutter";
import styled from "@emotion/styled";
import moment from "moment";
import NP from "number-precision";

import dates from "./utils/dates";
import { getSlotMatrics } from "./utils/TimeSlots";
import { flatten } from "./utils/utils";
import VerticalLine from "./components/VerticalLine";

const GridContainer = styled.div({
  height: "100%"
});

const TimeGridBody = styled.div({
  display: "flex"
});

const ContentContainer = styled.div(props => ({
  display: "flex",
  position: "relative",
  backgroundColor: "#f8f8f8",
  // height: "1440px",
  flexGrow: 1
}));

const HorizenLine = styled.div(props => {
  return {
    width: "100%",
    position: "absolute",
    borderColor: "rgb(234, 234, 234)",
    borderTopWidth: "thin",
    borderWidth: "1px 0px 0px 0px",
    borderStyle: `${props.isOdd ? "dashed" : "solid"}`,
    top: `${props.heightPercent}%`
  };
});

// const VerticalLine = styled.div(props => {
//   return {
//     height: "100%",
//     width: "1px",
//     flexBasis: "14.2%",
//     borderColor: "rgb(234, 234, 234)",
//     borderTopWidth: "thin",
//     borderWidth: "0px 0px 0px 1px",
//     borderStyle: "solid"
//   };
// });

export default class TimeGrid extends Component {
  static defaultProps = {
    step: 30,
    timeslots: 2,
    min: moment().startOf("day"),
    max: moment().endOf("day")
  };

  constructor(props) {
    super(props);
    const { min, max, step, timeslots } = this.props;
    this.slotMetrics = getSlotMatrics({ min, max, step, timeslots });
  }

  renderHorizen = heightPercentArr => {
    return heightPercentArr.map((item, idx) => {
      return (
        <HorizenLine isOdd={idx % 2 === 0} key={idx} heightPercent={item} />
      );
    });
  };

  renderVertical = (range, heightPercentArr) => {
    // console.log(range, "range");
    return range.map((item, index) => {
      return (
        <VerticalLine
          key={index}
          onMouseDown={this._onMouseDown}
          heightPercentArr={heightPercentArr}
        />
      );
    });
  };

  render() {
    const { start, min, max, step, timeslots, range } = this.props;
    const { merge } = dates;
    const groupsLength = this.slotMetrics.groups.length;
    const flattenedArr = flatten(this.slotMetrics.groups);
    const heightPercentArr = flattenedArr.map((item, idx) => {
      return NP.times(NP.plus(idx, 1), NP.divide(100, groupsLength * 2));
    });
    return (
      <GridContainer>
        <div>TimeGridHeader</div>
        <TimeGridBody>
          <TimeGutter
            step={step}
            timeslots={timeslots}
            min={merge(start, min)}
            max={merge(start, max)}
            slotMetrics={this.slotMetrics}
          />
          <ContentContainer>
            {this.renderHorizen(heightPercentArr)}
            {this.renderVertical(range, heightPercentArr)}
          </ContentContainer>
        </TimeGridBody>
      </GridContainer>
    );
  }
}
