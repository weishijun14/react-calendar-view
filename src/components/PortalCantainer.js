import React from "react";
import ReactDOM from "react-dom";
import styled from "@emotion/styled";
import PropTypes from "prop-types";

const ModalWrapper = styled.div(props => {
  return {
    width: "480px",
    left: `${props.left}px`,
    top: `${props.top}px`,
    borderRadius: "4px",
    border: "none",
    position: "absolute",
    boxShadow: "rgba(0, 0, 0, 0.4) 0px 0px 5px 0px",
    outline: "none"
  };
});

export default function PortalCantainer(config) {
  const div = document.createElement("div");
  document.body.appendChild(div);
  function a() {
    return ReactDOM.createPortal(
      <ModalWrapper left={1} top={2}>
        1
      </ModalWrapper>,
      div
    );
  }
  a();
}

// export default class PortalModal extends React.Component {
//   constructor(props) {
//     super(props);
//     // this.el = <ModalWrapper {...this.props} />;
//     this.el = document.createElement("div");
//   }
//   componentDidMount = () => {
//     console.log(
//       document.documentElement.clientWidth || document.body.clientWidth
//     );
//     document.body.appendChild(this.el);
//   };

//   componentWillUnmount = () => {
//     document.body.removeChild(this.el);
//   };

//   render() {
//     return ReactDOM.createPortal(this.props.children, this.el);
//   }
// }

PortalCantainer.propTypes = {
  left: PropTypes.number.isRequired,
  top: PropTypes.number.isRequired,
  direction: PropTypes.string.isRequired
};
