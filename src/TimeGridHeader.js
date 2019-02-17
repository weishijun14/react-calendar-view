import React, { Component } from "react";
import { css, jsx } from "@emotion/core";

const getWeekString = params => {
  switch (params) {
    case 0:
      return "Sunday";
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wensday";
    case 4:
      return "Thusday";
    case 5:
      return "Friday";
    case 6:
      return "Satuday";
  }
};

export default class TimeGridHeader extends Component {
  render() {
    const { view, range } = this.props;
    return (
      <div css={{ display: "flex" }}>
        <div css={{ width: "60px", display: "flex", flexShrink: 0 }} />
        <div
          css={{
            // paddingRight: "18px",
            paddingLeft: "10px",
            marginLeft: "-10px",
            overflow: "hidden",
            width: "100%"
          }}
        >
          <div
            css={{
              border: "1px solid rgb(234,234,234)",
              height: "46px",
              minHeight: "1px",
              display: "flex"
            }}
          >
            {range.map((item, index) => (
              <div
                key={index}
                css={{
                  flexBasis: "14.2%",
                  fontWeight: 400,
                  //   display: "flex",
                  justifyContent: "flex-start",
                  borderLeft: "1px solid rgb(234,234,234)"
                }}
              >
                <div>{getWeekString(item.day())}</div>
                <div>{item.format("MMMM D")}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
