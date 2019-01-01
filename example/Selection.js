import React, { PureComponent } from "react";
import styled from "@emotion/styled";
import has from "lodash.has";

const Container = styled.div(props => ({
  position: "relative"
}));

export default class Selection extends PureComponent {
  constructor(props) {
    super(props);
    this.containerRef = React.createRef();
    this.state = {
      mouseDown: ""
    };
  }

  _a = () => {
    console.log("move");
  };

  _b = () => {
    console.log("up");
    this._onMouseUp();
  };

  _onMouseDown = e => {
    // console.log(e);
    window.document.addEventListener("mousemove", this._a);
    window.document.addEventListener("mouseup", this._b);
  };

  _onMouseUp = e => {
    window.document.removeEventListener("mouseup", this._b);
    window.document.removeEventListener("mousemove", this._a);
  };

  handleCapture = () => {
    console.log(11111111111);
  };

  renderChildren = () => {
    // var index = 0;
    const _this = this;
    let tmpChild;
    const { children } = this.props;
    return React.Children.map(children, child => {
      //   const tmpKey = child.key === null ? index++ : child.key;
      //   const isSelected = has(_this.selectedChildren, tmpKey);
      tmpChild = React.cloneElement(child, {
        // ref: () => (this.childRef = tmpKey),
        selectionparent: _this
        // isSelected: isSelected
      });
      return (
        <div
          //   className={`select-box ${isSelected ? "selected" : ""}`}
          a={111}
          onClickCapture={this.handleCapture}
        >
          {tmpChild}
        </div>
      );
    });
  };

  renderSelectionBox = () => {
    // TODO: fill some style when drag
    return <div />;
  };

  render() {
    const className = "selection " + (this.state.mouseDown ? "dragging" : "");
    return (
      <Container
        className={className}
        ref={this.containerRef}
        onMouseDown={this._onMouseDown}
      >
        {this.renderChildren()}
        {this.renderSelectionBox()}
      </Container>
    );
  }
}
