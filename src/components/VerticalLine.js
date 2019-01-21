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
    bottom: `${props.bottom}%`,
    backgroundColor: "#bdbdbd94"
  };
});

export default class VerticalLine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // startGenePoint: 0,
      // startRelativePoint: 0,
      selectedTop: null,
      selectedBottom: null,
      showSelectionBox: false
    };
    this.startGenePoint = 0;
    this.selectedTop = 0;
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
    e.stopPropagation();
    // TODO:
    // 1. 当鼠标按下，并移动Y轴一定距离（差值）之后，开始计算鼠标当前坐标所占高度百分比。
    // 2. 用百分比动态对比行线百分比，超过即给该行覆盖颜色。
    // 3. 支持回退。
    // 转换为数学 即判断该百分比数字，是否落在两个百分比区间中。
    // this.setState({
    //   startGenePoint: e.nativeEvent.offsetY,
    //   startRelativePoint: e.nativeEvent.clientY
    // });
    this.startGenePoint = e.nativeEvent.offsetY;
    this.startRelativePoint = e.nativeEvent.clientY;
    window.document.addEventListener("mousemove", this._onMouseMove);
    window.document.addEventListener("mouseup", this._onMouseUp);
  };

  _onMouseMove = e => {
    // 记录移动距离(百分比)， 调用计算选框方法(起始点，移动距离)。
    e.stopPropagation();
    // const { startRelativePoint } = this.state;
    const activeDistance = 10;
    if (
      Math.abs(NP.minus(e.clientY, this.startRelativePoint)) >= activeDistance
    ) {
      const startPercent = this.computerDistanceToPercent(
        this.startGenePoint,
        this.height
      );

      const distancePerent = this.computerDistanceToPercent(
        NP.minus(e.clientY, this.startRelativePoint),
        this.height
      );

      this._calculateSelectionBox(startPercent, distancePerent);
    }
  };

  _onMouseUp = e => {
    e.stopPropagation();
    window.document.removeEventListener("mouseup", this._onMouseUp);
    window.document.removeEventListener("mousemove", this._onMouseMove);
    // 1. 构造器里面的相关项置空。
    // 2. 选框状态 --> 待确认状态。
    // 3. 弹出对话框。
  };

  // TODO: need recalculate start & end. start: 0-100, end: 100-0;
  _calculatePostion = (point, heightPercentArr, startOrStop = "start") => {
    let p = null;
    for (let i = 0; i < heightPercentArr.length - 1; i += 1) {
      if (
        parseFloat(point) >= heightPercentArr[i] &&
        parseFloat(point) < heightPercentArr[i + 1]
      ) {
        if (startOrStop === "start") {
          return (p = heightPercentArr[i]);
        }
        return (p = heightPercentArr[i + 1]);
      }
    }
  };

  _calculateSelectionBox = (startPoint, distancePer) => {
    const { heightPercentArr } = this.props;
    const beginWithZeroHeightPercentArr = [0].concat(heightPercentArr);
    let selectedTop;
    let selectedBottom;
    const point1 = distancePer > 0 ? startPoint : startPoint;
    const point2 = NP.plus(startPoint, distancePer);
    const arr = beginWithZeroHeightPercentArr;
    const str1 = distancePer > 0 ? "start" : "stop";
    const str2 = distancePer > 0 ? "stop" : "start";
    const resultWithMemo = this.memoCalculateStart(point1, arr, str1);
    const resultWithoutMemo = this._calculatePostion(point2, arr, str2);

    if (distancePer > 0) {
      selectedTop = resultWithMemo;
      selectedBottom = 100 - resultWithoutMemo;
    } else {
      selectedBottom = 100 - resultWithMemo;
      selectedTop = resultWithoutMemo;
    }

    //  selectedTop in heightPercentArr get startTime
    //  selectedBottom in heightPercentArr get endTime
    // console.log(selectedTop, "selectedTop");
    // console.log(selectedBottom, "selectedBottom");
    console.log(heightPercentArr, "heightPercentArr");
    // console.log(this.props);

    this.setState({
      selectedTop,
      selectedBottom,
      showSelectionBox: true
    });
  };

  _renderSelectionArea = () => {
    const { selectedTop, selectedBottom } = this.state;
    return <SelectionArea top={selectedTop} bottom={selectedBottom} />;
  };

  render() {
    const { showSelectionBox } = this.state;
    return (
      <Line onMouseDown={this._onMouseDown} ref={this.myRef}>
        {/* {this.renderBackground()}*/}
        {/* {this.renderSelectionArea()} */}
        {showSelectionBox ? this._renderSelectionArea() : null}
        {/*{this.renderEvent()} */}
      </Line>
    );
  }
}
