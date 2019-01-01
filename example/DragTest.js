// TODO: 全局颜色变量。
// TODO: memoize()
import React, { Component } from "react";
import { css } from "@emotion/core";
import styled from "@emotion/styled";

import Selection from "./Selection";

const Container = styled.div(props => ({
  display: "flex",
  position: "relative",
  backgroundColor: "#f8f8f8",
  height: "800px"
}));

const HorizenLine = styled.div(props => {
  return {
    width: "100%",
    position: "absolute",
    borderColor: "rgb(234, 234, 234)",
    borderTopWidth: "thin",
    borderWidth: "1px 0px 0px 0px",
    borderStyle: `${props.isOdd ? "solid" : "dashed"}`,
    top: `${props.num}%`
  };
});

const Div = styled.div`
  background: red;
`;

const VerticalLine = styled.div(props => {
  return {
    height: props.height,
    width: "1px",
    flexBasis: "14.2%",
    borderColor: "rgb(234, 234, 234)",
    borderTopWidth: "thin",
    borderWidth: "0px 0px 0px 1px",
    borderStyle: "solid"
  };
});

export default class DragTest extends Component {
  constructor(props) {
    super(props);
    this.containerRef = React.createRef();
    this.state = {
      height: 0
    };
  }

  componentDidMount = () => {
    // console.log(this.containerRef.current.clientHeight / 46);
    this.setState({
      height: this.containerRef.current.clientHeight
    });
  };

  render() {
    const { height } = this.state;
    const weekArr = new Array(7).fill(1);

    return (
      <Container ref={this.containerRef}>
        {(() => {
          let arr = [];
          for (let i = 0; i < 45; i += 1) {
            arr.push(
              <HorizenLine num={i * 2.17} isOdd={i % 2 === 0} key={i} />
            );
          }
          return arr;
        })()}
        {weekArr.map((item, index) => {
          return <VerticalLine height={height} key={index} />;
        })}
        <Selection>
          <span>123</span>
        </Selection>
      </Container>
    );
  }
}
