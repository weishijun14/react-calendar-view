import React, { Component } from "react";
import PortalCantainer from "./PortalCantainer";
import { jsx, css } from "@emotion/core";
import styled from "@emotion/styled";

export default function followModal() {
  return (
    <PortalCantainer>
      <Beak />
      <div
        css={{
          backgroundColor: "rgb(255, 255, 255)",
          overflowX: "hidden",
          overflowY: "auto",
          position: "relative"
        }}
      >
        <div
          css={{
            backgroundColor: "rgb(0, 120, 215)",
            color: "rgb(255, 255, 255)",
            padding: "5px 12px 2px",
            borderTopRightRadius: "2px",
            borderTopLeftRadius: "2px"
          }}
        >
          header
        </div>
        <div>body</div>
        <div
          css={{
            backgroundColor: "rgb(243, 249, 253)",
            padding: "8px 16px 8px 12px",
            borderRadius: "2px"
          }}
        >
          footer
        </div>
      </div>
    </PortalCantainer>
  );
}

const Beak = styled.div(props => {
  return {
    left: `${props.beakLeft}px`,
    top: `${props.beakTop}px`,
    position: "absolute",
    backgroundColor: "rgb(255, 255, 255)",
    boxShadow: "inherit",
    boxSizing: "border-box",
    transform: "rotate(45deg)",
    height: "16px",
    width: "16px",
    border: "inherit"
  };
});

// export default class FollowModal extends Component {
//   render() {
//     const { top, left } = this.props;
//     const portalModalProps = {
//       top: 1,
//       left: 1,
//       direction: "left"
//     };
//     const beakProps = {
//       beakTop: 1,
//       beakLeft: 1
//     };
//     return (
//       <PortalCantainer {...portalModalProps}>
//         <Beak {...beakProps} />
//         <div
//           css={{
//             backgroundColor: "rgb(255, 255, 255)",
//             overflowX: "hidden",
//             overflowY: "auto",
//             position: "relative"
//           }}
//         >
//           <div
//             css={{
//               backgroundColor: "rgb(0, 120, 215)",
//               color: "rgb(255, 255, 255)",
//               padding: "5px 12px 2px",
//               borderTopRightRadius: "2px",
//               borderTopLeftRadius: "2px"
//             }}
//           >
//             header
//           </div>
//           <div>body</div>
//           <div
//             css={{
//               backgroundColor: "rgb(243, 249, 253)",
//               padding: "8px 16px 8px 12px",
//               borderRadius: "2px"
//             }}
//           >
//             footer
//           </div>
//         </div>
//       </PortalCantainer>
//     );
//   }
// }
