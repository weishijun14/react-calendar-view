import React, { Component } from "react";
import NP from "number-precision";
import memoizeOne from "memoize-one";
import isEqual from "lodash.isequal";

import Event from "./Event";
import "./VerticalLine.css";
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

const EventContainer = styled.div(props => {
  return {
    position: "absolute",
    right: "10px",
    left: 0,
    top: 0,
    bottom: 0
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
      selectedTop: null,
      selectedBottom: null,
      showSelectionBox: false,
      unconfirmedTimes: {},
      start: null,
      end: null
    };
    this.startGenePoint = 0;
    this.selectedTop = 0;
    this.myRef = React.createRef();
    this.ref = React.createRef();
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
    console.log(1);
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
    console.log(2);
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
    console.log(3);
    e.stopPropagation();
    const { heightPercentArr } = this.props;
    const { selectedTop, selectedBottom } = this.state;
    const beginWithZeroHeightPercentArr = [0].concat(heightPercentArr);
    window.document.removeEventListener("mouseup", this._onMouseUp);
    window.document.removeEventListener("mousemove", this._onMouseMove);
    // 1. 将state => time arr pushed in;
    const result = this._shapeToTimeElement(
      selectedTop,
      selectedBottom,
      beginWithZeroHeightPercentArr
    );

    // console.log(this.ref.current.getBoundingClientRect(), 23333);
    this.setState({
      unconfirmedTimes: { ...result, unconfirmed: true },
      showSelectionBox: false
    });
    // 1. 构造器里面的相关项置空。
    this.startGenePoint = 0;
    this.selectedTop = 0;

    // 2. 选框状态 --> 待确认状态。
    // 3. 弹出对话框。 (这一步必须体现) (弹窗自动判断从左出现还是从右。)
    // 4. 点确定返回值。 点取消无返回值。
    // 5. 从props中取得events 数组。 遍历。若无，则空。
  };

  _addAheadToFlattenedArr = () => {
    const { flattenedArr, step } = this.props;
    const firstTimeElement = flattenedArr[0];

    const firstTimeElementCopy = new Date(firstTimeElement);

    // 此处2bugs. 1. 不能直接引用。 会直接修改原时间。
    const stepBeforeFirstTimeElement = firstTimeElementCopy.getMinutes() - step;
    const newFirstTimeElement = firstTimeElementCopy.setMinutes(
      stepBeforeFirstTimeElement
    );
    // 2. 此新数组时间 有个别的月日不对。
    const newFlattenedArr = [new Date(newFirstTimeElement)].concat(
      flattenedArr
    );

    return newFlattenedArr;
  };

  _getHHmm = date => {
    if (date instanceof Date) {
      const hh = date.getHours();
      const mm = date.getMinutes();
      const zerofy = num => {
        return num < 10 ? `0${num}` : `${num}`;
      };
      return `${zerofy(hh)}:${zerofy(mm)}`;
    }
  };

  _TimeToShape = (startTime, endTime, zone) => {
    const { heightPercentArr } = this.props;
    const beginWithZeroHeightPercentArr = [0].concat(heightPercentArr);
    const startHHmm = this._getHHmm(startTime);
    const endHHmm = this._getHHmm(endTime);
    let a = 0;
    let b = 0;
    for (let i = 0; i < zone.length; i += 1) {
      if (i < zone.length - 1) {
        const before = this._getHHmm(zone[i]);
        const after = this._getHHmm(zone[i + 1]);
        if (before <= startHHmm && startHHmm < after) {
          a = i;
        }
        if (before < endHHmm && endHHmm <= after) {
          b = i + 1;
        }
      }
    }
    return {
      top: beginWithZeroHeightPercentArr[a],
      bottom: beginWithZeroHeightPercentArr[b]
    };
  };

  _shapeToTimeElement = (top, bottom, heightPercent) => {
    const { item } = this.props;
    const newFlattenedArr = this._addAheadToFlattenedArr();

    // TODO: based (top, bottom) in heightPercent, get index. then based index get newFlattenedArr's value.
    let startTime1 = newFlattenedArr[heightPercent.indexOf(top)];
    let startTime2 = startTime1.setDate(item.toDate().getDate());
    let startTime3 = new Date(startTime2).setMonth(item.toDate().getMonth());

    let endTime1 = newFlattenedArr[heightPercent.indexOf(100 - bottom)];
    let endTime2 = endTime1.setDate(item.toDate().getDate());
    let endTime3 = new Date(endTime2).setMonth(item.toDate().getMonth());

    return {
      start: new Date(startTime3),
      end: new Date(endTime3)
    };
  };

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
    const point1 = startPoint;
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
    // console.log(heightPercentArr, "heightPercentArr");
    // console.log(this.props);
    // console.log(selectedBottom);
    this.setState({
      selectedTop,
      selectedBottom,
      showSelectionBox: true
    });
  };

  _renderSelectionArea = () => {
    const { selectedTop, selectedBottom } = this.state;
    return (
      <SelectionArea top={selectedTop} bottom={selectedBottom} ref={this.ref} />
    );
  };

  // _renderUnconfirmedEvent = () => {
  //   const { unconfirmedTimes, selectedTop, selectedBottom } = this.state;
  //   const newArr = [unconfirmedTimes];
  //   if (!Object.keys(unconfirmedTimes).length) return;
  //   return newArr.map(i => {
  //     return (
  //       <Event
  //         key={i}
  //         data={i}
  //         top={selectedTop}
  //         bottom={selectedBottom}
  //         addEvent={this.props.addEvent}
  //         draggable="true"
  //       />
  //     );
  //   });
  // };

  _renderEvent = arr => {
    // TODO: 不同时间重叠时要处理，按照时间长短。
    const { unconfirmedTimes, selectedTop, selectedBottom } = this.state;
    const newArr = [unconfirmedTimes];
    const newFlattenedArr = this._addAheadToFlattenedArr();
    let arr2 = arr;
    if (Object.keys(unconfirmedTimes).length) {
      arr2 = [...arr, ...newArr];
    }
    return arr2.map((i, index) => {
      const shape = this._TimeToShape(i.start, i.end, newFlattenedArr);
      return (
        <Event
          key={index}
          data={i}
          draggable="true"
          top={shape.top}
          bottom={100 - shape.bottom}
        />
      );
    });
  };

  render() {
    const { showSelectionBox } = this.state;
    const { events } = this.props;
    return (
      <Line onMouseDown={this._onMouseDown} ref={this.myRef}>
        {/* {this.renderBackground()}*/}
        {showSelectionBox && this._renderSelectionArea()}
        {/* <EventContainer>{this._renderUnconfirmedEvent()}</EventContainer> */}
        <EventContainer>{this._renderEvent(events)}</EventContainer>
      </Line>
    );
  }
}
