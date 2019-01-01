import React, { Component } from "react";

export default class TimeSlotGroup extends Component {
  render() {
    console.log(this.props, 998);
    const { group } = this.props;
    return (
      <div>
        {group.map(item => {
          return <div>1</div>;
        })}
      </div>
    );
  }
}
