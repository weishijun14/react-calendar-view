import React, { Component } from "react";
import NP from "number-precision";
import memoizeOne from "memoize-one";
import isEqual from "lodash.isequal";
import styled from "@emotion/styled";

import { toPercent } from "../utils/utils";

// TODO: when scroll mouse wheel, position lost.

const Line = styled.div(props => {
  return {
    position: "relative",
    height: "100%",
    width: "1px",
    flexBasis: "14.2%",
    borderColor: "rgb(234, 234, 234)",
    borderTopWidth: "thin",
    borderWidth: "0px 0px 0px 1px",
    borderStyle: "solid"
  };
});

const SelectionArea = styled.div(props => {
  return {
    position: "absolute",
    left: 0,
    right: 0,
    top: `${props.top}%`,
    bottom: `${100 - props.bottom}%`,
    backgroundColor: "#bdbdbd94"
  };
});

export default class VerticalLine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startGenePoint: 0,
      startRelativePoint: 0,
      selectedTop: null,
      selectedBottom: null,
      showSelectionBox: false
    };
    this.myRef = React.createRef();
    this.memoCalculateStart = memoizeOne(this._calculatePostion, isEqual);
  }

  componentDidMount = () => {
    const height = document.defaultView.getComputedStyle(
      this.myRef.current,
      null
    ).height;
    this.height = parseFloat(height.substring(0, height.length - 2));
  };

  computerDistanceToPercent = (distance, heightOrWidth) => {
    const decimal = NP.divide(distance, heightOrWidth);
    const rounded = NP.round(decimal, 4);
    return toPercent(rounded);
  };

  _onMouseDown = e => {
    // TODO:
    // 1. 当鼠标按下，并移动Y轴一定距离（差值）之后，开始计算鼠标当前坐标所占高度百分比。
    // 2. 用百分比动态对比行线百分比，超过即给该行覆盖颜色。
    // 3. 支持回退。
    // 转换为数学 即判断该百分比数字，是否落在两个百分比区间中。
    this.setState({
      startGenePoint: e.nativeEvent.offsetY,
      startRelativePoint: e.nativeEvent.clientY
    });
    window.document.addEventListener("mousemove", this._onMouseMove);
    window.document.addEventListener("mouseup", this._onMouseUp);
  };

  _onMouseMove = e => {
    // var endPoint = {
    //   x: e.clientX,
    //   y: e.clientY
    // };
    
    const startPer = this.computerDistanceToPercent(
      this.state.startGenePoint,
      this.height
    );

    const distancePer = this.computerDistanceToPercent(
      NP.minus(e.clientY, this.state.startRelativePoint),
      this.height
    );

    this._calculateSelectionBox(startPer, distancePer);
  };

  _onMouseUp = e => {
    window.document.removeEventListener("mouseup", this._onMouseUp);
    window.document.removeEventListener("mousemove", this._onMouseMove);
  };

  // TODO: need recalculate start & end. start: 0-100, end: 100-0;
  _calculatePostion = (point, heightPercentArr, startOrStop = "start") => {
    let p = null;
    for (let i = 0; i < heightPercentArr.length - 1; i += 1) {
      if (
        parseFloat(point) >= heightPercentArr[i] &&
        parseFloat(point) < heightPercentArr[i + 1]
      ) {
        return (p =
          startOrStop === "start"
            ? heightPercentArr[i]
            : heightPercentArr[i + 1]);
      } else {
        p = heightPercentArr[0];
      }
    }
    return p;
  };

  _calculateSelectionBox = (startPoint, distancePer) => {
    const { heightPercentArr } = this.props;
    const newHeightPercentArr = [0].concat(heightPercentArr);

    const startPosition = this.memoCalculateStart(
      startPoint,
      newHeightPercentArr,
      "start"
    );

    const stopPosition = this._calculatePostion(
      NP.plus(startPoint, distancePer),
      heightPercentArr,
      "stop"
    );

    const start = startPosition < stopPosition ? startPosition : stopPosition;
    const end = stopPosition > startPosition ? stopPosition : startPosition;
    this.setState({
      selectedTop: start,
      selectedBottom: end,
      showSelectionBox: true
    });
  };

  renderSelectionArea = () => {
    const { selectedTop, selectedBottom } = this.state;
    return <SelectionArea top={selectedTop} bottom={selectedBottom} />;
  };

  render() {
    const { showSelectionBox } = this.state;
    return (
      <Line onMouseDown={this._onMouseDown} ref={this.myRef}>
        {/* {this.renderBackground()}*/}
        {/* {this.renderSelectionArea()} */}
        {showSelectionBox ? this.renderSelectionArea() : null}
        {/*{this.renderEvent()} */}
      </Line>
    );
  }
}
